const { createClient } = require("@supabase/supabase-js");

const url = "https://evaucodkesfjtfpstsdp.supabase.co";
const key = "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0";
const supabase = createClient(url, key);

async function checkSupabaseRows() {
  const { data, error } = await supabase
    .from("room_rate_calendar")
    .select("*")
    .eq("room_type_id", "be47c5a0-5915-4e45-a355-bcda4a85bb5b")
    .order("date");

  console.log("Supabase room_rate_calendar error:", error);
  console.log("Supabase room_rate_calendar rows:", data);
}

checkSupabaseRows();
