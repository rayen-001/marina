import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useI18n, n as heroImg, D as Dialog, k as DialogContent, m as DialogTitle, c as cn } from "./router-CgbkQim6.mjs";
import { m as marinaHighlights, H as HighlightCard } from "./highlights-HiHIPXkS.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { S as SiteHeader } from "./site-header-DrEtGnYb.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { q as ArrowRight, I as Images, A as Anchor, r as Wrench, s as ShieldCheck, W as Waves, t as MapPin, u as Award, v as ShoppingBag, w as Utensils, x as Coffee, y as Store, z as ImageOff, E as Expand, D as ChevronLeft, J as ChevronRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const galleryCategories = [
  { id: "port", label: { fr: "Port", en: "Marina" } },
  { id: "hebergement", label: { fr: "Hébergement", en: "Accommodation" } },
  { id: "commerces", label: { fr: "Commerces", en: "Shops" } },
  { id: "evenements", label: { fr: "Événements", en: "Events" } }
];
const galleryComingSoon = {
  commerces: {
    title: {
      fr: "Boutiques, Restaurants & Commerces de La Marina — Visuels bientôt disponibles",
      en: "Shops, Restaurants & Businesses of La Marina — Photos coming soon"
    },
    cards: [
      { id: "boutiques", icon: ShoppingBag, label: { fr: "Boutiques", en: "Boutiques" } },
      { id: "restaurants", icon: Utensils, label: { fr: "Restaurants", en: "Restaurants" } },
      {
        id: "cafes",
        icon: Coffee,
        label: { fr: "Cafés & glaciers", en: "Cafés & ice-cream parlours" }
      },
      {
        id: "services",
        icon: Store,
        label: { fr: "Services de proximité", en: "Local services" }
      }
    ]
  }
};
const galleryPhotos = [
  {
    src: "/images/home/hero-marina.jpg",
    category: "port",
    alt: { fr: "Vue sur le port de plaisance", en: "View over the marina" }
  },
  {
    src: "/images/news/monastir-marina-cap-2017-05-07.jpg",
    category: "port",
    alt: { fr: "Voiliers amarrés à la marina", en: "Sailboats moored in the marina" }
  },
  {
    src: "/images/news/marina-monastir-2017-11-11.jpg",
    category: "port",
    alt: { fr: "Catamaran à quai devant la marina", en: "Catamaran docked by the marina" }
  },
  {
    src: "/images/news/marina-monastir-2017-11-16.jpg",
    category: "port",
    alt: { fr: "Voiliers au ponton", en: "Sailboats at the pontoon" }
  },
  {
    src: "/images/news/cours-guitare-2017.jpg",
    category: "port",
    alt: {
      fr: "Voiliers face aux résidences de la marina",
      en: "Sailboats facing the marina residences"
    }
  },
  {
    src: "/images/news/marina-cap-monastir-2017-05.jpg",
    category: "port",
    alt: { fr: "Bateau de plaisance au port", en: "Pleasure boat in the harbour" }
  },
  {
    src: "/images/home/feature-barbaros.png",
    category: "port",
    alt: { fr: "Le navire Barbaros à quai", en: "The Barbaros ship at the quay" }
  },
  {
    src: "/images/rooms/appartement-economique-s1.jpg",
    category: "hebergement",
    alt: { fr: "Terrasse avec vue sur le port", en: "Terrace overlooking the marina" }
  },
  {
    src: "/images/rooms/appartement-standard-s1.jpg",
    category: "hebergement",
    alt: { fr: "Salon d'un appartement S+1", en: "Living room of a one-bedroom apartment" }
  },
  {
    src: "/images/rooms/appartement-s2.jpg",
    category: "hebergement",
    alt: { fr: "Séjour de l'appartement S+2", en: "Living area of the two-bedroom apartment" }
  },
  {
    src: "/images/rooms/studio.jpg",
    category: "hebergement",
    alt: { fr: "Chambre du studio", en: "Studio bedroom" }
  },
  {
    src: "/images/home/feature-commerces.png",
    category: "hebergement",
    alt: { fr: "Coin salon avec accès terrasse", en: "Lounge with terrace access" }
  },
  {
    src: "/images/home/feature-vues.png",
    category: "hebergement",
    alt: { fr: "Appartement en duplex", en: "Duplex apartment" }
  },
  {
    src: "/images/news/inauguration-yachting-club-2017.jpg",
    category: "evenements",
    alt: { fr: "Inauguration du Yachting Club", en: "Yachting Club opening" }
  },
  {
    src: "/images/news/nettoyage-fond-port-2017-11-19.jpg",
    category: "evenements",
    alt: { fr: "Opération de nettoyage du fond du port", en: "Harbour seabed clean-up" }
  },
  {
    src: "/images/news/nettoyage-fond-port-2018-01.jpg",
    category: "evenements",
    alt: { fr: "Plongeur lors du nettoyage du port", en: "Diver during the harbour clean-up" }
  },
  {
    src: "/images/news/nettoyage-fond-port-2017-11-26.jpg",
    category: "evenements",
    alt: { fr: "Plongée de nettoyage du bassin", en: "Clean-up dive in the basin" }
  },
  {
    src: "/images/news/marina-cap-monastir-2017-05-08.jpg",
    category: "evenements",
    alt: {
      fr: "Campagne de sensibilisation à l'environnement",
      en: "Environmental awareness campaign"
    }
  }
];
function PhotoGallery() {
  const { t, pick } = useI18n();
  const [open, setOpen] = reactExports.useState(null);
  const photosOf = (category) => galleryPhotos.filter((photo) => photo.category === category);
  const openPhotos = open ? photosOf(open.category) : [];
  const current = open ? openPhotos[open.index] : void 0;
  const step = (delta) => setOpen((state) => {
    if (!state) return state;
    const count = photosOf(state.category).length;
    return { ...state, index: (state.index + delta + count) % count };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: galleryCategories[0].id, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "mx-auto flex h-auto w-fit max-w-full flex-wrap justify-center gap-1 rounded-lg border border-border bg-white p-1.5 shadow-sm", children: galleryCategories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TabsTrigger,
        {
          value: category.id,
          className: "h-10 gap-2 px-4 text-sm font-bold text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:px-5",
          children: [
            pick(category.label),
            photosOf(category.id).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-black/[0.06] px-1.5 text-[11px] font-black tabular-nums", children: photosOf(category.id).length })
          ]
        },
        category.id
      )) }),
      galleryCategories.map((category) => {
        const photos = photosOf(category.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: category.id, className: "mt-8", children: photos.length === 0 && galleryComingSoon[category.id] ? /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoonGrid, { content: galleryComingSoon[category.id] }) : photos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-card mx-auto flex max-w-xl flex-col items-center rounded-lg px-6 py-12 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex size-12 items-center justify-center rounded-lg bg-secondary text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "size-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black text-primary", children: t("Photos bientôt disponibles", "Photos coming soon") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-7 text-muted-foreground", children: t(
            `La galerie ${category.label.fr.toLowerCase()} de Marina Cap Monastir sera enrichie prochainement.`,
            `New ${category.label.en.toLowerCase()} photos of Marina Cap Monastir will be added soon.`
          ) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4", children: photos.map((photo, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          GalleryTile,
          {
            photo,
            onOpen: () => setOpen({ category: category.id, index })
          },
          photo.src
        )) }) }, category.id);
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: Boolean(current), onOpenChange: (value) => !value && setOpen(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContent,
      {
        "aria-describedby": void 0,
        onKeyDown: (event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        },
        className: "max-w-5xl gap-3 border-none bg-ocean/95 p-3 text-white sm:p-4",
        children: current && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: current.src,
                alt: pick(current.alt),
                className: "max-h-[75vh] w-auto max-w-full rounded-md object-contain"
              }
            ),
            openPhotos.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LightboxArrow, { side: "left", onClick: () => step(-1) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(LightboxArrow, { side: "right", onClick: () => step(1) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 px-1 pr-8 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-sm font-semibold leading-6 text-white", children: pick(current.alt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 tabular-nums text-white/60", children: [
              (open?.index ?? 0) + 1,
              " / ",
              openPhotos.length
            ] })
          ] })
        ] })
      }
    ) })
  ] });
}
function ComingSoonGrid({ content }) {
  const { t, pick } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mb-6 max-w-3xl text-center text-base font-black leading-7 text-primary", children: pick(content.title) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 md:grid-cols-4", children: content.cards.map((card) => {
      const Icon = card.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-ocean via-primary to-turquoise p-4 text-center text-white shadow-[var(--shadow-soft)]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marina-pattern absolute inset-0 opacity-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex size-14 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-7" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-3 text-sm font-black md:text-base", children: pick(card.label) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative mt-2 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] backdrop-blur", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "size-3" }),
              t("Visuels bientôt disponibles", "Photos coming soon")
            ] })
          ]
        },
        card.id
      );
    }) })
  ] });
}
function GalleryTile({ photo, onOpen }) {
  const { t, pick } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: onOpen,
      className: "group relative aspect-[4/3] overflow-hidden rounded-lg bg-secondary shadow-[var(--shadow-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "aria-label": `${t("Agrandir", "Enlarge")} : ${pick(photo.alt)}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: photo.src,
            alt: pick(photo.alt),
            loading: "lazy",
            className: "h-full w-full object-cover transition duration-500 group-hover:scale-105"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 flex items-end bg-gradient-to-t from-ocean/80 via-ocean/0 to-transparent p-3 text-left opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex w-full items-end justify-between gap-2 text-xs font-semibold text-white", children: [
          pick(photo.alt),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Expand, { className: "size-4 shrink-0" })
        ] }) })
      ]
    }
  );
}
function LightboxArrow({ side, onClick }) {
  const { t } = useI18n();
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      "aria-label": side === "left" ? t("Photo précédente", "Previous photo") : t("Photo suivante", "Next photo"),
      className: `absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition hover:bg-white ${side === "left" ? "left-2" : "right-2"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5" })
    }
  );
}
const ISO_IMAGE = "/images/port/certification-iso14001.png";
const PAVILLON_IMAGE = "/images/port/label-pavillon-bleu.jpg";
function PresentationPage() {
  const {
    t
  } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Marina Cap Monastir", className: "absolute inset-0 h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "luxury-hero-overlay absolute inset-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4 py-24 text-white md:px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-kicker mb-4 text-accent", children: t("Présentation", "About") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "hero-title max-w-3xl", children: t("Une charmante escapade de Marina à Monastir", "A charming marina getaway in Monastir") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-3xl text-base leading-8 text-white/78", children: t("À l'horizon de la ville animée de Monastir, Marina Cap Monastir vous invite à découvrir un complexe touristique familial, idéal pour des vacances uniques au bord de la Méditerranée.", "On the edge of lively Monastir, Marina Cap Monastir welcomes you to a family-friendly resort, ideal for a unique holiday by the Mediterranean.") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-16 md:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: marinaHighlights.map((highlight) => /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightCard, { highlight, headingLevel: "h2" }, highlight.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/search", search: {
          adults: 2,
          children: 0,
          roomType: "Tous"
        }, className: "mt-10 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-ocean", children: [
          t("Réserver en ligne", "Book online"),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/50 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker mx-auto mb-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Images, { className: "size-3.5" }),
            t("Galerie", "Gallery")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mx-auto", children: t("La Marina en images", "The Marina in pictures") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground", children: t("Paysages, hébergements, commerces et temps forts de Marina Cap Monastir.", "Scenery, accommodation, shops and highlights of Marina Cap Monastir.") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoGallery, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { className: "size-3.5" }),
            t("Port de Plaisance", "Marina")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: t("Port d'escale, de passage et d'hivernage", "A port of call, transit and wintering") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-card rounded-lg p-6 md:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-8 text-muted-foreground", children: t("Port d'escale, de passage, d'hivernage et de régates, le port de plaisance a fait de la Marina et de la ville le point d'appui des clubs nautiques les plus réputés d'Europe et un lieu de rencontre international convivial et privilégié.", "A port of call, transit, wintering and regattas, the marina has made the Marina and the town a base for Europe's best-known sailing clubs and a friendly, exclusive international meeting place.") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base leading-8 text-muted-foreground", children: t("Le port est doté de 300 anneaux, proposant à ses plaisanciers toutes les commodités nécessaires et donnant à leur sécurité une importance capitale puisqu'il est surveillé 24h/24 par des agents de sécurité et par des caméras de surveillance.", "The harbour has 300 berths and offers boaters every facility they need. Safety is a top priority: the marina is guarded 24/7 by security staff and CCTV cameras.") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base font-semibold leading-8 text-primary", children: t("La Marina de Monastir est le premier port de plaisance en Afrique à avoir obtenu la certification ISO 14001 V 2015, contribuant à un système de management environnemental.", "Marina de Monastir is the first marina in Africa to be awarded ISO 14001:2015 certification for its environmental management system.") })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-16 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "premium-card rounded-lg p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex size-11 items-center justify-center rounded-lg bg-secondary text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "size-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black text-primary", children: t("Équipements et services à quai", "Quayside facilities and services") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm leading-6 text-muted-foreground", children: [t("Service d'accueil 24/24", "24/7 welcome service"), t("Eau et électricité sur bornes de quais 220/380/550 volts", "Water and electricity at quay terminals (220/380/550 V)"), t("Bloc sanitaire, douche", "Toilets and showers"), t("Wifi, caméras de surveillance", "Wi-Fi, CCTV cameras"), t("Police et douanes 7j/7j", "Police and customs 7 days a week"), t("Tapisserie et réparation de voiles", "Upholstery and sail repair"), t("Station gasoil", "Diesel station"), t("Laverie", "Laundry"), t("Amicale des plaisanciers", "Boaters' association")].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mt-0.5 size-4 shrink-0 text-accent" }),
            item
          ] }, item)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "premium-card rounded-lg p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex size-11 items-center justify-center rounded-lg bg-secondary text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Waves, { className: "size-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black text-primary", children: t("Plan d'eau du port", "Harbour basin") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm leading-6 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("Capacité totale : 300 anneaux", "Total capacity: 300 berths") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("Longueur bateau maxi : 45 m", "Maximum boat length: 45 m") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("Jetée extérieure : 7 m", "Outer jetty: 7 m") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("Rade : 6 m – 15 m", "Roadstead: 6 m – 15 m") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("Chenal : 6 m", "Channel: 6 m") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-6 text-lg font-black text-primary", children: t("Prestations techniques", "Technical services") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm leading-6 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("Aires de carénage", "Careening areas") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("Travel-lift 30 tonnes, grue 1,5 tonnes", "30-tonne travel lift, 1.5-tonne crane") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("Mécanicien, électricien, frigoriste, menuiserie", "Mechanic, electrician, refrigeration technician, carpentry") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("Remplissage de bouteilles camping gaz", "Camping gas bottle refills") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("Travel-lift jusqu'à 250 tonnes au port de pêche, à 1 mile", "Travel lift up to 250 tonnes at the fishing port, 1 mile away") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "premium-card rounded-lg p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex size-11 items-center justify-center rounded-lg bg-secondary text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black text-primary", children: t("Localisation du port", "Marina location") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-6 text-muted-foreground", children: t("Le port se situe au centre-ville de Monastir et à 6 km seulement de l'aéroport international Habib Bourguiba.", "The marina is in the centre of Monastir, just 6 km from Habib Bourguiba International Airport.") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm leading-6 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("Latitude Nord : 35°46' 7''", "Latitude North: 35°46' 7''") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("Longitude Est : 10°50' 1''", "Longitude East: 10°50' 1''") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("80 M Nq de Pantelleria", "80 NM from Pantelleria") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("180 M Nq de Malte", "180 NM from Malta") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("226 M Nq de Palerme", "226 NM from Palermo") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t("570 M Nq de Nice", "570 NM from Nice") })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 pb-16 md:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker mx-auto mb-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "size-3.5" }),
            t("Certifications", "Certifications")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mx-auto", children: t("Des standards reconnus", "Recognised standards") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-card flex flex-col items-center rounded-lg p-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-base font-black text-primary", children: t("La Certification ISO 14001 V 2015", "ISO 14001:2015 certification") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: ISO_IMAGE, alt: t("Certification ISO 14001 V 2015", "ISO 14001:2015 certification"), className: "h-24 object-contain" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-card flex flex-col items-center rounded-lg p-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-base font-black text-primary", children: t("Le Label Pavillon Bleu", "Blue Flag label") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: PAVILLON_IMAGE, alt: t("Label Pavillon Bleu", "Blue Flag label"), className: "h-24 object-contain" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  PresentationPage as component
};
