import { CalendarDays, CreditCard, Moon, ReceiptText, ShieldCheck } from "lucide-react";
import type React from "react";
import type { PriceBreakdown, Room } from "@/data/hotel";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { localizeRoom } from "@/lib/i18n/rooms";
import type { NightlyRateBreakdown } from "@/lib/services/rateCalendarService";

type Props = {
  room: Room;
  breakdown: PriceBreakdown;
  checkIn?: string;
  checkOut?: string;
  compact?: boolean;
  nightlyPrice?: number;
  nightlyRates?: NightlyRateBreakdown[];
};

export function BookingSummary({
  room,
  breakdown,
  checkIn,
  checkOut,
  compact = false,
  nightlyPrice,
  nightlyRates = [],
}: Props) {
  const { t, locale, formatCurrency, formatDate } = useI18n();
  const display = localizeRoom(room, locale);
  const nightsLabel = (count: number) =>
    count > 1 ? t(`${count} nuits`, `${count} nights`) : t(`${count} nuit`, `${count} night`);
  const displayedNightlyPrice =
    nightlyPrice ??
    (breakdown.nights > 0
      ? Math.round(breakdown.roomPrice / breakdown.nights)
      : room.pricePerNight);

  return (
    <aside className="overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]">
      <div className="h-1 bg-gradient-to-r from-accent via-turquoise to-primary" />
      <div className="p-4">
        <div className="flex gap-4 border-b border-border pb-4">
          <img
            src={room.images[0]}
            alt={display.name}
            className="size-20 rounded-lg object-cover shadow-sm"
          />
          <div className="min-w-0">
            <div className="text-[11px] font-black uppercase tracking-[0.14em] text-accent">
              {display.type}
            </div>
            <div className="mt-1 line-clamp-2 font-black leading-tight text-primary">
              {display.name}
            </div>
            <div className="mt-1 text-xs font-semibold text-muted-foreground">
              Marina Cap Monastir
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <SummaryRow
            icon={<CalendarDays className="size-4" />}
            label={t("Dates", "Dates")}
            value={`${checkIn ?? "-"} ${t("au", "to")} ${checkOut ?? "-"}`}
          />
          <SummaryRow
            icon={<Moon className="size-4" />}
            label={t("Nuits", "Nights")}
            value={nightsLabel(breakdown.nights)}
          />
          <PriceRow
            label={`${formatCurrency(displayedNightlyPrice)} x ${nightsLabel(breakdown.nights)}`}
            value={formatCurrency(breakdown.roomPrice)}
          />
          {nightlyRates.length > 0 && (
            <div className="rounded-lg border border-border bg-background p-3">
              <div className="mb-2 text-xs font-black uppercase tracking-[0.12em] text-muted-foreground">
                {t("Détail par nuit", "Night-by-night breakdown")}
              </div>
              <div className="max-h-44 space-y-2 overflow-auto pr-1">
                {nightlyRates.map((night) => (
                  <div
                    key={night.date}
                    className="flex items-center justify-between gap-3 text-xs text-muted-foreground"
                  >
                    <span className="min-w-0">
                      <span className="font-semibold text-foreground">
                        {formatDate(night.date, { day: "2-digit", month: "short" })}
                      </span>
                      {night.isSpecialRate && (
                        <span className="ml-2 rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                          {t("spécial", "special")}
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 font-black text-primary">
                      {formatCurrency(night.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <PriceRow
            label={t("Taxes et frais", "Taxes and fees")}
            value={formatCurrency(breakdown.taxesAndFees)}
          />
          <PriceRow
            label={t("Acompte conseillé", "Suggested deposit")}
            value={formatCurrency(breakdown.deposit)}
            icon={<CreditCard className="size-4" />}
          />
          <PriceRow
            label={t("Reste à régler", "Balance due")}
            value={formatCurrency(breakdown.remainingAmount)}
          />
          <div className="flex items-center justify-between rounded-lg bg-secondary px-3 py-3 text-base font-black text-primary">
            <span className="inline-flex items-center gap-2">
              <ReceiptText className="size-4" />
              Total
            </span>
            <span>{formatCurrency(breakdown.total)}</span>
          </div>
          {!compact && (
            <p className="flex items-start gap-2 rounded-lg border border-turquoise/15 bg-turquoise/10 p-3 text-xs font-medium leading-5 text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-turquoise" />
              {t(
                "Aucun numéro de carte ni CVC n'est collecté. Le règlement est suivi uniquement par statut de paiement.",
                "No card number or CVC is collected. Payment is tracked by payment status only.",
              )}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-muted-foreground">
      <span className="inline-flex items-center gap-2 font-medium">
        <span className="text-accent">{icon}</span>
        {label}
      </span>
      <span className="text-right font-bold text-foreground">{value}</span>
    </div>
  );
}

function PriceRow({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-muted-foreground">
      <span className="inline-flex items-center gap-2">
        {icon && <span className="text-accent">{icon}</span>}
        {label}
      </span>
      <span className="font-bold text-foreground">{value}</span>
    </div>
  );
}
