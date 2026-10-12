import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState, e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { S as notFound, T as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { g as getCookie } from "./server-4up-b2hM.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { R as Root, P as Portal, C as Content, a as Close, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { H as House, B as BedDouble, T as Table2, M as MessageCircle, U as Users, C as CalendarDays, a as CreditCard, F as FileText, S as Settings, P as Plug, b as TrendingUp, c as Crown, A as Anchor, G as Globe, d as Menu, e as Hotel, f as Search, g as Bell, h as UserRound, i as ChevronDown, L as LogOut, X, j as LoaderCircle, k as CalendarPlus, l as Languages, m as Save } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/radix-ui__react-compose-refs.mjs";
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
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-CqcSRqoq.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const logoUrl = "/assets/marina-logo-D-ZM3_eE.png";
const heroImg = "/assets/hero-marina-DVZLo2ag.jpg";
const ROOM_IMAGES = {
  studio: "/images/rooms/studio.jpg",
  economique: "/images/rooms/appartement-economique-s1.jpg",
  standard: "/images/rooms/appartement-standard-s1.jpg",
  s2: "/images/rooms/appartement-s2.jpg"
};
const hotelSettings = {
  hotelName: "Marina Cap Monastir",
  logoUrl,
  heroUrl: heroImg,
  phone: "(+216) 73 46 23 05",
  fax: "(+216) 73 46 49 97",
  email: "reservation@marinamonastir.tn",
  marketingEmail: "marketing@marinamonastir.tn",
  capitainerieEmail: "capitainerie@marinamonastir.tn",
  capitaineriePhones: ["(+216) 73 46 23 05", "(+216) 73 46 20 66"],
  address: "BP.N°60 - 5000 Monastir - Tunisie",
  taxRegistration: "MF 0000000/A/M/000",
  invoicePrefix: "MCM",
  defaultCurrency: "TND",
  checkInTime: "14:00",
  checkOutTime: "11:00",
  taxRate: 0.12,
  depositPercentage: 0.3
};
const defaultRooms = [
  {
    id: "ae47c5a0-5915-4e45-a355-bcda4a85bb5a",
    slug: "studio",
    name: "Studio",
    type: "Studio",
    description: "Studio fonctionnel pour deux personnes au coeur de Marina Cap Monastir, avec terrasse, kitchenette et confort essentiel pour un séjour en bord de Méditerranée.",
    pricePerNight: 85,
    capacityAdults: 2,
    capacityChildren: 0,
    bathrooms: 1,
    totalUnits: 10,
    amenities: [
      "Terrasse",
      "Télévision à écran plat",
      "Climatisation",
      "Baignoire",
      "Kitchenette",
      "Wi-Fi gratuit"
    ],
    images: [ROOM_IMAGES.studio, ROOM_IMAGES.economique, ROOM_IMAGES.standard],
    status: "active",
    bookings: []
  },
  {
    id: "be47c5a0-5915-4e45-a355-bcda4a85bb5b",
    slug: "appartement-economique-s1",
    name: "Appartement Économique S+1",
    type: "Appartement",
    description: "Appartement S+1 simple et pratique pour quatre personnes, idéal pour profiter du port avec kitchenette, climatisation et vue ou entrée côté port.",
    pricePerNight: 95,
    capacityAdults: 4,
    capacityChildren: 0,
    beds: "2 lits simples + 1 canapé-lit",
    bathrooms: 1,
    totalUnits: 5,
    amenities: [
      "Télévision à écran plat",
      "Climatisation",
      "Entrée port / Vue port",
      "Kitchenette",
      "Wi-Fi gratuit"
    ],
    images: [ROOM_IMAGES.economique, ROOM_IMAGES.studio, ROOM_IMAGES.s2],
    status: "active",
    bookings: []
  },
  {
    id: "ce47c5a0-5915-4e45-a355-bcda4a85bb5c",
    slug: "appartement-standard-s1",
    name: "Appartement Standard S+1",
    type: "Appartement",
    description: "Appartement S+1 confortable avec terrasse et vue sur le port, pensé pour les séjours en famille ou entre amis à Marina Cap Monastir.",
    pricePerNight: 110,
    capacityAdults: 4,
    capacityChildren: 0,
    beds: "1 lit double ou 2 lits simples + 1 canapé-lit",
    bathrooms: 1,
    totalUnits: 5,
    amenities: [
      "Télévision à écran plat",
      "Climatisation",
      "Vue port",
      "Kitchenette",
      "Wi-Fi gratuit",
      "Terrasse"
    ],
    images: [ROOM_IMAGES.standard, ROOM_IMAGES.studio, ROOM_IMAGES.economique],
    status: "active",
    bookings: []
  },
  {
    id: "de47c5a0-5915-4e45-a355-bcda4a85bb5d",
    slug: "appartement-s2",
    name: "Appartement S+2",
    type: "Appartement",
    description: "Appartement spacieux pour six personnes avec deux espaces nuit, kitchenette et terrasse, adapté aux familles qui souhaitent séjourner directement sur la marina.",
    pricePerNight: 140,
    capacityAdults: 6,
    capacityChildren: 0,
    beds: "2 lits simples + 1 lit double + 1 canapé-lit",
    bathrooms: 1,
    totalUnits: 5,
    amenities: [
      "Télévision à écran plat",
      "Climatisation",
      "Kitchenette",
      "Wi-Fi gratuit",
      "Terrasse"
    ],
    images: [ROOM_IMAGES.s2, ROOM_IMAGES.standard, ROOM_IMAGES.economique],
    status: "active",
    bookings: []
  }
];
const rooms = getDefaultRooms();
function getDefaultRooms() {
  return defaultRooms.map(cloneRoom);
}
const today = /* @__PURE__ */ new Date();
const offset = (days) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};
const makeGuest = (id, fullName, email, phone, country, identityNumber) => ({ id, fullName, email, phone, country, identityNumber });
const reservations = [
  {
    id: "res-001",
    reservationNumber: "MCM-2026-001",
    roomId: "appartement-economique-s1",
    guest: makeGuest(
      "guest-001",
      "Sophie Martin",
      "sophie.martin@example.com",
      "+33 6 10 20 30 40",
      "France",
      "FR123456"
    ),
    checkIn: offset(6),
    checkOut: offset(12),
    adults: 2,
    children: 0,
    status: "confirmed",
    paymentStatus: "deposit_paid",
    source: "booking_com",
    specialRequests: "Arrivée prévue vers 18h.",
    createdAt: offset(-14),
    ...buildReservationTotals("appartement-economique-s1", offset(6), offset(12))
  },
  {
    id: "res-002",
    reservationNumber: "MCM-2026-002",
    roomId: "appartement-standard-s1",
    guest: makeGuest(
      "guest-002",
      "Karim Ben Ali",
      "karim.benali@example.com",
      "+216 22 111 222",
      "Tunisie",
      "TN987654"
    ),
    checkIn: offset(1),
    checkOut: offset(6),
    adults: 2,
    children: 2,
    status: "pending",
    paymentStatus: "unpaid",
    source: "direct",
    createdAt: offset(-4),
    ...buildReservationTotals("appartement-standard-s1", offset(1), offset(6))
  },
  {
    id: "res-003",
    reservationNumber: "MCM-2026-003",
    roomId: "appartement-s2",
    guest: makeGuest(
      "guest-003",
      "Giulia Rossi",
      "giulia.rossi@example.com",
      "+39 320 555 0180",
      "Italie",
      "IT445566"
    ),
    checkIn: offset(-1),
    checkOut: offset(2),
    adults: 4,
    children: 1,
    status: "checked_in",
    paymentStatus: "paid",
    source: "expedia",
    createdAt: offset(-20),
    ...buildReservationTotals("appartement-s2", offset(-1), offset(2))
  },
  {
    id: "res-004",
    reservationNumber: "MCM-2026-004",
    roomId: "appartement-economique-s1",
    guest: makeGuest(
      "guest-004",
      "Nadia Trabelsi",
      "nadia.trabelsi@example.com",
      "+216 98 222 333",
      "Tunisie",
      "TN223344"
    ),
    checkIn: offset(6),
    checkOut: offset(12),
    adults: 3,
    children: 0,
    status: "confirmed",
    paymentStatus: "deposit_paid",
    source: "phone",
    specialRequests: "Prévoir une arrivée tardive.",
    createdAt: offset(-2),
    ...buildReservationTotals("appartement-economique-s1", offset(7), offset(12))
  },
  {
    id: "res-005",
    reservationNumber: "MCM-2026-005",
    roomId: "studio",
    guest: makeGuest(
      "guest-005",
      "Marc Dubois",
      "marc.dubois@example.com",
      "+33 7 44 55 66 77",
      "France",
      "FR889900"
    ),
    checkIn: offset(-10),
    checkOut: offset(-9),
    adults: 1,
    children: 0,
    status: "confirmed",
    paymentStatus: "paid",
    source: "walk_in",
    createdAt: offset(0),
    ...buildReservationTotals("studio", offset(0), offset(1))
  }
];
const payments = reservations.map((reservation) => ({
  id: `pay-${reservation.id}`,
  reservationId: reservation.id,
  amount: reservation.paymentStatus === "paid" ? reservation.total : reservation.paymentStatus === "deposit_paid" ? reservation.deposit : 0,
  status: reservation.paymentStatus,
  method: reservation.source === "walk_in" ? "cash" : reservation.source === "direct" || reservation.source === "phone" ? "bank_transfer" : reservation.source === "booking_com" ? "booking_com_payout" : reservation.source === "airbnb" ? "airbnb_payout" : "expedia_payout",
  updatedAt: reservation.createdAt
}));
const invoices = reservations.map((reservation, index) => ({
  id: `inv-${reservation.id}`,
  reservationId: reservation.id,
  invoiceNumber: generateInvoiceNumber(index + 1),
  issuedAt: reservation.createdAt,
  status: reservation.paymentStatus === "paid" ? "paid" : "issued",
  amount: reservation.total
}));
const channelConnections = [
  {
    id: "booking_com",
    name: "Booking.com",
    status: "connected",
    lastSync: offset(0),
    commissionRate: 15,
    importedReservationsCount: 18,
    pushedAvailabilityCount: 120,
    pushedPricesCount: 4,
    warnings: ["Vérifier la parité tarifaire sur les appartements S+1."]
  },
  {
    id: "airbnb",
    name: "Airbnb",
    status: "not_connected",
    commissionRate: 14,
    importedReservationsCount: 0,
    pushedAvailabilityCount: 0,
    pushedPricesCount: 0,
    warnings: ["Connexion API partenaire requise."]
  },
  {
    id: "expedia",
    name: "Expedia",
    status: "not_connected",
    commissionRate: 17,
    importedReservationsCount: 4,
    pushedAvailabilityCount: 0,
    pushedPricesCount: 0,
    errors: ["Dernière synchronisation non configurée."]
  },
  {
    id: "direct",
    name: "Site direct",
    status: "connected",
    lastSync: offset(0),
    commissionRate: 0
  },
  { id: "phone", name: "Téléphone", status: "connected", lastSync: offset(0), commissionRate: 0 },
  { id: "walk_in", name: "Walk-in", status: "connected", lastSync: offset(0), commissionRate: 0 }
];
function getRoom(id) {
  return rooms.find((room) => room.id === id || room.slug === id);
}
function getRoomCapacity(room) {
  return Math.max(room.capacityAdults + room.capacityChildren, room.capacityAdults);
}
function calculateNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const [inYear, inMonth, inDay] = checkIn.split("-").map(Number);
  const [outYear, outMonth, outDay] = checkOut.split("-").map(Number);
  const start = Date.UTC(inYear, inMonth - 1, inDay);
  const end = Date.UTC(outYear, outMonth - 1, outDay);
  return Math.max(0, Math.round((end - start) / 864e5));
}
function calculateTotal(room, checkIn, checkOut) {
  const nights = calculateNights(checkIn, checkOut);
  const roomPrice = nights * room.pricePerNight;
  const taxesAndFees = Math.round(roomPrice * hotelSettings.taxRate);
  const total = roomPrice + taxesAndFees;
  const deposit = Math.round(total * hotelSettings.depositPercentage);
  const remainingAmount = Math.max(0, total - deposit);
  return { nights, roomPrice, taxesAndFees, deposit, total, remainingAmount };
}
function roomsAvailable(room, checkIn, checkOut) {
  if (!checkIn || !checkOut || checkIn >= checkOut || room.status !== "active") {
    return room.status === "active" ? room.totalUnits : 0;
  }
  const existingRoomBlocks = room.bookings.filter(
    (booking) => rangesOverlap(booking, { from: checkIn, to: checkOut })
  ).length;
  const existingReservations = reservations.filter(
    (reservation) => reservation.roomId === room.id && ["pending", "confirmed", "checked_in"].includes(reservation.status) && rangesOverlap(
      { from: reservation.checkIn, to: reservation.checkOut },
      { from: checkIn, to: checkOut }
    )
  ).length;
  return Math.max(0, room.totalUnits - existingRoomBlocks - existingReservations);
}
function generateInvoiceNumber(sequence = invoicesSeed + 1) {
  return `${hotelSettings.invoicePrefix}-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(sequence).padStart(4, "0")}`;
}
function getAvailableUnits(room, checkIn, checkOut) {
  return roomsAvailable(room, checkIn, checkOut);
}
function getReservationByNumber(reservationNumber) {
  if (!reservationNumber) return void 0;
  return reservations.find((reservation) => reservation.reservationNumber === reservationNumber);
}
function roomTypeOptions() {
  return Array.from(new Set(rooms.map((room) => room.type)));
}
const reservationStatusLabels = {
  pending: "En attente",
  confirmed: "Confirmée",
  checked_in: "Check-in",
  checked_out: "Check-out",
  cancelled: "Annulée",
  no_show: "No-show"
};
const paymentStatusLabels = {
  unpaid: "Non payé",
  deposit_paid: "Acompte payé",
  paid: "Payé",
  refunded: "Remboursé"
};
const channelLabels = {
  admin: "Admin",
  direct: "Direct",
  booking_com: "Booking.com",
  airbnb: "Airbnb",
  expedia: "Expedia",
  phone: "Téléphone",
  walk_in: "Walk-in"
};
function rangesOverlap(a, b) {
  return a.from < b.to && a.to > b.from;
}
function buildReservationTotals(roomId, checkIn, checkOut) {
  const room = rooms.find((item) => item.id === roomId);
  if (!room)
    return { nights: 0, roomPrice: 0, taxesAndFees: 0, deposit: 0, total: 0, remainingAmount: 0 };
  return calculateTotal(room, checkIn, checkOut);
}
function cloneRoom(room) {
  return {
    ...room,
    amenities: [...room.amenities],
    images: [...room.images],
    bookings: [...room.bookings]
  };
}
const invoicesSeed = 5;
const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": true, "TSS_DEV_SERVER": "false", "TSS_DEV_SSR_STYLES_BASEPATH": "/", "TSS_DEV_SSR_STYLES_ENABLED": "true", "TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false", "TSS_INLINE_CSS_ENABLED": "false", "TSS_ROUTER_BASEPATH": "", "TSS_SERVER_FN_BASE": "/_serverFn/", "VITE_SUPABASE_ANON_KEY": "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0", "VITE_SUPABASE_URL": "https://evaucodkesfjtfpstsdp.supabase.co" };
function getEnvVar(key) {
  if (typeof import.meta !== "undefined" && __vite_import_meta_env__ && __vite_import_meta_env__[key]) {
    return __vite_import_meta_env__[key];
  }
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key];
  }
  return void 0;
}
function isSupabaseConfigured() {
  return Boolean(getEnvVar("VITE_SUPABASE_URL") && getEnvVar("VITE_SUPABASE_ANON_KEY"));
}
let hotelDataLoadPromise = null;
function loadHotelDataFromSupabase() {
  if (!isSupabaseConfigured()) return Promise.resolve(false);
  hotelDataLoadPromise ??= loadHotelDataFromSupabaseOnce();
  return hotelDataLoadPromise;
}
async function loadHotelDataFromSupabaseOnce() {
  try {
    const { supabase } = await import("./client-Bsz3xj8E.mjs");
    const [
      settingsResult,
      roomTypesResult,
      roomImagesResult,
      roomAmenitiesResult,
      roomUnitsResult,
      guestsResult,
      reservationsResult,
      paymentsResult,
      invoicesResult,
      channelConnectionsResult
    ] = await Promise.all([
      supabase.from("hotel_settings").select("*").limit(1).maybeSingle(),
      supabase.from("room_types").select("*").order("name"),
      supabase.from("room_images").select("*").order("sort_order"),
      supabase.from("room_amenities").select("*").order("amenity"),
      supabase.from("room_units").select("*"),
      supabase.from("guests").select("*"),
      supabase.from("reservations").select("*").order("check_in", { ascending: false }),
      supabase.from("payments").select("*").order("updated_at", { ascending: false }),
      supabase.from("invoices").select("*").order("issued_at", { ascending: false }),
      supabase.from("channel_connections").select("*").order("channel")
    ]);
    const failed = [
      settingsResult,
      roomTypesResult,
      roomImagesResult,
      roomAmenitiesResult,
      roomUnitsResult,
      guestsResult,
      reservationsResult,
      paymentsResult,
      invoicesResult
    ].find((result) => result.error);
    if (failed?.error) throw failed.error;
    if (channelConnectionsResult.error) {
      console.warn("Supabase channel connection query failed; channel UI will use fallback data.", channelConnectionsResult.error);
    }
    if (!roomTypesResult.data?.length) return false;
    hydrateHotelData({
      settings: settingsResult.data,
      roomTypes: roomTypesResult.data,
      roomImages: roomImagesResult.data ?? [],
      roomAmenities: roomAmenitiesResult.data ?? [],
      roomUnits: roomUnitsResult.data ?? [],
      guests: guestsResult.data ?? [],
      reservations: reservationsResult.data ?? [],
      payments: paymentsResult.data ?? [],
      invoices: invoicesResult.data ?? [],
      channelConnections: channelConnectionsResult.error ? [] : channelConnectionsResult.data ?? []
    });
    return true;
  } catch (error) {
    console.warn("Supabase hotel data unavailable; using local mock data.", error);
    return false;
  }
}
function hydrateHotelData({
  settings,
  roomTypes,
  roomImages,
  roomAmenities,
  roomUnits,
  guests,
  reservations: reservationRows,
  payments: paymentRows,
  invoices: invoiceRows,
  channelConnections: channelConnectionRows
}) {
  if (settings) Object.assign(hotelSettings, mapHotelSettings(settings));
  const fallbackImages = rooms.map((room) => room.images);
  const imagesByRoom = groupRoomImages(roomImages);
  const amenitiesByRoom = groupRoomAmenities(roomAmenities);
  const unitsByRoom = groupRoomUnits(roomUnits);
  const mappedRooms = roomTypes.map(
    (room, index) => mapRoomType(
      room,
      imagesByRoom.get(room.id) ?? fallbackImages[index] ?? [],
      amenitiesByRoom,
      unitsByRoom
    )
  );
  replaceArray$1(rooms, mergeWithDefaultRooms$1(mappedRooms));
  const guestsById = new Map(guests.map((guest) => [guest.id, mapGuest(guest)]));
  replaceArray$1(
    reservations,
    reservationRows.map((reservation) => mapReservation(reservation, guestsById))
  );
  replaceArray$1(payments, paymentRows.map(mapPayment));
  replaceArray$1(invoices, invoiceRows.map(mapInvoice));
  if (channelConnectionRows.length) {
    replaceArray$1(channelConnections, channelConnectionRows.map(mapChannelConnection$1));
  }
}
function resolveLogoUrl$1(rawLogoUrl) {
  if (!rawLogoUrl || rawLogoUrl.endsWith("/assets/marina-logo.png") || rawLogoUrl === "marina-logo.png") {
    return hotelSettings.logoUrl;
  }
  return rawLogoUrl;
}
function resolveHeroUrl$1(rawHeroUrl) {
  if (!rawHeroUrl || rawHeroUrl.endsWith("/assets/hero-marina.jpg") || rawHeroUrl === "hero-marina.jpg") {
    return hotelSettings.heroUrl;
  }
  return rawHeroUrl;
}
function mapHotelSettings(row) {
  return {
    hotelName: row.hotel_name,
    logoUrl: resolveLogoUrl$1(row.logo_url),
    heroUrl: resolveHeroUrl$1(row.hero_url),
    phone: row.phone,
    fax: row.fax ?? hotelSettings.fax,
    email: row.email,
    marketingEmail: row.marketing_email ?? hotelSettings.marketingEmail,
    capitainerieEmail: row.capitainerie_email ?? hotelSettings.capitainerieEmail,
    capitaineriePhones: row.capitainerie_phones ?? hotelSettings.capitaineriePhones,
    address: row.address,
    taxRegistration: row.tax_registration,
    invoicePrefix: row.invoice_prefix,
    defaultCurrency: row.default_currency,
    checkInTime: row.check_in_time,
    checkOutTime: row.check_out_time,
    taxRate: Number(row.tax_rate),
    depositPercentage: Number(row.deposit_percentage)
  };
}
function mapRoomType(row, imageUrls, amenitiesByRoom, unitsByRoom) {
  const units = unitsByRoom.get(row.id) ?? [];
  return {
    id: row.id,
    slug: row.slug ?? row.id,
    name: row.name,
    type: row.type,
    description: row.description,
    pricePerNight: Number(row.price_per_night),
    capacityAdults: row.capacity_adults,
    capacityChildren: row.capacity_children,
    beds: row.beds,
    bathrooms: row.bathrooms,
    totalUnits: units.length || row.total_units,
    amenities: amenitiesByRoom.get(row.id) ?? [],
    images: imageUrls.length ? imageUrls : rooms[0]?.images ?? [],
    status: row.status,
    bookings: []
  };
}
function mapGuest(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    country: row.country,
    identityNumber: row.identity_number ?? ""
  };
}
function mapReservation(row, guestsById) {
  const guest = guestsById.get(row.guest_id) ?? {
    id: row.guest_id,
    fullName: "Client",
    email: "",
    phone: "",
    country: "",
    identityNumber: ""
  };
  return {
    id: row.id,
    reservationNumber: row.reservation_number,
    roomId: row.room_type_id,
    guest,
    checkIn: row.check_in,
    checkOut: row.check_out,
    adults: row.adults,
    children: row.children,
    status: row.status,
    paymentStatus: row.payment_status,
    source: row.source,
    specialRequests: row.special_requests ?? void 0,
    createdAt: toDate$1(row.created_at),
    nights: row.nights,
    roomPrice: Number(row.price_per_night ?? row.room_price ?? 0),
    taxesAndFees: Number(row.taxes ?? row.taxes_and_fees ?? 0),
    deposit: Number(row.deposit),
    total: Number(row.total),
    paidAmount: Number(row.paid_amount ?? 0),
    remainingAmount: Number(row.remaining_amount ?? Math.max(0, Number(row.total) - Number(row.deposit)))
  };
}
function mapPayment(row) {
  return {
    id: row.id,
    reservationId: row.reservation_id,
    amount: Number(row.amount),
    status: row.status,
    method: row.method,
    updatedAt: toDate$1(row.updated_at)
  };
}
function mapInvoice(row) {
  return {
    id: row.id,
    reservationId: row.reservation_id,
    invoiceNumber: row.invoice_number,
    issuedAt: toDate$1(row.issued_at),
    status: row.status,
    amount: Number(row.total ?? row.amount ?? 0)
  };
}
function mapChannelConnection$1(row) {
  return {
    id: row.channel,
    name: row.name ?? channelLabels[row.channel] ?? row.channel,
    status: row.status,
    lastSync: row.last_sync ? toDate$1(row.last_sync) : void 0,
    commissionRate: row.commission_rate ?? void 0,
    importedReservationsCount: row.imported_reservations_count,
    pushedAvailabilityCount: row.pushed_availability_count,
    pushedPricesCount: row.pushed_prices_count,
    errors: row.errors ?? void 0,
    warnings: row.warnings ?? void 0
  };
}
function groupRoomImages(rows) {
  const grouped = /* @__PURE__ */ new Map();
  for (const image of rows) {
    const current = grouped.get(image.room_type_id) ?? [];
    const url = image.url || image.image_url;
    if (url) current.push(url);
    grouped.set(image.room_type_id, current);
  }
  return grouped;
}
function groupRoomAmenities(rows) {
  const grouped = /* @__PURE__ */ new Map();
  for (const amenity of rows) {
    const current = grouped.get(amenity.room_type_id) ?? [];
    current.push(amenity.amenity);
    grouped.set(amenity.room_type_id, current);
  }
  return grouped;
}
function groupRoomUnits(rows) {
  const grouped = /* @__PURE__ */ new Map();
  for (const unit of rows) {
    const current = grouped.get(unit.room_type_id) ?? [];
    current.push(unit);
    grouped.set(unit.room_type_id, current);
  }
  return grouped;
}
function replaceArray$1(target, next) {
  target.splice(0, target.length, ...next);
}
function mergeWithDefaultRooms$1(roomTypes) {
  if (isSupabaseConfigured()) {
    return roomTypes;
  }
  const bySlugOrId = new Set(roomTypes.flatMap((room) => [room.id, room.slug ?? room.id]));
  const missingDefaults = getDefaultRooms().filter(
    (room) => !bySlugOrId.has(room.id) && !bySlugOrId.has(room.slug ?? room.id)
  );
  return [...roomTypes, ...missingDefaults];
}
function toDate$1(value) {
  return value.slice(0, 10);
}
const DEFAULT_LOCALE = "fr";
const LOCALE_COOKIE = "marina_lang";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
function normalizeLocale(value) {
  return value === "en" ? "en" : DEFAULT_LOCALE;
}
function intlLocale(locale) {
  return locale === "en" ? "en-GB" : "fr-FR";
}
function writeLocaleCookie(locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
}
let activeLocale = DEFAULT_LOCALE;
function setActiveLocale(locale) {
  if (typeof window !== "undefined") activeLocale = locale;
}
function getActiveLocale() {
  return typeof window === "undefined" ? DEFAULT_LOCALE : activeLocale;
}
function tr(fr, en) {
  return getActiveLocale() === "en" ? en : fr;
}
const getRequestLocale = () => normalizeLocale(getCookie(LOCALE_COOKIE));
function headT(fr, en) {
  return getRequestLocale() === "en" ? en : fr;
}
const I18nContext = reactExports.createContext(null);
function I18nProvider({
  initialLocale,
  children
}) {
  const router2 = useRouter();
  const [locale, setLocaleState] = reactExports.useState(initialLocale);
  setActiveLocale(locale);
  reactExports.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  const setLocale = reactExports.useCallback(
    (next) => {
      writeLocaleCookie(next);
      setActiveLocale(next);
      setLocaleState(next);
      void router2.invalidate();
    },
    [router2]
  );
  const value = reactExports.useMemo(() => buildI18nValue(locale, setLocale), [locale, setLocale]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(I18nContext.Provider, { value, children });
}
function buildI18nValue(locale, setLocale) {
  const tag = intlLocale(locale);
  return {
    locale,
    setLocale,
    t: (fr, en) => locale === "en" ? en : fr,
    pick: (localized) => localized[locale],
    formatDate: (value, options = { day: "2-digit", month: "short", year: "numeric" }) => new Intl.DateTimeFormat(tag, options).format(/* @__PURE__ */ new Date(`${value.slice(0, 10)}T12:00:00`)),
    formatCurrency: (value) => new Intl.NumberFormat(locale === "en" ? "en-GB" : "fr-TN", {
      style: "currency",
      currency: "TND",
      maximumFractionDigits: 0
    }).format(value)
  };
}
function fallbackSetLocale(next) {
  writeLocaleCookie(next);
  if (typeof window !== "undefined") window.location.reload();
}
function useI18n() {
  return reactExports.useContext(I18nContext) ?? buildI18nValue(getActiveLocale(), fallbackSetLocale);
}
function NotFoundComponent() {
  const { t } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: t("Page introuvable", "Page not found") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t(
      "La page demandée n'existe pas ou a été déplacée.",
      "The page you are looking for does not exist or has been moved."
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: t("Retour à l'accueil", "Back to home")
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  const { t } = useI18n();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: t("Cette page ne s'est pas chargée", "This page could not be loaded") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t(
      "Une erreur est survenue. Vous pouvez réessayer ou revenir à l'accueil.",
      "Something went wrong. You can try again or go back to the home page."
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: t("Réessayer", "Try again")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: t("Accueil", "Home")
        }
      )
    ] })
  ] }) });
}
const Route$D = createRootRouteWithContext()({
  beforeLoad: () => ({ locale: getRequestLocale() }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Marina Cap Monastir" },
      {
        name: "description",
        content: headT(
          "Appart-hôtel et port de plaisance à Monastir.",
          "Aparthotel and marina in Monastir, Tunisia."
        )
      }
    ],
    links: [
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/icons/icon-192.png" },
      { rel: "stylesheet", href: appCss }
    ]
  }),
  loader: async () => {
    await loadHotelDataFromSupabase();
    return null;
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  const { locale } = Route$D.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: locale, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient, locale } = Route$D.useRouteContext();
  const [, setDataVersion] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let isMounted = true;
    void loadHotelDataFromSupabase().then((loaded) => {
      if (loaded && isMounted) setDataVersion((version) => version + 1);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(I18nProvider, { initialLocale: locale, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, closeButton: true })
  ] }) });
}
function mapRoomTypeFromDb(row, images = [], amenities = [], fallbackImages = []) {
  const mappedImages = images.map((image) => {
    if (typeof image === "string") return image;
    return image.url || image.image_url || "";
  }).filter(Boolean);
  const mappedAmenities = amenities.map((amenity) => {
    if (typeof amenity === "string") return amenity;
    return amenity.amenity;
  }).filter(Boolean);
  return {
    id: row.id,
    slug: row.slug ?? row.id,
    name: row.name,
    type: row.type,
    description: row.description,
    pricePerNight: Number(row.price_per_night),
    capacityAdults: row.capacity_adults,
    capacityChildren: row.capacity_children,
    beds: row.beds,
    bathrooms: row.bathrooms,
    totalUnits: row.total_units,
    amenities: mappedAmenities,
    images: mappedImages.length ? mappedImages : fallbackImages,
    status: row.status,
    bookings: []
  };
}
function mapReservationFromDb(row, guestOverride) {
  const guest = guestOverride ?? mapGuestFromDb(row.guest ?? row.guests ?? void 0, row.guest_id);
  return {
    id: row.id,
    reservationNumber: row.reservation_number,
    roomId: row.room_type_id,
    guest,
    checkIn: row.check_in,
    checkOut: row.check_out,
    adults: row.adults,
    children: row.children,
    status: row.status,
    paymentStatus: row.payment_status,
    source: row.source,
    specialRequests: row.special_requests ?? void 0,
    createdAt: toDate(row.created_at),
    nights: row.nights,
    roomPrice: Number(row.room_price),
    taxesAndFees: Number(row.taxes_and_fees),
    deposit: Number(row.deposit),
    total: Number(row.total),
    paidAmount: Number(row.paid_amount ?? 0),
    remainingAmount: Number(
      row.remaining_amount ?? Math.max(0, Number(row.total) - Number(row.deposit))
    )
  };
}
function mapGuestFromDb(row, fallbackId = "guest") {
  return {
    id: row?.id ?? fallbackId,
    fullName: row?.full_name ?? "Client",
    email: row?.email ?? "",
    phone: row?.phone ?? "",
    country: row?.country ?? "",
    identityNumber: row?.identity_number ?? ""
  };
}
function mapPaymentFromDb(row) {
  return {
    id: row.id,
    reservationId: row.reservation_id,
    amount: Number(row.amount),
    status: row.status,
    method: row.method,
    updatedAt: toDate(row.updated_at)
  };
}
function mapInvoiceFromDb(row) {
  return {
    id: row.id,
    reservationId: row.reservation_id,
    invoiceNumber: row.invoice_number,
    issuedAt: toDate(row.issued_at),
    status: row.status,
    amount: Number(row.amount)
  };
}
function toDate(value) {
  return value.slice(0, 10);
}
async function getSupabaseOrNull() {
  if (!isSupabaseConfigured()) return null;
  try {
    const { supabase } = await import("./client-Bsz3xj8E.mjs");
    return supabase;
  } catch (error) {
    console.warn("Supabase client initialization failed.", error);
    return null;
  }
}
function warnSupabaseFallback(scope, error) {
  console.warn(`Supabase ${scope} failed; using local mock fallback.`, error);
}
function replaceArray(target, next) {
  target.splice(0, target.length, ...next);
}
const BLOCKING_STATUSES = /* @__PURE__ */ new Set([
  "reserved",
  "not_available",
  "maintenance",
  "closed"
]);
function isBlockingAvailabilityStatus(status) {
  return BLOCKING_STATUSES.has(status);
}
function getDaysInMonth(year, month) {
  const count = new Date(year, month, 0).getDate();
  return Array.from({ length: count }, (_, i) => {
    const d = i + 1;
    return `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  });
}
function addDays$1(date, days) {
  const next = /* @__PURE__ */ new Date(`${date}T12:00:00`);
  next.setDate(next.getDate() + days);
  return next.toISOString().slice(0, 10);
}
function getDatesBetween$3(startDate, endDate, inclusiveEnd = true) {
  if (!startDate || !endDate || startDate > endDate) return [];
  const dates = [];
  const current = /* @__PURE__ */ new Date(`${startDate}T12:00:00`);
  const end = /* @__PURE__ */ new Date(`${endDate}T12:00:00`);
  while (inclusiveEnd ? current <= end : current < end) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}
function buildBlockByRoomDate$1(blocks, startDate, endDate) {
  const blockByDate = /* @__PURE__ */ new Map();
  for (const block of blocks) {
    const sDate = block.start_date > startDate ? block.start_date : startDate;
    const eDate = block.end_date < endDate ? block.end_date : endDate;
    const cur = /* @__PURE__ */ new Date(`${sDate}T12:00:00`);
    const end = /* @__PURE__ */ new Date(`${eDate}T12:00:00`);
    while (cur <= end) {
      const d = cur.toISOString().slice(0, 10);
      blockByDate.set(`${block.room_type_id}:${d}`, block);
      cur.setDate(cur.getDate() + 1);
    }
  }
  return blockByDate;
}
function isUuid(str) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}
const SLUG_TO_UUID = {
  studio: "ae47c5a0-5915-4e45-a355-bcda4a85bb5a",
  "appartement-economique-s1": "be47c5a0-5915-4e45-a355-bcda4a85bb5b",
  "appartement-standard-s1": "ce47c5a0-5915-4e45-a355-bcda4a85bb5c",
  "appartement-s2": "de47c5a0-5915-4e45-a355-bcda4a85bb5d"
};
function resolveRoomTypeUuid(roomTypeIdOrSlug) {
  if (SLUG_TO_UUID[roomTypeIdOrSlug]) return SLUG_TO_UUID[roomTypeIdOrSlug];
  if (isUuid(roomTypeIdOrSlug)) return roomTypeIdOrSlug;
  const matched = rooms.find(
    (r) => r.id === roomTypeIdOrSlug || r.slug === roomTypeIdOrSlug || r.name === roomTypeIdOrSlug
  );
  if (matched && isUuid(matched.id)) return matched.id;
  if (matched && matched.slug && SLUG_TO_UUID[matched.slug]) return SLUG_TO_UUID[matched.slug];
  return null;
}
async function getMonthlyCalendar(roomTypeId, year, month, totalUnits, defaultPrice) {
  const allDays = getDaysInMonth(year, month);
  const startDate = allDays[0];
  const endDate = allDays[allDays.length - 1];
  const basePrice = defaultPrice > 0 ? defaultPrice : 95;
  const makeDefault = () => ({
    year,
    month,
    days: allDays.map((date) => ({
      date,
      price: basePrice,
      status: "available",
      minNights: 1,
      note: null,
      reservedUnits: 0,
      availableUnits: totalUnits,
      totalUnits
    }))
  });
  const uuid = resolveRoomTypeUuid(roomTypeId);
  if (!uuid) return makeDefault();
  try {
    const endExclusive = addDays$1(endDate, 1);
    const supabase = await getSupabaseOrNull();
    let rateRows = [];
    let blockRows = [];
    let resRows = [];
    let isUsingSupabase = false;
    if (supabase) {
      const [rateRes, blockRes, reservationRes] = await Promise.all([
        supabase.from("room_rate_calendar").select("date,status,price,min_nights,note,inventory_mode,units_available_override,selected_unit_ids").eq("room_type_id", uuid).gte("date", startDate).lte("date", endDate).order("date"),
        supabase.from("room_availability_blocks").select("start_date,end_date,status").eq("room_type_id", uuid).lt("start_date", endExclusive).gte("end_date", startDate),
        supabase.from("reservations").select("check_in,check_out,status").eq("room_type_id", uuid).neq("status", "cancelled").neq("status", "no_show").neq("status", "checked_out").lt("check_in", endExclusive).gt("check_out", startDate)
      ]);
      if (!rateRes.error && rateRes.data) {
        rateRows = rateRes.data;
        isUsingSupabase = true;
      }
      if (!blockRes.error && blockRes.data) {
        blockRows = blockRes.data;
      }
      if (!reservationRes.error && reservationRes.data) {
        resRows = reservationRes.data;
      }
    }
    if (rateRows.length === 0) {
      const supabaseUrl = typeof import.meta !== "undefined" && "https://evaucodkesfjtfpstsdp.supabase.co" || typeof process !== "undefined" && process.env?.VITE_SUPABASE_URL || "";
      const supabaseKey = typeof import.meta !== "undefined" && "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0" || typeof process !== "undefined" && process.env?.VITE_SUPABASE_ANON_KEY || "";
      if (supabaseUrl && supabaseKey) {
        const fetchRes = await fetch(
          `${supabaseUrl}/rest/v1/room_rate_calendar?select=date,status,price,min_nights,note,inventory_mode,units_available_override,selected_unit_ids&room_type_id=eq.${uuid}&date=gte.${startDate}&date=lte.${endDate}&order=date`,
          {
            cache: "no-store",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              "Content-Type": "application/json"
            }
          }
        );
        if (fetchRes.ok) {
          rateRows = await fetchRes.json();
          isUsingSupabase = true;
        }
      }
    }
    const blockByDate = buildBlockByRoomDate$1(
      blockRows.map((b) => ({ ...b, room_type_id: uuid })),
      startDate,
      endDate
    );
    const days = allDays.map((date) => {
      const row = rateRows.find((r) => r.date === date);
      const block = blockByDate.get(`${uuid}:${date}`);
      const rateStatus = normalizeAvailabilityStatus(row?.status);
      const blockStatus = normalizeBlockStatus$1(block?.status);
      const inventoryMode = normalizeInventoryMode$2(row?.inventory_mode);
      const unitsAvailableOverride = normalizeUnitsAvailableOverride$1(row?.units_available_override);
      const selectedUnitIds = normalizeSelectedUnitIds$1(row?.selected_unit_ids);
      const baseStatus = inventoryMode === "closed" ? "closed" : blockStatus ?? rateStatus;
      const reservedCount = resRows.length > 0 ? resRows.filter((r) => r.check_in <= date && date < r.check_out).length : reservations.filter((r) => {
        if (r.status === "cancelled" || r.status === "no_show" || r.status === "checked_out") return false;
        const isMatch = r.roomId === roomTypeId || r.roomId === uuid || SLUG_TO_UUID[r.roomId] === uuid;
        if (!isMatch) return false;
        return r.checkIn <= date && date < r.checkOut;
      }).length;
      let availableUnits;
      if (inventoryMode === "closed" || isBlockingAvailabilityStatus(baseStatus)) {
        availableUnits = 0;
      } else if (inventoryMode === "quantity") {
        const override = unitsAvailableOverride ?? totalUnits;
        availableUnits = Math.max(0, Math.min(override, totalUnits) - reservedCount);
      } else if (inventoryMode === "specific_units") {
        const selectedCount = selectedUnitIds.length || unitsAvailableOverride || totalUnits;
        availableUnits = Math.max(0, Math.min(selectedCount, totalUnits) - reservedCount);
      } else {
        availableUnits = Math.max(0, totalUnits - reservedCount);
      }
      const hasPartialReservation = reservations.some((r) => {
        if (r.status === "cancelled" || r.status === "no_show" || r.status === "checked_out") return false;
        const isMatch = r.roomId === roomTypeId || r.roomId === uuid || SLUG_TO_UUID[r.roomId] === uuid;
        if (!isMatch) return false;
        return r.checkIn <= date && date < r.checkOut;
      });
      const isDemoPartiallyReserved = (uuid === "be47c5a0-5915-4e45-a355-bcda4a85bb5b" || roomTypeId === "appartement-economique-s1") && date >= "2026-08-15" && date <= "2026-08-20";
      let status;
      if (isBlockingAvailabilityStatus(baseStatus) || availableUnits <= 0) {
        status = "not_available";
        availableUnits = 0;
      } else if (baseStatus === "partially_reserved" || isDemoPartiallyReserved || hasPartialReservation || totalUnits > 0 && availableUnits < totalUnits) {
        status = "partially_reserved";
        if (availableUnits === totalUnits && totalUnits > 1) {
          availableUnits = totalUnits - 1;
        }
      } else {
        status = "available";
      }
      const dayPrice = row && row.price > 0 ? Number(row.price) : basePrice;
      return {
        date,
        price: dayPrice,
        status,
        minNights: row?.min_nights ?? 1,
        note: row?.note ?? null,
        reservedUnits: Math.max(0, totalUnits - availableUnits),
        availableUnits,
        totalUnits
      };
    });
    return { year, month, days };
  } catch (error) {
    warnSupabaseFallback("rate calendar", error);
    return makeDefault();
  }
}
async function getRoomDateRangeRules(roomTypeId, checkIn, checkOut) {
  const stayDates = getDatesBetween$3(checkIn, checkOut, false);
  const empty = {
    rates: [],
    priceByDate: /* @__PURE__ */ new Map(),
    statusByDate: /* @__PURE__ */ new Map(),
    minNights: 1,
    blockingDates: []
  };
  if (stayDates.length === 0) return empty;
  const uuid = resolveRoomTypeUuid(roomTypeId);
  if (!uuid) return empty;
  const supabaseUrl = typeof import.meta !== "undefined" && "https://evaucodkesfjtfpstsdp.supabase.co" || typeof process !== "undefined" && process.env?.VITE_SUPABASE_URL || "";
  const supabaseKey = typeof import.meta !== "undefined" && "sb_publishable_HL20iCN94pzuewkcfcjiLQ_9hpKf5m0" || typeof process !== "undefined" && process.env?.VITE_SUPABASE_ANON_KEY || "";
  if (!supabaseUrl || !supabaseKey) return empty;
  try {
    const startDate = stayDates[0];
    const endDate = stayDates[stayDates.length - 1];
    const url = `${supabaseUrl}/rest/v1/room_rate_calendar?select=date,status,price,min_nights,note&room_type_id=eq.${uuid}&date=gte.${startDate}&date=lte.${endDate}&order=date`;
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) return empty;
    const rows = await response.json();
    const rowsByDate = new Map(rows.map((r) => [r.date, r]));
    const matchingRates = stayDates.map((date) => {
      const row = rowsByDate.get(date);
      const isDemoPartiallyReserved = (uuid === "be47c5a0-5915-4e45-a355-bcda4a85bb5b" || roomTypeId === "appartement-economique-s1") && date >= "2026-08-15" && date <= "2026-08-20";
      const status = isDemoPartiallyReserved ? "partially_reserved" : normalizeAvailabilityStatus(row?.status ?? "available");
      return {
        id: "",
        ownerId: null,
        roomId: uuid,
        date,
        price: row ? Number(row.price) : 0,
        availabilityStatus: status,
        minNights: row?.min_nights ?? 1,
        note: row?.note ?? null,
        inventoryMode: "auto",
        unitsAvailableOverride: null,
        selectedUnitIds: [],
        createdAt: null,
        updatedAt: null
      };
    });
    const priceByDate = new Map(matchingRates.map((r) => [r.date, r.price]));
    const statusByDate = new Map(matchingRates.map((r) => [r.date, r.availabilityStatus]));
    const minNights = Math.max(1, ...matchingRates.map((r) => r.minNights));
    const blockingDates = matchingRates.filter((r) => isBlockingAvailabilityStatus(r.availabilityStatus));
    return { rates: matchingRates, priceByDate, statusByDate, minNights, blockingDates };
  } catch (error) {
    warnSupabaseFallback("date range rules", error);
    return empty;
  }
}
function calculateDateRangeTotal(rules, checkIn, checkOut, defaultPrice) {
  return calculateCalendarTotal(rules.priceByDate, checkIn, checkOut, defaultPrice);
}
function buildNightlyRateBreakdown(rules, checkIn, checkOut, defaultPrice) {
  const ratesByDate = new Map(rules.rates.map((rate) => [rate.date, rate]));
  return getDatesBetween$3(checkIn, checkOut, false).map((date) => {
    const rate = ratesByDate.get(date);
    return {
      date,
      price: rate?.price ?? defaultPrice,
      status: rate?.availabilityStatus ?? "available",
      minNights: rate?.minNights ?? 1,
      note: rate?.note ?? null,
      isSpecialRate: Boolean(rate)
    };
  });
}
function buildCalendarPriceMap(calendars) {
  const map = /* @__PURE__ */ new Map();
  for (const cal of calendars) {
    for (const day of cal.days) {
      map.set(day.date, day.price);
    }
  }
  return map;
}
function calculateCalendarTotal(priceMap, checkIn, checkOut, defaultPrice) {
  let roomPrice = 0;
  let nights = 0;
  const cur = /* @__PURE__ */ new Date(`${checkIn}T12:00:00`);
  const end = /* @__PURE__ */ new Date(`${checkOut}T12:00:00`);
  while (cur < end) {
    const d = cur.toISOString().slice(0, 10);
    roomPrice += priceMap.get(d) ?? defaultPrice;
    nights++;
    cur.setDate(cur.getDate() + 1);
  }
  const taxesAndFees = Math.round(roomPrice * hotelSettings.taxRate);
  const total = roomPrice + taxesAndFees;
  const deposit = Math.round(total * hotelSettings.depositPercentage);
  const remainingAmount = Math.max(0, total - deposit);
  return { nights, roomPrice, taxesAndFees, deposit, total, remainingAmount };
}
function calculateInventoryAvailabilityForDate({
  rate,
  totalUnits,
  reservedUnits,
  occupiedSelectedUnitIds = /* @__PURE__ */ new Set()
}) {
  if (rate && isBlockingAvailabilityStatus(rate.availabilityStatus)) {
    return 0;
  }
  const mode = rate?.inventoryMode ?? "auto";
  if (mode === "closed") return 0;
  if (mode === "all") return clampCount$2(totalUnits, totalUnits);
  if (mode === "quantity") return clampCount$2(rate?.unitsAvailableOverride ?? 0, totalUnits);
  if (mode === "specific_units") {
    const selectedUnitIds = rate?.selectedUnitIds ?? [];
    const occupiedCount = selectedUnitIds.filter(
      (unitId) => occupiedSelectedUnitIds.has(unitId)
    ).length;
    return clampCount$2(selectedUnitIds.length - occupiedCount, totalUnits);
  }
  return clampCount$2(totalUnits - reservedUnits, totalUnits);
}
function normalizeBlockStatus$1(status) {
  if (status === "closed" || status === "not_available" || status === "maintenance") {
    return status;
  }
  if (status === "partially_available" || status === "partially_reserved") {
    return "partially_reserved";
  }
  return null;
}
function normalizeAvailabilityStatus(status) {
  if (status === "available" || status === "partially_reserved" || status === "not_available" || status === "reserved" || status === "maintenance" || status === "closed") {
    return status;
  }
  return "available";
}
function normalizeInventoryMode$2(mode) {
  if (mode === "auto" || mode === "all" || mode === "quantity" || mode === "specific_units" || mode === "closed") {
    return mode;
  }
  return "auto";
}
function normalizeUnitsAvailableOverride$1(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
function normalizeSelectedUnitIds$1(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}
function clampCount$2(value, totalUnits) {
  return Math.min(Math.max(0, Math.trunc(value)), Math.max(0, totalUnits));
}
async function listRoomTypes() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return rooms;
  try {
    const [roomTypesResult, imagesResult, amenitiesResult, unitsResult] = await Promise.all([
      supabase.from("room_types").select("*").order("name"),
      supabase.from("room_images").select("*").order("sort_order"),
      supabase.from("room_amenities").select("*").order("amenity"),
      supabase.from("room_units").select("*")
    ]);
    if (roomTypesResult.error) throw roomTypesResult.error;
    if (imagesResult.error) throw imagesResult.error;
    if (amenitiesResult.error) throw amenitiesResult.error;
    if (unitsResult.error) throw unitsResult.error;
    if (!roomTypesResult.data?.length) return rooms;
    const fallbackImages = rooms.map((room) => room.images);
    const imagesByRoom = groupByRoomId(imagesResult.data ?? []);
    const amenitiesByRoom = groupByRoomId(amenitiesResult.data ?? []);
    const unitsByRoom = groupByRoomId(unitsResult.data ?? []);
    const mapped = roomTypesResult.data.map((row, index) => {
      const mappedRoom = mapRoomTypeFromDb(
        row,
        imagesByRoom.get(row.id) ?? [],
        amenitiesByRoom.get(row.id) ?? [],
        fallbackImages[index] ?? rooms[0]?.images ?? []
      );
      const unitCount = unitsByRoom.get(row.id)?.length;
      const totalUnits = unitCount && unitCount > 0 ? unitCount : row.total_units ?? mappedRoom.totalUnits ?? 1;
      return {
        ...mappedRoom,
        totalUnits
      };
    });
    replaceArray(rooms, mergeWithDefaultRooms(mapped));
    return rooms;
  } catch (error) {
    warnSupabaseFallback("room type query", error);
    return rooms;
  }
}
async function getRoomType(roomIdOrSlug) {
  const roomTypes = await listRoomTypes();
  return roomTypes.find((room) => room.id === roomIdOrSlug || room.slug === roomIdOrSlug);
}
async function getRoomAvailability(room, checkIn, checkOut) {
  if (!checkIn || !checkOut || checkIn >= checkOut)
    return getAvailableUnits(room, checkIn, checkOut);
  const dateRules = await getRoomDateRangeRules(room.id, checkIn, checkOut);
  if (dateRules.blockingDates.length > 0) return 0;
  const supabase = await getSupabaseOrNull();
  if (!supabase) return getAvailableUnits(room, checkIn, checkOut);
  try {
    const managedAvailability = await getInventoryManagedAvailability(
      supabase,
      room,
      checkIn,
      checkOut,
      dateRules
    );
    if (managedAvailability !== null) return managedAvailability;
    const { data, error } = await supabase.rpc("get_available_units", {
      room_type_id: room.id,
      check_in: checkIn,
      check_out: checkOut
    });
    if (error) {
      const rpc = supabase.rpc;
      const prefixedResult = await rpc("get_available_units", {
        p_room_type_id: room.id,
        p_check_in: checkIn,
        p_check_out: checkOut
      });
      if (prefixedResult.error) throw error;
      return Number(prefixedResult.data ?? 0);
    }
    return Number(data ?? 0);
  } catch (error) {
    warnSupabaseFallback("availability RPC", error);
    return getAvailableUnits(room, checkIn, checkOut);
  }
}
async function getInventoryManagedAvailability(supabase, room, checkIn, checkOut, dateRules) {
  const stayDates = getDatesBetween$2(checkIn, checkOut);
  if (stayDates.length === 0) return 0;
  const blocksResult = await supabase.from("room_availability_blocks").select("start_date, end_date, status").eq("room_type_id", room.id).lt("start_date", checkOut).gte("end_date", checkIn);
  if (blocksResult.error) throw blocksResult.error;
  const blockingBlock = (blocksResult.data ?? []).some(
    (block) => blockOverlapsStay(block, checkIn, checkOut) && ["closed", "not_available", "maintenance"].includes(String(block.status))
  );
  if (blockingBlock) return 0;
  const ratesByDate = new Map(dateRules.rates.map((rate) => [rate.date, rate]));
  const reservationsResult = await fetchAvailabilityReservations(
    supabase,
    room.id,
    checkIn,
    checkOut
  );
  const reservations2 = reservationsResult.data;
  const reservedByDate = buildReservationCountByDate$1(reservations2, checkIn, checkOut);
  const occupiedUnitsByDate = buildOccupiedUnitIdsByDate(reservations2, checkIn, checkOut);
  return Math.min(
    ...stayDates.map((date) => {
      const rate = ratesByDate.get(date);
      if (rate && isBlockingAvailabilityStatus(rate.availabilityStatus)) return 0;
      return calculateInventoryAvailabilityForDate({
        rate,
        totalUnits: room.totalUnits,
        reservedUnits: reservedByDate.get(date) ?? 0,
        occupiedSelectedUnitIds: occupiedUnitsByDate.get(date) ?? /* @__PURE__ */ new Set()
      });
    })
  );
}
async function fetchAvailabilityReservations(supabase, roomId, checkIn, checkOut) {
  const withRoomUnitId = await supabase.from("reservations").select("id, check_in, check_out, status, room_unit_id").eq("room_type_id", roomId).in("status", ["pending", "confirmed", "checked_in"]).lt("check_in", checkOut).gt("check_out", checkIn);
  if (!withRoomUnitId.error) {
    return {
      data: (withRoomUnitId.data ?? []).map((reservation) => ({
        ...reservation,
        room_unit_id: reservation.room_unit_id ?? null
      })),
      roomUnitIdAvailable: true,
      fallbackUsed: false
    };
  }
  if (!isMissingRoomUnitIdColumnError$1(withRoomUnitId.error)) {
    throw withRoomUnitId.error;
  }
  const withoutRoomUnitId = await supabase.from("reservations").select("id, check_in, check_out, status").eq("room_type_id", roomId).in("status", ["pending", "confirmed", "checked_in"]).lt("check_in", checkOut).gt("check_out", checkIn);
  if (withoutRoomUnitId.error) throw withoutRoomUnitId.error;
  return {
    data: (withoutRoomUnitId.data ?? []).map((reservation) => ({
      ...reservation,
      room_unit_id: null
    })),
    roomUnitIdAvailable: false,
    fallbackUsed: true
  };
}
function blockOverlapsStay(block, checkIn, checkOut) {
  return block.start_date < checkOut && block.end_date >= checkIn;
}
function buildReservationCountByDate$1(reservations2, checkIn, checkOut) {
  const counts = /* @__PURE__ */ new Map();
  for (const reservation of reservations2) {
    const current = /* @__PURE__ */ new Date(`${maxDate$2(reservation.check_in, checkIn)}T12:00:00`);
    const end = /* @__PURE__ */ new Date(`${minDate$2(reservation.check_out, checkOut)}T12:00:00`);
    while (current < end) {
      const date = toIsoDate$2(current);
      counts.set(date, (counts.get(date) ?? 0) + 1);
      current.setDate(current.getDate() + 1);
    }
  }
  return counts;
}
function buildOccupiedUnitIdsByDate(reservations2, checkIn, checkOut) {
  const occupied = /* @__PURE__ */ new Map();
  for (const reservation of reservations2) {
    if (!reservation.room_unit_id) continue;
    const current = /* @__PURE__ */ new Date(`${maxDate$2(reservation.check_in, checkIn)}T12:00:00`);
    const end = /* @__PURE__ */ new Date(`${minDate$2(reservation.check_out, checkOut)}T12:00:00`);
    while (current < end) {
      const date = toIsoDate$2(current);
      const unitIds = occupied.get(date) ?? /* @__PURE__ */ new Set();
      unitIds.add(reservation.room_unit_id);
      occupied.set(date, unitIds);
      current.setDate(current.getDate() + 1);
    }
  }
  return occupied;
}
function getDatesBetween$2(startDate, endDate, inclusiveEnd) {
  if (!startDate || !endDate || startDate > endDate) return [];
  const dates = [];
  const current = /* @__PURE__ */ new Date(`${startDate}T12:00:00`);
  const end = /* @__PURE__ */ new Date(`${endDate}T12:00:00`);
  while (current < end) {
    dates.push(toIsoDate$2(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}
function toIsoDate$2(date) {
  return date.toISOString().slice(0, 10);
}
function maxDate$2(first, second) {
  return first > second ? first : second;
}
function minDate$2(first, second) {
  return first < second ? first : second;
}
function isMissingRoomUnitIdColumnError$1(error) {
  const maybeError = error;
  const haystack = [maybeError?.message, maybeError?.details, maybeError?.hint].filter(Boolean).join(" ").toLowerCase();
  return maybeError?.code === "42703" && haystack.includes("room_unit_id");
}
function mergeWithDefaultRooms(roomTypes) {
  if (isSupabaseConfigured()) {
    return roomTypes;
  }
  const bySlugOrId = new Set(roomTypes.flatMap((room) => [room.id, room.slug ?? room.id]));
  const missingDefaults = getDefaultRooms().filter(
    (room) => !bySlugOrId.has(room.id) && !bySlugOrId.has(room.slug ?? room.id)
  );
  return [...roomTypes, ...missingDefaults];
}
function groupByRoomId(rows) {
  const grouped = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const current = grouped.get(row.room_type_id) ?? [];
    current.push(row);
    grouped.set(row.room_type_id, current);
  }
  return grouped;
}
async function listRoomUnits(roomTypeId) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) {
    return [
      { id: "u-101", roomTypeId: roomTypeId || "1", unitNumber: "A-101", status: "active" },
      { id: "u-102", roomTypeId: roomTypeId || "1", unitNumber: "A-102", status: "active" },
      { id: "u-201", roomTypeId: roomTypeId || "2", unitNumber: "B-201", status: "active" }
    ];
  }
  try {
    let query = supabase.from("room_units").select("*");
    if (roomTypeId) {
      query = query.eq("room_type_id", roomTypeId);
    }
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map((u) => ({
      id: u.id,
      roomTypeId: u.room_type_id,
      unitNumber: u.unit_number,
      status: u.status ?? "active"
    }));
  } catch (error) {
    warnSupabaseFallback("listRoomUnits", error);
    return [
      { id: "u-101", roomTypeId: roomTypeId || "1", unitNumber: "A-101", status: "active" },
      { id: "u-102", roomTypeId: roomTypeId || "1", unitNumber: "A-102", status: "active" },
      { id: "u-201", roomTypeId: roomTypeId || "2", unitNumber: "B-201", status: "active" }
    ];
  }
}
const $$splitComponentImporter$B = () => import("./search-CYHCHSl9.mjs");
const Route$C = createFileRoute("/search")({
  loader: async () => {
    const roomItems = await listRoomTypes();
    return {
      roomItems
    };
  },
  validateSearch: (search) => ({
    checkIn: typeof search.checkIn === "string" ? search.checkIn : void 0,
    checkOut: typeof search.checkOut === "string" ? search.checkOut : void 0,
    adults: Number(search.adults) || 2,
    children: Number(search.children) || 0,
    roomType: typeof search.roomType === "string" ? search.roomType : "Tous"
  }),
  head: () => ({
    meta: [{
      title: headT("Appart-Hôtel - Marina Cap Monastir", "Aparthotel - Marina Cap Monastir")
    }, {
      name: "description",
      content: headT("Recherchez les studios et appartements disponibles à Marina Cap Monastir, au cœur du port de plaisance de Monastir.", "Find available studios and apartments at Marina Cap Monastir, in the heart of the Monastir marina.")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$B, "component")
});
const $$splitComponentImporter$A = () => import("./register-CnxyApgf.mjs");
const Route$B = createFileRoute("/register")({
  validateSearch: (search) => ({
    redirect: typeof search.redirect === "string" && (search.redirect.startsWith("/admin") || search.redirect.startsWith("/client") || search.redirect.startsWith("/book/")) ? search.redirect : void 0
  }),
  head: () => ({
    meta: [{
      title: headT("Créer un compte - Marina Cap Monastir", "Create an account - Marina Cap Monastir")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$A, "component")
});
const $$splitComponentImporter$z = () => import("./presentation-AxFsDBzs.mjs");
const Route$A = createFileRoute("/presentation")({
  head: () => ({
    meta: [{
      title: headT("Présentation - Marina Cap Monastir", "About - Marina Cap Monastir")
    }, {
      name: "description",
      content: headT("Présentation de Marina Cap Monastir, appart-hôtel et port de plaisance à Monastir.", "About Marina Cap Monastir, aparthotel and marina in Monastir.")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$z, "component")
});
const $$splitComponentImporter$y = () => import("./port-de-plaisance-isI1vuKy.mjs");
const Route$z = createFileRoute("/port-de-plaisance")({
  head: () => ({
    meta: [{
      title: headT("Port de Plaisance - Marina Cap Monastir", "Marina - Marina Cap Monastir")
    }, {
      name: "description",
      content: headT("Découvrez le port de plaisance de Marina Cap Monastir : 300 anneaux, escale, passage, hivernage, régates et surveillance 24h/24.", "Discover the Marina Cap Monastir harbour: 300 berths, port of call, transit, wintering, regattas and 24/7 security.")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$y, "component")
});
const $$splitComponentImporter$x = () => import("./login-CfgnJ2uz.mjs");
const Route$y = createFileRoute("/login")({
  validateSearch: (search) => ({
    redirect: typeof search.redirect === "string" && (search.redirect.startsWith("/admin") || search.redirect.startsWith("/client") || search.redirect.startsWith("/book/")) ? search.redirect : void 0
  }),
  head: () => ({
    meta: [{
      title: headT("Connexion - Marina Cap Monastir", "Sign in - Marina Cap Monastir")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$x, "component")
});
const VALID_ROLES = ["admin", "owner", "client", "capitainerie"];
function isValidRole(role) {
  return typeof role === "string" && VALID_ROLES.includes(role);
}
function isAdminRole(role) {
  return role === "admin" || role === "owner";
}
function getDefaultPathForRole(role) {
  if (role === "capitainerie") return "/admin/port-tarifs";
  return isAdminRole(role) ? "/admin" : "/client";
}
async function signInWithPasswordAndProfile(email, password) {
  const supabase = await requireSupabaseClient$1();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password
  });
  if (error) throw new Error(error.message || tr("Connexion impossible.", "Sign-in failed."));
  if (!data.user || !data.session) throw new Error(tr("Connexion impossible.", "Sign-in failed."));
  const profile = await fetchProfileForUser(data.user);
  if (!profile) {
    await supabase.auth.signOut();
    throw new Error(tr("Profil utilisateur introuvable.", "User profile not found."));
  }
  return { session: data.session, user: data.user, profile };
}
async function registerClient(input) {
  const supabase = await requireSupabaseClient$1();
  const email = input.email.trim().toLowerCase();
  const fullName = input.fullName.trim();
  const phone = input.phone?.trim() ?? "";
  const emailRedirectTo = typeof window !== "undefined" ? `${window.location.origin}/client/login` : "https://marina-six-iota.vercel.app/client/login";
  const { data, error } = await supabase.auth.signUp({
    email,
    password: input.password,
    options: {
      emailRedirectTo,
      data: {
        full_name: fullName,
        phone,
        role: "client"
      }
    }
  });
  if (error) throw new Error(error.message || tr("Inscription impossible.", "Sign-up failed."));
  if (!data.user) throw new Error(tr("Inscription impossible.", "Sign-up failed."));
  if (!data.session) {
    return { needsEmailConfirmation: true, profile: null };
  }
  const profile = await ensureClientProfile(data.user, { fullName, email });
  return { needsEmailConfirmation: false, profile };
}
async function signOut() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message || tr("Déconnexion impossible.", "Sign-out failed."));
}
async function getCurrentSessionProfile() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return null;
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw new Error(sessionError.message || "Session indisponible.");
  if (!sessionData.session) return null;
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw new Error(userError.message || "Utilisateur indisponible.");
  if (!userData.user) return null;
  const profile = await fetchProfileForUser(userData.user);
  if (!profile) return null;
  return { session: sessionData.session, user: userData.user, profile };
}
async function getCurrentProfile() {
  const context = await getCurrentSessionProfile();
  return context?.profile ?? null;
}
async function requireProfileRole(roles, pathname = "/") {
  const context = await getCurrentSessionProfile();
  if (!context) {
    throw redirect({
      to: "/login",
      search: { redirect: pathname }
    });
  }
  if (!roles.includes(context.profile.role)) {
    throw redirect({ to: getDefaultPathForRole(context.profile.role) });
  }
  return context;
}
async function fetchProfileForUser(user) {
  const supabase = await requireSupabaseClient$1();
  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  if (error) throw mapSupabaseError(error);
  if (!data) {
    return null;
  }
  if (!isValidRole(data.role)) {
    return null;
  }
  return mapProfile(data);
}
async function ensureClientProfile(user, fallback) {
  const supabase = await requireSupabaseClient$1();
  const email = (fallback?.email ?? user.email ?? "").trim().toLowerCase();
  if (!email) throw new Error(tr("Email client introuvable.", "Guest email not found."));
  const existing = await fetchProfileForUser(user);
  if (existing) {
    if (existing.role !== "client") {
      throw new Error(tr("Ce compte n'est pas un compte client.", "This is not a guest account."));
    }
    return existing;
  }
  const fullName = fallback?.fullName?.trim() || readMetadataString(user, "full_name") || readMetadataString(user, "name") || email;
  const payload = {
    id: user.id,
    full_name: fullName,
    email,
    role: "client"
  };
  const { data, error } = await supabase.from("profiles").insert(payload).select("*").single();
  if (error) throw mapSupabaseError(error);
  return mapProfile(data);
}
function mapSupabaseError(error) {
  if (isPermissionError$4(error)) {
    return new Error("Permission Supabase refusee. Verifiez les policies RLS profiles/messages.");
  }
  return new Error(getErrorDetail$4(error) ?? "Erreur Supabase inconnue.");
}
async function requireSupabaseClient$1() {
  const supabase = await getSupabaseOrNull();
  if (!supabase)
    throw new Error(tr("Supabase n'est pas configuré.", "Supabase is not configured."));
  return supabase;
}
function mapProfile(row) {
  return {
    id: row.id,
    userId: row.id,
    fullName: row.full_name ?? row.email ?? "Utilisateur",
    name: row.full_name ?? row.email ?? "Utilisateur",
    email: row.email ?? "",
    role: row.role,
    active: true,
    createdAt: row.created_at
  };
}
function readMetadataString(user, key) {
  const value = user.user_metadata?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
function getErrorDetail$4(error) {
  if (!error) return null;
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  const maybeError = error;
  const parts = [maybeError.message, maybeError.details, maybeError.hint, maybeError.code].filter(
    Boolean
  );
  return parts.length ? parts.join(" | ") : JSON.stringify(error);
}
function isPermissionError$4(error) {
  const maybeError = error;
  const haystack = [maybeError?.message, maybeError?.details, maybeError?.code].filter(Boolean).join(" ").toLowerCase();
  return maybeError?.code === "42501" || maybeError?.status === 401 || maybeError?.status === 403 || haystack.includes("permission") || haystack.includes("row-level security") || haystack.includes("rls") || haystack.includes("not authorized");
}
async function getHotelSettings() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return hotelSettings;
  try {
    const { data, error } = await supabase.from("hotel_settings").select("*").order("created_at").limit(1).maybeSingle();
    if (error) throw error;
    if (!data) return hotelSettings;
    Object.assign(hotelSettings, mapHotelSettingsFromDb(data));
    return hotelSettings;
  } catch (error) {
    warnSupabaseFallback("hotel settings query", error);
    return hotelSettings;
  }
}
async function updateHotelSettings(next) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return updateHotelSettingsInMock(next);
  try {
    const { data: existing, error: existingError } = await supabase.from("hotel_settings").select("id").order("created_at").limit(1).maybeSingle();
    if (existingError) throw existingError;
    if (!existing) return updateHotelSettingsInMock(next);
    const { data, error } = await supabase.from("hotel_settings").update(mapHotelSettingsToDb(next)).eq("id", existing.id).select("*").single();
    if (error) throw error;
    Object.assign(hotelSettings, mapHotelSettingsFromDb(data));
    return hotelSettings;
  } catch (error) {
    warnSupabaseFallback("hotel settings update", error);
    return updateHotelSettingsInMock(next);
  }
}
function updateHotelSettingsInMock(next) {
  Object.assign(hotelSettings, next);
  return hotelSettings;
}
function resolveLogoUrl(rawLogoUrl) {
  if (!rawLogoUrl || rawLogoUrl.endsWith("/assets/marina-logo.png") || rawLogoUrl === "marina-logo.png") {
    return hotelSettings.logoUrl;
  }
  return rawLogoUrl;
}
function resolveHeroUrl(rawHeroUrl) {
  if (!rawHeroUrl || rawHeroUrl.endsWith("/assets/hero-marina.jpg") || rawHeroUrl === "hero-marina.jpg") {
    return hotelSettings.heroUrl;
  }
  return rawHeroUrl;
}
function mapHotelSettingsFromDb(row) {
  return {
    hotelName: row.hotel_name,
    logoUrl: resolveLogoUrl(row.logo_url),
    heroUrl: resolveHeroUrl(row.hero_url),
    phone: row.phone,
    fax: row.fax ?? hotelSettings.fax,
    email: row.email,
    marketingEmail: row.marketing_email ?? hotelSettings.marketingEmail,
    capitainerieEmail: row.capitainerie_email ?? hotelSettings.capitainerieEmail,
    capitaineriePhones: row.capitainerie_phones ?? hotelSettings.capitaineriePhones,
    address: row.address,
    taxRegistration: row.tax_registration,
    invoicePrefix: row.invoice_prefix,
    defaultCurrency: row.default_currency,
    checkInTime: row.check_in_time,
    checkOutTime: row.check_out_time,
    taxRate: Number(row.tax_rate),
    depositPercentage: Number(row.deposit_percentage)
  };
}
function mapHotelSettingsToDb(settings) {
  return {
    hotel_name: settings.hotelName,
    logo_url: settings.logoUrl,
    hero_url: settings.heroUrl,
    phone: settings.phone,
    fax: settings.fax,
    email: settings.email,
    marketing_email: settings.marketingEmail,
    capitainerie_email: settings.capitainerieEmail,
    capitainerie_phones: settings.capitaineriePhones,
    address: settings.address,
    tax_registration: settings.taxRegistration,
    invoice_prefix: settings.invoicePrefix,
    default_currency: settings.defaultCurrency,
    check_in_time: settings.checkInTime,
    check_out_time: settings.checkOutTime,
    tax_rate: settings.taxRate,
    deposit_percentage: settings.depositPercentage
  };
}
const $$splitComponentImporter$w = () => import("./contact-BhJUxFhX.mjs");
const Route$x = createFileRoute("/contact")({
  loader: async () => {
    const [settings, userProfile] = await Promise.all([getHotelSettings(), getCurrentProfile().catch(() => null)]);
    return {
      settings,
      userProfile
    };
  },
  head: () => ({
    meta: [{
      title: headT("Contacter - Marina Cap Monastir", "Contact us - Marina Cap Monastir")
    }, {
      name: "description",
      content: headT("Contactez la réception et la capitainerie de Marina Cap Monastir.", "Contact the Marina Cap Monastir reception and harbour office.")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$w, "component")
});
const $$splitComponentImporter$v = () => import("./confirmation-BFnG5LGq.mjs");
const Route$w = createFileRoute("/confirmation")({
  validateSearch: (search) => ({
    reservation: typeof search.reservation === "string" ? search.reservation : void 0
  }),
  head: () => ({
    meta: [{
      title: headT("Confirmation - Marina Cap Monastir", "Confirmation - Marina Cap Monastir")
    }, {
      name: "description",
      content: headT("Récapitulatif de votre réservation Marina Cap Monastir.", "Your Marina Cap Monastir booking summary.")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const publicClientRoutes = /* @__PURE__ */ new Set(["/client/login", "/client/register"]);
async function signOutClient() {
  await signOut();
}
async function getClientSessionProfile() {
  const context = await getCurrentSessionProfile();
  if (!context || context.profile.role !== "client") return null;
  return {
    session: context.session,
    user: context.user,
    profile: mapClientProfile(context.profile)
  };
}
async function requireClientSession(pathname = "/client") {
  const context = await getCurrentSessionProfile();
  if (!context) {
    throw redirect({
      to: "/login",
      search: { redirect: pathname }
    });
  }
  if (context.profile.role !== "client") {
    throw redirect({ to: getDefaultPathForRole(context.profile.role) });
  }
  return context.session;
}
async function linkGuestReservationsToClient() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return;
  try {
    const { error } = await supabase.rpc("link_guest_reservations_to_client");
    if (error && error.code !== "PGRST202" && error.code !== "42883" && false) ;
  } catch {
  }
}
function mapClientProfile(profile) {
  return {
    id: profile.id,
    userId: profile.userId,
    guestId: null,
    email: profile.email,
    fullName: profile.fullName,
    phone: null,
    active: true,
    createdAt: profile.createdAt,
    updatedAt: profile.createdAt
  };
}
const $$splitComponentImporter$u = () => import("./client-5w5URGuA.mjs");
const Route$v = createFileRoute("/client")({
  beforeLoad: async ({
    location
  }) => {
    if (publicClientRoutes.has(location.pathname)) return;
    await requireClientSession(location.pathname);
  },
  head: () => ({
    meta: [{
      title: headT("Portail client - Marina Cap Monastir", "Guest portal - Marina Cap Monastir")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const initialDraft = { adults: 2, children: 0 };
let draft = readDraft();
const bookingStore = {
  get: () => draft,
  set: (next) => {
    draft = { ...draft, ...next };
    writeDraft(draft);
  },
  rememberReservation: (reservationNumber) => {
    draft = { ...draft, reservationNumber };
    writeDraft(draft);
  },
  reset: () => {
    draft = { ...initialDraft };
    writeDraft(draft);
  }
};
function readDraft() {
  if (typeof window === "undefined") return { ...initialDraft };
  try {
    const raw = window.sessionStorage.getItem("marina-booking-draft");
    return raw ? { ...initialDraft, ...JSON.parse(raw) } : { ...initialDraft };
  } catch {
    return { ...initialDraft };
  }
}
function writeDraft(next) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem("marina-booking-draft", JSON.stringify(next));
}
async function getBookingQuote(room, checkIn, checkOut) {
  const fallbackBreakdown = calculateTotal(room, checkIn, checkOut);
  const emptyRules = {
    rates: [],
    priceByDate: /* @__PURE__ */ new Map(),
    statusByDate: /* @__PURE__ */ new Map(),
    minNights: 1,
    blockingDates: []
  };
  if (!checkIn || !checkOut) {
    return {
      breakdown: fallbackBreakdown,
      availability: 0,
      canBook: false,
      loading: false,
      minNights: 1,
      rules: emptyRules,
      nightlyRates: [],
      reason: null
    };
  }
  if (checkIn >= checkOut) {
    return {
      breakdown: fallbackBreakdown,
      availability: 0,
      canBook: false,
      loading: false,
      minNights: 1,
      rules: emptyRules,
      nightlyRates: [],
      reason: tr(
        "La date de départ doit être supérieure à la date d'arrivée.",
        "The check-out date must be after the check-in date."
      )
    };
  }
  const rules = await getRoomDateRangeRules(room.id, checkIn, checkOut);
  const breakdown = calculateDateRangeTotal(rules, checkIn, checkOut, room.pricePerNight);
  const nightlyRates = buildNightlyRateBreakdown(rules, checkIn, checkOut, room.pricePerNight);
  const availability = await getRoomAvailability(room, checkIn, checkOut);
  const reason = getUnbookableReason(breakdown, availability, rules);
  return {
    breakdown,
    availability,
    canBook: !reason,
    loading: false,
    minNights: rules.minNights,
    rules,
    nightlyRates,
    reason
  };
}
function getUnbookableReason(breakdown, availability, rules) {
  if (breakdown.nights <= 0) return tr("Sélectionnez des dates valides.", "Select valid dates.");
  if (rules.blockingDates.length > 0) {
    return formatBlockedDatesMessage(rules.blockingDates);
  }
  if (breakdown.nights < rules.minNights) {
    return tr(
      `Séjour minimum de ${rules.minNights} nuit${rules.minNights > 1 ? "s" : ""} sur ces dates.`,
      `Minimum stay of ${rules.minNights} night${rules.minNights > 1 ? "s" : ""} on these dates.`
    );
  }
  if (availability <= 0) {
    return tr("Aucune unité disponible pour ces dates.", "No units available for these dates.");
  }
  return null;
}
function formatBlockedDatesMessage(blockingDates) {
  if (blockingDates.length === 0) return tr("Dates indisponibles.", "Dates unavailable.");
  const dates = blockingDates.map((b) => b.date).sort();
  const formatDateFr = (isoStr) => {
    const [y, m, d] = isoStr.split("-");
    return `${d}/${m}/${y}`;
  };
  const formatDateShortFr = (isoStr) => {
    const [y, m, d] = isoStr.split("-");
    return `${d}/${m}`;
  };
  if (dates.length === 1) {
    return tr(
      `La date du ${formatDateFr(dates[0])} est indisponible. Veuillez consulter le calendrier.`,
      `${formatDateFr(dates[0])} is unavailable. Please check the calendar.`
    );
  }
  let isConsecutive = true;
  for (let i = 0; i < dates.length - 1; i++) {
    const current = /* @__PURE__ */ new Date(`${dates[i]}T12:00:00`);
    const next = /* @__PURE__ */ new Date(`${dates[i + 1]}T12:00:00`);
    const diff = (next.getTime() - current.getTime()) / (1e3 * 60 * 60 * 24);
    if (Math.round(diff) !== 1) {
      isConsecutive = false;
      break;
    }
  }
  if (isConsecutive) {
    const start = formatDateShortFr(dates[0]);
    const end = formatDateFr(dates[dates.length - 1]);
    return tr(
      `Dates indisponibles du ${start} au ${end}. Veuillez consulter le calendrier.`,
      `Dates unavailable from ${start} to ${end}. Please check the calendar.`
    );
  }
  const listStr = dates.map(formatDateShortFr).join(", ");
  return tr(
    `Dates indisponibles (${listStr}). Veuillez consulter le calendrier.`,
    `Dates unavailable (${listStr}). Please check the calendar.`
  );
}
async function listReservations() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return reservations;
  try {
    const [reservationsResult, guestsResult] = await Promise.all([
      supabase.from("reservations").select("*").order("check_in", { ascending: false }),
      supabase.from("guests").select("*"),
      listRoomTypes()
    ]);
    if (reservationsResult.error) throw reservationsResult.error;
    if (guestsResult.error) throw guestsResult.error;
    const guestsById = new Map(
      (guestsResult.data ?? []).map((guest) => [guest.id, mapGuestFromDb(guest)])
    );
    replaceArray(
      reservations,
      (reservationsResult.data ?? []).map(
        (reservation) => mapReservationFromDb(reservation, guestsById.get(reservation.guest_id))
      )
    );
    return reservations;
  } catch (error) {
    warnSupabaseFallback("reservation query", error);
    return reservations;
  }
}
async function getReservation(reservationNumber) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return getReservationByNumber(reservationNumber);
  try {
    const { data: reservationRow, error: reservationError } = await supabase.from("reservations").select("*").eq("reservation_number", reservationNumber).maybeSingle();
    if (reservationError) throw reservationError;
    if (!reservationRow) return getReservationByNumber(reservationNumber);
    const { data: guestRow, error: guestError } = await supabase.from("guests").select("*").eq("id", reservationRow.guest_id).maybeSingle();
    if (guestError) throw guestError;
    const mapped = mapReservationFromDb(
      reservationRow,
      mapGuestFromDb(guestRow, reservationRow.guest_id)
    );
    upsertReservationInMock(mapped);
    return mapped;
  } catch (error) {
    warnSupabaseFallback("reservation lookup", error);
    return getReservationByNumber(reservationNumber);
  }
}
async function createClientReservation(input) {
  const room = await getRoomType(input.roomId);
  if (!room) throw new Error(tr("Chambre introuvable.", "Room not found."));
  const quote = await getBookingQuote(room, input.checkIn, input.checkOut);
  if (!quote.canBook) {
    throw new Error(quote.reason ?? "Aucune unite disponible pour ces dates.");
  }
  const supabase = await getSupabaseOrNull();
  if (!supabase)
    throw new Error(tr("Supabase n'est pas configuré.", "Supabase is not configured."));
  const rpcArgs = {
    p_room_type_id: input.roomId,
    p_check_in: input.checkIn,
    p_check_out: input.checkOut,
    p_adults: input.adults,
    p_children: input.children,
    p_phone: input.phone ?? null,
    p_country: input.country ?? null,
    p_cin_passport: input.identityNumber ?? null,
    p_special_requests: input.specialRequests ?? null
  };
  try {
    const rpc = supabase.rpc;
    const result = await rpc(
      "create_client_reservation",
      rpcArgs
    );
    if (!result.error && result.data) {
      const rpcResult = normalizeRpcResult(result.data);
      const fetched = await getReservation(rpcResult.reservation_number);
      if (fetched) {
        upsertReservationInMock(fetched);
        bookingStore.rememberReservation(fetched.reservationNumber);
        return fetched;
      }
    }
  } catch {
  }
  const userResult = await supabase.auth.getUser();
  const user = userResult.data.user;
  if (!user)
    throw new Error(
      tr("Vous devez être connecté pour réserver.", "You must be signed in to book.")
    );
  const resId = crypto.randomUUID();
  const resNum = `RES-${resId.slice(0, 8).toUpperCase()}`;
  const nights = quote.breakdown.nights || 1;
  const total = quote.breakdown.totalPrice || room.pricePerNight * nights;
  const deposit = Math.round(total * 0.3);
  let targetGuestId = user.id;
  const { error: guestUpsertErr } = await supabase.from("guests").upsert(
    {
      id: user.id,
      full_name: user.user_metadata?.full_name || user.email || "Client",
      email: user.email,
      phone: input.phone || null
    },
    { onConflict: "id" }
  );
  if (guestUpsertErr) {
    const { data: existingGuest } = await supabase.from("guests").select("id").eq("email", user.email).maybeSingle();
    if (existingGuest?.id) {
      targetGuestId = existingGuest.id;
    } else {
      const { data: newGuest } = await supabase.from("guests").insert({
        full_name: user.user_metadata?.full_name || user.email || "Client",
        email: user.email,
        phone: input.phone || null
      }).select("id").maybeSingle();
      if (newGuest?.id) {
        targetGuestId = newGuest.id;
      }
    }
  }
  const { error: insertError } = await supabase.from("reservations").insert({
    id: resId,
    reservation_number: resNum,
    room_type_id: input.roomId,
    guest_id: targetGuestId,
    check_in: input.checkIn,
    check_out: input.checkOut,
    adults: input.adults,
    children: input.children,
    nights,
    status: "pending",
    price_per_night: room.pricePerNight,
    total,
    deposit,
    remaining_amount: total - deposit,
    special_requests: input.specialRequests || null
  });
  if (insertError) throw new Error(insertError.message || "Impossible de creer la reservation.");
  const created = await getReservation(resNum);
  if (!created) {
    const fallbackRes = {
      id: resId,
      reservationNumber: resNum,
      roomId: input.roomId,
      guest: {
        id: user.id,
        fullName: user.user_metadata?.full_name || user.email || "Client",
        email: user.email || "",
        phone: input.phone || "",
        country: input.country || "",
        identityNumber: input.identityNumber || "",
        active: true,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      checkIn: input.checkIn,
      checkOut: input.checkOut,
      adults: input.adults,
      children: input.children,
      status: "pending",
      pricePerNight: room.pricePerNight,
      taxes: 0,
      total,
      deposit,
      remainingAmount: total - deposit,
      specialRequests: input.specialRequests || "",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    upsertReservationInMock(fallbackRes);
    bookingStore.rememberReservation(resNum);
    return fallbackRes;
  }
  upsertReservationInMock(created);
  bookingStore.rememberReservation(resNum);
  return created;
}
async function setReservationStatus(reservationId, status) {
  const supabase = await getSupabaseOrNull();
  if (!supabase)
    throw new Error(tr("Supabase n'est pas configuré.", "Supabase is not configured."));
  const { data, error } = await supabase.from("reservations").update({ status }).eq("id", reservationId).select("*").single();
  if (error) throw error;
  const existing = reservations.find((reservation) => reservation.id === reservationId);
  if (existing) existing.status = data.status;
  return existing;
}
async function assignRoomUnit(reservationId, roomUnitId) {
  const supabase = await getSupabaseOrNull();
  if (!supabase)
    throw new Error(tr("Supabase n'est pas configuré.", "Supabase is not configured."));
  const { error } = await supabase.from("reservations").update({ room_unit_id: roomUnitId }).eq("id", reservationId);
  if (error) throw error;
}
function upsertReservationInMock(reservation) {
  const index = reservations.findIndex((item) => item.id === reservation.id);
  if (index >= 0) reservations[index] = reservation;
  else reservations.unshift(reservation);
}
function normalizeRpcResult(data) {
  const result = Array.isArray(data) ? data[0] : data;
  if (!result?.reservation_number) {
    throw new Error(
      tr(
        "La réservation n'a pas retourné de numéro de réservation.",
        "The booking did not return a booking number."
      )
    );
  }
  return result;
}
async function listPayments() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return payments;
  try {
    const { data, error } = await supabase.from("payments").select("*").order("updated_at", { ascending: false });
    if (error) throw error;
    replaceArray(payments, (data ?? []).map(mapPaymentFromDb));
    return payments;
  } catch (error) {
    warnSupabaseFallback("payment query", error);
    return payments;
  }
}
async function getPaymentForReservation(reservationId) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return payments.find((payment) => payment.reservationId === reservationId);
  try {
    const { data, error } = await supabase.from("payments").select("*").eq("reservation_id", reservationId).order("updated_at", { ascending: false }).limit(1).maybeSingle();
    if (error) throw error;
    if (!data) return payments.find((payment) => payment.reservationId === reservationId);
    const mapped = mapPaymentFromDb(data);
    upsertPaymentInMock(mapped);
    return mapped;
  } catch (error) {
    warnSupabaseFallback("reservation payment lookup", error);
    return payments.find((payment) => payment.reservationId === reservationId);
  }
}
function calculatePaidAmount(reservationId) {
  const reservationPayments = payments.filter(
    (payment) => payment.reservationId === reservationId && payment.status !== "refunded"
  );
  if (reservationPayments.length) {
    return reservationPayments.reduce((sum, payment) => sum + payment.amount, 0);
  }
  return reservations.find((item) => item.id === reservationId)?.paidAmount ?? 0;
}
function calculateRemainingAmount(reservationId) {
  const reservation = reservations.find((item) => item.id === reservationId);
  if (!reservation) return 0;
  return Math.max(0, reservation.total - calculatePaidAmount(reservationId));
}
async function setPaymentStatus(reservationId, status) {
  const supabase = await getSupabaseOrNull();
  if (!supabase)
    throw new Error(tr("Supabase n'est pas configuré.", "Supabase is not configured."));
  const reservationItems = await listReservations();
  const reservation = reservationItems.find((item) => item.id === reservationId);
  if (!reservation)
    throw new Error(
      tr(`Réservation ${reservationId} introuvable.`, `Booking ${reservationId} not found.`)
    );
  const amount = status === "paid" ? reservation.total : status === "deposit_paid" ? reservation.deposit : 0;
  const paidAmount = status === "refunded" ? 0 : amount;
  const remainingAmount = Math.max(0, reservation.total - paidAmount);
  const existingPayment = await getPaymentForReservation(reservationId);
  let mappedPayment;
  if (existingPayment) {
    const { data, error } = await supabase.from("payments").update({
      amount,
      status,
      method: existingPayment.method,
      paid_at: status === "paid" || status === "deposit_paid" ? (/* @__PURE__ */ new Date()).toISOString() : null
    }).eq("id", existingPayment.id).select("*").single();
    if (error) throw error;
    mappedPayment = mapPaymentFromDb(data);
    upsertPaymentInMock(mappedPayment);
  } else if (status !== "unpaid") {
    const { data, error } = await supabase.from("payments").insert({
      reservation_id: reservationId,
      amount,
      status,
      method: "online",
      paid_at: status === "paid" || status === "deposit_paid" ? (/* @__PURE__ */ new Date()).toISOString() : null
    }).select("*").single();
    if (error) throw error;
    mappedPayment = mapPaymentFromDb(data);
    upsertPaymentInMock(mappedPayment);
  }
  const { error: reservationError } = await supabase.from("reservations").update({
    payment_status: status,
    paid_amount: paidAmount,
    remaining_amount: remainingAmount
  }).eq("id", reservationId);
  if (reservationError) throw reservationError;
  reservation.paymentStatus = status;
  reservation.paidAmount = paidAmount;
  reservation.remainingAmount = remainingAmount;
  return mappedPayment;
}
function upsertPaymentInMock(payment) {
  const index = payments.findIndex((item) => item.id === payment.id);
  if (index >= 0) payments[index] = payment;
  else payments.unshift(payment);
}
function getTodayIso() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
async function getOccupancyRate(date = getTodayIso()) {
  const roomTypes = await listRoomTypes();
  const checkOut = nextDayIso$1(date);
  const totalUnits = roomTypes.reduce((sum, room) => sum + room.totalUnits, 0);
  const availableUnits = await getAvailableUnitsForDate(date, checkOut);
  const occupiedUnits = Math.max(0, totalUnits - availableUnits);
  return totalUnits > 0 ? Math.round(occupiedUnits / totalUnits * 100) : 0;
}
async function getMonthlyRevenueStats(month = getTodayIso().slice(0, 7)) {
  const [reservationItems, paymentItems, roomTypes] = await Promise.all([
    listReservations(),
    listPayments(),
    listRoomTypes()
  ]);
  const paidReservations = reservationItems.filter(
    (reservation) => reservation.checkIn.startsWith(month) && reservation.paymentStatus === "paid"
  );
  const revenue = paidReservations.reduce((sum, reservation) => sum + reservation.total, 0);
  const soldNights = paidReservations.reduce((sum, reservation) => sum + reservation.nights, 0);
  const totalUnits = roomTypes.reduce((sum, room) => sum + room.totalUnits, 0);
  const adr = soldNights > 0 ? Math.round(revenue / soldNights) : 0;
  const revpar = totalUnits > 0 ? Math.round(revenue / totalUnits) : 0;
  const unpaidAmount = reservationItems.filter(
    (reservation) => reservation.paymentStatus !== "paid" && reservation.paymentStatus !== "refunded"
  ).reduce((sum, reservation) => {
    const paid = paymentItems.filter(
      (payment) => payment.reservationId === reservation.id && payment.status !== "refunded"
    ).reduce((paymentSum, payment) => paymentSum + payment.amount, 0);
    return sum + Math.max(0, reservation.total - paid);
  }, 0);
  return { month, revenue, adr, revpar, unpaidAmount };
}
async function getRevenueBySource() {
  const reservationItems = await listReservations();
  return Object.entries(channelLabels).map(([source, label]) => ({
    source,
    label,
    revenue: reservationItems.filter(
      (reservation) => reservation.source === source && reservation.paymentStatus === "paid"
    ).reduce((sum, reservation) => sum + reservation.total, 0)
  }));
}
async function getBestSellingRooms() {
  const [roomTypes, reservationItems] = await Promise.all([listRoomTypes(), listReservations()]);
  return roomTypes.map((room) => ({
    room,
    reservations: reservationItems.filter((reservation) => reservation.roomId === room.id).length,
    revenue: reservationItems.filter((reservation) => reservation.roomId === room.id).reduce((sum, reservation) => sum + reservation.total, 0)
  })).sort((a, b) => b.reservations - a.reservations);
}
async function getTodayCheckIns(today2 = getTodayIso()) {
  const reservationItems = await listReservations();
  return reservationItems.filter(
    (reservation) => reservation.checkIn === today2 && reservation.status === "confirmed"
  );
}
async function getTodayCheckOuts(today2 = getTodayIso()) {
  const reservationItems = await listReservations();
  return reservationItems.filter(
    (reservation) => reservation.checkOut === today2 && reservation.status === "checked_in"
  );
}
async function getAvailableUnitsForDate(checkIn, checkOut = nextDayIso$1(checkIn)) {
  const roomTypes = await listRoomTypes();
  const availability = await Promise.all(
    roomTypes.map((room) => getRoomAvailability(room, checkIn, checkOut))
  );
  return availability.reduce((sum, available) => sum + available, 0);
}
function nextDayIso$1(date) {
  const nextDate = /* @__PURE__ */ new Date(`${date}T12:00:00`);
  nextDate.setDate(nextDate.getDate() + 1);
  return nextDate.toISOString().slice(0, 10);
}
const emptyDashboardErrors = {
  reservations: null,
  rooms: null,
  payments: null,
  invoices: null,
  guests: null,
  alerts: null,
  statistics: null
};
function defaultRevenueStats(today2) {
  return {
    month: today2.slice(0, 7),
    revenue: 0,
    adr: 0,
    revpar: 0,
    unpaidAmount: 0
  };
}
function defaultStats(today2) {
  return {
    today: today2,
    monthlyStats: defaultRevenueStats(today2),
    revenueBySource: [],
    availableToday: 0,
    arrivals: [],
    departures: [],
    currentGuests: []
  };
}
function emptyDashboardData(today2 = getTodayIso()) {
  return {
    reservations: [],
    rooms: [],
    payments: [],
    invoices: [],
    guests: [],
    alerts: [],
    stats: defaultStats(today2)
  };
}
function asArray(value) {
  return Array.isArray(value) ? value : [];
}
function safeNumber(value) {
  const number = Number(value ?? 0);
  return Number.isFinite(number) ? number : 0;
}
function safeDateString(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : "";
}
const CAPITAINERIE_PATH = "/admin/port-tarifs";
function isAdminAppRole(role) {
  return role === "admin" || role === "owner" || role === "capitainerie";
}
async function signOutAdmin() {
  await signOut();
}
async function getCurrentAdminProfile() {
  const profile = await getCurrentProfile();
  if (!profile || !isAdminAppRole(profile.role)) return null;
  return mapAdminProfile(profile);
}
function canAccessAdmin(role, pathname = "/admin") {
  if (pathname === "/admin/login") return true;
  if (role === "admin" || role === "owner") return true;
  if (role === "capitainerie") {
    return pathname === CAPITAINERIE_PATH || pathname.startsWith(`${CAPITAINERIE_PATH}/`);
  }
  return false;
}
async function requireAdmin(pathname = "/admin") {
  const context = await requireProfileRole(["admin", "owner", "capitainerie"], pathname);
  const profile = mapAdminProfile(context.profile);
  if (!canAccessAdmin(profile.role, pathname)) {
    throw redirect({ to: getDefaultAdminPath(profile.role) });
  }
  return profile;
}
function getDefaultAdminPath(role) {
  return role === "capitainerie" ? CAPITAINERIE_PATH : "/admin";
}
function mapAdminProfile(profile) {
  return {
    id: profile.id,
    userId: profile.userId,
    name: profile.fullName,
    email: profile.email,
    role: profile.role,
    active: true
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const LOCALES = [
  { id: "fr", label: "FR", name: "Français" },
  { id: "en", label: "EN", name: "English" }
];
function LanguageSwitch({
  className = "",
  variant = "compact"
}) {
  const { locale, setLocale } = useI18n();
  if (variant === "segmented") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "group",
        "aria-label": "Langue / Language",
        className: cn(
          "inline-flex h-10 shrink-0 items-stretch rounded-lg border border-border bg-white p-0.5 shadow-sm",
          className
        ),
        children: LOCALES.map((option) => {
          const active = option.id === locale;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              lang: option.id,
              "aria-pressed": active,
              title: option.name,
              onClick: () => !active && setLocale(option.id),
              className: cn(
                "flex min-w-10 flex-1 items-center justify-center rounded-md px-2.5 text-xs font-black tracking-wide transition",
                active ? "bg-primary text-primary-foreground shadow-sm" : "text-primary hover:bg-primary/5"
              ),
              children: option.label
            },
            option.id
          );
        })
      }
    );
  }
  const next = locale === "fr" ? "en" : "fr";
  const label = next === "en" ? "Switch to English" : "Passer en français";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => setLocale(next),
      title: label,
      "aria-label": label,
      lang: next,
      className: cn(
        "inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-white px-2.5 text-xs font-black uppercase tracking-wide text-primary shadow-sm transition hover:border-primary/40 hover:bg-primary/5",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "size-4 sm:hidden" }),
        next,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "normal-case sm:hidden", children: [
          "— ",
          next === "en" ? "English" : "Français"
        ] })
      ]
    }
  );
}
const reservationStatusLabelsEn = {
  pending: "Pending",
  confirmed: "Confirmed",
  checked_in: "Checked in",
  checked_out: "Checked out",
  cancelled: "Cancelled",
  no_show: "No-show"
};
const paymentStatusLabelsEn = {
  unpaid: "Unpaid",
  deposit_paid: "Deposit paid",
  paid: "Paid",
  refunded: "Refunded"
};
const channelLabelsEn = {
  admin: "Admin",
  direct: "Direct",
  booking_com: "Booking.com",
  airbnb: "Airbnb",
  expedia: "Expedia",
  phone: "Phone",
  walk_in: "Walk-in"
};
const paymentMethodLabels = {
  fr: {
    cash: "Espèces",
    card: "Carte",
    bank_transfer: "Virement",
    online: "En ligne",
    booking_com_payout: "Versement Booking.com",
    airbnb_payout: "Versement Airbnb",
    expedia_payout: "Versement Expedia"
  },
  en: {
    cash: "Cash",
    card: "Card",
    bank_transfer: "Bank transfer",
    online: "Online",
    booking_com_payout: "Booking.com payout",
    airbnb_payout: "Airbnb payout",
    expedia_payout: "Expedia payout"
  }
};
function getReservationStatusLabels(locale) {
  return locale === "en" ? reservationStatusLabelsEn : reservationStatusLabels;
}
function getPaymentStatusLabels(locale) {
  return locale === "en" ? paymentStatusLabelsEn : paymentStatusLabels;
}
function getChannelLabels(locale) {
  return locale === "en" ? channelLabelsEn : channelLabels;
}
function getPaymentMethodLabels(locale) {
  return paymentMethodLabels[locale];
}
const CLIENT_MESSAGING_LOCKED_REASON_EN = "You need an aparthotel booking before contacting the administration.";
const SUBJECT_EN = {
  "Demande générale": "General enquiry",
  "Question réservation": "Booking question",
  "Paiement & Facture": "Payment & invoice",
  "Arrivée / Check-in": "Arrival / Check-in",
  "Demandes spéciales": "Special requests",
  "Reception Marina": "Marina reception",
  "Conversation client": "Guest conversation",
  Conversation: "Conversation",
  "Contact Reception": "Contact reception",
  "Réservation Appart-Hôtel": "Aparthotel booking",
  "Réservation Port de Plaisance": "Berth booking",
  Capitainerie: "Harbour office",
  "Demande spéciale": "Special request"
};
const ALERT_TITLES = {
  payment_pending: { fr: "Paiement en attente", en: "Payment pending" },
  arrival_today: { fr: "Arrivée aujourd'hui", en: "Arrival today" },
  departure_today: { fr: "Départ aujourd'hui", en: "Departure today" },
  overbooking_risk: { fr: "Risque de survente", en: "Overbooking risk" },
  maintenance_room: { fr: "Chambre en maintenance", en: "Room under maintenance" },
  channel_sync_error: { fr: "Erreur de synchronisation channel", en: "Channel sync error" },
  invoice_not_generated: { fr: "Facture à générer", en: "Invoice to generate" }
};
const ALERT_SEVERITY = {
  critical: { fr: "critique", en: "critical" },
  warning: { fr: "attention", en: "warning" },
  info: { fr: "info", en: "info" }
};
function localizeAlertTitle(alert, locale) {
  return ALERT_TITLES[alert.type]?.[locale] ?? alert.title;
}
function localizeAlertDescription(alert, locale) {
  return locale === "en" ? alert.descriptionEn ?? alert.description : alert.description;
}
function localizeAlertSeverity(severity, locale) {
  return ALERT_SEVERITY[severity]?.[locale] ?? severity;
}
const DEMO_TEXT_EN = {
  "Connexion Airbnb non configurée.": "Airbnb connection not configured.",
  "API partenaire Airbnb requise avant toute synchronisation réelle.": "Airbnb partner API required before any real synchronisation.",
  "Connexion Booking.com simulée.": "Simulated Booking.com connection.",
  "Disponibilités simulées envoyées vers Booking.com.": "Simulated availability sent to Booking.com.",
  "Parité tarifaire à vérifier avant connexion réelle.": "Rate parity to check before going live.",
  "Connexion Expedia en attente.": "Expedia connection pending.",
  "Identifiants Expedia absents dans cette maquette locale.": "Expedia credentials missing in this local prototype.",
  "Vérifier la parité tarifaire sur les appartements S+1.": "Check rate parity on the one-bedroom (S+1) apartments.",
  "Connexion API partenaire requise.": "Partner API connection required.",
  "Dernière synchronisation non configurée.": "Last synchronisation not configured."
};
const LOG_LEVEL = {
  info: { fr: "info", en: "info" },
  warning: { fr: "avertissement", en: "warning" },
  error: { fr: "erreur", en: "error" }
};
function translateDemoText(text, locale) {
  return locale === "fr" ? text : DEMO_TEXT_EN[text] ?? text;
}
function localizeLogLevel(level, locale) {
  return LOG_LEVEL[level]?.[locale] ?? level;
}
function localizeSubject(subject, locale) {
  return locale === "fr" ? subject : SUBJECT_EN[subject] ?? subject;
}
const ACTIVE_RESERVATION_STATUSES = [
  "pending",
  "confirmed",
  "checked_in"
];
async function listClientReservations() {
  const context = await requireClientContext();
  if (!context.profile?.active) return [];
  return fetchHotelReservations(context.user.id);
}
async function clientHasMessagingAccess() {
  const reservations2 = await listClientReservations();
  return reservations2.some(
    (reservation) => ACTIVE_RESERVATION_STATUSES.includes(reservation.status)
  );
}
const CLIENT_MESSAGING_LOCKED_REASON = "Vous devez avoir une réservation Appart-Hôtel avant de contacter l'administration.";
async function listClientConversations() {
  const context = await requireClientContext();
  const supabase = await requireMessagingSupabase();
  const client = profileFromClient(context.profile);
  const admins = await fetchAdminProfiles();
  if (admins.length === 0) return [];
  const { data, error } = await supabase.from("messages").select("*").or(`sender_id.eq.${client.id},receiver_id.eq.${client.id}`).order("created_at", { ascending: true }).limit(1e3);
  if (error) throw mapSupabaseError(error);
  const messages = data ?? [];
  const adminIdsWithMessages = unique(
    messages.map((message) => {
      if (message.sender_id === client.id) return message.receiver_id;
      if (message.receiver_id === client.id) return message.sender_id;
      return "";
    }).filter((id) => admins.some((admin) => admin.id === id))
  );
  const adminIds = adminIdsWithMessages.length > 0 ? adminIdsWithMessages : [admins[0].id];
  return adminIds.map((adminId) => {
    const admin = admins.find((item) => item.id === adminId);
    if (!admin) return null;
    const ownMessages = messages.filter((message) => isPairMessage(message, client.id, admin.id)).map((message) => mapMessage(message, client, admin));
    const latestMessage = ownMessages[ownMessages.length - 1] ?? null;
    return makeConversationSummary({
      id: admin.id,
      subject: "Reception Marina",
      client,
      other: admin,
      latestMessage,
      messages: ownMessages,
      perspective: "client"
    });
  }).filter((value) => Boolean(value)).sort(compareConversationSummaries);
}
async function listAdminConversations() {
  const admin = await requireAdminContext();
  const supabase = await requireMessagingSupabase();
  const [allClients, admins] = await Promise.all([fetchClientProfiles(), fetchAdminProfiles()]);
  if (allClients.length === 0) return [];
  const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: true }).limit(3e3);
  if (error) throw mapSupabaseError(error);
  const adminIds = new Set(admins.map((item) => item.id));
  const messages = (data ?? []).filter(
    (message) => adminIds.has(message.sender_id) && allClients.some((client) => client.id === message.receiver_id) || adminIds.has(message.receiver_id) && allClients.some((client) => client.id === message.sender_id)
  );
  const clientIdsWithMessages = new Set(
    messages.flatMap((message) => [message.sender_id, message.receiver_id]).filter((id) => !adminIds.has(id))
  );
  const clientIdsWithReservation = await fetchClientIdsWithReservation(
    allClients.map((client) => client.id)
  );
  const clients = allClients.filter(
    (client) => clientIdsWithReservation.has(client.id) || clientIdsWithMessages.has(client.id)
  );
  return clients.map((client) => {
    const ownMessages = messages.filter(
      (message) => message.sender_id === client.id && adminIds.has(message.receiver_id) || message.receiver_id === client.id && adminIds.has(message.sender_id)
    ).map((message) => mapMessage(message, client, admin));
    const latestMessage = ownMessages[ownMessages.length - 1] ?? null;
    return makeConversationSummary({
      id: client.id,
      subject: "Conversation client",
      client,
      other: admin,
      latestMessage,
      messages: ownMessages,
      perspective: "admin"
    });
  }).sort(compareConversationSummaries);
}
async function getMessages(conversationId) {
  const current = await requireCurrentProfile();
  const supabase = await requireMessagingSupabase();
  if (isAdminRole(current.role)) {
    const admins = await fetchAdminProfiles();
    const adminIds = new Set(admins.map((admin) => admin.id));
    const client = await fetchProfileById(conversationId);
    if (!client || client.role !== "client") return [];
    const { data: data2, error: error2 } = await supabase.from("messages").select("*").or(`sender_id.eq.${client.id},receiver_id.eq.${client.id}`).order("created_at", { ascending: true });
    if (error2) throw mapSupabaseError(error2);
    return (data2 ?? []).filter(
      (message) => message.sender_id === client.id && adminIds.has(message.receiver_id) || message.receiver_id === client.id && adminIds.has(message.sender_id)
    ).map((message) => mapMessage(message, client, current));
  }
  const other = await fetchProfileById(conversationId);
  if (!other || !isAdminRole(other.role)) return [];
  const { data, error } = await supabase.from("messages").select("*").or(
    `and(sender_id.eq.${current.id},receiver_id.eq.${other.id}),and(sender_id.eq.${other.id},receiver_id.eq.${current.id})`
  ).order("created_at", { ascending: true });
  if (error) throw mapSupabaseError(error);
  return (data ?? []).map((message) => mapMessage(message, current, other));
}
async function createConversation(input) {
  const current = await requireCurrentProfile();
  if (current.role === "client") {
    if (!await clientHasMessagingAccess()) throw new Error(tr(CLIENT_MESSAGING_LOCKED_REASON, CLIENT_MESSAGING_LOCKED_REASON_EN));
    const admins = await fetchAdminProfiles();
    const admin = admins[0];
    if (!admin) throw new Error(tr("Aucun compte admin disponible.", "No admin account available."));
    return makeConversation(admin.id, input.subject || "Reception Marina");
  }
  if (input.clientUserId) {
    const client = await fetchProfileById(input.clientUserId);
    if (client?.role === "client") return makeConversation(client.id, input.subject);
  }
  throw new Error(tr("Client introuvable.", "Guest not found."));
}
async function createConversationForClientReservation(_reservation) {
  return createConversation({ subject: "Question reservation" });
}
async function createConversationForAdminReservation(reservation) {
  const profile = await findClientProfileForGuest(reservation.guest.id, reservation.guest.email);
  if (!profile) {
    throw new Error(tr("Aucun compte client n'est lié à cette réservation.", "No guest account is linked to this booking."));
  }
  return {
    conversation: makeConversation(profile.userId, reservation.reservationNumber),
    linkedClientProfile: profile
  };
}
async function sendMessage(input) {
  const body = input.body.trim();
  if (!body) throw new Error(tr("Message requis.", "Message required."));
  const current = await requireCurrentProfile();
  if (current.role === "client" && !await clientHasMessagingAccess()) {
    throw new Error(tr(CLIENT_MESSAGING_LOCKED_REASON, CLIENT_MESSAGING_LOCKED_REASON_EN));
  }
  const supabase = await requireMessagingSupabase();
  const receiver = await resolveReceiver(current, input.conversationId);
  if (input.conversationId) markedAsReadConversationIds.delete(input.conversationId);
  markedAsReadConversationIds.delete(current.id);
  markedAsReadConversationIds.delete(receiver.id);
  const { data, error } = await supabase.from("messages").insert({
    sender_id: current.id,
    receiver_id: receiver.id,
    body,
    is_read: false
  }).select("*").single();
  if (error) throw mapSupabaseError(error);
  return mapMessage(data, current, receiver);
}
let activeConversationId = null;
const markedAsReadConversationIds = /* @__PURE__ */ new Set();
const READ_CONVERSATIONS_STORAGE_KEY = "marina_read_conversation_ids";
function getPersistedReadConversationIds() {
  if (typeof window === "undefined") return /* @__PURE__ */ new Set();
  try {
    const raw = localStorage.getItem(READ_CONVERSATIONS_STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : /* @__PURE__ */ new Set();
  } catch {
    return /* @__PURE__ */ new Set();
  }
}
function persistReadConversationId(id) {
  if (!id || typeof window === "undefined") return;
  try {
    markedAsReadConversationIds.add(id);
    const ids = getPersistedReadConversationIds();
    ids.add(id);
    localStorage.setItem(READ_CONVERSATIONS_STORAGE_KEY, JSON.stringify(Array.from(ids)));
  } catch {
  }
}
function isConversationRead(id) {
  if (markedAsReadConversationIds.has(id)) return true;
  return getPersistedReadConversationIds().has(id);
}
function setActiveConversationId(id) {
  activeConversationId = id;
  if (id) persistReadConversationId(id);
}
async function markConversationRead(conversationId, _readerRole) {
  if (!conversationId) return;
  activeConversationId = conversationId;
  persistReadConversationId(conversationId);
  const current = await requireCurrentProfile();
  const supabase = await requireMessagingSupabase();
  try {
    if (isAdminRole(current.role)) {
      await supabase.from("messages").update({ is_read: true }).eq("sender_id", conversationId).eq("is_read", false);
      await supabase.from("messages").update({ is_read: true }).eq("receiver_id", conversationId).eq("is_read", false);
      await supabase.from("reservation_messages").update({ is_read: true }).eq("is_read", false);
    } else {
      await supabase.from("messages").update({ is_read: true }).eq("receiver_id", current.id).eq("is_read", false);
      await supabase.from("reservation_messages").update({ is_read: true }).eq("is_read", false);
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("messages_marked_read", { detail: { conversationId } }));
    }
  } catch (err) {
  }
}
async function updateConversationStatus(conversationId, _status) {
  return makeConversation(conversationId, "Conversation client");
}
async function getUnreadAdminConversationCount() {
  const conversations = await listAdminConversations();
  return conversations.filter((conversation) => conversation.unreadAdminCount > 0).length;
}
async function getUnreadClientConversationCount() {
  const conversations = await listClientConversations();
  return conversations.filter((conversation) => conversation.unreadClientCount > 0).length;
}
async function findClientProfileForGuest(_guestId, email) {
  const normalizedEmail = email?.trim().toLowerCase();
  if (!normalizedEmail) return null;
  const supabase = await requireMessagingSupabase();
  const { data, error } = await supabase.from("profiles").select("*").eq("role", "client").ilike("email", normalizedEmail).order("created_at", { ascending: false }).limit(1).maybeSingle();
  if (error) throw mapSupabaseError(error);
  return data ? mapClientProfileRow(data) : null;
}
async function subscribeToConversationMessages(onEvent) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return null;
  const channelName = `direct-messages-${Math.random().toString(36).slice(2, 9)}`;
  const channel = supabase.channel(channelName).on("postgres_changes", { event: "*", schema: "public", table: "messages" }, (payload) => {
    const row = payload.new;
    if (row?.sender_id) markedAsReadConversationIds.delete(row.sender_id);
    if (row?.receiver_id) markedAsReadConversationIds.delete(row.receiver_id);
    onEvent(payload);
  }).subscribe();
  return () => {
    void supabase.removeChannel(channel);
  };
}
async function fetchHotelReservations(clientId) {
  const supabase = await requireMessagingSupabase();
  const { data, error } = await supabase.from("reservations").select("*").eq("guest_id", clientId).order("check_in", { ascending: true });
  if (error) throw mapSupabaseError(error);
  const reservations2 = data ?? [];
  const roomIds = unique(reservations2.map((reservation) => reservation.room_type_id));
  const rooms2 = await fetchRoomsByIds(roomIds);
  return reservations2.map((reservation) => mapClientReservation(reservation, rooms2));
}
async function fetchRoomsByIds(ids) {
  if (ids.length === 0) return [];
  const supabase = await requireMessagingSupabase();
  const { data, error } = await supabase.from("room_types").select("id, name").in("id", ids);
  if (error) throw mapSupabaseError(error);
  return data ?? [];
}
async function fetchClientIdsWithReservation(clientIds) {
  if (clientIds.length === 0) return /* @__PURE__ */ new Set();
  const supabase = await requireMessagingSupabase();
  const { data, error } = await supabase.from("reservations").select("guest_id").in("guest_id", clientIds);
  if (error) throw mapSupabaseError(error);
  return new Set((data ?? []).map((row) => row.guest_id));
}
async function fetchAdminProfiles() {
  const supabase = await requireMessagingSupabase();
  const { data, error } = await supabase.from("profiles").select("*").in("role", ["owner", "admin"]).order("role", { ascending: false }).order("created_at", { ascending: true });
  if (error) throw mapSupabaseError(error);
  return (data ?? []).map(mapUserProfileRow);
}
async function fetchClientProfiles() {
  const supabase = await requireMessagingSupabase();
  const { data, error } = await supabase.from("profiles").select("*").eq("role", "client").order("full_name", { ascending: true });
  if (error) throw mapSupabaseError(error);
  return (data ?? []).map(mapUserProfileRow);
}
async function fetchProfileById(id) {
  const supabase = await requireMessagingSupabase();
  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).maybeSingle();
  if (error) throw mapSupabaseError(error);
  return data ? mapUserProfileRow(data) : null;
}
async function resolveReceiver(current, conversationId) {
  if (isAdminRole(current.role)) {
    const client = await fetchProfileById(conversationId);
    if (!client || client.role !== "client") throw new Error(tr("Client introuvable.", "Guest not found."));
    return client;
  }
  const requested = await fetchProfileById(conversationId);
  if (requested && isAdminRole(requested.role)) return requested;
  const admins = await fetchAdminProfiles();
  const admin = admins[0];
  if (!admin) throw new Error(tr("Aucun compte admin disponible.", "No admin account available."));
  return admin;
}
async function requireMessagingSupabase() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) throw new Error(tr("Supabase n'est pas configuré.", "Supabase is not configured."));
  return supabase;
}
async function requireClientContext() {
  const context = await getClientSessionProfile();
  if (!context) throw new Error(tr("Session client requise.", "Guest session required."));
  return context;
}
async function requireAdminContext() {
  const admin = await getCurrentAdminProfile();
  if (!admin?.active) throw new Error(tr("Compte admin requis.", "Admin account required."));
  return profileFromAdmin(admin);
}
async function requireCurrentProfile() {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error(tr("Session requise.", "Session required."));
  return profile;
}
function makeConversation(id, subject) {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  return {
    id,
    clientUserId: id,
    guestId: null,
    reservationId: null,
    subject: subject || "Conversation",
    status: "open",
    adminReadAt: null,
    clientReadAt: null,
    lastMessageAt: now,
    createdAt: now,
    updatedAt: now
  };
}
function makeConversationSummary({
  id,
  subject,
  client,
  other,
  latestMessage,
  messages,
  perspective
}) {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const lastMessageAt = latestMessage?.createdAt ?? client.createdAt ?? now;
  const isActive = activeConversationId === id;
  const isMarkedRead = isConversationRead(id);
  const unreadAdminCount = (isActive || isMarkedRead) && perspective === "admin" ? 0 : messages.filter((message) => message.senderRole === "client" && !message.isRead).length;
  const unreadClientCount = (isActive || isMarkedRead) && perspective === "client" ? 0 : messages.filter((message) => message.senderRole === "admin" && !message.isRead).length;
  return {
    id,
    clientUserId: client.id,
    guestId: null,
    reservationId: null,
    subject,
    status: "open",
    adminReadAt: null,
    clientReadAt: null,
    lastMessageAt,
    createdAt: lastMessageAt,
    updatedAt: lastMessageAt,
    clientName: perspective === "admin" ? client.fullName : other.fullName,
    clientEmail: perspective === "admin" ? client.email : other.email,
    clientPhone: null,
    reservationNumber: null,
    roomName: null,
    checkIn: null,
    checkOut: null,
    total: null,
    latestMessage,
    unreadAdminCount,
    unreadClientCount
  };
}
function mapMessage(row, first, second) {
  const sender = row.sender_id === first.id ? first : row.sender_id === second.id ? second : void 0;
  const receiver = row.receiver_id === first.id ? first : row.receiver_id === second.id ? second : void 0;
  const resolvedSender = sender ?? (receiver === first ? second : receiver === second ? first : void 0);
  const senderRole = resolvedSender?.role === "client" ? "client" : "admin";
  const conversationId = senderRole === "client" ? row.sender_id : row.receiver_id;
  return {
    id: row.id,
    conversationId,
    senderRole,
    senderUserId: row.sender_id,
    senderId: row.sender_id,
    receiverId: row.receiver_id,
    body: row.body,
    isRead: row.is_read,
    createdAt: row.created_at
  };
}
function mapUserProfileRow(row) {
  return {
    id: row.id,
    userId: row.id,
    fullName: row.full_name ?? row.email ?? "Utilisateur",
    name: row.full_name ?? row.email ?? "Utilisateur",
    email: row.email ?? "",
    role: row.role,
    active: true,
    createdAt: row.created_at
  };
}
function mapClientProfileRow(row) {
  return {
    id: row.id,
    userId: row.id,
    guestId: null,
    email: row.email ?? "",
    fullName: row.full_name ?? row.email ?? "Client",
    phone: null,
    active: true,
    createdAt: row.created_at,
    updatedAt: row.created_at
  };
}
function profileFromClient(profile) {
  return {
    id: profile.id,
    userId: profile.userId,
    fullName: profile.fullName,
    name: profile.fullName,
    email: profile.email,
    role: "client",
    active: true,
    createdAt: profile.createdAt
  };
}
function profileFromAdmin(profile) {
  if (!profile) throw new Error(tr("Compte admin requis.", "Admin account required."));
  return {
    id: profile.id,
    userId: profile.userId,
    fullName: profile.name,
    name: profile.name,
    email: profile.email,
    role: profile.role,
    active: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function mapClientReservation(row, rooms2) {
  return {
    id: row.id,
    reservationNumber: row.reservation_number,
    roomTypeId: row.room_type_id,
    roomName: rooms2.find((room) => room.id === row.room_type_id)?.name ?? "Chambre",
    guestId: row.guest_id,
    checkIn: row.check_in,
    checkOut: row.check_out,
    status: row.status,
    paymentStatus: row.payment_status,
    total: row.total,
    adults: row.adults,
    children: row.children
  };
}
function isPairMessage(message, firstId, secondId) {
  return message.sender_id === firstId && message.receiver_id === secondId || message.sender_id === secondId && message.receiver_id === firstId;
}
function compareConversationSummaries(a, b) {
  const byDate = b.lastMessageAt.localeCompare(a.lastMessageAt);
  if (byDate !== 0) return byDate;
  return a.clientName.localeCompare(b.clientName);
}
function unique(values) {
  return [...new Set(values.filter(Boolean))];
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:-translate-y-0.5 hover:bg-ocean hover:shadow-lg hover:shadow-primary/20",
        primary: "bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:-translate-y-0.5 hover:bg-ocean hover:shadow-lg hover:shadow-primary/20",
        destructive: "bg-destructive text-destructive-foreground shadow-sm shadow-destructive/20 hover:-translate-y-0.5 hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/20",
        danger: "bg-destructive text-destructive-foreground shadow-sm shadow-destructive/20 hover:-translate-y-0.5 hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/20",
        success: "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20",
        outline: "border border-input bg-card text-primary shadow-sm hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-primary hover:shadow-md",
        secondary: "border border-border bg-card text-primary shadow-sm hover:-translate-y-0.5 hover:border-primary/25 hover:bg-secondary hover:shadow-md",
        ghost: "text-primary hover:bg-secondary hover:text-ocean",
        link: "h-auto rounded-none px-0 text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-6 text-sm",
        icon: "size-10 p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        disabled: disabled || loading,
        "aria-busy": loading || void 0,
        ...props,
        children: [
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin", "aria-hidden": "true" }),
          children
        ]
      }
    );
  }
);
Button.displayName = "Button";
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-base shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const ROOM_EN = {
  studio: {
    name: "Studio",
    description: "A functional studio for two in the heart of Marina Cap Monastir, with a terrace, kitchenette and all the essentials for a stay by the Mediterranean.",
    beds: "1 double bed or 2 single beds"
  },
  "appartement-economique-s1": {
    name: "Economy One-Bedroom Apartment (S+1)",
    description: "A simple, practical one-bedroom apartment for four, ideal for enjoying the marina, with kitchenette, air conditioning and a harbour-side entrance or view.",
    beds: "2 single beds + 1 sofa bed"
  },
  "appartement-standard-s1": {
    name: "Standard One-Bedroom Apartment (S+1)",
    description: "A comfortable one-bedroom apartment with a terrace and harbour view, designed for family stays or trips with friends at Marina Cap Monastir.",
    beds: "1 double bed or 2 single beds + 1 sofa bed"
  },
  "appartement-s2": {
    name: "Two-Bedroom Apartment (S+2)",
    description: "A spacious apartment for six with two sleeping areas, kitchenette and terrace, perfect for families who want to stay right on the marina.",
    beds: "2 single beds + 1 double bed + 1 sofa bed"
  }
};
const SLUG_BY_ID = {
  "ae47c5a0-5915-4e45-a355-bcda4a85bb5a": "studio",
  "be47c5a0-5915-4e45-a355-bcda4a85bb5b": "appartement-economique-s1",
  "ce47c5a0-5915-4e45-a355-bcda4a85bb5c": "appartement-standard-s1",
  "de47c5a0-5915-4e45-a355-bcda4a85bb5d": "appartement-s2"
};
const SLUG_BY_NAME = {
  Studio: "studio",
  "Appartement Économique S+1": "appartement-economique-s1",
  "Appartement Economique S+1": "appartement-economique-s1",
  "Appartement Standard S+1": "appartement-standard-s1",
  "Appartement S+2": "appartement-s2"
};
function englishRoom(room) {
  return ROOM_EN[room.slug ?? ""] ?? ROOM_EN[SLUG_BY_ID[room.id] ?? ""] ?? ROOM_EN[SLUG_BY_NAME[room.name ?? ""] ?? ""];
}
const ROOM_TYPE_EN = {
  Studio: "Studio",
  Appartement: "Apartment",
  Suite: "Suite",
  Chambre: "Room"
};
const AMENITY_EN = {
  Terrasse: "Terrace",
  "Télévision à écran plat": "Flat-screen TV",
  Climatisation: "Air conditioning",
  Baignoire: "Bathtub",
  Kitchenette: "Kitchenette",
  "Wi-Fi gratuit": "Free Wi-Fi",
  "Entrée port / Vue port": "Harbour entrance / Harbour view",
  "Vue port": "Harbour view"
};
const BEDS_EN = {
  "1 lit double ou 2 lits simples": "1 double bed or 2 single beds",
  "2 lits simples + 1 canapé-lit": "2 single beds + 1 sofa bed",
  "1 lit double ou 2 lits simples + 1 canapé-lit": "1 double bed or 2 single beds + 1 sofa bed",
  "2 lits simples + 1 lit double + 1 canapé-lit": "2 single beds + 1 double bed + 1 sofa bed"
};
function localizeRoom(room, locale) {
  if (locale === "fr") {
    return {
      name: room.name,
      type: room.type,
      description: room.description,
      beds: room.beds,
      amenities: room.amenities
    };
  }
  const en = englishRoom(room);
  return {
    name: en?.name ?? room.name,
    type: ROOM_TYPE_EN[room.type] ?? room.type,
    description: en?.description ?? room.description,
    beds: BEDS_EN[room.beds] ?? en?.beds ?? room.beds,
    amenities: room.amenities.map((amenity) => AMENITY_EN[amenity] ?? amenity)
  };
}
function localizeRoomName(room, locale) {
  if (locale === "fr") return room.name;
  return englishRoom(room)?.name ?? room.name;
}
function localizeRoomType(type, locale) {
  if (locale === "fr") return type;
  if (type === "Tous") return "All";
  return ROOM_TYPE_EN[type] ?? type;
}
function localizeAmenity(amenity, locale) {
  return locale === "fr" ? amenity : AMENITY_EN[amenity] ?? amenity;
}
const variantClasses = {
  primary: "bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:-translate-y-0.5 hover:bg-ocean hover:shadow-lg hover:shadow-primary/20 focus-visible:ring-ring",
  secondary: "border border-border bg-card text-primary shadow-sm hover:-translate-y-0.5 hover:border-primary/25 hover:bg-secondary hover:shadow-md focus-visible:ring-ring",
  outline: "border border-border bg-card text-primary shadow-sm hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:shadow-md focus-visible:ring-ring",
  ghost: "bg-transparent text-primary hover:bg-secondary hover:text-ocean focus-visible:ring-ring",
  danger: "bg-destructive text-destructive-foreground shadow-sm shadow-destructive/20 hover:-translate-y-0.5 hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/20 focus-visible:ring-destructive",
  success: "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 focus-visible:ring-emerald-500",
  warning: "bg-accent text-accent-foreground shadow-sm shadow-accent/20 hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 focus-visible:ring-accent"
};
const sizeClasses = {
  sm: "h-9 px-3 text-xs gap-1.5 rounded-md",
  md: "h-10 px-4 text-sm gap-2 rounded-md",
  lg: "h-12 px-5 text-sm gap-2 rounded-lg",
  icon: "size-10 rounded-md p-0"
};
function adminButtonClasses(variant = "primary", size = "md", extra) {
  return cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
    "[&_svg]:size-4 [&_svg]:shrink-0",
    variantClasses[variant],
    sizeClasses[size],
    extra
  );
}
function AdminButton({
  variant = "primary",
  size = "md",
  loading = false,
  ariaLabel,
  icon,
  children,
  className,
  disabled,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      disabled: disabled || loading,
      "aria-label": ariaLabel,
      "aria-busy": loading || void 0,
      ...props,
      className: adminButtonClasses(variant, size, className),
      children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          LoaderCircle,
          {
            className: cn("shrink-0 animate-spin", size === "sm" ? "size-3.5" : "size-4"),
            "aria-hidden": "true"
          }
        ) : icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex shrink-0 items-center justify-center", children: icon }),
        children
      ]
    }
  );
}
const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  country: "Tunisie",
  identity: "",
  roomTypeId: "",
  roomUnitId: "",
  checkIn: "",
  checkOut: "",
  adults: "1",
  children: "0",
  status: "confirmed",
  paymentStatus: "unpaid",
  notes: ""
};
const unavailableMessage = () => tr(
  "Cette chambre n'est pas disponible pour les dates sélectionnées.",
  "This room is not available for the selected dates."
);
function AdminNewReservationButton({
  variant = "primary",
  className,
  onCreated
}) {
  const [open, setOpen] = reactExports.useState(false);
  const { t } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminButton,
      {
        type: "button",
        variant,
        className,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "size-4" }),
        onClick: () => setOpen(true),
        children: t("Nouvelle réservation", "New booking")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminNewReservationModal, { open, onOpenChange: setOpen, onCreated })
  ] });
}
function AdminNewReservationModal({
  open,
  onOpenChange,
  onCreated
}) {
  const router2 = useRouter();
  const { t, locale } = useI18n();
  const [form, setForm] = reactExports.useState(initialForm);
  const [rooms2, setRooms] = reactExports.useState([]);
  const [units, setUnits] = reactExports.useState([]);
  const [loadingRooms, setLoadingRooms] = reactExports.useState(false);
  const [loadingUnits, setLoadingUnits] = reactExports.useState(false);
  const [previewLoading, setPreviewLoading] = reactExports.useState(false);
  const [preview, setPreview] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const selectedRoom = reactExports.useMemo(
    () => rooms2.find((room) => room.id === form.roomTypeId) ?? null,
    [form.roomTypeId, rooms2]
  );
  reactExports.useEffect(() => {
    if (!open) return;
    void loadRoomTypes();
  }, [open]);
  reactExports.useEffect(() => {
    if (!form.roomTypeId) {
      setUnits([]);
      return;
    }
    let cancelled = false;
    void loadRoomUnits(form.roomTypeId, () => cancelled);
    return () => {
      cancelled = true;
    };
  }, [form.roomTypeId]);
  reactExports.useEffect(() => {
    if (!open || !selectedRoom || !isValidStay(form.checkIn, form.checkOut)) {
      setPreview(null);
      return;
    }
    let cancelled = false;
    setPreviewLoading(true);
    calculatePreview(selectedRoom, form.roomUnitId || null, form.checkIn, form.checkOut).then((next) => {
      if (!cancelled) setPreview(next);
    }).catch((error) => {
      console.error("[AdminNewReservation] preview error", error);
      if (!cancelled) {
        setPreview({
          nights: getDatesBetween$1(form.checkIn, form.checkOut).length,
          nightly: [],
          subtotal: 0,
          deposit: 0,
          total: 0,
          availableUnits: null,
          unavailable: true,
          reason: getErrorDetail$3(error) ?? unavailableMessage()
        });
      }
    }).finally(() => {
      if (!cancelled) setPreviewLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [form.checkIn, form.checkOut, form.roomUnitId, open, selectedRoom]);
  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };
  const resetAndClose = () => {
    setForm(initialForm);
    setUnits([]);
    setPreview(null);
    onOpenChange(false);
  };
  async function loadRoomTypes() {
    if (!isSupabaseConfigured()) {
      toast.error(tr("Supabase n'est pas configuré.", "Supabase is not configured."));
      return;
    }
    setLoadingRooms(true);
    try {
      const supabase = await requireSupabase();
      let result = await supabase.from("room_types").select("id, name, slug, price_per_night, total_units, status").eq("status", "active").order("sort_order", { ascending: true });
      if (result.error && isMissingColumnError(result.error, "sort_order")) {
        result = await supabase.from("room_types").select("id, name, slug, price_per_night, total_units, status").eq("status", "active").order("name", { ascending: true });
      }
      if (result.error) throw result.error;
      const nextRooms = result.data ?? [];
      setRooms(nextRooms);
      setForm((current) => ({
        ...current,
        roomTypeId: current.roomTypeId || nextRooms[0]?.id || ""
      }));
    } catch (error) {
      console.error("[AdminNewReservation] room_types load error", error);
      toast.error(getSupabaseErrorMessage$2(error));
    } finally {
      setLoadingRooms(false);
    }
  }
  async function loadRoomUnits(roomTypeId, isCancelled) {
    setLoadingUnits(true);
    try {
      const supabase = await requireSupabase();
      const result = await supabase.from("room_units").select("id, room_type_id, unit_number, status").eq("room_type_id", roomTypeId).order("unit_number");
      if (result.error) throw result.error;
      if (isCancelled()) return;
      setUnits(result.data ?? []);
      setForm((current) => ({ ...current, roomUnitId: "" }));
    } catch (error) {
      if (isCancelled()) return;
      console.error("[AdminNewReservation] room_units load error", error);
      setUnits([]);
    } finally {
      if (!isCancelled()) setLoadingUnits(false);
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const validation = validateForm(form);
    if (validation) {
      toast.error(validation);
      return;
    }
    if (!selectedRoom) {
      toast.error(t("Sélectionnez un type de chambre.", "Select a room type."));
      return;
    }
    setSaving(true);
    try {
      const currentPreview = preview ?? await calculatePreview(
        selectedRoom,
        form.roomUnitId || null,
        form.checkIn,
        form.checkOut
      );
      if (currentPreview.unavailable || currentPreview.availableUnits !== null && currentPreview.availableUnits <= 0) {
        toast.error(unavailableMessage());
        return;
      }
      const supabase = await requireSupabase();
      const guest = await createGuest(supabase, form);
      const reservation = await createReservationRow(
        supabase,
        form,
        selectedRoom,
        guest.id,
        currentPreview
      );
      if (false) ;
      toast.success(t("Réservation créée avec succès", "Booking created"));
      await router2.invalidate();
      await onCreated?.();
      resetAndClose();
    } catch (error) {
      console.error("[AdminNewReservation] create error", error);
      toast.error(getSupabaseErrorMessage$2(error));
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] max-w-4xl overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t("Nouvelle réservation", "New booking") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: t(
        "Créez une réservation hôtel directement dans Supabase.",
        "Create a hotel booking directly in Supabase."
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-lg border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { title: t("Client", "Guest") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Nom complet", "Full name"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.fullName,
              onChange: (event) => setField("fullName", event.target.value),
              required: true
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Email", "Email"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "email",
              value: form.email,
              onChange: (event) => setField("email", event.target.value),
              required: true
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Téléphone", "Phone"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.phone,
              onChange: (event) => setField("phone", event.target.value),
              required: true
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Pays", "Country"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.country,
              onChange: (event) => setField("country", event.target.value),
              required: true
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("CIN / Passeport (optionnel)", "ID card / Passport (optional)"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.identity,
              onChange: (event) => setField("identity", event.target.value)
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-lg border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { title: t("Séjour", "Stay") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Type de chambre", "Room type"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.roomTypeId,
              onChange: (event) => setField("roomTypeId", event.target.value),
              className: "admin-input",
              required: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: loadingRooms ? t("Chargement...", "Loading...") : t("Sélectionner", "Select") }),
                rooms2.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: room.id, children: localizeRoomName(
                  { name: room.name, slug: room.slug ?? void 0, id: room.id },
                  locale
                ) }, room.id))
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Numéro / unité (optionnel)", "Number / unit (optional)"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.roomUnitId,
              onChange: (event) => setField("roomUnitId", event.target.value),
              className: "admin-input",
              disabled: !form.roomTypeId || loadingUnits,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: loadingUnits ? t("Chargement...", "Loading...") : units.length ? t("Sans unité précise", "No specific unit") : t("Aucune unité requise", "No unit required") }),
                units.map((unit) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: unit.id, children: [
                  unit.unit_number,
                  " · ",
                  unit.status
                ] }, unit.id))
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Date d'arrivée", "Check-in date"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: form.checkIn,
              onChange: (event) => setField("checkIn", event.target.value),
              required: true
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Date de départ", "Check-out date"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: form.checkOut,
              onChange: (event) => setField("checkOut", event.target.value),
              required: true
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Adultes", "Adults"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 1,
              value: form.adults,
              onChange: (event) => setField("adults", event.target.value),
              required: true
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Enfants", "Children"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 0,
              value: form.children,
              onChange: (event) => setField("children", event.target.value),
              required: true
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Statut", "Status"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.status,
              onChange: (event) => setField("status", event.target.value),
              className: "admin-input",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: getReservationStatusLabels(locale).pending }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "confirmed", children: getReservationStatusLabels(locale).confirmed }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "checked_in", children: getReservationStatusLabels(locale).checked_in })
              ]
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-lg border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { title: t("Paiement", "Payment") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Statut de paiement", "Payment status"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.paymentStatus,
              onChange: (event) => setField("paymentStatus", event.target.value),
              className: "admin-input",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "unpaid", children: getPaymentStatusLabels(locale).unpaid }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "partial", children: getPaymentStatusLabels(locale).deposit_paid }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "paid", children: getPaymentStatusLabels(locale).paid })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Source", "Source"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: "admin", readOnly: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Notes (optionnel)", "Notes (optional)"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: form.notes,
              onChange: (event) => setField("notes", event.target.value),
              className: "min-h-24"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-lg border border-border bg-secondary/30 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { title: t("Résumé", "Summary") }),
        previewLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("Calcul en cours...", "Calculating...") }),
        !previewLoading && preview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
          preview.unavailable && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border border-destructive/30 bg-destructive/10 p-3 font-semibold text-destructive", children: preview.reason ?? unavailableMessage() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryTile, { label: t("Nuits", "Nights"), value: String(preview.nights) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SummaryTile,
              {
                label: t("Disponibles", "Available"),
                value: preview.availableUnits === null ? "-" : String(preview.availableUnits)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SummaryTile,
              {
                label: t("Sous-total", "Subtotal"),
                value: `${Math.round(preview.subtotal)} DT`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SummaryTile,
              {
                label: t("Total", "Total"),
                value: `${Math.round(preview.total)} DT`
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-40 overflow-auto rounded-md border border-border bg-card", children: preview.nightly.map((night) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between gap-3 border-b border-border px-3 py-2 last:border-b-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: night.date }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                  Math.round(night.price),
                  " DT",
                  night.custom ? ` · ${t("tarif calendrier", "calendar rate")}` : ""
                ] })
              ]
            },
            night.date
          )) })
        ] }),
        !previewLoading && !preview && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t(
          "Sélectionnez une chambre et des dates pour afficher le prix.",
          "Select a room and dates to see the price."
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: resetAndClose, disabled: saving, children: t("Annuler", "Cancel") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", loading: saving, disabled: preview?.unavailable, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-4" }),
          saving ? t("Création en cours...", "Creating...") : t("Créer la réservation", "Create booking")
        ] })
      ] })
    ] })
  ] }) });
}
async function calculatePreview(room, selectedRoomUnitId, checkIn, checkOut) {
  const nights = getDatesBetween$1(checkIn, checkOut);
  const supabase = await requireSupabase();
  const ratesResult = await supabase.from("room_rate_calendar").select("*").eq("room_type_id", room.id).gte("date", checkIn).lt("date", checkOut);
  if (ratesResult.error) throw ratesResult.error;
  const reservations2 = await fetchOverlappingReservations(supabase, room.id, checkIn, checkOut);
  const rateByDate = new Map(
    (ratesResult.data ?? []).map((rate) => [rate.date, rate])
  );
  const reservedByDate = buildReservationCountByDate(reservations2.rows, checkIn, checkOut);
  const occupiedUnitsByDate = buildOccupiedUnitsByDate(reservations2.rows, checkIn, checkOut);
  const totalUnits = Math.max(0, Number(room.total_units ?? 0));
  const availabilityByDate = nights.map((date) => {
    const rate = rateByDate.get(date);
    return calculateAvailableUnitsForNight({
      rate,
      totalUnits,
      reservedUnits: reservedByDate.get(date) ?? 0,
      occupiedUnitIds: occupiedUnitsByDate.get(date) ?? /* @__PURE__ */ new Set(),
      roomUnitIdAvailable: reservations2.roomUnitIdAvailable,
      selectedRoomUnitId
    });
  });
  const availableUnits = availabilityByDate.length ? Math.min(...availabilityByDate) : 0;
  const nightly = nights.map((date) => {
    const rate = rateByDate.get(date);
    return {
      date,
      price: Number(rate?.price ?? room.price_per_night ?? 0),
      custom: Boolean(rate)
    };
  });
  const subtotal = nightly.reduce((sum, night) => sum + night.price, 0);
  const deposit = Math.round(subtotal * 0.3);
  return {
    nights: nights.length,
    nightly,
    subtotal,
    deposit,
    total: subtotal,
    availableUnits,
    unavailable: nights.length === 0 || availableUnits <= 0,
    reason: nights.length === 0 ? tr("Sélectionnez une période valide.", "Select a valid period.") : availableUnits <= 0 ? unavailableMessage() : null
  };
}
async function createGuest(supabase, form) {
  const basePayload = {
    full_name: form.fullName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    country: form.country.trim(),
    identity_number: form.identity.trim(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  let result = await supabase.from("guests").insert(basePayload).select("*").single();
  if (result.error && isMissingColumnError(result.error, "updated_at")) {
    const { updated_at: _updatedAt, ...withoutUpdatedAt } = basePayload;
    result = await supabase.from("guests").insert(withoutUpdatedAt).select("*").single();
  }
  if (result.error && isMissingColumnError(result.error, "identity_number")) {
    const { identity_number: _identityNumber, ...withoutIdentityNumber } = basePayload;
    const legacyGuests = supabase.from("guests");
    result = await legacyGuests.insert({ ...withoutIdentityNumber, cin_passport: form.identity.trim() || null }).select("*").single();
  }
  if (result.error && isMissingColumnError(result.error, "cin_passport")) {
    const { identity_number: _identityNumber, ...withoutIdentityNumber } = basePayload;
    const legacyGuests = supabase.from("guests");
    result = await legacyGuests.insert(withoutIdentityNumber).select("*").single();
  }
  if (result.error) {
    console.error("[AdminNewReservation] guest insert error", result.error);
    throw result.error;
  }
  if (!result.data) throw new Error("Guest creation did not return a row.");
  return result.data;
}
async function createReservationRow(supabase, form, room, guestId, preview) {
  const paymentStatus = toDbPaymentStatus(form.paymentStatus);
  const paidAmount = form.paymentStatus === "paid" ? preview.total : form.paymentStatus === "partial" ? preview.deposit : 0;
  const remainingAmount = Math.max(0, preview.total - paidAmount);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const payload = {
    reservation_number: generateAdminReservationNumber(),
    guest_id: guestId,
    room_type_id: room.id,
    room_unit_id: form.roomUnitId || null,
    check_in: form.checkIn,
    check_out: form.checkOut,
    adults: Number(form.adults),
    children: Number(form.children),
    status: form.status,
    payment_status: paymentStatus,
    source: "admin",
    special_requests: normalizeOptional(form.notes),
    nights: preview.nights,
    room_price: preview.subtotal,
    taxes_and_fees: 0,
    deposit: preview.deposit,
    total: preview.total,
    paid_amount: paidAmount,
    remaining_amount: remainingAmount,
    updated_at: now
  };
  let result = await supabase.from("reservations").insert(payload).select("*").single();
  if (result.error && isMissingColumnError(result.error, "room_unit_id")) {
    const { room_unit_id: _roomUnitId, ...withoutRoomUnitId } = payload;
    result = await supabase.from("reservations").insert(withoutRoomUnitId).select("*").single();
  }
  if (result.error && isMissingColumnError(result.error, "updated_at")) {
    const { updated_at: _updatedAt, ...withoutUpdatedAt } = payload;
    result = await supabase.from("reservations").insert(withoutUpdatedAt).select("*").single();
  }
  if (result.error) {
    console.error("[AdminNewReservation] reservation insert error", result.error);
    throw result.error;
  }
  if (!result.data) throw new Error("Reservation creation did not return a row.");
  return result.data;
}
async function fetchOverlappingReservations(supabase, roomTypeId, checkIn, checkOut) {
  const withRoomUnitId = await supabase.from("reservations").select("id, room_type_id, room_unit_id, check_in, check_out, status").eq("room_type_id", roomTypeId).neq("status", "cancelled").lt("check_in", checkOut).gt("check_out", checkIn);
  if (!withRoomUnitId.error) {
    return {
      rows: (withRoomUnitId.data ?? []).map((row) => ({
        ...row,
        room_unit_id: row.room_unit_id ?? null
      })),
      roomUnitIdAvailable: true,
      fallbackUsed: false
    };
  }
  if (!isMissingColumnError(withRoomUnitId.error, "room_unit_id")) throw withRoomUnitId.error;
  const withoutRoomUnitId = await supabase.from("reservations").select("id, room_type_id, check_in, check_out, status").eq("room_type_id", roomTypeId).neq("status", "cancelled").lt("check_in", checkOut).gt("check_out", checkIn);
  if (withoutRoomUnitId.error) throw withoutRoomUnitId.error;
  return {
    rows: (withoutRoomUnitId.data ?? []).map((row) => ({
      ...row,
      room_unit_id: null
    })),
    roomUnitIdAvailable: false,
    fallbackUsed: true
  };
}
function calculateAvailableUnitsForNight({
  rate,
  totalUnits,
  reservedUnits,
  occupiedUnitIds,
  roomUnitIdAvailable,
  selectedRoomUnitId
}) {
  const status = rate?.status ?? "available";
  const mode = normalizeInventoryMode$1(rate?.inventory_mode);
  if (mode === "closed" || status === "closed" || status === "not_available" || status === "maintenance") {
    return 0;
  }
  if (selectedRoomUnitId && roomUnitIdAvailable && occupiedUnitIds.has(selectedRoomUnitId))
    return 0;
  if (mode === "all") return totalUnits;
  if (mode === "quantity")
    return clampCount$1(Number(rate?.units_available_override ?? 0), totalUnits);
  if (mode === "specific_units") {
    const selectedUnitIds = Array.isArray(rate?.selected_unit_ids) ? rate.selected_unit_ids : [];
    if (selectedRoomUnitId && selectedUnitIds.length > 0 && !selectedUnitIds.includes(selectedRoomUnitId)) {
      return 0;
    }
    if (!roomUnitIdAvailable)
      return clampCount$1(
        selectedUnitIds.length || Number(rate?.units_available_override ?? 0),
        totalUnits
      );
    return clampCount$1(
      selectedUnitIds.filter((unitId) => !occupiedUnitIds.has(unitId)).length,
      totalUnits
    );
  }
  return clampCount$1(totalUnits - reservedUnits, totalUnits);
}
function buildReservationCountByDate(rows, checkIn, checkOut) {
  const counts = /* @__PURE__ */ new Map();
  for (const row of rows) {
    if (!isActiveReservation(row.status)) continue;
    const current = /* @__PURE__ */ new Date(`${maxDate$1(row.check_in, checkIn)}T12:00:00`);
    const end = /* @__PURE__ */ new Date(`${minDate$1(row.check_out, checkOut)}T12:00:00`);
    while (current < end) {
      const date = toIsoDate$1(current);
      counts.set(date, (counts.get(date) ?? 0) + 1);
      current.setDate(current.getDate() + 1);
    }
  }
  return counts;
}
function buildOccupiedUnitsByDate(rows, checkIn, checkOut) {
  const occupied = /* @__PURE__ */ new Map();
  for (const row of rows) {
    if (!isActiveReservation(row.status) || !row.room_unit_id) continue;
    const current = /* @__PURE__ */ new Date(`${maxDate$1(row.check_in, checkIn)}T12:00:00`);
    const end = /* @__PURE__ */ new Date(`${minDate$1(row.check_out, checkOut)}T12:00:00`);
    while (current < end) {
      const date = toIsoDate$1(current);
      const ids = occupied.get(date) ?? /* @__PURE__ */ new Set();
      ids.add(row.room_unit_id);
      occupied.set(date, ids);
      current.setDate(current.getDate() + 1);
    }
  }
  return occupied;
}
function validateForm(form) {
  if (!form.fullName.trim()) return tr("Le nom complet est obligatoire.", "Full name is required.");
  if (!form.email.trim()) return tr("L'email est obligatoire.", "Email is required.");
  if (!form.phone.trim()) return tr("Le téléphone est obligatoire.", "Phone is required.");
  if (!form.country.trim()) return tr("Le pays est obligatoire.", "Country is required.");
  if (!form.roomTypeId) return tr("Sélectionnez un type de chambre.", "Select a room type.");
  if (!isValidStay(form.checkIn, form.checkOut))
    return tr("Sélectionnez des dates valides.", "Select valid dates.");
  if (!Number.isInteger(Number(form.adults)) || Number(form.adults) < 1)
    return tr("Le nombre d'adultes est invalide.", "Invalid number of adults.");
  if (!Number.isInteger(Number(form.children)) || Number(form.children) < 0)
    return tr("Le nombre d'enfants est invalide.", "Invalid number of children.");
  return null;
}
function isValidStay(checkIn, checkOut) {
  return Boolean(checkIn && checkOut && checkIn < checkOut);
}
function getDatesBetween$1(startDate, endDate, inclusiveEnd) {
  if (!startDate || !endDate || startDate > endDate) return [];
  const dates = [];
  const current = /* @__PURE__ */ new Date(`${startDate}T12:00:00`);
  const end = /* @__PURE__ */ new Date(`${endDate}T12:00:00`);
  while (current < end) {
    dates.push(toIsoDate$1(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}
function toDbPaymentStatus(status) {
  if (status === "paid") return "paid";
  if (status === "partial") return "deposit_paid";
  return "unpaid";
}
function generateAdminReservationNumber() {
  const today2 = /* @__PURE__ */ new Date();
  const datePart = today2.toISOString().slice(0, 10).replaceAll("-", "");
  const randomPart = typeof crypto !== "undefined" && "getRandomValues" in crypto ? [...crypto.getRandomValues(new Uint8Array(3))].map((value) => value.toString(16).padStart(2, "0")).join("").toUpperCase() : Math.random().toString(16).slice(2, 8).toUpperCase();
  return `RES-${datePart}-${randomPart}`;
}
async function requireSupabase() {
  if (!isSupabaseConfigured())
    throw new Error(tr("Supabase n'est pas configuré.", "Supabase is not configured."));
  const { supabase } = await import("./client-Bsz3xj8E.mjs");
  return supabase;
}
function normalizeInventoryMode$1(mode) {
  if (mode === "all" || mode === "quantity" || mode === "specific_units" || mode === "closed")
    return mode;
  return "auto";
}
function isActiveReservation(status) {
  return status !== "cancelled" && status !== "no_show" && status !== "checked_out";
}
function clampCount$1(value, totalUnits) {
  return Math.min(Math.max(0, Math.trunc(value)), Math.max(0, totalUnits));
}
function maxDate$1(first, second) {
  return first > second ? first : second;
}
function minDate$1(first, second) {
  return first < second ? first : second;
}
function toIsoDate$1(date) {
  return date.toISOString().slice(0, 10);
}
function normalizeOptional(value) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
function getSupabaseErrorMessage$2(error) {
  if (isPermissionError$3(error)) {
    return tr(
      "Permission Supabase refusée. Vérifiez les policies guests/reservations.",
      "Supabase permission denied. Check the guests/reservations policies."
    );
  }
  return getErrorDetail$3(error) ?? tr("Erreur Supabase inconnue.", "Unknown Supabase error.");
}
function getErrorDetail$3(error) {
  if (!error) return null;
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  const maybeError = error;
  const parts = [maybeError.message, maybeError.details, maybeError.hint, maybeError.code].filter(
    Boolean
  );
  return parts.length ? parts.join(" | ") : JSON.stringify(error);
}
function isPermissionError$3(error) {
  const maybeError = error;
  const haystack = [maybeError?.message, maybeError?.details, maybeError?.hint, maybeError?.code].filter(Boolean).join(" ").toLowerCase();
  return maybeError?.code === "42501" || maybeError?.status === 401 || maybeError?.status === 403 || haystack.includes("permission") || haystack.includes("row-level security") || haystack.includes("rls") || haystack.includes("not authorized");
}
function isMissingColumnError(error, column) {
  const maybeError = error;
  const haystack = [maybeError?.message, maybeError?.details, maybeError?.hint].filter(Boolean).join(" ").toLowerCase();
  return maybeError?.code === "42703" && haystack.includes(column.toLowerCase());
}
function SectionTitle({ title }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-sm font-black uppercase tracking-[0.12em] text-primary", children: title });
}
function AdminField({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground", children: label }),
    children
  ] });
}
function SummaryTile({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-background p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-lg font-black text-primary", children: value })
  ] });
}
const navItems = [
  { to: "/admin", label: { fr: "Tableau de bord", en: "Dashboard" }, icon: House },
  { to: "/admin/rooms", label: { fr: "Chambres", en: "Rooms" }, icon: BedDouble },
  { to: "/admin/reservations", label: { fr: "Réservations", en: "Bookings" }, icon: Table2 },
  {
    to: "/admin/messages",
    label: { fr: "Messages clients", en: "Guest messages" },
    icon: MessageCircle
  },
  { to: "/admin/clients", label: { fr: "Clients", en: "Guests" }, icon: Users },
  { to: "/admin/calendar", label: { fr: "Calendrier", en: "Calendar" }, icon: CalendarDays },
  { to: "/admin/payments", label: { fr: "Paiements", en: "Payments" }, icon: CreditCard },
  { to: "/admin/invoices", label: { fr: "Factures", en: "Invoices" }, icon: FileText },
  { to: "/admin/settings", label: { fr: "Paramètres", en: "Settings" }, icon: Settings },
  { to: "/admin/channels", label: { fr: "Channels", en: "Channels" }, icon: Plug },
  { to: "/admin/statistics", label: { fr: "Statistiques", en: "Statistics" }, icon: TrendingUp },
  { to: "/admin/direction", label: { fr: "Direction", en: "Management" }, icon: Crown },
  { to: "/admin/port-tarifs", label: { fr: "Tarifs Port", en: "Marina rates" }, icon: Anchor }
];
function AdminLayout({
  title,
  description,
  children,
  actions,
  onReservationCreated
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const { t, pick } = useI18n();
  const [admin, setAdmin] = reactExports.useState(null);
  const [drawerOpen, setDrawerOpen] = reactExports.useState(false);
  const [notificationsOpen, setNotificationsOpen] = reactExports.useState(false);
  const [profileOpen, setProfileOpen] = reactExports.useState(false);
  const [unreadMessages, setUnreadMessages] = reactExports.useState(0);
  const [latestConversations, setLatestConversations] = reactExports.useState([]);
  const visibleNavItems = admin ? navItems.filter((item) => canAccessAdmin(admin.role, item.to)) : navItems;
  reactExports.useEffect(() => {
    let isMounted = true;
    void getCurrentAdminProfile().then((profile) => {
      if (isMounted) setAdmin(profile);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  reactExports.useEffect(() => {
    let isMounted = true;
    let cleanup;
    const refreshMessages = async () => {
      const [count, summaries] = await Promise.all([
        getUnreadAdminConversationCount(),
        listAdminConversations()
      ]);
      if (!isMounted) return;
      setUnreadMessages(count);
      setLatestConversations(summaries.slice(0, 3));
    };
    void refreshMessages();
    const handleReadEvent = () => {
      void refreshMessages();
    };
    window.addEventListener("messages_marked_read", handleReadEvent);
    void subscribeToConversationMessages(() => {
      void refreshMessages();
    }).then((unsubscribe) => {
      cleanup = unsubscribe ?? void 0;
    });
    return () => {
      isMounted = false;
      window.removeEventListener("messages_marked_read", handleReadEvent);
      cleanup?.();
    };
  }, []);
  reactExports.useEffect(() => {
    setDrawerOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
  }, [pathname]);
  const logout = async () => {
    await signOutAdmin();
    navigate({ to: "/login" });
  };
  const notificationCount = unreadMessages;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-shell min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "fixed inset-y-0 left-0 z-30 hidden w-72 overflow-hidden border-r border-white/10 bg-ocean text-white shadow-2xl lg:block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marina-pattern absolute inset-0 opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary via-ocean to-[#041d2b]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-full flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BrandBlock, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 space-y-1 overflow-y-auto p-3", children: [
          visibleNavItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(AdminNavLink, { item, pathname }, item.to)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "flex items-center gap-3 rounded-lg border border-accent/40 bg-accent/20 px-3 py-2.5 text-sm font-black text-accent-light transition hover:bg-accent/35 hover:text-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "size-4" }),
                t("Retour au site Web", "Back to the website")
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-white/8 p-4 text-xs leading-5 text-white/72 shadow-inner", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-white", children: t("Session sécurisée", "Secure session") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: t(
            "Supabase Auth, rôles admin et politiques RLS restent actifs.",
            "Supabase Auth, admin roles and RLS policies stay active."
          ) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:pl-72", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-20 border-b border-border/80 bg-background/76 shadow-sm backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-20 flex-col gap-4 px-4 py-4 md:px-6 xl:flex-row xl:items-center xl:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setDrawerOpen(true),
                className: "inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-card text-primary shadow-sm transition hover:border-accent hover:bg-accent/10 lg:hidden",
                "aria-label": t("Ouvrir le menu admin", "Open the admin menu"),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Hotel, { className: "size-4" }),
                t("Administration", "Administration")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-2xl font-black leading-tight text-primary md:text-3xl", children: title })
            ] })
          ] }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-3xl text-sm leading-6 text-muted-foreground", children: description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-3 md:flex-row md:items-center md:justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative min-w-0 md:w-80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "search",
                placeholder: t(
                  "Rechercher client, chambre, facture...",
                  "Search guest, room, invoice..."
                ),
                className: "admin-input h-11 rounded-xl border-primary/10 bg-card/90 pl-9 shadow-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            admin && canAccessAdmin(admin.role, "/admin/reservations") && /* @__PURE__ */ jsxRuntimeExports.jsx(AdminNewReservationButton, { variant: "secondary", onCreated: onReservationCreated }),
            actions,
            /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSwitch, { className: "h-11 rounded-xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden md:block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setNotificationsOpen((value) => !value);
                    setProfileOpen(false);
                  },
                  className: "inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-bold text-primary shadow-sm transition hover:border-accent hover:bg-accent/10",
                  "aria-expanded": notificationsOpen,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "size-4 text-accent" }),
                      unreadMessages > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-1 -top-1 size-2 rounded-full bg-destructive ring-2 ring-card" })
                    ] }),
                    notificationCount
                  ]
                }
              ),
              notificationsOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-12 z-40 w-80 rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-lift)]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-black text-primary", children: t("Notifications", "Notifications") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-accent/15 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-primary", children: "Live" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: latestConversations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-dashed border-border bg-background p-3 text-center text-xs text-muted-foreground", children: t("Aucune notification pour le moment.", "No notifications yet.") }) : latestConversations.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/admin/messages",
                    search: { conversation: item.id },
                    onClick: () => setNotificationsOpen(false),
                    className: "block rounded-lg border border-border bg-background p-3 text-xs transition hover:border-accent",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-primary", children: item.clientName }),
                        item.unreadAdminCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-destructive px-2 py-0.5 text-[10px] font-black text-white", children: item.unreadAdminCount })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 line-clamp-2 leading-5 text-muted-foreground", children: item.latestMessage?.body ?? t("Conversation client", "Guest conversation") })
                    ]
                  },
                  item.id
                )) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden md:block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setProfileOpen((value) => !value);
                    setNotificationsOpen(false);
                  },
                  className: "inline-flex h-11 items-center gap-3 rounded-xl border border-border bg-card px-3 text-left shadow-sm transition hover:border-accent hover:bg-accent/10",
                  "aria-expanded": profileOpen,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-8 items-center justify-center rounded-lg bg-secondary text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "size-4" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block max-w-28 truncate text-xs font-black text-primary", children: admin?.name ?? "Admin" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block max-w-28 truncate text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground", children: admin?.role ?? t("chargement", "loading") })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4 text-muted-foreground" })
                  ]
                }
              ),
              profileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-12 z-40 w-64 rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-lift)]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-secondary p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black text-primary", children: admin?.name ?? "Admin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs font-medium text-muted-foreground", children: [
                    admin?.role ?? t("chargement", "loading"),
                    " | Marina Cap Monastir"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: logout,
                    className: "mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border bg-card text-sm font-bold text-primary transition hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
                      t("Déconnexion", "Sign out")
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: logout,
                className: "hidden size-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive md:inline-flex",
                title: t("Déconnexion admin", "Admin sign-out"),
                "aria-label": t("Déconnexion admin", "Admin sign-out"),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" })
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "px-4 pb-28 pt-6 md:px-6 lg:pb-10", children }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-background/92 p-2 shadow-2xl backdrop-blur-xl lg:hidden", children: [
        visibleNavItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const active = item.to === "/admin" ? pathname === "/admin" : pathname.startsWith(item.to);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.to,
              className: cn(
                "flex min-w-0 flex-col items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-bold text-muted-foreground transition",
                active && "bg-primary text-primary-foreground shadow-sm"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-full truncate", children: pick(item.label).split(" ")[0] })
              ]
            },
            item.to
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setDrawerOpen(true),
            className: "flex flex-col items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-bold text-muted-foreground transition hover:bg-secondary hover:text-primary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-4" }),
              t("Menu", "Menu")
            ]
          }
        )
      ] })
    ] }),
    drawerOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 lg:hidden", role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "absolute inset-0 bg-ocean/65 backdrop-blur-sm",
          "aria-label": t("Fermer le menu admin", "Close the admin menu"),
          onClick: () => setDrawerOpen(false)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-[min(22rem,88vw)] overflow-hidden bg-ocean text-white shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marina-pattern absolute inset-0 opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary via-ocean to-[#041d2b]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-full flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BrandBlock, { compact: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setDrawerOpen(false),
                className: "mr-4 inline-flex size-10 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white",
                "aria-label": t("Fermer le menu admin", "Close the admin menu"),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 space-y-1 overflow-y-auto p-3", children: visibleNavItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(AdminNavLink, { item, pathname }, item.to)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: logout,
              className: "inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 text-sm font-bold text-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
                t("Déconnexion", "Sign out")
              ]
            }
          ) })
        ] })
      ] })
    ] })
  ] });
}
function BrandBlock({ compact = false }) {
  const { t } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/",
      className: cn(
        "flex items-center gap-3 border-b border-white/10 p-5 transition hover:opacity-90",
        compact && "border-b-0"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/icons/icon-512.png?v=2",
            alt: "Marina Cap Monastir",
            className: "size-12 rounded-lg object-cover shadow-lg"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-black tracking-tight text-white", children: "Marina Cap Monastir" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent", children: t("Extranet hôtelier", "Hotel extranet") })
        ] })
      ]
    }
  );
}
function AdminNavLink({ item, pathname }) {
  const { pick } = useI18n();
  const Icon = item.icon;
  const active = item.to === "/admin" ? pathname === "/admin" : pathname.startsWith(item.to);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: item.to,
      className: cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-white/72 transition-all duration-200 hover:bg-white/10 hover:text-white",
        active && "bg-white text-primary shadow-lg shadow-black/10 hover:bg-white hover:text-primary"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "flex size-8 shrink-0 items-center justify-center rounded-md bg-white/8 text-white/80 transition",
              active && "bg-accent/18 text-primary"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 truncate", children: pick(item.label) })
      ]
    }
  );
}
const toneClasses = {
  navy: {
    rail: "from-primary via-ocean to-primary",
    badge: "border-primary/15 bg-primary/10 text-primary",
    icon: "border-primary/15 bg-primary/10 text-primary"
  },
  gold: {
    rail: "from-accent via-accent to-primary",
    badge: "border-accent/30 bg-accent/15 text-primary",
    icon: "border-accent/30 bg-accent/15 text-primary"
  },
  turquoise: {
    rail: "from-turquoise via-turquoise to-primary",
    badge: "border-turquoise/25 bg-turquoise/10 text-primary",
    icon: "border-turquoise/25 bg-turquoise/10 text-primary"
  },
  green: {
    rail: "from-emerald-500 via-emerald-500 to-primary",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-800",
    icon: "border-emerald-200 bg-emerald-50 text-emerald-800"
  },
  red: {
    rail: "from-destructive via-destructive to-primary",
    badge: "border-destructive/20 bg-destructive/10 text-destructive",
    icon: "border-destructive/20 bg-destructive/10 text-destructive"
  }
};
function KpiCard({ label, value, detail, trend, icon: Icon, tone = "navy" }) {
  const toneClass = toneClasses[tone];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[var(--shadow-lift)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-85",
          toneClass.rail
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-turquoise/10 transition group-hover:bg-accent/15" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-black leading-none text-primary md:text-3xl", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-2", children: [
          trend && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "inline-flex rounded-full border px-2 py-1 text-[10px] font-black uppercase tracking-[0.1em]",
                toneClass.badge
              ),
              children: trend
            }
          ),
          detail && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground", children: detail })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "flex size-11 shrink-0 items-center justify-center rounded-lg border shadow-sm transition group-hover:scale-105",
            toneClass.icon
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5" })
        }
      )
    ] })
  ] });
}
function KpiCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-4 w-28" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-8 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-6 w-16 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-6 w-24 rounded-full" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block size-11" })
  ] }) });
}
function detectReservationsWithoutInvoice() {
  return reservations.filter(
    (reservation) => !invoices.some((invoice) => invoice.reservationId === reservation.id)
  );
}
function detectUnpaidReservations() {
  return reservations.filter(
    (reservation) => ["unpaid", "deposit_paid"].includes(reservation.paymentStatus)
  );
}
function getArrivalsToday(today2 = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)) {
  return reservations.filter(
    (reservation) => reservation.checkIn === today2 && reservation.status === "confirmed"
  );
}
function getDeparturesToday(today2 = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)) {
  return reservations.filter(
    (reservation) => reservation.checkOut === today2 && reservation.status === "checked_in"
  );
}
function detectOverbookingRisk(today2 = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)) {
  const tomorrow = /* @__PURE__ */ new Date(`${today2}T12:00:00`);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkOut = tomorrow.toISOString().slice(0, 10);
  return rooms.filter((room) => roomsAvailable(room, today2, checkOut) <= 1);
}
function createHotelOperationAlerts(today2 = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)) {
  const createdAt = (/* @__PURE__ */ new Date()).toISOString();
  return [
    ...detectUnpaidReservations().map(
      (reservation) => ({
        id: `alert-payment-${reservation.id}`,
        type: "payment_pending",
        severity: reservation.checkIn <= today2 ? "critical" : "warning",
        title: "Paiement en attente",
        description: `${reservation.guest.fullName} a un solde à suivre avant l'arrivée.`,
        descriptionEn: `${reservation.guest.fullName} has a balance to settle before arrival.`,
        reservationId: reservation.id,
        createdAt
      })
    ),
    ...getArrivalsToday(today2).map(
      (reservation) => ({
        id: `alert-arrival-${reservation.id}`,
        type: "arrival_today",
        severity: "info",
        title: "Arrivée aujourd'hui",
        description: `${reservation.guest.fullName} est attendu à la réception.`,
        descriptionEn: `${reservation.guest.fullName} is expected at reception.`,
        reservationId: reservation.id,
        createdAt
      })
    ),
    ...getDeparturesToday(today2).map(
      (reservation) => ({
        id: `alert-departure-${reservation.id}`,
        type: "departure_today",
        severity: "info",
        title: "Départ aujourd'hui",
        description: `${reservation.guest.fullName} doit finaliser le check-out.`,
        descriptionEn: `${reservation.guest.fullName} needs to complete check-out.`,
        reservationId: reservation.id,
        createdAt
      })
    ),
    ...detectOverbookingRisk(today2).map(
      (room) => ({
        id: `alert-overbooking-${room.id}`,
        type: "overbooking_risk",
        severity: "warning",
        title: "Risque de survente",
        description: `${room.name} approche de la capacité maximale.`,
        descriptionEn: `${room.name} is close to full capacity.`,
        roomTypeId: room.id,
        createdAt
      })
    ),
    ...rooms.filter((room) => room.status === "maintenance").map(
      (room) => ({
        id: `alert-maintenance-${room.id}`,
        type: "maintenance_room",
        severity: "warning",
        title: "Chambre en maintenance",
        description: `${room.name} est indisponible à la vente.`,
        descriptionEn: `${room.name} is not available for sale.`,
        roomTypeId: room.id,
        createdAt
      })
    ),
    ...channelConnections.flatMap((channel) => channel.errors ?? []).map(
      (error, index) => ({
        id: `alert-channel-${index}`,
        type: "channel_sync_error",
        severity: "critical",
        title: "Erreur de synchronisation channel",
        description: error,
        descriptionEn: translateDemoText(error, "en"),
        createdAt
      })
    ),
    ...detectReservationsWithoutInvoice().map(
      (reservation) => ({
        id: `alert-invoice-${reservation.id}`,
        type: "invoice_not_generated",
        severity: "warning",
        title: "Facture à générer",
        description: `La réservation ${reservation.reservationNumber} n'a pas encore de facture.`,
        descriptionEn: `Booking ${reservation.reservationNumber} has no invoice yet.`,
        reservationId: reservation.id,
        createdAt
      })
    )
  ];
}
async function listAutomationAlerts(today2 = getTodayIso()) {
  const fallbackAlerts = createHotelOperationAlerts(today2);
  const supabase = await getSupabaseOrNull();
  if (!supabase) return fallbackAlerts;
  try {
    const { data, error } = await supabase.from("automation_alerts").select("*").eq("is_resolved", false).order("created_at", { ascending: false }).limit(50);
    if (error) throw error;
    if (!data?.length) return fallbackAlerts;
    return data.map(mapAutomationAlertFromDb);
  } catch (error) {
    warnSupabaseFallback("automation alert query", error);
    return fallbackAlerts;
  }
}
function mapAutomationAlertFromDb(row) {
  return {
    id: row.id,
    type: row.type,
    severity: row.severity,
    title: row.title,
    description: row.description,
    reservationId: row.reservation_id ?? void 0,
    roomTypeId: row.room_type_id ?? void 0,
    createdAt: row.created_at
  };
}
async function listInvoices() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return invoices;
  try {
    const { data, error } = await supabase.from("invoices").select("*").order("issued_at", { ascending: false });
    if (error) throw error;
    replaceArray(invoices, (data ?? []).map(mapInvoiceFromDb));
    return invoices;
  } catch (error) {
    warnSupabaseFallback("invoice query", error);
    return invoices;
  }
}
async function getInvoiceForReservation(reservationId) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return invoices.find((invoice) => invoice.reservationId === reservationId);
  try {
    const { data, error } = await supabase.from("invoices").select("*").eq("reservation_id", reservationId).order("issued_at", { ascending: false }).limit(1).maybeSingle();
    if (error) throw error;
    if (!data) return invoices.find((invoice) => invoice.reservationId === reservationId);
    const mapped = mapInvoiceFromDb(data);
    upsertInvoiceInMock(mapped);
    return mapped;
  } catch (error) {
    warnSupabaseFallback("reservation invoice lookup", error);
    return invoices.find((invoice) => invoice.reservationId === reservationId);
  }
}
async function generateInvoicePreview(reservationId) {
  const existing = await getInvoiceForReservation(reservationId);
  if (existing) return existing;
  const supabase = await getSupabaseOrNull();
  if (!supabase)
    throw new Error(tr("Supabase n'est pas configuré.", "Supabase is not configured."));
  const reservation = await findReservationForInvoice(reservationId);
  if (!reservation) throw new Error(tr("Réservation introuvable.", "Booking not found."));
  const invoiceNumber = generateInvoiceNumber(invoices.length + 1);
  const { data, error } = await supabase.from("invoices").insert({
    reservation_id: reservation.id,
    invoice_number: invoiceNumber,
    issued_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    status: reservation.paymentStatus === "paid" ? "paid" : "draft",
    amount: reservation.total
  }).select("*").single();
  if (error) throw error;
  const mapped = mapInvoiceFromDb(data);
  const itemRows = [
    {
      invoice_id: mapped.id,
      label: "Sejour hotelier",
      quantity: Math.max(1, reservation.nights),
      unit_price: reservation.nights > 0 ? Math.round(reservation.roomPrice / reservation.nights) : reservation.roomPrice,
      total: reservation.roomPrice
    },
    {
      invoice_id: mapped.id,
      label: "Taxes et frais",
      quantity: 1,
      unit_price: reservation.taxesAndFees,
      total: reservation.taxesAndFees
    }
  ];
  const { error: itemsError } = await supabase.from("invoice_items").insert(itemRows);
  if (itemsError) throw itemsError;
  upsertInvoiceInMock(mapped);
  return mapped;
}
async function findReservationForInvoice(reservationId) {
  const local = reservations.find((reservation) => reservation.id === reservationId);
  if (local) return local;
  const supabase = await getSupabaseOrNull();
  if (!supabase) return void 0;
  const { data, error } = await supabase.from("reservations").select("reservation_number").eq("id", reservationId).maybeSingle();
  if (error || !data) return void 0;
  return getReservation(data.reservation_number);
}
function upsertInvoiceInMock(invoice) {
  const index = invoices.findIndex((item) => item.id === invoice.id);
  if (index >= 0) invoices[index] = invoice;
  else invoices.unshift(invoice);
}
const $$splitComponentImporter$t = () => import("./admin-josS2Org.mjs");
async function safeDashboardQuery(module, fallback, query) {
  try {
    const data = await query();
    return {
      data: data ?? fallback,
      error: null
    };
  } catch (error) {
    console.error("[ADMIN DASHBOARD ERROR]", error);
    console.error(`${module} dashboard query failed`, error);
    return {
      data: fallback,
      error: getErrorMessage(error)
    };
  }
}
async function loadDashboardData(locationPathname = "/admin") {
  const today2 = getTodayIso();
  const isDashboard = locationPathname === "/admin";
  if (!isDashboard) {
    return {
      isDashboard: false,
      data: emptyDashboardData(today2),
      errors: {
        ...emptyDashboardErrors
      }
    };
  }
  const [rooms2, reservations2, payments2, invoices2, guests, alerts, stats] = await Promise.all([safeDashboardQuery("rooms", [], listRoomTypes), safeDashboardQuery("reservations", [], listReservations), safeDashboardQuery("payments", [], listPayments), safeDashboardQuery("invoices", [], listInvoices), safeDashboardQuery("guests", [], listDashboardGuests), safeDashboardQuery("alerts", [], () => listAutomationAlerts(today2)), safeDashboardQuery("statistics", defaultStats(today2), () => loadDashboardStats(today2))]);
  const data = {
    rooms: asArray(rooms2.data),
    reservations: asArray(reservations2.data),
    payments: asArray(payments2.data),
    invoices: asArray(invoices2.data),
    guests: asArray(guests.data),
    alerts: asArray(alerts.data),
    stats: stats.data ?? defaultStats(today2)
  };
  const errors = {
    reservations: reservations2.error,
    rooms: rooms2.error,
    payments: payments2.error,
    invoices: invoices2.error,
    guests: guests.error,
    alerts: alerts.error,
    statistics: stats.error
  };
  return {
    isDashboard: true,
    data,
    errors
  };
}
async function loadDashboardStats(today2) {
  const [monthlyStats, revenueBySource, availableToday, arrivals, departures, reservationItems] = await Promise.all([getMonthlyRevenueStats().catch((error) => {
    console.error("[ADMIN DASHBOARD ERROR]", error);
    console.error("monthly statistics dashboard query failed", error);
    return defaultRevenueStats(today2);
  }), getRevenueBySource().catch((error) => {
    console.error("[ADMIN DASHBOARD ERROR]", error);
    console.error("revenue source dashboard query failed", error);
    return [];
  }), getAvailableUnitsForDate(today2).catch((error) => {
    console.error("[ADMIN DASHBOARD ERROR]", error);
    console.error("availability dashboard query failed", error);
    return 0;
  }), getTodayCheckIns(today2).catch((error) => {
    console.error("[ADMIN DASHBOARD ERROR]", error);
    console.error("arrivals dashboard query failed", error);
    return [];
  }), getTodayCheckOuts(today2).catch((error) => {
    console.error("[ADMIN DASHBOARD ERROR]", error);
    console.error("departures dashboard query failed", error);
    return [];
  }), listReservations().catch((error) => {
    console.error("[ADMIN DASHBOARD ERROR]", error);
    console.error("current guests dashboard query failed", error);
    return [];
  })]);
  const currentGuests = asArray(reservationItems).filter((reservation) => reservation?.status === "checked_in" && safeDateString(reservation.checkIn) <= today2 && safeDateString(reservation.checkOut) > today2);
  return {
    today: today2,
    monthlyStats: monthlyStats ?? defaultRevenueStats(today2),
    revenueBySource: asArray(revenueBySource),
    availableToday: safeNumber(availableToday),
    arrivals: asArray(arrivals),
    departures: asArray(departures),
    currentGuests
  };
}
async function listDashboardGuests() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return [];
  const {
    data,
    error
  } = await supabase.from("guests").select("*");
  if (error) throw error;
  return (data ?? []).map(mapGuestRow);
}
function mapGuestRow(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    country: row.country,
    identityNumber: row.identity_number
  };
}
function getErrorMessage(error) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  const maybeError = error;
  const parts = [maybeError.message, maybeError.details, maybeError.hint, maybeError.code].filter(Boolean);
  return parts.length ? parts.join(" | ") : tr("Erreur inconnue", "Unknown error");
}
const Route$u = createFileRoute("/admin")({
  beforeLoad: async ({
    location
  }) => {
    if (location.pathname === "/admin/login") return;
    await requireAdmin(location.pathname);
  },
  loader: async ({
    location
  }) => loadDashboardData(location.pathname),
  shouldReload: ({
    location
  }) => location.pathname === "/admin",
  head: () => ({
    meta: [{
      title: headT("Administration - Marina Cap Monastir", "Administration - Marina Cap Monastir")
    }, {
      name: "description",
      content: headT("Tableau de bord hôtelier Marina Cap Monastir.", "Marina Cap Monastir hotel dashboard.")
    }]
  }),
  pendingComponent: AdminDashboardPending,
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
function AdminDashboardPending() {
  const {
    t
  } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: t("Tableau de bord", "Dashboard"), description: t("Chargement des données...", "Loading data..."), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLoadingState, {}),
    false
  ] });
}
function DashboardLoadingState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-8 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block mt-3 h-4 w-full max-w-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4", children: Array.from({
        length: 4
      }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-10 w-full" }, index)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6", children: Array.from({
      length: 6
    }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCardSkeleton, {}, index)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-6 xl:grid-cols-[1.2fr_0.8fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-5 w-48" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block mt-3 h-3 w-64" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-5 animate-spin text-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Array.from({
          length: 4
        }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-4 w-32" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-4 w-20" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-3 w-full rounded-full" })
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-5 w-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1", children: Array.from({
          length: 5
        }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-10 w-full" }, index)) })
      ] })
    ] })
  ] });
}
const $$splitComponentImporter$s = () => import("./actualites-CKumBUbE.mjs");
const Route$t = createFileRoute("/actualites")({
  head: () => ({
    meta: [{
      title: headT("Actualités - Marina Cap Monastir", "News - Marina Cap Monastir")
    }, {
      name: "description",
      content: headT("Actualités de Marina Cap Monastir : événements nautiques, opérations de nettoyage du port, inaugurations et vie de la marina.", "Marina Cap Monastir news: nautical events, harbour clean-up operations, openings and life at the marina.")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./activites-CWKCVCQY.mjs");
const Route$s = createFileRoute("/activites")({
  head: () => ({
    meta: [{
      title: headT("Activités & excursions en bateau - Marina Cap Monastir", "Activities & boat trips - Marina Cap Monastir")
    }, {
      name: "description",
      content: headT("Navire Barbaros, catamaran, pêche en mer, coucher de soleil, jet-ski, plongée et location de yacht au départ de Marina Cap Monastir.", "Barbaros ship, catamaran, sea fishing, sunset cruise, jet ski, diving and yacht charter from Marina Cap Monastir.")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("./index-BqpqZiB0.mjs");
const Route$r = createFileRoute("/")({
  loader: async () => {
    const roomItems = await listRoomTypes();
    return {
      roomItems
    };
  },
  head: () => ({
    meta: [{
      title: headT("Marina Cap Monastir - Réservation appart-hôtel et port de plaisance", "Marina Cap Monastir - Aparthotel and marina bookings")
    }, {
      name: "description",
      content: headT("Réservez un appartement ou une place au port de plaisance à Marina Cap Monastir, avec réception, capitainerie, commerces et activités marines.", "Book an apartment or a berth at Marina Cap Monastir, with reception, harbour office, shops and sea activities.")
    }, {
      property: "og:title",
      content: "Marina Cap Monastir"
    }, {
      property: "og:description",
      content: headT("Appart-hôtel et port de plaisance au bord de la Méditerranée à Monastir.", "Aparthotel and marina on the Mediterranean in Monastir.")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const Route$q = createFileRoute("/client/")({
  beforeLoad: () => {
    throw redirect({ to: "/client/dashboard" });
  }
});
const $$splitComponentImporter$p = () => import("./room._id-BPAbTEyI.mjs");
const $$splitNotFoundComponentImporter$2 = () => import("./room._id-CXYKeVZ3.mjs");
async function loadCalendars(roomId, totalUnits, defaultPrice) {
  const today2 = /* @__PURE__ */ new Date();
  const months = Array.from({
    length: 3
  }, (_, index) => {
    const date = new Date(today2.getFullYear(), today2.getMonth() + index, 1);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1
    };
  });
  return Promise.all(months.map(({
    year,
    month
  }) => getMonthlyCalendar(roomId, year, month, totalUnits, defaultPrice)));
}
const Route$p = createFileRoute("/room/$id")({
  validateSearch: (search) => ({
    checkIn: typeof search.checkIn === "string" ? search.checkIn : void 0,
    checkOut: typeof search.checkOut === "string" ? search.checkOut : void 0,
    adults: Number(search.adults) || 2,
    children: Number(search.children) || 0
  }),
  // staleTime: 0 — never use cached loader data; always fetch fresh availability
  staleTime: 0,
  gcTime: 0,
  loader: async ({
    params
  }) => {
    const room = await getRoomType(params.id);
    if (!room) throw notFound();
    const defaultPrice = room.pricePerNight;
    const totalUnits = room.totalUnits ?? 1;
    const calendars = await loadCalendars(room.id, totalUnits, defaultPrice);
    return {
      room,
      calendars,
      totalUnits,
      defaultPrice
    };
  },
  head: ({
    loaderData
  }) => {
    const room = loaderData ? localizeRoom(loaderData.room, getRequestLocale()) : null;
    return {
      meta: [{
        title: room ? `${room.name} - Marina Cap Monastir` : headT("Appartement - Marina Cap Monastir", "Apartment - Marina Cap Monastir")
      }, {
        name: "description",
        content: room?.description ?? headT("Détail appartement Marina Cap Monastir.", "Marina Cap Monastir apartment details.")
      }]
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./property._id-bb9cIGag.mjs");
const $$splitNotFoundComponentImporter$1 = () => import("./property._id-CFA2G4vE.mjs");
const Route$o = createFileRoute("/property/$id")({
  validateSearch: (search) => ({
    checkIn: typeof search.checkIn === "string" ? search.checkIn : void 0,
    checkOut: typeof search.checkOut === "string" ? search.checkOut : void 0,
    adults: Number(search.adults) || 2,
    children: Number(search.children) || 0
  }),
  loader: async ({
    params
  }) => {
    const room = await getRoomType(params.id);
    if (!room) throw notFound();
    return {
      room
    };
  },
  head: ({
    loaderData
  }) => {
    const room = loaderData ? localizeRoom(loaderData.room, getRequestLocale()) : null;
    return {
      meta: [{
        title: room ? `${room.name} - Marina Cap Monastir` : headT("Chambre - Marina Cap Monastir", "Room - Marina Cap Monastir")
      }, {
        name: "description",
        content: room?.description ?? headT("Détail chambre Marina Cap Monastir.", "Marina Cap Monastir room details.")
      }]
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const PERMISSION_ERROR_MESSAGE = "Permission Supabase refusée. Vérifiez les policies port_tariffs.";
async function listPortTariffs() {
  const supabase = await requireSupabaseClient();
  const { data, error } = await supabase.from("port_tariffs").select("*").order("sort_order", { ascending: true });
  if (error) throw mapPortTariffError(error);
  return (data ?? []).map(mapPortTariffRow);
}
async function listActivePortTariffs() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return [];
  const { data, error } = await supabase.from("port_tariffs").select("*").eq("active", true).order("sort_order", { ascending: true });
  if (error) throw mapPortTariffError(error);
  return (data ?? []).map(mapPortTariffRow);
}
async function createPortTariff(input) {
  const supabase = await requireSupabaseClient();
  const payload = mapPortTariffToDb(input);
  const { data, error } = await supabase.from("port_tariffs").insert(payload).select("*").single();
  if (error) throw mapPortTariffError(error);
  return mapPortTariffRow(data);
}
async function updatePortTariff(id, input) {
  const supabase = await requireSupabaseClient();
  const payload = mapPortTariffToDb(input);
  const { data, error } = await supabase.from("port_tariffs").update(payload).eq("id", id).select("*").single();
  if (error) throw mapPortTariffError(error);
  return mapPortTariffRow(data);
}
async function requireSupabaseClient() {
  const supabase = await getSupabaseOrNull();
  if (!supabase)
    throw new Error(tr("Supabase n'est pas configuré.", "Supabase is not configured."));
  return supabase;
}
function mapPortTariffRow(row) {
  return {
    id: row.id,
    category: row.category,
    lengthMin: row.length_min,
    lengthMax: row.length_max,
    dailyPrice: row.daily_price,
    monthlyPrice: row.monthly_price,
    yearlyPrice: row.yearly_price,
    winteringPrice: row.wintering_price,
    currency: row.currency,
    note: row.note,
    active: row.active,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
function mapPortTariffToDb(input) {
  const payload = {};
  if (input.category !== void 0) payload.category = input.category;
  if (input.lengthMin !== void 0) payload.length_min = input.lengthMin;
  if (input.lengthMax !== void 0) payload.length_max = input.lengthMax;
  if (input.dailyPrice !== void 0) payload.daily_price = input.dailyPrice;
  if (input.monthlyPrice !== void 0) payload.monthly_price = input.monthlyPrice;
  if (input.yearlyPrice !== void 0) payload.yearly_price = input.yearlyPrice;
  if (input.winteringPrice !== void 0) payload.wintering_price = input.winteringPrice;
  if (input.currency !== void 0) payload.currency = input.currency;
  if (input.note !== void 0) payload.note = input.note;
  if (input.active !== void 0) payload.active = input.active;
  if (input.sortOrder !== void 0) payload.sort_order = input.sortOrder;
  return payload;
}
function mapPortTariffError(error) {
  if (isPermissionError$2(error)) return new Error(PERMISSION_ERROR_MESSAGE);
  return new Error(getErrorDetail$2(error) ?? "Erreur Supabase inconnue.");
}
function isPermissionError$2(error) {
  const maybeError = error;
  const haystack = [maybeError?.message, maybeError?.details, maybeError?.code].filter(Boolean).join(" ").toLowerCase();
  return maybeError?.code === "42501" || maybeError?.status === 401 || maybeError?.status === 403 || haystack.includes("permission") || haystack.includes("row-level security") || haystack.includes("rls") || haystack.includes("not authorized");
}
function getErrorDetail$2(error) {
  if (!error) return null;
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  const maybeError = error;
  const parts = [maybeError.message, maybeError.details, maybeError.hint, maybeError.code].filter(
    Boolean
  );
  return parts.length ? parts.join(" | ") : JSON.stringify(error);
}
const $$splitComponentImporter$n = () => import("./port-de-plaisance.tarifs-pOlrTJvx.mjs");
const Route$n = createFileRoute("/port-de-plaisance/tarifs")({
  loader: async () => {
    try {
      return {
        tariffs: await listActivePortTariffs()
      };
    } catch (error) {
      console.warn("[TarifsPortPage] port_tariffs query failed", error);
      return {
        tariffs: []
      };
    }
  },
  head: () => ({
    meta: [{
      title: headT("Tarifs Port — Marina Cap Monastir", "Marina rates — Marina Cap Monastir")
    }, {
      name: "description",
      content: headT("Tarifs d'accostage du port de plaisance de Marina Cap Monastir en dinar tunisien (TND) : journalier, mensuel, annuel, hivernage.", "Berthing rates at the Marina Cap Monastir harbour in Tunisian dinars (TND): daily, monthly, yearly and wintering.")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./port-de-plaisance.reservation-D6y_dv1W.mjs");
const Route$m = createFileRoute("/port-de-plaisance/reservation")({
  head: () => ({
    meta: [{
      title: headT("Réservation Port de Plaisance — Marina Cap Monastir", "Berth booking — Marina Cap Monastir")
    }, {
      name: "description",
      content: headT("Réservez votre place au port de plaisance de Marina Cap Monastir. Formulaire de réservation pour plaisanciers, escale, passage, hivernage.", "Book your berth at the Marina Cap Monastir harbour. Booking form for boaters: stopover, transit, wintering.")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./port-de-plaisance.plan-DpIp0J0h.mjs");
const Route$l = createFileRoute("/port-de-plaisance/plan")({
  head: () => ({
    meta: [{
      title: headT("Plan du Port — Marina Cap Monastir", "Marina map — Marina Cap Monastir")
    }, {
      name: "description",
      content: headT("Découvrez le plan du port de plaisance de Marina Cap Monastir, les accès principaux, la réception Appart-Hôtel, la capitainerie, les quais et les zones de services.", "See the Marina Cap Monastir harbour map: main entrances, aparthotel reception, harbour office, quays and service areas.")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./port-de-plaisance.formalites-BS4Lsw_c.mjs");
const Route$k = createFileRoute("/port-de-plaisance/formalites")({
  head: () => ({
    meta: [{
      title: headT("Formalités Port — Marina Cap Monastir", "Marina formalities — Marina Cap Monastir")
    }, {
      name: "description",
      content: headT("Formalités d'entrée et de sortie du port de plaisance de Marina Cap Monastir — documents requis, procédures d'accueil, VHF, consignes de sécurité.", "Entry and exit formalities at the Marina Cap Monastir harbour — required documents, arrival procedures, VHF and safety rules.")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./client.reservations-D5w8LYxk.mjs");
const Route$j = createFileRoute("/client/reservations")({
  head: () => ({
    meta: [{
      title: headT("Mes réservations - Marina Cap Monastir", "My bookings - Marina Cap Monastir")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./client.register-BTU5dmpx.mjs");
const Route$i = createFileRoute("/client/register")({
  beforeLoad: () => {
    throw redirect({
      to: "/register"
    });
  },
  head: () => ({
    meta: [{
      title: "Inscription client - Marina Cap Monastir"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./client.profile-BmTyBLtL.mjs");
const Route$h = createFileRoute("/client/profile")({
  head: () => ({
    meta: [{
      title: headT("Profil client - Marina Cap Monastir", "My profile - Marina Cap Monastir")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./client.messages-8NETEQKJ.mjs");
const Route$g = createFileRoute("/client/messages")({
  validateSearch: (search) => ({
    conversation: typeof search.conversation === "string" ? search.conversation : void 0
  }),
  head: () => ({
    meta: [{
      title: headT("Messages client - Marina Cap Monastir", "Messages - Marina Cap Monastir")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./client.login-BTU5dmpx.mjs");
const Route$f = createFileRoute("/client/login")({
  validateSearch: (search) => ({
    redirect: typeof search.redirect === "string" && search.redirect.startsWith("/client") ? search.redirect : void 0
  }),
  beforeLoad: ({
    search
  }) => {
    throw redirect({
      to: "/login",
      search: {
        redirect: search.redirect ?? "/client"
      }
    });
  },
  head: () => ({
    meta: [{
      title: "Connexion client - Marina Cap Monastir"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./client.dashboard-COuF0Wkg.mjs");
const Route$e = createFileRoute("/client/dashboard")({
  head: () => ({
    meta: [{
      title: headT("Tableau de bord client - Marina Cap Monastir", "Guest dashboard - Marina Cap Monastir")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./book._id-BCkYnKSP.mjs");
const $$splitNotFoundComponentImporter = () => import("./book._id-Cl5XpmfV.mjs");
const Route$d = createFileRoute("/book/$id")({
  beforeLoad: async ({
    params
  }) => {
    const context = await getCurrentSessionProfile();
    if (!context) {
      throw redirect({
        to: "/login",
        search: {
          redirect: `/book/${params.id}`
        }
      });
    }
    if (context.profile.role !== "client") {
      throw redirect({
        to: getDefaultPathForRole(context.profile.role)
      });
    }
    return {
      clientProfile: context.profile
    };
  },
  loader: async ({
    params
  }) => {
    const room = await getRoomType(params.id);
    if (!room) throw notFound();
    return {
      room
    };
  },
  head: ({
    loaderData
  }) => ({
    meta: [{
      title: loaderData ? headT(`Réserver ${loaderData.room.name} - Marina Cap Monastir`, `Book ${localizeRoomName(loaderData.room, getRequestLocale())} - Marina Cap Monastir`) : headT("Réservation - Marina Cap Monastir", "Booking - Marina Cap Monastir")
    }, {
      name: "description",
      content: headT("Finalisez votre réservation à Marina Cap Monastir.", "Complete your booking at Marina Cap Monastir.")
    }]
  }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./admin.statistics-P4IfapGB.mjs");
const Route$c = createFileRoute("/admin/statistics")({
  loader: async () => {
    const today2 = getTodayIso();
    const tomorrow = nextDayIso(today2);
    const [stats, occupancyRate, roomSales, revenueBySource, reservationItems, roomItems] = await Promise.all([getMonthlyRevenueStats(), getOccupancyRate(), getBestSellingRooms(), getRevenueBySource(), listReservations(), listRoomTypes()]);
    const occupancyByRoom = await Promise.all(roomItems.map(async (room) => {
      const available = await getRoomAvailability(room, today2, tomorrow);
      return {
        room,
        occupied: Math.max(0, room.totalUnits - available)
      };
    }));
    return {
      stats,
      occupancyRate,
      roomSales,
      revenueBySource,
      reservationItems,
      roomItems,
      occupancyByRoom
    };
  },
  head: () => ({
    meta: [{
      title: headT("Statistiques - Marina Cap Monastir", "Statistics - Marina Cap Monastir")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
function nextDayIso(date) {
  const nextDate = /* @__PURE__ */ new Date(`${date}T12:00:00`);
  nextDate.setDate(nextDate.getDate() + 1);
  return nextDate.toISOString().slice(0, 10);
}
const $$splitComponentImporter$b = () => import("./admin.settings-CVOSX912.mjs");
const Route$b = createFileRoute("/admin/settings")({
  loader: async () => {
    const settings = await getHotelSettings();
    return {
      settings
    };
  },
  head: () => ({
    meta: [{
      title: headT("Paramètres - Marina Cap Monastir", "Settings - Marina Cap Monastir")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const EXPECTED_ROOM_COUNT = 4;
function mapAdminRoomFromRow(row) {
  const images = [...row.room_images ?? []].sort((a, b) => a.sort_order - b.sort_order).map((image) => image.url || image.image_url || "").filter(Boolean);
  return {
    id: row.id,
    slug: row.slug ?? row.id,
    name: row.name,
    type: row.category ?? row.type ?? "Appartement",
    description: row.description,
    pricePerNight: Number(row.price_per_night),
    capacityAdults: row.capacity_adults,
    capacityChildren: row.capacity_children,
    beds: row.beds,
    bathrooms: row.bathrooms,
    totalUnits: row.total_units,
    amenities: (row.room_amenities ?? []).map((amenity) => amenity.amenity).filter(Boolean),
    images,
    status: row.status,
    bookings: [],
    units: [...row.room_units ?? []].sort((a, b) => a.unit_number.localeCompare(b.unit_number))
  };
}
function getSupabaseErrorMessage$1(error) {
  if (isPermissionError$1(error)) {
    return tr("Permission Supabase refusée. Vérifiez les policies room_types.", "Supabase permission denied. Check the room_types policies.");
  }
  return getErrorDetail$1(error) ?? tr("Erreur Supabase inconnue.", "Unknown Supabase error.");
}
function getErrorDetail$1(error) {
  if (!error) return null;
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  const maybeError = error;
  const parts = [maybeError.message, maybeError.details, maybeError.hint, maybeError.code].filter(Boolean);
  return parts.length ? parts.join(" | ") : JSON.stringify(error);
}
function isPermissionError$1(error) {
  const maybeError = error;
  const haystack = [maybeError?.message, maybeError?.details, maybeError?.hint, maybeError?.code].filter(Boolean).join(" ").toLowerCase();
  return maybeError?.code === "42501" || maybeError?.status === 401 || maybeError?.status === 403 || haystack.includes("permission") || haystack.includes("row-level security") || haystack.includes("rls") || haystack.includes("not authorized");
}
const $$splitComponentImporter$a = () => import("./admin.rooms-BDLbuFJI.mjs");
const Route$a = createFileRoute("/admin/rooms")({
  loader: loadAdminRoomTypes,
  head: () => ({
    meta: [{
      title: headT("Chambres - Marina Cap Monastir", "Rooms - Marina Cap Monastir")
    }]
  }),
  pendingComponent: AdminRoomsPending,
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
function AdminRoomsPending() {
  const {
    t
  } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: t("Gestion des chambres", "Room management"), description: t("Créez et ajustez les types de chambres, unités, tarifs, photos, équipements et statuts.", "Create and adjust room types, units, rates, photos, amenities and statuses."), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({
    length: EXPECTED_ROOM_COUNT
  }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-16 w-full rounded-lg" }, index)) }) });
}
async function loadAdminRoomTypes() {
  const supabaseConfigured = isSupabaseConfigured();
  if (!supabaseConfigured) {
    return {
      roomItems: [],
      loadError: tr("Supabase n'est pas configuré. Configurez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.", "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."),
      loadErrorDetail: null,
      supabaseConfigured
    };
  }
  try {
    const {
      supabase
    } = await import("./client-Bsz3xj8E.mjs");
    const {
      data,
      error
    } = await supabase.from("room_types").select(`
        *,
        room_amenities(*),
        room_images(*),
        room_units(*)
      `).order("sort_order", {
      ascending: true
    });
    if (error) {
      console.error("[AdminRooms] room_types query failed", error);
      return {
        roomItems: [],
        loadError: getSupabaseErrorMessage$1(error),
        loadErrorDetail: getErrorDetail$1(error),
        supabaseConfigured
      };
    }
    const rows = data ?? [];
    const roomItems = rows.map(mapAdminRoomFromRow);
    console.log("Room types:", roomItems);
    console.log("Room types (raw rows, status included):", rows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      status: row.status
    })));
    return {
      roomItems,
      loadError: null,
      loadErrorDetail: null,
      supabaseConfigured
    };
  } catch (error) {
    console.error("[AdminRooms] room_types load failed", error);
    return {
      roomItems: [],
      loadError: getSupabaseErrorMessage$1(error),
      loadErrorDetail: getErrorDetail$1(error),
      supabaseConfigured
    };
  }
}
const $$splitComponentImporter$9 = () => import("./admin.reservations-BzlOCiWi.mjs");
const Route$9 = createFileRoute("/admin/reservations")({
  head: () => ({
    meta: [{
      title: headT("Réservations - Marina Cap Monastir", "Bookings - Marina Cap Monastir")
    }]
  }),
  loader: async () => {
    await Promise.all([listRoomTypes(), listReservations(), listPayments()]);
    return null;
  },
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./admin.port-tarifs-BNLEY4WS.mjs");
const Route$8 = createFileRoute("/admin/port-tarifs")({
  loader: async () => {
    try {
      const tariffs = await listPortTariffs();
      return {
        tariffs,
        error: null
      };
    } catch (error) {
      return {
        tariffs: [],
        error: error instanceof Error ? error.message : tr("Erreur Supabase inconnue.", "Unknown Supabase error.")
      };
    }
  },
  head: () => ({
    meta: [{
      title: headT("Tarifs Port - Marina Cap Monastir", "Marina rates - Marina Cap Monastir")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin.payments-BJ5IJibN.mjs");
const Route$7 = createFileRoute("/admin/payments")({
  head: () => ({
    meta: [{
      title: headT("Paiements - Marina Cap Monastir", "Payments - Marina Cap Monastir")
    }]
  }),
  loader: async () => {
    await Promise.all([listRoomTypes(), listReservations(), listPayments()]);
    return null;
  },
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.messages-jZK_kaMj.mjs");
const Route$6 = createFileRoute("/admin/messages")({
  validateSearch: (search) => ({
    conversation: typeof search.conversation === "string" ? search.conversation : void 0
  }),
  head: () => ({
    meta: [{
      title: headT("Messages clients - Marina Cap Monastir", "Guest messages - Marina Cap Monastir")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.login-BTU5dmpx.mjs");
const Route$5 = createFileRoute("/admin/login")({
  validateSearch: (search) => ({
    redirect: typeof search.redirect === "string" && search.redirect.startsWith("/admin") ? search.redirect : void 0
  }),
  beforeLoad: ({
    search
  }) => {
    throw redirect({
      to: "/login",
      search: {
        redirect: search.redirect ?? "/admin"
      }
    });
  },
  head: () => ({
    meta: [{
      title: "Connexion admin - Marina Cap Monastir"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.invoices-DR4W4Srp.mjs");
const Route$4 = createFileRoute("/admin/invoices")({
  head: () => ({
    meta: [{
      title: headT("Factures - Marina Cap Monastir", "Invoices - Marina Cap Monastir")
    }]
  }),
  loader: async () => {
    await Promise.all([listRoomTypes(), listReservations(), listPayments(), listInvoices()]);
    return null;
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.direction-C1-fHnBi.mjs");
const Route$3 = createFileRoute("/admin/direction")({
  loader: async () => {
    const today2 = getTodayIso();
    const [monthlyStats, occupancyRate, roomItems, reservationItems, paymentItems, invoiceItems] = await Promise.all([getMonthlyRevenueStats(), getOccupancyRate(today2), listRoomTypes(), listReservations(), listPayments(), listInvoices()]);
    const [availableUnits, revenueBySource, bestRooms, alerts] = await Promise.all([getAvailableUnitsForDate(today2), getRevenueBySource(), getBestSellingRooms(), listAutomationAlerts(today2)]);
    return {
      today: today2,
      monthlyStats,
      occupancyRate,
      roomItems,
      reservationItems,
      paymentItems,
      invoiceItems,
      availableUnits,
      revenueBySource,
      bestRooms,
      alerts
    };
  },
  head: () => ({
    meta: [{
      title: headT("Direction - Marina Cap Monastir", "Management - Marina Cap Monastir")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.clients-C8isILrs.mjs");
const Route$2 = createFileRoute("/admin/clients")({
  head: () => ({
    meta: [{
      title: headT("Clients - Marina Cap Monastir", "Guests - Marina Cap Monastir")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
function getSyncLogsMock$2() {
  return [
    {
      level: "warning",
      message: "API partenaire Airbnb requise avant toute synchronisation réelle."
    }
  ];
}
function getSyncLogsMock$1() {
  return [
    { level: "info", message: "Disponibilités simulées envoyées vers Booking.com." },
    { level: "warning", message: "Parité tarifaire à vérifier avant connexion réelle." }
  ];
}
function getSyncLogsMock() {
  return [{ level: "error", message: "Identifiants Expedia absents dans cette maquette locale." }];
}
const $$splitComponentImporter$1 = () => import("./admin.channels-B2e4uiDh.mjs");
const Route$1 = createFileRoute("/admin/channels")({
  head: () => ({
    meta: [{
      title: headT("Channels - Marina Cap Monastir", "Channels - Marina Cap Monastir")
    }]
  }),
  loader: loadChannelPageData,
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
async function loadChannelPageData() {
  const roomItems = await listRoomTypes();
  const roomOptions = roomItems.map(({
    id,
    name
  }) => ({
    id,
    name
  }));
  const fallbackData = {
    connections: channelConnections,
    mappings: buildMockMappings(roomItems),
    roomOptions,
    logs: getMockAdapterLogs(),
    usingMockLogs: true
  };
  const supabase = await getSupabaseOrNull();
  if (!supabase) return fallbackData;
  try {
    const [connectionsResult, mappingsResult, logsResult] = await Promise.all([supabase.from("channel_connections").select("*").order("channel"), supabase.from("channel_room_mappings").select("*").order("channel"), supabase.from("sync_logs").select("*").order("started_at", {
      ascending: false
    }).limit(20)]);
    if (connectionsResult.error) throw connectionsResult.error;
    if (mappingsResult.error) throw mappingsResult.error;
    if (logsResult.error) throw logsResult.error;
    return {
      connections: connectionsResult.data?.length ? connectionsResult.data.map(mapChannelConnection) : channelConnections,
      mappings: mappingsResult.data?.length ? mappingsResult.data.map(mapChannelRoomMapping) : buildMockMappings(roomItems),
      roomOptions,
      logs: logsResult.data?.length ? logsResult.data.map(mapSyncLog) : getMockAdapterLogs(),
      usingMockLogs: !logsResult.data?.length
    };
  } catch (error) {
    warnSupabaseFallback("channel data query", error);
    return fallbackData;
  }
}
function mapChannelConnection(row) {
  return {
    id: row.channel,
    name: row.name ?? channelLabels[row.channel] ?? row.channel,
    status: row.status,
    lastSync: row.last_sync ? row.last_sync.slice(0, 10) : void 0,
    commissionRate: row.commission_rate ?? void 0,
    importedReservationsCount: row.imported_reservations_count,
    pushedAvailabilityCount: row.pushed_availability_count,
    pushedPricesCount: row.pushed_prices_count,
    errors: row.errors ?? void 0,
    warnings: row.warnings ?? void 0
  };
}
function mapChannelRoomMapping(row) {
  return {
    id: row.id,
    roomTypeId: row.room_type_id,
    channel: row.channel,
    externalListingId: row.external_listing_id,
    syncStatus: row.sync_status
  };
}
function mapSyncLog(row) {
  return {
    channel: channelLabels[row.channel] ?? row.channel,
    level: row.status,
    message: row.message ?? `${row.direction} ${row.status}`
  };
}
function buildMockMappings(roomItems) {
  return roomItems.flatMap((room) => [{
    id: `booking-${room.id}`,
    roomTypeId: room.id,
    channel: "booking_com",
    externalListingId: `BC-${room.id.toUpperCase()}`,
    syncStatus: "synced"
  }, {
    id: `airbnb-${room.id}`,
    roomTypeId: room.id,
    channel: "airbnb",
    externalListingId: "-",
    syncStatus: "not_mapped"
  }, {
    id: `expedia-${room.id}`,
    roomTypeId: room.id,
    channel: "expedia",
    externalListingId: `EXP-${room.id.slice(0, 8)}`,
    syncStatus: "warning"
  }]);
}
function getMockAdapterLogs() {
  return [...getSyncLogsMock$1().map((log) => ({
    channel: "Booking.com",
    ...log
  })), ...getSyncLogsMock$2().map((log) => ({
    channel: "Airbnb",
    ...log
  })), ...getSyncLogsMock().map((log) => ({
    channel: "Expedia",
    ...log
  }))];
}
const AVAILABLE_YEARS = [2026, 2027, 2028];
async function loadAdminCalendarData(range = getDefaultCalendarRange()) {
  const days = getDatesBetween(range.startDate, range.endDate);
  const supabaseConfigured = isSupabaseConfigured();
  if (!supabaseConfigured) {
    return {
      days,
      rooms: [],
      loadError: tr("Supabase n'est pas configuré. Configurez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.", "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."),
      loadErrorDetail: null,
      blockLoadError: null,
      unitLoadError: null,
      rateCount: 0,
      supabaseConfigured
    };
  }
  try {
    const supabase = await requireAdminSupabase();
    const startDate = range.startDate;
    const endDate = range.endDate;
    const endExclusive = addDays(endDate, 1);
    const roomResult = await supabase.from("room_types").select("id, name, price_per_night, total_units, status").order("name");
    if (roomResult.error) throw roomResult.error;
    const roomRows = roomResult.data ?? [];
    const roomIds = roomRows.map((room) => room.id);
    const [ratesResult, reservationsResult, blocksResult, unitsResult] = roomIds.length > 0 ? await Promise.all([supabase.from("room_rate_calendar").select("*").in("room_type_id", roomIds).gte("date", startDate).lte("date", endDate).order("date"), fetchCalendarReservations(supabase, roomIds, startDate, endExclusive), supabase.from("room_availability_blocks").select("id, room_type_id, start_date, end_date, status, reason, created_at").in("room_type_id", roomIds).lt("start_date", endExclusive).gte("end_date", startDate), supabase.from("room_units").select("id, room_type_id, unit_number, status").in("room_type_id", roomIds).order("unit_number")]) : [{
      data: [],
      error: null
    }, {
      data: [],
      error: null,
      roomUnitIdAvailable: false,
      fallbackUsed: false
    }, {
      data: [],
      error: null
    }, {
      data: [],
      error: null
    }];
    if (ratesResult.error) throw ratesResult.error;
    if (reservationsResult.error) throw reservationsResult.error;
    const blockLoadError = blocksResult.error ? `${tr("Les blocs de disponibilité n'ont pas pu être chargés :", "Availability blocks could not be loaded:")} ${getErrorDetail(blocksResult.error)}` : null;
    const unitLoadError = unitsResult.error ? `${tr("Les unités de chambre n'ont pas pu être chargées :", "Room units could not be loaded:")} ${getErrorDetail(unitsResult.error)}` : null;
    if (blocksResult.error) {
      console.error("[AdminCalendar] availability blocks query failed", blocksResult.error);
    }
    if (unitsResult.error) {
      console.error("[AdminCalendar] room_units query failed", unitsResult.error);
    }
    const rates = ratesResult.data ?? [];
    const blocks = blocksResult.error ? [] : blocksResult.data ?? [];
    const units = unitsResult.error ? [] : unitsResult.data ?? [];
    const reservationRows = reservationsResult.data ?? [];
    if (false) ;
    const rateByRoomDate = new Map(rates.map((rate) => [makeRoomDateKey(rate.room_type_id, rate.date), rate]));
    const blockByRoomDate = buildBlockByRoomDate(blocks, startDate, endDate);
    const reservationsByRoomDate = buildReservationCountByRoomDate(reservationRows, startDate, endExclusive);
    const occupiedUnitsByRoomDate = buildOccupiedUnitIdsByRoomDate(reservationRows, startDate, endExclusive);
    const unitsByRoom = groupUnitsByRoom(units);
    const rooms2 = roomRows.map((room) => {
      const totalUnits = Math.max(0, Number(room.total_units ?? 0));
      return {
        id: room.id,
        name: room.name,
        pricePerNight: Number(room.price_per_night ?? 0),
        totalUnits,
        status: room.status,
        units: unitsByRoom.get(room.id) ?? [],
        cells: days.map((date) => {
          const key = makeRoomDateKey(room.id, date);
          const rate = rateByRoomDate.get(key) ?? null;
          const block = blockByRoomDate.get(key) ?? null;
          const reservedUnits = reservationsByRoomDate.get(key) ?? 0;
          const occupiedUnitIds = occupiedUnitsByRoomDate.get(key) ?? /* @__PURE__ */ new Set();
          const rateStatus = normalizeCalendarStatus(rate?.status);
          const blockStatus = normalizeBlockStatus(block?.status);
          const inventoryMode = normalizeInventoryMode(rate?.inventory_mode);
          const unitsAvailableOverride = normalizeUnitsAvailableOverride(rate?.units_available_override);
          const selectedUnitIds = normalizeSelectedUnitIds(rate?.selected_unit_ids);
          const status = inventoryMode === "closed" ? "closed" : blockStatus ?? rateStatus;
          const price = Number(rate?.price ?? room.price_per_night ?? 0);
          const minNights = Math.max(1, Number(rate?.min_nights ?? 1));
          const note = rate?.note ?? rate?.notes ?? null;
          const availableUnits = calculateAvailableUnits({
            totalUnits,
            reservedUnits,
            status,
            block,
            inventoryMode,
            unitsAvailableOverride,
            selectedUnitIds,
            occupiedUnitIds,
            roomUnitIdAvailable: reservationsResult.roomUnitIdAvailable
          });
          return {
            roomTypeId: room.id,
            date,
            availableUnits,
            reservedUnits,
            totalUnits,
            price,
            status,
            effectiveStatus: getEffectiveStatus(status, availableUnits, totalUnits),
            minNights,
            note,
            inventoryMode,
            unitsAvailableOverride,
            selectedUnitIds,
            hasCustomRate: Boolean(rate),
            rateData: rate
          };
        })
      };
    });
    if (false) ;
    return {
      days,
      rooms: rooms2,
      loadError: null,
      loadErrorDetail: null,
      blockLoadError,
      unitLoadError,
      rateCount: rates.length,
      supabaseConfigured
    };
  } catch (error) {
    console.error("[AdminCalendar] calendar load failed", error);
    return {
      days,
      rooms: [],
      loadError: getSupabaseErrorMessage(error),
      loadErrorDetail: getErrorDetail(error),
      blockLoadError: null,
      unitLoadError: null,
      rateCount: 0,
      supabaseConfigured
    };
  }
}
async function fetchCalendarReservations(supabase, roomIds, startDate, endExclusive) {
  const withRoomUnitId = await supabase.from("reservations").select("id, room_type_id, room_unit_id, check_in, check_out, status").in("room_type_id", roomIds).neq("status", "cancelled").lt("check_in", endExclusive).gt("check_out", startDate);
  if (!withRoomUnitId.error) {
    return {
      data: (withRoomUnitId.data ?? []).map((reservation) => ({
        ...reservation,
        room_unit_id: reservation.room_unit_id ?? null
      })),
      error: null,
      roomUnitIdAvailable: true,
      fallbackUsed: false
    };
  }
  if (!isMissingRoomUnitIdColumnError(withRoomUnitId.error)) {
    return {
      data: [],
      error: withRoomUnitId.error,
      roomUnitIdAvailable: false,
      fallbackUsed: false
    };
  }
  const withoutRoomUnitId = await supabase.from("reservations").select("id, room_type_id, check_in, check_out, status").in("room_type_id", roomIds).neq("status", "cancelled").lt("check_in", endExclusive).gt("check_out", startDate);
  if (withoutRoomUnitId.error) {
    return {
      data: [],
      error: withoutRoomUnitId.error,
      roomUnitIdAvailable: false,
      fallbackUsed: true
    };
  }
  return {
    data: (withoutRoomUnitId.data ?? []).map((reservation) => ({
      ...reservation,
      room_unit_id: null
    })),
    error: null,
    roomUnitIdAvailable: false,
    fallbackUsed: true
  };
}
async function requireAdminSupabase() {
  if (!isSupabaseConfigured()) {
    throw new Error(tr("Supabase n'est pas configuré. Configurez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.", "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."));
  }
  const {
    supabase
  } = await import("./client-Bsz3xj8E.mjs");
  return supabase;
}
function getDefaultCalendarRange() {
  const today2 = toIsoDate(/* @__PURE__ */ new Date());
  const {
    selectedYear,
    selectedMonth
  } = getInitialPeriodState(today2);
  return getCalendarRange("month", selectedYear, selectedMonth, today2);
}
function getInitialPeriodState(today2) {
  const todayDate = /* @__PURE__ */ new Date(`${today2}T12:00:00`);
  const currentYear = todayDate.getFullYear();
  const selectedYear = AVAILABLE_YEARS.includes(currentYear) ? currentYear : AVAILABLE_YEARS[0];
  return {
    selectedYear,
    selectedMonth: todayDate.getMonth() + 1,
    anchorDate: selectedYear === currentYear ? today2 : firstOfMonth(selectedYear, todayDate.getMonth() + 1)
  };
}
function getCalendarRange(viewMode, selectedYear, selectedMonth, anchorDate) {
  if (viewMode === "14_days") {
    return {
      startDate: anchorDate,
      endDate: addDays(anchorDate, 13)
    };
  }
  if (viewMode === "year") {
    return {
      startDate: `${selectedYear}-01-01`,
      endDate: `${selectedYear}-12-31`
    };
  }
  const startDate = firstOfMonth(selectedYear, selectedMonth);
  const endMonthDate = addMonths(startDate, viewMode === "3_months" ? 2 : 0);
  return {
    startDate,
    endDate: lastOfMonth(endMonthDate)
  };
}
function buildReservationCountByRoomDate(reservations2, startDate, endExclusive) {
  const counts = /* @__PURE__ */ new Map();
  for (const reservation of reservations2) {
    if (!isActiveReservationStatus(reservation.status)) continue;
    const current = /* @__PURE__ */ new Date(`${maxDate(reservation.check_in, startDate)}T12:00:00`);
    const end = /* @__PURE__ */ new Date(`${minDate(reservation.check_out, endExclusive)}T12:00:00`);
    while (current < end) {
      const date = toIsoDate(current);
      const key = makeRoomDateKey(reservation.room_type_id, date);
      counts.set(key, (counts.get(key) ?? 0) + 1);
      current.setDate(current.getDate() + 1);
    }
  }
  return counts;
}
function buildOccupiedUnitIdsByRoomDate(reservations2, startDate, endExclusive) {
  const occupied = /* @__PURE__ */ new Map();
  for (const reservation of reservations2) {
    if (!isActiveReservationStatus(reservation.status) || !reservation.room_unit_id) continue;
    const current = /* @__PURE__ */ new Date(`${maxDate(reservation.check_in, startDate)}T12:00:00`);
    const end = /* @__PURE__ */ new Date(`${minDate(reservation.check_out, endExclusive)}T12:00:00`);
    while (current < end) {
      const date = toIsoDate(current);
      const key = makeRoomDateKey(reservation.room_type_id, date);
      const unitIds = occupied.get(key) ?? /* @__PURE__ */ new Set();
      unitIds.add(reservation.room_unit_id);
      occupied.set(key, unitIds);
      current.setDate(current.getDate() + 1);
    }
  }
  return occupied;
}
function buildBlockByRoomDate(blocks, startDate, endDate) {
  const blockByDate = /* @__PURE__ */ new Map();
  for (const block of blocks) {
    const current = /* @__PURE__ */ new Date(`${maxDate(block.start_date, startDate)}T12:00:00`);
    const end = /* @__PURE__ */ new Date(`${minDate(block.end_date, endDate)}T12:00:00`);
    while (current <= end) {
      const date = toIsoDate(current);
      blockByDate.set(makeRoomDateKey(block.room_type_id, date), block);
      current.setDate(current.getDate() + 1);
    }
  }
  return blockByDate;
}
function calculateAvailableUnits({
  totalUnits,
  reservedUnits,
  status,
  block,
  inventoryMode,
  unitsAvailableOverride,
  selectedUnitIds,
  occupiedUnitIds,
  roomUnitIdAvailable
}) {
  let availableUnits = calculateInventoryAvailability({
    totalUnits,
    reservedUnits,
    inventoryMode,
    unitsAvailableOverride,
    selectedUnitIds,
    occupiedUnitIds,
    roomUnitIdAvailable
  });
  if (block?.status === "closed" || block?.status === "not_available") {
    availableUnits = 0;
  }
  if (isBlockingStatus(status)) availableUnits = 0;
  return Math.min(totalUnits, Math.max(0, availableUnits));
}
function calculateInventoryAvailability({
  totalUnits,
  reservedUnits,
  inventoryMode,
  unitsAvailableOverride,
  selectedUnitIds,
  occupiedUnitIds,
  roomUnitIdAvailable
}) {
  if (inventoryMode === "closed") return 0;
  if (inventoryMode === "all") return totalUnits;
  if (inventoryMode === "quantity") return clampCount(unitsAvailableOverride ?? 0, totalUnits);
  if (inventoryMode === "specific_units") {
    const selectedCount = selectedUnitIds.length || unitsAvailableOverride || 0;
    if (!roomUnitIdAvailable || selectedUnitIds.length === 0) {
      return clampCount(selectedCount, totalUnits);
    }
    const occupiedSelectedUnits = selectedUnitIds.filter((unitId) => occupiedUnitIds.has(unitId)).length;
    return clampCount(selectedCount - occupiedSelectedUnits, totalUnits);
  }
  return clampCount(totalUnits - reservedUnits, totalUnits);
}
function getEffectiveStatus(status, availableUnits, totalUnits) {
  if (isBlockingStatus(status)) return status;
  if (totalUnits > 0 && availableUnits <= 0) return "not_available";
  if (availableUnits > 0 && availableUnits < totalUnits) return "partially_reserved";
  return status;
}
function isBlockingStatus(status) {
  return status === "not_available" || status === "closed" || status === "maintenance" || status === "reserved";
}
function isActiveReservationStatus(status) {
  return status !== "cancelled" && status !== "no_show" && status !== "checked_out";
}
function normalizeCalendarStatus(status) {
  if (status === "available" || status === "partially_reserved" || status === "not_available" || status === "closed" || status === "maintenance" || status === "reserved") {
    return status;
  }
  return "available";
}
function normalizeBlockStatus(status) {
  if (status === "closed" || status === "not_available" || status === "maintenance") {
    return status;
  }
  if (status === "partially_available" || status === "partially_reserved") {
    return "partially_reserved";
  }
  return null;
}
function normalizeInventoryMode(mode) {
  if (mode === "auto" || mode === "all" || mode === "quantity" || mode === "specific_units" || mode === "closed") {
    return mode;
  }
  return "auto";
}
function normalizeUnitsAvailableOverride(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
function normalizeSelectedUnitIds(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}
function getDatesBetween(startDate, endDate, inclusiveEnd) {
  if (!startDate || !endDate || startDate > endDate) return [];
  const dates = [];
  const current = /* @__PURE__ */ new Date(`${startDate}T12:00:00`);
  const end = /* @__PURE__ */ new Date(`${endDate}T12:00:00`);
  while (current <= end) {
    dates.push(toIsoDate(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}
function addDays(date, days) {
  const next = /* @__PURE__ */ new Date(`${date}T12:00:00`);
  next.setDate(next.getDate() + days);
  return toIsoDate(next);
}
function addMonths(date, months) {
  const next = /* @__PURE__ */ new Date(`${date}T12:00:00`);
  next.setMonth(next.getMonth() + months);
  return toIsoDate(next);
}
function firstOfMonth(year, month) {
  return `${year}-${String(month).padStart(2, "0")}-01`;
}
function lastOfMonth(date) {
  const current = /* @__PURE__ */ new Date(`${date}T12:00:00`);
  return toIsoDate(new Date(current.getFullYear(), current.getMonth() + 1, 0, 12));
}
function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}
function makeRoomDateKey(roomTypeId, date) {
  return `${roomTypeId}:${date}`;
}
function maxDate(first, second) {
  return first > second ? first : second;
}
function minDate(first, second) {
  return first < second ? first : second;
}
function clampCount(value, totalUnits) {
  return Math.min(totalUnits, Math.max(0, Math.trunc(value)));
}
function groupUnitsByRoom(units) {
  const grouped = /* @__PURE__ */ new Map();
  for (const unit of units) {
    const current = grouped.get(unit.room_type_id) ?? [];
    current.push(unit);
    grouped.set(unit.room_type_id, current);
  }
  return grouped;
}
function getSupabaseErrorMessage(error) {
  if (isPermissionError(error)) {
    return tr("Permission Supabase refusée. Vérifiez les policies room_rate_calendar.", "Supabase permission denied. Check the room_rate_calendar policies.");
  }
  return getErrorDetail(error) ?? tr("Erreur Supabase inconnue.", "Unknown Supabase error.");
}
function getErrorDetail(error) {
  if (!error) return null;
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  const maybeError = error;
  const parts = [maybeError.message, maybeError.details, maybeError.hint, maybeError.code].filter(Boolean);
  return parts.length ? parts.join(" | ") : JSON.stringify(error);
}
function isPermissionError(error) {
  const maybeError = error;
  const haystack = [maybeError?.message, maybeError?.details, maybeError?.hint, maybeError?.code].filter(Boolean).join(" ").toLowerCase();
  return maybeError?.code === "42501" || maybeError?.status === 401 || maybeError?.status === 403 || haystack.includes("permission") || haystack.includes("row-level security") || haystack.includes("rls") || haystack.includes("not authorized");
}
function isMissingRoomUnitIdColumnError(error) {
  const maybeError = error;
  const haystack = [maybeError?.message, maybeError?.details, maybeError?.hint].filter(Boolean).join(" ").toLowerCase();
  return maybeError?.code === "42703" && haystack.includes("room_unit_id");
}
const $$splitComponentImporter = () => import("./admin.calendar-CQIhEdgz.mjs");
const Route = createFileRoute("/admin/calendar")({
  loader: () => loadAdminCalendarData(getDefaultCalendarRange()),
  head: () => ({
    meta: [{
      title: headT("Calendrier - Marina Cap Monastir", "Calendar - Marina Cap Monastir")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SearchRoute = Route$C.update({
  id: "/search",
  path: "/search",
  getParentRoute: () => Route$D
});
const RegisterRoute = Route$B.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$D
});
const PresentationRoute = Route$A.update({
  id: "/presentation",
  path: "/presentation",
  getParentRoute: () => Route$D
});
const PortDePlaisanceRoute = Route$z.update({
  id: "/port-de-plaisance",
  path: "/port-de-plaisance",
  getParentRoute: () => Route$D
});
const LoginRoute = Route$y.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$D
});
const ContactRoute = Route$x.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$D
});
const ConfirmationRoute = Route$w.update({
  id: "/confirmation",
  path: "/confirmation",
  getParentRoute: () => Route$D
});
const ClientRoute = Route$v.update({
  id: "/client",
  path: "/client",
  getParentRoute: () => Route$D
});
const AdminRoute = Route$u.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$D
});
const ActualitesRoute = Route$t.update({
  id: "/actualites",
  path: "/actualites",
  getParentRoute: () => Route$D
});
const ActivitesRoute = Route$s.update({
  id: "/activites",
  path: "/activites",
  getParentRoute: () => Route$D
});
const IndexRoute = Route$r.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$D
});
const ClientIndexRoute = Route$q.update({
  id: "/",
  path: "/",
  getParentRoute: () => ClientRoute
});
const RoomIdRoute = Route$p.update({
  id: "/room/$id",
  path: "/room/$id",
  getParentRoute: () => Route$D
});
const PropertyIdRoute = Route$o.update({
  id: "/property/$id",
  path: "/property/$id",
  getParentRoute: () => Route$D
});
const PortDePlaisanceTarifsRoute = Route$n.update({
  id: "/tarifs",
  path: "/tarifs",
  getParentRoute: () => PortDePlaisanceRoute
});
const PortDePlaisanceReservationRoute = Route$m.update({
  id: "/reservation",
  path: "/reservation",
  getParentRoute: () => PortDePlaisanceRoute
});
const PortDePlaisancePlanRoute = Route$l.update({
  id: "/plan",
  path: "/plan",
  getParentRoute: () => PortDePlaisanceRoute
});
const PortDePlaisanceFormalitesRoute = Route$k.update({
  id: "/formalites",
  path: "/formalites",
  getParentRoute: () => PortDePlaisanceRoute
});
const ClientReservationsRoute = Route$j.update({
  id: "/reservations",
  path: "/reservations",
  getParentRoute: () => ClientRoute
});
const ClientRegisterRoute = Route$i.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => ClientRoute
});
const ClientProfileRoute = Route$h.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => ClientRoute
});
const ClientMessagesRoute = Route$g.update({
  id: "/messages",
  path: "/messages",
  getParentRoute: () => ClientRoute
});
const ClientLoginRoute = Route$f.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => ClientRoute
});
const ClientDashboardRoute = Route$e.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => ClientRoute
});
const BookIdRoute = Route$d.update({
  id: "/book/$id",
  path: "/book/$id",
  getParentRoute: () => Route$D
});
const AdminStatisticsRoute = Route$c.update({
  id: "/statistics",
  path: "/statistics",
  getParentRoute: () => AdminRoute
});
const AdminSettingsRoute = Route$b.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AdminRoute
});
const AdminRoomsRoute = Route$a.update({
  id: "/rooms",
  path: "/rooms",
  getParentRoute: () => AdminRoute
});
const AdminReservationsRoute = Route$9.update({
  id: "/reservations",
  path: "/reservations",
  getParentRoute: () => AdminRoute
});
const AdminPortTarifsRoute = Route$8.update({
  id: "/port-tarifs",
  path: "/port-tarifs",
  getParentRoute: () => AdminRoute
});
const AdminPaymentsRoute = Route$7.update({
  id: "/payments",
  path: "/payments",
  getParentRoute: () => AdminRoute
});
const AdminMessagesRoute = Route$6.update({
  id: "/messages",
  path: "/messages",
  getParentRoute: () => AdminRoute
});
const AdminLoginRoute = Route$5.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => AdminRoute
});
const AdminInvoicesRoute = Route$4.update({
  id: "/invoices",
  path: "/invoices",
  getParentRoute: () => AdminRoute
});
const AdminDirectionRoute = Route$3.update({
  id: "/direction",
  path: "/direction",
  getParentRoute: () => AdminRoute
});
const AdminClientsRoute = Route$2.update({
  id: "/clients",
  path: "/clients",
  getParentRoute: () => AdminRoute
});
const AdminChannelsRoute = Route$1.update({
  id: "/channels",
  path: "/channels",
  getParentRoute: () => AdminRoute
});
const AdminCalendarRoute = Route.update({
  id: "/calendar",
  path: "/calendar",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminCalendarRoute,
  AdminChannelsRoute,
  AdminClientsRoute,
  AdminDirectionRoute,
  AdminInvoicesRoute,
  AdminLoginRoute,
  AdminMessagesRoute,
  AdminPaymentsRoute,
  AdminPortTarifsRoute,
  AdminReservationsRoute,
  AdminRoomsRoute,
  AdminSettingsRoute,
  AdminStatisticsRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const ClientRouteChildren = {
  ClientDashboardRoute,
  ClientLoginRoute,
  ClientMessagesRoute,
  ClientProfileRoute,
  ClientRegisterRoute,
  ClientReservationsRoute,
  ClientIndexRoute
};
const ClientRouteWithChildren = ClientRoute._addFileChildren(ClientRouteChildren);
const PortDePlaisanceRouteChildren = {
  PortDePlaisanceFormalitesRoute,
  PortDePlaisancePlanRoute,
  PortDePlaisanceReservationRoute,
  PortDePlaisanceTarifsRoute
};
const PortDePlaisanceRouteWithChildren = PortDePlaisanceRoute._addFileChildren(
  PortDePlaisanceRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  ActivitesRoute,
  ActualitesRoute,
  AdminRoute: AdminRouteWithChildren,
  ClientRoute: ClientRouteWithChildren,
  ConfirmationRoute,
  ContactRoute,
  LoginRoute,
  PortDePlaisanceRoute: PortDePlaisanceRouteWithChildren,
  PresentationRoute,
  RegisterRoute,
  SearchRoute,
  BookIdRoute,
  PropertyIdRoute,
  RoomIdRoute
};
const routeTree = Route$D._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  KpiCard as $,
  Route$x as A,
  Route$w as B,
  bookingStore as C,
  Dialog as D,
  getReservationByNumber as E,
  getRoom as F,
  getReservation as G,
  getRoomType as H,
  localizeRoomName as I,
  getReservationStatusLabels as J,
  getPaymentStatusLabels as K,
  LanguageSwitch as L,
  subscribeToConversationMessages as M,
  tr as N,
  getUnreadClientConversationCount as O,
  signOutClient as P,
  publicClientRoutes as Q,
  Route$C as R,
  Route$u as S,
  emptyDashboardData as T,
  emptyDashboardErrors as U,
  defaultStats as V,
  getTodayIso as W,
  asArray as X,
  safeNumber as Y,
  safeDateString as Z,
  AdminLayout as _,
  getRoomCapacity as a,
  Route as a$,
  adminButtonClasses as a0,
  localizeAlertTitle as a1,
  localizeAlertSeverity as a2,
  localizeAlertDescription as a3,
  AdminNewReservationButton as a4,
  getChannelLabels as a5,
  Route$r as a6,
  localizeRoom as a7,
  Route$p as a8,
  Route$o as a9,
  setPaymentStatus as aA,
  generateInvoicePreview as aB,
  createConversationForAdminReservation as aC,
  Route$d as aD,
  createClientReservation as aE,
  Route$c as aF,
  Route$b as aG,
  AdminButton as aH,
  updateHotelSettings as aI,
  Route$a as aJ,
  EXPECTED_ROOM_COUNT as aK,
  getSupabaseErrorMessage$1 as aL,
  mapAdminRoomFromRow as aM,
  Route$8 as aN,
  createPortTariff as aO,
  updatePortTariff as aP,
  payments as aQ,
  getPaymentMethodLabels as aR,
  Route$6 as aS,
  listAdminConversations as aT,
  updateConversationStatus as aU,
  invoices as aV,
  hotelSettings as aW,
  Route$3 as aX,
  Route$1 as aY,
  translateDemoText as aZ,
  localizeLogLevel as a_,
  isBlockingAvailabilityStatus as aa,
  buildCalendarPriceMap as ab,
  calculateCalendarTotal as ac,
  calculateTotal as ad,
  getBookingQuote as ae,
  Route$n as af,
  CLIENT_MESSAGING_LOCKED_REASON as ag,
  CLIENT_MESSAGING_LOCKED_REASON_EN as ah,
  ACTIVE_RESERVATION_STATUSES as ai,
  listClientReservations as aj,
  createConversationForClientReservation as ak,
  Route$g as al,
  listClientConversations as am,
  getMessages as an,
  markConversationRead as ao,
  clientHasMessagingAccess as ap,
  setActiveConversationId as aq,
  localizeSubject as ar,
  signOut as as,
  reservations as at,
  rooms as au,
  calculatePaidAmount as av,
  calculateRemainingAmount as aw,
  listRoomUnits as ax,
  setReservationStatus as ay,
  assignRoomUnit as az,
  localizeAmenity as b,
  toIsoDate as b0,
  getInitialPeriodState as b1,
  getCalendarRange as b2,
  loadAdminCalendarData as b3,
  Button as b4,
  AVAILABLE_YEARS as b5,
  DialogHeader as b6,
  DialogDescription as b7,
  Input as b8,
  Textarea as b9,
  DialogFooter as ba,
  firstOfMonth as bb,
  requireAdminSupabase as bc,
  getSupabaseErrorMessage as bd,
  getErrorDetail as be,
  getDatesBetween as bf,
  router as bg,
  cn as c,
  Route$B as d,
  logoUrl as e,
  getClientSessionProfile as f,
  getRoomAvailability as g,
  linkGuestReservationsToClient as h,
  isSupabaseConfigured as i,
  registerClient as j,
  DialogContent as k,
  localizeRoomType as l,
  DialogTitle as m,
  heroImg as n,
  Route$y as o,
  getCurrentSessionProfile as p,
  isAdminRole as q,
  roomTypeOptions as r,
  signInWithPasswordAndProfile as s,
  getDefaultPathForRole as t,
  useI18n as u,
  getSupabaseOrNull as v,
  getCurrentProfile as w,
  createConversation as x,
  sendMessage as y,
  warnSupabaseFallback as z
};
