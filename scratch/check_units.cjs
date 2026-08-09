const { createClient } = require("@supabase/supabase-js");

const url = "https://evaucodkesfjtfpstsdp.supabase.co";
const key = "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0";
const supabase = createClient(url, key);

async function checkUnits() {
  const { data: units } = await supabase
    .from("room_units")
    .select("id, room_type_id, unit_number")
    .eq("room_type_id", "be47c5a0-5915-4e45-a355-bcda4a85bb5b");

  console.log("Units count for Appartement Economique:", units ? units.length : 0);
  console.log("Units detail:", units);
}

checkUnits();
