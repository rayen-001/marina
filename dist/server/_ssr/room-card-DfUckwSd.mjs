import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useI18n, a7 as localizeRoom, a as getRoomCapacity, C as bookingStore } from "./router-CgbkQim6.mjs";
import { U as Users, J as ChevronRight } from "../_libs/lucide-react.mjs";
function RoomCard({
  room,
  availableUnits,
  showAvailability,
  checkIn,
  checkOut,
  adults,
  children
}) {
  const { t, locale, formatCurrency } = useI18n();
  const display = localizeRoom(room, locale);
  const soldOut = showAvailability && availableUnits === 0;
  const scarce = showAvailability && availableUnits !== void 0 && availableUnits > 0 && availableUnits <= 2;
  const search = { checkIn, checkOut, adults: adults ?? 2, children: children ?? 0 };
  const capacity = getRoomCapacity(room);
  const hasDates = Boolean(checkIn && checkOut && checkIn < checkOut);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[var(--shadow-lift)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/room/$id",
        params: { id: room.id },
        search,
        className: "relative block aspect-[4/3] overflow-hidden bg-secondary",
        "aria-label": `${t("Voir les détails", "View details")} : ${display.name}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: room.images[0],
              alt: display.name,
              loading: "lazy",
              className: `h-full w-full object-cover transition duration-700 group-hover:scale-105 ${soldOut ? "grayscale" : ""}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ocean/70 via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-3 rounded-md border border-white/50 bg-white/94 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-primary shadow-sm backdrop-blur", children: display.type }),
          showAvailability && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] shadow-sm backdrop-blur ${soldOut ? "bg-ocean text-white" : scarce ? "bg-accent text-accent-foreground" : "bg-emerald-500/90 text-white"}`,
              children: soldOut ? t("Complet", "Fully booked") : scarce ? t(`${availableUnits} restantes`, `${availableUnits} left`) : t(`${availableUnits} disponibles`, `${availableUnits} available`)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground", children: [
              t("À partir de", "From"),
              " "
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-black text-primary", children: formatCurrency(room.pricePerNight) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground", children: [
              " ",
              "/ ",
              t("nuitée", "night")
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black leading-tight text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/room/$id",
          params: { id: room.id },
          search,
          className: "transition-colors hover:text-accent",
          children: display.name
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4 shrink-0 text-accent" }),
        t(`Jusqu'à ${capacity} personnes`, `Up to ${capacity} guests`)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between gap-2 pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/room/$id",
            params: { id: room.id },
            search,
            className: "inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-semibold text-muted-foreground transition hover:border-accent/40 hover:bg-accent/5 hover:text-accent",
            children: t("Voir détails", "View details")
          }
        ),
        soldOut ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-10 cursor-not-allowed items-center rounded-lg bg-muted px-4 text-sm font-black text-muted-foreground", children: t("Complet", "Fully booked") }) : hasDates ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/book/$id",
            params: { id: room.id },
            onClick: () => bookingStore.set({
              roomId: room.id,
              checkIn,
              checkOut,
              adults: search.adults,
              children: search.children
            }),
            className: "inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-black text-primary-foreground shadow-sm transition-all hover:bg-accent hover:text-accent-foreground",
            children: [
              t("Réserver", "Book"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-4" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/room/$id",
            params: { id: room.id },
            search,
            className: "inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-black text-primary-foreground shadow-sm transition-all hover:bg-accent hover:text-accent-foreground",
            children: [
              t("Réserver", "Book"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-4" })
            ]
          }
        )
      ] })
    ] })
  ] });
}
function RoomCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] skeleton-block rounded-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-5 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-4 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-10 w-28 rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-10 w-28 rounded-lg" })
      ] })
    ] })
  ] });
}
export {
  RoomCardSkeleton as R,
  RoomCard as a
};
