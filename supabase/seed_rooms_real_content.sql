-- Marina Cap Monastir — Room type seed with real content.
-- Safe to re-run: upserts room_types by slug, replaces amenities & images per room type.
-- Does NOT delete or modify reservations, guests, payments, or invoices.

-- ─── Temp table with seed data ─────────────────────────────────────────────

create temp table _seed_rooms (
  slug              text        not null primary key,
  name              text        not null,
  type              text        not null,
  description       text        not null,
  price_per_night   numeric     not null,
  capacity_adults   integer     not null,
  capacity_children integer     not null default 0,
  beds              text        not null,
  bathrooms         integer     not null default 1,
  total_units       integer     not null,
  unit_prefix       text        not null,
  amenities         text[]      not null,
  image_url         text        not null,
  image_alt         text        not null
) on commit drop;

insert into _seed_rooms (
  slug, name, type, description,
  price_per_night, capacity_adults, beds, total_units, unit_prefix,
  amenities, image_url, image_alt
) values
  (
    'studio',
    'Studio',
    'Studio',
    'Studio fonctionnel pour deux personnes au cœur de Marina Cap Monastir, avec terrasse, kitchenette et confort essentiel pour un séjour en bord de Méditerranée.',
    85, 2,
    '1 lit double ou 2 lits simples',
    36, 'ST',
    array['Terrasse','Télévision à écran plat','Climatisation','Baignoire','Kitchenette','Wi-Fi gratuit'],
    '/images/rooms/studio.jpg',
    'Studio Marina Cap Monastir'
  ),
  (
    'appartement-economique-s1',
    'Appartement Économique S+1',
    'Appartement',
    'Appartement S+1 simple et pratique pour quatre personnes, idéal pour profiter du port avec kitchenette, climatisation et vue ou entrée côté port.',
    95, 4,
    '2 lits simples + 1 canapé-lit',
    32, 'ECO',
    array['Télévision à écran plat','Climatisation','Entrée port / Vue port','Kitchenette','Wi-Fi gratuit'],
    '/images/rooms/appartement-economique-s1.jpg',
    'Appartement Économique S+1 Marina Cap Monastir'
  ),
  (
    'appartement-standard-s1',
    'Appartement Standard S+1',
    'Appartement',
    'Appartement S+1 confortable avec terrasse et vue sur le port, pensé pour les séjours en famille ou entre amis à Marina Cap Monastir.',
    110, 4,
    '1 lit double ou 2 lits simples + 1 canapé-lit',
    34, 'STD',
    array['Télévision à écran plat','Climatisation','Vue port','Kitchenette','Wi-Fi gratuit','Terrasse'],
    '/images/rooms/appartement-standard-s1.jpg',
    'Appartement Standard S+1 Marina Cap Monastir'
  ),
  (
    'appartement-s2',
    'Appartement S+2',
    'Appartement',
    'Appartement spacieux pour six personnes avec deux espaces nuit, kitchenette et terrasse, adapté aux familles qui souhaitent séjourner directement sur la marina.',
    140, 6,
    '2 lits simples + 1 lit double + 1 canapé-lit',
    18, 'S2',
    array['Télévision à écran plat','Climatisation','Kitchenette','Wi-Fi gratuit','Terrasse'],
    '/images/rooms/appartement-s2.jpg',
    'Appartement S+2 Marina Cap Monastir'
  );

-- ─── Upsert room_types by slug ──────────────────────────────────────────────

do $$
declare
  s _seed_rooms%rowtype;
  existing_id uuid;
begin
  for s in select * from _seed_rooms loop
    select id into existing_id
    from public.room_types
    where slug = s.slug
    limit 1;

    if existing_id is null then
      insert into public.room_types (
        slug, name, type, description,
        price_per_night, capacity_adults, capacity_children,
        beds, bathrooms, total_units, status
      ) values (
        s.slug, s.name, s.type,
        s.description, s.price_per_night,
        s.capacity_adults, s.capacity_children,
        s.beds, s.bathrooms, s.total_units, 'active'
      )
      returning id into existing_id;
    else
      update public.room_types set
        name              = s.name,
        type              = s.type,
        description       = s.description,
        price_per_night   = s.price_per_night,
        capacity_adults   = s.capacity_adults,
        capacity_children = s.capacity_children,
        beds              = s.beds,
        bathrooms         = s.bathrooms,
        total_units       = s.total_units,
        status            = 'active',
        updated_at        = now()
      where id = existing_id;
    end if;

    -- Replace amenities for this room type (idempotent)
    delete from public.room_amenities where room_type_id = existing_id;
    insert into public.room_amenities (room_type_id, amenity)
    select existing_id, unnest(s.amenities);

    -- Replace primary image (sort_order = 1) for this room type (idempotent)
    delete from public.room_images where room_type_id = existing_id and sort_order = 1;
    insert into public.room_images (room_type_id, url, alt_text, sort_order)
    values (existing_id, s.image_url, s.image_alt, 1);

    -- Insert units only when missing
    insert into public.room_units (room_type_id, unit_number, status)
    select
      existing_id,
      s.unit_prefix || '-' || lpad(series::text, 3, '0'),
      'available'
    from generate_series(1, s.total_units) as series
    where not exists (
      select 1 from public.room_units u
      where u.room_type_id = existing_id
        and u.unit_number = s.unit_prefix || '-' || lpad(series::text, 3, '0')
    );

  end loop;
end $$;
