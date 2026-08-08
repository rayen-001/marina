import type { PriceBreakdown, Room } from "@/data/hotel";
import { calculateTotal } from "@/data/hotel";
import {
  buildNightlyRateBreakdown,
  calculateDateRangeTotal,
  getRoomDateRangeRules,
  type DateRangeRules,
  type NightlyRateBreakdown,
} from "@/lib/services/rateCalendarService";
import { getRoomAvailability } from "@/lib/services/roomService";

export type BookingQuote = {
  breakdown: PriceBreakdown;
  availability: number;
  canBook: boolean;
  loading: boolean;
  minNights: number;
  rules: DateRangeRules;
  nightlyRates: NightlyRateBreakdown[];
  reason: string | null;
};

export async function getBookingQuote(
  room: Room,
  checkIn?: string,
  checkOut?: string,
): Promise<BookingQuote> {
  const fallbackBreakdown = calculateTotal(room, checkIn, checkOut);
  const emptyRules: DateRangeRules = {
    rates: [],
    priceByDate: new Map(),
    statusByDate: new Map(),
    minNights: 1,
    blockingDates: [],
  };

  if (!checkIn || !checkOut || checkIn >= checkOut) {
    return {
      breakdown: fallbackBreakdown,
      availability: 0,
      canBook: false,
      loading: false,
      minNights: 1,
      rules: emptyRules,
      nightlyRates: [],
      reason: "Selectionnez des dates valides.",
    };
  }

  const rules = await getRoomDateRangeRules(room.id, checkIn, checkOut);
  const breakdown = calculateDateRangeTotal(rules, checkIn, checkOut, room.pricePerNight);
  const nightlyRates = buildNightlyRateBreakdown(rules, checkIn, checkOut, room.pricePerNight);
  const availability = await getRoomAvailability(room, checkIn, checkOut);
  const reason = getUnbookableReason(breakdown, availability, rules);

  return {
    breakdown,
    availability,
    canBook: !reason,
    loading: false,
    minNights: rules.minNights,
    rules,
    nightlyRates,
    reason,
  };
}

function getUnbookableReason(
  breakdown: PriceBreakdown,
  availability: number,
  rules: DateRangeRules,
) {
  if (breakdown.nights <= 0) return "Selectionnez des dates valides.";
  if (rules.blockingDates.length > 0) {
    const blocked = rules.blockingDates[0];
    return `Indisponible le ${blocked.date} (${formatStatus(blocked.availabilityStatus)}).`;
  }
  if (breakdown.nights < rules.minNights) {
    return `Sejour minimum de ${rules.minNights} nuit${rules.minNights > 1 ? "s" : ""} sur ces dates.`;
  }
  if (availability <= 0) return "Aucune unite disponible pour ces dates.";
  return null;
}

function formatStatus(status: string) {
  const labels: Record<string, string> = {
    available: "disponible",
    partially_reserved: "partiellement reserve",
    not_available: "indisponible",
    reserved: "reserve",
    maintenance: "maintenance",
    closed: "ferme",
  };
  return labels[status] ?? status;
}
