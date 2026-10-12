import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SiteHeader } from "./site-header-DrEtGnYb.mjs";
import { u as useI18n } from "./router-CgbkQim6.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { ad as Newspaper, C as CalendarDays } from "../_libs/lucide-react.mjs";
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
const news = [{
  title: {
    fr: "Nettoyage du fond du port",
    en: "Harbour seabed clean-up"
  },
  date: "2018-10-27",
  image: "/images/news/nettoyage-fond-port-2018.jpg"
}, {
  title: {
    fr: "Opération blanche de lutte contre l'incendie",
    en: "Fire-fighting drill"
  },
  date: "2018-11-30",
  image: "/images/news/operation-blanche-incendie-2018.jpg"
}, {
  title: {
    fr: "Nettoyage du fond du port",
    en: "Harbour seabed clean-up"
  },
  date: "2018-01-28",
  image: "/images/news/nettoyage-fond-port-2018-01.jpg"
}, {
  title: {
    fr: "Inauguration du « Yachting Club »",
    en: "Opening of the “Yachting Club”"
  },
  date: "2017-11-30",
  image: "/images/news/inauguration-yachting-club-2017.jpg"
}, {
  title: {
    fr: "Nettoyage du fond du port",
    en: "Harbour seabed clean-up"
  },
  date: "2017-11-26",
  image: "/images/news/nettoyage-fond-port-2017-11-26.jpg"
}, {
  title: {
    fr: "Nettoyage du fond du port",
    en: "Harbour seabed clean-up"
  },
  date: "2017-11-19",
  image: "/images/news/nettoyage-fond-port-2017-11-19.jpg"
}, {
  title: {
    fr: "Cours d'initiation à la guitare",
    en: "Beginner guitar lessons"
  },
  date: "2017-11-17",
  image: "/images/news/cours-guitare-2017.jpg"
}, {
  title: {
    fr: "Marina Monastir",
    en: "Marina Monastir"
  },
  date: "2017-11-16",
  image: "/images/news/marina-monastir-2017-11-16.jpg"
}, {
  title: {
    fr: "Marina Monastir",
    en: "Marina Monastir"
  },
  date: "2017-11-11",
  image: "/images/news/marina-monastir-2017-11-11.jpg"
}, {
  title: {
    fr: "Marina Cap Monastir",
    en: "Marina Cap Monastir"
  },
  date: "2017-05-12",
  image: "/images/news/marina-cap-monastir-2017-05.jpg"
}];
function ActualitesPage() {
  const {
    t,
    pick,
    formatDate
  } = useI18n();
  const formatNewsDate = (value) => formatDate(value, {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  const [featured, ...rest] = news;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl px-4 py-16 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "size-3.5" }),
          t("Actualités", "News")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title text-primary", children: t("Actualités Marina Cap Monastir", "Marina Cap Monastir news") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-3xl text-base leading-8 text-muted-foreground", children: t("Retrouvez les événements, opérations d'entretien du port et temps forts de la vie de la marina.", "Events, harbour maintenance operations and highlights of life at the marina.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "premium-card overflow-hidden rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-0 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: featured.image, alt: pick(featured.title), className: "h-64 w-full object-cover md:h-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center p-6 md:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex w-fit items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-3.5" }),
            formatNewsDate(featured.date)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-2xl font-black text-primary md:text-3xl", children: pick(featured.title) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: rest.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "premium-card premium-card-hover overflow-hidden rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: pick(item.title), className: "h-48 w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-3.5" }),
            formatNewsDate(item.date)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-lg font-black text-primary", children: pick(item.title) })
        ] })
      ] }, `${item.title.fr}-${item.date}`)) })
    ] })
  ] });
}
export {
  ActualitesPage as component
};
