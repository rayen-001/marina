const { createClient } = require("@supabase/supabase-js");

const url = "https://evaucodkesfjtfpstsdp.supabase.co";
const key = "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0";
const supabase = createClient(url, key);

async function checkReservationMessages() {
  const { data: convs } = await supabase
    .from("reservation_conversations")
    .select("*");
  console.log("reservation_conversations:", convs);

  const { data: msgs } = await supabase
    .from("reservation_messages")
    .select("*")
    .eq("is_read", false);
  console.log("Unread reservation_messages:", msgs);
}

checkReservationMessages();
