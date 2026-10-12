import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a6 as Route$r, u as useI18n, n as heroImg } from "./router-CgbkQim6.mjs";
import { m as marinaHighlights, H as HighlightCard } from "./highlights-HiHIPXkS.mjs";
import { a as RoomCard } from "./room-card-DfUckwSd.mjs";
import { b as boatActivities } from "./activities-Bb1FATdO.mjs";
import { S as SiteHeader } from "./site-header-DrEtGnYb.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { t as MapPin, C as CalendarDays, A as Anchor, Y as Phone, ae as Sparkles, a1 as CircleCheck, W as Waves, N as Sailboat, af as Building2, q as ArrowRight, ag as Compass, v as ShoppingBag, O as Map, s as ShieldCheck, ah as Eye, ad as Newspaper, ai as Facebook, Z as Mail } from "../_libs/lucide-react.mjs";
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
const NEWS_PREVIEW = [{
  title: {
    fr: "Nettoyage du fond du port",
    en: "Harbour seabed clean-up"
  },
  date: "2018-10-27",
  image: "/images/news/nettoyage-fond-port-2018.jpg",
  slug: "nettoyage-du-fond-du-port-27-10-2018"
}, {
  title: {
    fr: "Opération blanche de lutte contre l'incendie",
    en: "Fire-fighting drill"
  },
  date: "2018-11-30",
  image: "/images/news/operation-blanche-incendie-2018.jpg",
  slug: "operation-blanche-de-lutte-contre-incendie-30-11-2018"
}, {
  title: {
    fr: "Inauguration du « Yachting Club »",
    en: "Opening of the “Yachting Club”"
  },
  date: "2017-11-30",
  image: "/images/news/inauguration-yachting-club-2017.jpg",
  slug: "inauguration-du-yachting-club-30-11-2017"
}];
function Home() {
  const {
    roomItems
  } = Route$r.useLoaderData();
  const {
    t,
    pick,
    formatDate
  } = useI18n();
  const featuredRooms = roomItems.slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-[calc(100vh-4.25rem)] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Marina Cap Monastir", className: "absolute inset-0 h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(100deg,rgba(3,20,34,0.94)_0%,rgba(0,59,92,0.78)_44%,rgba(0,59,92,0.22)_100%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto flex min-h-[calc(100vh-4.25rem)] max-w-7xl items-center px-4 py-20 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] shadow-lg backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4 text-accent" }),
          t("Monastir, Tunisie", "Monastir, Tunisia")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "hero-title", children: t("L'Excellence d'un Séjour & d'une Escale Unique à Monastir", "An Exceptional Stay & a Unique Stopover in Monastir") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-xl font-semibold text-accent md:text-2xl", children: t("Vivez La Marina — Appart-Hôtel d'Exception & Port de Plaisance sur la Méditerranée", "Live La Marina — An Exceptional Aparthotel & Yacht Harbour on the Mediterranean") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-2xl text-base leading-8 text-white/80 md:text-lg", children: t("Studios et appartements face au port de plaisance, réception à votre écoute, restaurants, commerces et activités marines : tout est réuni pour des vacances inoubliables à Monastir.", "Studios and apartments facing the marina, a friendly reception team, restaurants, shops and sea activities: everything you need for an unforgettable holiday in Monastir.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/search", search: {
            adults: 2,
            children: 0,
            roomType: "Tous"
          }, className: "inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-black text-accent-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-4" }),
            t("Réserver en ligne Appart-Hôtel", "Book the aparthotel online")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/port-de-plaisance/reservation", className: "inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-primary shadow-lg transition hover:-translate-y-0.5 hover:bg-secondary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { className: "size-4" }),
            t("Réserver en ligne Port de Plaisance", "Book a berth online")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 text-sm font-black text-white shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/18", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4" }),
            t("Contacter", "Contact us")
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "presentation", className: "mx-auto max-w-7xl px-4 py-20 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5" }),
            t("Présentation", "About")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: t("Une charmante escapade de Marina à Monastir", "A charming marina getaway in Monastir") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-8 text-muted-foreground", children: t("À l'horizon de la ville animée de Monastir, Marina Cap Monastir vous invite à découvrir un complexe touristique familial, idéal pour des vacances uniques au bord de la Méditerranée. Profitez d'un cadre marin, de restaurants, de commerces, d'activités et d'un confort pensé pour rendre votre séjour agréable.", "On the edge of lively Monastir, Marina Cap Monastir welcomes you to a family-friendly resort, ideal for a unique holiday by the Mediterranean. Enjoy the seaside setting, restaurants, shops, activities and comfort designed to make your stay a pleasure.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: marinaHighlights.map((highlight) => /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightCard, { highlight }, highlight.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-ocean py-16 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-4 md:px-6", children: [{
      value: "+2000",
      label: t("Clients de confiance", "Happy guests"),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-5" })
    }, {
      value: "+60",
      label: t("Activités", "Activities"),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Waves, { className: "size-5" })
    }, {
      value: "+200",
      label: t("Bateaux sur le port", "Boats in the marina"),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sailboat, { className: "size-5" })
    }, {
      value: "+120",
      label: t("Chambres", "Rooms"),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "size-5" })
    }].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-white/12 bg-white/[0.07] p-5 shadow-lg backdrop-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 text-accent", children: stat.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-black text-white", children: stat.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm font-semibold text-white/65", children: stat.label })
    ] }, stat.label)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-3.5" }),
            t("Réservation", "Booking")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: t("Comment réserver votre appartement", "How to book your apartment") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/search", search: {
          adults: 2,
          children: 0,
          roomType: "Tous"
        }, className: "inline-flex h-11 w-fit items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-ocean", children: [
          t("Réservez maintenant", "Book now"),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-3", children: [{
        step: "01",
        title: t("Réservation en ligne", "Book online"),
        text: t("Cliquez sur le bouton de réservation en ligne et choisissez vos dates, votre chambre ou appartement, puis confirmez votre demande.", "Click the online booking button, choose your dates and your room or apartment, then confirm your request.")
      }, {
        step: "02",
        title: t("Réservation sur place", "Book on site"),
        text: t("Vous pouvez réserver directement auprès de l'administration ou contacter la réception pour plus d'informations.", "You can book directly with the administration or contact reception for more information.")
      }, {
        step: "03",
        title: "Marina Cap Monastir",
        text: t("Parcourez le site pour découvrir les appartements, les services, les activités et les options disponibles avant de réserver.", "Browse the website to discover the apartments, services, activities and options available before booking.")
      }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "premium-card premium-card-hover rounded-lg p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 text-4xl font-black text-accent", children: item.step }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black text-primary", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-7 text-muted-foreground", children: item.text })
      ] }, item.step)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "chambres", className: "bg-secondary/50 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "size-3.5" }),
            t("Appart-Hôtel", "Aparthotel")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: t("Studios et appartements", "Studios and apartments") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-base text-muted-foreground", children: t("Studios et appartements au cœur de la marina, à réserver directement en ligne.", "Studios and apartments in the heart of the marina, bookable directly online.") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/search", search: {
          adults: 2,
          children: 0,
          roomType: "Tous"
        }, className: "inline-flex h-11 w-fit items-center gap-2 rounded-lg border border-primary/20 bg-card px-5 text-sm font-bold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10", children: [
          t("Voir tous les hébergements", "See all accommodation"),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: featuredRooms.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsx(RoomCard, { room }, room.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker mx-auto mb-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Waves, { className: "size-3.5" }),
          t("Activités", "Activities")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mx-auto", children: t("Découvrez Marina Cap Monastir", "Discover Marina Cap Monastir") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/activites", className: "premium-card premium-card-hover group flex flex-col overflow-hidden rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DiscoverMedia, { image: "/images/home/feature-barbaros.png", alt: t("Le navire Barbaros", "The Barbaros ship"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sailboat, { className: "size-8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black text-primary", children: t("Excursions en bateau", "Boat trips") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm leading-7 text-muted-foreground", children: [
              boatActivities.map((activity) => pick(activity.title)).join(", "),
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-black text-accent", children: [
              t("Voir toutes les sorties", "See all boat trips"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4 transition-transform group-hover:translate-x-1" })
            ] })
          ] })
        ] }),
        [{
          title: t("Vues distinctives", "Outstanding views"),
          text: t("Chambres et appartements avec vues agréables sur le port et l'environnement marin.", "Rooms and apartments with lovely views over the marina and the sea."),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "size-8" }),
          image: "/images/rooms/appartement-economique-s1.jpg",
          alt: t("Terrasse avec vue sur le port", "Terrace overlooking the marina")
        }, {
          title: t("Divers commerces", "Shops of every kind"),
          text: t("Restaurants, cafés, marchés et commerces au caractère moderne et traditionnel.", "Restaurants, cafés, markets and shops, both modern and traditional."),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-8" }),
          image: void 0,
          alt: ""
        }].map((activity) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "premium-card premium-card-hover group flex flex-col overflow-hidden rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DiscoverMedia, { image: activity.image, alt: activity.alt, icon: activity.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black text-primary", children: activity.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-7 text-muted-foreground", children: activity.text })
          ] })
        ] }, activity.title))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "port", className: "bg-gradient-to-b from-ocean to-primary py-20 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { className: "size-3.5" }),
          t("Port de plaisance", "Marina")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title text-white", children: t("Port d'escale, de passage et d'hivernage", "A port of call, transit and wintering") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base leading-8 text-white/72", children: t("Le port de plaisance de Marina Cap Monastir accueille plaisanciers, clubs nautiques et séjours au long cours dans un cadre surveillé et certifié.", "The Marina Cap Monastir harbour welcomes yachtsmen, sailing clubs and long stays in a supervised, certified setting.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/port-de-plaisance", className: "inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-bold text-primary transition hover:-translate-y-0.5 hover:bg-secondary", children: [
            t("Découvrir le port", "Discover the marina"),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/port-de-plaisance/plan", className: "inline-flex h-11 items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/15", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "size-4" }),
            t("Plan du port", "Marina map")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: [t("300 anneaux", "300 berths"), t("Surveillance 24h/24", "24/7 security"), t("Certification ISO 14001 V 2015", "ISO 14001:2015 certified"), t("Capitainerie", "Harbour office")].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-white/12 bg-white/[0.07] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mb-3 size-5 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black", children: item })
      ] }, item)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/50 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-[1fr_1fr] lg:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: [{
        title: t("Belles vues", "Beautiful views"),
        subtitle: t("Beaucoup de souvenirs", "Lasting memories"),
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-5" })
      }, {
        title: t("Plus de chambres", "More rooms"),
        subtitle: t("Plus de confort", "More comfort"),
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "size-5" })
      }, {
        title: t("Activités marines", "Sea activities"),
        subtitle: t("Profitez davantage", "Enjoy even more"),
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Waves, { className: "size-5" })
      }, {
        title: t("Voyages", "Trips"),
        subtitle: t("Bateau, Yacht...", "Boat, yacht..."),
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sailboat, { className: "size-5" })
      }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-card rounded-lg p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex size-11 items-center justify-center rounded-lg bg-secondary text-accent", children: item.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-black text-primary", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs font-semibold text-muted-foreground", children: item.subtitle })
      ] }, item.title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3.5" }),
          t("Notre engagement", "Our commitment")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: t("Marina Cap Monastir s'engage à offrir le meilleur service à tous ses clients", "Marina Cap Monastir is committed to giving every guest the best service") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-xl text-base leading-8 text-muted-foreground", children: t("Nous développons des programmes qui donnent énergie et confort pour passer une bonne journée et garder un beau souvenir pour chaque visiteur. Profitez des plus belles activités avec nous.", "We create programmes that bring energy and comfort, so every visitor enjoys a great day and leaves with fond memories. Enjoy the best activities with us.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "mt-7 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-ocean", children: [
          t("Contacter", "Contact us"),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "size-3.5" }),
            t("Actualités", "News")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: t("Explorez nos Actualités", "Explore our news") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/actualites", className: "inline-flex h-11 w-fit items-center gap-2 rounded-lg border border-primary/20 bg-card px-5 text-sm font-bold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10", children: [
          t("En savoir plus", "Learn more"),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-3", children: NEWS_PREVIEW.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/actualites", className: "premium-card premium-card-hover block overflow-hidden rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: pick(item.title), className: "h-48 w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-3.5" }),
            formatDate(item.date, {
              day: "2-digit",
              month: "long",
              year: "numeric"
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-lg font-black text-primary", children: pick(item.title) })
        ] })
      ] }, item.slug)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border bg-secondary/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 py-12 md:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { className: "size-5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black text-primary", children: "Marina Cap Monastir" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-6 text-muted-foreground", children: t("Appart-hôtel, port de plaisance et hospitalité méditerranéenne à Monastir, Tunisie.", "Aparthotel, marina and Mediterranean hospitality in Monastir, Tunisia.") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: t("BP.N°60 - 5000 Monastir - Tunisie", "PO Box 60 - 5000 Monastir - Tunisia") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://www.facebook.com/CAPmarinamonastir11", target: "_blank", rel: "noreferrer", className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "size-4 text-accent" }),
            "Facebook"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-3 text-xs font-black uppercase tracking-[0.14em] text-primary", children: "Navigation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm font-semibold text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-primary", children: t("Accueil", "Home") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/search", search: {
              adults: 2,
              children: 0,
              roomType: "Tous"
            }, className: "hover:text-primary", children: t("Appart-Hôtel", "Aparthotel") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/port-de-plaisance", className: "hover:text-primary", children: t("Port de Plaisance", "Marina") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/search", search: {
              adults: 2,
              children: 0,
              roomType: "Tous"
            }, className: "hover:text-primary", children: t("Réservation Appart-Hôtel", "Aparthotel booking") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/port-de-plaisance/reservation", className: "hover:text-primary", children: t("Réservation Port de Plaisance", "Berth booking") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/port-de-plaisance/plan", className: "hover:text-primary", children: t("Plan du Port", "Marina map") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/activites", className: "hover:text-primary", children: t("Activités", "Activities") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/presentation", className: "hover:text-primary", children: t("Présentation", "About") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-primary", children: t("Contacter", "Contact us") }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-3 text-xs font-black uppercase tracking-[0.14em] text-primary", children: t("Appart-Hôtel", "Aparthotel") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm font-semibold text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+21673462305", className: "flex items-center gap-2 hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-3.5 shrink-0 text-accent" }),
              "(+216) 73 46 23 05"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "pl-5 text-xs text-muted-foreground/70", children: "Fax : (+216) 73 46 49 97" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:reservation@marinamonastir.tn", className: "flex items-center gap-2 hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-3.5 shrink-0 text-accent" }),
              "reservation@marinamonastir.tn"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:marketing@marinamonastir.tn", className: "flex items-center gap-2 hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-3.5 shrink-0 text-accent" }),
              "marketing@marinamonastir.tn"
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-3 text-xs font-black uppercase tracking-[0.14em] text-primary", children: t("Capitainerie", "Harbour office") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm font-semibold text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+21673462305", className: "flex items-center gap-2 hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-3.5 shrink-0 text-accent" }),
              "(+216) 73 46 23 05"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+21673462066", className: "flex items-center gap-2 hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-3.5 shrink-0 text-accent" }),
              "(+216) 73 46 20 66"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:capitainerie@marinamonastir.tn", className: "flex items-center gap-2 hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-3.5 shrink-0 text-accent" }),
              "capitainerie@marinamonastir.tn"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-lg border border-border bg-white p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold leading-5 text-muted-foreground", children: t("Recevez les actualités, offres et informations de Marina Cap Monastir.", "Get Marina Cap Monastir news, offers and updates.") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:reservation@marinamonastir.tn?subject=Newsletter", className: "mt-2 inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-bold text-white transition hover:bg-ocean", children: t("S'abonner", "Subscribe") })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border py-5 text-xs text-muted-foreground", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Marina Cap Monastir ·",
        " ",
        t("Tous droits réservés", "All rights reserved")
      ] })
    ] }) })
  ] });
}
function DiscoverMedia({
  image,
  alt,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[16/9] overflow-hidden bg-secondary", children: image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt, loading: "lazy", className: "h-full w-full object-cover transition duration-700 group-hover:scale-105" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ocean via-primary to-turquoise", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marina-pattern absolute inset-0 opacity-40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex size-16 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg", children: icon })
  ] }) });
}
export {
  Home as component
};
