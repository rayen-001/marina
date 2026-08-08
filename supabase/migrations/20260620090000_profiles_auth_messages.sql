create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text not null check (role in ('admin', 'owner', 'client')),
  created_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists full_name text,
  add column if not exists email text,
  add column if not exists role text,
  add column if not exists created_at timestamptz not null default now();

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check check (role in ('admin', 'owner', 'client'));

create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists profiles_email_idx on public.profiles(lower(email));

do $$
begin
  if to_regclass('public.admin_profiles') is not null then
    insert into public.profiles (id, full_name, email, role, created_at)
    select
      ap.user_id,
      coalesce(ap.full_name, ap.name, ap.email),
      ap.email,
      case when ap.role = 'owner' then 'owner' else 'admin' end,
      coalesce(ap.created_at, now())
    from public.admin_profiles ap
    where ap.user_id is not null
    on conflict (id) do update
    set
      full_name = coalesce(excluded.full_name, public.profiles.full_name),
      email = coalesce(excluded.email, public.profiles.email),
      role = excluded.role;
  end if;

  if to_regclass('public.client_profiles') is not null then
    insert into public.profiles (id, full_name, email, role, created_at)
    select
      cp.user_id,
      cp.full_name,
      cp.email,
      'client',
      coalesce(cp.created_at, now())
    from public.client_profiles cp
    where cp.user_id is not null
    on conflict (id) do nothing;
  end if;
end $$;

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  receiver_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists messages_sender_created_idx
  on public.messages(sender_id, created_at desc);
create index if not exists messages_receiver_read_idx
  on public.messages(receiver_id, is_read, created_at desc);
create index if not exists messages_pair_created_idx
  on public.messages(sender_id, receiver_id, created_at);

create or replace function public.current_profile_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_admin_or_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_profile_role() in ('admin', 'owner'), false)
$$;

create or replace function public.is_active_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_admin_or_owner()
$$;

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_role text;
begin
  requested_role := coalesce(new.raw_user_meta_data->>'role', 'client');
  if requested_role not in ('admin', 'owner', 'client') then
    requested_role := 'client';
  end if;

  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', new.email),
    new.email,
    requested_role
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute function public.handle_new_user_profile();

alter table public.profiles enable row level security;
alter table public.messages enable row level security;
alter table public.boat_stays enable row level security;
alter table public.port_berths enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
using (id = auth.uid());

drop policy if exists "profiles_select_admin_all" on public.profiles;
create policy "profiles_select_admin_all"
on public.profiles
for select
using (public.is_admin_or_owner());

drop policy if exists "profiles_insert_own_client" on public.profiles;
create policy "profiles_insert_own_client"
on public.profiles
for insert
with check (id = auth.uid() and role = 'client');

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
using (id = auth.uid())
with check (id = auth.uid() and role = public.current_profile_role());

drop policy if exists "messages_select_own" on public.messages;
create policy "messages_select_own"
on public.messages
for select
using (
  sender_id = auth.uid()
  or receiver_id = auth.uid()
  or public.is_admin_or_owner()
);

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
    )
    or (
      public.current_profile_role() = 'client'
      and exists (
        select 1 from public.profiles p
        where p.id = receiver_id and p.role in ('admin', 'owner')
      )
    )
  )
);

drop policy if exists "messages_update_read" on public.messages;
create policy "messages_update_read"
on public.messages
for update
using (
  receiver_id = auth.uid()
  or (
    public.is_admin_or_owner()
    and exists (
      select 1 from public.profiles p
      where p.id = sender_id and p.role = 'client'
    )
  )
)
with check (
  receiver_id = auth.uid()
  or (
    public.is_admin_or_owner()
    and exists (
      select 1 from public.profiles p
      where p.id = sender_id and p.role = 'client'
    )
  )
);

drop policy if exists "guests_client_profile_email_select" on public.guests;
create policy "guests_client_profile_email_select"
on public.guests
for select
using (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'client'
      and lower(p.email) = lower(guests.email)
  )
);

drop policy if exists "reservations_client_profile_email_select" on public.reservations;
create policy "reservations_client_profile_email_select"
on public.reservations
for select
using (
  exists (
    select 1
    from public.profiles p
    join public.guests g on g.id = reservations.guest_id
    where p.id = auth.uid()
      and p.role = 'client'
      and lower(p.email) = lower(g.email)
  )
);

drop policy if exists "boat_stays_admin_all" on public.boat_stays;
create policy "boat_stays_admin_all"
on public.boat_stays
for all
using (public.is_admin_or_owner())
with check (public.is_admin_or_owner());

drop policy if exists "boat_stays_client_profile_email_select" on public.boat_stays;
create policy "boat_stays_client_profile_email_select"
on public.boat_stays
for select
using (
  exists (
    select 1
    from public.profiles p
    join public.guests g on g.id = boat_stays.guest_id
    where p.id = auth.uid()
      and p.role = 'client'
      and lower(p.email) = lower(g.email)
  )
);

drop policy if exists "port_berths_authenticated_select" on public.port_berths;
create policy "port_berths_authenticated_select"
on public.port_berths
for select
using (auth.uid() is not null);

grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.messages to authenticated;
grant select on public.guests, public.reservations, public.room_types, public.boat_stays, public.port_berths
  to authenticated;

do $$
begin
  alter publication supabase_realtime add table public.messages;
exception
  when duplicate_object then null;
  when undefined_object then null;
end $$;
