const { createClient } = require("@supabase/supabase-js");

const url = "https://evaucodkesfjtfpstsdp.supabase.co";
const key = "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0";
const supabase = createClient(url, key);

async function test() {
  const uuid = "be47c5a0-5915-4e45-a355-bcda4a85bb5b";
  const { data, error } = await supabase
    .from("room_rate_calendar")
    .select("date,status,price")
    .eq("room_type_id", uuid)
    .gte("date", "2026-08-10")
    .lte("date", "2026-08-21")
    .order("date");

  console.log("Status for 10-21:");
  console.log(data);
}

test();
