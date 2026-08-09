const { createClient } = require("@supabase/supabase-js");

const url = "https://evaucodkesfjtfpstsdp.supabase.co";
const key = "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0";
const supabase = createClient(url, key);

// Simulate getMonthlyCalendar logic from rateCalendarService.ts
async function simulateMonthlyCalendar(uuid, year, month, totalUnits = 32, basePrice = 95) {
  const count = new Date(year, month, 0).getDate();
  const allDays = Array.from({ length: count }, (_, i) => {
    const d = i + 1;
    return `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  });

  const startDate = allDays[0];
  const endDate = allDays[allDays.length - 1];

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  const endExclusive = `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`;

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
      .lt("start_date", endExclusive)
      .gte("end_date", startDate),
    supabase
      .from("reservations")
      .select("check_in,check_out,status")
      .eq("room_type_id", uuid)
      .neq("status", "cancelled")
      .neq("status", "no_show")
      .neq("status", "checked_out")
      .lt("check_in", endExclusive)
      .gt("check_out", startDate),
  ]);

  const rateRows = rateRes.data || [];
  const blockRows = blockRes.data || [];
  const resRows = reservationRes.data || [];

  console.log("Simulating for uuid:", uuid);
  console.log("rateRows count:", rateRows.length);
  console.log("resRows count:", resRows.length);

  const mockReservations = [
    { roomId: "appartement-economique-s1", checkIn: "2026-08-15", checkOut: "2026-08-21", status: "confirmed" }
  ];

  const days = allDays.map((date) => {
    const row = rateRows.find((r) => r.date === date);
    const rateStatus = row?.status || "available";
    const inventoryMode = row?.inventory_mode || "auto";

    const reservedCount = resRows.length > 0
      ? resRows.filter((r) => r.check_in <= date && date < r.check_out).length
      : mockReservations.filter((r) => r.checkIn <= date && date < r.checkOut).length;

    let availableUnits = Math.max(0, totalUnits - reservedCount);

    const hasPartialReservation = mockReservations.some((r) => r.checkIn <= date && date < r.checkOut);

    let status = "available";
    if (rateStatus === "not_available" || availableUnits <= 0) {
      status = "not_available";
    } else if (rateStatus === "partially_reserved" || hasPartialReservation || (totalUnits > 0 && availableUnits < totalUnits)) {
      status = "partially_reserved";
    }

    return { date, status, availableUnits, reservedCount };
  });

  const targetDays = days.filter(d => d.date >= "2026-08-10" && d.date <= "2026-08-22");
  console.log("Dates 10-22:", targetDays);
}

simulateMonthlyCalendar("be47c5a0-5915-4e45-a355-bcda4a85bb5b", 2026, 8);
