import { createFileRoute, Link } from "@tanstack/react-router";
import { BedDouble, CalendarCheck, MessageCircle, ReceiptText, UserRound } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { getClientSessionProfile, type ClientProfile } from "@/lib/auth/clientAuth";
import { headT } from "@/lib/i18n/head";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getReservationStatusLabels } from "@/lib/i18n/labels";
import { tr } from "@/lib/i18n/locale";
import {
  ACTIVE_RESERVATION_STATUSES,
  listClientConversations,
  listClientReservations,
  type ClientReservation,
  type ConversationSummary,
} from "@/lib/services/messageService";

export const Route = createFileRoute("/client/dashboard")({
  head: () => ({
    meta: [
      {
        title: headT(
          "Tableau de bord client - Marina Cap Monastir",
          "Guest dashboard - Marina Cap Monastir",
        ),
      },
    ],
  }),
  component: ClientDashboard,
});

function ClientDashboard() {
  const { t, locale, formatCurrency } = useI18n();
  const statusLabels = getReservationStatusLabels(locale);
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [reservations, setReservations] = useState<ClientReservation[]>([]);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError("");
    void Promise.all([
      getClientSessionProfile(),
      listClientReservations(),
      listClientConversations(),
    ])
      .then(([context, nextReservations, nextConversations]) => {
        if (!mounted) return;
        setProfile(context?.profile ?? null);
        setReservations(nextReservations);
        setConversations(nextConversations);
      })
      .catch((err) => {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : tr("Données client indisponibles.", "Guest data unavailable."),
          );
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const upcoming = useMemo(
    () =>
      reservations
        .filter((reservation) => reservation.checkOut >= todayIso())
        .sort((a, b) => a.checkIn.localeCompare(b.checkIn))[0] ?? null,
    [reservations],
  );
  const unreadCount = conversations.reduce(
    (sum, conversation) => sum + conversation.unreadClientCount,
    0,
  );
  const canMessage = reservations.some((reservation) =>
    ACTIVE_RESERVATION_STATUSES.includes(reservation.status),
  );

  if (loading) return <DashboardSkeleton />;

  if (reservations.length === 0) {
    return (
      <div className="space-y-6">
        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
            {error}
          </div>
        )}
        <section className="relative overflow-hidden rounded-xl border border-white/15 bg-primary p-5 text-white shadow-[var(--shadow-premium)]">
          <div className="marina-pattern absolute inset-0 opacity-30" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-accent">
              <UserRound className="size-4" />
              {t("Portail client", "Guest portal")}
            </div>
            <h1 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
              {t("Bonjour", "Hello")} {profile?.fullName ?? t("Client", "Guest")}
            </h1>
          </div>
        </section>
        <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-[var(--shadow-soft)]">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-accent/15 text-primary">
            <BedDouble className="size-6" />
          </div>
          <h2 className="text-xl font-black text-primary">
            {t("Aucune réservation pour le moment", "No bookings yet")}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {t(
              "Votre tableau de bord et la messagerie deviennent disponibles dès votre première réservation Appart-Hôtel.",
              "Your dashboard and messaging become available with your first aparthotel booking.",
            )}
          </p>
          <Link
            to="/search"
            search={{ adults: 2, children: 0, roomType: "Tous" }}
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-black text-primary-foreground"
          >
            <CalendarCheck className="size-4" />
            {t("Réserver un appart-hôtel", "Book the aparthotel")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-xl border border-white/15 bg-primary p-5 text-white shadow-[var(--shadow-premium)]">
        <div className="marina-pattern absolute inset-0 opacity-30" />
        <div className="relative grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-accent">
              <UserRound className="size-4" />
              {t("Portail client", "Guest portal")}
            </div>
            <h1 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
              {t("Bonjour", "Hello")} {profile?.fullName ?? t("Client", "Guest")}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
              {t(
                "Retrouvez vos séjours, vos échanges avec la réception et les informations utiles à votre arrivée.",
                "Find your stays, your messages with reception and useful information for your arrival.",
              )}
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link
              to="/client/reservations"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-black text-primary"
            >
              <CalendarCheck className="size-4" />
              {t("Voir mes réservations", "View my bookings")}
            </Link>
            {canMessage ? (
              <Link
                to="/client/messages"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 text-sm font-black text-white"
              >
                <MessageCircle className="size-4" />
                {t("Contacter la réception", "Contact reception")}
              </Link>
            ) : (
              <span
                title={t(
                  "Vous devez avoir une réservation Appart-Hôtel avant de contacter l'administration.",
                  "You need an aparthotel booking before contacting the administration.",
                )}
                className="inline-flex h-10 cursor-not-allowed items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 text-sm font-black text-white/50"
              >
                <MessageCircle className="size-4" />
                {t("Contacter la réception", "Contact reception")}
              </span>
            )}
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
          {error}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-3">
        <DashboardMetric
          icon={<CalendarCheck className="size-5" />}
          label={t("Réservations", "Bookings")}
          value={String(reservations.length)}
          detail={t("Dossiers liés à votre email", "Bookings linked to your email")}
        />
        <DashboardMetric
          icon={<ReceiptText className="size-5" />}
          label={t("Prochain séjour", "Next stay")}
          value={upcoming ? upcoming.checkIn : "-"}
          detail={
            upcoming
              ? upcoming.reservationNumber
              : t("Aucune arrivée prévue", "No upcoming arrival")
          }
        />
        <DashboardMetric
          icon={<MessageCircle className="size-5" />}
          label={t("Messages non lus", "Unread messages")}
          value={String(unreadCount)}
          detail={t("Réponses de la réception", "Replies from reception")}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <h2 className="text-lg font-black text-primary">
            {t("Prochaine réservation", "Next booking")}
          </h2>
          {upcoming ? (
            <div className="mt-4 rounded-lg border border-border bg-background p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-black text-primary">{upcoming.reservationNumber}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{upcoming.roomName}</div>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">
                  {statusLabels[upcoming.status] ?? upcoming.status}
                </div>
              </div>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <InfoTile label={t("Arrivée", "Check-in")} value={upcoming.checkIn} />
                <InfoTile label={t("Départ", "Check-out")} value={upcoming.checkOut} />
                <InfoTile label={t("Total", "Total")} value={formatCurrency(upcoming.total)} />
              </div>
            </div>
          ) : (
            <EmptyClientState
              title={t("Aucune réservation à venir", "No upcoming bookings")}
              text={t(
                "Vos prochaines réservations apparaîtront ici dès qu'elles seront liées à votre compte.",
                "Your upcoming bookings will appear here once they are linked to your account.",
              )}
            />
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <h2 className="text-lg font-black text-primary">
            {t("Derniers messages", "Latest messages")}
          </h2>
          {conversations.length > 0 ? (
            <div className="mt-4 space-y-3">
              {conversations.slice(0, 4).map((conversation) => (
                <Link
                  key={conversation.id}
                  to="/client/messages"
                  search={{ conversation: conversation.id }}
                  className="block rounded-lg border border-border bg-background p-3 transition hover:border-accent"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-black text-primary">{conversation.subject}</div>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {conversation.latestMessage?.body ??
                          t("Aucun message envoyé.", "No messages sent.")}
                      </p>
                    </div>
                    {conversation.unreadClientCount > 0 && (
                      <span className="rounded-full bg-destructive px-2 py-0.5 text-xs font-black text-white">
                        {conversation.unreadClientCount}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyClientState
              title={t("Aucun message", "No messages")}
              text={t(
                "Contactez la réception depuis la messagerie si vous avez une question.",
                "Contact reception through messaging if you have a question.",
              )}
            />
          )}
        </div>
      </section>
    </div>
  );
}

function DashboardMetric({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-black uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </div>
        <div className="flex size-10 items-center justify-center rounded-lg bg-accent/15 text-primary">
          {icon}
        </div>
      </div>
      <div className="mt-3 text-3xl font-black text-primary">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{detail}</div>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="text-xs font-black uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-black text-primary">{value}</div>
    </div>
  );
}

function EmptyClientState({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-4 rounded-lg border border-dashed border-border bg-background p-6 text-center">
      <div className="font-black text-primary">{title}</div>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="skeleton-block h-48 w-full" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="skeleton-block h-32 w-full" />
        <div className="skeleton-block h-32 w-full" />
        <div className="skeleton-block h-32 w-full" />
      </div>
    </div>
  );
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}
