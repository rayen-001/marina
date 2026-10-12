import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  CheckCircle2,
  ConciergeBell,
  Download,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Printer,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import {
  formatCurrency,
  formatDate,
  getReservationByNumber,
  getRoom,
  paymentStatusLabels,
  type Reservation,
  type Room,
  reservationStatusLabels,
} from "@/data/hotel";
import { bookingStore } from "@/lib/booking-store";
import { getReservation } from "@/lib/services/reservationService";
import { getRoomType } from "@/lib/services/roomService";

type ConfirmationSearch = {
  reservation?: string;
};

export const Route = createFileRoute("/confirmation")({
  validateSearch: (search: Record<string, unknown>): ConfirmationSearch => ({
    reservation: typeof search.reservation === "string" ? search.reservation : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Confirmation - Marina Cap Monastir" },
      { name: "description", content: "Votre réservation Marina Cap Monastir est confirmée." },
    ],
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const search = Route.useSearch();
  const remembered = bookingStore.get().reservationNumber;
  const reservationNumber = search.reservation ?? remembered;
  const initialReservation = getReservationByNumber(reservationNumber);
  const initialRoom = initialReservation ? getRoom(initialReservation.roomId) : undefined;
  const [reservation, setReservation] = useState<Reservation | undefined>(initialReservation);
  const [room, setRoom] = useState<Room | undefined>(initialRoom);
  const [loading, setLoading] = useState(Boolean(reservationNumber && !initialReservation));

  useEffect(() => {
    if (!reservationNumber) return;
    let isMounted = true;
    setLoading(true);
    void getReservation(reservationNumber)
      .then(async (nextReservation) => {
        if (!isMounted) return;
        setReservation(nextReservation);
        if (nextReservation) {
          const nextRoom = await getRoomType(nextReservation.roomId);
          if (isMounted) setRoom(nextRoom);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [reservationNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-secondary text-primary">
            <CalendarDays className="size-7" />
          </div>
          <h1 className="text-3xl font-bold text-primary">Chargement de la réservation</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Nous récupérons les détails de votre séjour.
          </p>
        </div>
      </div>
    );
  }

  if (!reservation || !room) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-secondary text-primary">
            <CalendarDays className="size-7" />
          </div>
          <h1 className="text-3xl font-bold text-primary">Réservation introuvable</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Lancez une nouvelle recherche pour créer une réservation Marina Cap Monastir.
          </p>
          <Link
            to="/search"
            search={{ adults: 2, children: 0, roomType: "Tous" }}
            className="mt-6 inline-flex h-11 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            Rechercher une chambre
          </Link>
        </div>
      </div>
    );
  }

  const remaining = Math.max(0, reservation.total - reservation.deposit);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        {/* Success header */}
        <div className="mb-8 text-center animate-fade-up">
          <div className="success-ring-container mx-auto mb-5 inline-flex">
            <div className="flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-success-pop shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="size-10" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-3xl font-black text-primary md:text-4xl animate-fade-up-delay-1">
            Réservation confirmée !
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground animate-fade-up-delay-2">
            Votre séjour à Marina Cap Monastir est enregistré. Présentez ce numéro de confirmation à
            la réception lors de votre arrivée.
          </p>
        </div>

        {/* Reservation number card */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/8 via-card to-turquoise/5 shadow-[var(--shadow-premium)]">
          <div className="h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" />
          <div className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Numéro de réservation
              </div>
              <div className="mt-1 text-4xl font-black tracking-wider text-primary">
                {reservation.reservationNumber}
              </div>
              <div className="mt-2 flex items-center justify-center gap-4 text-xs text-muted-foreground sm:justify-start">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold ${
                    reservation.status === "confirmed" || reservation.status === "checked_in"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <CheckCircle2 className="size-3" />
                  {reservationStatusLabels[reservation.status]}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 font-semibold">
                  {paymentStatusLabels[reservation.paymentStatus]}
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Total séjour
              </div>
              <div className="mt-1 text-3xl font-black text-primary">
                {formatCurrency(reservation.total)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {reservation.nights} nuit{reservation.nights > 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Guest info */}
          <InfoBlock icon={<Users className="size-5" />} title="Client">
            <Row label="Nom" value={reservation.guest.fullName} />
            <Row label="Email" value={reservation.guest.email} />
            <Row label="Téléphone" value={reservation.guest.phone} />
            <Row label="Pays" value={reservation.guest.country} />
            <Row label="CIN / Passeport" value={reservation.guest.identityNumber} />
          </InfoBlock>

          {/* Stay info */}
          <InfoBlock icon={<CalendarDays className="size-5" />} title="Séjour">
            <Row label="Logement" value={room.name} />
            <Row label="Arrivée" value={formatDate(reservation.checkIn)} />
            <Row label="Départ" value={formatDate(reservation.checkOut)} />
            <Row
              label="Voyageurs"
              value={`${reservation.adults} adulte${reservation.adults > 1 ? "s" : ""}${reservation.children > 0 ? `, ${reservation.children} enfant${reservation.children > 1 ? "s" : ""}` : ""}`}
            />
            <Row label="Localisation" value="Marina Cap Monastir" />
          </InfoBlock>
        </div>

        {/* Price breakdown */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-secondary/50 px-5 py-3">
            <h2 className="text-sm font-bold text-primary">Détail du prix</h2>
          </div>
          <div className="p-5">
            <div className="space-y-3 text-sm">
              <PriceRow label="Prix chambre" value={formatCurrency(reservation.roomPrice)} />
              <PriceRow label="Taxes et frais" value={formatCurrency(reservation.taxesAndFees)} />
              <PriceRow label="Acompte" value={formatCurrency(reservation.deposit)} accent />
              <PriceRow label="Reste à régler" value={formatCurrency(remaining)} />
              <div className="flex items-center justify-between border-t border-border pt-3 text-base font-black text-primary">
                <span>Total</span>
                <span>{formatCurrency(reservation.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-primary">
            <Star className="size-4 text-accent" />
            Prochaines étapes
          </h2>
          <div className="grid gap-3 text-sm sm:grid-cols-3">
            {[
              {
                icon: <Mail className="size-4 text-accent" />,
                title: "Confirmation email",
                text: "Un email de confirmation a été envoyé à votre adresse.",
              },
              {
                icon: <MapPin className="size-4 text-turquoise" />,
                title: "Arrivée à l'hôtel",
                text: "Présentez votre numéro de réservation à la réception.",
              },
              {
                icon: <ConciergeBell className="size-4 text-primary" />,
                title: "Besoin d'aide ?",
                text: "Contactez la réception pour toute demande spéciale.",
              },
            ].map((step) => (
              <div key={step.title} className="flex gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  {step.icon}
                </span>
                <div>
                  <div className="font-semibold text-foreground">{step.title}</div>
                  <div className="mt-1 text-xs leading-5 text-muted-foreground">{step.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="p-5">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-primary">
              <MessageCircle className="size-4 text-accent" />
              Une question sur ce séjour ?
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Retrouvez cette réservation et échangez avec la réception depuis votre espace client.
            </p>
            <Link
              to="/client/messages"
              className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-ocean"
            >
              <MessageCircle className="size-4" />
              Contacter la réception
            </Link>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/search"
            search={{ adults: 2, children: 0, roomType: "Tous" }}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-ocean"
          >
            Nouvelle réservation
          </Link>
          <a
            href={`mailto:${reservation.guest.email}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-bold text-primary shadow-sm transition hover:border-accent hover:bg-accent/10"
          >
            <Mail className="size-4" />
            Envoyer par email
          </a>
          <a
            href="tel:+21673468300"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-bold text-primary shadow-sm transition hover:border-accent hover:bg-accent/10"
          >
            <Phone className="size-4" />
            Réception
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-bold text-primary shadow-sm transition hover:border-accent hover:bg-accent/10"
          >
            <Printer className="size-4" />
            Imprimer
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-bold text-primary shadow-sm transition hover:border-accent hover:bg-accent/10"
          >
            <Download className="size-4" />
            Télécharger PDF
          </button>
        </div>

        {/* Trust footer */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-5 rounded-2xl border border-border bg-secondary/40 px-5 py-4 text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            Réservation sécurisée
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-turquoise" />
            Données protégées
          </span>
          <span className="flex items-center gap-1.5">
            <ConciergeBell className="size-3.5 text-accent" />
            Support réception 24h/24
          </span>
        </div>
      </main>
    </div>
  );
}

function InfoBlock({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-5 py-3">
        <span className="text-accent">{icon}</span>
        <h2 className="text-sm font-bold text-primary">{title}</h2>
      </div>
      <div className="space-y-3 p-5 text-sm">{children}</div>
    </section>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span
        className={`text-right ${strong ? "font-bold text-primary" : "font-semibold text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}

function PriceRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-bold ${accent ? "text-accent" : "text-foreground"}`}>{value}</span>
    </div>
  );
}
