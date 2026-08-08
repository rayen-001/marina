create extension if not exists pgcrypto;

create table if not exists public.client_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  guest_id uuid references public.guests(id) on delete set null,
  email text not null,
  full_name text not null,
  phone text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists client_profiles_user_id_key
  on public.client_profiles(user_id);
create index if not exists client_profiles_guest_id_idx
  on public.client_profiles(guest_id);
create index if not exists client_profiles_email_idx
  on public.client_profiles(lower(email));

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  client_user_id uuid references auth.users(id) on delete set null,
  guest_id uuid references public.guests(id) on delete set null,
  reservation_id uuid references public.reservations(id) on delete set null,
  subject text not null,
  status text not null default 'open' check (status in ('open', 'closed')),
  admin_read_at timestamptz,
  client_read_at timestamptz,
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists conversations_reservation_id_key
  on public.conversations(reservation_id)
  where reservation_id is not null;
create index if not exists conversations_client_user_last_idx
  on public.conversations(client_user_id, last_message_at desc);
create index if not exists conversations_guest_last_idx
  on public.conversations(guest_id, last_message_at desc);
create index if not exists conversations_last_message_idx
  on public.conversations(last_message_at desc);

create table if not exists public.conversation_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_role text not null check (sender_role in ('admin', 'client')),
  sender_user_id uuid references auth.users(id) on delete set null,
  body text not null check (length(trim(body)) > 0),
  created_at timestamptz not null default now()
);

create index if not exists conversation_messages_conversation_created_idx
  on public.conversation_messages(conversation_id, created_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists client_profiles_set_updated_at on public.client_profiles;
create trigger client_profiles_set_updated_at
before update on public.client_profiles
for each row execute function public.set_updated_at();

drop trigger if exists conversations_set_updated_at on public.conversations;
create trigger conversations_set_updated_at
before update on public.conversations
for each row execute function public.set_updated_at();

create or replace function public.is_active_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = auth.uid()
      and active = true
  );
$$;

alter table public.client_profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_messages enable row level security;
alter table public.guests enable row level security;
alter table public.reservations enable row level security;

drop policy if exists "client_profiles_admin_all" on public.client_profiles;
create policy "client_profiles_admin_all"
on public.client_profiles
for all
using (public.is_active_admin())
with check (public.is_active_admin());

drop policy if exists "client_profiles_own_select" on public.client_profiles;
create policy "client_profiles_own_select"
on public.client_profiles
for select
using (user_id = auth.uid());

drop policy if exists "client_profiles_own_insert" on public.client_profiles;
create policy "client_profiles_own_insert"
on public.client_profiles
for insert
with check (user_id = auth.uid());

drop policy if exists "client_profiles_own_update" on public.client_profiles;
create policy "client_profiles_own_update"
on public.client_profiles
for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "guests_admin_all" on public.guests;
create policy "guests_admin_all"
on public.guests
for all
using (public.is_active_admin())
with check (public.is_active_admin());

drop policy if exists "guests_public_insert" on public.guests;
create policy "guests_public_insert"
on public.guests
for insert
with check (true);

drop policy if exists "guests_client_own_select" on public.guests;
create policy "guests_client_own_select"
on public.guests
for select
using (
  exists (
    select 1
    from public.client_profiles cp
    where cp.user_id = auth.uid()
      and cp.active = true
      and (
        cp.guest_id = guests.id
        or lower(cp.email) = lower(guests.email)
      )
  )
);

drop policy if exists "reservations_admin_all" on public.reservations;
create policy "reservations_admin_all"
on public.reservations
for all
using (public.is_active_admin())
with check (public.is_active_admin());

drop policy if exists "reservations_public_insert" on public.reservations;
create policy "reservations_public_insert"
on public.reservations
for insert
with check (true);

drop policy if exists "reservations_client_own_select" on public.reservations;
create policy "reservations_client_own_select"
on public.reservations
for select
using (
  exists (
    select 1
    from public.client_profiles cp
    left join public.guests g on g.id = reservations.guest_id
    where cp.user_id = auth.uid()
      and cp.active = true
      and (
        cp.guest_id = reservations.guest_id
        or lower(cp.email) = lower(g.email)
      )
  )
);

