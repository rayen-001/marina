import {
  getAvailableUnits,
  getDefaultRooms,
  getRoom,
  reservations,
  rooms,
  type Room,
} from "@/data/hotel";
import { isSupabaseConfigured } from "@/lib/supabase/isSupabaseConfigured";
import { mapRoomTypeFromDb } from "@/lib/supabase/mappers";
import {
  getSupabaseOrNull,
  replaceArray,
  warnSupabaseFallback,
} from "@/lib/supabase/serviceHelpers";
import type { Tables } from "@/lib/supabase/types";
import {
  calculateInventoryAvailabilityForDate,
  getRoomDateRangeRules,
  hasInventoryOverride,
  isBlockingAvailabilityStatus,
  type DateRangeRules,
} from "./rateCalendarService";

type RoomImageRow = Tables<"room_images">;
type RoomAmenityRow = Tables<"room_amenities">;
type RoomUnitRow = Tables<"room_units">;
type ReservationAvailabilityRow = {
  id?: string;
  check_in: string;
  check_out: string;
  status: Tables<"reservations">["status"];
  room_unit_id: string | null;
};
type AvailabilityReservationQueryResult = {
  data: ReservationAvailabilityRow[];
  roomUnitIdAvailable: boolean;
  fallbackUsed: boolean;
};
type AvailabilityBlockRow = Pick<
  Tables<"room_availability_blocks">,
  "start_date" | "end_date" | "status"
>;
type RpcResult<T> = {
  data: T | null;
  error: unknown | null;
};
type UntypedRpc = (fn: string, args?: Record<string, unknown>) => Promise<RpcResult<unknown>>;

export async function listRoomTypes() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return rooms;

  try {
    const [roomTypesResult, imagesResult, amenitiesResult, unitsResult] = await Promise.all([
      supabase.from("room_types").select("*").order("name"),
      supabase.from("room_images").select("*").order("sort_order"),
      supabase.from("room_amenities").select("*").order("amenity"),
      supabase.from("room_units").select("*"),
    ]);

    if (roomTypesResult.error) throw roomTypesResult.error;
    if (imagesResult.error) throw imagesResult.error;
    if (amenitiesResult.error) throw amenitiesResult.error;
    if (unitsResult.error) throw unitsResult.error;
    if (!roomTypesResult.data?.length) return rooms;

    const fallbackImages = rooms.map((room) => room.images);
    const imagesByRoom = groupByRoomId(imagesResult.data ?? []);
    const amenitiesByRoom = groupByRoomId(amenitiesResult.data ?? []);
    const unitsByRoom = groupByRoomId(unitsResult.data ?? []);

    const mapped = roomTypesResult.data.map((row, index) => {
      const mappedRoom = mapRoomTypeFromDb(
        row,
        imagesByRoom.get(row.id) ?? [],
        amenitiesByRoom.get(row.id) ?? [],
        fallbackImages[index] ?? rooms[0]?.images ?? [],
      );

      return {
        ...mappedRoom,
        totalUnits: unitsByRoom.get(row.id)?.length || mappedRoom.totalUnits,
      };
    });

    replaceArray(rooms, mergeWithDefaultRooms(mapped));
    return rooms;
  } catch (error) {
    warnSupabaseFallback("room type query", error);
    return rooms;
  }
}

export const listRoomTypesAsync = listRoomTypes;

export async function getRoomType(roomIdOrSlug: string) {
  const roomTypes = await listRoomTypes();
  return roomTypes.find((room) => room.id === roomIdOrSlug || room.slug === roomIdOrSlug);
}

export const getRoomTypeAsync = getRoomType;

