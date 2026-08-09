const { createClient } = require("@supabase/supabase-js");

const url = "https://evaucodkesfjtfpstsdp.supabase.co";
const key = "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0";
const supabase = createClient(url, key);

async function testMarkRead() {
  const { data: messages, error: fetchErr } = await supabase
    .from("messages")
    .select("*")
    .eq("is_read", false);

  console.log("Unread messages:", messages);

  if (messages && messages.length > 0) {
    const senderId = messages[0].sender_id;
    console.log("Testing update for sender_id:", senderId);

    const res1 = await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("sender_id", senderId)
      .eq("is_read", false)
      .select();

    console.log("Update result:", res1);
  }
}

testMarkRead();
