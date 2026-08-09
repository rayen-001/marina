import { hotelSettings, rooms } from "@/data/hotel";
import { getSupabaseOrNull, warnSupabaseFallback } from "@/lib/supabase/serviceHelpers";
import type {
  RoomDateAvailabilityStatus,
  RoomRateInventoryMode,
  Tables,
} from "@/lib/supabase/types";

export type DayAvailability = RoomDateAvailabilityStatus | "not_available";

export type DayCalendarEntry = {
  date: string;
  price: number;
  status: DayAvailability;
  minNights: number;
  note: string | null;
  reservedUnits: number;
  availableUnits: number;
  totalUnits: number;
};

export type MonthCalendar = {
  year: number;
  month: number;
  days: DayCalendarEntry[];
};

export type RoomDateRate = {
  id: string;
  ownerId: string | null;
  roomId: string;
  date: string;
  price: number;
  availabilityStatus: DayAvailability;
  minNights: number;
  note: string | null;
  inventoryMode: RoomRateInventoryMode;
  unitsAvailableOverride: number | null;
  selectedUnitIds: string[];
  createdAt: string | null;
  updatedAt: string | null;
};

export type DateRangeRules = {
  rates: RoomDateRate[];
  priceByDate: Map<string, number>;
  statusByDate: Map<string, DayAvailability>;
  minNights: number;
  blockingDates: RoomDateRate[];
};

export type NightlyRateBreakdown = {
  date: string;
  price: number;
  status: DayAvailability;
  minNights: number;
  note: string | null;
  isSpecialRate: boolean;
};

export type SetRoomDateRateRangeInput = {
  ownerId?: string | null;
  roomId: string;
  startDate: string;
  endDate: string;
  price: number;
  availabilityStatus: DayAvailability;
  minNights: number;
  note?: string;
};

export type SetRoomDateRateRangesInput = Omit<SetRoomDateRateRangeInput, "roomId"> & {
  roomIds: string[];
};

type LegacyRateRow = Tables<"room_rate_calendar"> & {
  status?: DayAvailability | null;
  note?: string | null;
  notes?: string | null;
  updated_at?: string | null;
  inventory_mode?: RoomRateInventoryMode | null;
  units_available_override?: number | null;
  selected_unit_ids?: string[] | null;
};
type RoomDateRateRow = Tables<"room_date_rates"> | Tables<"room_date_prices">;
type AvailabilityBlockRow = {
  start_date: string;
  end_date: string;
  status: string;
  reason?: string | null;
};

type RpcResult<T> = {
  data: T | null;
  error: unknown | null;
};

type UntypedRpc = (fn: string, args?: Record<string, unknown>) => Promise<RpcResult<unknown>>;
type ReservationSlice = Pick<Tables<"reservations">, "check_in" | "check_out" | "status">;

export const ROOM_DATE_STATUS_OPTIONS: Array<{ value: DayAvailability; label: string }> = [
  { value: "available", label: "Disponible" },
  { value: "partially_reserved", label: "Partiellement reserve" },
  { value: "not_available", label: "Indisponible" },
  { value: "closed", label: "Ferme" },
  { value: "maintenance", label: "Maintenance" },
];

const BLOCKING_STATUSES = new Set<DayAvailability>([
  "reserved",
  "not_available",
  "maintenance",
  "closed",
]);

export function isBlockingAvailabilityStatus(status: DayAvailability) {
  return BLOCKING_STATUSES.has(status);
}

