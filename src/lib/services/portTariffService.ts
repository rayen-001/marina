import { getSupabaseOrNull } from "@/lib/supabase/serviceHelpers";
import type { Tables, TablesInsert, TablesUpdate } from "@/lib/supabase/types";

export type PortTariff = {
  id: string;
  category: string;
  lengthMin: number | null;
  lengthMax: number | null;
  dailyPrice: number | null;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  winteringPrice: number | null;
  currency: string;
  note: string | null;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type PortTariffInput = {
  category: string;
  lengthMin?: number | null;
  lengthMax?: number | null;
  dailyPrice?: number | null;
  monthlyPrice?: number | null;
  yearlyPrice?: number | null;
  winteringPrice?: number | null;
  currency?: string;
  note?: string | null;
  active?: boolean;
  sortOrder?: number;
};

type PortTariffRow = Tables<"port_tariffs">;

const PERMISSION_ERROR_MESSAGE = "Permission Supabase refusée. Vérifiez les policies port_tariffs.";

export async function listPortTariffs(): Promise<PortTariff[]> {
  const supabase = await requireSupabaseClient();
  const { data, error } = await supabase
    .from("port_tariffs")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw mapPortTariffError(error);
  return (data ?? []).map(mapPortTariffRow);
}

export async function listActivePortTariffs(): Promise<PortTariff[]> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("port_tariffs")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error) throw mapPortTariffError(error);
  return (data ?? []).map(mapPortTariffRow);
}

export async function createPortTariff(input: PortTariffInput): Promise<PortTariff> {
  const supabase = await requireSupabaseClient();
  const payload = mapPortTariffToDb(input) as TablesInsert<"port_tariffs">;

  const { data, error } = await supabase.from("port_tariffs").insert(payload).select("*").single();

  if (error) throw mapPortTariffError(error);
  return mapPortTariffRow(data);
}

export async function updatePortTariff(
  id: string,
  input: Partial<PortTariffInput>,
): Promise<PortTariff> {
  const supabase = await requireSupabaseClient();
  const payload = mapPortTariffToDb(input) as TablesUpdate<"port_tariffs">;

  const { data, error } = await supabase
    .from("port_tariffs")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw mapPortTariffError(error);
  return mapPortTariffRow(data);
}

export async function deactivatePortTariff(id: string): Promise<PortTariff> {
  return updatePortTariff(id, { active: false });
}

async function requireSupabaseClient() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) throw new Error("Supabase n'est pas configure.");
  return supabase;
}

function mapPortTariffRow(row: PortTariffRow): PortTariff {
  return {
    id: row.id,
    category: row.category,
    lengthMin: row.length_min,
    lengthMax: row.length_max,
    dailyPrice: row.daily_price,
    monthlyPrice: row.monthly_price,
    yearlyPrice: row.yearly_price,
    winteringPrice: row.wintering_price,
    currency: row.currency,
    note: row.note,
    active: row.active,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapPortTariffToDb(input: Partial<PortTariffInput>) {
  const payload: Record<string, unknown> = {};
  if (input.category !== undefined) payload.category = input.category;
  if (input.lengthMin !== undefined) payload.length_min = input.lengthMin;
  if (input.lengthMax !== undefined) payload.length_max = input.lengthMax;
  if (input.dailyPrice !== undefined) payload.daily_price = input.dailyPrice;
  if (input.monthlyPrice !== undefined) payload.monthly_price = input.monthlyPrice;
  if (input.yearlyPrice !== undefined) payload.yearly_price = input.yearlyPrice;
  if (input.winteringPrice !== undefined) payload.wintering_price = input.winteringPrice;
  if (input.currency !== undefined) payload.currency = input.currency;
  if (input.note !== undefined) payload.note = input.note;
  if (input.active !== undefined) payload.active = input.active;
  if (input.sortOrder !== undefined) payload.sort_order = input.sortOrder;
  return payload;
}

function mapPortTariffError(error: unknown) {
  if (isPermissionError(error)) return new Error(PERMISSION_ERROR_MESSAGE);
  return new Error(getErrorDetail(error) ?? "Erreur Supabase inconnue.");
}

function isPermissionError(error: unknown) {
  const maybeError = error as {
    code?: string;
    status?: number;
    message?: string;
    details?: string;
  };
  const haystack = [maybeError?.message, maybeError?.details, maybeError?.code]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    maybeError?.code === "42501" ||
    maybeError?.status === 401 ||
    maybeError?.status === 403 ||
    haystack.includes("permission") ||
    haystack.includes("row-level security") ||
    haystack.includes("rls") ||
    haystack.includes("not authorized")
  );
}

function getErrorDetail(error: unknown) {
  if (!error) return null;
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;

  const maybeError = error as { message?: string; details?: string; hint?: string; code?: string };
  const parts = [maybeError.message, maybeError.details, maybeError.hint, maybeError.code].filter(
    Boolean,
  );
  return parts.length ? parts.join(" | ") : JSON.stringify(error);
}
