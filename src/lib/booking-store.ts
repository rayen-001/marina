import type { Room } from "@/data/hotel";
import { calculateNights, formatCurrency, roomsAvailable, type PaymentStatus } from "@/data/hotel";

export type BookingDraft = {
  roomId?: string;
  checkIn?: string;
  checkOut?: string;
  adults: number;
  children: number;
  reservationNumber?: string;
  paymentStatus?: PaymentStatus;
};

const initialDraft: BookingDraft = { adults: 2, children: 0 };
let draft: BookingDraft = readDraft();

export const bookingStore = {
  get: () => draft,
  set: (next: Partial<BookingDraft>) => {
    draft = { ...draft, ...next };
    writeDraft(draft);
  },
  rememberReservation: (reservationNumber: string) => {
    draft = { ...draft, reservationNumber };
    writeDraft(draft);
  },
  reset: () => {
    draft = { ...initialDraft };
    writeDraft(draft);
  },
};

export function nightsBetween(checkIn?: string, checkOut?: string) {
  return calculateNights(checkIn, checkOut);
}

export function availableRooms(room: Room, checkIn?: string, checkOut?: string) {
  return roomsAvailable(room, checkIn, checkOut);
}

export function formatUsd(value: number) {
  return formatCurrency(value);
}

function readDraft(): BookingDraft {
  if (typeof window === "undefined") return { ...initialDraft };
  try {
    const raw = window.sessionStorage.getItem("marina-booking-draft");
    return raw ? { ...initialDraft, ...JSON.parse(raw) } : { ...initialDraft };
  } catch {
    return { ...initialDraft };
  }
}

function writeDraft(next: BookingDraft) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem("marina-booking-draft", JSON.stringify(next));
}
