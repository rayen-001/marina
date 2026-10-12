import { Fish, Sailboat, Shell, Ship, Sunset, Waves, type LucideIcon } from "lucide-react";
import type { Localized } from "@/lib/i18n/locale";

export type BoatActivity = {
  id: string;
  icon: LucideIcon;
  title: Localized;
  description: Localized;
  image?: string;
};

// Proposed list of boat outings — to be validated / completed by Marina Cap Monastir.
// Adding an outing = adding one entry here (the page and the homepage read this list).
export const boatActivities: BoatActivity[] = [
  {
    id: "barbaros",
    icon: Ship,
    image: "/images/home/feature-barbaros.png",
    title: { fr: "Navire Barbaros", en: "Barbaros ship" },
    description: {
      fr: "Le célèbre bateau pirate de Monastir : une journée en mer avec repas à bord, animations et spectacles pour toute la famille.",
      en: "Monastir's famous pirate ship: a day at sea with lunch on board, entertainment and shows for the whole family.",
    },
  },
  {
    id: "catamaran",
    icon: Sailboat,
    title: { fr: "Excursion en catamaran", en: "Catamaran cruise" },
    description: {
      fr: "Balade en mer le long de la côte de Monastir, avec arrêts baignade dans des eaux turquoise.",
      en: "A cruise along the Monastir coastline, with swimming stops in turquoise waters.",
    },
  },
  {
    id: "peche",
    icon: Fish,
    title: { fr: "Sortie pêche en mer", en: "Sea fishing trip" },
    description: {
      fr: "Partez avec des pêcheurs expérimentés pour une sortie de pêche traditionnelle au large.",
      en: "Head offshore with experienced fishermen for a traditional fishing trip.",
    },
  },
  {
    id: "coucher-de-soleil",
    icon: Sunset,
    title: { fr: "Balade au coucher du soleil", en: "Sunset cruise" },
    description: {
      fr: "Une sortie en fin de journée pour admirer le coucher du soleil sur la Méditerranée.",
      en: "An evening outing to watch the sun set over the Mediterranean.",
    },
  },
  {
    id: "sports-nautiques",
    icon: Waves,
    title: { fr: "Jet-ski & sports nautiques", en: "Jet ski & water sports" },
    description: {
      fr: "Jet-ski, ski nautique, bouée tractée ou parachute ascensionnel : des sensations fortes en mer.",
      en: "Jet ski, water skiing, towed rides or parasailing: thrills on the water.",
    },
  },
  {
    id: "plongee",
    icon: Shell,
    title: { fr: "Plongée sous-marine", en: "Scuba diving" },
    description: {
      fr: "Baptêmes et plongées encadrées pour découvrir les fonds marins de la région.",
      en: "Introductory and guided dives to discover the local seabed.",
    },
  },
  {
    id: "location-yacht",
    icon: Sailboat,
    title: { fr: "Location de yacht / voilier", en: "Yacht / sailboat charter" },
    description: {
      fr: "Louez un yacht ou un voilier, avec ou sans skipper, pour une sortie privée en famille ou entre amis.",
      en: "Charter a yacht or sailboat, with or without a skipper, for a private outing with family or friends.",
    },
  },
];
