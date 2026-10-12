import { Link } from "@tanstack/react-router";
import { ChevronRight, Users } from "lucide-react";
import type { Room } from "@/data/hotel";
import { getRoomCapacity } from "@/data/hotel";
import { bookingStore } from "@/lib/booking-store";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { localizeRoom } from "@/lib/i18n/rooms";

type Props = {
  room: Room;
  availableUnits?: number;
  showAvailability?: boolean;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
};

export function RoomCard({
  room,
  availableUnits,
  showAvailability,
  checkIn,
  checkOut,
  adults,
  children,
}: Props) {
  const { t, locale, formatCurrency } = useI18n();
  const display = localizeRoom(room, locale);
  const soldOut = showAvailability && availableUnits === 0;
  const scarce =
    showAvailability && availableUnits !== undefined && availableUnits > 0 && availableUnits <= 2;
  const search = { checkIn, checkOut, adults: adults ?? 2, children: children ?? 0 };
  const capacity = getRoomCapacity(room);
  // With dates already chosen (search results) "Réserver" goes straight to the booking form;
  // otherwise the guest still has to pick dates on the detail page.
  const hasDates = Boolean(checkIn && checkOut && checkIn < checkOut);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[var(--shadow-lift)]">
      <Link
        to="/room/$id"
        params={{ id: room.id }}
        search={search}
        className="relative block aspect-[4/3] overflow-hidden bg-secondary"
        aria-label={`${t("Voir les détails", "View details")} : ${display.name}`}
      >
        <img
          src={room.images[0]}
          alt={display.name}
          loading="lazy"
          className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
            soldOut ? "grayscale" : ""
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean/70 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 rounded-md border border-white/50 bg-white/94 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-primary shadow-sm backdrop-blur">
          {display.type}
        </div>

        {showAvailability && (
          <div
            className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] shadow-sm backdrop-blur ${
              soldOut
                ? "bg-ocean text-white"
                : scarce
                  ? "bg-accent text-accent-foreground"
                  : "bg-emerald-500/90 text-white"
            }`}
          >
            {soldOut
              ? t("Complet", "Fully booked")
              : scarce
                ? t(`${availableUnits} restantes`, `${availableUnits} left`)
                : t(`${availableUnits} disponibles`, `${availableUnits} available`)}
          </div>
        )}

        <div className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
          <span className="text-xs font-semibold text-muted-foreground">
            {t("À partir de", "From")}{" "}
          </span>
          <span className="text-base font-black text-primary">
            {formatCurrency(room.pricePerNight)}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {" "}
            / {t("nuitée", "night")}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-black leading-tight text-primary">
          <Link
            to="/room/$id"
            params={{ id: room.id }}
            search={search}
            className="transition-colors hover:text-accent"
          >
            {display.name}
          </Link>
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <Users className="size-4 shrink-0 text-accent" />
          {t(`Jusqu'à ${capacity} personnes`, `Up to ${capacity} guests`)}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <Link
            to="/room/$id"
            params={{ id: room.id }}
            search={search}
            className="inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-semibold text-muted-foreground transition hover:border-accent/40 hover:bg-accent/5 hover:text-accent"
          >
            {t("Voir détails", "View details")}
          </Link>
          {soldOut ? (
            <span className="inline-flex h-10 cursor-not-allowed items-center rounded-lg bg-muted px-4 text-sm font-black text-muted-foreground">
              {t("Complet", "Fully booked")}
            </span>
          ) : hasDates ? (
            <Link
              to="/book/$id"
              params={{ id: room.id }}
              onClick={() =>
                bookingStore.set({
                  roomId: room.id,
                  checkIn,
                  checkOut,
                  adults: search.adults,
                  children: search.children,
                })
              }
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-black text-primary-foreground shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
            >
              {t("Réserver", "Book")}
              <ChevronRight className="size-4" />
            </Link>
          ) : (
            <Link
              to="/room/$id"
              params={{ id: room.id }}
              search={search}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-black text-primary-foreground shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
            >
              {t("Réserver", "Book")}
              <ChevronRight className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function RoomCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]">
      <div className="aspect-[4/3] skeleton-block rounded-none" />
      <div className="space-y-4 p-5">
        <div className="skeleton-block h-5 w-3/4" />
        <div className="skeleton-block h-4 w-1/2" />
        <div className="flex justify-between gap-2 pt-1">
          <div className="skeleton-block h-10 w-28 rounded-lg" />
          <div className="skeleton-block h-10 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
