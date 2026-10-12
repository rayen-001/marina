import { createFileRoute, Link } from "@tanstack/react-router";
import { BedDouble, CalendarCheck, MessageCircle, ReceiptText, UserRound } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { formatCurrency } from "@/data/hotel";
import { getClientSessionProfile, type ClientProfile } from "@/lib/auth/clientAuth";
import {
  ACTIVE_RESERVATION_STATUSES,
  listClientConversations,
  listClientReservations,
  type ClientReservation,
  type ConversationSummary,
} from "@/lib/services/messageService";

export const Route = createFileRoute("/client/dashboard")({
  head: () => ({
    meta: [{ title: "Tableau de bord client - Marina Cap Monastir" }],
  }),
  component: ClientDashboard,
});

function ClientDashboard() {
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
        if (mounted) setError(err instanceof Error ? err.message : "Données client indisponibles.");
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
              Portail client
            </div>
            <h1 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
              Bonjour {profile?.fullName ?? "Client"}
            </h1>
          </div>
        </section>
        <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-[var(--shadow-soft)]">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-accent/15 text-primary">
            <BedDouble className="size-6" />
          </div>
          <h2 className="text-xl font-black text-primary">Aucune réservation pour le moment</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Votre tableau de bord et la messagerie deviennent disponibles dès votre première
            réservation Appart-Hôtel.
          </p>
          <Link
            to="/search"
            search={{ adults: 2, children: 0, roomType: "Tous" }}
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-black text-primary-foreground"
          >
            <CalendarCheck className="size-4" />
            Réserver un appart-hôtel
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
              Portail client
            </div>
            <h1 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
              Bonjour {profile?.fullName ?? "Client"}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
              Retrouvez vos séjours, vos échanges avec la réception et les informations utiles à
              votre arrivée.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link
              to="/client/reservations"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-black text-primary"
            >
              <CalendarCheck className="size-4" />
              Voir mes réservations
            </Link>
            {canMessage ? (
              <Link
                to="/client/messages"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 text-sm font-black text-white"
              >
                <MessageCircle className="size-4" />
                Contacter la réception
              </Link>
            ) : (
              <span
                title="Vous devez avoir une réservation Appart-Hôtel avant de contacter l'administration."
                className="inline-flex h-10 cursor-not-allowed items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 text-sm font-black text-white/50"
              >
                <MessageCircle className="size-4" />
                Contacter la réception
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
          label="Réservations"
          value={String(reservations.length)}
          detail="Dossiers liés à votre email"
        />
        <DashboardMetric
          icon={<ReceiptText className="size-5" />}
          label="Prochain séjour"
          value={upcoming ? upcoming.checkIn : "-"}
          detail={upcoming ? upcoming.reservationNumber : "Aucune arrivée prévue"}
        />
        <DashboardMetric
          icon={<MessageCircle className="size-5" />}
          label="Messages non lus"
          value={String(unreadCount)}
          detail="Réponses de la réception"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <h2 className="text-lg font-black text-primary">Prochaine réservation</h2>
          {upcoming ? (
            <div className="mt-4 rounded-lg border border-border bg-background p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-black text-primary">{upcoming.reservationNumber}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{upcoming.roomName}</div>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">
                  {upcoming.status}
                </div>
              </div>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <InfoTile label="Arrivée" value={upcoming.checkIn} />
                <InfoTile label="Départ" value={upcoming.checkOut} />
                <InfoTile label="Total" value={formatCurrency(upcoming.total)} />
              </div>
            </div>
          ) : (
            <EmptyClientState
              title="Aucune réservation à venir"
              text="Vos prochaines réservations apparaîtront ici dès qu'elles seront liées à votre compte."
            />
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <h2 className="text-lg font-black text-primary">Derniers messages</h2>
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
                        {conversation.latestMessage?.body ?? "Aucun message envoyé."}
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
              title="Aucun message"
              text="Contactez la réception depuis la messagerie si vous avez une question."
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
