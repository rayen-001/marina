import { RoomCard } from "./room-card";
import type { Room } from "@/data/hotel";

type Props = {
  property: Room;
  availableRooms?: number;
  showAvailability?: boolean;
  checkIn?: string;
  checkOut?: string;
};

export function PropertyCard({
  property,
  availableRooms,
  showAvailability,
  checkIn,
  checkOut,
}: Props) {
  return (
    <RoomCard
      room={property}
      availableUnits={availableRooms}
      showAvailability={showAvailability}
      checkIn={checkIn}
      checkOut={checkOut}
    />
  );
}
