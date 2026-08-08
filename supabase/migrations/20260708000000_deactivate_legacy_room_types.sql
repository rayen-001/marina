-- Marina Cap Monastir only sells 4 Appart-Hôtel room types (studio,
-- appartement-economique-s1, appartement-standard-s1, appartement-s2). Older
-- demo/seed room types (Appartement Familial, Appartement Premium Terrasse,
-- Chambre Double Classique, Studio Vue Marina, Suite Vue Mer, ...) are still
-- present in room_types and were showing up on the public search page
-- because nothing filtered by status. Deactivate them instead of deleting,
-- to avoid breaking any historical reservations/foreign keys referencing them.
update public.room_types
set status = 'inactive'
where coalesce(slug, id::text) not in (
  'studio',
  'appartement-economique-s1',
  'appartement-standard-s1',
  'appartement-s2'
);
