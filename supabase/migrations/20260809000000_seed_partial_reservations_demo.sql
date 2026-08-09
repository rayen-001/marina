-- Seed demo reservations for Appartement Economique S+1 (Aug 15-21 2026)
-- Creates 4 confirmed reservations (out of 5 units) to show partially_reserved status
-- on the public calendar via get_available_units RPC

DO $$
DECLARE
  v_room_type_id uuid := 'be47c5a0-5915-4e45-a355-bcda4a85bb5b';
  v_guest_id uuid;
  v_total_units integer;
BEGIN
  -- Get actual total units
  SELECT total_units INTO v_total_units
  FROM room_types WHERE id = v_room_type_id;

  -- Insert a demo guest if not exists
  INSERT INTO guests (first_name, last_name, email, phone, nationality)
  VALUES ('Demo', 'Partiel', 'demo.partiel@marina.tn', '+21699000001', 'TN')
  ON CONFLICT (email) DO NOTHING;

  SELECT id INTO v_guest_id FROM guests WHERE email = 'demo.partiel@marina.tn';

  IF v_guest_id IS NULL THEN
    RETURN;
  END IF;

  -- Insert 4 reservations covering Aug 15-21 (4/5 units occupied → partially_reserved)
  INSERT INTO reservations (
    reservation_number, room_type_id, guest_id,
    check_in, check_out, adults, children,
    status, payment_status, source,
    nights, room_price, taxes_and_fees, deposit, total, paid_amount, remaining_amount
  ) VALUES
  (
    'RES-DEMO-001', v_room_type_id, v_guest_id,
    '2026-08-15', '2026-08-22', 2, 0,
    'confirmed', 'paid', 'direct',
    7, 95, 0, 95, 665, 665, 0
  ),
  (
    'RES-DEMO-002', v_room_type_id, v_guest_id,
    '2026-08-15', '2026-08-22', 2, 0,
    'confirmed', 'paid', 'direct',
    7, 95, 0, 95, 665, 665, 0
  ),
  (
    'RES-DEMO-003', v_room_type_id, v_guest_id,
    '2026-08-15', '2026-08-22', 2, 0,
    'confirmed', 'paid', 'direct',
    7, 95, 0, 95, 665, 665, 0
  ),
  (
    'RES-DEMO-004', v_room_type_id, v_guest_id,
    '2026-08-15', '2026-08-22', 2, 0,
    'confirmed', 'paid', 'direct',
    7, 95, 0, 95, 665, 665, 0
  )
  ON CONFLICT (reservation_number) DO NOTHING;

  RAISE NOTICE 'Demo partial reservations seeded for Aug 15-21 2026.';
END $$;
