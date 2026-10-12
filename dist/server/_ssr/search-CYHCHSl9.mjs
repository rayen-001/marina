import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as RoomCardSkeleton, a as RoomCard } from "./room-card-DfUckwSd.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { R as Route$C, u as useI18n, g as getRoomAvailability, a as getRoomCapacity, l as localizeRoomType, b as localizeAmenity, r as roomTypeOptions, c as cn } from "./router-CgbkQim6.mjs";
import { S as SiteHeader } from "./site-header-DrEtGnYb.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { f as Search, n as SlidersHorizontal, o as Funnel, R as RotateCcw, W as Waves, C as CalendarDays, U as Users } from "../_libs/lucide-react.mjs";
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
const today = /* @__PURE__ */ new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1e3);
const afterTomorrow = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1e3);
const iso = (date) => date.toISOString().slice(0, 10);
function SearchForm({
  variant = "hero",
  defaultCheckIn = iso(tomorrow),
  defaultCheckOut = iso(afterTomorrow),
  defaultAdults = 2,
  defaultChildren = 0,
  defaultRoomType = "Tous",
  roomTypes
}) {
  const navigate = useNavigate();
  const { t, locale } = useI18n();
  const [checkIn, setCheckIn] = reactExports.useState(defaultCheckIn);
  const [checkOut, setCheckOut] = reactExports.useState(defaultCheckOut);
  const [adults, setAdults] = reactExports.useState(defaultAdults);
  const [children, setChildren] = reactExports.useState(defaultChildren);
  const [roomType, setRoomType] = reactExports.useState(defaultRoomType);
  const types = ["Tous", ...roomTypes ?? roomTypeOptions()];
  const onSubmit = (event) => {
    event.preventDefault();
    navigate({
      to: "/search",
      search: { checkIn, checkOut, adults, children, roomType }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit,
      className: cn(
        "relative grid gap-3 overflow-hidden rounded-lg border bg-card p-3 shadow-[var(--shadow-premium)] md:grid-cols-[1fr_1fr_1.15fr_0.95fr_auto] md:items-end md:p-4",
        variant === "hero" ? "border-white/65" : "border-border shadow-[var(--shadow-soft)]"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-turquoise to-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-4" }), label: t("Arrivée", "Check-in"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            value: checkIn,
            onChange: (event) => setCheckIn(event.target.value),
            className: "w-full bg-transparent text-sm font-bold text-foreground outline-none"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-4" }), label: t("Départ", "Check-out"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            value: checkOut,
            onChange: (event) => setCheckOut(event.target.value),
            className: "w-full bg-transparent text-sm font-bold text-foreground outline-none"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4" }), label: t("Voyageurs", "Guests"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: 1,
              max: 8,
              value: adults,
              "aria-label": t("Adultes", "Adults"),
              onChange: (event) => setAdults(Number(event.target.value)),
              className: "w-full min-w-0 bg-transparent text-sm font-bold text-foreground outline-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: 0,
              max: 6,
              value: children,
              "aria-label": t("Enfants", "Children"),
              onChange: (event) => setChildren(Number(event.target.value)),
              className: "w-full min-w-0 bg-transparent text-sm font-bold text-foreground outline-none"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-4" }), label: "Type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: roomType,
            onChange: (event) => setRoomType(event.target.value),
            className: "w-full bg-transparent text-sm font-bold text-foreground outline-none",
            children: types.map((type, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: type, children: localizeRoomType(type, locale) }, `${type}-${index}`))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "submit",
            className: "inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-ocean hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-4" }),
              t("Rechercher", "Search")
            ]
          }
        )
      ]
    }
  );
}
function Field({
  icon,
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block rounded-lg border border-border bg-background/70 px-3 py-2.5 shadow-inner transition focus-within:border-ring focus-within:bg-card focus-within:ring-2 focus-within:ring-ring/15", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mb-1.5 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: icon }),
      label
    ] }),
    children
  ] });
}
const SORTS = [{
  id: "recommended",
  label: {
    fr: "Recommandé",
    en: "Recommended"
  }
}, {
  id: "price-asc",
  label: {
    fr: "Prix croissant",
    en: "Price: low to high"
  }
}, {
  id: "price-desc",
  label: {
    fr: "Prix décroissant",
    en: "Price: high to low"
  }
}, {
  id: "capacity",
  label: {
    fr: "Capacité",
    en: "Capacity"
  }
}];
function SearchPage() {
  const search = Route$C.useSearch();
  const {
    roomItems
  } = Route$C.useLoaderData();
  const {
    t,
    pick,
    locale,
    formatCurrency
  } = useI18n();
  const roomTypes = reactExports.useMemo(() => Array.from(new Set(roomItems.map((room) => room.type))), [roomItems]);
  const allAmenities = reactExports.useMemo(() => Array.from(new Set(roomItems.flatMap((room) => room.amenities))).sort(), [roomItems]);
  const highestPrice = Math.max(160, ...roomItems.map((room) => room.pricePerNight));
  const [activeType, setActiveType] = reactExports.useState(search.roomType);
  const [maxPrice, setMaxPrice] = reactExports.useState(highestPrice);
  const [amenities, setAmenities] = reactExports.useState(/* @__PURE__ */ new Set());
  const [onlyAvailable, setOnlyAvailable] = reactExports.useState(true);
  const [sort, setSort] = reactExports.useState("recommended");
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const [availabilityByRoom, setAvailabilityByRoom] = reactExports.useState({});
  reactExports.useEffect(() => {
    setActiveType(search.roomType);
  }, [search.roomType]);
  const datesSelected = Boolean(search.checkIn && search.checkOut && search.checkIn < search.checkOut);
  reactExports.useEffect(() => {
    let isMounted = true;
    if (!datesSelected || !search.checkIn || !search.checkOut) {
      setAvailabilityByRoom({});
      setLoading(false);
      return;
    }
    setLoading(true);
    void Promise.all(roomItems.map(async (room) => [room.id, await getRoomAvailability(room, search.checkIn, search.checkOut)])).then((entries) => {
      if (!isMounted) return;
      setAvailabilityByRoom(Object.fromEntries(entries));
      setLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, [datesSelected, roomItems, search.checkIn, search.checkOut]);
  const enriched = reactExports.useMemo(() => roomItems.map((room) => ({
    room,
    available: datesSelected ? availabilityByRoom[room.id] ?? 0 : room.totalUnits
  })), [availabilityByRoom, datesSelected, roomItems]);
  const filtered = reactExports.useMemo(() => {
    const requestedGuests = search.adults + search.children;
    const list = enriched.filter(({
      room,
      available
    }) => {
      if (activeType !== "Tous" && room.type !== activeType) return false;
      if (room.pricePerNight > maxPrice) return false;
      if (requestedGuests > getRoomCapacity(room)) return false;
      for (const amenity of amenities) {
        if (!room.amenities.includes(amenity)) return false;
      }
      if (datesSelected && onlyAvailable && available <= 0) return false;
      return true;
    });
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.room.pricePerNight - b.room.pricePerNight);
        break;
      case "price-desc":
        list.sort((a, b) => b.room.pricePerNight - a.room.pricePerNight);
        break;
      case "capacity":
        list.sort((a, b) => getRoomCapacity(b.room) - getRoomCapacity(a.room));
        break;
    }
    if (datesSelected) {
      list.sort((a, b) => Number(b.available > 0) - Number(a.available > 0));
    }
    return list;
  }, [activeType, amenities, datesSelected, enriched, maxPrice, onlyAvailable, search.adults, search.children, sort]);
  const resetFilters = () => {
    setActiveType("Tous");
    setMaxPrice(highestPrice);
    setAmenities(/* @__PURE__ */ new Set());
    setOnlyAvailable(true);
    setSort("recommended");
  };
  const toggleAmenity = (amenity) => {
    setAmenities((current) => {
      const next = new Set(current);
      if (next.has(amenity)) next.delete(amenity);
      else next.add(amenity);
      return next;
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-secondary/50 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 py-5 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchForm, { variant: "inline", defaultCheckIn: search.checkIn, defaultCheckOut: search.checkOut, defaultAdults: search.adults, defaultChildren: search.children, defaultRoomType: search.roomType, roomTypes }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl px-4 py-8 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-3.5" }),
            t("Résultats de recherche", "Search results")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title text-primary", children: t("Studios et appartements disponibles", "Available studios and apartments") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: filtered.length }),
            " ",
            filtered.length > 1 ? t("résultats", "results") : t("résultat", "result"),
            " ·",
            " ",
            search.adults,
            " ",
            search.adults > 1 ? t("adultes", "adults") : t("adulte", "adult"),
            search.children > 0 ? `, ${search.children} ${search.children > 1 ? t("enfants", "children") : t("enfant", "child")}` : "",
            datesSelected ? ` · ${search.checkIn} → ${search.checkOut}` : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: sort, onChange: (event) => setSort(event.target.value), className: "admin-input h-10 min-w-[160px]", children: SORTS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: item.id, children: pick(item.label) }, item.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setShowFilters((value) => !value), className: `inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-bold shadow-sm transition lg:hidden ${showFilters ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-primary hover:border-accent hover:bg-accent/10"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "size-4" }),
            t("Filtres", "Filters")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar", children: ["Tous", ...roomTypes].map((type, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActiveType(type), className: `h-9 whitespace-nowrap rounded-lg px-4 text-sm font-semibold transition ${activeType === type ? "bg-primary text-primary-foreground shadow-sm" : "border border-border bg-card text-muted-foreground shadow-sm hover:border-accent hover:bg-accent/10 hover:text-primary"}`, children: localizeRoomType(type, locale) }, `${type}-${idx}`)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[268px_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: `${showFilters ? "block" : "hidden"} lg:block`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-[100px] overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-secondary/50 px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "inline-flex items-center gap-2 font-bold text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "size-4 text-accent" }),
              t("Filtres", "Filters")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: resetFilters, className: "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground transition hover:bg-secondary hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "size-3.5" }),
              t("Réinitialiser", "Reset")
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-4", children: [
            datesSelected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 rounded-lg bg-secondary/60 px-3 py-3 text-sm font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: t("Disponibles uniquement", "Available only") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: onlyAvailable, onChange: (event) => setOnlyAvailable(event.target.checked), className: "size-4 accent-primary" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-3 block text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground", children: t("Prix maximum / nuitée", "Maximum price / night") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 80, max: highestPrice, step: 5, value: maxPrice, onChange: (event) => setMaxPrice(Number(event.target.value)), className: "w-full accent-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "80 TND" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-primary px-2 py-0.5 text-sm font-bold text-primary-foreground", children: formatCurrency(maxPrice) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-3 block text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground", children: t("Équipements", "Amenities") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-64 space-y-1.5 overflow-auto pr-1", children: allAmenities.map((amenity) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: amenities.has(amenity), onChange: () => toggleAmenity(amenity), className: "accent-primary" }),
                localizeAmenity(amenity, locale)
              ] }, amenity)) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3", children: Array.from({
          length: 4
        }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(RoomCardSkeleton, {}, index)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-5 flex size-16 items-center justify-center rounded-lg bg-secondary text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Waves, { className: "size-7" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-primary", children: t("Aucune disponibilité trouvée", "No availability found") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground", children: t("Modifiez les dates, le nombre de voyageurs ou les filtres pour afficher d'autres logements.", "Change the dates, number of guests or filters to see other accommodation.") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: resetFilters, className: "mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-ocean", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "size-4" }),
            t("Réinitialiser les filtres", "Reset filters")
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3", children: filtered.map(({
          room,
          available
        }) => /* @__PURE__ */ jsxRuntimeExports.jsx(RoomCard, { room, availableUnits: available, showAvailability: datesSelected, checkIn: search.checkIn, checkOut: search.checkOut, adults: search.adults, children: search.children }, room.id)) }) })
      ] })
    ] })
  ] });
}
export {
  SearchPage as component
};
