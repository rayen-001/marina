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