export async function getRoomAvailability(room: Room, checkIn?: string, checkOut?: string) {
  if (!checkIn || !checkOut || checkIn >= checkOut)
    return getAvailableUnits(room, checkIn, checkOut);

  const dateRules = await getRoomDateRangeRules(room.id, checkIn, checkOut);
  if (dateRules.blockingDates.length > 0) return 0;

  const supabase = await getSupabaseOrNull();
  if (!supabase) return getAvailableUnits(room, checkIn, checkOut);

  try {
    const managedAvailability = await getInventoryManagedAvailability(
      supabase,
      room,
      checkIn,
      checkOut,
      dateRules,
    );
    if (managedAvailability !== null) return managedAvailability;

    const { data, error } = await supabase.rpc("get_available_units", {
      room_type_id: room.id,
      check_in: checkIn,
      check_out: checkOut,
    });

    if (error) {
      const rpc = supabase.rpc as unknown as UntypedRpc;
      const prefixedResult = await rpc("get_available_units", {
        p_room_type_id: room.id,
        p_check_in: checkIn,
        p_check_out: checkOut,
      });
      if (prefixedResult.error) throw error;
      return Number(prefixedResult.data ?? 0);
    }

    return Number(data ?? 0);
  } catch (error) {
    warnSupabaseFallback("availability RPC", error);
    return getAvailableUnits(room, checkIn, checkOut);
  }
}

async function getInventoryManagedAvailability(
  supabase: NonNullable<Awaited<ReturnType<typeof getSupabaseOrNull>>>,
  room: Room,
  checkIn: string,
  checkOut: string,
  dateRules: DateRangeRules,
) {
  const stayDates = getDatesBetween(checkIn, checkOut, false);
  if (stayDates.length === 0) return 0;

  const blocksResult = await supabase
    .from("room_availability_blocks")
    .select("start_date, end_date, status")
    .eq("room_type_id", room.id)
    .lt("start_date", checkOut)
    .gte("end_date", checkIn);

  if (blocksResult.error) throw blocksResult.error;

  const blockingBlock = ((blocksResult.data ?? []) as AvailabilityBlockRow[]).some(
    (block) =>
      blockOverlapsStay(block, checkIn, checkOut) &&
      ["closed", "not_available", "maintenance"].includes(String(block.status)),
  );
  if (blockingBlock) return 0;

  const ratesByDate = new Map(dateRules.rates.map((rate) => [rate.date, rate]));

  const reservationsResult = await fetchAvailabilityReservations(
    supabase,
    room.id,
    checkIn,
    checkOut,
  );
  const reservations = reservationsResult.data;
  const reservedByDate = buildReservationCountByDate(reservations, checkIn, checkOut);
  const occupiedUnitsByDate = buildOccupiedUnitIdsByDate(reservations, checkIn, checkOut);

  return Math.min(
    ...stayDates.map((date) => {
      const rate = ratesByDate.get(date);
      if (rate && isBlockingAvailabilityStatus(rate.availabilityStatus)) return 0;

      return calculateInventoryAvailabilityForDate({
        rate,
        totalUnits: room.totalUnits,
        reservedUnits: reservedByDate.get(date) ?? 0,
        occupiedSelectedUnitIds: occupiedUnitsByDate.get(date) ?? new Set<string>(),
      });
    }),
  );
}

