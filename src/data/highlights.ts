import {
  Compass,
  ConciergeBell,
  Sailboat,
  ShoppingBag,
  Utensils,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { Localized } from "@/lib/i18n/locale";

export type Highlight = {
  id: string;
  icon: LucideIcon;
  title: Localized;
  /** Real Marina Cap Monastir photo; without one the card shows an illustrated panel. */
  image?: string;
  imageAlt?: Localized;
};

// The marina's strong points, shown on the homepage and the Présentation page.
// Add `image` to a card as soon as a real photo is available (restaurants, shops).
export const marinaHighlights: Highlight[] = [
  {
    id: "paysages",
    icon: Compass,
    title: { fr: "Des beaux paysages", en: "Beautiful scenery" },
    image: "/images/news/monastir-marina-cap-2017-05-07.jpg",
    imageAlt: { fr: "Voiliers à la marina de Monastir", en: "Sailboats at the Monastir marina" },
  },
  {
    id: "restaurants",
    icon: Utensils,
    title: { fr: "Divers restaurants", en: "A choice of restaurants" },
  },
  {
    id: "activites",
    icon: Waves,
    title: { fr: "Activités marines", en: "Sea activities" },
    image: "/images/home/feature-barbaros.png",
    imageAlt: { fr: "Le navire Barbaros", en: "The Barbaros ship" },
  },
  {
    id: "confort",
    icon: ConciergeBell,
    title: { fr: "Un confort sans fin", en: "Comfort at every turn" },
    image: "/images/rooms/appartement-s2.jpg",
    imageAlt: { fr: "Séjour d'un appartement", en: "Apartment living room" },
  },
  {
    id: "commerces",
    icon: ShoppingBag,
    title: { fr: "Commerces et services", en: "Shops and services" },
  },
  {
    id: "port",
    icon: Sailboat,
    title: { fr: "Port de plaisance", en: "Marina" },
    image: "/images/news/marina-monastir-2017-11-11.jpg",
    imageAlt: { fr: "Catamaran à quai à la marina", en: "Catamaran docked at the marina" },
  },
];
