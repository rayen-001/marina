import { payments, reservations, type Payment, type PaymentStatus } from "@/data/hotel";
import { mapPaymentFromDb } from "@/lib/supabase/mappers";
import {
  getSupabaseOrNull,
  replaceArray,
  warnSupabaseFallback,
} from "@/lib/supabase/serviceHelpers";
import { listReservations } from "./reservationService";

export async function listPayments() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return payments;

  try {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) throw error;

    replaceArray(payments, (data ?? []).map(mapPaymentFromDb));
    return payments;
  } catch (error) {
    warnSupabaseFallback("payment query", error);
    return payments;
  }
}

export async function getPaymentForReservation(reservationId: string) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return payments.find((payment) => payment.reservationId === reservationId);

  try {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("reservation_id", reservationId)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    if (!data) return payments.find((payment) => payment.reservationId === reservationId);

    const mapped = mapPaymentFromDb(data);
    upsertPaymentInMock(mapped);
    return mapped;
  } catch (error) {
    warnSupabaseFallback("reservation payment lookup", error);
    return payments.find((payment) => payment.reservationId === reservationId);
  }
}

export function calculatePaidAmount(reservationId: string) {
  const reservationPayments = payments.filter(
    (payment) => payment.reservationId === reservationId && payment.status !== "refunded",
  );
  if (reservationPayments.length) {
    return reservationPayments.reduce((sum, payment) => sum + payment.amount, 0);
  }

  return reservations.find((item) => item.id === reservationId)?.paidAmount ?? 0;
}

export function calculateRemainingAmount(reservationId: string) {
  const reservation = reservations.find((item) => item.id === reservationId);
  if (!reservation) return 0;
  return Math.max(0, reservation.total - calculatePaidAmount(reservationId));
}

export async function setPaymentStatus(reservationId: string, status: PaymentStatus) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) throw new Error("Supabase n'est pas configure.");

  const reservationItems = await listReservations();
  const reservation = reservationItems.find((item) => item.id === reservationId);
  if (!reservation) throw new Error(`Reservation ${reservationId} introuvable.`);

  const amount =
    status === "paid" ? reservation.total : status === "deposit_paid" ? reservation.deposit : 0;
  const paidAmount = status === "refunded" ? 0 : amount;
  const remainingAmount = Math.max(0, reservation.total - paidAmount);

  const existingPayment = await getPaymentForReservation(reservationId);
  let mappedPayment: Payment | undefined;

  if (existingPayment) {
    const { data, error } = await supabase
      .from("payments")
      .update({
        amount,
        status,
        method: existingPayment.method,
        paid_at: status === "paid" || status === "deposit_paid" ? new Date().toISOString() : null,
      })
      .eq("id", existingPayment.id)
      .select("*")
      .single();

    if (error) throw error;
    mappedPayment = mapPaymentFromDb(data);
    upsertPaymentInMock(mappedPayment);
  } else if (status !== "unpaid") {
    const { data, error } = await supabase
      .from("payments")
      .insert({
        reservation_id: reservationId,
        amount,
        status,
        method: "online",
        paid_at: status === "paid" || status === "deposit_paid" ? new Date().toISOString() : null,
      })
      .select("*")
      .single();

    if (error) throw error;
    mappedPayment = mapPaymentFromDb(data);
    upsertPaymentInMock(mappedPayment);
  }

  const { error: reservationError } = await supabase
    .from("reservations")
    .update({
      payment_status: status,
      paid_amount: paidAmount,
      remaining_amount: remainingAmount,
    })
    .eq("id", reservationId);

  if (reservationError) throw reservationError;

  reservation.paymentStatus = status;
  reservation.paidAmount = paidAmount;
  reservation.remainingAmount = remainingAmount;
  return mappedPayment;
}

function upsertPaymentInMock(payment: Payment) {
  const index = payments.findIndex((item) => item.id === payment.id);
  if (index >= 0) payments[index] = payment;
  else payments.unshift(payment);
}