async function fetchAvailabilityReservations(
  supabase: NonNullable<Awaited<ReturnType<typeof getSupabaseOrNull>>>,
  roomId: string,
  checkIn: string,
  checkOut: string,
): Promise<AvailabilityReservationQueryResult> {
  const withRoomUnitId = await supabase
    .from("reservations")
    .select("id, check_in, check_out, status, room_unit_id")
    .eq("room_type_id", roomId)
    .in("status", ["pending", "confirmed", "checked_in"])
    .lt("check_in", checkOut)
    .gt("check_out", checkIn);

  if (!withRoomUnitId.error) {
    return {
      data: ((withRoomUnitId.data ?? []) as ReservationAvailabilityRow[]).map((reservation) => ({
        ...reservation,
        room_unit_id: reservation.room_unit_id ?? null,
      })),
      roomUnitIdAvailable: true,
      fallbackUsed: false,
    };
  }

  if (!isMissingRoomUnitIdColumnError(withRoomUnitId.error)) {
    throw withRoomUnitId.error;
  }

  if (import.meta.env.DEV) {
    console.info("[roomService] fallback mode: retrying reservations query without room_unit_id", {
      error: withRoomUnitId.error,
    });
  }

  const withoutRoomUnitId = await supabase
    .from("reservations")
    .select("id, check_in, check_out, status")
    .eq("room_type_id", roomId)
    .in("status", ["pending", "confirmed", "checked_in"])
    .lt("check_in", checkOut)
    .gt("check_out", checkIn);

  if (withoutRoomUnitId.error) throw withoutRoomUnitId.error;

  return {
    data: (
      (withoutRoomUnitId.data ?? []) as Array<Omit<ReservationAvailabilityRow, "room_unit_id">>
    ).map((reservation) => ({
      ...reservation,
      room_unit_id: null,
    })),
    roomUnitIdAvailable: false,
    fallbackUsed: true,
  };
}

export function getRoomReservationCount(roomId: string) {
  return reservations.filter((reservation) => reservation.roomId === roomId).length;
}

export async function upsertRoomType(room: Room) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return upsertRoomTypeInMock(room);

  try {
    const { data, error } = await supabase
      .from("room_types")
      .upsert({
        id: room.id,
        slug: room.slug ?? room.id,
        name: room.name,
        type: room.type,
        description: room.description,
        price_per_night: room.pricePerNight,
        capacity_adults: room.capacityAdults,
        capacity_children: room.capacityChildren,
        beds: room.beds,
        bathrooms: room.bathrooms,
        total_units: room.totalUnits,
        status: room.status,
      })
      .select("*")
      .single();

    if (error) throw error;

    const mapped = mapRoomTypeFromDb(data, room.images, room.amenities, room.images);
    upsertRoomTypeInMock(mapped);
    return mapped;
  } catch (error) {
    warnSupabaseFallback("room type upsert", error);
    return upsertRoomTypeInMock(room);
  }
}

export async function deactivateRoomType(roomId: string) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return deactivateRoomTypeInMock(roomId);

  try {
    const { data, error } = await supabase
      .from("room_types")
      .update({ status: "inactive" })
      .eq("id", roomId)
      .select("*")
      .single();

    if (error) throw error;

    const existing = getRoom(roomId);
    const mapped = mapRoomTypeFromDb(
      data,
      existing?.images ?? rooms[0]?.images ?? [],
      existing?.amenities ?? [],
      existing?.images ?? rooms[0]?.images ?? [],
    );
    upsertRoomTypeInMock(mapped);
    return mapped;
  } catch (error) {
    warnSupabaseFallback("room type deactivate", error);
    return deactivateRoomTypeInMock(roomId);
  }
}

function upsertRoomTypeInMock(room: Room) {
  const index = rooms.findIndex((item) => item.id === room.id);
  if (index >= 0) rooms[index] = room;
  else rooms.unshift(room);
  return room;
}

function deactivateRoomTypeInMock(roomId: string) {
  const room = getRoom(roomId);
  if (room) room.status = "inactive";
  return room;
}

function blockOverlapsStay(block: AvailabilityBlockRow, checkIn: string, checkOut: string) {
  return block.start_date < checkOut && block.end_date >= checkIn;
}

function buildReservationCountByDate(
  reservations: ReservationAvailabilityRow[],
  checkIn: string,
  checkOut: string,
) {
  const counts = new Map<string, number>();

  for (const reservation of reservations) {
    const current = new Date(`${maxDate(reservation.check_in, checkIn)}T12:00:00`);
    const end = new Date(`${minDate(reservation.check_out, checkOut)}T12:00:00`);

    while (current < end) {
      const date = toIsoDate(current);
      counts.set(date, (counts.get(date) ?? 0) + 1);
      current.setDate(current.getDate() + 1);
    }
  }

  return counts;
}

