import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useI18n, n as heroImg } from "./router-CgbkQim6.mjs";
import { S as SiteHeader } from "./site-header-DrEtGnYb.mjs";
import { b as boatActivities } from "./activities-Bb1FATdO.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { W as Waves, Y as Phone, a7 as CalendarCheck, q as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
function ActivitiesPage() {
  const {
    t,
    pick
  } = useI18n();
  const [featured, ...others] = boatActivities;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: t("Bateaux au port de Marina Cap Monastir", "Boats in Marina Cap Monastir"), className: "absolute inset-0 h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "luxury-hero-overlay absolute inset-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4 py-24 text-white md:px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker mb-4 text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Waves, { className: "size-3.5" }),
            t("Activités", "Activities")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "hero-title max-w-3xl", children: t("Excursions et sorties en bateau", "Excursions and boat trips") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-3xl text-base leading-8 text-white/78", children: t("Au départ de la marina, profitez de la Méditerranée autrement : croisières, pêche, sports nautiques, plongée ou sortie privée en voilier.", "Set off from the marina and enjoy the Mediterranean differently: cruises, fishing, water sports, diving or a private sailing trip.") })
        ] })
      ] }),
      featured && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 pt-16 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "premium-card grid overflow-hidden rounded-lg md:grid-cols-[22rem_1fr]", children: [
        featured.image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: featured.image, alt: pick(featured.title), className: "h-56 w-full object-cover md:h-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-kicker mb-3", children: t("À la une", "Featured") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: pick(featured.title) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base leading-8 text-muted-foreground", children: pick(featured.description) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-16 md:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Waves, { className: "size-3.5" }),
            t("Sorties en mer", "Out at sea")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: t("Toutes les sorties en bateau", "All boat trips") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: others.map((activity) => {
          const Icon = activity.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "premium-card premium-card-hover rounded-lg p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex size-12 items-center justify-center rounded-lg bg-secondary text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black text-primary", children: pick(activity.title) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-7 text-muted-foreground", children: pick(activity.description) })
          ] }, activity.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 pb-20 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 rounded-lg bg-gradient-to-br from-ocean to-primary p-8 text-white md:flex-row md:items-center md:justify-between md:p-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black md:text-3xl", children: t("Envie d'une sortie en mer ?", "Fancy a trip out to sea?") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-7 text-white/75", children: t("Contactez la réception pour connaître les horaires, les tarifs et les disponibilités des excursions.", "Contact reception for excursion times, prices and availability.") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-black text-accent-foreground transition hover:-translate-y-0.5 hover:bg-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4" }),
            t("Contacter", "Contact us")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/search", search: {
            adults: 2,
            children: 0,
            roomType: "Tous"
          }, className: "inline-flex h-11 items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/18", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-4" }),
            t("Réserver un appartement", "Book an apartment"),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  ActivitiesPage as component
};
