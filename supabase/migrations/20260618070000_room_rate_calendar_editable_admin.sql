create extension if not exists pgcrypto;

do $$
begin
  if exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where n.nspname = 'public'
      and t.typname = 'channel_source'
      and t.typtype = 'e'
  ) then
    alter type public.channel_source add value if not exists 'admin';
  end if;
exception
  when duplicate_object then null;
end;
$$;

create table if not exists public.room_rate_calendar (
  id uuid primary key default gen_random_uuid(),
  room_type_id uuid not null references public.room_types(id) on delete cascade,
  date date not null,
  price numeric not null check (price >= 0),
  min_nights integer default 1 check (min_nights >= 1),
  notes text,
  created_at timestamptz not null default now()
);

alter table public.room_rate_calendar
  add column if not exists status text not null default 'available',
  add column if not exists note text,
  add column if not exists inventory_mode text not null default 'auto',
  add column if not exists units_available_override integer,
  add column if not exists selected_unit_ids uuid[],
  add column if not exists updated_at timestamptz not null default now();

alter table public.room_rate_calendar
  drop constraint if exists room_rate_calendar_status_check;

alter table public.room_rate_calendar
  add constraint room_rate_calendar_status_check
  check (status in ('available', 'partially_reserved', 'not_available', 'reserved', 'closed', 'maintenance'));

alter table public.room_rate_calendar
  drop constraint if exists room_rate_calendar_inventory_mode_check;

alter table public.room_rate_calendar
  add constraint room_rate_calendar_inventory_mode_check
  check (inventory_mode in ('auto', 'all', 'quantity', 'specific_units', 'closed'));

alter table public.room_rate_calendar
  drop constraint if exists room_rate_calendar_units_available_override_check;

alter table public.room_rate_calendar
  add constraint room_rate_calendar_units_available_override_check
  check (units_available_override is null or units_available_override >= 0);

update public.room_rate_calendar
set note = coalesce(note, notes)
where note is null
  and notes is not null;

create unique index if not exists room_rate_calendar_room_type_id_date_key
  on public.room_rate_calendar(room_type_id, date);
create index if not exists room_rate_calendar_date_idx
  on public.room_rate_calendar(date);

alter table public.reservations
  add column if not exists room_unit_id uuid references public.room_units(id) on delete set null;

create index if not exists reservations_room_unit_id_idx
  on public.reservations(room_unit_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists room_rate_calendar_set_updated_at on public.room_rate_calendar;
create trigger room_rate_calendar_set_updated_at
before update on public.room_rate_calendar
for each row execute function public.set_updated_at();

alter table public.room_rate_calendar enable row level security;

drop policy if exists "room_rate_calendar_public_select" on public.room_rate_calendar;
create policy "room_rate_calendar_public_select"
on public.room_rate_calendar
for select
using (true);

drop policy if exists "room_rate_calendar_authenticated_insert" on public.room_rate_calendar;
create policy "room_rate_calendar_authenticated_insert"
on public.room_rate_calendar
for insert
to authenticated
with check (true);

drop policy if exists "room_rate_calendar_authenticated_update" on public.room_rate_calendar;
create policy "room_rate_calendar_authenticated_update"
on public.room_rate_calendar
for update
to authenticated
using (true)
with check (true);

drop policy if exists "room_rate_calendar_authenticated_delete" on public.room_rate_calendar;
create policy "room_rate_calendar_authenticated_delete"
on public.room_rate_calendar
for delete
to authenticated
using (true);

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
  v_min_available integer;
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

  select coalesce(min(day_inventory.available_units), v_total_units)
  into v_min_available
  from (
    select
      case
        when exists (
          select 1
          from public.room_availability_blocks b
          where b.room_type_id = p_room_type_id
            and b.start_date <= d.day::date
            and b.end_date >= d.day::date
            and b.status in ('closed', 'not_available', 'maintenance')
        ) then 0
        when c.inventory_mode = 'closed'
          or c.status in ('not_available', 'reserved', 'maintenance', 'closed')
        then 0
        when c.inventory_mode = 'all' then v_total_units
        when c.inventory_mode = 'quantity' then
          least(v_total_units, greatest(0, coalesce(c.units_available_override, 0)))
        when c.inventory_mode = 'specific_units' then
          least(
            v_total_units,
            greatest(
              0,
              coalesce(cardinality(c.selected_unit_ids), c.units_available_override, 0)
              - coalesce((
                select count(*)::integer
                from public.reservations res
                where res.room_type_id = p_room_type_id
                  and res.status in ('pending', 'confirmed', 'checked_in')
                  and res.room_unit_id is not null
                  and c.selected_unit_ids is not null
                  and res.room_unit_id = any(c.selected_unit_ids)
                  and res.check_in <= d.day::date
                  and res.check_out > d.day::date
              ), 0)
            )
          )
        else
          greatest(
            0,
            v_total_units - coalesce((
              select count(*)::integer
              from public.reservations res
              where res.room_type_id = p_room_type_id
                and res.status in ('pending', 'confirmed', 'checked_in')
                and res.check_in <= d.day::date
                and res.check_out > d.day::date
            ), 0)
          )
      end as available_units
    from generate_series(p_check_in, p_check_out - 1, interval '1 day') as d(day)
    left join public.room_rate_calendar c
      on c.room_type_id = p_room_type_id
     and c.date = d.day::date
  ) day_inventory;

  return greatest(0, coalesce(v_min_available, 0));
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
    select c.min_nights
    from public.room_rate_calendar c
    where c.room_type_id = p_room_type_id
      and c.date >= p_check_in
      and c.date < p_check_out
    union all
    select p.min_nights
    from public.room_date_prices p
    where p.room_id = p_room_type_id
      and p.date >= p_check_in
      and p.date < p_check_out
      and not exists (
        select 1
        from public.room_rate_calendar c
        where c.room_type_id = p.room_id
          and c.date = p.date
      )
    union all
    select r.min_nights
    from public.room_date_rates r
    where r.room_id = p_room_type_id
      and r.date >= p_check_in
      and r.date < p_check_out
      and not exists (
        select 1
        from public.room_rate_calendar c
        where c.room_type_id = r.room_id
          and c.date = r.date
      )
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

  select coalesce(sum(coalesce(c.price, p.price, r.price, v_room.price_per_night)), 0)
  into v_room_price
  from generate_series(p_check_in, p_check_out - 1, interval '1 day') as d(day)
  left join public.room_rate_calendar c
    on c.room_type_id = p_room_type_id
   and c.date = d.day::date
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

  return query select
    v_reservation_id,
    v_reservation_number,
    v_total,
    v_deposit,
    greatest(0, v_total - v_deposit);
end;
$$;
