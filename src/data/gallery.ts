import type { Localized } from "./activities";

export type GalleryCategory = "port" | "hebergement" | "commerces" | "evenements";

export const galleryCategories: Array<{ id: GalleryCategory; label: Localized }> = [
  { id: "port", label: { fr: "Port", en: "Marina" } },
  { id: "hebergement", label: { fr: "Hébergement", en: "Accommodation" } },
  { id: "commerces", label: { fr: "Commerces", en: "Shops" } },
  { id: "evenements", label: { fr: "Événements", en: "Events" } },
];

export type GalleryPhoto = {
  src: string;
  category: GalleryCategory;
  alt: Localized;
};

// Only real Marina Cap Monastir photos, filed by what they actually show.
// To add a photo: drop the file in /public/images and add one line here.
export const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/images/home/hero-marina.jpg",
    category: "port",
    alt: { fr: "Vue sur le port de plaisance", en: "View over the marina" },
  },
  {
    src: "/images/news/monastir-marina-cap-2017-05-07.jpg",
    category: "port",
    alt: { fr: "Voiliers amarrés à la marina", en: "Sailboats moored in the marina" },
  },
  {
    src: "/images/news/marina-monastir-2017-11-11.jpg",
    category: "port",
    alt: { fr: "Catamaran à quai devant la marina", en: "Catamaran docked by the marina" },
  },
  {
    src: "/images/news/marina-monastir-2017-11-16.jpg",
    category: "port",
    alt: { fr: "Voiliers au ponton", en: "Sailboats at the pontoon" },
  },
  {
    src: "/images/news/cours-guitare-2017.jpg",
    category: "port",
    alt: {
      fr: "Voiliers face aux résidences de la marina",
      en: "Sailboats facing the marina residences",
    },
  },
  {
    src: "/images/news/marina-cap-monastir-2017-05.jpg",
    category: "port",
    alt: { fr: "Bateau de plaisance au port", en: "Pleasure boat in the harbour" },
  },
  {
    src: "/images/home/feature-barbaros.png",
    category: "port",
    alt: { fr: "Le navire Barbaros à quai", en: "The Barbaros ship at the quay" },
  },
  {
    src: "/images/rooms/appartement-economique-s1.jpg",
    category: "hebergement",
    alt: { fr: "Terrasse avec vue sur le port", en: "Terrace overlooking the marina" },
  },
  {
    src: "/images/rooms/appartement-standard-s1.jpg",
    category: "hebergement",
    alt: { fr: "Salon d'un appartement S+1", en: "Living room of a one-bedroom apartment" },
  },
  {
    src: "/images/rooms/appartement-s2.jpg",
    category: "hebergement",
    alt: { fr: "Séjour de l'appartement S+2", en: "Living area of the two-bedroom apartment" },
  },
  {
    src: "/images/rooms/studio.jpg",
    category: "hebergement",
    alt: { fr: "Chambre du studio", en: "Studio bedroom" },
  },
  {
    src: "/images/home/feature-commerces.png",
    category: "hebergement",
    alt: { fr: "Coin salon avec accès terrasse", en: "Lounge with terrace access" },
  },
  {
    src: "/images/home/feature-vues.png",
    category: "hebergement",
    alt: { fr: "Appartement en duplex", en: "Duplex apartment" },
  },
  {
    src: "/images/news/inauguration-yachting-club-2017.jpg",
    category: "evenements",
    alt: { fr: "Inauguration du Yachting Club", en: "Yachting Club opening" },
  },
  {
    src: "/images/news/nettoyage-fond-port-2017-11-19.jpg",
    category: "evenements",
    alt: { fr: "Opération de nettoyage du fond du port", en: "Harbour seabed clean-up" },
  },
  {
    src: "/images/news/nettoyage-fond-port-2018-01.jpg",
    category: "evenements",
    alt: { fr: "Plongeur lors du nettoyage du port", en: "Diver during the harbour clean-up" },
  },
  {
    src: "/images/news/nettoyage-fond-port-2017-11-26.jpg",
    category: "evenements",
    alt: { fr: "Plongée de nettoyage du bassin", en: "Clean-up dive in the basin" },
  },
  {
    src: "/images/news/marina-cap-monastir-2017-05-08.jpg",
    category: "evenements",
    alt: {
      fr: "Campagne de sensibilisation à l'environnement",
      en: "Environmental awareness campaign",
    },
  },
];
