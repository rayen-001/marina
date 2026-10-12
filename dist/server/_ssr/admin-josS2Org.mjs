import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as Route$u, u as useI18n, T as emptyDashboardData, U as emptyDashboardErrors, V as defaultStats, W as getTodayIso, X as asArray, Y as safeNumber, Z as safeDateString, i as isSupabaseConfigured, _ as AdminLayout, $ as KpiCard, a0 as adminButtonClasses, a1 as localizeAlertTitle, a2 as localizeAlertSeverity, a3 as localizeAlertDescription, I as localizeRoomName, a4 as AdminNewReservationButton, a5 as getChannelLabels, N as tr } from "./router-CgbkQim6.mjs";
import { d as useRouterState, O as Outlet, u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { C as CreateClientAccountButton } from "./CreateClientAccountButton-eM_9t3wQ.mjs";
import { R as ReservationsTable } from "./reservations-table-Cbgcc6pE.mjs";
import { S as StatusBadge } from "./status-badge-Cw5SwgC6.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { a7 as CalendarCheck, a8 as CalendarX, a9 as Percent, B as BedDouble, a as CreditCard, aa as ReceiptText, ab as TriangleAlert, b as TrendingUp, ac as RefreshCw, e as Hotel, U as Users, a1 as CircleCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./server-4up-b2hM.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
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
import "../_libs/zod.mjs";
function normalizeRevenueStats(value, today) {
  return {
    month: value?.month ?? today.slice(0, 7),
    revenue: safeNumber(value?.revenue),
    adr: safeNumber(value?.adr),
    revpar: safeNumber(value?.revpar),
    unpaidAmount: safeNumber(value?.unpaidAmount)
  };
}
function formatModuleName(module) {
  const labels = {
    reservations: {
      fr: "Réservations",
      en: "Bookings"
    },
    rooms: {
      fr: "Chambres",
      en: "Rooms"
    },
    payments: {
      fr: "Paiements",
      en: "Payments"
    },
    invoices: {
      fr: "Factures",
      en: "Invoices"
    },
    guests: {
      fr: "Clients",
      en: "Guests"
    },
    alerts: {
      fr: "Alertes",
      en: "Alerts"
    },
    statistics: {
      fr: "Statistiques",
      en: "Statistics"
    }
  };
  const label = labels[module];
  return label ? tr(label.fr, label.en) : module;
}
function AdminRoute() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname
  });
  if (pathname !== "/admin") return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, {});
}
function AdminDashboard() {
  const loaderData = Route$u.useLoaderData();
  const router = useRouter();
  const {
    t,
    pick,
    locale,
    formatCurrency
  } = useI18n();
  const channelLabels = getChannelLabels(locale);
  const data = loaderData?.data ?? emptyDashboardData();
  const errors = loaderData?.errors ?? {
    ...emptyDashboardErrors
  };
  const failedModules = Object.entries(errors).filter(([, error]) => Boolean(error));
  failedModules.length > 0 ? "partial" : "success";
  const stats = data.stats ?? defaultStats(getTodayIso());
  const today = stats.today ?? getTodayIso();
  const roomItems = asArray(data.rooms);
  const reservationItems = asArray(data.reservations);
  const invoiceItems = asArray(data.invoices);
  const alerts = asArray(data.alerts);
  const arrivals = asArray(stats.arrivals);
  const departures = asArray(stats.departures);
  const currentGuests = asArray(stats.currentGuests);
  const monthlyStats = normalizeRevenueStats(stats.monthlyStats, today);
  const revenueBySource = asArray(stats.revenueBySource);
  const availableToday = safeNumber(stats.availableToday);
  const retry = () => void router.invalidate();
  const totalUnits = roomItems.reduce((sum, room) => sum + safeNumber(room?.totalUnits), 0);
  const bookedToday = Math.max(0, totalUnits - availableToday);
  const occupancy = totalUnits > 0 ? Math.round(bookedToday / totalUnits * 100) : 0;
  reservationItems.filter((reservation) => reservation?.status === "confirmed").length;
  reservationItems.filter((reservation) => reservation?.status === "pending").length;
  reservationItems.filter((reservation) => reservation?.status === "cancelled").length;
  const pendingPayments = reservationItems.filter((reservation) => reservation?.paymentStatus !== "paid").length;
  invoiceItems.filter((invoice) => invoice?.status !== "paid" && invoice?.status !== "void").length;
  const maxRevenue = Math.max(1, ...revenueBySource.map((item) => safeNumber(item?.revenue)));
  const activeStatuses = /* @__PURE__ */ new Set(["pending", "confirmed", "checked_in"]);
  const roomsToWatch = roomItems.map((room) => {
    const occupied = reservationItems.filter((reservation) => reservation?.roomId === room.id && activeStatuses.has(reservation?.status ?? "") && safeDateString(reservation.checkIn) <= today && safeDateString(reservation.checkOut) > today).length;
    const total = safeNumber(room.totalUnits);
    const available = Math.max(0, total - occupied);
    const ratio = total > 0 ? Math.round(occupied / total * 100) : 0;
    return {
      room,
      occupied,
      available,
      ratio
    };
  }).filter(({
    room,
    available,
    ratio
  }) => room.status !== "active" || available <= 2 || ratio >= 70).slice(0, 5);
  const hotelStatus = isSupabaseConfigured() ? t("Supabase connecté", "Supabase connected") : t("Mock local", "Local mock data");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: t("Tableau de bord", "Dashboard"), description: t("Pilotage hôtelier centralisé : arrivées, départs, revenus, alertes et canaux.", "Central hotel management: arrivals, departures, revenue, alerts and channels."), actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CreateClientAccountButton, { onCreated: () => router.invalidate() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/statistics", className: adminButtonClasses("primary"), children: t("Voir statistiques", "View statistics") })
  ] }), children: [
    failedModules.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardErrorCard, { failedModules, onRetry: retry }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardHero, { today, hotelStatus, occupancy, pendingPayments }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: t("Check-ins aujourd'hui", "Check-ins today"), value: String(arrivals.length), detail: today, trend: arrivals.length > 0 ? t("À préparer", "To prepare") : t("Calme", "Quiet"), icon: CalendarCheck, tone: "gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: t("Check-outs aujourd'hui", "Check-outs today"), value: String(departures.length), detail: t("Départs prévus", "Scheduled departures"), trend: departures.length > 0 ? t("À suivre", "To follow") : t("RAS", "All clear"), icon: CalendarX, tone: "turquoise" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: t("Taux d'occupation", "Occupancy rate"), value: `${occupancy}%`, detail: `${bookedToday}/${totalUnits} ${t("unités", "units")}`, trend: occupancy >= 80 ? t("Fort", "High") : t("Stable", "Stable"), icon: Percent, tone: occupancy >= 80 ? "green" : "navy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: t("Chambres disponibles", "Rooms available"), value: String(availableToday), detail: t("Inventaire du jour", "Today's inventory"), trend: availableToday <= 2 ? t("Faible", "Low") : t("Disponible", "Available"), icon: BedDouble, tone: availableToday <= 2 ? "red" : "green" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: t("Revenu mensuel", "Monthly revenue"), value: formatCurrency(monthlyStats.revenue), detail: `ADR ${formatCurrency(monthlyStats.adr)}`, trend: `RevPAR ${formatCurrency(monthlyStats.revpar)}`, icon: CreditCard, tone: "gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: t("Paiements en attente", "Pending payments"), value: String(pendingPayments), detail: formatCurrency(monthlyStats.unpaidAmount), trend: pendingPayments > 0 ? t("Relance", "Follow up") : t("À jour", "Up to date"), icon: ReceiptText, tone: pendingPayments > 0 ? "red" : "green" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: t("Réservations récentes", "Recent bookings"), action: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/reservations", className: adminButtonClasses("outline", "sm"), children: t("Voir tout", "View all") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReservationsTable, { compact: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardPanel, { title: t("Alertes opérationnelles", "Operational alerts"), icon: TriangleAlert, children: alerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardEmptyState, { title: t("Aucune alerte active", "No active alerts"), text: t("Les opérations du jour sont stables.", "Today's operations are stable.") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: alerts.slice(0, 6).map((alert) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-primary", children: localizeAlertTitle(alert, locale) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-1 text-xs font-black ${alert.severity === "critical" ? "bg-red-50 text-red-700" : alert.severity === "warning" ? "bg-amber-50 text-amber-800" : "bg-sky-50 text-sky-800"}`, children: localizeAlertSeverity(alert.severity, locale) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-6 text-muted-foreground", children: localizeAlertDescription(alert, locale) })
      ] }, alert.id)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardPanel, { title: t("Performance mensuelle", "Monthly performance"), icon: TrendingUp, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MetricTile, { label: t("Revenu", "Revenue"), value: formatCurrency(monthlyStats.revenue) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MetricTile, { label: "ADR", value: formatCurrency(monthlyStats.adr) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MetricTile, { label: "RevPAR", value: formatCurrency(monthlyStats.revpar) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressLine, { label: t("Occupation", "Occupancy"), value: `${occupancy}%`, percent: occupancy }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressLine, { label: t("Paiements encaissés", "Payments collected"), value: formatCurrency(monthlyStats.revenue - monthlyStats.unpaidAmount), percent: monthlyStats.revenue > 0 ? (monthlyStats.revenue - monthlyStats.unpaidAmount) / monthlyStats.revenue * 100 : 0 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardPanel, { title: t("Sources de réservation", "Booking sources"), icon: CreditCard, children: revenueBySource.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardEmptyState, { title: t("Aucune source active", "No active sources"), text: t("Les revenus par canal apparaîtront ici.", "Revenue by channel will appear here.") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: revenueBySource.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressLine, { label: channelLabels[item.source] ?? item.label, value: formatCurrency(safeNumber(item.revenue)), percent: safeNumber(item.revenue) / maxRevenue * 100 }, item.source)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardPanel, { title: t("Chambres à surveiller", "Rooms to watch"), icon: BedDouble, children: roomsToWatch.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardEmptyState, { title: t("Aucune chambre critique", "No critical rooms"), text: t("Inventaire, maintenance et occupation sont sous contrôle.", "Inventory, maintenance and occupancy are under control.") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: roomsToWatch.map(({
        room,
        occupied,
        available,
        ratio
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black text-primary", children: localizeRoomName(room, locale) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs font-semibold text-muted-foreground", children: [
              occupied,
              "/",
              safeNumber(room.totalUnits),
              " ",
              t("occupées", "occupied"),
              " ·",
              " ",
              available,
              " ",
              t("libres", "free")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { kind: "room", value: room.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressLine, { label: t("Occupation", "Occupancy"), value: `${ratio}%`, percent: ratio, compact: true })
      ] }, room.id)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 grid gap-6 xl:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReceptionPanel, { title: t("Arrivées aujourd'hui", "Arrivals today"), items: arrivals, empty: t("Aucune arrivée confirmée.", "No confirmed arrivals.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReceptionPanel, { title: t("Départs aujourd'hui", "Departures today"), items: departures, empty: t("Aucun départ en attente.", "No pending departures.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReceptionPanel, { title: t("Clients présents", "Guests in house"), items: currentGuests, empty: t("Aucun client actuellement check-in.", "No guests currently checked in.") })
    ] }),
    false
  ] });
}
function DashboardHero({
  today,
  hotelStatus,
  occupancy,
  pendingPayments
}) {
  const {
    t,
    locale
  } = useI18n();
  const date = /* @__PURE__ */ new Date(`${today}T12:00:00`);
  const formattedDate = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(Number.isNaN(date.getTime()) ? /* @__PURE__ */ new Date() : date);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mb-6 overflow-hidden rounded-2xl border border-white/15 bg-ocean p-5 text-white shadow-[var(--shadow-premium)] md:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marina-pattern absolute inset-0 opacity-35" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-ocean via-primary to-turquoise/70" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid gap-5 xl:grid-cols-[1fr_auto] xl:items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-accent backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Hotel, { className: "size-4" }),
          "Marina Cap Monastir PMS"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-3xl font-black leading-tight md:text-4xl", children: t("Tableau de bord", "Dashboard") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 max-w-3xl text-sm font-medium leading-6 text-white/78", children: [
          formattedDate,
          " · ",
          hotelStatus,
          " · ",
          t("Occupation", "Occupancy"),
          " ",
          occupancy,
          "% ·",
          " ",
          t(`${pendingPayments} paiement${pendingPayments > 1 ? "s" : ""} en attente`, `${pendingPayments} pending payment${pendingPayments > 1 ? "s" : ""}`)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2 xl:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AdminNewReservationButton, { variant: "warning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/reservations", className: adminButtonClasses("secondary", "md"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4" }),
          "Check-in"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/payments", className: adminButtonClasses("secondary", "md"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "size-4" }),
          t("Paiement", "Payment")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/channels", className: adminButtonClasses("secondary", "md"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-4" }),
          "Channels"
        ] })
      ] })
    ] })
  ] });
}
function DashboardErrorCard({
  failedModules,
  onRetry
}) {
  const {
    t
  } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 size-5 shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-black", children: t("Impossible de charger certaines données", "Some data could not be loaded") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1", children: failedModules.map(([module, error]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "break-words", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: formatModuleName(module) }),
        error ? `: ${error}` : null
      ] }, module)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: onRetry, className: "inline-flex h-9 items-center gap-2 rounded-md border border-amber-400 bg-white/70 px-3 text-xs font-black transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-3.5" }),
      t("Réessayer", "Try again")
    ] })
  ] }) });
}
function SectionHeader({
  title,
  action
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex flex-wrap items-center justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black text-primary", children: title }),
    action
  ] });
}
function DashboardPanel({
  title,
  icon: Icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black text-primary", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 items-center justify-center rounded-lg bg-accent/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5" }) })
    ] }),
    children
  ] });
}
function DashboardEmptyState({
  title,
  text
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-dashed border-primary/20 bg-secondary/60 p-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-3 flex size-11 items-center justify-center rounded-lg bg-card text-accent shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black text-primary", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground", children: text })
  ] });
}
function MetricTile({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-black uppercase tracking-[0.12em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xl font-black text-primary", children: value })
  ] });
}
function ProgressLine({
  label,
  value,
  percent,
  compact = false
}) {
  const width = Math.max(4, Math.min(100, Math.round(safeNumber(percent))));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: compact ? "mt-3" : void 0, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between gap-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-muted-foreground", children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-accent via-turquoise to-primary", style: {
      width: `${width}%`
    } }) })
  ] });
}
function ReceptionPanel({
  title,
  items,
  empty
}) {
  const {
    t
  } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black text-primary", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardEmptyState, { title: empty, text: t("Aucune action immédiate à traiter.", "Nothing to handle right now.") }) : items.map((reservation) => {
      const guest = reservation.guest ?? {
        fullName: t("Client", "Guest"),
        identityNumber: "-"
      };
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-primary", children: guest.fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: reservation.reservationNumber ?? reservation.id })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-sm text-muted-foreground", children: [
          safeDateString(reservation.checkIn) || "-",
          " ",
          t("au", "to"),
          " ",
          safeDateString(reservation.checkOut) || "-",
          " · ",
          guest.identityNumber
        ] }),
        reservation.paymentStatus !== "paid" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800", children: t("Rappel paiement avant check-in", "Payment reminder before check-in") })
      ] }, reservation.id);
    }) })
  ] });
}
export {
  AdminRoute as component
};
