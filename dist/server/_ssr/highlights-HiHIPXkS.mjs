import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useI18n } from "./router-CgbkQim6.mjs";
import { ag as Compass, w as Utensils, W as Waves, a4 as ConciergeBell, v as ShoppingBag, N as Sailboat } from "../_libs/lucide-react.mjs";
function HighlightCard({
  highlight,
  headingLevel = "h3"
}) {
  const { pick } = useI18n();
  const Heading = headingLevel;
  const Icon = highlight.icon;
  const title = pick(highlight.title);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "premium-card premium-card-hover group overflow-hidden rounded-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[16/9] overflow-hidden bg-secondary", children: highlight.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: highlight.image,
        alt: highlight.imageAlt ? pick(highlight.imageAlt) : title,
        loading: "lazy",
        className: "h-full w-full object-cover transition duration-700 group-hover:scale-105"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ocean via-primary to-turquoise", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marina-pattern absolute inset-0 opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex size-16 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-8" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { className: "text-lg font-black text-primary", children: title })
    ] })
  ] });
}
const marinaHighlights = [
  {
    id: "paysages",
    icon: Compass,
    title: { fr: "Des beaux paysages", en: "Beautiful scenery" },
    image: "/images/news/monastir-marina-cap-2017-05-07.jpg",
    imageAlt: { fr: "Voiliers à la marina de Monastir", en: "Sailboats at the Monastir marina" }
  },
  {
    id: "restaurants",
    icon: Utensils,
    title: { fr: "Divers restaurants", en: "A choice of restaurants" }
  },
  {
    id: "activites",
    icon: Waves,
    title: { fr: "Activités marines", en: "Sea activities" },
    image: "/images/home/feature-barbaros.png",
    imageAlt: { fr: "Le navire Barbaros", en: "The Barbaros ship" }
  },
  {
    id: "confort",
    icon: ConciergeBell,
    title: { fr: "Un confort sans fin", en: "Comfort at every turn" },
    image: "/images/rooms/appartement-s2.jpg",
    imageAlt: { fr: "Séjour d'un appartement", en: "Apartment living room" }
  },
  {
    id: "commerces",
    icon: ShoppingBag,
    title: { fr: "Commerces et services", en: "Shops and services" }
  },
  {
    id: "port",
    icon: Sailboat,
    title: { fr: "Port de plaisance", en: "Marina" },
    image: "/images/news/marina-monastir-2017-11-11.jpg",
    imageAlt: { fr: "Catamaran à quai à la marina", en: "Catamaran docked at the marina" }
  }
];
export {
  HighlightCard as H,
  marinaHighlights as m
};
