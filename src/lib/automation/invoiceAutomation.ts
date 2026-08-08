import { generateInvoiceNumber, invoices, reservations } from "@/data/hotel";

export { generateInvoiceNumber };

export function detectReservationsWithoutInvoice() {
  return reservations.filter(
    (reservation) => !invoices.some((invoice) => invoice.reservationId === reservation.id),
  );
}

export function autoCreateInvoiceNumber() {
  return generateInvoiceNumber(invoices.length + 1);
}
