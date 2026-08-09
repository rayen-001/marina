import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ConciergeBell,
  Info,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Users,
  Waves,
} from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { BookingSummary } from "@/components/booking-summary";
import { AvailabilityCalendar } from "@/components/hotel/AvailabilityCalendar";
import type { Room } from "@/data/hotel";
import { calculateTotal, formatCurrency, getRoomCapacity } from "@/data/hotel";
import { bookingStore } from "@/lib/booking-store";
import { getBookingQuote, type BookingQuote } from "@/lib/services/bookingQuoteService";
import type { MonthCalendar } from "@/lib/services/rateCalendarService";
import { buildCalendarPriceMap, calculateCalendarTotal } from "@/lib/services/rateCalendarService";

type Props = {
  room: Room;
  incoming: {
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
  };
  calendars?: MonthCalendar[];
  isLoadingCalendar?: boolean;
};

const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
const afterTomorrow = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
const iso = (date: Date) => date.toISOString().slice(0, 10);

export function RoomDetailPage({ room, incoming, calendars = [], isLoadingCalendar = false }: Props) {
  const navigate = useNavigate();
  const capacity = getRoomCapacity(room);
  const [checkIn, setCheckIn] = useState(incoming.checkIn ?? iso(tomorrow));
  const [checkOut, setCheckOut] = useState(incoming.checkOut ?? iso(afterTomorrow));
  const [adults, setAdults] = useState(incoming.adults ?? 2);
  const [children, setChildren] = useState(incoming.children ?? 0);
  const [quote, setQuote] = useState<BookingQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  const priceMap = useMemo(() => buildCalendarPriceMap(calendars), [calendars]);
  const fallbackBreakdown = useMemo(() => {
    if (priceMap.size > 0 && checkIn && checkOut && checkIn < checkOut) {
      return calculateCalendarTotal(priceMap, checkIn, checkOut, room.pricePerNight);
    }
    return calculateTotal(room, checkIn, checkOut);
  }, [priceMap, checkIn, checkOut, room]);
  const breakdown = quote?.breakdown ?? fallbackBreakdown;
  const availability = quote?.availability ?? room.totalUnits;
  const selectedNightPrice =
    breakdown.nights > 0 ? Math.round(breakdown.roomPrice / breakdown.nights) : room.pricePerNight;

  const validStay = breakdown.nights > 0 && checkIn < checkOut;
  const fitsCapacity = adults + children <= capacity;
  const canBook = validStay && fitsCapacity && Boolean(quote?.canBook) && !quoteLoading;

  useEffect(() => {
    let isMounted = true;
    setQuoteLoading(true);
    void getBookingQuote(room, checkIn, checkOut)
      .then((nextQuote) => {
        if (!isMounted) return;
        setQuote(nextQuote);
        setQuoteLoading(false);
      })
      .catch(() => {
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

  const prevImage = () =>
    setActiveImage((index) => (index === 0 ? room.images.length - 1 : index - 1));
  const nextImage = () =>
    setActiveImage((index) => (index === room.images.length - 1 ? 0 : index + 1));

  return (
    <main className="min-h-screen bg-background pb-28 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Link
          to="/search"
          search={{ adults: 2, children: 0, roomType: "Tous" }}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Retour aux appartements
        </Link>

        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-primary/8 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                {room.type}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5 text-accent" />
                Marina Cap Monastir
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-3.5 fill-accent text-accent" />
                ))}
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-primary md:text-5xl">
              {room.name}
            </h1>
          </div>
          <div
            className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold ${
              availability > 0
                ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                : "bg-red-50 text-red-700 ring-1 ring-red-200"
            }`}
          >
            <CheckCircle2 className="size-4" />
            {quoteLoading
              ? "Verification des dates..."
              : availability > 0
                ? `${availability} unités disponibles`
                : "Complet sur ces dates"}
          </div>
        </div>

        <section className="mt-6">
          <div className="hidden overflow-hidden rounded-lg border border-border shadow-[var(--shadow-premium)] md:grid md:h-[520px] md:grid-cols-4 md:grid-rows-2 md:gap-1.5">
            <img
              src={room.images[0]}
              alt={room.name}
              className="col-span-2 row-span-2 h-full w-full object-cover transition duration-500 hover:brightness-105"
            />
            {room.images.slice(1, 5).map((image, index) => (
              <div key={`${image}-${index}`} className="relative overflow-hidden">
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 hover:brightness-105"
                />
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-lg md:hidden">
            <div className="aspect-[4/3]">
              <img
                src={room.images[activeImage]}
                alt={room.name}
                className="h-full w-full object-cover"
              />
            </div>
            {room.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md"
                >
                  <ChevronLeft className="size-4 text-primary" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md"
                >
                  <ChevronRight className="size-4 text-primary" />
                </button>
              </>
            )}
          </div>
        </section>

        <section className="mt-10 grid gap-10 lg:grid-cols-[1fr_390px]">
          <div className="space-y-10">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  icon: <Users className="size-5" />,
                  label: "Capacité",
                  value: `${capacity} personnes`,
                },
                { icon: <BedDouble className="size-5" />, label: "Couchage", value: room.beds },
                {
                  icon: <Bath className="size-5" />,
                  label: "Bains",
                  value: `${room.bathrooms} salle${room.bathrooms > 1 ? "s" : ""}`,
                },
                {
                  icon: <Waves className="size-5" />,
                  label: "Ambiance",
                  value: "Port de plaisance",
                },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-lg border border-border bg-card p-4 shadow-sm"
                >
                  <div className="mb-2 text-accent">{spec.icon}</div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {spec.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{spec.value}</div>
                </div>
              ))}
            </div>

            <div>
              <h2 className="gold-rule text-2xl font-black text-primary">
                Séjour à Marina Cap Monastir
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-foreground/78">
                {room.description}
              </p>
            </div>

            <div>
              <h2 className="gold-rule text-2xl font-black text-primary">Équipements inclus</h2>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-3.5 text-sm font-semibold shadow-sm transition hover:border-accent/40 hover:bg-accent/5"
                  >
                    <ShieldCheck className="size-4 shrink-0 text-accent" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <HighlightCard
                icon={<ConciergeBell className="size-5" />}
                title="Réception"
                text="Assistance pour arrivées, départs et demandes spéciales."
              />
              <HighlightCard
                icon={<Waves className="size-5" />}
                title="Port de plaisance"
                text="Accès rapide aux pontons, restaurants et activités marines."
              />
              <HighlightCard
                icon={<CalendarCheck className="size-5" />}
                title="Réservation directe"
                text="Disponibilité calculée sur l'inventaire réel des unités."
              />
            </div>

            {(calendars.length > 0 || isLoadingCalendar) && (
              <div>
                <h2 className="gold-rule text-2xl font-black text-primary">
                  Disponibilités &amp; Tarifs
                </h2>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Info className="size-3.5 shrink-0" />À partir de{" "}
                  <span className="font-semibold text-primary">
                    {formatCurrency(selectedNightPrice)}
                  </span>{" "}
                  par nuitée — les tarifs varient selon la saison.
                </p>
                <div className="mt-5">
                  <AvailabilityCalendar
                    calendars={calendars}
                    isLoading={isLoadingCalendar}
                    selectedCheckIn={checkIn}
                    selectedCheckOut={checkOut}
                    onSelectCheckIn={(d) => {
                      setCheckIn(d);
                      setCheckOut("");
                    }}
                    onSelectCheckOut={setCheckOut}
                  />
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-premium)]">
              <div className="h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" />
              <div className="p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      À partir de
                    </div>
                    <div className="mt-1 text-3xl font-black text-primary">
                      {formatCurrency(selectedNightPrice)}
                    </div>
                    <div className="text-xs text-muted-foreground">par nuitée</div>
                  </div>
                  <a
                    href="tel:+21673462305"
                    className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-accent hover:bg-accent/10 hover:text-accent"
                    title="Contacter la réception"
                  >
                    <Phone className="size-4" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <DateField label="Arrivée" value={checkIn} onChange={setCheckIn} />
                  <DateField label="Départ" value={checkOut} onChange={setCheckOut} />
                  <NumberField
                    label="Adultes"
                    value={adults}
                    min={1}
                    max={capacity}
                    onChange={setAdults}
                  />
                  <NumberField
                    label="Enfants"
                    value={children}
                    min={0}
                    max={capacity}
                    onChange={setChildren}
                  />
                </div>

                {!fitsCapacity && (
                  <p className="mt-3 rounded-lg bg-destructive/10 p-3 text-xs font-medium text-destructive">
                    La capacité demandée dépasse celle de cet appartement.
                  </p>
                )}

                {quoteLoading && (
                  <p className="mt-3 rounded-lg bg-secondary p-3 text-xs font-medium text-muted-foreground">
                    Verification du tarif et de la disponibilite...
                  </p>
                )}

                {!quoteLoading && quote?.reason && (
                  <p className="mt-3 rounded-lg bg-destructive/10 p-3 text-xs font-medium text-destructive">
                    {quote.reason}
                  </p>
                )}

                <div className="mt-4">
                  <BookingSummary
                    room={room}
                    breakdown={breakdown}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    nightlyPrice={selectedNightPrice}
                    nightlyRates={quote?.nightlyRates ?? []}
                    compact
                  />
                </div>

                <button
                  type="button"
                  disabled={!canBook}
                  onClick={reserve}
                  className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-ocean hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CalendarCheck className="size-4" />
                  Réserver cet appartement
                </button>

                <a
                  href="/contact"
                  className="mt-2 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border text-sm font-semibold text-muted-foreground transition hover:border-accent hover:bg-accent/5 hover:text-accent"
                >
                  <Info className="size-4" />
                  Demande d'information
                </a>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Disponibilité : <span className="font-semibold text-primary">{availability}</span>{" "}
                  unité{availability > 1 ? "s" : ""} sur ces dates
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="space-y-2.5 text-xs font-medium text-muted-foreground">
                {[
                  {
                    icon: <ShieldCheck className="size-3.5 text-emerald-600" />,
                    text: "Réservation sécurisée, aucune carte stockée",
                  },
                  {
                    icon: <CheckCircle2 className="size-3.5 text-turquoise" />,
                    text: "Confirmation immédiate par email",
                  },
                  {
                    icon: <ConciergeBell className="size-3.5 text-accent" />,
                    text: "Réception disponible pour vous assister",
                  },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2">
                    {item.icon}
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/96 px-4 py-3 shadow-2xl backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <div className="text-lg font-black text-primary">
              {formatCurrency(selectedNightPrice)}
              <span className="text-sm font-medium text-muted-foreground"> / nuitée</span>
            </div>
            {breakdown.nights > 0 && (
              <div className="text-xs text-muted-foreground">
                {breakdown.nights} nuit{breakdown.nights > 1 ? "s" : ""} ·{" "}
                {formatCurrency(breakdown.total)}
              </div>
            )}
          </div>
          <button
            type="button"
            disabled={!canBook}
            onClick={reserve}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm disabled:opacity-50"
          >
            <CalendarCheck className="size-4" />
            Réserver
          </button>
        </div>
      </div>
    </main>
  );
}

function HighlightCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="premium-card premium-card-hover rounded-lg p-5">
      <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-secondary text-accent">
        {icon}
      </div>
      <h3 className="text-sm font-bold text-primary">{title}</h3>
      <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{text}</p>
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="rounded-lg border border-border bg-background px-3 py-2.5 transition focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/15">
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <input
        type="date"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full bg-transparent text-sm font-semibold outline-none"
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="rounded-lg border border-border bg-background px-3 py-2.5 transition focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/15">
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1 w-full bg-transparent text-sm font-semibold outline-none"
      />
    </label>
  );
}
