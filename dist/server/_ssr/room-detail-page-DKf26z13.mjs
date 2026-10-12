import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as BookingSummary } from "./booking-summary-Zdk_wime.mjs";
import { u as useI18n, a7 as localizeRoom, a as getRoomCapacity, ab as buildCalendarPriceMap, ac as calculateCalendarTotal, ad as calculateTotal, ae as getBookingQuote, C as bookingStore, aa as isBlockingAvailabilityStatus } from "./router-CgbkQim6.mjs";
import { an as ArrowLeft, t as MapPin, a3 as Star, a1 as CircleCheck, D as ChevronLeft, J as ChevronRight, U as Users, B as BedDouble, ao as Bath, W as Waves, s as ShieldCheck, a4 as ConciergeBell, a7 as CalendarCheck, ap as Info, Y as Phone } from "../_libs/lucide-react.mjs";
const MONTH_NAMES = {
  fr: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
const DAY_NAMES = {
  fr: ["L", "M", "M", "J", "V", "S", "D"],
  en: ["M", "T", "W", "T", "F", "S", "S"]
};
function isUnavailableStatus(status) {
  return status === "not_available" || status === "closed" || status === "maintenance" || status === "reserved" || isBlockingAvailabilityStatus(status);
}
function statusColor(status, selected, inRange) {
  if (selected) return "bg-ocean text-white ring-2 ring-ocean/40 font-semibold";
  if (inRange) return "bg-ocean/10 text-ocean-dark font-medium";
  if (isUnavailableStatus(status)) {
    return "bg-rose-100 text-rose-700 border border-rose-200 cursor-not-allowed opacity-75 line-through";
  }
  if (status === "partially_reserved") {
    return "bg-amber-100 text-amber-900 border border-amber-300 font-medium hover:bg-amber-200 cursor-pointer shadow-xs";
  }
  return "bg-emerald-50 text-emerald-900 border border-emerald-200/60 hover:bg-emerald-100 cursor-pointer";
}
function legendColor(status) {
  if (isUnavailableStatus(status)) return "border-rose-300 bg-rose-100";
  if (status === "partially_reserved") return "border-amber-300 bg-amber-100";
  return "border-emerald-300 bg-emerald-100";
}
function getDayOfWeekMonday(dateStr) {
  const d = /* @__PURE__ */ new Date(dateStr + "T12:00:00");
  return (d.getDay() + 6) % 7;
}
const LEGEND = [
  { value: "available", label: { fr: "Disponible", en: "Available" } },
  {
    value: "partially_reserved",
    label: { fr: "Partiellement réservé", en: "Partly booked" }
  },
  { value: "not_available", label: { fr: "Indisponible", en: "Unavailable" } }
];
function CalendarSkeleton({ monthLabel }) {
  const { locale } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-ocean to-turquoise px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold text-sm tracking-wide", children: monthLabel }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 mb-1", children: DAY_NAMES[locale].map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[10px] font-semibold text-gray-400 py-1", children: d }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-[2px]", children: Array.from({ length: 35 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md bg-gray-100 min-h-[44px]" }, i)) })
    ] })
  ] });
}
function AvailabilityCalendar({
  calendars,
  isLoading = false,
  selectedCheckIn,
  selectedCheckOut,
  onSelectCheckIn,
  onSelectCheckOut
}) {
  const { t, pick, locale } = useI18n();
  const today2 = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const statusLabel = (status) => isUnavailableStatus(status) ? t("Indisponible", "Unavailable") : status === "partially_reserved" ? t("Partiellement réservé", "Partly booked") : t("Disponible", "Available");
  const dayMap = reactExports.useMemo(
    () => new Map(calendars.flatMap((c) => c.days.map((d) => [d.date, d.status]))),
    [calendars]
  );
  const handleDayClick = (date, status) => {
    if (isUnavailableStatus(status)) return;
    if (date < today2) return;
    if (!selectedCheckIn || selectedCheckIn && selectedCheckOut) {
      onSelectCheckIn?.(date);
      onSelectCheckOut?.(void 0);
    } else if (date <= selectedCheckIn) {
      onSelectCheckIn?.(date);
    } else {
      const cur = /* @__PURE__ */ new Date(selectedCheckIn + "T12:00:00");
      const end = /* @__PURE__ */ new Date(date + "T12:00:00");
      while (cur < end) {
        const dStr = cur.toISOString().slice(0, 10);
        const s = dayMap.get(dStr);
        if (s && isUnavailableStatus(s)) return;
        cur.setDate(cur.getDate() + 1);
      }
      onSelectCheckOut?.(date);
    }
  };
  const inRange = reactExports.useMemo(() => {
    if (!selectedCheckIn || !selectedCheckOut) return /* @__PURE__ */ new Set();
    const set = /* @__PURE__ */ new Set();
    const cur = /* @__PURE__ */ new Date(selectedCheckIn + "T12:00:00");
    const end = /* @__PURE__ */ new Date(selectedCheckOut + "T12:00:00");
    cur.setDate(cur.getDate() + 1);
    while (cur < end) {
      set.add(cur.toISOString().slice(0, 10));
      cur.setDate(cur.getDate() + 1);
    }
    return set;
  }, [selectedCheckIn, selectedCheckOut]);
  const today_ = /* @__PURE__ */ new Date();
  const skeletonMonths = Array.from({ length: 3 }, (_, i) => {
    const d = new Date(today_.getFullYear(), today_.getMonth() + i, 1);
    return `${MONTH_NAMES[locale][d.getMonth()]} ${d.getFullYear()}`;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 text-xs font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: LEGEND.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-3 w-3 rounded-sm border ${legendColor(opt.value)}` }),
        pick(opt.label)
      ] }, opt.value)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold text-muted-foreground", children: isLoading ? t("Chargement des disponibilités…", "Loading availability…") : !selectedCheckIn ? t("① Cliquez sur la date d'arrivée", "① Click your check-in date") : !selectedCheckOut ? t("② Cliquez sur la date de départ", "② Click your check-out date") : t(
        "✓ Séjour sélectionné (cliquez à nouveau pour changer)",
        "✓ Stay selected (click again to change)"
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", children: isLoading ? skeletonMonths.map((label) => /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarSkeleton, { monthLabel: label }, label)) : calendars.map((cal) => {
      const firstDay = getDayOfWeekMonday(
        `${cal.year}-${String(cal.month).padStart(2, "0")}-01`
      );
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-ocean to-turquoise px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white font-semibold text-sm tracking-wide", children: [
              MONTH_NAMES[locale][cal.month - 1],
              " ",
              cal.year
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 mb-1", children: DAY_NAMES[locale].map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[10px] font-semibold text-gray-400 py-1", children: d }, i)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7 gap-[2px]", children: [
                Array.from({ length: firstDay }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, `empty-${i}`)),
                cal.days.map((day) => {
                  const isSelected = day.date === selectedCheckIn || day.date === selectedCheckOut;
                  const isPast = day.date < today2;
                  const isRangeDay = inRange.has(day.date);
                  const isUnavail = isUnavailableStatus(day.status);
                  const dayNum = parseInt(day.date.slice(8));
                  const cls = isPast ? "text-gray-300 cursor-not-allowed opacity-40" : statusColor(day.status, isSelected, isRangeDay);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      disabled: isPast || isUnavail,
                      onClick: () => handleDayClick(day.date, day.status),
                      "aria-label": `${day.date}, ${statusLabel(day.status)}, ${Math.round(day.price)} DT`,
                      className: `rounded-md flex flex-col items-center justify-center py-1 px-0.5 transition-all text-center min-h-[44px] ${cls}`,
                      title: isUnavail ? `${day.date} — ${t("Indisponible", "Unavailable")}` : `${day.date} — ${Math.round(day.price)} DT/${t("nuit", "night")}${day.minNights > 1 ? ` — min. ${day.minNights} ${t("nuits", "nights")}` : ""}${day.note ? ` — ${day.note}` : ""}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold leading-tight", children: dayNum }),
                        !isPast && !isUnavail && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] leading-tight opacity-80", children: Math.round(day.price) })
                      ]
                    },
                    day.date
                  );
                })
              ] })
            ] })
          ]
        },
        `${cal.year}-${cal.month}`
      );
    }) }),
    selectedCheckIn && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 mt-2", children: selectedCheckOut ? t(
      `Séjour sélectionné : ${selectedCheckIn} → ${selectedCheckOut}`,
      `Selected stay: ${selectedCheckIn} → ${selectedCheckOut}`
    ) : t(
      `Arrivée : ${selectedCheckIn} — Sélectionnez la date de départ`,
      `Check-in: ${selectedCheckIn} — Select your check-out date`
    ) })
  ] });
}
const today = /* @__PURE__ */ new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1e3);
const afterTomorrow = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1e3);
const iso = (date) => date.toISOString().slice(0, 10);
function RoomDetailPage({ room, incoming, calendars = [], isLoadingCalendar = false }) {
  const navigate = useNavigate();
  const { t, locale, formatCurrency } = useI18n();
  const display = localizeRoom(room, locale);
  const capacity = getRoomCapacity(room);
  const [checkIn, setCheckIn] = reactExports.useState(incoming.checkIn ?? iso(tomorrow));
  const [checkOut, setCheckOut] = reactExports.useState(incoming.checkOut ?? iso(afterTomorrow));
  const [adults, setAdults] = reactExports.useState(incoming.adults ?? 2);
  const [children, setChildren] = reactExports.useState(incoming.children ?? 0);
  const [quote, setQuote] = reactExports.useState(null);
  const [quoteLoading, setQuoteLoading] = reactExports.useState(true);
  const [activeImage, setActiveImage] = reactExports.useState(0);
  const priceMap = reactExports.useMemo(() => buildCalendarPriceMap(calendars), [calendars]);
  const fallbackBreakdown = reactExports.useMemo(() => {
    if (priceMap.size > 0 && checkIn && checkOut && checkIn < checkOut) {
      return calculateCalendarTotal(priceMap, checkIn, checkOut, room.pricePerNight);
    }
    return calculateTotal(room, checkIn, checkOut);
  }, [priceMap, checkIn, checkOut, room]);
  const breakdown = quote?.breakdown ?? fallbackBreakdown;
  const availability = quote?.availability ?? room.totalUnits;
  const selectedNightPrice = breakdown.nights > 0 ? Math.round(breakdown.roomPrice / breakdown.nights) : room.pricePerNight;
  const validStay = breakdown.nights > 0 && checkIn < checkOut;
  const fitsCapacity = adults + children <= capacity;
  const canBook = validStay && fitsCapacity && Boolean(quote?.canBook) && !quoteLoading;
  reactExports.useEffect(() => {
    let isMounted = true;
    setQuoteLoading(true);
    void getBookingQuote(room, checkIn, checkOut).then((nextQuote) => {
      if (!isMounted) return;
      setQuote(nextQuote);
      setQuoteLoading(false);
    }).catch(() => {
      if (!isMounted) return;
      setQuote(null);
      setQuoteLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, [room, checkIn, checkOut]);
  const reserve = () => {
    if (!canBook) return;
    bookingStore.set({ roomId: room.id, checkIn, checkOut, adults, children });
    navigate({ to: "/book/$id", params: { id: room.id } });
  };
  const prevImage = () => setActiveImage((index) => index === 0 ? room.images.length - 1 : index - 1);
  const nextImage = () => setActiveImage((index) => index === room.images.length - 1 ? 0 : index + 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background pb-28 lg:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-6 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/search",
          search: { adults: 2, children: 0, roomType: "Tous" },
          className: "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
            t("Retour aux appartements", "Back to apartments")
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-primary/8 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary", children: display.type }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3.5 text-accent" }),
              "Marina Cap Monastir"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-3.5 fill-accent text-accent" }, index)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title text-primary", children: display.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold ${availability > 0 ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "bg-red-50 text-red-700 ring-1 ring-red-200"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4" }),
              quoteLoading ? t("Vérification des dates...", "Checking dates...") : availability > 0 ? t(`${availability} unités disponibles`, `${availability} units available`) : t("Complet sur ces dates", "Fully booked on these dates")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden overflow-hidden rounded-lg border border-border shadow-[var(--shadow-premium)] md:grid md:h-[520px] md:grid-cols-4 md:grid-rows-2 md:gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: room.images[0],
              alt: display.name,
              className: "col-span-2 row-span-2 h-full w-full object-cover transition duration-500 hover:brightness-105"
            }
          ),
          room.images.slice(1, 5).map((image, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: image,
              alt: "",
              className: "h-full w-full object-cover transition duration-500 hover:brightness-105"
            }
          ) }, `${image}-${index}`))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-lg md:hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: room.images[activeImage],
              alt: display.name,
              className: "h-full w-full object-cover"
            }
          ) }),
          room.images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: prevImage,
                "aria-label": t("Photo précédente", "Previous photo"),
                className: "absolute left-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-4 text-primary" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: nextImage,
                "aria-label": t("Photo suivante", "Next photo"),
                className: "absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-4 text-primary" })
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10 grid gap-10 lg:grid-cols-[1fr_390px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4", children: [
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-5" }),
              label: t("Capacité", "Capacity"),
              value: t(`${capacity} personnes`, `${capacity} guests`)
            },
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "size-5" }),
              label: t("Couchage", "Beds"),
              value: display.beds
            },
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bath, { className: "size-5" }),
              label: t("Bains", "Bathrooms"),
              value: t(
                `${room.bathrooms} salle${room.bathrooms > 1 ? "s" : ""} de bain`,
                `${room.bathrooms} bathroom${room.bathrooms > 1 ? "s" : ""}`
              )
            },
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Waves, { className: "size-5" }),
              label: t("Ambiance", "Setting"),
              value: t("Port de plaisance", "Marina")
            }
          ].map((spec) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-lg border border-border bg-card p-4 shadow-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-accent", children: spec.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground", children: spec.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm font-semibold text-foreground", children: spec.value })
              ]
            },
            spec.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "gold-rule text-2xl font-black text-primary", children: t("Séjour à Marina Cap Monastir", "Your stay at Marina Cap Monastir") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-3xl text-base leading-8 text-foreground/78", children: display.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "gold-rule text-2xl font-black text-primary", children: t("Équipements inclus", "Included amenities") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3", children: display.amenities.map((amenity) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 rounded-lg border border-border bg-card p-3.5 text-sm font-semibold shadow-sm transition hover:border-accent/40 hover:bg-accent/5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-4 shrink-0 text-accent" }),
                  amenity
                ]
              },
              amenity
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              HighlightCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ConciergeBell, { className: "size-5" }),
                title: t("Réception", "Reception"),
                text: t(
                  "Assistance pour arrivées, départs et demandes spéciales.",
                  "Help with arrivals, departures and special requests."
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              HighlightCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Waves, { className: "size-5" }),
                title: t("Port de plaisance", "Marina"),
                text: t(
                  "Accès rapide aux pontons, restaurants et activités marines.",
                  "Quick access to the pontoons, restaurants and sea activities."
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              HighlightCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-5" }),
                title: t("Réservation directe", "Direct booking"),
                text: t(
                  "Disponibilité calculée sur l'inventaire réel des unités.",
                  "Availability based on the real number of units."
                )
              }
            )
          ] }),
          (calendars.length > 0 || isLoadingCalendar) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "gold-rule text-2xl font-black text-primary", children: t("Disponibilités & Tarifs", "Availability & Rates") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 flex items-center gap-1.5 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "size-3.5 shrink-0" }),
              t("À partir de", "From"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: formatCurrency(selectedNightPrice) }),
              " ",
              t(
                "par nuitée — les tarifs varient selon la saison.",
                "per night — rates vary with the season."
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              AvailabilityCalendar,
              {
                calendars,
                isLoading: isLoadingCalendar,
                selectedCheckIn: checkIn,
                selectedCheckOut: checkOut,
                onSelectCheckIn: (d) => {
                  setCheckIn(d);
                  setCheckOut("");
                },
                onSelectCheckOut: setCheckOut
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:sticky lg:top-24 lg:self-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-premium)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground", children: t("À partir de", "From") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-3xl font-black text-primary", children: formatCurrency(selectedNightPrice) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: t("par nuitée", "per night") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "tel:+21673462305",
                    className: "inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-accent hover:bg-accent/10 hover:text-accent",
                    title: t("Contacter la réception", "Call reception"),
                    "aria-label": t("Contacter la réception", "Call reception"),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DateField, { label: t("Arrivée", "Check-in"), value: checkIn, onChange: setCheckIn }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DateField,
                  {
                    label: t("Départ", "Check-out"),
                    value: checkOut,
                    onChange: setCheckOut
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  NumberField,
                  {
                    label: t("Adultes", "Adults"),
                    value: adults,
                    min: 1,
                    max: capacity,
                    onChange: setAdults
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  NumberField,
                  {
                    label: t("Enfants", "Children"),
                    value: children,
                    min: 0,
                    max: capacity,
                    onChange: setChildren
                  }
                )
              ] }),
              !fitsCapacity && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 rounded-lg bg-destructive/10 p-3 text-xs font-medium text-destructive", children: t(
                "La capacité demandée dépasse celle de cet appartement.",
                "The number of guests exceeds this apartment's capacity."
              ) }),
              quoteLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 rounded-lg bg-secondary p-3 text-xs font-medium text-muted-foreground", children: t(
                "Vérification du tarif et de la disponibilité...",
                "Checking rate and availability..."
              ) }),
              !quoteLoading && quote?.reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs font-semibold text-destructive", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "mt-0.5 size-4 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: quote.reason })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                BookingSummary,
                {
                  room,
                  breakdown,
                  checkIn,
                  checkOut,
                  nightlyPrice: selectedNightPrice,
                  nightlyRates: quote?.nightlyRates ?? [],
                  compact: true
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  disabled: !canBook,
                  onClick: reserve,
                  title: !canBook ? quote?.reason ?? t(
                    "Réservation indisponible pour ces dates",
                    "Booking unavailable for these dates"
                  ) : t("Réserver cet appartement", "Book this apartment"),
                  className: "mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-ocean hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-primary disabled:hover:shadow-none",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-4" }),
                    !canBook && quote?.reason ? t("Réservation indisponible", "Booking unavailable") : t("Réserver cet appartement", "Book this apartment")
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "/contact",
                  className: "mt-2 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border text-sm font-semibold text-muted-foreground transition hover:border-accent hover:bg-accent/5 hover:text-accent",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "size-4" }),
                    t("Demande d'information", "Ask a question")
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-center text-xs text-muted-foreground", children: [
                t("Disponibilité :", "Availability:"),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: availability }),
                " ",
                t(
                  `unité${availability > 1 ? "s" : ""} sur ces dates`,
                  `unit${availability > 1 ? "s" : ""} on these dates`
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 rounded-lg border border-border bg-card p-4 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5 text-xs font-medium text-muted-foreground", children: [
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3.5 text-emerald-600" }),
              text: t(
                "Réservation sécurisée, aucune carte stockée",
                "Secure booking, no card details stored"
              )
            },
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3.5 text-turquoise" }),
              text: t("Confirmation immédiate par email", "Instant email confirmation")
            },
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ConciergeBell, { className: "size-3.5 text-accent" }),
              text: t(
                "Réception disponible pour vous assister",
                "Reception available to help you"
              )
            }
          ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            item.icon,
            item.text
          ] }, item.text)) }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/96 px-4 py-3 shadow-2xl backdrop-blur lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg font-black text-primary", children: [
          formatCurrency(selectedNightPrice),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-muted-foreground", children: [
            " ",
            "/ ",
            t("nuitée", "night")
          ] })
        ] }),
        breakdown.nights > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          breakdown.nights,
          " ",
          breakdown.nights > 1 ? t("nuits", "nights") : t("nuit", "night"),
          " ·",
          " ",
          formatCurrency(breakdown.total)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          disabled: !canBook,
          onClick: reserve,
          className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm disabled:opacity-50",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-4" }),
            t("Réserver", "Book")
          ]
        }
      )
    ] }) })
  ] });
}
function HighlightCard({
  icon,
  title,
  text
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-card premium-card-hover rounded-lg p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex size-10 items-center justify-center rounded-lg bg-secondary text-accent", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-primary", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs leading-5 text-muted-foreground", children: text })
  ] });
}
function DateField({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "rounded-lg border border-border bg-background px-3 py-2.5 transition focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/15", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "date",
        value: value ?? "",
        onChange: (event) => onChange(event.target.value),
        className: "mt-1 w-full bg-transparent text-sm font-semibold outline-none"
      }
    )
  ] });
}
function NumberField({
  label,
  value,
  min,
  max,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "rounded-lg border border-border bg-background px-3 py-2.5 transition focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/15", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "number",
        min,
        max,
        value,
        onChange: (event) => onChange(Number(event.target.value)),
        className: "mt-1 w-full bg-transparent text-sm font-semibold outline-none"
      }
    )
  ] });
}
export {
  RoomDetailPage as R
};
