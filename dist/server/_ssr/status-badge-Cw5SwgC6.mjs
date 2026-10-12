import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useI18n, c as cn, J as getReservationStatusLabels, K as getPaymentStatusLabels, a5 as getChannelLabels } from "./router-CgbkQim6.mjs";
function StatusBadge(props) {
  const { locale } = useI18n();
  const label = getLabel(props, locale);
  const tone = getTone(props);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold leading-none shadow-sm",
        tone === "green" && "border-emerald-200 bg-emerald-50 text-emerald-800",
        tone === "gold" && "border-amber-200 bg-amber-50 text-amber-900",
        tone === "red" && "border-red-200 bg-red-50 text-red-700",
        tone === "blue" && "border-turquoise/20 bg-turquoise/10 text-primary",
        tone === "gray" && "border-border bg-secondary text-muted-foreground"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "size-1.5 rounded-full",
              tone === "green" && "bg-emerald-500",
              tone === "gold" && "bg-accent",
              tone === "red" && "bg-red-500",
              tone === "blue" && "bg-turquoise",
              tone === "gray" && "bg-muted-foreground"
            )
          }
        ),
        label
      ]
    }
  );
}
function getLabel(props, locale) {
  const en = locale === "en";
  if (props.kind === "reservation") return getReservationStatusLabels(locale)[props.value];
  if (props.kind === "payment") return getPaymentStatusLabels(locale)[props.value];
  if (props.kind === "source") return getChannelLabels(locale)[props.value];
  if (props.kind === "room") {
    if (props.value === "active") return en ? "Active" : "Actif";
    if (props.value === "maintenance") return "Maintenance";
    if (props.value === "occupied") return en ? "Occupied" : "Occupé";
    if (props.value === "cleaning_required") return en ? "Cleaning" : "Ménage";
    return en ? "Inactive" : "Inactif";
  }
  if (props.value === "connected") return en ? "Connected" : "Connecté";
  return en ? "Not connected" : "Non connecté";
}
function getTone(props) {
  if (props.kind === "reservation") {
    if (["confirmed", "checked_in", "checked_out"].includes(props.value)) return "green";
    if (props.value === "pending") return "gold";
    return "red";
  }
  if (props.kind === "payment") {
    if (props.value === "paid") return "green";
    if (props.value === "deposit_paid") return "blue";
    if (props.value === "refunded") return "gray";
    return "gold";
  }
  if (props.kind === "room") {
    if (props.value === "active") return "green";
    if (props.value === "maintenance" || props.value === "cleaning_required") return "gold";
    if (props.value === "occupied") return "blue";
    return "gray";
  }
  if (props.kind === "channel") return props.value === "connected" ? "green" : "gray";
  return "blue";
}
export {
  StatusBadge as S
};
