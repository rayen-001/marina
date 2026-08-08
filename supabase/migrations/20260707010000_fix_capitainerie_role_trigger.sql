-- The new-user trigger's role allowlist was never updated when the
-- 'capitainerie' role was introduced, so any auth user created with
-- user_metadata.role = 'capitainerie' was silently downgraded to 'client'
-- on profile creation (the trigger's own bounds check, not the checked-in
-- profiles_role_check constraint, which already allowed it).
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
  if requested_role not in ('admin', 'owner', 'client', 'capitainerie') then
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
