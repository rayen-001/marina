import { getMonthlyCalendar } from "../src/lib/services/rateCalendarService";

async function main() {
  const result = await getMonthlyCalendar("be47c5a0-5915-4e45-a355-bcda4a85bb5b", 2026, 8, 5, 95);
  console.log("AUGUST 2026 DAYS 10-16:");
  const slice = result.days.filter((d) => d.date >= "2026-08-10" && d.date <= "2026-08-16");
  console.dir(slice, { depth: null });
}

main();
