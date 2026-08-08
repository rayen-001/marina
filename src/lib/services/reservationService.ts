import {
  getReservationByNumber,
  reservations,
  type Reservation,
  type ReservationStatus,
} from "@/data/hotel";
import { bookingStore } from "@/lib/booking-store";
import { mapGuestFromDb, mapReservationFromDb } from "@/lib/supabase/mappers";
import {
  getSupabaseOrNull,
  replaceArray,
  warnSupabaseFallback,
} from "@/lib/supabase/serviceHelpers";
import { getBookingQuote } from "./bookingQuoteService";
import { getRoomType, listRoomTypes } from "./roomService";

type ReservationRpcResult = {
  reservation_id: string;
  reservation_number: string;
  total: number;
  deposit: number;
  remaining_amount: number;
};
type RpcResult<T> = {
  data: T | null;
  error: unknown;
};
type UntypedRpc = <T>(
  functionName: string,
  args?: Record<string, unknown>,
) => Promise<RpcResult<T>>;

export async function listReservations() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return reservations;

  try {
    const [reservationsResult, guestsResult] = await Promise.all([
      supabase.from("reservations").select("*").order("check_in", { ascending: false }),
      supabase.from("guests").select("*"),
      listRoomTypes(),
    ]);

    if (reservationsResult.error) throw reservationsResult.error;
    if (guestsResult.error) throw guestsResult.error;

    const guestsById = new Map(
      (guestsResult.data ?? []).map((guest) => [guest.id, mapGuestFromDb(guest)]),
    );
    replaceArray(
      reservations,
      (reservationsResult.data ?? []).map((reservation) =>
        mapReservationFromDb(reservation, guestsById.get(reservation.guest_id)),
      ),
    );

    return reservations;
  } catch (error) {
    warnSupabaseFallback("reservation query", error);
    return reservations;
  }
}

export async function getReservation(reservationNumber: string) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return getReservationByNumber(reservationNumber);

  try {
    const { data: reservationRow, error: reservationError } = await supabase
      .from("reservations")
      .select("*")
      .eq("reservation_number", reservationNumber)
      .maybeSingle();

    if (reservationError) throw reservationError;
    if (!reservationRow) return getReservationByNumber(reservationNumber);

    const { data: guestRow, error: guestError } = await supabase
      .from("guests")
      .select("*")
      .eq("id", reservationRow.guest_id)
      .maybeSingle();

    if (guestError) throw guestError;

    const mapped = mapReservationFromDb(
      reservationRow,
      mapGuestFromDb(guestRow, reservationRow.guest_id),
    );
    upsertReservationInMock(mapped);
    return mapped;
  } catch (error) {
    warnSupabaseFallback("reservation lookup", error);
    return getReservationByNumber(reservationNumber);
  }
}

export type CreateClientReservationInput = {
  roomId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  phone?: string;
  country?: string;
  identityNumber?: string;
  specialRequests?: string;
};

/** Creates a reservation owned by the signed-in client (guest_id = auth.uid()),
 * always starting in "pending" status awaiting admin confirmation. Requires an
 * authenticated client session — never falls back to mock or anonymous booking. */
export async function createClientReservation(input: CreateClientReservationInput) {
  const room = await getRoomType(input.roomId);
  if (!room) throw new Error("Chambre introuvable.");

  const quote = await getBookingQuote(room, input.checkIn, input.checkOut);
  if (!quote.canBook) {
    throw new Error(quote.reason ?? "Aucune unite disponible pour ces dates.");
  }

  const supabase = await getSupabaseOrNull();
  if (!supabase) throw new Error("Supabase n'est pas configure.");

  const rpcArgs = {
    p_room_type_id: input.roomId,
    p_check_in: input.checkIn,
    p_check_out: input.checkOut,
    p_adults: input.adults,
    p_children: input.children,
    p_phone: input.phone ?? null,
    p_country: input.country ?? null,
    p_cin_passport: input.identityNumber ?? null,
    p_special_requests: input.specialRequests ?? null,
  };

  const rpc = supabase.rpc as unknown as UntypedRpc;
  const result = await rpc<ReservationRpcResult | ReservationRpcResult[]>(
    "create_client_reservation",
    rpcArgs,
  );

  if (result.error) throw mapReservationError(result.error);

  const rpcResult = normalizeRpcResult(result.data);
  const fetched = await getReservation(rpcResult.reservation_number);
  if (!fetched) throw new Error("Reservation creee mais introuvable.");

  upsertReservationInMock(fetched);
  bookingStore.rememberReservation(fetched.reservationNumber);
  return fetched;
}

function mapReservationError(error: unknown) {
  const maybeError = error as { message?: string };
  const message = maybeError?.message ?? "";

  if (
    message.includes("Authentication required") ||
    message.includes("client account is required")
  ) {
    return new Error("Vous devez etre connecte en tant que client pour reserver.");
  }
  if (message.includes("No available units")) {
    return new Error("Aucune unite disponible pour ces dates.");
  }
  if (message.includes("Guest count exceeds")) {
    return new Error("La capacite demandee depasse celle de cet appartement.");
  }
  if (message.includes("Minimum stay")) {
    return new Error(message);
  }
  if (message.includes("Invalid stay dates")) {
    return new Error("Dates de sejour invalides.");
  }

  return new Error(message || "Impossible de creer la reservation.");
}

export async function setReservationStatus(reservationId: string, status: ReservationStatus) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) throw new Error("Supabase n'est pas configure.");

  const { data, error } = await supabase
    .from("reservations")
    .update({ status })
    .eq("id", reservationId)
    .select("*")
    .single();

  if (error) throw error;

  const existing = reservations.find((reservation) => reservation.id === reservationId);
  if (existing) existing.status = data.status;
  return existing;
}

export async function assignRoomUnit(reservationId: string, roomUnitId: string | null) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) throw new Error("Supabase n'est pas configure.");

  const { error } = await supabase
    .from("reservations")
    .update({ room_unit_id: roomUnitId })
    .eq("id", reservationId);

  if (error) throw error;
}

export async function searchReservations(query: string) {
  const needle = query.trim().toLowerCase();
  const items = await listReservations();
  if (!needle) return items;

  return items.filter((reservation) =>
    `${reservation.reservationNumber} ${reservation.guest.fullName} ${reservation.guest.email} ${reservation.guest.phone}`
      .toLowerCase()
      .includes(needle),
  );
}

function upsertReservationInMock(reservation: Reservation) {
  const index = reservations.findIndex((item) => item.id === reservation.id);
  if (index >= 0) reservations[index] = reservation;
  else reservations.unshift(reservation);
}

function normalizeRpcResult(data: ReservationRpcResult | ReservationRpcResult[] | null) {
  const result = Array.isArray(data) ? data[0] : data;
  if (!result?.reservation_number) {
    throw new Error("La reservation n'a pas retourne de numero de reservation.");
  }
  return result;
}
