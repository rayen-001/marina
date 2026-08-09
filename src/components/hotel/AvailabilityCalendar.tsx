import { useMemo } from "react";
import {
  isBlockingAvailabilityStatus,
  ROOM_DATE_STATUS_OPTIONS,
  type DayAvailability,
  type MonthCalendar,
} from "@/lib/services/rateCalendarService";

interface AvailabilityCalendarProps {
  calendars: MonthCalendar[];
  selectedCheckIn?: string;
  selectedCheckOut?: string;
  onSelectCheckIn?: (date: string) => void;
  onSelectCheckOut?: (date: string) => void;
}

const MONTH_NAMES_FR = [
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
  "Décembre",
];

const DAY_NAMES = ["L", "M", "M", "J", "V", "S", "D"];

function normalizePublicStatus(status: DayAvailability): DayAvailability {
  if (status === "closed" || status === "maintenance" || status === "reserved" || status === "not_available") {
    return "not_available";
  }
  return status;
}

function statusColor(status: DayAvailability, selected: boolean, inRange: boolean): string {
  if (selected) return "bg-ocean text-white ring-2 ring-ocean/40 font-semibold";
  if (inRange) return "bg-ocean/10 text-ocean-dark";
  const normalized = normalizePublicStatus(status);
  switch (normalized) {
    case "available":
      return "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 cursor-pointer";
    case "partially_reserved":
      return "bg-amber-50 text-amber-900 hover:bg-amber-100 cursor-pointer";
    case "not_available":
    default:
      return "bg-rose-50 text-rose-800 cursor-not-allowed opacity-70";
  }
}

function legendColor(status: DayAvailability): string {
  const normalized = normalizePublicStatus(status);
  switch (normalized) {
    case "available":
      return "border-emerald-300 bg-emerald-100";
    case "partially_reserved":
      return "border-amber-300 bg-amber-100";
    case "not_available":
    default:
      return "border-rose-300 bg-rose-100";
  }
}

function getDayOfWeekMonday(dateStr: string): number {
  const d = new Date(dateStr + "T12:00:00");
  return (d.getDay() + 6) % 7; // 0=Mon … 6=Sun
}

const PUBLIC_STATUS_LEGEND_OPTIONS: Array<{ value: DayAvailability; label: string }> = [
  { value: "available", label: "Disponible" },
  { value: "partially_reserved", label: "Partiellement réservé" },
  { value: "not_available", label: "Indisponible" },
];

