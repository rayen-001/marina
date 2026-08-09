const { createClient } = require("@supabase/supabase-js");

const url = "https://evaucodkesfjtfpstsdp.supabase.co";
const key = "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0";
const supabase = createClient(url, key);

async function test() {
  const uuid = "be47c5a0-5915-4e45-a355-bcda4a85bb5b";
  const [rateRes, blockRes] = await Promise.all([
    supabase
      .from("room_rate_calendar")
      .select("date,status,price,min_nights,note,inventory_mode,units_available_override,selected_unit_ids")
      .eq("room_type_id", uuid)
      .gte("date", "2026-08-01")
      .lte("date", "2026-08-31")
      .order("date"),
    supabase
      .from("room_availability_blocks")
      .select("start_date,end_date,status")
      .eq("room_type_id", uuid)
      .lt("start_date", "2026-09-01")
      .gte("end_date", "2026-08-01"),
  ]);

  console.log("rateRes error:", rateRes.error);
  console.log("rateRes rows count:", rateRes.data?.length);
  console.log("blockRes error:", blockRes.error);
  console.log("blockRes rows count:", blockRes.data?.length);
  console.log("Non available rows:", rateRes.data?.filter(r => r.status !== 'available'));
}

test();
