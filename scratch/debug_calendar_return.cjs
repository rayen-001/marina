const { createClient } = require("@supabase/supabase-js");

const url = "https://evaucodkesfjtfpstsdp.supabase.co";
const key = "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0";
const supabase = createClient(url, key);

async function checkReturn() {
  const uuid = "be47c5a0-5915-4e45-a355-bcda4a85bb5b";
  const startDate = "2026-08-01";
  const endDate = "2026-08-31";

  const [rateRes, blockRes, reservationRes] = await Promise.all([
    supabase
      .from("room_rate_calendar")
      .select("date,status,price,min_nights,note,inventory_mode,units_available_override,selected_unit_ids")
      .eq("room_type_id", uuid)
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date"),
    supabase
      .from("room_availability_blocks")
      .select("start_date,end_date,status")
      .eq("room_type_id", uuid)
      .lt("start_date", "2026-09-01")
      .gte("end_date", startDate),
    supabase
      .from("reservations")
      .select("check_in,check_out,status")
      .eq("room_type_id", uuid)
      .neq("status", "cancelled")
      .neq("status", "no_show")
      .neq("status", "checked_out")
      .lt("check_in", "2026-09-01")
      .gt("check_out", startDate),
  ]);

  console.log("rateRes data:", rateRes.data);
  console.log("blockRes data:", blockRes.data);
  console.log("reservationRes data:", reservationRes.data);
}

checkReturn();
