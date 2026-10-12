import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useI18n, aQ as payments, at as reservations, aw as calculateRemainingAmount, _ as AdminLayout, $ as KpiCard, au as rooms, av as calculatePaidAmount, I as localizeRoomName, K as getPaymentStatusLabels, aR as getPaymentMethodLabels, a5 as getChannelLabels, aA as setPaymentStatus } from "./router-CgbkQim6.mjs";
import { S as StatusBadge } from "./status-badge-Cw5SwgC6.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { a as CreditCard, aJ as Banknote, R as RotateCcw } from "../_libs/lucide-react.mjs";
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
const methods = ["all", "cash", "card", "bank_transfer", "online", "booking_com_payout", "airbnb_payout", "expedia_payout"];
function AdminPayments() {
  const {
    t,
    locale,
    formatCurrency
  } = useI18n();
  const paymentStatusLabels = getPaymentStatusLabels(locale);
  const channelLabels = getChannelLabels(locale);
  const methodLabels = getPaymentMethodLabels(locale);
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [methodFilter, setMethodFilter] = reactExports.useState("all");
  const [sourceFilter, setSourceFilter] = reactExports.useState("all");
  const [dateFilter, setDateFilter] = reactExports.useState("");
  const [version, setVersion] = reactExports.useState(0);
  const rows = payments.filter((payment) => {
    const reservation = reservations.find((item) => item.id === payment.reservationId);
    if (statusFilter !== "all" && payment.status !== statusFilter) return false;
    if (methodFilter !== "all" && payment.method !== methodFilter) return false;
    if (sourceFilter !== "all" && reservation?.source !== sourceFilter) return false;
    if (dateFilter && payment.updatedAt !== dateFilter) return false;
    return true;
  });
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const remaining = reservations.reduce((sum, reservation) => sum + calculateRemainingAmount(reservation.id), 0);
  const unpaidCount = reservations.filter((reservation) => reservation.paymentStatus === "unpaid").length;
  const changeStatus = (reservationId, status) => {
    void setPaymentStatus(reservationId, status).then(() => setVersion((value) => value + 1));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: t("Paiements", "Payments"), description: t("Suivi des statuts et montants sans stockage de carte ni CVC.", "Status and amount tracking, no card or CVC storage."), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-6 grid gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: t("Montant encaissé", "Amount collected"), value: formatCurrency(totalPaid), detail: t("Tous paiements mockés", "All mock payments"), icon: CreditCard }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: t("Restant dû", "Balance due"), value: formatCurrency(remaining), detail: t("Solde client", "Guest balance"), icon: Banknote }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: t("Non payés", "Unpaid"), value: String(unpaidCount), detail: t("À relancer", "To follow up"), icon: RotateCcw })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 border-b border-border p-4 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: statusFilter, onChange: (event) => setStatusFilter(event.target.value), className: "admin-input", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: t("Tous les statuts", "All statuses") }),
          Object.entries(paymentStatusLabels).map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value, children: label }, value))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: methodFilter, onChange: (event) => setMethodFilter(event.target.value), className: "admin-input", children: methods.map((method) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: method, children: method === "all" ? t("Toutes méthodes", "All methods") : methodLabels[method] }, method)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sourceFilter, onChange: (event) => setSourceFilter(event.target.value), className: "admin-input", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: t("Toutes sources", "All sources") }),
          Object.entries(channelLabels).map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value, children: label }, value))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: dateFilter, onChange: (event) => setDateFilter(event.target.value), className: "admin-input" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[1100px] text-left text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary text-xs uppercase tracking-[0.12em] text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Réservation", "Booking") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Client", "Guest") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Chambre", "Room") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Source", "Source") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Payé", "Paid") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Restant", "Remaining") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Statut", "Status") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Méthode", "Method") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Date", "Date") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Actions", "Actions") })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((payment) => {
          const reservation = reservations.find((item) => item.id === payment.reservationId);
          const room = reservation ? rooms.find((item) => item.id === reservation.roomId) : void 0;
          const paid = reservation ? calculatePaidAmount(reservation.id) : payment.amount;
          const due = reservation ? calculateRemainingAmount(reservation.id) : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-primary", children: reservation?.reservationNumber }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: reservation?.guest.fullName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: room ? localizeRoomName(room, locale) : "" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: reservation && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { kind: "source", value: reservation.source }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold", children: formatCurrency(paid) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: formatCurrency(due) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { kind: "payment", value: payment.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: methodLabels[payment.method] ?? payment.method }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: payment.updatedAt }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => reservation && changeStatus(reservation.id, "deposit_paid"), className: "admin-action", children: t("Ajouter acompte", "Add deposit") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => reservation && changeStatus(reservation.id, "paid"), className: "admin-action", children: t("Marquer payé", "Mark as paid") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => reservation && changeStatus(reservation.id, "refunded"), className: "admin-action", children: t("Rembourser", "Refund") })
            ] }) })
          ] }, `${payment.id}-${version}`);
        }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "border-t border-border p-4 text-xs leading-5 text-muted-foreground", children: t("Les méthodes de paiement sont des statuts de suivi seulement. Aucun numéro de carte ni CVC n'est stocké.", "Payment methods are tracking statuses only. No card number or CVC is stored.") })
    ] })
  ] });
}
export {
  AdminPayments as component
};
