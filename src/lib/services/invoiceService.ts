import { generateInvoiceNumber, invoices, reservations, type Invoice } from "@/data/hotel";
import { mapInvoiceFromDb } from "@/lib/supabase/mappers";
import {
  getSupabaseOrNull,
  replaceArray,
  warnSupabaseFallback,
} from "@/lib/supabase/serviceHelpers";
import { getReservation } from "./reservationService";

export async function listInvoices() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return invoices;

  try {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .order("issued_at", { ascending: false });

    if (error) throw error;

    replaceArray(invoices, (data ?? []).map(mapInvoiceFromDb));
    return invoices;
  } catch (error) {
    warnSupabaseFallback("invoice query", error);
    return invoices;
  }
}

export async function getInvoiceForReservation(reservationId: string) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return invoices.find((invoice) => invoice.reservationId === reservationId);

  try {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("reservation_id", reservationId)
      .order("issued_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    if (!data) return invoices.find((invoice) => invoice.reservationId === reservationId);

    const mapped = mapInvoiceFromDb(data);
    upsertInvoiceInMock(mapped);
    return mapped;
  } catch (error) {
    warnSupabaseFallback("reservation invoice lookup", error);
    return invoices.find((invoice) => invoice.reservationId === reservationId);
  }
}

export async function generateInvoicePreview(reservationId: string): Promise<Invoice> {
  const existing = await getInvoiceForReservation(reservationId);
  if (existing) return existing;

  const supabase = await getSupabaseOrNull();
  if (!supabase) throw new Error("Supabase n'est pas configure.");

  const reservation = await findReservationForInvoice(reservationId);
  if (!reservation) throw new Error("Reservation introuvable.");

  const invoiceNumber = generateInvoiceNumber(invoices.length + 1);
  const { data, error } = await supabase
    .from("invoices")
    .insert({
      reservation_id: reservation.id,
      invoice_number: invoiceNumber,
      issued_at: new Date().toISOString().slice(0, 10),
      status: reservation.paymentStatus === "paid" ? "paid" : "draft",
      amount: reservation.total,
    })
    .select("*")
    .single();

  if (error) throw error;

  const mapped = mapInvoiceFromDb(data);

  const itemRows = [
    {
      invoice_id: mapped.id,
      label: "Sejour hotelier",
      quantity: Math.max(1, reservation.nights),
      unit_price:
        reservation.nights > 0
          ? Math.round(reservation.roomPrice / reservation.nights)
          : reservation.roomPrice,
      total: reservation.roomPrice,
    },
    {
      invoice_id: mapped.id,
      label: "Taxes et frais",
      quantity: 1,
      unit_price: reservation.taxesAndFees,
      total: reservation.taxesAndFees,
    },
  ];

  const { error: itemsError } = await supabase.from("invoice_items").insert(itemRows);
  if (itemsError) throw itemsError;

  upsertInvoiceInMock(mapped);
  return mapped;
}

async function findReservationForInvoice(reservationId: string) {
  const local = reservations.find((reservation) => reservation.id === reservationId);
  if (local) return local;

  const supabase = await getSupabaseOrNull();
  if (!supabase) return undefined;

  const { data, error } = await supabase
    .from("reservations")
    .select("reservation_number")
    .eq("id", reservationId)
    .maybeSingle();

  if (error || !data) return undefined;
  return getReservation(data.reservation_number);
}

function upsertInvoiceInMock(invoice: Invoice) {
  const index = invoices.findIndex((item) => item.id === invoice.id);
  if (index >= 0) invoices[index] = invoice;
  else invoices.unshift(invoice);
}
