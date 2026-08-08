import { createFileRoute, Link } from "@tanstack/react-router";
import { adminButtonClasses } from "@/components/admin/AdminButton";
import {
  AlertTriangle,
  BarChart3,
  CreditCard,
  Crown,
  FileText,
  Download,
  Percent,
  Target,
  Users,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { KpiCard } from "@/components/admin/kpi-card";
import { channelLabels, formatCurrency } from "@/data/hotel";
import {
  getAvailableUnitsForDate,
  getBestSellingRooms,
  getMonthlyRevenueStats,
  getOccupancyRate,
  getRevenueBySource,
  getTodayIso,
} from "@/lib/services/statisticsService";
import { listAutomationAlerts } from "@/lib/services/alertService";
import { listInvoices } from "@/lib/services/invoiceService";
import { listPayments } from "@/lib/services/paymentService";
import { listReservations } from "@/lib/services/reservationService";
import { listRoomTypes } from "@/lib/services/roomService";

export const Route = createFileRoute("/admin/direction")({
  loader: async () => {
    const today = getTodayIso();
    const [monthlyStats, occupancyRate, roomItems, reservationItems, paymentItems, invoiceItems] =
      await Promise.all([
        getMonthlyRevenueStats(),
        getOccupancyRate(today),
        listRoomTypes(),
        listReservations(),
        listPayments(),
        listInvoices(),
      ]);
    const [availableUnits, revenueBySource, bestRooms, alerts] = await Promise.all([
      getAvailableUnitsForDate(today),
      getRevenueBySource(),
      getBestSellingRooms(),
      listAutomationAlerts(today),
    ]);

    return {
      today,
      monthlyStats,
      occupancyRate,
      roomItems,
      reservationItems,
      paymentItems,
      invoiceItems,
      availableUnits,
      revenueBySource,
      bestRooms,
      alerts,
    };
  },
  head: () => ({
    meta: [{ title: "Direction - Marina Cap Monastir" }],
  }),
  component: AdminDirection,
});

function AdminDirection() {
  const {
    monthlyStats,
    occupancyRate,
    roomItems,
    reservationItems,
    paymentItems,
    invoiceItems,
    availableUnits,
    revenueBySource,
    bestRooms,
    alerts,
  } = Route.useLoaderData();
  const totalUnits = roomItems.reduce((sum, room) => sum + room.totalUnits, 0);
  const remainingAmount = reservationItems.reduce((sum, reservation) => {
    const paid = paymentItems
      .filter(
        (payment) => payment.reservationId === reservation.id && payment.status !== "refunded",
      )
      .reduce((paymentSum, payment) => paymentSum + payment.amount, 0);
    return sum + Math.max(0, reservation.total - paid);
  }, 0);
  const paidAmount = paymentItems
    .filter((payment) => payment.status !== "refunded")
    .reduce((sum, payment) => sum + payment.amount, 0);
  const unpaidInvoices = invoiceItems.filter(
    (invoice) => invoice.status !== "paid" && invoice.status !== "void",
  );
  const activeReservations = reservationItems.filter((reservation) =>
    ["pending", "confirmed", "checked_in"].includes(reservation.status),
  );
  const cancellations = reservationItems.filter(
    (reservation) => reservation.status === "cancelled" || reservation.status === "no_show",
  );
  const criticalAlerts = alerts.filter((alert) => alert.severity === "critical");
  const sortedRevenueBySource = revenueBySource.sort((a, b) => b.revenue - a.revenue);
  const maxSourceRevenue = Math.max(1, ...sortedRevenueBySource.map((source) => source.revenue));
  const topRooms = bestRooms.slice(0, 4);
  const hotelRevenue = paidAmount;
  const totalRevenue = Math.max(
    1,
    sortedRevenueBySource.reduce((sum, item) => sum + item.revenue, 0),
  );
  const teamActivity = [
    { label: "Reception", value: `${activeReservations.length} dossiers actifs` },
    { label: "Comptabilite", value: `${unpaidInvoices.length} factures a suivre` },
  ];

  return (
    <AdminLayout
      title="Direction"
      description="Vue exécutive pour piloter revenus, occupation, risques opérationnels et performance des canaux."
      actions={
        <Link to="/admin/statistics" className={adminButtonClasses("primary")}>
          Analyse détaillée
        </Link>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <KpiCard
          label="Revenu hotel"
          value={formatCurrency(hotelRevenue)}
          detail="Paiements non rembourses"
          icon={CreditCard}
        />
        <KpiCard
          label="Occupation"
          value={`${occupancyRate}%`}
          detail={`${totalUnits - availableUnits}/${totalUnits} unités vendues`}
          icon={Percent}
        />
        <KpiCard
          label="Solde restant"
          value={formatCurrency(remainingAmount)}
          detail={`${unpaidInvoices.length} facture(s) à suivre`}
          icon={FileText}
        />
        <KpiCard
          label="Alertes critiques"
          value={String(criticalAlerts.length)}
          detail={`${alerts.length} alertes opérationnelles`}
          icon={AlertTriangle}
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-primary">Synthèse exécutive</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Indicateurs consolidés depuis le mock store PMS.
              </p>
            </div>
            <Crown className="size-5 text-accent" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <ExecutiveTile
              label="Réservations actives"
              value={String(activeReservations.length)}
              detail="pending, confirmed, checked-in"
            />
            <ExecutiveTile
              label="Annulations / no-show"
              value={String(cancellations.length)}
              detail="Sur l'échantillon mock"
            />
            <ExecutiveTile
              label="RevPAR"
              value={formatCurrency(monthlyStats.revpar)}
              detail="Revenu par unité disponible"
            />
            <ExecutiveTile
              label="Performance mensuelle"
              value={formatCurrency(monthlyStats.revenue)}
              detail={`ADR ${formatCurrency(monthlyStats.adr)}`}
            />
            <ExecutiveTile
              label="Unités disponibles"
              value={String(availableUnits)}
              detail={`Sur ${totalUnits} unités hôtelières`}
            />
          </div>
          <div className="mt-5 rounded-md border border-border bg-background p-4">
            <div className="flex items-center gap-2 font-semibold text-primary">
              <Target className="size-4 text-accent" />
              Priorités de gestion
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {[
                { label: "Relancer soldes", text: formatCurrency(remainingAmount) },
                {
                  label: "Contrôler channels",
                  text: `${alerts.filter((alert) => alert.type === "channel_sync_error").length} anomalie(s)`,
                },
                {
                  label: "Préserver inventaire",
                  text: `${alerts.filter((alert) => alert.type === "overbooking_risk").length} risque(s)`,
                },
              ].map((item) => (
                <div key={item.label} className="rounded-md bg-secondary p-3">
                  <div className="text-sm font-semibold text-primary">{item.label}</div>
                  <div className="mt-1 text-lg font-bold">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 rounded-md border border-border bg-background p-4">
            <div className="text-sm font-semibold text-primary">Synthese equipes</div>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {teamActivity.map((item) => (
                <div key={item.label} className="rounded-md bg-secondary p-3">
                  <div className="text-sm font-semibold text-primary">{item.label}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="size-5 text-accent" />
            <h2 className="text-lg font-bold text-primary">Risques à arbitrer</h2>
          </div>
          <div className="space-y-3">
            {alerts.slice(0, 6).map((alert) => (
              <div key={alert.id} className="rounded-md border border-border bg-background p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-semibold text-primary">{alert.title}</span>
                  <span
                    className={
                      alert.severity === "critical"
                        ? "text-sm font-bold text-red-700"
                        : "text-sm font-bold text-amber-700"
                    }
                  >
                    {alert.severity}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">{alert.description}</p>
              </div>
            ))}
            {alerts.length === 0 && (
              <p className="rounded-md border border-border bg-background p-4 text-sm text-muted-foreground">
                Aucun risque opérationnel dans le jeu de données actuel.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <ChartCard title="Mix de revenus par canal" icon={BarChart3}>
          {sortedRevenueBySource.map((item) => (
            <Bar
              key={item.source}
              label={channelLabels[item.source as keyof typeof channelLabels] ?? item.label}
              value={`${formatCurrency(item.revenue)} · ${Math.round((item.revenue / totalRevenue) * 100)}%`}
              percent={(item.revenue / maxSourceRevenue) * 100}
            />
          ))}
        </ChartCard>

        <ChartCard title="Performance chambres" icon={Users}>
          {topRooms.map((item) => (
            <Bar
              key={item.room.id}
              label={item.room.name}
              value={`${item.reservations} réservation(s) · ${formatCurrency(item.revenue)}`}
              percent={(item.reservations / Math.max(1, topRooms[0]?.reservations ?? 1)) * 100}
            />
          ))}
        </ChartCard>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card p-5 shadow-sm">
        <h2 className="text-lg font-bold text-primary">Commandes de direction</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Boutons mock sécurisés: ils ne déclenchent aucun export réel, paiement, email ou
          synchronisation externe.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            "Export PDF placeholder",
            "Export Excel placeholder",
            "Rapport automatise placeholder",
            "Controler factures",
            "Revoir strategie channels",
          ].map((action) => (
            <button
              key={action}
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-primary hover:bg-secondary"
            >
              <Download className="size-4" />
              {action}
            </button>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}

function ExecutiveTile({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-4">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl font-bold text-primary">{value}</div>
      <div className="mt-2 text-xs text-muted-foreground">{detail}</div>
    </div>
  );
}

function ChartCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof BarChart3;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-primary">{title}</h2>
        <Icon className="size-5 text-accent" />
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Bar({ label, value, percent }: { label: string; value: string; percent: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between gap-3 text-sm">
        <span className="font-semibold">{label}</span>
        <span className="text-right text-muted-foreground">{value}</span>
      </div>
      <div className="h-3 rounded-full bg-secondary">
        <div
          className="h-3 rounded-full bg-primary"
          style={{ width: `${Math.max(5, Math.min(100, percent))}%` }}
        />
      </div>
    </div>
  );
}
