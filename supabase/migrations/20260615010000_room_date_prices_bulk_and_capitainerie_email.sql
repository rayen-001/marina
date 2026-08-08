create extension if not exists pgcrypto;

create table if not exists public.room_date_prices (
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

create unique index if not exists room_date_prices_owner_room_date_key
  on public.room_date_prices(owner_id, room_id, date);
create index if not exists room_date_prices_room_date_idx
  on public.room_date_prices(room_id, date);
create index if not exists room_date_prices_owner_date_idx
  on public.room_date_prices(owner_id, date);

insert into public.room_date_prices (
  owner_id,
  room_id,
  date,
  price,
  availability_status,
  min_nights,
  note,
  created_at,
  updated_at
)
select
  owner_id,
  room_id,
  date,
  price,
  availability_status,
  min_nights,
  note,
  created_at,
  updated_at
from public.room_date_rates
on conflict (owner_id, room_id, date) do update
set
  price = excluded.price,
  availability_status = excluded.availability_status,
  min_nights = excluded.min_nights,
  note = excluded.note,
  updated_at = now();

drop trigger if exists room_date_prices_set_updated_at on public.room_date_prices;
create trigger room_date_prices_set_updated_at
before update on public.room_date_prices
for each row execute function public.set_updated_at();

alter table public.room_date_prices enable row level security;

drop policy if exists "room_date_prices_public_select" on public.room_date_prices;
create policy "room_date_prices_public_select"
on public.room_date_prices
for select
using (true);

drop policy if exists "room_date_prices_owner_insert" on public.room_date_prices;
create policy "room_date_prices_owner_insert"
on public.room_date_prices
for insert
with check (owner_id = auth.uid());

drop policy if exists "room_date_prices_owner_update" on public.room_date_prices;
create policy "room_date_prices_owner_update"
on public.room_date_prices
for update
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

drop policy if exists "room_date_prices_owner_delete" on public.room_date_prices;
create policy "room_date_prices_owner_delete"
on public.room_date_prices
for delete
using (owner_id = auth.uid());

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
    from public.room_date_prices r
    where r.room_id = p_room_type_id
      and r.date >= p_check_in
      and r.date < p_check_out
      and r.availability_status in ('reserved', 'maintenance', 'closed')
  ) or exists (
    select 1
    from public.room_date_rates r
    where r.room_id = p_room_type_id
      and r.date >= p_check_in
      and r.date < p_check_out
      and r.availability_status in ('reserved', 'maintenance', 'closed')
      and not exists (
        select 1
        from public.room_date_prices p
        where p.room_id = r.room_id
          and p.date = r.date
      )
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
  from (
    select p.min_nights
    from public.room_date_prices p
    where p.room_id = p_room_type_id
      and p.date >= p_check_in
      and p.date < p_check_out
    union all
    select r.min_nights
    from public.room_date_rates r
    where r.room_id = p_room_type_id
      and r.date >= p_check_in
      and r.date < p_check_out
      and not exists (
        select 1
        from public.room_date_prices p
        where p.room_id = r.room_id
          and p.date = r.date
      )
  ) rates;

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

  select coalesce(sum(coalesce(p.price, r.price, v_room.price_per_night)), 0)
  into v_room_price
  from generate_series(p_check_in, p_check_out - 1, interval '1 day') as d(day)
  left join public.room_date_prices p
    on p.room_id = p_room_type_id
   and p.date = d.day::date
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
    total,
    deposit,
    remaining_amount,
    source,
    special_requests
  )
  values (
    v_reservation_number,
    p_room_type_id,
    v_guest_id,
    p_check_in,
    p_check_out,
    coalesce(p_adults, 0),
    coalesce(p_children, 0),
    'pending',
    v_total,
    v_deposit,
    greatest(0, v_total - v_deposit),
    coalesce(p_source, 'direct'),
    nullif(trim(coalesce(p_special_requests, '')), '')
  )
  returning id into v_reservation_id;

  return query select
    v_reservation_id,
    v_reservation_number,
    v_total,
    v_deposit,
    greatest(0, v_total - v_deposit);
end;
$$;
