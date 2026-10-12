import { Link } from "@tanstack/react-router";
import { Bath, BedDouble, ChevronRight, Users, Waves, Wifi } from "lucide-react";
import type { Room } from "@/data/hotel";
import { formatCurrency, getRoomCapacity } from "@/data/hotel";

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
  const soldOut = showAvailability && availableUnits === 0;
  const scarce =
    showAvailability && availableUnits !== undefined && availableUnits > 0 && availableUnits <= 2;
  const search = { checkIn, checkOut, adults: adults ?? 2, children: children ?? 0 };
  const topAmenities = room.amenities.slice(0, 3);
  const capacity = getRoomCapacity(room);

  return (
    <Link to="/room/$id" params={{ id: room.id }} search={search} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[var(--shadow-lift)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <img
            src={room.images[0]}
            alt={room.name}
            loading="lazy"
            className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
              soldOut ? "grayscale" : ""
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean/80 via-ocean/10 to-transparent" />

          <div className="absolute left-3 top-3 rounded-md border border-white/50 bg-white/94 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-primary shadow-sm backdrop-blur">
            {room.type}
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
                ? "Complet"
                : scarce
                  ? `${availableUnits} restantes`
                  : `${availableUnits} disponibles`}
            </div>
          )}

          <div className="absolute bottom-3 left-3">
            <div className="rounded-lg bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
              <span className="text-xs font-semibold text-muted-foreground">Dès </span>
              <span className="text-base font-black text-primary">
                {formatCurrency(room.pricePerNight)}
              </span>
              <span className="text-xs font-medium text-muted-foreground"> / nuitée</span>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md border border-white/30 bg-white/15 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
            <Waves className="size-3 text-accent" />
            Marina
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div>
            <h3 className="line-clamp-1 text-lg font-black leading-tight text-primary">
              {room.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {room.description}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-semibold text-muted-foreground">
            <span className="flex min-w-0 items-center gap-1.5 rounded-lg bg-secondary/75 px-2 py-2">
              <Users className="size-3.5 shrink-0 text-accent" />
              <span className="truncate">{capacity} pers.</span>
            </span>
            <span className="flex min-w-0 items-center gap-1.5 rounded-lg bg-secondary/75 px-2 py-2">
              <BedDouble className="size-3.5 shrink-0 text-accent" />
              <span className="truncate">{room.beds}</span>
            </span>
            <span className="flex min-w-0 items-center gap-1.5 rounded-lg bg-secondary/75 px-2 py-2">
              <Bath className="size-3.5 shrink-0 text-accent" />
              <span className="truncate">{room.bathrooms} sdb</span>
            </span>
          </div>

          {topAmenities.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {topAmenities.map((amenity) => (
                <span
                  key={amenity}
                  className="inline-flex items-center gap-1 rounded-md bg-secondary/60 px-2 py-1 text-[11px] font-medium text-muted-foreground"
                >
                  <Wifi className="size-2.5 text-accent" />
                  {amenity}
                </span>
              ))}
              {room.amenities.length > 3 && (
                <span className="inline-flex items-center rounded-md bg-secondary/60 px-2 py-1 text-[11px] font-medium text-muted-foreground">
                  +{room.amenities.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-4">
            <span className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-3 text-xs font-semibold text-muted-foreground transition group-hover:border-accent/40 group-hover:bg-accent/5 group-hover:text-accent">
              Voir détails
            </span>
            <span className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary/8 px-4 text-xs font-black text-primary transition-all group-hover:bg-accent group-hover:text-accent-foreground">
              Réserver
              <ChevronRight className="size-3.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function RoomCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]">
      <div className="aspect-[4/3] skeleton-block rounded-none" />
      <div className="space-y-4 p-5">
        <div className="skeleton-block h-5 w-3/4" />
        <div className="space-y-2">
          <div className="skeleton-block h-3 w-full" />
          <div className="skeleton-block h-3 w-4/5" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="skeleton-block h-9 rounded-lg" />
          <div className="skeleton-block h-9 rounded-lg" />
          <div className="skeleton-block h-9 rounded-lg" />
        </div>
        <div className="skeleton-block h-7 w-2/3 rounded-lg" />
      </div>
    </div>
  );
}
