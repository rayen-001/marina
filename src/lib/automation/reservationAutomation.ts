import {
  calculateNights,
  calculateTotal,
  generateReservationNumber,
  reservations,
  rooms,
  type Reservation,
} from "@/data/hotel";

export { calculateNights, calculateTotal, generateReservationNumber };

export function getArrivalsToday(today = new Date().toISOString().slice(0, 10)) {
  return reservations.filter(
    (reservation) => reservation.checkIn === today && reservation.status === "confirmed",
  );
}

export function getDeparturesToday(today = new Date().toISOString().slice(0, 10)) {
  return reservations.filter(
    (reservation) => reservation.checkOut === today && reservation.status === "checked_in",
  );
}

export function getCurrentGuests(today = new Date().toISOString().slice(0, 10)) {
  return reservations.filter(
    (reservation) =>
      reservation.status === "checked_in" &&
      reservation.checkIn <= today &&
      reservation.checkOut > today,
  );
}

export function getRoomForReservation(reservation: Reservation) {
  return rooms.find((room) => room.id === reservation.roomId);
}
