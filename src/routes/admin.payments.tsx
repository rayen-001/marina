import { createFileRoute } from "@tanstack/react-router";
import { Banknote, CreditCard, RotateCcw } from "lucide-react";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { KpiCard } from "@/components/admin/kpi-card";
import { StatusBadge } from "@/components/admin/status-badge";
import {
  payments,
  reservations,
  rooms,
  type ChannelSource,
  type PaymentMethod,
  type PaymentStatus,
} from "@/data/hotel";
import { headT } from "@/lib/i18n/head";
import { useI18n } from "@/lib/i18n/I18nProvider";
import {
  getChannelLabels,
  getPaymentMethodLabels,
  getPaymentStatusLabels,
} from "@/lib/i18n/labels";
import { localizeRoomName } from "@/lib/i18n/rooms";
import {
  calculatePaidAmount,
  calculateRemainingAmount,
  listPayments,
  setPaymentStatus as setPaymentStatusRemote,
} from "@/lib/services/paymentService";
import { listReservations } from "@/lib/services/reservationService";
import { listRoomTypes } from "@/lib/services/roomService";

export const Route = createFileRoute("/admin/payments")({
  head: () => ({
    meta: [{ title: headT("Paiements - Marina Cap Monastir", "Payments - Marina Cap Monastir") }],
  }),
  loader: async () => {
    await Promise.all([listRoomTypes(), listReservations(), listPayments()]);
    return null;
  },
  component: AdminPayments,
});

const methods: Array<PaymentMethod | "all"> = [
  "all",
  "cash",
  "card",
  "bank_transfer",
  "online",
  "booking_com_payout",
  "airbnb_payout",
  "expedia_payout",
];

function AdminPayments() {
  const { t, locale, formatCurrency } = useI18n();
  const paymentStatusLabels = getPaymentStatusLabels(locale);
  const channelLabels = getChannelLabels(locale);
  const methodLabels = getPaymentMethodLabels(locale);
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "all">("all");
  const [methodFilter, setMethodFilter] = useState<PaymentMethod | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<ChannelSource | "all">("all");
  const [dateFilter, setDateFilter] = useState("");
  const [version, setVersion] = useState(0);

  const rows = payments.filter((payment) => {
    const reservation = reservations.find((item) => item.id === payment.reservationId);
    if (statusFilter !== "all" && payment.status !== statusFilter) return false;
    if (methodFilter !== "all" && payment.method !== methodFilter) return false;
    if (sourceFilter !== "all" && reservation?.source !== sourceFilter) return false;
    if (dateFilter && payment.updatedAt !== dateFilter) return false;
    return true;
  });

  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const remaining = reservations.reduce(
    (sum, reservation) => sum + calculateRemainingAmount(reservation.id),
    0,
  );
  const unpaidCount = reservations.filter(
    (reservation) => reservation.paymentStatus === "unpaid",
  ).length;

  const changeStatus = (reservationId: string, status: PaymentStatus) => {
    void setPaymentStatusRemote(reservationId, status).then(() => setVersion((value) => value + 1));
  };

  return (
    <AdminLayout
      title={t("Paiements", "Payments")}
      description={t(
        "Suivi des statuts et montants sans stockage de carte ni CVC.",
        "Status and amount tracking, no card or CVC storage.",
      )}
    >
      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <KpiCard
          label={t("Montant encaissé", "Amount collected")}
          value={formatCurrency(totalPaid)}
          detail={t("Tous paiements mockés", "All mock payments")}
          icon={CreditCard}
        />
        <KpiCard
          label={t("Restant dû", "Balance due")}
          value={formatCurrency(remaining)}
          detail={t("Solde client", "Guest balance")}
          icon={Banknote}
        />
        <KpiCard
          label={t("Non payés", "Unpaid")}
          value={String(unpaidCount)}
          detail={t("À relancer", "To follow up")}
          icon={RotateCcw}
        />
      </section>

      <div className="rounded-lg border border-border bg-card shadow-sm">
        <div className="grid gap-3 border-b border-border p-4 md:grid-cols-4">
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as PaymentStatus | "all")}
            className="admin-input"
          >
            <option value="all">{t("Tous les statuts", "All statuses")}</option>
            {Object.entries(paymentStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={methodFilter}
            onChange={(event) => setMethodFilter(event.target.value as PaymentMethod | "all")}
            className="admin-input"
          >
            {methods.map((method) => (
              <option key={method} value={method}>
                {method === "all" ? t("Toutes méthodes", "All methods") : methodLabels[method]}
              </option>
            ))}
          </select>
          <select
            value={sourceFilter}
            onChange={(event) => setSourceFilter(event.target.value as ChannelSource | "all")}
            className="admin-input"
          >
            <option value="all">{t("Toutes sources", "All sources")}</option>
            {Object.entries(channelLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={(event) => setDateFilter(event.target.value)}
            className="admin-input"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3">{t("Réservation", "Booking")}</th>
                <th className="px-4 py-3">{t("Client", "Guest")}</th>
                <th className="px-4 py-3">{t("Chambre", "Room")}</th>
                <th className="px-4 py-3">{t("Source", "Source")}</th>
                <th className="px-4 py-3">{t("Payé", "Paid")}</th>
                <th className="px-4 py-3">{t("Restant", "Remaining")}</th>
                <th className="px-4 py-3">{t("Statut", "Status")}</th>
                <th className="px-4 py-3">{t("Méthode", "Method")}</th>
                <th className="px-4 py-3">{t("Date", "Date")}</th>
                <th className="px-4 py-3">{t("Actions", "Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((payment) => {
                const reservation = reservations.find((item) => item.id === payment.reservationId);
                const room = reservation
                  ? rooms.find((item) => item.id === reservation.roomId)
                  : undefined;
                const paid = reservation ? calculatePaidAmount(reservation.id) : payment.amount;
                const due = reservation ? calculateRemainingAmount(reservation.id) : 0;
                return (
                  <tr key={`${payment.id}-${version}`} className="border-t border-border">
                    <td className="px-4 py-3 font-semibold text-primary">
                      {reservation?.reservationNumber}
                    </td>
                    <td className="px-4 py-3">{reservation?.guest.fullName}</td>
                    <td className="px-4 py-3">{room ? localizeRoomName(room, locale) : ""}</td>
                    <td className="px-4 py-3">
                      {reservation && <StatusBadge kind="source" value={reservation.source} />}
                    </td>
                    <td className="px-4 py-3 font-semibold">{formatCurrency(paid)}</td>
                    <td className="px-4 py-3">{formatCurrency(due)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge kind="payment" value={payment.status} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {methodLabels[payment.method] ?? payment.method}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{payment.updatedAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            reservation && changeStatus(reservation.id, "deposit_paid")
                          }
                          className="admin-action"
                        >
                          {t("Ajouter acompte", "Add deposit")}
                        </button>
                        <button
                          type="button"
                          onClick={() => reservation && changeStatus(reservation.id, "paid")}
                          className="admin-action"
                        >
                          {t("Marquer payé", "Mark as paid")}
                        </button>
                        <button
                          type="button"
                          onClick={() => reservation && changeStatus(reservation.id, "refunded")}
                          className="admin-action"
                        >
                          {t("Rembourser", "Refund")}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="border-t border-border p-4 text-xs leading-5 text-muted-foreground">
          {t(
            "Les méthodes de paiement sont des statuts de suivi seulement. Aucun numéro de carte ni CVC n'est stocké.",
            "Payment methods are tracking statuses only. No card number or CVC is stored.",
          )}
        </p>
      </div>
    </AdminLayout>
  );
}
