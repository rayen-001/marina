const { createClient } = require("@supabase/supabase-js");

const url = "https://evaucodkesfjtfpstsdp.supabase.co";
const key = "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0";
const supabase = createClient(url, key);

async function upsertDates() {
  const uuid = "be47c5a0-5915-4e45-a355-bcda4a85bb5b";
  const dates = ["2026-08-15", "2026-08-16", "2026-08-17", "2026-08-18", "2026-08-19", "2026-08-20"];

  const payload = dates.map((date) => ({
    room_type_id: uuid,
    date,
    status: "partially_reserved",
    price: 95,
    min_nights: 1,
    inventory_mode: "auto",
  }));

  const { data, error } = await supabase
    .from("room_rate_calendar")
    .upsert(payload, { onConflict: "room_type_id,date" });

  console.log("Upsert error:", error);
  console.log("Upsert result:", data);
}

upsertDates();
