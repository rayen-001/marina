import { rooms, updateReservationStatus, type RoomStatus } from "@/data/hotel";

export function autoUpdateRoomStatusAfterCheckIn(reservationId: string) {
  return updateReservationStatus(reservationId, "checked_in");
}

export function autoUpdateRoomStatusAfterCheckOut(reservationId: string) {
  return updateReservationStatus(reservationId, "checked_out");
}

export function setRoomTypeStatus(roomId: string, status: RoomStatus) {
  const room = rooms.find((item) => item.id === roomId);
  if (room) room.status = status;
  return room;
}
