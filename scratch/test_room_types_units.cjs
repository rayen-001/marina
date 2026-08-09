const { createClient } = require("@supabase/supabase-js");

const url = "https://evaucodkesfjtfpstsdp.supabase.co";
const key = "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0";
const supabase = createClient(url, key);

async function checkRoomTypes() {
  const { data: roomTypes } = await supabase
    .from("room_types")
    .select("id, name, slug, total_units");

  console.log("Supabase room_types total_units:", roomTypes);
}

checkRoomTypes();