export function AvailabilityCalendar({
  calendars,
  selectedCheckIn,
  selectedCheckOut,
  onSelectCheckIn,
  onSelectCheckOut,
}: AvailabilityCalendarProps) {
  const today = new Date().toISOString().slice(0, 10);

  const dayMap = useMemo(
    () => new Map(calendars.flatMap((c) => c.days.map((d) => [d.date, d.status]))),
    [calendars],
  );

  const handleDayClick = (date: string, status: DayAvailability) => {
    if (
      isBlockingAvailabilityStatus(status) ||
      status === "not_available" ||
      status === "closed" ||
      status === "maintenance"
    ) {
      return;
    }
    if (date < today) return;

    if (!selectedCheckIn || (selectedCheckIn && selectedCheckOut)) {
      onSelectCheckIn?.(date);
      onSelectCheckOut?.(undefined as unknown as string);
    } else if (date <= selectedCheckIn) {
      onSelectCheckIn?.(date);
    } else {
      const cur = new Date(selectedCheckIn + "T12:00:00");
      const end = new Date(date + "T12:00:00");
      let hasBlocked = false;
      while (cur < end) {
        const dStr = cur.toISOString().slice(0, 10);
        const s = dayMap.get(dStr);
        if (
          s &&
          (isBlockingAvailabilityStatus(s) ||
            s === "not_available" ||
            s === "closed" ||
            s === "maintenance")
        ) {
          hasBlocked = true;
          break;
        }
        cur.setDate(cur.getDate() + 1);
      }

      if (hasBlocked) {
        return;
      }

      onSelectCheckOut?.(date);
    }
  };

  const inRange = useMemo(() => {
    if (!selectedCheckIn || !selectedCheckOut) return new Set<string>();
    const set = new Set<string>();
    const cur = new Date(selectedCheckIn + "T12:00:00");
    const end = new Date(selectedCheckOut + "T12:00:00");
    cur.setDate(cur.getDate() + 1);
    while (cur < end) {
      set.add(cur.toISOString().slice(0, 10));
      cur.setDate(cur.getDate() + 1);
    }
    return set;
  }, [selectedCheckIn, selectedCheckOut]);

  if (!calendars.length) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-medium">
        <div className="flex flex-wrap gap-3">
          {PUBLIC_STATUS_LEGEND_OPTIONS.map((option) => (
            <span key={option.value} className="flex items-center gap-1.5">
              <span
                className={`inline-block h-3 w-3 rounded-sm border ${legendColor(option.value)}`}
              />
              {option.label}
            </span>
          ))}
        </div>
        <div className="text-[11px] font-semibold text-muted-foreground">
          {!selectedCheckIn
            ? "① Cliquez sur la date d'arrivée"
            : !selectedCheckOut
              ? "② Cliquez sur la date de départ"
              : "✓ Séjour sélectionné (cliquez à nouveau pour changer)"}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {calendars.map((cal) => {
          const firstDay = getDayOfWeekMonday(
            `${cal.year}-${String(cal.month).padStart(2, "0")}-01`,
          );

          return (
            <div
              key={`${cal.year}-${cal.month}`}
              className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              <div className="bg-gradient-to-r from-ocean to-turquoise px-4 py-3 text-center">
                <p className="text-white font-semibold text-sm tracking-wide">
                  {MONTH_NAMES_FR[cal.month - 1]} {cal.year}
                </p>
              </div>

              <div className="p-3">
                <div className="grid grid-cols-7 mb-1">
                  {DAY_NAMES.map((d, i) => (
                    <div
                      key={i}
                      className="text-center text-[10px] font-semibold text-gray-400 py-1"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-[2px]">
                  {Array.from({ length: firstDay }, (_, i) => (
                    <div key={`empty-${i}`} />
                  ))}

                  {cal.days.map((day) => {
                    const isSelected =
                      day.date === selectedCheckIn || day.date === selectedCheckOut;
                    const isPast = day.date < today;
                    const isRangeDay = inRange.has(day.date);

                    const dayNum = parseInt(day.date.slice(8));
                    const cls = isPast
                      ? "text-gray-300 cursor-not-allowed"
                      : statusColor(day.status, isSelected, isRangeDay);

                    return (
                      <button
                        key={day.date}
                        type="button"
                        disabled={isPast || isBlockingAvailabilityStatus(day.status)}
                        onClick={() => handleDayClick(day.date, day.status)}
                        className={`
                          rounded-md flex flex-col items-center justify-center py-1 px-0.5
                          transition-all text-center min-h-[44px]
                          ${cls}
                        `}
                        title={`${day.date} - ${Math.round(day.price)} DT/nuit${
                          day.minNights > 1 ? ` - min. ${day.minNights} nuits` : ""
                        }${day.note ? ` - ${day.note}` : ""}`}
                      >
                        <span className="text-[11px] font-semibold leading-tight">{dayNum}</span>
                        {!isPast && (
                          <span className="text-[9px] leading-tight opacity-80">
                            {Math.round(day.price)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCheckIn && (
        <div className="text-xs text-gray-500 mt-2">
          {selectedCheckOut
            ? `Séjour sélectionné : ${selectedCheckIn} → ${selectedCheckOut}`
            : `Arrivée : ${selectedCheckIn} — Sélectionnez la date de départ`}
        </div>
      )}
    </div>
  );
}
