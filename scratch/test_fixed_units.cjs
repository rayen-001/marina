const { createClient } = require("@supabase/supabase-js");

const url = "https://evaucodkesfjtfpstsdp.supabase.co";
const key = "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0";
const supabase = createClient(url, key);

async function testFixedUnits() {
  const uuid = "be47c5a0-5915-4e45-a355-bcda4a85bb5b"; // Appartement Economique
  const totalUnits = 5; // Exactly 5 units as in Supabase room_types!

  const mockReservations = [
    { roomId: "appartement-economique-s1", checkIn: "2026-08-15", checkOut: "2026-08-21", status: "confirmed" }
  ];

  const days = ["2026-08-10", "2026-08-11", "2026-08-12", "2026-08-13", "2026-08-14", "2026-08-15", "2026-08-16", "2026-08-17", "2026-08-18", "2026-08-19", "2026-08-20", "2026-08-21"];

  days.forEach((date) => {
    const reservedCount = mockReservations.filter((r) => r.checkIn <= date && date < r.checkOut).length;
    const availableUnits = Math.max(0, totalUnits - reservedCount);

    let status = "available";
    if (["2026-08-10", "2026-08-11", "2026-08-12", "2026-08-13", "2026-08-14"].includes(date)) {
      status = "not_available";
    } else if (availableUnits < totalUnits || reservedCount > 0) {
      status = "partially_reserved";
    }

    console.log(`Date: ${date} -> status: ${status} (availableUnits: ${availableUnits}/${totalUnits}, reservedCount: ${reservedCount})`);
  });
}

testFixedUnits();
