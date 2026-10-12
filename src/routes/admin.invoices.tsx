import { createFileRoute } from "@tanstack/react-router";
import { Download, Mail, Printer } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdminActionBar } from "@/components/admin/AdminActionBar";
import { AdminLayout } from "@/components/admin/admin-layout";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatCurrency, hotelSettings, invoices, reservations, rooms } from "@/data/hotel";
import { listInvoices } from "@/lib/services/invoiceService";
import { calculatePaidAmount, calculateRemainingAmount } from "@/lib/services/paymentService";
import { listPayments } from "@/lib/services/paymentService";
import { listReservations } from "@/lib/services/reservationService";
import { listRoomTypes } from "@/lib/services/roomService";

export const Route = createFileRoute("/admin/invoices")({
  head: () => ({
    meta: [{ title: "Factures - Marina Cap Monastir" }],
  }),
  loader: async () => {
    await Promise.all([listRoomTypes(), listReservations(), listPayments(), listInvoices()]);
    return null;
  },
  component: AdminInvoices,
});

function AdminInvoices() {
  const [selectedId, setSelectedId] = useState(invoices[0]?.id ?? "");
  const [notif, setNotif] = useState<string | null>(null);

  useEffect(() => {
    if (!notif) return;
    const t = window.setTimeout(() => setNotif(null), 3500);
    return () => clearTimeout(t);
  }, [notif]);
  const selected = useMemo(
    () => invoices.find((invoice) => invoice.id === selectedId) ?? invoices[0],
    [selectedId],
  );
  const reservation = reservations.find((item) => item.id === selected?.reservationId);
  const room = reservation ? rooms.find((item) => item.id === reservation.roomId) : undefined;
  const paidAmount = reservation ? calculatePaidAmount(reservation.id) : 0;
  const remainingAmount = reservation ? calculateRemainingAmount(reservation.id) : 0;

  return (
    <AdminLayout
      title="Factures"
      description="Générez une prévisualisation HTML imprimable pour chaque réservation."
      actions={
        <AdminActionBar
          actions={[
            {
              label: "Imprimer",
              icon: <Printer className="size-4" />,
              variant: "primary",
              onClick: () => window.print(),
            },
            {
              label: "Envoyer par email",
              icon: <Mail className="size-4" />,
              variant: "outline",
              onClick: () => setNotif("Envoi par email bientôt disponible."),
            },
            {
              label: "PDF",
              icon: <Download className="size-4" />,
              variant: "outline",
              onClick: () => setNotif("Export PDF bientôt disponible."),
            },
          ]}
        />
      }
    >
      {notif && (
        <div
          role="status"
          className="mb-4 flex items-center gap-3 rounded-md border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-primary"
        >
          <span className="flex-1">{notif}</span>
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setNotif(null)}
            className="rounded-sm text-primary/50 transition hover:text-primary"
          >
            ✕
          </button>
        </div>
      )}
      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <aside className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-primary">Factures</h2>
          <div className="space-y-2">
            {invoices.map((invoice) => (
              <button
                key={invoice.id}
                type="button"
                onClick={() => setSelectedId(invoice.id)}
                className={`w-full rounded-md border px-3 py-3 text-left text-sm transition ${
                  selected?.id === invoice.id
                    ? "border-primary bg-secondary text-primary"
                    : "border-border bg-background"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold">{invoice.invoiceNumber}</span>
                  <span className="text-xs">{invoice.status}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {formatCurrency(invoice.amount)}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {selected && reservation && room && (
          <section className="print-invoice rounded-lg border border-border bg-white p-8 text-foreground shadow-sm">
            <div className="flex flex-col gap-6 border-b border-border pb-6 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-primary">Facture</h2>
                <p className="mt-2 text-sm text-muted-foreground">{selected.invoiceNumber}</p>
              </div>
              <div className="text-sm md:text-right">
                <div className="font-bold text-primary">{hotelSettings.hotelName}</div>
                <div className="mt-1 text-muted-foreground">{hotelSettings.address}</div>
                <div className="mt-1 text-muted-foreground">{hotelSettings.taxRegistration}</div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-bold text-primary">Client</h3>
                <p className="mt-2 text-sm">{reservation.guest.fullName}</p>
                <p className="text-sm text-muted-foreground">{reservation.guest.email}</p>
                <p className="text-sm text-muted-foreground">{reservation.guest.identityNumber}</p>
              </div>
              <div className="md:text-right">
                <h3 className="font-bold text-primary">Réservation</h3>
                <p className="mt-2 text-sm">{reservation.reservationNumber}</p>
                <p className="text-sm text-muted-foreground">
                  {reservation.checkIn} au {reservation.checkOut}
                </p>
                <div className="mt-2">
                  <StatusBadge kind="payment" value={reservation.paymentStatus} />
                </div>
              </div>
            </div>

            <table className="mt-8 w-full text-sm">
              <thead className="border-y border-border text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="py-3">Description</th>
                  <th className="py-3 text-right">Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-4">
                    {room.name} · {reservation.nights} nuit{reservation.nights > 1 ? "s" : ""}
                  </td>
                  <td className="py-4 text-right">{formatCurrency(reservation.roomPrice)}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4">Taxes et frais</td>
                  <td className="py-4 text-right">{formatCurrency(reservation.taxesAndFees)}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4">Montant payé</td>
                  <td className="py-4 text-right">{formatCurrency(paidAmount)}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4">Restant dû</td>
                  <td className="py-4 text-right">{formatCurrency(remainingAmount)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="text-lg font-bold text-primary">
                  <td className="pt-5">Total</td>
                  <td className="pt-5 text-right">{formatCurrency(reservation.total)}</td>
                </tr>
              </tfoot>
            </table>
          </section>
        )}
      </div>
    </AdminLayout>
  );
}
