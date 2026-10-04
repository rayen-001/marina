import type { Room } from "@/data/hotel";
import type { Locale } from "./locale";

// Room content is stored in French (Supabase room_types / room_amenities).
// English versions of the official room types, keyed by slug. A room that is not
// listed here (e.g. created later in the admin) simply keeps its French text.
const ROOM_EN: Record<string, { name: string; description: string; beds?: string }> = {
  studio: {
    name: "Studio",
    description:
      "A functional studio for two in the heart of Marina Cap Monastir, with a terrace, kitchenette and all the essentials for a stay by the Mediterranean.",
    beds: "1 double bed or 2 single beds",
  },
  "appartement-economique-s1": {
    name: "Economy One-Bedroom Apartment (S+1)",
    description:
      "A simple, practical one-bedroom apartment for four, ideal for enjoying the marina, with kitchenette, air conditioning and a harbour-side entrance or view.",
    beds: "2 single beds + 1 sofa bed",
  },
  "appartement-standard-s1": {
    name: "Standard One-Bedroom Apartment (S+1)",
    description:
      "A comfortable one-bedroom apartment with a terrace and harbour view, designed for family stays or trips with friends at Marina Cap Monastir.",
    beds: "1 double bed or 2 single beds + 1 sofa bed",
  },
  "appartement-s2": {
    name: "Two-Bedroom Apartment (S+2)",
    description:
      "A spacious apartment for six with two sleeping areas, kitchenette and terrace, perfect for families who want to stay right on the marina.",
    beds: "2 single beds + 1 double bed + 1 sofa bed",
  },
};

// Fixed ids of the official room types (same as data/hotel.ts and the Supabase seed).
const SLUG_BY_ID: Record<string, string> = {
  "ae47c5a0-5915-4e45-a355-bcda4a85bb5a": "studio",
  "be47c5a0-5915-4e45-a355-bcda4a85bb5b": "appartement-economique-s1",
  "ce47c5a0-5915-4e45-a355-bcda4a85bb5c": "appartement-standard-s1",
  "de47c5a0-5915-4e45-a355-bcda4a85bb5d": "appartement-s2",
};

function englishRoom(room: Pick<Room, "slug" | "id">) {
  return ROOM_EN[room.slug ?? ""] ?? ROOM_EN[SLUG_BY_ID[room.id] ?? ""];
}

const ROOM_TYPE_EN: Record<Room["type"], string> = {
  Studio: "Studio",
  Appartement: "Apartment",
  Suite: "Suite",
  Chambre: "Room",
};

const AMENITY_EN: Record<string, string> = {
  Terrasse: "Terrace",
  "Télévision à écran plat": "Flat-screen TV",
  Climatisation: "Air conditioning",
  Baignoire: "Bathtub",
  Kitchenette: "Kitchenette",
  "Wi-Fi gratuit": "Free Wi-Fi",
  "Entrée port / Vue port": "Harbour entrance / Harbour view",
  "Vue port": "Harbour view",
};

const BEDS_EN: Record<string, string> = {
  "1 lit double ou 2 lits simples": "1 double bed or 2 single beds",
  "2 lits simples + 1 canapé-lit": "2 single beds + 1 sofa bed",
  "1 lit double ou 2 lits simples + 1 canapé-lit": "1 double bed or 2 single beds + 1 sofa bed",
  "2 lits simples + 1 lit double + 1 canapé-lit": "2 single beds + 1 double bed + 1 sofa bed",
};

export type LocalizedRoomText = {
  name: string;
  type: string;
  description: string;
  beds: string;
  amenities: string[];
};

/** Display texts of a room in the requested language (the Room object itself is never changed). */
export function localizeRoom(room: Room, locale: Locale): LocalizedRoomText {
  if (locale === "fr") {
    return {
      name: room.name,
      type: room.type,
      description: room.description,
      beds: room.beds,
      amenities: room.amenities,
    };
  }

  const en = englishRoom(room);
  return {
    name: en?.name ?? room.name,
    type: ROOM_TYPE_EN[room.type] ?? room.type,
    description: en?.description ?? room.description,
    beds: BEDS_EN[room.beds] ?? en?.beds ?? room.beds,
    amenities: room.amenities.map((amenity) => AMENITY_EN[amenity] ?? amenity),
  };
}

export function localizeRoomName(room: Pick<Room, "name" | "slug" | "id">, locale: Locale) {
  if (locale === "fr") return room.name;
  return englishRoom(room)?.name ?? room.name;
}
