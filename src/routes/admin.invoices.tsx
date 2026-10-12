import { createFileRoute } from "@tanstack/react-router";
import { Download, Mail, Printer } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdminActionBar } from "@/components/admin/AdminActionBar";
import { AdminLayout } from "@/components/admin/admin-layout";
import { StatusBadge } from "@/components/admin/status-badge";
import { hotelSettings, invoices, reservations, rooms } from "@/data/hotel";
import { headT } from "@/lib/i18n/head";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { localizeRoomName } from "@/lib/i18n/rooms";
import { listInvoices } from "@/lib/services/invoiceService";
import { calculatePaidAmount, calculateRemainingAmount } from "@/lib/services/paymentService";
import { listPayments } from "@/lib/services/paymentService";
import { listReservations } from "@/lib/services/reservationService";
import { listRoomTypes } from "@/lib/services/roomService";

export const Route = createFileRoute("/admin/invoices")({
  head: () => ({
    meta: [{ title: headT("Factures - Marina Cap Monastir", "Invoices - Marina Cap Monastir") }],
  }),
  loader: async () => {
    await Promise.all([listRoomTypes(), listReservations(), listPayments(), listInvoices()]);
    return null;
  },
  component: AdminInvoices,
});

const INVOICE_STATUS: Record<string, { fr: string; en: string }> = {
  draft: { fr: "Brouillon", en: "Draft" },
  issued: { fr: "Émise", en: "Issued" },
  paid: { fr: "Payée", en: "Paid" },
  void: { fr: "Annulée", en: "Void" },
};

function AdminInvoices() {
  const { t, pick, locale, formatCurrency } = useI18n();
  const [selectedId, setSelectedId] = useState(invoices[0]?.id ?? "");
  const [notif, setNotif] = useState<string | null>(null);

  useEffect(() => {
    if (!notif) return;
    const timer = window.setTimeout(() => setNotif(null), 3500);
    return () => clearTimeout(timer);
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
      title={t("Factures", "Invoices")}
      description={t(
        "Générez une prévisualisation HTML imprimable pour chaque réservation.",
        "Generate a printable HTML preview for each booking.",
      )}
      actions={
        <AdminActionBar
          actions={[
            {
              label: t("Imprimer", "Print"),
              icon: <Printer className="size-4" />,
              variant: "primary",
              onClick: () => window.print(),
            },
            {
              label: t("Envoyer par email", "Send by email"),
              icon: <Mail className="size-4" />,
              variant: "outline",
              onClick: () =>
                setNotif(t("Envoi par email bientôt disponible.", "Email sending coming soon.")),
            },
            {
              label: "PDF",
              icon: <Download className="size-4" />,
              variant: "outline",
              onClick: () =>
                setNotif(t("Export PDF bientôt disponible.", "PDF export coming soon.")),
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
            aria-label={t("Fermer", "Close")}
            onClick={() => setNotif(null)}
            className="rounded-sm text-primary/50 transition hover:text-primary"
          >
            ✕
          </button>
        </div>
      )}
      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <aside className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-primary">{t("Factures", "Invoices")}</h2>
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
                  <span className="text-xs">
                    {INVOICE_STATUS[invoice.status]
                      ? pick(INVOICE_STATUS[invoice.status])
                      : invoice.status}
                  </span>
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
                <h2 className="text-3xl font-bold text-primary">{t("Facture", "Invoice")}</h2>
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
                <h3 className="font-bold text-primary">{t("Client", "Guest")}</h3>
                <p className="mt-2 text-sm">{reservation.guest.fullName}</p>
                <p className="text-sm text-muted-foreground">{reservation.guest.email}</p>
                <p className="text-sm text-muted-foreground">{reservation.guest.identityNumber}</p>
              </div>
              <div className="md:text-right">
                <h3 className="font-bold text-primary">{t("Réservation", "Booking")}</h3>
                <p className="mt-2 text-sm">{reservation.reservationNumber}</p>
                <p className="text-sm text-muted-foreground">
                  {reservation.checkIn} {t("au", "to")} {reservation.checkOut}
                </p>
                <div className="mt-2">
                  <StatusBadge kind="payment" value={reservation.paymentStatus} />
                </div>
              </div>
            </div>

            <table className="mt-8 w-full text-sm">
              <thead className="border-y border-border text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="py-3">{t("Description", "Description")}</th>
                  <th className="py-3 text-right">{t("Montant", "Amount")}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-4">
                    {localizeRoomName(room, locale)} · {reservation.nights}{" "}
                    {reservation.nights > 1 ? t("nuits", "nights") : t("nuit", "night")}
                  </td>
                  <td className="py-4 text-right">{formatCurrency(reservation.roomPrice)}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4">{t("Taxes et frais", "Taxes and fees")}</td>
                  <td className="py-4 text-right">{formatCurrency(reservation.taxesAndFees)}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4">{t("Montant payé", "Amount paid")}</td>
                  <td className="py-4 text-right">{formatCurrency(paidAmount)}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4">{t("Restant dû", "Balance due")}</td>
                  <td className="py-4 text-right">{formatCurrency(remainingAmount)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="text-lg font-bold text-primary">
                  <td className="pt-5">{t("Total", "Total")}</td>
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