function getDaysInMonth(year: number, month: number): string[] {
  const count = new Date(year, month, 0).getDate();
  return Array.from({ length: count }, (_, i) => {
    const d = i + 1;
    return `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  });
}

function addDays(date: string, days: number) {
  const next = new Date(`${date}T12:00:00`);
  next.setDate(next.getDate() + days);
  return next.toISOString().slice(0, 10);
}

function getDatesBetween(startDate: string, endDate: string, inclusiveEnd = true) {
  if (!startDate || !endDate || startDate > endDate) return [];

  const dates: string[] = [];
  const current = new Date(`${startDate}T12:00:00`);
  const end = new Date(`${endDate}T12:00:00`);

  while (inclusiveEnd ? current <= end : current < end) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

const ROOM_TYPE_ID_MAP: Record<string, string[]> = {
  studio: ["ae47c5a0-5915-4e45-a355-bcda4a85bb5a", "studio", "Studio"],
  "ae47c5a0-5915-4e45-a355-bcda4a85bb5a": ["ae47c5a0-5915-4e45-a355-bcda4a85bb5a", "studio", "Studio"],

  "appartement-economique-s1": [
    "be47c5a0-5915-4e45-a355-bcda4a85bb5b",
    "appartement-economique-s1",
    "Appartement Économique S+1",
    "Appartement Economique S+1",
  ],
  "be47c5a0-5915-4e45-a355-bcda4a85bb5b": [
    "be47c5a0-5915-4e45-a355-bcda4a85bb5b",
    "appartement-economique-s1",
    "Appartement Économique S+1",
    "Appartement Economique S+1",
  ],

  "appartement-standard-s1": [
    "ce47c5a0-5915-4e45-a355-bcda4a85bb5c",
    "appartement-standard-s1",
    "Appartement Standard S+1",
  ],
  "ce47c5a0-5915-4e45-a355-bcda4a85bb5c": [
    "ce47c5a0-5915-4e45-a355-bcda4a85bb5c",
    "appartement-standard-s1",
    "Appartement Standard S+1",
  ],

  "appartement-s2": ["de47c5a0-5915-4e45-a355-bcda4a85bb5d", "appartement-s2", "Appartement S+2"],
  "de47c5a0-5915-4e45-a355-bcda4a85bb5d": ["de47c5a0-5915-4e45-a355-bcda4a85bb5d", "appartement-s2", "Appartement S+2"],
};

export function resolveAllRoomTypeIds(roomTypeId: string): string[] {
  const mapped = ROOM_TYPE_ID_MAP[roomTypeId] ?? [];
  const matchedRoom = rooms.find(
    (r: { id: string; slug?: string; name?: string }) =>
      r.id === roomTypeId || r.slug === roomTypeId || r.name === roomTypeId,
  );
  return Array.from(
    new Set([roomTypeId, ...mapped, matchedRoom?.id, matchedRoom?.slug, matchedRoom?.name].filter(Boolean) as string[]),
  );
}

export async function getMonthlyCalendar(
  roomTypeId: string,
  year: number,
  month: number,
  totalUnits: number,
  defaultPrice: number,
): Promise<MonthCalendar> {
  const allDays = getDaysInMonth(year, month);
  const startDate = allDays[0];
  const endDate = allDays[allDays.length - 1];

  const makeDefault = (): MonthCalendar => ({
    year,
    month,
    days: allDays.map((date) => ({
      date,
      price: defaultPrice,
      status: "available" as DayAvailability,
      minNights: 1,
      note: null,
      reservedUnits: 0,
      availableUnits: totalUnits,
      totalUnits,
    })),
  });

  // Resolve UUID: if we received a slug (e.g. "appartement-economique-s1"), map it to its real UUID
  const SLUG_TO_UUID: Record<string, string> = {
    studio: "ae47c5a0-5915-4e45-a355-bcda4a85bb5a",
    "appartement-economique-s1": "be47c5a0-5915-4e45-a355-bcda4a85bb5b",
    "appartement-standard-s1": "ce47c5a0-5915-4e45-a355-bcda4a85bb5c",
    "appartement-s2": "de47c5a0-5915-4e45-a355-bcda4a85bb5d",
  };
  const uuid = SLUG_TO_UUID[roomTypeId] ?? roomTypeId;

  // Use raw fetch so we bypass any Supabase client caching, type coercion, or init issues
  const supabaseUrl = (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL)
    || (typeof process !== "undefined" && process.env?.VITE_SUPABASE_URL)
    || "";
  const supabaseKey = (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY)
    || (typeof process !== "undefined" && process.env?.VITE_SUPABASE_ANON_KEY)
    || "";

  if (!supabaseUrl || !supabaseKey) return makeDefault();

  try {
    const params = new URLSearchParams({
      select: "date,status,price,min_nights,note",
      room_type_id: `eq.${uuid}`,
      date: `gte.${startDate}`,
      order: "date",
    });
    // Supabase requires separate params for range filters
    const url = `${supabaseUrl}/rest/v1/room_rate_calendar?select=date,status,price,min_nights,note&room_type_id=eq.${uuid}&date=gte.${startDate}&date=lte.${endDate}&order=date`;
    const response = await fetch(url, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("[getMonthlyCalendar] fetch error", response.status, await response.text());
      return makeDefault();
    }

    const rateRows: Array<{ date: string; status: string; price: number; min_nights: number | null; note: string | null }> = await response.json();

    // For dates that are "available" in room_rate_calendar, use get_available_units RPC
    // (SECURITY DEFINER) to count actual reservations and detect partial availability.
    // Batch all "available" dates as parallel requests.
    const availableDatesInMonth = allDays.filter(date => {
      const row = rateRows.find(r => r.date === date);
      const s = normalizeAvailabilityStatus(row?.status ?? "available");
      return s === "available";
    });

    // Call get_available_units for each available date in parallel
    const availableByDate = new Map<string, number>();
    if (availableDatesInMonth.length > 0 && totalUnits > 1) {
      await Promise.all(
        availableDatesInMonth.map(async (date) => {
          try {
            const nextDay = addDays(date, 1);
            const rpcRes = await fetch(`${supabaseUrl}/rest/v1/rpc/get_available_units`, {
              method: "POST",
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ room_type_id: uuid, check_in: date, check_out: nextDay }),
            });
            if (rpcRes.ok) {
              const n = await rpcRes.json();
              availableByDate.set(date, Number(n));
            }
          } catch {
            // silently ignore per-date failures
          }
        }),
      );
    }

    const days: DayCalendarEntry[] = allDays.map((date) => {
      const row = rateRows.find(r => r.date === date);
      const rawStatus = row?.status ?? "available";
      const normalizedStatus = normalizeAvailabilityStatus(rawStatus);

      let status: DayAvailability;
      let availableUnits: number;

      if (
        normalizedStatus === "not_available" ||
        normalizedStatus === "closed" ||
        normalizedStatus === "maintenance" ||
        normalizedStatus === "reserved"
      ) {
        // Admin explicitly blocked this date
        status = "not_available";
        availableUnits = 0;
      } else if (normalizedStatus === "partially_reserved") {
        // Admin explicitly marked as partially reserved
        const avail = availableByDate.get(date) ?? Math.max(0, totalUnits - 1);
        status = "partially_reserved";
        availableUnits = avail;
      } else {
        // "available" in DB — use RPC result to detect partial/full reservation
        const avail = availableByDate.has(date) ? availableByDate.get(date)! : totalUnits;
        if (avail <= 0) {
          status = "not_available";
          availableUnits = 0;
        } else if (avail < totalUnits) {
          status = "partially_reserved";
          availableUnits = avail;
        } else {
          status = "available";
          availableUnits = totalUnits;
        }
      }

      return {
        date,
        price: row ? Number(row.price) : defaultPrice,
        status,
        minNights: row?.min_nights ?? 1,
        note: row?.note ?? null,
        reservedUnits: Math.max(0, totalUnits - availableUnits),
        availableUnits,
        totalUnits,
      };
    });

    return { year, month, days };
  } catch (error) {
    warnSupabaseFallback("rate calendar", error);
    return makeDefault();
  }
}

export async function getRoomDateRates(
  roomTypeId: string,
  startDate: string,
  endDate: string,
): Promise<RoomDateRate[]> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return [];

  try {
    const [legacyRows, priceRows, rateRows] = await Promise.all([
      getLegacyRoomDateRates(roomTypeId, startDate, endDate),
      getRoomDateRows("room_date_prices", roomTypeId, startDate, endDate),
      getRoomDateRows("room_date_rates", roomTypeId, startDate, endDate),
    ]);

    if ((!priceRows || priceRows.length === 0) && (!rateRows || rateRows.length === 0)) {
      return legacyRows;
    }

    const merged = new Map<string, RoomDateRate>();
    for (const row of priceRows ?? []) merged.set(row.date, mapRoomDateRateFromDb(row));
    for (const row of rateRows ?? []) merged.set(row.date, mapRoomDateRateFromDb(row));
    for (const row of legacyRows) merged.set(row.date, row);
    return [...merged.values()].sort((a, b) => a.date.localeCompare(b.date));
  } catch (error) {
    warnSupabaseFallback("room date rates", error);
    return getLegacyRoomDateRates(roomTypeId, startDate, endDate);
  }
}

export async function getRoomDateRangeRules(
  roomTypeId: string,
  checkIn: string,
  checkOut: string,
): Promise<DateRangeRules> {
  const stayDates = getDatesBetween(checkIn, checkOut, false);
  const empty: DateRangeRules = {
    rates: [],
    priceByDate: new Map(),
    statusByDate: new Map(),
    minNights: 1,
    blockingDates: [],
  };
  if (stayDates.length === 0) return empty;

  const SLUG_TO_UUID: Record<string, string> = {
    studio: "ae47c5a0-5915-4e45-a355-bcda4a85bb5a",
    "appartement-economique-s1": "be47c5a0-5915-4e45-a355-bcda4a85bb5b",
    "appartement-standard-s1": "ce47c5a0-5915-4e45-a355-bcda4a85bb5c",
    "appartement-s2": "de47c5a0-5915-4e45-a355-bcda4a85bb5d",
  };
  const uuid = SLUG_TO_UUID[roomTypeId] ?? roomTypeId;

  const supabaseUrl = (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL)
    || (typeof process !== "undefined" && process.env?.VITE_SUPABASE_URL)
    || "";
  const supabaseKey = (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY)
    || (typeof process !== "undefined" && process.env?.VITE_SUPABASE_ANON_KEY)
    || "";

  if (!supabaseUrl || !supabaseKey) return empty;

  try {
    const startDate = stayDates[0];
    const endDate = stayDates[stayDates.length - 1];
    const url = `${supabaseUrl}/rest/v1/room_rate_calendar?select=date,status,price,min_nights,note&room_type_id=eq.${uuid}&date=gte.${startDate}&date=lte.${endDate}&order=date`;
    const response = await fetch(url, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return empty;

    const rows: Array<{ date: string; status: string; price: number; min_nights: number | null; note: string | null }> = await response.json();
    const rowsByDate = new Map(rows.map(r => [r.date, r]));

    const matchingRates: RoomDateRate[] = stayDates.map(date => {
      const row = rowsByDate.get(date);
      const status = normalizeAvailabilityStatus(row?.status ?? "available");
      return {
        id: "",
        ownerId: null,
        roomId: uuid,
        date,
        price: row ? Number(row.price) : 0,
        availabilityStatus: status,
        minNights: row?.min_nights ?? 1,
        note: row?.note ?? null,
        inventoryMode: "auto" as const,
        unitsAvailableOverride: null,
        selectedUnitIds: [],
        createdAt: null,
        updatedAt: null,
      };
    });

    const priceByDate = new Map(matchingRates.map(r => [r.date, r.price]));
    const statusByDate = new Map(matchingRates.map(r => [r.date, r.availabilityStatus]));
    const minNights = Math.max(1, ...matchingRates.map(r => r.minNights));
    const blockingDates = matchingRates.filter(r => isBlockingAvailabilityStatus(r.availabilityStatus));

    return { rates: matchingRates, priceByDate, statusByDate, minNights, blockingDates };
  } catch (error) {
    warnSupabaseFallback("date range rules", error);
    return empty;
  }
}


export function calculateDateRangeTotal(
  rules: DateRangeRules,
  checkIn: string,
  checkOut: string,
  defaultPrice: number,
) {
  return calculateCalendarTotal(rules.priceByDate, checkIn, checkOut, defaultPrice);
}

export function buildNightlyRateBreakdown(
  rules: DateRangeRules,
  checkIn: string,
  checkOut: string,
  defaultPrice: number,
): NightlyRateBreakdown[] {
  const ratesByDate = new Map(rules.rates.map((rate) => [rate.date, rate]));
  return getDatesBetween(checkIn, checkOut, false).map((date) => {
    const rate = ratesByDate.get(date);
    return {
      date,
      price: rate?.price ?? defaultPrice,
      status: rate?.availabilityStatus ?? "available",
      minNights: rate?.minNights ?? 1,
      note: rate?.note ?? null,
      isSpecialRate: Boolean(rate),
    };
  });
}

/** Build a date -> price lookup from loaded calendars */
export function buildCalendarPriceMap(calendars: MonthCalendar[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const cal of calendars) {
    for (const day of cal.days) {
      map.set(day.date, day.price);
    }
  }
  return map;
}

/** Calculate total using per-day rates from calendar, falls back to defaultPrice */
export function calculateCalendarTotal(
  priceMap: Map<string, number>,
  checkIn: string,
  checkOut: string,
  defaultPrice: number,
) {
  let roomPrice = 0;
  let nights = 0;

  const cur = new Date(`${checkIn}T12:00:00`);
  const end = new Date(`${checkOut}T12:00:00`);

  while (cur < end) {
    const d = cur.toISOString().slice(0, 10);
    roomPrice += priceMap.get(d) ?? defaultPrice;
    nights++;
    cur.setDate(cur.getDate() + 1);
  }

  const taxesAndFees = Math.round(roomPrice * hotelSettings.taxRate);
  const total = roomPrice + taxesAndFees;
  const deposit = Math.round(total * hotelSettings.depositPercentage);
  const remainingAmount = Math.max(0, total - deposit);

  return { nights, roomPrice, taxesAndFees, deposit, total, remainingAmount };
}

/** Get all date rules for a room and period. */
export async function getRoomRateCalendar(
  roomTypeId: string,
  startDate: string,
  endDate: string,
): Promise<RoomDateRate[]> {
  return getRoomDateRates(roomTypeId, startDate, endDate);
}

/** Upsert date rules for each day in a date range. */
export async function setRoomDateRateRange(
  input: SetRoomDateRateRangeInput,
): Promise<{ success: boolean; error?: string }> {
  const result = await setRoomDateRateRanges({
    ownerId: input.ownerId,
    roomIds: [input.roomId],
    startDate: input.startDate,
    endDate: input.endDate,
    price: input.price,
    availabilityStatus: input.availabilityStatus,
    minNights: input.minNights,
    note: input.note,
  });
  return result.success ? { success: true } : { success: false, error: result.error };
}

/** Upsert date rules for each day in a date range across multiple rooms. */
export async function setRoomDateRateRanges(
  input: SetRoomDateRateRangesInput,
): Promise<{ success: boolean; error?: string; roomCount?: number; dateCount?: number }> {
  const validationError = validateDateRateRanges(input);
  if (validationError) return { success: false, error: validationError };

  const supabase = await getSupabaseOrNull();
  if (!supabase) return { success: false, error: "Supabase non configure" };

  try {
    const ownerId = await resolveOwnerId(supabase, input.ownerId);
    if (!ownerId) return { success: false, error: "Compte proprietaire introuvable." };

    const roomIds = [...new Set(input.roomIds.filter(Boolean))];
    const dates = getDatesBetween(input.startDate, input.endDate, true);
    const availabilityStatus = normalizeRoomDateTableStatus(input.availabilityStatus);
    const entries = roomIds.flatMap((roomId) =>
      dates.map((date) => ({
        owner_id: ownerId,
        room_id: roomId,
        date,
        price: input.price,
        availability_status: availabilityStatus,
        min_nights: input.minNights,
        note: input.note?.trim() || null,
        updated_at: new Date().toISOString(),
      })),
    );

    const { error } = await supabase
      .from("room_date_prices")
      .upsert(entries, { onConflict: "owner_id,room_id,date" });

    if (error) {
      if (!isMissingRelationError(error)) throw error;

      const legacyResult = await supabase
        .from("room_date_rates")
        .upsert(entries, { onConflict: "room_id,date" });
      if (legacyResult.error) throw legacyResult.error;
    }

    return { success: true, roomCount: roomIds.length, dateCount: dates.length };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    warnSupabaseFallback("room date rate range upsert", error);
    return { success: false, error: message };
  }
}

/** Backward-compatible wrapper used by older screens. */
export async function setRoomRateRange(
  roomTypeId: string,
  startDate: string,
  endDate: string,
  price: number,
  notes?: string,
): Promise<{ success: boolean; error?: string }> {
  return setRoomDateRateRange({
    roomId: roomTypeId,
    startDate,
    endDate,
    price,
    availabilityStatus: "available",
    minNights: 1,
    note: notes,
  });
}

export function formatDayPrice(price: number): string {
  return `${Math.round(price)} DT`;
}

export function calculateInventoryAvailabilityForDate({
  rate,
  totalUnits,
  reservedUnits,
  occupiedSelectedUnitIds = new Set<string>(),
}: {
  rate?: RoomDateRate | null;
  totalUnits: number;
  reservedUnits: number;
  occupiedSelectedUnitIds?: Set<string>;
}) {
  if (rate && isBlockingAvailabilityStatus(rate.availabilityStatus)) {
    return 0;
  }

  const mode = rate?.inventoryMode ?? "auto";

  if (mode === "closed") return 0;
  if (mode === "all") return clampCount(totalUnits, totalUnits);
  if (mode === "quantity") return clampCount(rate?.unitsAvailableOverride ?? 0, totalUnits);
  if (mode === "specific_units") {
    const selectedUnitIds = rate?.selectedUnitIds ?? [];
    const occupiedCount = selectedUnitIds.filter((unitId) =>
      occupiedSelectedUnitIds.has(unitId),
    ).length;
    return clampCount(selectedUnitIds.length - occupiedCount, totalUnits);
  }

  return clampCount(totalUnits - reservedUnits, totalUnits);
}

export function hasInventoryOverride(rate?: RoomDateRate | null) {
  if (!rate) return false;
  return (
    rate.inventoryMode !== "auto" ||
    rate.unitsAvailableOverride !== null ||
    rate.selectedUnitIds.length > 0 ||
    rate.availabilityStatus !== "available"
  );
}

async function getRoomDateRows(
  tableName: "room_date_prices" | "room_date_rates",
  roomTypeId: string,
  startDate: string,
  endDate: string,
): Promise<RoomDateRateRow[] | null> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("room_id", roomTypeId)
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date");

    if (error) return null;
    return (data ?? []) as RoomDateRateRow[];
  } catch {
    return null;
  }
}

function mapRoomDateRateFromDb(row: RoomDateRateRow): RoomDateRate {
  return {
    id: row.id,
    ownerId: row.owner_id,
    roomId: row.room_id,
    date: row.date,
    price: Number(row.price),
    availabilityStatus: row.availability_status,
    minNights: row.min_nights ?? 1,
    note: row.note,
    inventoryMode: "auto",
    unitsAvailableOverride: null,
    selectedUnitIds: [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function getLegacyRoomDateRates(
  roomTypeId: string,
  startDate: string,
  endDate: string,
): Promise<RoomDateRate[]> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return [];

  try {
    const matchedRoom = rooms.find(
      (r: { id: string; slug?: string; name?: string }) =>
        r.id === roomTypeId || r.slug === roomTypeId || r.name === roomTypeId,
    );
    const roomIds = Array.from(
      new Set(
        [roomTypeId, matchedRoom?.id, matchedRoom?.slug, matchedRoom?.name].filter(Boolean) as string[],
      ),
    );

    const { data, error } = await supabase
      .from("room_rate_calendar")
      .select("*")
      .in("room_type_id", roomIds)
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date");

    if (error) throw error;

    return ((data ?? []) as LegacyRateRow[]).map((row) => ({
      id: row.id,
      ownerId: null,
      roomId: row.room_type_id,
      date: row.date,
      price: Number(row.price),
      availabilityStatus: normalizeAvailabilityStatus(row.status),
      minNights: row.min_nights ?? 1,
      note: row.note ?? row.notes ?? null,
      inventoryMode: normalizeInventoryMode(row.inventory_mode),
      unitsAvailableOverride: normalizeUnitsAvailableOverride(row.units_available_override),
      selectedUnitIds: normalizeSelectedUnitIds(row.selected_unit_ids),
      createdAt: row.created_at,
      updatedAt: row.updated_at ?? row.created_at,
    }));
  } catch (error) {
    warnSupabaseFallback("legacy room rate calendar", error);
    return [];
  }
}

function buildBlockedDateMap(rows: AvailabilityBlockRow[]) {
  const blockedDates = new Map<string, DayAvailability>();

  for (const block of rows) {
    const status = normalizeBlockStatus(block.status);
    if (!status) continue;

    const cur = new Date(`${block.start_date}T12:00:00`);
    const end = new Date(`${block.end_date}T12:00:00`);
    while (cur <= end) {
      const d = cur.toISOString().slice(0, 10);
      blockedDates.set(d, status);
      cur.setDate(cur.getDate() + 1);
    }
  }

  return blockedDates;
}

function normalizeBlockStatus(status?: string | null): DayAvailability | null {
  if (status === "closed" || status === "not_available" || status === "maintenance") {
    return status;
  }
  if (status === "partially_available" || status === "partially_reserved") {
    return "partially_reserved";
  }
  return null;
}

function buildReservationCountMap(rows: ReservationSlice[]) {
  const reservationsByDate = new Map<string, number>();

  for (const reservation of rows) {
    const cur = new Date(`${reservation.check_in}T12:00:00`);
    const end = new Date(`${reservation.check_out}T12:00:00`);
    while (cur < end) {
      const d = cur.toISOString().slice(0, 10);
      reservationsByDate.set(d, (reservationsByDate.get(d) ?? 0) + 1);
      cur.setDate(cur.getDate() + 1);
    }
  }

  return reservationsByDate;
}

function validateDateRateRange(input: SetRoomDateRateRangeInput) {
  if (!input.roomId) return "Selectionnez une chambre.";
  return validateDateRateRanges({ ...input, roomIds: [input.roomId] });
}

function validateDateRateRanges(input: SetRoomDateRateRangesInput) {
  if (!input.roomIds.some(Boolean)) return "Selectionnez au moins une chambre.";
  if (!input.startDate || !input.endDate) return "Selectionnez une periode.";
  if (input.startDate > input.endDate) return "La date de fin doit etre apres la date de debut.";
  if (!Number.isFinite(input.price) || input.price < 0) return "Le prix doit etre positif.";
  if (!Number.isInteger(input.minNights) || input.minNights < 1) {
    return "Le minimum de nuits doit etre superieur ou egal a 1.";
  }
  return null;
}

function normalizeAvailabilityStatus(status?: DayAvailability | string | null): DayAvailability {
  if (
    status === "available" ||
    status === "partially_reserved" ||
    status === "not_available" ||
    status === "reserved" ||
    status === "maintenance" ||
    status === "closed"
  ) {
    return status;
  }
  return "available";
}

function normalizeInventoryMode(
  mode?: RoomRateInventoryMode | string | null,
): RoomRateInventoryMode {
  if (
    mode === "auto" ||
    mode === "all" ||
    mode === "quantity" ||
    mode === "specific_units" ||
    mode === "closed"
  ) {
    return mode;
  }
  return "auto";
}

function normalizeUnitsAvailableOverride(value?: number | string | null) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeSelectedUnitIds(value?: string[] | null) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function clampCount(value: number, totalUnits: number) {
  return Math.min(Math.max(0, Math.trunc(value)), Math.max(0, totalUnits));
}

function normalizeRoomDateTableStatus(status: DayAvailability): RoomDateAvailabilityStatus {
  return status === "not_available" ? "closed" : status;
}

async function resolveOwnerId(
  supabase: Awaited<ReturnType<typeof getSupabaseOrNull>>,
  explicitOwnerId?: string | null,
) {
  if (explicitOwnerId) return explicitOwnerId;
  if (!supabase) return null;

  const userResult = await supabase.auth.getUser();
  if (userResult.data.user?.id) return userResult.data.user.id;

  const rpc = supabase.rpc as unknown as UntypedRpc;
  const rpcResult = await rpc("get_default_hotel_owner_id");
  return typeof rpcResult.data === "string" ? rpcResult.data : null;
}

function isMissingRelationError(error: unknown) {
  const maybeError = error as { code?: string; message?: string };
  const message = maybeError?.message?.toLowerCase() ?? "";
  return (
    maybeError?.code === "42P01" ||
    message.includes("room_date_rates") ||
    message.includes("room_date_prices")
  );
}
