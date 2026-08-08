import { reservations, rooms } from "@/data/hotel";

// TODO: Real Expedia sync requires Expedia Rapid or Partner Central access,
// API keys, property/listing mapping, webhooks, rate limits, retries, and
// reconciliation of payouts before enabling production sync.
export function connectMock() {
  return { channel: "expedia", connected: false, message: "Connexion Expedia en attente." };
}

export function syncReservationsMock() {
  return reservations.filter((reservation) => reservation.source === "expedia");
}

export function pushAvailabilityMock() {
  return rooms.map((room) => ({ roomId: room.id, pushedUnits: room.totalUnits }));
}

export function pushRatesMock() {
  return rooms.map((room) => ({ roomId: room.id, pricePerNight: room.pricePerNight }));
}

export function getSyncLogsMock() {
  return [{ level: "error", message: "Identifiants Expedia absents dans cette maquette locale." }];
}
