const { createClient } = require("@supabase/supabase-js");

const url = "https://evaucodkesfjtfpstsdp.supabase.co";
const key = "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0";
const supabase = createClient(url, key);

async function testLogin() {
  const passwords = ["admin123", "owner123", "marina123", "password", "123456", "Marina2026!"];
  for (const pw of passwords) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "owner@marinacapmonastir.tn",
      password: pw,
    });
    if (!error) {
      console.log("SUCCESS! Password is:", pw);
      return data;
    }
  }
  console.log("None of the passwords worked.");
}

testLogin();
