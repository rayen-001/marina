import { createFileRoute } from "@tanstack/react-router";
import { Banknote, CreditCard, RotateCcw } from "lucide-react";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { KpiCard } from "@/components/admin/kpi-card";
import { StatusBadge } from "@/components/admin/status-badge";
import {
  channelLabels,
  formatCurrency,
  paymentStatusLabels,
  payments,
  reservations,
  rooms,
  type ChannelSource,
  type PaymentMethod,
  type PaymentStatus,
} from "@/data/hotel";
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
    meta: [{ title: "Paiements - Marina Cap Monastir" }],
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
      title="Paiements"
      description="Suivi des statuts et montants sans stockage de carte ni CVC."
    >
      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <KpiCard
          label="Montant encaissé"
          value={formatCurrency(totalPaid)}
          detail="Tous paiements mockés"
          icon={CreditCard}
        />
        <KpiCard
          label="Restant dû"
          value={formatCurrency(remaining)}
          detail="Solde client"
          icon={Banknote}
        />
        <KpiCard
          label="Non payés"
          value={String(unpaidCount)}
          detail="À relancer"
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
            <option value="all">Tous les statuts</option>
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
                {method === "all" ? "Toutes méthodes" : method}
              </option>
            ))}
          </select>
          <select
            value={sourceFilter}
            onChange={(event) => setSourceFilter(event.target.value as ChannelSource | "all")}
            className="admin-input"
          >
            <option value="all">Toutes sources</option>
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
                <th className="px-4 py-3">Réservation</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Chambre</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Payé</th>
                <th className="px-4 py-3">Restant</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Méthode</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
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
                    <td className="px-4 py-3">{room?.name}</td>
                    <td className="px-4 py-3">
                      {reservation && <StatusBadge kind="source" value={reservation.source} />}
                    </td>
                    <td className="px-4 py-3 font-semibold">{formatCurrency(paid)}</td>
                    <td className="px-4 py-3">{formatCurrency(due)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge kind="payment" value={payment.status} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{payment.method}</td>
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
                          Ajouter acompte
                        </button>
                        <button
                          type="button"
                          onClick={() => reservation && changeStatus(reservation.id, "paid")}
                          className="admin-action"
                        >
                          Marquer payé
                        </button>
                        <button
                          type="button"
                          onClick={() => reservation && changeStatus(reservation.id, "refunded")}
                          className="admin-action"
                        >
                          Rembourser
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
          Les méthodes de paiement sont des statuts de suivi seulement. Aucun numéro de carte ni CVC
          n'est stocké.
        </p>
      </div>
    </AdminLayout>
  );
}
