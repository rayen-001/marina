const { createClient } = require("@supabase/supabase-js");

const url = "https://evaucodkesfjtfpstsdp.supabase.co";
const key = "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0";
const supabase = createClient(url, key);

async function testUpdateError() {
  const { data, error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("is_read", false)
    .select();

  console.log("Update error:", error);
  console.log("Updated data:", data);

  const { data: resData, error: resErr } = await supabase
    .from("reservation_messages")
    .update({ is_read: true })
    .eq("is_read", false)
    .select();

  console.log("Reservation messages update error:", resErr);
  console.log("Reservation messages updated data:", resData);
}

testUpdateError();
