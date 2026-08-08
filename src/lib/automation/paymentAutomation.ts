import { payments, reservations } from "@/data/hotel";

export function autoCalculatePaidAmount(reservationId: string) {
  return payments
    .filter((payment) => payment.reservationId === reservationId && payment.status !== "refunded")
    .reduce((sum, payment) => sum + payment.amount, 0);
}

export function autoCalculateRemainingPayment(reservationId: string) {
  const reservation = reservations.find((item) => item.id === reservationId);
  if (!reservation) return 0;
  return Math.max(0, reservation.total - autoCalculatePaidAmount(reservationId));
}

export function detectUnpaidReservations() {
  return reservations.filter((reservation) =>
    ["unpaid", "deposit_paid"].includes(reservation.paymentStatus),
  );
}
