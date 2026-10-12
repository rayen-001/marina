import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { aF as Route$c, u as useI18n, _ as AdminLayout, $ as KpiCard, I as localizeRoomName, a5 as getChannelLabels } from "./router-CgbkQim6.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { b as TrendingUp, a9 as Percent, aF as ChartColumn, aa as ReceiptText, C as CalendarDays } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./server-4up-b2hM.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
const months = ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06"];
function AdminStatistics() {
  const {
    stats,
    occupancyRate,
    roomSales,
    revenueBySource,
    reservationItems,
    occupancyByRoom
  } = Route$c.useLoaderData();
  const {
    t,
    locale,
    formatCurrency
  } = useI18n();
  const channelLabels = getChannelLabels(locale);
  const averageStay = reservationItems.length > 0 ? Math.round(reservationItems.reduce((sum, reservation) => sum + reservation.nights, 0) / reservationItems.length * 10) / 10 : 0;
  const cancellationRate = reservationItems.length > 0 ? Math.round(reservationItems.filter((reservation) => reservation.status === "cancelled").length / reservationItems.length * 100) : 0;
  const maxSourceRevenue = Math.max(1, ...revenueBySource.map((item) => item.revenue));
  const monthlyComparison = months.map((month, index) => ({
    month,
    revenue: Math.max(0, stats.revenue + (index - 4) * 4200)
  }));
  const maxMonthlyRevenue = Math.max(1, ...monthlyComparison.map((item) => item.revenue));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: t("Statistiques & optimisation", "Statistics & optimisation"), description: t("Indicateurs revenus, occupation, sources, chambres et préparation au pricing dynamique.", "Revenue, occupancy, source and room indicators, ready for dynamic pricing."), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: t("Revenu mensuel", "Monthly revenue"), value: formatCurrency(stats.revenue), detail: stats.month, icon: TrendingUp }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: t("Taux occupation", "Occupancy rate"), value: `${occupancyRate}%`, detail: t("Aujourd'hui", "Today"), icon: Percent }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "ADR", value: formatCurrency(stats.adr), detail: t("Prix moyen par nuit (ADR)", "Average daily rate"), icon: ChartColumn }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "RevPAR", value: formatCurrency(stats.revpar), detail: t("Revenu par unité", "Revenue per unit"), icon: ReceiptText }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: t("Séjour moyen", "Average stay"), value: `${averageStay} ${t("nuits", "nights")}`, detail: `${t("Annulation", "Cancellation")} ${cancellationRate}%`, icon: CalendarDays })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 grid gap-6 xl:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: t("Comparaison mensuelle", "Monthly comparison"), children: monthlyComparison.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { label: item.month, value: formatCurrency(item.revenue), percent: item.revenue / maxMonthlyRevenue * 100 }, item.month)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: t("Revenus par source", "Revenue by source"), children: revenueBySource.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { label: channelLabels[item.source] ?? item.label, value: formatCurrency(item.revenue), percent: item.revenue / maxSourceRevenue * 100 }, item.source)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: t("Meilleures chambres", "Best-selling rooms"), children: roomSales.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { label: localizeRoomName(item.room, locale), value: `${item.reservations} ${t("réservations", "bookings")} · ${formatCurrency(item.revenue)}`, percent: item.reservations / Math.max(1, roomSales[0]?.reservations ?? 1) * 100 }, item.room.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: t("Occupation par type de chambre", "Occupancy by room type"), children: occupancyByRoom.map(({
        room,
        occupied
      }) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { label: localizeRoomName(room, locale), value: `${occupied}/${room.totalUnits} ${t("unités", "units")}`, percent: occupied / room.totalUnits * 100 }, room.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 rounded-lg border border-border bg-card p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-primary", children: t("Optimisation des revenus", "Revenue optimisation") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-4 md:grid-cols-4", children: [{
        label: t("Haute saison", "High season"),
        value: "+25%",
        text: t("Juillet, août, événements portuaires", "July, August, marina events")
      }, {
        label: t("Basse saison", "Low season"),
        value: "-12%",
        text: t("Séjours longs et packages", "Long stays and packages")
      }, {
        label: t("Week-end", "Weekend"),
        value: "+15%",
        text: t("Vendredi et samedi", "Friday and Saturday")
      }, {
        label: t("Événement spécial", "Special event"),
        value: t("manuel", "manual"),
        text: t("Ajustement manuel, sans pricing IA", "Manual adjustment, no AI pricing")
      }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-background p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-primary", children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-bold", children: item.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs leading-5 text-muted-foreground", children: item.text })
      ] }, item.label)) })
    ] })
  ] });
}
function ChartCard({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-lg font-bold text-primary", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children })
  ] });
}
function Bar({
  label,
  value,
  percent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex justify-between gap-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right text-muted-foreground", children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 rounded-full bg-primary", style: {
      width: `${Math.max(5, Math.min(100, percent))}%`
    } }) })
  ] });
}
export {
  AdminStatistics as component
};