drop policy if exists "conversations_admin_all" on public.conversations;
create policy "conversations_admin_all"
on public.conversations
for all
using (public.is_active_admin())
with check (public.is_active_admin());

drop policy if exists "conversations_client_select" on public.conversations;
create policy "conversations_client_select"
on public.conversations
for select
using (
  client_user_id = auth.uid()
  or exists (
    select 1
    from public.client_profiles cp
    where cp.user_id = auth.uid()
      and cp.active = true
      and cp.guest_id is not null
      and cp.guest_id = conversations.guest_id
  )
);

drop policy if exists "conversations_client_insert" on public.conversations;
create policy "conversations_client_insert"
on public.conversations
for insert
with check (client_user_id = auth.uid());

drop policy if exists "conversations_client_update" on public.conversations;
create policy "conversations_client_update"
on public.conversations
for update
using (
  client_user_id = auth.uid()
  or (
    client_user_id is null
    and exists (
      select 1
      from public.client_profiles cp
      where cp.user_id = auth.uid()
        and cp.active = true
        and cp.guest_id is not null
        and cp.guest_id = conversations.guest_id
    )
  )
)
with check (
  client_user_id = auth.uid()
  or exists (
    select 1
    from public.client_profiles cp
    where cp.user_id = auth.uid()
      and cp.active = true
      and cp.guest_id is not null
      and cp.guest_id = conversations.guest_id
  )
);

drop policy if exists "conversation_messages_admin_all" on public.conversation_messages;
create policy "conversation_messages_admin_all"
on public.conversation_messages
for all
using (
  public.is_active_admin()
  and exists (
    select 1 from public.conversations c where c.id = conversation_messages.conversation_id
  )
)
with check (
  public.is_active_admin()
  and exists (
    select 1 from public.conversations c where c.id = conversation_messages.conversation_id
  )
);

drop policy if exists "conversation_messages_client_select" on public.conversation_messages;
create policy "conversation_messages_client_select"
on public.conversation_messages
for select
using (
  exists (
    select 1
    from public.conversations c
    where c.id = conversation_messages.conversation_id
      and (
        c.client_user_id = auth.uid()
        or exists (
          select 1
          from public.client_profiles cp
          where cp.user_id = auth.uid()
            and cp.active = true
            and cp.guest_id is not null
            and cp.guest_id = c.guest_id
        )
      )
  )
);

drop policy if exists "conversation_messages_client_insert" on public.conversation_messages;
create policy "conversation_messages_client_insert"
on public.conversation_messages
for insert
with check (
  sender_role = 'client'
  and sender_user_id = auth.uid()
  and exists (
    select 1
    from public.conversations c
    where c.id = conversation_messages.conversation_id
      and (
        c.client_user_id = auth.uid()
        or exists (
          select 1
          from public.client_profiles cp
          where cp.user_id = auth.uid()
            and cp.active = true
            and cp.guest_id is not null
            and cp.guest_id = c.guest_id
        )
      )
  )
);

grant select, insert, update on public.client_profiles to authenticated;
grant select, insert, update on public.conversations to authenticated;
grant select, insert on public.conversation_messages to authenticated;
grant select on public.guests, public.reservations, public.room_types to authenticated;
grant insert on public.guests, public.reservations to anon, authenticated;

create or replace function public.link_client_profile_for_guest(p_guest_id uuid)
returns public.client_profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  v_guest public.guests;
  v_profile public.client_profiles;
begin
  select *
  into v_guest
  from public.guests
  where id = p_guest_id;

  if not found then
    return null;
  end if;

  update public.client_profiles cp
  set guest_id = v_guest.id
  where cp.guest_id is null
    and lower(cp.email) = lower(v_guest.email)
  returning * into v_profile;

  return v_profile;
end;
$$;

grant execute on function public.link_client_profile_for_guest(uuid) to anon, authenticated;

do $$
begin
  alter publication supabase_realtime add table public.conversation_messages;
exception
  when duplicate_object then null;
  when undefined_object then null;
end $$;
