import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { aX as Route$3, u as useI18n, _ as AdminLayout, $ as KpiCard, a1 as localizeAlertTitle, a2 as localizeAlertSeverity, a3 as localizeAlertDescription, I as localizeRoomName, a0 as adminButtonClasses, a5 as getChannelLabels } from "./router-CgbkQim6.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { a as CreditCard, a9 as Percent, F as FileText, ab as TriangleAlert, c as Crown, aK as Target, aF as ChartColumn, U as Users, a6 as Download } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
    alerts
  } = Route$3.useLoaderData();
  const {
    t,
    locale,
    formatCurrency
  } = useI18n();
  const channelLabels = getChannelLabels(locale);
  const totalUnits = roomItems.reduce((sum, room) => sum + room.totalUnits, 0);
  const remainingAmount = reservationItems.reduce((sum, reservation) => {
    const paid = paymentItems.filter((payment) => payment.reservationId === reservation.id && payment.status !== "refunded").reduce((paymentSum, payment) => paymentSum + payment.amount, 0);
    return sum + Math.max(0, reservation.total - paid);
  }, 0);
  const paidAmount = paymentItems.filter((payment) => payment.status !== "refunded").reduce((sum, payment) => sum + payment.amount, 0);
  const unpaidInvoices = invoiceItems.filter((invoice) => invoice.status !== "paid" && invoice.status !== "void");
  const activeReservations = reservationItems.filter((reservation) => ["pending", "confirmed", "checked_in"].includes(reservation.status));
  const cancellations = reservationItems.filter((reservation) => reservation.status === "cancelled" || reservation.status === "no_show");
  const criticalAlerts = alerts.filter((alert) => alert.severity === "critical");
  const sortedRevenueBySource = revenueBySource.sort((a, b) => b.revenue - a.revenue);
  const maxSourceRevenue = Math.max(1, ...sortedRevenueBySource.map((source) => source.revenue));
  const topRooms = bestRooms.slice(0, 4);
  const hotelRevenue = paidAmount;
  const totalRevenue = Math.max(1, sortedRevenueBySource.reduce((sum, item) => sum + item.revenue, 0));
  const teamActivity = [{
    label: t("Réception", "Reception"),
    value: t(`${activeReservations.length} dossiers actifs`, `${activeReservations.length} active bookings`)
  }, {
    label: t("Comptabilité", "Accounting"),
    value: t(`${unpaidInvoices.length} factures à suivre`, `${unpaidInvoices.length} invoices to follow up`)
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: t("Direction", "Management"), description: t("Vue exécutive pour piloter revenus, occupation, risques opérationnels et performance des canaux.", "Executive view of revenue, occupancy, operational risks and channel performance."), actions: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/statistics", className: adminButtonClasses("primary"), children: t("Analyse détaillée", "Detailed analysis") }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: t("Revenu hôtel", "Hotel revenue"), value: formatCurrency(hotelRevenue), detail: t("Paiements non remboursés", "Non-refunded payments"), icon: CreditCard }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: t("Occupation", "Occupancy"), value: `${occupancyRate}%`, detail: `${totalUnits - availableUnits}/${totalUnits} ${t("unités vendues", "units sold")}`, icon: Percent }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: t("Solde restant", "Outstanding balance"), value: formatCurrency(remainingAmount), detail: t(`${unpaidInvoices.length} facture(s) à suivre`, `${unpaidInvoices.length} invoice(s) to follow up`), icon: FileText }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: t("Alertes critiques", "Critical alerts"), value: String(criticalAlerts.length), detail: t(`${alerts.length} alertes opérationnelles`, `${alerts.length} operational alerts`), icon: TriangleAlert })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-primary", children: t("Synthèse exécutive", "Executive summary") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: t("Indicateurs consolidés depuis le mock store PMS.", "Indicators consolidated from the PMS data store.") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "size-5 text-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExecutiveTile, { label: t("Réservations actives", "Active bookings"), value: String(activeReservations.length), detail: t("en attente, confirmées, check-in", "pending, confirmed, checked in") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExecutiveTile, { label: t("Annulations / no-show", "Cancellations / no-show"), value: String(cancellations.length), detail: t("Sur l'échantillon actuel", "On the current data set") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExecutiveTile, { label: "RevPAR", value: formatCurrency(monthlyStats.revpar), detail: t("Revenu par unité disponible", "Revenue per available unit") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExecutiveTile, { label: t("Performance mensuelle", "Monthly performance"), value: formatCurrency(monthlyStats.revenue), detail: `ADR ${formatCurrency(monthlyStats.adr)}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExecutiveTile, { label: t("Unités disponibles", "Available units"), value: String(availableUnits), detail: t(`Sur ${totalUnits} unités hôtelières`, `Out of ${totalUnits} hotel units`) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-md border border-border bg-background p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-semibold text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "size-4 text-accent" }),
            t("Priorités de gestion", "Management priorities")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid gap-3 md:grid-cols-2", children: [{
            label: t("Relancer soldes", "Chase balances"),
            text: formatCurrency(remainingAmount)
          }, {
            label: t("Contrôler channels", "Check channels"),
            text: `${alerts.filter((alert) => alert.type === "channel_sync_error").length} ${t("anomalie(s)", "issue(s)")}`
          }, {
            label: t("Préserver inventaire", "Protect inventory"),
            text: `${alerts.filter((alert) => alert.type === "overbooking_risk").length} ${t("risque(s)", "risk(s)")}`
          }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-secondary p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-primary", children: item.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-lg font-bold", children: item.text })
          ] }, item.label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-md border border-border bg-background p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-primary", children: t("Synthèse équipes", "Team summary") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid gap-3 md:grid-cols-3", children: teamActivity.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-secondary p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-primary", children: item.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: item.value })
          ] }, item.label)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-primary", children: t("Risques à arbitrer", "Risks to decide on") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          alerts.slice(0, 6).map((alert) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-background p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: localizeAlertTitle(alert, locale) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: alert.severity === "critical" ? "text-sm font-bold text-red-700" : "text-sm font-bold text-amber-700", children: localizeAlertSeverity(alert.severity, locale) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-5 text-muted-foreground", children: localizeAlertDescription(alert, locale) })
          ] }, alert.id)),
          alerts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md border border-border bg-background p-4 text-sm text-muted-foreground", children: t("Aucun risque opérationnel dans le jeu de données actuel.", "No operational risks in the current data set.") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 grid gap-6 xl:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: t("Mix de revenus par canal", "Revenue mix by channel"), icon: ChartColumn, children: sortedRevenueBySource.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { label: channelLabels[item.source] ?? item.label, value: `${formatCurrency(item.revenue)} · ${Math.round(item.revenue / totalRevenue * 100)}%`, percent: item.revenue / maxSourceRevenue * 100 }, item.source)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: t("Performance chambres", "Room performance"), icon: Users, children: topRooms.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { label: localizeRoomName(item.room, locale), value: `${item.reservations} ${t("réservation(s)", "booking(s)")} · ${formatCurrency(item.revenue)}`, percent: item.reservations / Math.max(1, topRooms[0]?.reservations ?? 1) * 100 }, item.room.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 rounded-lg border border-border bg-card p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-primary", children: t("Commandes de direction", "Management actions") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: t("Boutons de démonstration : ils ne déclenchent aucun export réel, paiement, email ou synchronisation externe.", "Demo buttons: they trigger no real export, payment, email or external sync.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-3", children: [t("Export PDF (bientôt)", "PDF export (coming soon)"), t("Export Excel (bientôt)", "Excel export (coming soon)"), t("Rapport automatisé (bientôt)", "Automated report (coming soon)"), t("Contrôler factures", "Review invoices"), t("Revoir stratégie channels", "Review channel strategy")].map((action) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-primary hover:bg-secondary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4" }),
        action
      ] }, action)) })
    ] })
  ] });
}
function ExecutiveTile({
  label,
  value,
  detail
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-background p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-bold text-primary", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs text-muted-foreground", children: detail })
  ] });
}
function ChartCard({
  title,
  icon: Icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-primary", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5 text-accent" })
    ] }),
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
  AdminDirection as component
};
