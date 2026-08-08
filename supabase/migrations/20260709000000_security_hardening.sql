-- Production-readiness security audit: closes 3 critical/high issues found
-- by independent RLS/trigger review.

-- =========================================================================
-- 1) CRITICAL: self-signup role escalation.
-- handle_new_user_profile() trusted user_metadata.role verbatim (only
-- bounds-checked against the allowed enum). Anyone can call Supabase Auth's
-- public signup endpoint directly with { data: { role: "owner" } } using
-- just the public anon key and be inserted into profiles as a full
-- owner/admin/capitainerie account, bypassing the app entirely. Privileged
-- roles must only ever be created through an already-authenticated admin
-- path (see src/lib/auth/createClientAccount.server.ts, which is correct:
-- it hardcodes role="client" server-side regardless of caller input).
-- Self-service signup must always become a plain client.
-- =========================================================================
create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', new.email),
    new.email,
    'client'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- =========================================================================
-- 2) CRITICAL: unrestricted direct-table insert into guests/reservations.
-- "with check (true)" granted to anon+authenticated let anyone bypass every
-- RPC's availability/capacity/pricing validation and plant a fabricated
-- confirmed+paid reservation (with an arbitrary guest_id) straight over the
-- REST API. The only legitimate direct-insert caller left in the app is the
-- admin walk-in reservation modal (src/components/admin/
-- AdminNewReservationModal.tsx), which always runs as an authenticated
-- admin/owner — so this is scoped to admin/owner, not removed outright.
-- =========================================================================
drop policy if exists "guests_public_insert" on public.guests;
create policy "guests_public_insert"
on public.guests
for insert
with check (public.is_admin_or_owner());

drop policy if exists "reservations_public_insert" on public.reservations;
create policy "reservations_public_insert"
on public.reservations
for insert
with check (public.is_admin_or_owner());

-- =========================================================================
-- 3) HIGH: room_rate_calendar insert/update/delete were "to authenticated
-- using (true) with check (true)" — any signed-up client account (not just
-- staff) could rewrite pricing, minimum stay, availability status and unit
-- inventory for every room type. Scope to admin/owner, matching every other
-- pricing/inventory-management policy in this schema.
-- =========================================================================
drop policy if exists "room_rate_calendar_authenticated_insert" on public.room_rate_calendar;
create policy "room_rate_calendar_authenticated_insert"
on public.room_rate_calendar
for insert
to authenticated
with check (public.is_admin_or_owner());

drop policy if exists "room_rate_calendar_authenticated_update" on public.room_rate_calendar;
create policy "room_rate_calendar_authenticated_update"
on public.room_rate_calendar
for update
to authenticated
using (public.is_admin_or_owner())
with check (public.is_admin_or_owner());

drop policy if exists "room_rate_calendar_authenticated_delete" on public.room_rate_calendar;
create policy "room_rate_calendar_authenticated_delete"
on public.room_rate_calendar
for delete
to authenticated
using (public.is_admin_or_owner());

-- =========================================================================
-- 4) HIGH: orphaned reservation-chat RPCs remain callable by anon/
-- authenticated with no ownership checks now that the feature that used
-- them (src/components/reservation-chat.tsx, reservationMessageService.ts)
-- has been removed from the app entirely (superseded by the profiles/
-- messages-based client<->admin messaging system). Right now anyone with
-- the public anon key can pass a guessed/leaked reservation_id and read
-- that guest's full name/email/phone, read any conversation's message
-- history, or inject spoofed "client" messages. Revoking execute closes
-- this with zero functional impact since nothing in the app calls them.
-- =========================================================================
revoke execute on function public.get_reservation_conversation(uuid) from anon, authenticated;
revoke execute on function public.get_or_create_reservation_conversation(uuid, text, text, text) from anon, authenticated;
revoke execute on function public.get_reservation_conversation_messages(uuid) from anon, authenticated;
revoke execute on function public.send_reservation_message(uuid, text, text, text) from anon, authenticated;
revoke execute on function public.mark_reservation_messages_read(uuid, text) from anon, authenticated;

-- =========================================================================
-- 5) Correctness: create_client_reservation (added in
-- 20260707020000_client_reservation_booking_flow.sql) computed price and
-- minimum-stay using only the deprecated room_date_rates table. The public
-- walk-in RPC (create_public_reservation) was already updated to cascade
-- room_rate_calendar -> room_date_prices -> room_date_rates -> the room's
-- base price. Bringing the client RPC in line so authenticated clients are
-- always charged/gated using the same admin-managed pricing the calendar
-- and booking quote UI actually show.
-- =========================================================================
create or replace function public.create_client_reservation(
  p_room_type_id uuid,
  p_check_in date,
  p_check_out date,
  p_adults integer,
  p_children integer,
  p_phone text default null,
  p_country text default null,
  p_cin_passport text default null,
  p_special_requests text default null
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
  v_client_id uuid := auth.uid();
  v_profile public.profiles;
  v_room public.room_types;
  v_nights integer;
  v_min_nights integer;
  v_room_price numeric;
  v_tax_rate numeric;
  v_taxes numeric;
  v_total numeric;
  v_reservation_id uuid;
  v_reservation_number text;
begin
  if v_client_id is null then
    raise exception 'Authentication required';
  end if;

  select * into v_profile from public.profiles where id = v_client_id;
  if not found or v_profile.role <> 'client' then
    raise exception 'A client account is required to book';
  end if;

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

  select coalesce(tax_rate, 0.12)
  into v_tax_rate
  from public.hotel_settings
  order by created_at asc
  limit 1;

  v_tax_rate := coalesce(v_tax_rate, 0.12);

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
  v_reservation_number := 'MCM-' || extract(year from now())::int || '-' ||
    lpad(((select count(*) + 1 from public.reservations)::text), 3, '0');

  insert into public.guests (id, full_name, email, phone, country, identity_number)
  values (
    v_client_id,
    coalesce(v_profile.full_name, v_profile.email, 'Client'),
    v_profile.email,
    nullif(trim(coalesce(p_phone, '')), ''),
    coalesce(nullif(trim(coalesce(p_country, '')), ''), 'Tunisie'),
    nullif(trim(coalesce(p_cin_passport, '')), '')
  )
  on conflict (id) do update
  set
    full_name = coalesce(public.guests.full_name, excluded.full_name),
    email = coalesce(excluded.email, public.guests.email),
    phone = coalesce(excluded.phone, public.guests.phone),
    country = coalesce(excluded.country, public.guests.country),
    identity_number = coalesce(excluded.identity_number, public.guests.identity_number);

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
    v_client_id,
    p_check_in,
    p_check_out,
    coalesce(p_adults, 1),
    coalesce(p_children, 0),
    'pending',
    'unpaid',
    'direct',
    nullif(trim(coalesce(p_special_requests, '')), ''),
    v_nights,
    v_room_price,
    v_taxes,
    0,
    v_total,
    0,
    v_total
  )
  returning id into v_reservation_id;

  return query select v_reservation_id, v_reservation_number, v_total, 0::numeric, v_total;
end;
$$;

grant execute on function public.create_client_reservation(
  uuid, date, date, integer, integer, text, text, text, text
) to authenticated;