function buildOccupiedUnitIdsByDate(
  reservations: ReservationAvailabilityRow[],
  checkIn: string,
  checkOut: string,
) {
  const occupied = new Map<string, Set<string>>();

  for (const reservation of reservations) {
    if (!reservation.room_unit_id) continue;

    const current = new Date(`${maxDate(reservation.check_in, checkIn)}T12:00:00`);
    const end = new Date(`${minDate(reservation.check_out, checkOut)}T12:00:00`);

    while (current < end) {
      const date = toIsoDate(current);
      const unitIds = occupied.get(date) ?? new Set<string>();
      unitIds.add(reservation.room_unit_id);
      occupied.set(date, unitIds);
      current.setDate(current.getDate() + 1);
    }
  }

  return occupied;
}

function getDatesBetween(startDate: string, endDate: string, inclusiveEnd: boolean) {
  if (!startDate || !endDate || startDate > endDate) return [];

  const dates: string[] = [];
  const current = new Date(`${startDate}T12:00:00`);
  const end = new Date(`${endDate}T12:00:00`);

  while (inclusiveEnd ? current <= end : current < end) {
    dates.push(toIsoDate(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function maxDate(first: string, second: string) {
  return first > second ? first : second;
}

function minDate(first: string, second: string) {
  return first < second ? first : second;
}

function isMissingRoomUnitIdColumnError(error: unknown) {
  const maybeError = error as { code?: string; message?: string; details?: string; hint?: string };
  const haystack = [maybeError?.message, maybeError?.details, maybeError?.hint]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return maybeError?.code === "42703" && haystack.includes("room_unit_id");
}

function mergeWithDefaultRooms(roomTypes: Room[]) {
  if (isSupabaseConfigured()) {
    return roomTypes;
  }

  const bySlugOrId = new Set(roomTypes.flatMap((room) => [room.id, room.slug ?? room.id]));
  const missingDefaults = getDefaultRooms().filter(
    (room) => !bySlugOrId.has(room.id) && !bySlugOrId.has(room.slug ?? room.id),
  );

  return [...roomTypes, ...missingDefaults];
}

function groupByRoomId<T extends RoomImageRow | RoomAmenityRow | RoomUnitRow>(rows: T[]) {
  const grouped = new Map<string, T[]>();

  for (const row of rows) {
    const current = grouped.get(row.room_type_id) ?? [];
    current.push(row);
    grouped.set(row.room_type_id, current);
  }

  return grouped;
}

export type RoomUnitOption = {
  id: string;
  roomTypeId: string;
  unitNumber: string;
  status: string;
};

export async function listRoomUnits(roomTypeId?: string): Promise<RoomUnitOption[]> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) {
    return [
      { id: "u-101", roomTypeId: roomTypeId || "1", unitNumber: "A-101", status: "active" },
      { id: "u-102", roomTypeId: roomTypeId || "1", unitNumber: "A-102", status: "active" },
      { id: "u-201", roomTypeId: roomTypeId || "2", unitNumber: "B-201", status: "active" },
    ];
  }

  try {
    let query = supabase.from("room_units").select("*");
    if (roomTypeId) {
      query = query.eq("room_type_id", roomTypeId);
    }
    const { data, error } = await query;
    if (error) throw error;

    return (data ?? []).map((u) => ({
      id: u.id,
      roomTypeId: u.room_type_id,
      unitNumber: u.unit_number,
      status: u.status ?? "active",
    }));
  } catch (error) {
    warnSupabaseFallback("listRoomUnits", error);
    return [
      { id: "u-101", roomTypeId: roomTypeId || "1", unitNumber: "A-101", status: "active" },
      { id: "u-102", roomTypeId: roomTypeId || "1", unitNumber: "A-102", status: "active" },
      { id: "u-201", roomTypeId: roomTypeId || "2", unitNumber: "B-201", status: "active" },
    ];
  }
}
