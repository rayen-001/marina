import {
  channelLabels,
  paymentStatusLabels,
  reservationStatusLabels,
  type ChannelSource,
  type PaymentMethod,
  type PaymentStatus,
  type ReservationStatus,
} from "@/data/hotel";
import type { Locale } from "./locale";

// French labels live in data/hotel.ts (unchanged); these are their English counterparts.
const reservationStatusLabelsEn: Record<ReservationStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  checked_in: "Checked in",
  checked_out: "Checked out",
  cancelled: "Cancelled",
  no_show: "No-show",
};

const paymentStatusLabelsEn: Record<PaymentStatus, string> = {
  unpaid: "Unpaid",
  deposit_paid: "Deposit paid",
  paid: "Paid",
  refunded: "Refunded",
};

const channelLabelsEn: Record<ChannelSource, string> = {
  admin: "Admin",
  direct: "Direct",
  booking_com: "Booking.com",
  airbnb: "Airbnb",
  expedia: "Expedia",
  phone: "Phone",
  walk_in: "Walk-in",
};

export const paymentMethodLabels: Record<Locale, Record<PaymentMethod, string>> = {
  fr: {
    cash: "Espèces",
    card: "Carte",
    bank_transfer: "Virement",
    online: "En ligne",
    booking_com_payout: "Versement Booking.com",
    airbnb_payout: "Versement Airbnb",
    expedia_payout: "Versement Expedia",
  },
  en: {
    cash: "Cash",
    card: "Card",
    bank_transfer: "Bank transfer",
    online: "Online",
    booking_com_payout: "Booking.com payout",
    airbnb_payout: "Airbnb payout",
    expedia_payout: "Expedia payout",
  },
};

export function getReservationStatusLabels(locale: Locale) {
  return locale === "en" ? reservationStatusLabelsEn : reservationStatusLabels;
}

export function getPaymentStatusLabels(locale: Locale) {
  return locale === "en" ? paymentStatusLabelsEn : paymentStatusLabels;
}

export function getChannelLabels(locale: Locale) {
  return locale === "en" ? channelLabelsEn : channelLabels;
}

export function getPaymentMethodLabels(locale: Locale) {
  return paymentMethodLabels[locale];
}

/** English counterpart of CLIENT_MESSAGING_LOCKED_REASON (lib/services/messageService.ts). */
export const CLIENT_MESSAGING_LOCKED_REASON_EN =
  "You need an aparthotel booking before contacting the administration.";

// Conversation subjects are stored in French (they are read by the reception team);
// this only changes how they are displayed.
const SUBJECT_EN: Record<string, string> = {
  "Demande générale": "General enquiry",
  "Question réservation": "Booking question",
  "Paiement & Facture": "Payment & invoice",
  "Arrivée / Check-in": "Arrival / Check-in",
  "Demandes spéciales": "Special requests",
  "Reception Marina": "Marina reception",
  "Conversation client": "Guest conversation",
  Conversation: "Conversation",
  "Contact Reception": "Contact reception",
  "Réservation Appart-Hôtel": "Aparthotel booking",
  "Réservation Port de Plaisance": "Berth booking",
  Capitainerie: "Harbour office",
  "Demande spéciale": "Special request",
};

export function localizeSubject(subject: string, locale: Locale) {
  return locale === "fr" ? subject : (SUBJECT_EN[subject] ?? subject);
}
