import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminActionBar } from "./AdminActionBar-0DOHgydV.mjs";
import { u as useI18n, aV as invoices, at as reservations, au as rooms, av as calculatePaidAmount, aw as calculateRemainingAmount, _ as AdminLayout, aW as hotelSettings, I as localizeRoomName } from "./router-CgbkQim6.mjs";
import { S as StatusBadge } from "./status-badge-Cw5SwgC6.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { a5 as Printer, Z as Mail, a6 as Download } from "../_libs/lucide-react.mjs";
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
const INVOICE_STATUS = {
  draft: {
    fr: "Brouillon",
    en: "Draft"
  },
  issued: {
    fr: "Émise",
    en: "Issued"
  },
  paid: {
    fr: "Payée",
    en: "Paid"
  },
  void: {
    fr: "Annulée",
    en: "Void"
  }
};
function AdminInvoices() {
  const {
    t,
    pick,
    locale,
    formatCurrency
  } = useI18n();
  const [selectedId, setSelectedId] = reactExports.useState(invoices[0]?.id ?? "");
  const [notif, setNotif] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!notif) return;
    const timer = window.setTimeout(() => setNotif(null), 3500);
    return () => clearTimeout(timer);
  }, [notif]);
  const selected = reactExports.useMemo(() => invoices.find((invoice) => invoice.id === selectedId) ?? invoices[0], [selectedId]);
  const reservation = reservations.find((item) => item.id === selected?.reservationId);
  const room = reservation ? rooms.find((item) => item.id === reservation.roomId) : void 0;
  const paidAmount = reservation ? calculatePaidAmount(reservation.id) : 0;
  const remainingAmount = reservation ? calculateRemainingAmount(reservation.id) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: t("Factures", "Invoices"), description: t("Générez une prévisualisation HTML imprimable pour chaque réservation.", "Generate a printable HTML preview for each booking."), actions: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminActionBar, { actions: [{
    label: t("Imprimer", "Print"),
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "size-4" }),
    variant: "primary",
    onClick: () => window.print()
  }, {
    label: t("Envoyer par email", "Send by email"),
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4" }),
    variant: "outline",
    onClick: () => setNotif(t("Envoi par email bientôt disponible.", "Email sending coming soon."))
  }, {
    label: "PDF",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4" }),
    variant: "outline",
    onClick: () => setNotif(t("Export PDF bientôt disponible.", "PDF export coming soon."))
  }] }), children: [
    notif && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "status", className: "mb-4 flex items-center gap-3 rounded-md border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: notif }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": t("Fermer", "Close"), onClick: () => setNotif(null), className: "rounded-sm text-primary/50 transition hover:text-primary", children: "✕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-[360px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-lg border border-border bg-card p-4 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-lg font-bold text-primary", children: t("Factures", "Invoices") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: invoices.map((invoice) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setSelectedId(invoice.id), className: `w-full rounded-md border px-3 py-3 text-left text-sm transition ${selected?.id === invoice.id ? "border-primary bg-secondary text-primary" : "border-border bg-background"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: invoice.invoiceNumber }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: INVOICE_STATUS[invoice.status] ? pick(INVOICE_STATUS[invoice.status]) : invoice.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: formatCurrency(invoice.amount) })
        ] }, invoice.id)) })
      ] }),
      selected && reservation && room && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "print-invoice rounded-lg border border-border bg-white p-8 text-foreground shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 border-b border-border pb-6 md:flex-row md:items-start md:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-primary", children: t("Facture", "Invoice") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: selected.invoiceNumber })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm md:text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-primary", children: hotelSettings.hotelName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-muted-foreground", children: hotelSettings.address }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-muted-foreground", children: hotelSettings.taxRegistration })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-6 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-primary", children: t("Client", "Guest") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm", children: reservation.guest.fullName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: reservation.guest.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: reservation.guest.identityNumber })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-primary", children: t("Réservation", "Booking") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm", children: reservation.reservationNumber }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              reservation.checkIn,
              " ",
              t("au", "to"),
              " ",
              reservation.checkOut
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { kind: "payment", value: reservation.paymentStatus }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "mt-8 w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-y border-border text-left text-xs uppercase tracking-[0.12em] text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3", children: t("Description", "Description") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 text-right", children: t("Montant", "Amount") })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-4", children: [
                localizeRoomName(room, locale),
                " · ",
                reservation.nights,
                " ",
                reservation.nights > 1 ? t("nuits", "nights") : t("nuit", "night")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4 text-right", children: formatCurrency(reservation.roomPrice) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4", children: t("Taxes et frais", "Taxes and fees") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4 text-right", children: formatCurrency(reservation.taxesAndFees) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4", children: t("Montant payé", "Amount paid") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4 text-right", children: formatCurrency(paidAmount) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4", children: t("Restant dû", "Balance due") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4 text-right", children: formatCurrency(remainingAmount) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-lg font-bold text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pt-5", children: t("Total", "Total") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pt-5 text-right", children: formatCurrency(reservation.total) })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminInvoices as component
};
