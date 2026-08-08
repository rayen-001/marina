-- Client reservation ownership: reservations.guest_id becomes the logged-in
-- client's own auth/profile id for self-service bookings, instead of relying
-- on fragile email matching against the walk-in `guests` table.

create or replace function public.client_has_active_reservation(p_client_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.reservations r
    where r.guest_id = p_client_id
      and r.status in ('pending', 'confirmed', 'checked_in')
  )
$$;

grant execute on function public.client_has_active_reservation(uuid) to authenticated;

-- Reconciles a client's own account with any reservation(s) made as a guest
-- (before they had an account, or while logged in but booked through the
-- anonymous checkout flow) by matching on email, then re-pointing those
-- reservations' guest_id at the client's own profile/auth id. Safe to call
-- repeatedly (idempotent) — intended to run right after login, right after
-- registration, and right after a logged-in client completes a booking.
create or replace function public.link_guest_reservations_to_client()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_profile public.profiles;
  v_matched_guest_ids uuid[];
  v_count integer := 0;
begin
  select * into v_profile from public.profiles where id = auth.uid();

  if not found or v_profile.role <> 'client' or v_profile.email is null then
    return 0;
  end if;

  insert into public.guests (id, full_name, email, phone, country, identity_number)
  values (v_profile.id, coalesce(v_profile.full_name, v_profile.email), v_profile.email, '', '', '')
  on conflict (id) do update
  set email = excluded.email;

  select array_agg(id) into v_matched_guest_ids
  from public.guests
  where id <> v_profile.id
    and lower(email) = lower(v_profile.email);

  if v_matched_guest_ids is null then
    return 0;
  end if;

  update public.reservations
  set guest_id = v_profile.id
  where guest_id = any(v_matched_guest_ids);
  get diagnostics v_count = row_count;

  update public.boat_stays
  set guest_id = v_profile.id
  where guest_id = any(v_matched_guest_ids);

  return v_count;
end;
$$;

grant execute on function public.link_guest_reservations_to_client() to authenticated;

-- Superseded by the direct id-based policies below.
drop policy if exists "guests_client_profile_email_select" on public.guests;
drop policy if exists "reservations_client_profile_email_select" on public.reservations;

drop policy if exists "guests_client_own_select" on public.guests;
create policy "guests_client_own_select"
on public.guests
for select
using (id = auth.uid());

drop policy if exists "guests_client_own_update" on public.guests;
create policy "guests_client_own_update"
on public.guests
for update
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "reservations_client_own_select" on public.reservations;
create policy "reservations_client_own_select"
on public.reservations
for select
using (guest_id = auth.uid());

-- Messaging: a client may only message admin (and admin may only reply to
-- that client) while the client has a reservation that is pending, confirmed
-- or checked in.
drop policy if exists "messages_insert_authorized" on public.messages;
create policy "messages_insert_authorized"
on public.messages
for insert
with check (
  sender_id = auth.uid()
  and (
    (
      public.is_admin_or_owner()
      and exists (
        select 1 from public.profiles p
        where p.id = receiver_id and p.role = 'client'
      )
      and public.client_has_active_reservation(receiver_id)
    )
    or (
      public.current_profile_role() = 'client'
      and exists (
        select 1 from public.profiles p
        where p.id = receiver_id and p.role in ('admin', 'owner')
      )
      and public.client_has_active_reservation(auth.uid())
    )
  )
);
