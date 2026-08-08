-- Marina Cap Monastir real content seed.
-- Safe to re-run: it updates settings/room types by slug and inserts amenities/units only when missing.
-- Existing reservations, guests, payments and invoices are not deleted or modified.

alter table if exists public.hotel_settings
  add column if not exists fax text,
  add column if not exists marketing_email text,
  add column if not exists capitainerie_email text,
  add column if not exists capitainerie_phones text[];

do $$
declare
  settings_id public.hotel_settings.id%type;
begin
  select id into settings_id
  from public.hotel_settings
  order by created_at
  limit 1;

  if settings_id is null then
    insert into public.hotel_settings (
      hotel_name,
      phone,
      fax,
      email,
      marketing_email,
      capitainerie_email,
      capitainerie_phones,
      address,
      tax_registration,
      invoice_prefix,
      default_currency,
      check_in_time,
      check_out_time,
      tax_rate,
      deposit_percentage
    )
    values (
      'Marina Cap Monastir',
      '(+216) 73 46 23 05',
      '(+216) 73 46 49 97',
      'reservation@marinamonastir.tn',
      'marketing@marinamonastir.tn',
      'capitainerie@marinamonastir.tn',
      array['(+216) 73 46 23 05', '(+216) 73 46 20 66'],
      'BP.N°60 - 5000 Monastir - Tunisie',
      'MF 0000000/A/M/000',
      'MCM',
      'TND',
      '14:00',
      '11:00',
      0.12,
      0.30
    );
  else
    update public.hotel_settings
    set
      hotel_name = 'Marina Cap Monastir',
      phone = '(+216) 73 46 23 05',
      fax = '(+216) 73 46 49 97',
      email = 'reservation@marinamonastir.tn',
      marketing_email = 'marketing@marinamonastir.tn',
      capitainerie_email = 'capitainerie@marinamonastir.tn',
      capitainerie_phones = array['(+216) 73 46 23 05', '(+216) 73 46 20 66'],
      address = 'BP.N°60 - 5000 Monastir - Tunisie',
      default_currency = 'TND',
      check_in_time = '14:00',
      check_out_time = '11:00',
      updated_at = now()
    where id = settings_id;
  end if;
end $$;

create temp table marina_seed_room_types (
  slug text not null unique,
  name text not null,
  type text not null,
  description text not null,
  price_per_night numeric not null,
  capacity_adults integer not null,
  capacity_children integer not null,
  beds text not null,
  bathrooms integer not null,
  total_units integer not null,
  amenities text[] not null,
  unit_prefix text not null
) on commit drop;

insert into marina_seed_room_types (
  slug,
  name,
  type,
  description,
  price_per_night,
  capacity_adults,
  capacity_children,
  beds,
  bathrooms,
  total_units,
  amenities,
  unit_prefix
)
values
  (
    'studio',
    'Studio',
    'Studio',
    'Studio fonctionnel pour deux personnes au coeur de Marina Cap Monastir, avec terrasse, kitchenette et confort essentiel pour un séjour en bord de Méditerranée.',
    85,
    2,
    0,
    '1 lit double ou 2 lits simples',
    1,
    36,
    array['Terrasse', 'Télévision à écran plat', 'Climatisation', 'Baignoire', 'Kitchenette', 'Wi-Fi gratuit'],
    'ST'
  ),
  (
    'appartement-economique-s1',
    'Appartement Économique S+1',
    'Appartement',
    'Appartement S+1 simple et pratique pour quatre personnes, idéal pour profiter du port avec kitchenette, climatisation et vue ou entrée côté port.',
    95,
    4,
    0,
    '2 lits simples + 1 canapé-lit',
    1,
    32,
    array['Télévision à écran plat', 'Climatisation', 'Entrée port / Vue port', 'Kitchenette', 'Wi-Fi gratuit'],
    'ECO'
  ),
  (
    'appartement-standard-s1',
    'Appartement Standard S+1',
    'Appartement',
    'Appartement S+1 confortable avec terrasse et vue sur le port, pensé pour les séjours en famille ou entre amis à Marina Cap Monastir.',
    110,
    4,
    0,
    '1 lit double ou 2 lits simples + 1 canapé-lit',
    1,
    34,
    array['Télévision à écran plat', 'Climatisation', 'Vue port', 'Kitchenette', 'Wi-Fi gratuit', 'Terrasse'],
    'STD'
  ),
  (
    'appartement-s2',
    'Appartement S+2',
    'Appartement',
    'Appartement spacieux pour six personnes avec deux espaces nuit, kitchenette et terrasse, adapté aux familles qui souhaitent séjourner directement sur la marina.',
    140,
    6,
    0,
    '2 lits simples + 1 lit double + 1 canapé-lit',
    1,
    18,
    array['Télévision à écran plat', 'Climatisation', 'Kitchenette', 'Wi-Fi gratuit', 'Terrasse'],
    'S2'
  );

do $$
declare
  seed_room record;
begin
  for seed_room in select * from marina_seed_room_types loop
    if exists (select 1 from public.room_types where slug = seed_room.slug) then
      update public.room_types
      set
        name = seed_room.name,
        type = seed_room.type,
        description = seed_room.description,
        price_per_night = seed_room.price_per_night,
        capacity_adults = seed_room.capacity_adults,
        capacity_children = seed_room.capacity_children,
        beds = seed_room.beds,
        bathrooms = seed_room.bathrooms,
        total_units = seed_room.total_units,
        status = 'active',
        updated_at = now()
      where slug = seed_room.slug;
    else
      insert into public.room_types (
        slug,
        name,
        type,
        description,
        price_per_night,
        capacity_adults,
        capacity_children,
        beds,
        bathrooms,
        total_units,
        status
      )
      values (
        seed_room.slug,
        seed_room.name,
        seed_room.type,
        seed_room.description,
        seed_room.price_per_night,
        seed_room.capacity_adults,
        seed_room.capacity_children,
        seed_room.beds,
        seed_room.bathrooms,
        seed_room.total_units,
        'active'
      );
    end if;
  end loop;
end $$;

insert into public.room_amenities (room_type_id, amenity)
select rt.id, amenity
from marina_seed_room_types seed
join public.room_types rt on rt.slug = seed.slug
cross join lateral unnest(seed.amenities) as amenity
where not exists (
  select 1
  from public.room_amenities existing
  where existing.room_type_id = rt.id
    and existing.amenity = amenity
);

insert into public.room_units (room_type_id, unit_number, status)
select
  rt.id,
  seed.unit_prefix || '-' || lpad(series.unit_index::text, 3, '0') as unit_number,
  'available'
from marina_seed_room_types seed
join public.room_types rt on rt.slug = seed.slug
cross join lateral generate_series(1, seed.total_units) as series(unit_index)
where not exists (
  select 1
  from public.room_units existing
  where existing.room_type_id = rt.id
    and existing.unit_number = seed.unit_prefix || '-' || lpad(series.unit_index::text, 3, '0')
);
