import { reservations, rooms } from "@/data/hotel";

// TODO: Real Airbnb sync requires official/partner API approval, OAuth,
// webhook verification, listing mapping, rate limits, retries, and audit logs.
export function connectMock() {
  return { channel: "airbnb", connected: false, message: "Connexion Airbnb non configurée." };
}

export function syncReservationsMock() {
  return reservations.filter((reservation) => reservation.source === "airbnb");
}

export function pushAvailabilityMock() {
  return rooms.map((room) => ({ roomId: room.id, pushedUnits: room.totalUnits }));
}

export function pushRatesMock() {
  return rooms.map((room) => ({ roomId: room.id, pricePerNight: room.pricePerNight }));
}

export function getSyncLogsMock() {
  return [
    {
      level: "warning",
      message: "API partenaire Airbnb requise avant toute synchronisation réelle.",
    },
  ];
}
