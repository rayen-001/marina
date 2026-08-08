-- Corrective, idempotent fix for a likely side effect of
-- 20260708000000_deactivate_legacy_room_types.sql: that migration matched
-- legacy demo room types by `slug` against 4 hardcoded literals. If any of
-- the 4 real room types has a slug that doesn't exactly match those
-- literals (different casing, missing slug, etc.), it would have been
-- wrongly deactivated too — which would explain /admin/rooms showing only
-- "Studio" while the public site still shows all 4 (it silently pads
-- missing/inactive Supabase rows with local mock defaults; the admin page
-- has no such fallback and shows the table as it really is).
--
-- This matches by exact `name` instead of `slug` (the previous mistake),
-- and only touches rows that are currently inactive — a no-op if the
-- hypothesis above turns out to be wrong or already fixed.
update public.room_types
set status = 'active'
where status <> 'active'
  and name in (
    'Studio',
    'Appartement Économique S+1',
    'Appartement Economique S+1',
    'Appartement Standard S+1',
    'Appartement S+2'
  );
