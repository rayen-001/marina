import type { PriceBreakdown, Room } from "@/data/hotel";
import { calculateTotal } from "@/data/hotel";
import {
  buildNightlyRateBreakdown,
  calculateDateRangeTotal,
  getRoomDateRangeRules,
  type DateRangeRules,
  type NightlyRateBreakdown,
} from "@/lib/services/rateCalendarService";
import { tr } from "@/lib/i18n/locale";
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

  if (!checkIn || !checkOut) {
    return {
      breakdown: fallbackBreakdown,
      availability: 0,
      canBook: false,
      loading: false,
      minNights: 1,
      rules: emptyRules,
      nightlyRates: [],
      reason: null,
    };
  }

  if (checkIn >= checkOut) {
    return {
      breakdown: fallbackBreakdown,
      availability: 0,
      canBook: false,
      loading: false,
      minNights: 1,
      rules: emptyRules,
      nightlyRates: [],
      reason: tr(
        "La date de départ doit être supérieure à la date d'arrivée.",
        "The check-out date must be after the check-in date.",
      ),
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
  if (breakdown.nights <= 0) return tr("Sélectionnez des dates valides.", "Select valid dates.");
  if (rules.blockingDates.length > 0) {
    return formatBlockedDatesMessage(rules.blockingDates);
  }
  if (breakdown.nights < rules.minNights) {
    return tr(
      `Séjour minimum de ${rules.minNights} nuit${rules.minNights > 1 ? "s" : ""} sur ces dates.`,
      `Minimum stay of ${rules.minNights} night${rules.minNights > 1 ? "s" : ""} on these dates.`,
    );
  }
  if (availability <= 0) {
    return tr("Aucune unité disponible pour ces dates.", "No units available for these dates.");
  }
  return null;
}

function formatBlockedDatesMessage(
  blockingDates: Array<{ date: string; availabilityStatus: string }>,
): string {
  if (blockingDates.length === 0) return tr("Dates indisponibles.", "Dates unavailable.");

  const dates = blockingDates.map((b) => b.date).sort();
  const formatDateFr = (isoStr: string) => {
    const [y, m, d] = isoStr.split("-");
    return `${d}/${m}/${y}`;
  };
  const formatDateShortFr = (isoStr: string) => {
    const [y, m, d] = isoStr.split("-");
    return `${d}/${m}`;
  };

  if (dates.length === 1) {
    return tr(
      `La date du ${formatDateFr(dates[0])} est indisponible. Veuillez consulter le calendrier.`,
      `${formatDateFr(dates[0])} is unavailable. Please check the calendar.`,
    );
  }

  // Check if dates are consecutive
  let isConsecutive = true;
  for (let i = 0; i < dates.length - 1; i++) {
    const current = new Date(`${dates[i]}T12:00:00`);
    const next = new Date(`${dates[i + 1]}T12:00:00`);
    const diff = (next.getTime() - current.getTime()) / (1000 * 60 * 60 * 24);
    if (Math.round(diff) !== 1) {
      isConsecutive = false;
      break;
    }
  }

  if (isConsecutive) {
    const start = formatDateShortFr(dates[0]);
    const end = formatDateFr(dates[dates.length - 1]);
    return tr(
      `Dates indisponibles du ${start} au ${end}. Veuillez consulter le calendrier.`,
      `Dates unavailable from ${start} to ${end}. Please check the calendar.`,
    );
  }

  const listStr = dates.map(formatDateShortFr).join(", ");
  return tr(
    `Dates indisponibles (${listStr}). Veuillez consulter le calendrier.`,
    `Dates unavailable (${listStr}). Please check the calendar.`,
  );
}
