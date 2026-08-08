import { channelLabels } from "@/data/hotel";
import type { RevenueStats } from "@/lib/types/hotel";
import { listPayments } from "./paymentService";
import { listReservations } from "./reservationService";
import { getRoomAvailability, listRoomTypes } from "./roomService";

export function getTodayIso() {
  return new Date().toISOString().slice(0, 10);
}

export async function getOccupancyRate(date = getTodayIso()) {
  const roomTypes = await listRoomTypes();
  const checkOut = nextDayIso(date);
  const totalUnits = roomTypes.reduce((sum, room) => sum + room.totalUnits, 0);
  const availableUnits = await getAvailableUnitsForDate(date, checkOut);
  const occupiedUnits = Math.max(0, totalUnits - availableUnits);
  return totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
}

export async function getMonthlyRevenueStats(
  month = getTodayIso().slice(0, 7),
): Promise<RevenueStats> {
  const [reservationItems, paymentItems, roomTypes] = await Promise.all([
    listReservations(),
    listPayments(),
    listRoomTypes(),
  ]);

  const paidReservations = reservationItems.filter(
    (reservation) => reservation.checkIn.startsWith(month) && reservation.paymentStatus === "paid",
  );
  const revenue = paidReservations.reduce((sum, reservation) => sum + reservation.total, 0);
  const soldNights = paidReservations.reduce((sum, reservation) => sum + reservation.nights, 0);
  const totalUnits = roomTypes.reduce((sum, room) => sum + room.totalUnits, 0);
  const adr = soldNights > 0 ? Math.round(revenue / soldNights) : 0;
  const revpar = totalUnits > 0 ? Math.round(revenue / totalUnits) : 0;
  const unpaidAmount = reservationItems
    .filter(
      (reservation) =>
        reservation.paymentStatus !== "paid" && reservation.paymentStatus !== "refunded",
    )
    .reduce((sum, reservation) => {
      const paid = paymentItems
        .filter(
          (payment) => payment.reservationId === reservation.id && payment.status !== "refunded",
        )
        .reduce((paymentSum, payment) => paymentSum + payment.amount, 0);
      return sum + Math.max(0, reservation.total - paid);
    }, 0);

  return { month, revenue, adr, revpar, unpaidAmount };
}

export async function getRevenueBySource() {
  const reservationItems = await listReservations();

  return Object.entries(channelLabels).map(([source, label]) => ({
    source,
    label,
    revenue: reservationItems
      .filter(
        (reservation) => reservation.source === source && reservation.paymentStatus === "paid",
      )
      .reduce((sum, reservation) => sum + reservation.total, 0),
  }));
}

export async function getBestSellingRooms() {
  const [roomTypes, reservationItems] = await Promise.all([listRoomTypes(), listReservations()]);

  return roomTypes
    .map((room) => ({
      room,
      reservations: reservationItems.filter((reservation) => reservation.roomId === room.id).length,
      revenue: reservationItems
        .filter((reservation) => reservation.roomId === room.id)
        .reduce((sum, reservation) => sum + reservation.total, 0),
    }))
    .sort((a, b) => b.reservations - a.reservations);
}

export async function getTodayCheckIns(today = getTodayIso()) {
  const reservationItems = await listReservations();
  return reservationItems.filter(
    (reservation) => reservation.checkIn === today && reservation.status === "confirmed",
  );
}

export async function getTodayCheckOuts(today = getTodayIso()) {
  const reservationItems = await listReservations();
  return reservationItems.filter(
    (reservation) => reservation.checkOut === today && reservation.status === "checked_in",
  );
}

export async function getAvailableUnitsForDate(checkIn: string, checkOut = nextDayIso(checkIn)) {
  const roomTypes = await listRoomTypes();
  const availability = await Promise.all(
    roomTypes.map((room) => getRoomAvailability(room, checkIn, checkOut)),
  );
  return availability.reduce((sum, available) => sum + available, 0);
}

function nextDayIso(date: string) {
  const nextDate = new Date(`${date}T12:00:00`);
  nextDate.setDate(nextDate.getDate() + 1);
  return nextDate.toISOString().slice(0, 10);
}
