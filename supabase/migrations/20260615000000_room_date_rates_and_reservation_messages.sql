create extension if not exists pgcrypto;

create table if not exists public.room_date_rates (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  room_id uuid not null references public.room_types(id) on delete cascade,
  date date not null,
  price numeric not null check (price >= 0),
  availability_status text not null default 'available'
    check (availability_status in ('available', 'partially_reserved', 'reserved', 'maintenance', 'closed')),
  min_nights integer not null default 1 check (min_nights >= 1),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists room_date_rates_room_id_date_key
  on public.room_date_rates(room_id, date);
create index if not exists room_date_rates_owner_date_idx
  on public.room_date_rates(owner_id, date);

create table if not exists public.reservation_conversations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  reservation_id uuid not null references public.reservations(id) on delete cascade,
  client_name text not null,
  client_email text,
  client_phone text,
  status text not null default 'open' check (status in ('open', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists reservation_conversations_reservation_id_key
  on public.reservation_conversations(reservation_id);
create index if not exists reservation_conversations_owner_updated_idx
  on public.reservation_conversations(owner_id, updated_at desc);

create table if not exists public.reservation_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.reservation_conversations(id) on delete cascade,
  sender_type text not null check (sender_type in ('admin', 'client')),
  sender_name text not null,
  message text not null check (length(trim(message)) > 0),
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists reservation_messages_conversation_created_idx
  on public.reservation_messages(conversation_id, created_at);
create index if not exists reservation_messages_unread_idx
  on public.reservation_messages(conversation_id, is_read)
  where is_read = false;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists room_date_rates_set_updated_at on public.room_date_rates;
create trigger room_date_rates_set_updated_at
before update on public.room_date_rates
for each row execute function public.set_updated_at();

drop trigger if exists reservation_conversations_set_updated_at on public.reservation_conversations;
create trigger reservation_conversations_set_updated_at
before update on public.reservation_conversations
for each row execute function public.set_updated_at();

alter table public.room_date_rates enable row level security;
alter table public.reservation_conversations enable row level security;
alter table public.reservation_messages enable row level security;

drop policy if exists "room_date_rates_public_select" on public.room_date_rates;
create policy "room_date_rates_public_select"
on public.room_date_rates
for select
using (true);

drop policy if exists "room_date_rates_owner_insert" on public.room_date_rates;
create policy "room_date_rates_owner_insert"
on public.room_date_rates
for insert
with check (owner_id = auth.uid());

drop policy if exists "room_date_rates_owner_update" on public.room_date_rates;
create policy "room_date_rates_owner_update"
on public.room_date_rates
for update
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

drop policy if exists "room_date_rates_owner_delete" on public.room_date_rates;
create policy "room_date_rates_owner_delete"
on public.room_date_rates
for delete
using (owner_id = auth.uid());

drop policy if exists "reservation_conversations_owner_select" on public.reservation_conversations;
create policy "reservation_conversations_owner_select"
on public.reservation_conversations
for select
using (owner_id = auth.uid());

drop policy if exists "reservation_conversations_owner_insert" on public.reservation_conversations;
create policy "reservation_conversations_owner_insert"
on public.reservation_conversations
for insert
with check (owner_id = auth.uid());

drop policy if exists "reservation_conversations_owner_update" on public.reservation_conversations;
create policy "reservation_conversations_owner_update"
on public.reservation_conversations
for update
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

drop policy if exists "reservation_messages_owner_select" on public.reservation_messages;
create policy "reservation_messages_owner_select"
on public.reservation_messages
for select
using (
  exists (
    select 1
    from public.reservation_conversations c
    where c.id = reservation_messages.conversation_id
      and c.owner_id = auth.uid()
  )
);

drop policy if exists "reservation_messages_owner_insert" on public.reservation_messages;
create policy "reservation_messages_owner_insert"
on public.reservation_messages
for insert
with check (
  exists (
    select 1
    from public.reservation_conversations c
    where c.id = reservation_messages.conversation_id
      and c.owner_id = auth.uid()
  )
);

drop policy if exists "reservation_messages_owner_update" on public.reservation_messages;
create policy "reservation_messages_owner_update"
on public.reservation_messages
for update
using (
  exists (
    select 1
    from public.reservation_conversations c
    where c.id = reservation_messages.conversation_id
      and c.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.reservation_conversations c
    where c.id = reservation_messages.conversation_id
      and c.owner_id = auth.uid()
  )
);

create or replace function public.get_default_hotel_owner_id()
returns uuid
language sql
security definer
set search_path = public
as $$
  select coalesce(
    (
      select user_id
      from public.admin_profiles
      where active = true
        and role in ('owner', 'manager')
      order by case when role = 'owner' then 0 else 1 end, created_at
      limit 1
    ),
    auth.uid()
  );
$$;

create or replace function public.get_reservation_conversation(p_reservation_id uuid)
returns public.reservation_conversations
language plpgsql
security definer
set search_path = public
as $$
declare
  v_conversation public.reservation_conversations;
begin
  select *
  into v_conversation
  from public.reservation_conversations
  where reservation_id = p_reservation_id
  limit 1;

  return v_conversation;
end;
$$;

create or replace function public.get_or_create_reservation_conversation(
  p_reservation_id uuid,
  p_client_name text,
  p_client_email text default null,
  p_client_phone text default null
)
returns public.reservation_conversations
language plpgsql
security definer
set search_path = public
as $$
declare
  v_conversation public.reservation_conversations;
  v_owner_id uuid;
begin
  select *
  into v_conversation
  from public.reservation_conversations
  where reservation_id = p_reservation_id
  limit 1;

  if found then
    return v_conversation;
  end if;

  if not exists (select 1 from public.reservations where id = p_reservation_id) then
    raise exception 'Reservation not found';
  end if;

  v_owner_id := public.get_default_hotel_owner_id();
  if v_owner_id is null then
    raise exception 'No hotel owner profile is configured';
  end if;

  insert into public.reservation_conversations (
    owner_id,
    reservation_id,
    client_name,
    client_email,
    client_phone
  )
  values (
    v_owner_id,
    p_reservation_id,
    coalesce(nullif(trim(p_client_name), ''), 'Client'),
    nullif(trim(p_client_email), ''),
    nullif(trim(p_client_phone), '')
  )
  returning * into v_conversation;

  return v_conversation;
end;
$$;

create or replace function public.get_reservation_conversation_messages(p_conversation_id uuid)
returns setof public.reservation_messages
language sql
security definer
set search_path = public
as $$
  select m.*
  from public.reservation_messages m
  where m.conversation_id = p_conversation_id
  order by m.created_at asc;
$$;

create or replace function public.send_reservation_message(
  p_conversation_id uuid,
  p_sender_type text,
  p_sender_name text,
  p_message text
)
returns public.reservation_messages
language plpgsql
security definer
set search_path = public
as $$
declare
  v_conversation public.reservation_conversations;
  v_message public.reservation_messages;
begin
  if p_sender_type not in ('admin', 'client') then
    raise exception 'Invalid sender type';
  end if;

  if length(trim(coalesce(p_message, ''))) = 0 then
    raise exception 'Message is required';
  end if;

  select *
  into v_conversation
  from public.reservation_conversations
  where id = p_conversation_id;

  if not found then
    raise exception 'Conversation not found';
  end if;

  if p_sender_type = 'admin' and v_conversation.owner_id <> auth.uid() then
    raise exception 'Not allowed';
  end if;

  insert into public.reservation_messages (
    conversation_id,
    sender_type,
    sender_name,
    message,
    is_read
  )
  values (
    p_conversation_id,
    p_sender_type,
    coalesce(nullif(trim(p_sender_name), ''), case when p_sender_type = 'admin' then 'Admin' else 'Client' end),
    trim(p_message),
    false
  )
  returning * into v_message;

  update public.reservation_conversations
  set updated_at = now()
  where id = p_conversation_id;

  return v_message;
end;
$$;

create or replace function public.mark_reservation_messages_read(
  p_conversation_id uuid,
  p_reader_type text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_conversation public.reservation_conversations;
begin
  if p_reader_type not in ('admin', 'client') then
    raise exception 'Invalid reader type';
  end if;

  select *
  into v_conversation
  from public.reservation_conversations
  where id = p_conversation_id;

  if not found then
    raise exception 'Conversation not found';
  end if;

  if p_reader_type = 'admin' and v_conversation.owner_id <> auth.uid() then
    raise exception 'Not allowed';
  end if;

  update public.reservation_messages
  set is_read = true
  where conversation_id = p_conversation_id
    and sender_type <> p_reader_type;
end;
$$;

drop function if exists public.get_available_units(uuid, date, date);
create function public.get_available_units(
  p_room_type_id uuid,
  p_check_in date,
  p_check_out date
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_total_units integer;
  v_reserved_units integer;
begin
  if p_check_in is null or p_check_out is null or p_check_in >= p_check_out then
    return 0;
  end if;

  select total_units
  into v_total_units
  from public.room_types
  where id = p_room_type_id
    and status = 'active';

  if v_total_units is null then
    return 0;
  end if;

  if exists (
    select 1
    from public.room_date_rates r
    where r.room_id = p_room_type_id
      and r.date >= p_check_in
      and r.date < p_check_out
      and r.availability_status in ('reserved', 'maintenance', 'closed')
  ) then
    return 0;
  end if;

  select count(*)
  into v_reserved_units
  from public.reservations res
  where res.room_type_id = p_room_type_id
    and res.status in ('pending', 'confirmed', 'checked_in')
    and res.check_in < p_check_out
    and res.check_out > p_check_in;

  return greatest(0, v_total_units - coalesce(v_reserved_units, 0));
end;
$$;

drop function if exists public.create_public_reservation(
  uuid,
  date,
  date,
  integer,
  integer,
  text,
  text,
  text,
  text,
  text,
  text,
  text
);

create function public.create_public_reservation(
  p_room_type_id uuid,
  p_check_in date,
  p_check_out date,
  p_adults integer,
  p_children integer,
  p_full_name text,
  p_email text,
  p_phone text,
  p_country text,
  p_cin_passport text,
  p_special_requests text default null,
  p_source text default 'direct'
)
returns table (
  reservation_id uuid,
  reservation_number text,
  total numeric,
  deposit numeric,
  remaining_amount numeric
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_room public.room_types;
  v_guest_id uuid;
  v_nights integer;
  v_min_nights integer;
  v_room_price numeric;
  v_tax_rate numeric;
  v_deposit_rate numeric;
  v_taxes numeric;
  v_total numeric;
  v_deposit numeric;
  v_reservation_id uuid;
  v_reservation_number text;
begin
  if p_check_in is null or p_check_out is null or p_check_in >= p_check_out then
    raise exception 'Invalid stay dates';
  end if;

  select *
  into v_room
  from public.room_types
  where id = p_room_type_id
    and status = 'active';

  if not found then
    raise exception 'Room type not found';
  end if;

  v_nights := (p_check_out - p_check_in);

  if coalesce(p_adults, 0) + coalesce(p_children, 0) > v_room.capacity_adults + v_room.capacity_children then
    raise exception 'Guest count exceeds room capacity';
  end if;

  select coalesce(max(min_nights), 1)
  into v_min_nights
  from public.room_date_rates
  where room_id = p_room_type_id
    and date >= p_check_in
    and date < p_check_out;

  if v_nights < coalesce(v_min_nights, 1) then
    raise exception 'Minimum stay is % nights', v_min_nights;
  end if;

  if public.get_available_units(p_room_type_id, p_check_in, p_check_out) <= 0 then
    raise exception 'No available units for requested dates';
  end if;

  select
    coalesce(tax_rate, 0.12),
    coalesce(deposit_percentage, 0.30)
  into v_tax_rate, v_deposit_rate
  from public.hotel_settings
  order by created_at asc
  limit 1;

  v_tax_rate := coalesce(v_tax_rate, 0.12);
  v_deposit_rate := coalesce(v_deposit_rate, 0.30);

  select coalesce(sum(coalesce(r.price, v_room.price_per_night)), 0)
  into v_room_price
  from generate_series(p_check_in, p_check_out - 1, interval '1 day') as d(day)
  left join public.room_date_rates r
    on r.room_id = p_room_type_id
   and r.date = d.day::date;

  v_taxes := round(v_room_price * v_tax_rate);
  v_total := v_room_price + v_taxes;
  v_deposit := round(v_total * v_deposit_rate);
  v_reservation_number := 'MCM-' || extract(year from now())::int || '-' ||
    lpad(((select count(*) + 1 from public.reservations)::text), 3, '0');

  insert into public.guests (
    full_name,
    email,
    phone,
    country,
    identity_number
  )
  values (
    trim(p_full_name),
    trim(p_email),
    trim(p_phone),
    trim(p_country),
    trim(p_cin_passport)
  )
  returning id into v_guest_id;

  insert into public.reservations (
    reservation_number,
    room_type_id,
    guest_id,
    check_in,
    check_out,
    adults,
    children,
    status,
    payment_status,
    source,
    special_requests,
    nights,
    room_price,
    taxes_and_fees,
    deposit,
    total,
    paid_amount,
    remaining_amount
  )
  values (
    v_reservation_number,
    p_room_type_id,
    v_guest_id,
    p_check_in,
    p_check_out,
    coalesce(p_adults, 1),
    coalesce(p_children, 0),
    'confirmed',
    'deposit_paid',
    coalesce(nullif(p_source, ''), 'direct'),
    nullif(trim(coalesce(p_special_requests, '')), ''),
    v_nights,
    v_room_price,
    v_taxes,
    v_deposit,
    v_total,
    v_deposit,
    greatest(0, v_total - v_deposit)
  )
  returning id into v_reservation_id;

  return query select v_reservation_id, v_reservation_number, v_total, v_deposit, greatest(0, v_total - v_deposit);
end;
$$;

do $$
begin
  alter publication supabase_realtime add table public.reservation_messages;
exception
  when duplicate_object then null;
  when undefined_object then null;
end $$;
