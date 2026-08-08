import {
  channelLabels,
  paymentStatusLabels,
  reservationStatusLabels,
  type ChannelSource,
  type PaymentStatus,
  type ReservationStatus,
  type RoomStatus,
} from "@/data/hotel";
import { cn } from "@/lib/utils";

type Props =
  | { kind: "reservation"; value: ReservationStatus }
  | { kind: "payment"; value: PaymentStatus }
  | { kind: "room"; value: RoomStatus }
  | { kind: "channel"; value: "connected" | "not_connected" }
  | { kind: "source"; value: ChannelSource };

export function StatusBadge(props: Props) {
  const label = getLabel(props);
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

function getLabel(props: Props) {
  if (props.kind === "reservation") return reservationStatusLabels[props.value];
  if (props.kind === "payment") return paymentStatusLabels[props.value];
  if (props.kind === "source") return channelLabels[props.value];
  if (props.kind === "room") {
    if (props.value === "active") return "Actif";
    if (props.value === "maintenance") return "Maintenance";
    if (props.value === "occupied") return "Occupe";
    if (props.value === "cleaning_required") return "Menage";
    return "Inactif";
  }
  return props.value === "connected" ? "Connecte" : "Non connecte";
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
