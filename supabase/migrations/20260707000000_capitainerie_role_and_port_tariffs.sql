-- Adds a restricted "capitainerie" admin role, scoped to managing Port
-- Tariffs only, and the port_tariffs table it manages/publishes.

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check check (role in ('admin', 'owner', 'client', 'capitainerie'));

create or replace function public.is_port_tariff_manager()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.is_admin_or_owner() or public.current_profile_role() = 'capitainerie', false)
$$;

create table if not exists public.port_tariffs (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  length_min numeric,
  length_max numeric,
  daily_price numeric,
  monthly_price numeric,
  yearly_price numeric,
  wintering_price numeric,
  currency text not null default 'TND',
  note text,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists port_tariffs_active_sort_idx
  on public.port_tariffs(active, sort_order);

alter table public.port_tariffs enable row level security;

drop policy if exists "port_tariffs_public_select_active" on public.port_tariffs;
create policy "port_tariffs_public_select_active"
on public.port_tariffs
for select
using (active = true);

drop policy if exists "port_tariffs_manager_select_all" on public.port_tariffs;
create policy "port_tariffs_manager_select_all"
on public.port_tariffs
for select
using (public.is_port_tariff_manager());

drop policy if exists "port_tariffs_manager_insert" on public.port_tariffs;
create policy "port_tariffs_manager_insert"
on public.port_tariffs
for insert
with check (public.is_port_tariff_manager());

drop policy if exists "port_tariffs_manager_update" on public.port_tariffs;
create policy "port_tariffs_manager_update"
on public.port_tariffs
for update
using (public.is_port_tariff_manager())
with check (public.is_port_tariff_manager());

grant select on public.port_tariffs to anon, authenticated;
grant insert, update on public.port_tariffs to authenticated;

-- Seed with the current public rate card so the table isn't empty on first
-- deploy; safe to run repeatedly since it only inserts when empty.
insert into public.port_tariffs
  (category, length_max, daily_price, monthly_price, yearly_price, currency, sort_order)
select category, length_max, daily_price, monthly_price, yearly_price, 'TND', sort_order
from (
  values
    ('Jusqu''à 7,49 m', 7.49, 30, 400, 2200, 1),
    ('7,5 m à 8,49 m', 8.49, 35, 450, 2400, 2),
    ('8,5 m à 9,49 m', 9.49, 40, 500, 2800, 3),
    ('9,5 m à 10,49 m', 10.49, 45, 600, 3500, 4),
    ('10,5 m à 11,49 m', 11.49, 50, 700, 3800, 5),
    ('11,5 m à 12,49 m', 12.49, 60, 800, 4200, 6),
    ('12,5 m à 13,49 m', 13.49, 65, 900, 4800, 7),
    ('13,5 m à 14,49 m', 14.49, 75, 1000, 5700, 8),
    ('14,5 m à 15,49 m', 15.49, 90, 1100, 6100, 9),
    ('15,5 m à 16,49 m', 16.49, 100, 1200, 7000, 10),
    ('16,5 m à 17,49 m', 17.49, 110, 1300, 7500, 11),
    ('17,5 m à 18,49 m', 18.49, 125, 1500, 8500, 12),
    ('18,5 m à 19,49 m', 19.49, 150, 2000, 9500, 13),
    ('19,5 m à 20,49 m', 20.49, 170, 2500, 11500, 14),
    ('20,5 m à 25,00 m', 25.00, 200, 3000, 12500, 15),
    ('25,01 m à 30,00 m', 30.00, 300, 3500, 16500, 16),
    ('Plus de 30 m', null, 400, 4000, 19000, 17)
) as seed(category, length_max, daily_price, monthly_price, yearly_price, sort_order)
where not exists (select 1 from public.port_tariffs);
