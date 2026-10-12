import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteHeader } from "./site-header-DrEtGnYb.mjs";
import { af as Route$n, u as useI18n } from "./router-CgbkQim6.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { A as Anchor, an as ArrowLeft, ap as Info, Y as Phone, Z as Mail } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
function formatPrice(value, currency) {
  if (value === null || value === void 0) return "-";
  return `${value} ${currency}`;
}
function TarifsPortPage() {
  const {
    tariffs
  } = Route$n.useLoaderData();
  const {
    t
  } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-gradient-to-br from-ocean via-primary to-[#0a3f5c] py-14 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(214,168,79,0.22),transparent_65%)]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-5xl px-4 md:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { className: "size-3.5 text-accent" }),
          t("Port de Plaisance", "Marina")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: t("Tarifs du Port", "Marina rates") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-base leading-7 text-white/75", children: t("Tarifs d'accostage 2025 en dinar tunisien (TND).", "2025 berthing rates in Tunisian dinars (TND).") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl px-4 py-12 md:px-6 space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/port-de-plaisance", className: "inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
        t("Retour au port", "Back to the marina")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "mt-0.5 size-4 shrink-0 text-amber-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Tarifs 2025, hors taxes et sujets à modification. Contactez la capitainerie pour confirmation et devis personnalisé.", "2025 rates, excluding tax and subject to change. Contact the harbour office for confirmation and a personalised quote.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-premium)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { className: "size-3.5" }),
            t("Tarifs d'accostage", "Berthing rates")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-primary", children: t("Tarifs par catégorie de bateau", "Rates by boat category") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t("Prix hors taxes (H.T), en dinar tunisien (TND).", "Prices excluding tax, in Tunisian dinars (TND).") }),
          tariffs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-xl border border-dashed border-primary/20 bg-secondary/40 p-6 text-center text-sm text-muted-foreground", children: t("Les tarifs détaillés sont à confirmer auprès de la Capitainerie.", "Detailed rates are available from the harbour office.") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[640px] text-left text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-secondary/60 text-xs font-black uppercase tracking-[0.12em] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Longueur du bateau", "Boat length") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Journalier", "Daily") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Mensuel", "Monthly") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Annuel", "Yearly") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Hivernage", "Wintering") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Note", "Note") })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: tariffs.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border transition hover:bg-secondary/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold", children: row.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-sm", children: formatPrice(row.dailyPrice, row.currency) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-sm", children: formatPrice(row.monthlyPrice, row.currency) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-sm", children: formatPrice(row.yearlyPrice, row.currency) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-sm", children: formatPrice(row.winteringPrice, row.currency) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: row.note ?? "-" })
            ] }, row.id)) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-1.5 text-xs leading-6 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black uppercase tracking-[0.1em] text-primary", children: t("Observations", "Notes") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("Le tarif affiché est hors taxes (H.T).", "Rates shown exclude tax.") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("Prix eau/électricité forfaitaire pour l'accostage annuel.", "Flat-rate water/electricity for yearly berthing.") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("Accostage < 4 h = ½ tarif d'accostage.", "Berthing under 4 h = half the berthing rate.") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("Bateau multicoque : +80 %.", "Multihull: +80%.") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("Bateau professionnel : 75 dt/m²/an.", "Commercial boat: 75 TND/m²/year.") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 rounded-lg bg-secondary/40 px-4 py-3 text-xs font-semibold leading-6 text-primary", children: t("Prix en TTC = ((Prix HT + 7 % TVA) + (Eau/Élec + 19 % TVA)) + (FDSCT 1 %) + Timbre (1 dinar).", "Price incl. tax = ((Price excl. tax + 7% VAT) + (Water/Electricity + 19% VAT)) + (FDSCT 1%) + Stamp duty (1 dinar).") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-primary/20 bg-primary/5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-primary", children: t("Réserver une place", "Book a berth") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t("Pour confirmer votre escale ou votre hivernage, contactez la capitainerie ou utilisez notre formulaire de réservation en ligne.", "To confirm your stopover or wintering, contact the harbour office or use our online booking form.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/port-de-plaisance/reservation", className: "inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-ocean", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { className: "size-4" }),
            t("Réserver en ligne", "Book online")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+21673462305", className: "inline-flex h-10 items-center gap-2 rounded-lg border border-primary/25 px-5 text-sm font-bold text-primary transition hover:border-primary/50 hover:bg-primary/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4" }),
            "(+216) 73 46 23 05"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:capitainerie@marinamonastir.tn", className: "inline-flex h-10 items-center gap-2 rounded-lg border border-border px-5 text-sm font-semibold text-muted-foreground transition hover:border-primary/25 hover:text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4" }),
            "capitainerie@marinamonastir.tn"
          ] })
        ] })
      ] }) })
    ] }),
    false
  ] });
}
export {
  TarifsPortPage as component
};
