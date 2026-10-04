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
import { getReservationByNumber, getRoom, type Reservation, type Room } from "@/data/hotel";
import { bookingStore } from "@/lib/booking-store";
import { headT } from "@/lib/i18n/head";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getPaymentStatusLabels, getReservationStatusLabels } from "@/lib/i18n/labels";
import { localizeRoomName } from "@/lib/i18n/rooms";
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
      { title: headT("Confirmation - Marina Cap Monastir", "Confirmation - Marina Cap Monastir") },
      {
        name: "description",
        content: headT(
          "Votre réservation Marina Cap Monastir est confirmée.",
          "Your Marina Cap Monastir booking is confirmed.",
        ),
      },
    ],
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const search = Route.useSearch();
  const { t, locale, formatCurrency, formatDate } = useI18n();
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
          <h1 className="text-3xl font-bold text-primary">
            {t("Chargement de la réservation", "Loading your booking")}
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {t(
              "Nous récupérons les détails de votre séjour.",
              "We are retrieving the details of your stay.",
            )}
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
          <h1 className="text-3xl font-bold text-primary">
            {t("Réservation introuvable", "Booking not found")}
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {t(
              "Lancez une nouvelle recherche pour créer une réservation Marina Cap Monastir.",
              "Start a new search to make a Marina Cap Monastir booking.",
            )}
          </p>
          <Link
            to="/search"
            search={{ adults: 2, children: 0, roomType: "Tous" }}
            className="mt-6 inline-flex h-11 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            {t("Rechercher une chambre", "Search for a room")}
          </Link>
        </div>
      </div>
    );
  }

  const remaining = Math.max(0, reservation.total - reservation.deposit);
  const reservationStatusLabels = getReservationStatusLabels(locale);
  const paymentStatusLabels = getPaymentStatusLabels(locale);

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
          <h1 className="page-title text-primary animate-fade-up-delay-1">
            {t("Réservation confirmée !", "Booking confirmed!")}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground animate-fade-up-delay-2">
            {t(
              "Votre séjour à Marina Cap Monastir est enregistré. Présentez ce numéro de confirmation à la réception lors de votre arrivée.",
              "Your stay at Marina Cap Monastir has been recorded. Show this confirmation number at reception when you arrive.",
            )}
          </p>
        </div>

        {/* Reservation number card */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/8 via-card to-turquoise/5 shadow-[var(--shadow-premium)]">
          <div className="h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" />
          <div className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {t("Numéro de réservation", "Booking number")}
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
                {t("Total séjour", "Stay total")}
              </div>
              <div className="mt-1 text-3xl font-black text-primary">
                {formatCurrency(reservation.total)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {reservation.nights}{" "}
                {reservation.nights > 1 ? t("nuits", "nights") : t("nuit", "night")}
              </div>
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Guest info */}
          <InfoBlock icon={<Users className="size-5" />} title={t("Client", "Guest")}>
            <Row label={t("Nom", "Name")} value={reservation.guest.fullName} />
            <Row label={t("Email", "Email")} value={reservation.guest.email} />
            <Row label={t("Téléphone", "Phone")} value={reservation.guest.phone} />
            <Row label={t("Pays", "Country")} value={reservation.guest.country} />
            <Row
              label={t("CIN / Passeport", "ID card / Passport")}
              value={reservation.guest.identityNumber}
            />
          </InfoBlock>

          {/* Stay info */}
          <InfoBlock icon={<CalendarDays className="size-5" />} title={t("Séjour", "Stay")}>
            <Row label={t("Logement", "Accommodation")} value={localizeRoomName(room, locale)} />
            <Row label={t("Arrivée", "Check-in")} value={formatDate(reservation.checkIn)} />
            <Row label={t("Départ", "Check-out")} value={formatDate(reservation.checkOut)} />
            <Row
              label={t("Voyageurs", "Guests")}
              value={t(
                `${reservation.adults} adulte${reservation.adults > 1 ? "s" : ""}${reservation.children > 0 ? `, ${reservation.children} enfant${reservation.children > 1 ? "s" : ""}` : ""}`,
                `${reservation.adults} adult${reservation.adults > 1 ? "s" : ""}${reservation.children > 0 ? `, ${reservation.children} ${reservation.children > 1 ? "children" : "child"}` : ""}`,
              )}
            />
            <Row label={t("Localisation", "Location")} value="Marina Cap Monastir" />
          </InfoBlock>
        </div>

        {/* Price breakdown */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-secondary/50 px-5 py-3">
            <h2 className="text-sm font-bold text-primary">
              {t("Détail du prix", "Price breakdown")}
            </h2>
          </div>
          <div className="p-5">
            <div className="space-y-3 text-sm">
              <PriceRow
                label={t("Prix chambre", "Room price")}
                value={formatCurrency(reservation.roomPrice)}
              />
              <PriceRow
                label={t("Taxes et frais", "Taxes and fees")}
                value={formatCurrency(reservation.taxesAndFees)}
              />
              <PriceRow
                label={t("Acompte", "Deposit")}
                value={formatCurrency(reservation.deposit)}
                accent
              />
              <PriceRow
                label={t("Reste à régler", "Balance due")}
                value={formatCurrency(remaining)}
              />
              <div className="flex items-center justify-between border-t border-border pt-3 text-base font-black text-primary">
                <span>{t("Total", "Total")}</span>
                <span>{formatCurrency(reservation.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-primary">
            <Star className="size-4 text-accent" />
            {t("Prochaines étapes", "Next steps")}
          </h2>
          <div className="grid gap-3 text-sm sm:grid-cols-3">
            {[
              {
                icon: <Mail className="size-4 text-accent" />,
                title: t("Confirmation email", "Confirmation email"),
                text: t(
                  "Un email de confirmation a été envoyé à votre adresse.",
                  "A confirmation email has been sent to your address.",
                ),
              },
              {
                icon: <MapPin className="size-4 text-turquoise" />,
                title: t("Arrivée à l'hôtel", "Arriving at the hotel"),
                text: t(
                  "Présentez votre numéro de réservation à la réception.",
                  "Show your booking number at reception.",
                ),
              },
              {
                icon: <ConciergeBell className="size-4 text-primary" />,
                title: t("Besoin d'aide ?", "Need help?"),
                text: t(
                  "Contactez la réception pour toute demande spéciale.",
                  "Contact reception for any special request.",
                ),
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
              {t("Une question sur ce séjour ?", "A question about this stay?")}
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {t(
                "Retrouvez cette réservation et échangez avec la réception depuis votre espace client.",
                "Find this booking and message reception from your guest account.",
              )}
            </p>
            <Link
              to="/client/messages"
              className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-ocean"
            >
              <MessageCircle className="size-4" />
              {t("Contacter la réception", "Contact reception")}
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
            {t("Nouvelle réservation", "New booking")}
          </Link>
          <a
            href={`mailto:${reservation.guest.email}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-bold text-primary shadow-sm transition hover:border-accent hover:bg-accent/10"
          >
            <Mail className="size-4" />
            {t("Envoyer par email", "Send by email")}
          </a>
          <a
            href="tel:+21673468300"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-bold text-primary shadow-sm transition hover:border-accent hover:bg-accent/10"
          >
            <Phone className="size-4" />
            {t("Réception", "Reception")}
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-bold text-primary shadow-sm transition hover:border-accent hover:bg-accent/10"
          >
            <Printer className="size-4" />
            {t("Imprimer", "Print")}
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-bold text-primary shadow-sm transition hover:border-accent hover:bg-accent/10"
          >
            <Download className="size-4" />
            {t("Télécharger PDF", "Download PDF")}
          </button>
        </div>

        {/* Trust footer */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-5 rounded-2xl border border-border bg-secondary/40 px-5 py-4 text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            {t("Réservation sécurisée", "Secure booking")}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-turquoise" />
            {t("Données protégées", "Data protected")}
          </span>
          <span className="flex items-center gap-1.5">
            <ConciergeBell className="size-3.5 text-accent" />
            {t("Support réception 24h/24", "24/7 reception support")}
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
