import { reservations, rooms } from "@/data/hotel";

// TODO: Real Booking.com sync requires Connectivity API partner access,
// OAuth/API credentials, webhooks, rate-limit handling, retries, monitoring,
// and contract validation before touching production reservations.
export function connectMock() {
  return { channel: "booking_com", connected: true, message: "Connexion Booking.com simulée." };
}

export function syncReservationsMock() {
  return reservations.filter((reservation) => reservation.source === "booking_com");
}

export function pushAvailabilityMock() {
  return rooms.map((room) => ({ roomId: room.id, pushedUnits: room.totalUnits }));
}

export function pushRatesMock() {
  return rooms.map((room) => ({ roomId: room.id, pricePerNight: room.pricePerNight }));
}

export function getSyncLogsMock() {
  return [
    { level: "info", message: "Disponibilités simulées envoyées vers Booking.com." },
    { level: "warning", message: "Parité tarifaire à vérifier avant connexion réelle." },
  ];
}
