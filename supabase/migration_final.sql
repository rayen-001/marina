-- ============================================================
-- FINAL CONSOLIDATED MIGRATION - MARINA CAP MONASTIR
-- Run this script in Supabase SQL Editor
-- ============================================================

-- 1. Tables room_date_prices & room_date_rates (Rate calendar)
CREATE TABLE IF NOT EXISTS room_date_prices (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id            uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  room_id             uuid NOT NULL REFERENCES room_types(id) ON DELETE CASCADE,
  date                date NOT NULL,
  price               numeric(10,2) NOT NULL DEFAULT 0,
  availability_status text NOT NULL DEFAULT 'available',
  min_nights          integer NOT NULL DEFAULT 1,
  note                text,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS room_date_prices_owner_room_date_idx
  ON room_date_prices (owner_id, room_id, date);

CREATE TABLE IF NOT EXISTS room_date_rates (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id            uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  room_id             uuid NOT NULL REFERENCES room_types(id) ON DELETE CASCADE,
  date                date NOT NULL,
  price               numeric(10,2) NOT NULL DEFAULT 0,
  availability_status text NOT NULL DEFAULT 'available',
  min_nights          integer NOT NULL DEFAULT 1,
  note                text,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now(),
  UNIQUE (room_id, date)
);

CREATE TABLE IF NOT EXISTS room_availability_blocks (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_type_id uuid NOT NULL REFERENCES room_types(id) ON DELETE CASCADE,
  start_date   date NOT NULL,
  end_date     date NOT NULL,
  status       text NOT NULL DEFAULT 'not_available',
  reason       text,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

-- 2. Tables channel_connections, channel_room_mappings, sync_logs
CREATE TABLE IF NOT EXISTS channel_connections (
  id                          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel                     text NOT NULL,
  name                        text,
  status                      text NOT NULL DEFAULT 'connected',
  last_sync                   timestamptz,
  commission_rate             numeric(5,2),
  imported_reservations_count integer DEFAULT 0,
  pushed_availability_count   integer DEFAULT 0,
  pushed_prices_count         integer DEFAULT 0,
  errors                      text[],
  warnings                    text[],
  created_at                  timestamptz DEFAULT now(),
  updated_at                  timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS channel_room_mappings (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_type_id          uuid NOT NULL REFERENCES room_types(id) ON DELETE CASCADE,
  channel_connection_id uuid REFERENCES channel_connections(id) ON DELETE CASCADE,
  channel               text NOT NULL DEFAULT 'booking',
  external_listing_id   text NOT NULL DEFAULT '',
  sync_status           text NOT NULL DEFAULT 'synced',
  created_at            timestamptz DEFAULT now(),
  updated_at            timestamptz DEFAULT now()
);

ALTER TABLE channel_room_mappings ADD COLUMN IF NOT EXISTS channel text NOT NULL DEFAULT 'booking';
ALTER TABLE channel_room_mappings ADD COLUMN IF NOT EXISTS sync_status text NOT NULL DEFAULT 'synced';
ALTER TABLE channel_room_mappings ADD COLUMN IF NOT EXISTS external_listing_id text NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS sync_logs (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_connection_id uuid REFERENCES channel_connections(id) ON DELETE SET NULL,
  channel               text NOT NULL DEFAULT 'booking',
  direction             text NOT NULL DEFAULT 'inbound',
  status                text NOT NULL DEFAULT 'success',
  message               text,
  payload               jsonb,
  started_at            timestamptz DEFAULT now(),
  completed_at          timestamptz,
  created_at            timestamptz DEFAULT now()
);

ALTER TABLE sync_logs ADD COLUMN IF NOT EXISTS started_at timestamptz DEFAULT now();
ALTER TABLE sync_logs ADD COLUMN IF NOT EXISTS completed_at timestamptz;
ALTER TABLE sync_logs ADD COLUMN IF NOT EXISTS channel text NOT NULL DEFAULT 'booking';
ALTER TABLE sync_logs ADD COLUMN IF NOT EXISTS direction text NOT NULL DEFAULT 'inbound';
ALTER TABLE sync_logs ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'success';
ALTER TABLE sync_logs ADD COLUMN IF NOT EXISTS message text;
ALTER TABLE sync_logs ADD COLUMN IF NOT EXISTS payload jsonb;

-- 3. Conversations & Messages (allow NULL owner_id & reservation_id for public contact form)
CREATE TABLE IF NOT EXISTS reservation_conversations (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id       uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  reservation_id uuid REFERENCES reservations(id) ON DELETE CASCADE,
  client_name    text NOT NULL,
  client_email   text,
  client_phone   text,
  status         text NOT NULL DEFAULT 'open',
  created_at     timestamptz DEFAULT now(),
  updated_at     timestamptz DEFAULT now()
);

ALTER TABLE reservation_conversations ALTER COLUMN owner_id DROP NOT NULL;
ALTER TABLE reservation_conversations ALTER COLUMN reservation_id DROP NOT NULL;

CREATE TABLE IF NOT EXISTS reservation_messages (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES reservation_conversations(id) ON DELETE CASCADE,
  sender_type     text NOT NULL DEFAULT 'guest',
  sender_name     text NOT NULL,
  message         text NOT NULL,
  is_read         boolean NOT NULL DEFAULT false,
  created_at      timestamptz DEFAULT now()
);

-- 4. RPC Functions
DROP FUNCTION IF EXISTS get_available_units(uuid, date, date);
DROP FUNCTION IF EXISTS get_available_units(p_room_type_id uuid, p_check_in date, p_check_out date);

CREATE OR REPLACE FUNCTION get_available_units(
  room_type_id uuid,
  check_in     date,
  check_out    date
)
RETURNS integer
LANGUAGE sql
STABLE
AS $$
  SELECT GREATEST(
    0,
    COALESCE((SELECT total_units FROM room_types WHERE id = room_type_id), 0)
    -
    COALESCE((
      SELECT COUNT(*)::integer
      FROM reservations
      WHERE room_type_id = get_available_units.room_type_id
        AND status IN ('pending', 'confirmed', 'checked_in')
        AND check_in  < get_available_units.check_out
        AND check_out > get_available_units.check_in
    ), 0)
  );
$$;

CREATE OR REPLACE FUNCTION send_reservation_message(
  p_conversation_id uuid,
  p_sender_type text,
  p_sender_name text,
  p_message text
)
RETURNS setof reservation_messages
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE reservation_conversations SET updated_at = now() WHERE id = p_conversation_id;
  RETURN QUERY
  INSERT INTO reservation_messages (conversation_id, sender_type, sender_name, message, is_read)
  VALUES (p_conversation_id, p_sender_type, p_sender_name, p_message, false)
  RETURNING *;
END;
$$;

CREATE OR REPLACE FUNCTION mark_conversation_read_rpc(
  p_conversation_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE messages
  SET is_read = true
  WHERE sender_id = p_conversation_id OR receiver_id = p_conversation_id;

  UPDATE reservation_messages
  SET is_read = true
  WHERE conversation_id = p_conversation_id;
END;
$$;

CREATE OR REPLACE FUNCTION mark_reservation_messages_read(
  p_conversation_id uuid,
  p_reader_type text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF p_reader_type = 'admin' THEN
    UPDATE reservation_messages SET is_read = true WHERE conversation_id = p_conversation_id AND sender_type = 'guest';
  ELSE
    UPDATE reservation_messages SET is_read = true WHERE conversation_id = p_conversation_id AND sender_type = 'admin';
  END IF;
END;
$$;
  UPDATE reservation_messages SET is_read = true WHERE conversation_id = p_conversation_id AND sender_type != p_reader_type;
END;
$$;

CREATE OR REPLACE FUNCTION link_guest_reservations_to_client()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_user_email text;
BEGIN
  IF v_user_id IS NULL THEN
    RETURN;
  END IF;

  SELECT email INTO v_user_email FROM auth.users WHERE id = v_user_id;
  IF v_user_email IS NULL THEN
    RETURN;
  END IF;

  UPDATE reservations
  SET guest_id = v_user_id
  WHERE LOWER(email) = LOWER(v_user_email)
    AND (guest_id IS NULL OR guest_id != v_user_id);
END;
$$;

-- 5. Row Level Security Policies
ALTER TABLE guests                    ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_date_prices         ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_date_rates          ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_availability_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE channel_connections      ENABLE ROW LEVEL SECURITY;
ALTER TABLE channel_room_mappings    ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs                ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservation_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservation_messages      ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select" ON room_date_prices;
DROP POLICY IF EXISTS "public_select" ON room_date_rates;
DROP POLICY IF EXISTS "public_select" ON room_availability_blocks;
DROP POLICY IF EXISTS "public_select" ON channel_connections;
DROP POLICY IF EXISTS "public_select" ON channel_room_mappings;
DROP POLICY IF EXISTS "public_select" ON sync_logs;
DROP POLICY IF EXISTS "public_select" ON reservation_conversations;
DROP POLICY IF EXISTS "public_select" ON reservation_messages;

DROP POLICY IF EXISTS "public_all_guests" ON guests;
CREATE POLICY "public_all_guests" ON guests FOR ALL USING (true);

DROP POLICY IF EXISTS "public_all_res_conversations" ON reservation_conversations;
CREATE POLICY "public_all_res_conversations" ON reservation_conversations FOR ALL USING (true);

DROP POLICY IF EXISTS "public_all_res_messages" ON reservation_messages;
CREATE POLICY "public_all_res_messages" ON reservation_messages FOR ALL USING (true);

CREATE POLICY "public_select" ON room_date_prices         FOR SELECT USING (true);
CREATE POLICY "public_select" ON room_date_rates          FOR SELECT USING (true);
CREATE POLICY "public_select" ON room_availability_blocks FOR SELECT USING (true);
CREATE POLICY "public_select" ON channel_connections       FOR SELECT USING (true);
CREATE POLICY "public_select" ON channel_room_mappings     FOR SELECT USING (true);
CREATE POLICY "public_select" ON sync_logs              FOR SELECT USING (true);
CREATE POLICY "public_select" ON reservation_conversations FOR SELECT USING (true);
CREATE POLICY "public_select" ON reservation_messages      FOR SELECT USING (true);

DROP POLICY IF EXISTS "auth_write" ON room_date_prices;
DROP POLICY IF EXISTS "auth_write" ON room_date_rates;
DROP POLICY IF EXISTS "auth_write" ON room_availability_blocks;
DROP POLICY IF EXISTS "auth_write" ON channel_connections;
DROP POLICY IF EXISTS "auth_write" ON channel_room_mappings;
DROP POLICY IF EXISTS "auth_write" ON sync_logs;
DROP POLICY IF EXISTS "auth_write" ON reservation_conversations;
DROP POLICY IF EXISTS "auth_write" ON reservation_messages;

CREATE POLICY "auth_write" ON room_date_prices         FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON room_date_rates          FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON room_availability_blocks FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON channel_connections       FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON channel_room_mappings     FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON sync_logs              FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON reservation_conversations FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON reservation_messages      FOR ALL USING (auth.uid() IS NOT NULL);

-- 6. Reload Supabase Schema Cache
NOTIFY pgrst, 'reload schema';
