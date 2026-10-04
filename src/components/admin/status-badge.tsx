import type { ChannelSource, PaymentStatus, ReservationStatus, RoomStatus } from "@/data/hotel";
import { useI18n } from "@/lib/i18n/I18nProvider";
import {
  getChannelLabels,
  getPaymentStatusLabels,
  getReservationStatusLabels,
} from "@/lib/i18n/labels";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";

type Props =
  | { kind: "reservation"; value: ReservationStatus }
  | { kind: "payment"; value: PaymentStatus }
  | { kind: "room"; value: RoomStatus }
  | { kind: "channel"; value: "connected" | "not_connected" }
  | { kind: "source"; value: ChannelSource };

export function StatusBadge(props: Props) {
  const { locale } = useI18n();
  const label = getLabel(props, locale);
  const tone = getTone(props);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold leading-none shadow-sm",
        tone === "green" && "border-emerald-200 bg-emerald-50 text-emerald-800",
        tone === "gold" && "border-amber-200 bg-amber-50 text-amber-900",
        tone === "red" && "border-red-200 bg-red-50 text-red-700",
        tone === "blue" && "border-turquoise/20 bg-turquoise/10 text-primary",
        tone === "gray" && "border-border bg-secondary text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          tone === "green" && "bg-emerald-500",
          tone === "gold" && "bg-accent",
          tone === "red" && "bg-red-500",
          tone === "blue" && "bg-turquoise",
          tone === "gray" && "bg-muted-foreground",
        )}
      />
      {label}
    </span>
  );
}

function getLabel(props: Props, locale: Locale) {
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

function getTone(props: Props): "green" | "gold" | "red" | "blue" | "gray" {
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
