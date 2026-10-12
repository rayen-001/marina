import { channelConnections, reservations, rooms, roomsAvailable } from "@/data/hotel";
import type { AutomationAlert } from "@/lib/types/hotel";
import { detectReservationsWithoutInvoice } from "./invoiceAutomation";
import { detectUnpaidReservations } from "./paymentAutomation";
import { getArrivalsToday, getDeparturesToday } from "./reservationAutomation";

export function detectOverbookingRisk(today = new Date().toISOString().slice(0, 10)) {
  const tomorrow = new Date(`${today}T12:00:00`);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkOut = tomorrow.toISOString().slice(0, 10);
  return rooms.filter((room) => roomsAvailable(room, today, checkOut) <= 1);
}

export function createHotelOperationAlerts(
  today = new Date().toISOString().slice(0, 10),
): AutomationAlert[] {
  const createdAt = new Date().toISOString();
  return [
    ...detectUnpaidReservations().map(
      (reservation): AutomationAlert => ({
        id: `alert-payment-${reservation.id}`,
        type: "payment_pending",
        severity: reservation.checkIn <= today ? "critical" : "warning",
        title: "Paiement en attente",
        description: `${reservation.guest.fullName} a un solde à suivre avant l'arrivée.`,
        reservationId: reservation.id,
        createdAt,
      }),
    ),
    ...getArrivalsToday(today).map(
      (reservation): AutomationAlert => ({
        id: `alert-arrival-${reservation.id}`,
        type: "arrival_today",
        severity: "info",
        title: "Arrivée aujourd'hui",
        description: `${reservation.guest.fullName} est attendu à la réception.`,
        reservationId: reservation.id,
        createdAt,
      }),
    ),
    ...getDeparturesToday(today).map(
      (reservation): AutomationAlert => ({
        id: `alert-departure-${reservation.id}`,
        type: "departure_today",
        severity: "info",
        title: "Départ aujourd'hui",
        description: `${reservation.guest.fullName} doit finaliser le check-out.`,
        reservationId: reservation.id,
        createdAt,
      }),
    ),
    ...detectOverbookingRisk(today).map(
      (room): AutomationAlert => ({
        id: `alert-overbooking-${room.id}`,
        type: "overbooking_risk",
        severity: "warning",
        title: "Risque de survente",
        description: `${room.name} approche de la capacité maximale.`,
        roomTypeId: room.id,
        createdAt,
      }),
    ),
    ...rooms
      .filter((room) => room.status === "maintenance")
      .map(
        (room): AutomationAlert => ({
          id: `alert-maintenance-${room.id}`,
          type: "maintenance_room",
          severity: "warning",
          title: "Chambre en maintenance",
          description: `${room.name} est indisponible à la vente.`,
          roomTypeId: room.id,
          createdAt,
        }),
      ),
    ...channelConnections
      .flatMap((channel) => channel.errors ?? [])
      .map(
        (error, index): AutomationAlert => ({
          id: `alert-channel-${index}`,
          type: "channel_sync_error",
          severity: "critical",
          title: "Erreur de synchronisation channel",
          description: error,
          createdAt,
        }),
      ),
    ...detectReservationsWithoutInvoice().map(
      (reservation): AutomationAlert => ({
        id: `alert-invoice-${reservation.id}`,
        type: "invoice_not_generated",
        severity: "warning",
        title: "Facture à générer",
        description: `La réservation ${reservation.reservationNumber} n'a pas encore de facture.`,
        reservationId: reservation.id,
        createdAt,
      }),
    ),
  ];
}
