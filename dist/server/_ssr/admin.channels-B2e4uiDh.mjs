import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { aY as Route$1, u as useI18n, _ as AdminLayout, aZ as translateDemoText, I as localizeRoomName, a_ as localizeLogLevel, a5 as getChannelLabels } from "./router-CgbkQim6.mjs";
import { S as StatusBadge } from "./status-badge-Cw5SwgC6.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { ac as RefreshCw, aL as ExternalLink, ab as TriangleAlert, a1 as CircleCheck } from "../_libs/lucide-react.mjs";
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
function AdminChannels() {
  const {
    connections,
    mappings,
    roomOptions,
    logs,
    usingMockLogs
  } = Route$1.useLoaderData();
  const {
    t,
    locale
  } = useI18n();
  const labels = getChannelLabels(locale);
  const syncStatusLabel = (status) => ({
    synced: t("Synchronisé", "Synced"),
    warning: t("Avertissement", "Warning"),
    error: t("Erreur", "Error"),
    not_mapped: t("Non relié", "Not mapped")
  })[status] ?? status;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: t("Channel manager", "Channel manager"), description: t("Prototype professionnel pour Booking.com, Airbnb et Expedia. Aucun appel API réel n'est effectué.", "Professional prototype for Booking.com, Airbnb and Expedia. No real API calls are made."), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: connections.filter((channel) => ["booking_com", "airbnb", "expedia"].includes(channel.id)).map((channel) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-lg border border-border bg-card p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-primary", children: channel.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
            t("Commission", "Commission"),
            " : ",
            channel.commissionRate ?? 0,
            "% ·",
            " ",
            t("Sync", "Sync"),
            " : ",
            channel.lastSync ?? t("jamais", "never")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { kind: "channel", value: channel.status })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-3 gap-2 text-center text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: t("Importées", "Imported"), value: channel.importedReservationsCount ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: t("Dispos", "Availability"), value: channel.pushedAvailabilityCount ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: t("Prix", "Prices"), value: channel.pushedPricesCount ?? 0 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-4" }),
          t("Synchroniser", "Sync now")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "size-4" }),
          t("Configurer", "Configure")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
        (channel.errors ?? []).map((error) => /* @__PURE__ */ jsxRuntimeExports.jsx(Notice, { tone: "error", text: translateDemoText(error, locale) }, error)),
        (channel.warnings ?? []).map((warning) => /* @__PURE__ */ jsxRuntimeExports.jsx(Notice, { tone: "warning", text: translateDemoText(warning, locale) }, warning))
      ] })
    ] }, channel.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 rounded-lg border border-border bg-card shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-primary", children: t("Mapping chambres / listings", "Room / listing mapping") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: t("Chaque type local peut être relié à un identifiant externe par canal.", "Each local room type can be linked to an external ID per channel.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[900px] text-left text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary text-xs uppercase tracking-[0.12em] text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Type local", "Local type") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Channel", "Channel") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Listing ID", "Listing ID") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Statut sync", "Sync status") })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: mappings.map((mapping) => {
          const room = roomOptions.find((item) => item.id === mapping.roomTypeId);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-primary", children: room ? localizeRoomName(room, locale) : "" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: labels[mapping.channel] ?? mapping.channel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: mapping.externalListingId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-md px-2.5 py-1 text-xs font-semibold ${mapping.syncStatus === "synced" ? "bg-emerald-50 text-emerald-800" : mapping.syncStatus === "warning" ? "bg-amber-50 text-amber-800" : "bg-secondary text-muted-foreground"}`, children: syncStatusLabel(mapping.syncStatus) }) })
          ] }, mapping.id);
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 rounded-lg border border-border bg-card p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-primary", children: usingMockLogs ? t("Logs adaptateurs mock", "Mock adapter logs") : t("Logs synchronisation", "Sync logs") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: logs.map((log, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-background p-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: log.channel }),
        " ·",
        " ",
        localizeLogLevel(log.level, locale),
        " : ",
        translateDemoText(log.message, locale)
      ] }, index)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs leading-5 text-muted-foreground", children: t("Une synchronisation réelle exige identifiants officiels, accès partenaire, OAuth/API keys, webhooks, limites de débit, retry logic, Booking.com Connectivity API, Airbnb official/partner API et Expedia Rapid / Partner Central API.", "Real synchronisation requires official credentials, partner access, OAuth/API keys, webhooks, rate limits, retry logic, the Booking.com Connectivity API, the Airbnb official/partner API and Expedia Rapid / Partner Central API.") })
    ] })
  ] });
}
function Metric({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-secondary p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-primary", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-muted-foreground", children: label })
  ] });
}
function Notice({
  tone,
  text
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-start gap-2 rounded-md p-3 text-xs font-medium ${tone === "error" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-800"}`, children: [
    tone === "error" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 size-4" }),
    text
  ] });
}
export {
  AdminChannels as component
};
