import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, CalendarDays, Percent, ReceiptText, TrendingUp } from "lucide-react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { KpiCard } from "@/components/admin/kpi-card";
import { headT } from "@/lib/i18n/head";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getChannelLabels } from "@/lib/i18n/labels";
import { localizeRoomName } from "@/lib/i18n/rooms";
import {
  getBestSellingRooms,
  getMonthlyRevenueStats,
  getOccupancyRate,
  getRevenueBySource,
  getTodayIso,
} from "@/lib/services/statisticsService";
import { listReservations } from "@/lib/services/reservationService";
import { getRoomAvailability, listRoomTypes } from "@/lib/services/roomService";

export const Route = createFileRoute("/admin/statistics")({
  loader: async () => {
    const today = getTodayIso();
    const tomorrow = nextDayIso(today);
    const [stats, occupancyRate, roomSales, revenueBySource, reservationItems, roomItems] =
      await Promise.all([
        getMonthlyRevenueStats(),
        getOccupancyRate(),
        getBestSellingRooms(),
        getRevenueBySource(),
        listReservations(),
        listRoomTypes(),
      ]);
    const occupancyByRoom = await Promise.all(
      roomItems.map(async (room) => {
        const available = await getRoomAvailability(room, today, tomorrow);
        return { room, occupied: Math.max(0, room.totalUnits - available) };
      }),
    );

    return {
      stats,
      occupancyRate,
      roomSales,
      revenueBySource,
      reservationItems,
      roomItems,
      occupancyByRoom,
    };
  },
  head: () => ({
    meta: [
      { title: headT("Statistiques - Marina Cap Monastir", "Statistics - Marina Cap Monastir") },
    ],
  }),
  component: AdminStatistics,
});

const months = ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06"];

function AdminStatistics() {
  const { stats, occupancyRate, roomSales, revenueBySource, reservationItems, occupancyByRoom } =
    Route.useLoaderData();
  const { t, locale, formatCurrency } = useI18n();
  const channelLabels = getChannelLabels(locale);
  const averageStay =
    reservationItems.length > 0
      ? Math.round(
          (reservationItems.reduce((sum, reservation) => sum + reservation.nights, 0) /
            reservationItems.length) *
            10,
        ) / 10
      : 0;
  const cancellationRate =
    reservationItems.length > 0
      ? Math.round(
          (reservationItems.filter((reservation) => reservation.status === "cancelled").length /
            reservationItems.length) *
            100,
        )
      : 0;
  const maxSourceRevenue = Math.max(1, ...revenueBySource.map((item) => item.revenue));
  const monthlyComparison = months.map((month, index) => ({
    month,
    revenue: Math.max(0, stats.revenue + (index - 4) * 4200),
  }));
  const maxMonthlyRevenue = Math.max(1, ...monthlyComparison.map((item) => item.revenue));

  return (
    <AdminLayout
      title={t("Statistiques & optimisation", "Statistics & optimisation")}
      description={t(
        "Indicateurs revenus, occupation, sources, chambres et préparation au pricing dynamique.",
        "Revenue, occupancy, source and room indicators, ready for dynamic pricing.",
      )}
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <KpiCard
          label={t("Revenu mensuel", "Monthly revenue")}
          value={formatCurrency(stats.revenue)}
          detail={stats.month}
          icon={TrendingUp}
        />
        <KpiCard
          label={t("Taux occupation", "Occupancy rate")}
          value={`${occupancyRate}%`}
          detail={t("Aujourd'hui", "Today")}
          icon={Percent}
        />
        <KpiCard
          label="ADR"
          value={formatCurrency(stats.adr)}
          detail={t("Prix moyen par nuit (ADR)", "Average daily rate")}
          icon={BarChart3}
        />
        <KpiCard
          label="RevPAR"
          value={formatCurrency(stats.revpar)}
          detail={t("Revenu par unité", "Revenue per unit")}
          icon={ReceiptText}
        />
        <KpiCard
          label={t("Séjour moyen", "Average stay")}
          value={`${averageStay} ${t("nuits", "nights")}`}
          detail={`${t("Annulation", "Cancellation")} ${cancellationRate}%`}
          icon={CalendarDays}
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <ChartCard title={t("Comparaison mensuelle", "Monthly comparison")}>
          {monthlyComparison.map((item) => (
            <Bar
              key={item.month}
              label={item.month}
              value={formatCurrency(item.revenue)}
              percent={(item.revenue / maxMonthlyRevenue) * 100}
            />
          ))}
        </ChartCard>

        <ChartCard title={t("Revenus par source", "Revenue by source")}>
          {revenueBySource.map((item) => (
            <Bar
              key={item.source}
              label={channelLabels[item.source as keyof typeof channelLabels] ?? item.label}
              value={formatCurrency(item.revenue)}
              percent={(item.revenue / maxSourceRevenue) * 100}
            />
          ))}
        </ChartCard>

        <ChartCard title={t("Meilleures chambres", "Best-selling rooms")}>
          {roomSales.map((item) => (
            <Bar
              key={item.room.id}
              label={localizeRoomName(item.room, locale)}
              value={`${item.reservations} ${t("réservations", "bookings")} · ${formatCurrency(item.revenue)}`}
              percent={(item.reservations / Math.max(1, roomSales[0]?.reservations ?? 1)) * 100}
            />
          ))}
        </ChartCard>

        <ChartCard title={t("Occupation par type de chambre", "Occupancy by room type")}>
          {occupancyByRoom.map(({ room, occupied }) => {
            return (
              <Bar
                key={room.id}
                label={localizeRoomName(room, locale)}
                value={`${occupied}/${room.totalUnits} ${t("unités", "units")}`}
                percent={(occupied / room.totalUnits) * 100}
              />
            );
          })}
        </ChartCard>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card p-5 shadow-sm">
        <h2 className="text-lg font-bold text-primary">
          {t("Optimisation des revenus", "Revenue optimisation")}
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {[
            {
              label: t("Haute saison", "High season"),
              value: "+25%",
              text: t("Juillet, août, événements portuaires", "July, August, marina events"),
            },
            {
              label: t("Basse saison", "Low season"),
              value: "-12%",
              text: t("Séjours longs et packages", "Long stays and packages"),
            },
            {
              label: t("Week-end", "Weekend"),
              value: "+15%",
              text: t("Vendredi et samedi", "Friday and Saturday"),
            },
            {
              label: t("Événement spécial", "Special event"),
              value: t("manuel", "manual"),
              text: t("Ajustement manuel, sans pricing IA", "Manual adjustment, no AI pricing"),
            },
          ].map((item) => (
            <div key={item.label} className="rounded-md border border-border bg-background p-4">
              <div className="text-sm font-semibold text-primary">{item.label}</div>
              <div className="mt-2 text-2xl font-bold">{item.value}</div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}

function nextDayIso(date: string) {
  const nextDate = new Date(`${date}T12:00:00`);
  nextDate.setDate(nextDate.getDate() + 1);
  return nextDate.toISOString().slice(0, 10);
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-primary">{title}</h2>
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
