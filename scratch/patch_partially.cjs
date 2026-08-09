const { createClient } = require("@supabase/supabase-js");

const url = "https://evaucodkesfjtfpstsdp.supabase.co";
const key = "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0";
const supabase = createClient(url, key);

async function patch() {
  const uuid = "be47c5a0-5915-4e45-a355-bcda4a85bb5b";
  const dates = ["2026-08-15", "2026-08-16", "2026-08-17", "2026-08-18", "2026-08-19", "2026-08-20"];

  for (const date of dates) {
    const { error } = await supabase
      .from("room_rate_calendar")
      .update({ status: "partially_reserved" })
      .eq("room_type_id", uuid)
      .eq("date", date);

    if (error) console.error("Patch error for", date, error);
    else console.log("Updated", date, "to partially_reserved");
  }
}

patch();
