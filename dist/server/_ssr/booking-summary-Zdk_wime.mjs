import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useI18n, a7 as localizeRoom } from "./router-CgbkQim6.mjs";
import { C as CalendarDays, aC as Moon, a as CreditCard, aa as ReceiptText, s as ShieldCheck } from "../_libs/lucide-react.mjs";
function BookingSummary({
  room,
  breakdown,
  checkIn,
  checkOut,
  compact = false,
  nightlyPrice,
  nightlyRates = []
}) {
  const { t, locale, formatCurrency, formatDate } = useI18n();
  const display = localizeRoom(room, locale);
  const nightsLabel = (count) => count > 1 ? t(`${count} nuits`, `${count} nights`) : t(`${count} nuit`, `${count} night`);
  const displayedNightlyPrice = nightlyPrice ?? (breakdown.nights > 0 ? Math.round(breakdown.roomPrice / breakdown.nights) : room.pricePerNight);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-gradient-to-r from-accent via-turquoise to-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 border-b border-border pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: room.images[0],
            alt: display.name,
            className: "size-20 rounded-lg object-cover shadow-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-black uppercase tracking-[0.14em] text-accent", children: display.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 line-clamp-2 font-black leading-tight text-primary", children: display.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs font-semibold text-muted-foreground", children: "Marina Cap Monastir" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SummaryRow,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-4" }),
            label: t("Dates", "Dates"),
            value: `${checkIn ?? "-"} ${t("au", "to")} ${checkOut ?? "-"}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SummaryRow,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "size-4" }),
            label: t("Nuits", "Nights"),
            value: nightsLabel(breakdown.nights)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PriceRow,
          {
            label: `${formatCurrency(displayedNightlyPrice)} x ${nightsLabel(breakdown.nights)}`,
            value: formatCurrency(breakdown.roomPrice)
          }
        ),
        nightlyRates.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-background p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-xs font-black uppercase tracking-[0.12em] text-muted-foreground", children: t("Détail par nuit", "Night-by-night breakdown") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-44 space-y-2 overflow-auto pr-1", children: nightlyRates.map((night) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between gap-3 text-xs text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: formatDate(night.date, { day: "2-digit", month: "short" }) }),
                  night.isSpecialRate && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold text-primary", children: t("spécial", "special") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-black text-primary", children: formatCurrency(night.price) })
              ]
            },
            night.date
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PriceRow,
          {
            label: t("Taxes et frais", "Taxes and fees"),
            value: formatCurrency(breakdown.taxesAndFees)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PriceRow,
          {
            label: t("Acompte conseillé", "Suggested deposit"),
            value: formatCurrency(breakdown.deposit),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PriceRow,
          {
            label: t("Reste à régler", "Balance due"),
            value: formatCurrency(breakdown.remainingAmount)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg bg-secondary px-3 py-3 text-base font-black text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptText, { className: "size-4" }),
            "Total"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(breakdown.total) })
        ] }),
        !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-start gap-2 rounded-lg border border-turquoise/15 bg-turquoise/10 p-3 text-xs font-medium leading-5 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mt-0.5 size-4 shrink-0 text-turquoise" }),
          t(
            "Aucun numéro de carte ni CVC n'est collecté. Le règlement est suivi uniquement par statut de paiement.",
            "No card number or CVC is collected. Payment is tracked by payment status only."
          )
        ] })
      ] })
    ] })
  ] });
}
function SummaryRow({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: icon }),
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right font-bold text-foreground", children: value })
  ] });
}
function PriceRow({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
      icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: icon }),
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: value })
  ] });
}
export {
  BookingSummary as B
};
