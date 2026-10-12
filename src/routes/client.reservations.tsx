import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CalendarCheck, MessageCircle, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { formatCurrency } from "@/data/hotel";
import {
  ACTIVE_RESERVATION_STATUSES,
  CLIENT_MESSAGING_LOCKED_REASON,
  createConversationForClientReservation,
  listClientReservations,
  type ClientReservation,
} from "@/lib/services/messageService";

export const Route = createFileRoute("/client/reservations")({
  head: () => ({
    meta: [{ title: "Mes réservations - Marina Cap Monastir" }],
  }),
  component: ClientReservations,
});

function ClientReservations() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<ClientReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setReservations(await listClientReservations());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Réservations indisponibles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const canMessage = useMemo(
    () =>
      reservations.some((reservation) => ACTIVE_RESERVATION_STATUSES.includes(reservation.status)),
    [reservations],
  );

  const openConversation = async (reservation: ClientReservation) => {
    setOpeningId(reservation.id);
    try {
      const conversation = await createConversationForClientReservation(reservation);
      navigate({ to: "/client/messages", search: { conversation: conversation.id } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Conversation impossible.");
    } finally {
      setOpeningId(null);
    }
  };

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="section-kicker">
            <CalendarCheck className="size-4" />
            Portail client
          </div>
          <h1 className="mt-2 text-3xl font-black text-primary">Mes réservations</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Réservations liées à votre profil client ou à votre email.
          </p>
        </div>
        <button type="button" onClick={load} className="admin-action h-10 px-3">
          <RefreshCw className="size-4" />
          Actualiser
        </button>
      </header>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
          {error}
        </div>
      )}

      {!loading && reservations.length > 0 && !canMessage && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
          {CLIENT_MESSAGING_LOCKED_REASON}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)]">
        {loading ? (
          <div className="p-5">
            <div className="skeleton-block h-10 w-full" />
            <div className="skeleton-block mt-3 h-10 w-full" />
            <div className="skeleton-block mt-3 h-10 w-full" />
          </div>
        ) : reservations.length === 0 ? (
          <div className="empty-state m-5">
            <CalendarCheck className="mx-auto mb-3 size-8 text-accent" />
            <div className="text-lg font-black text-primary">Aucune réservation liée</div>
            <p className="mt-2 text-sm text-muted-foreground">{CLIENT_MESSAGING_LOCKED_REASON}</p>
            <Link
              to="/search"
              search={{ adults: 2, children: 0, roomType: "Tous" }}
              className="admin-action mt-4"
            >
              <CalendarCheck className="size-4" />
              Réserver un appart-hôtel
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-secondary/70 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Réservation</th>
                  <th className="px-4 py-3">Chambre</th>
                  <th className="px-4 py-3">Check-in</th>
                  <th className="px-4 py-3">Check-out</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Paiement</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id} className="border-t border-border">
                    <td className="px-4 py-3 font-black text-primary">
                      {reservation.reservationNumber}
                    </td>
                    <td className="px-4 py-3">{reservation.roomName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{reservation.checkIn}</td>
                    <td className="px-4 py-3 text-muted-foreground">{reservation.checkOut}</td>
                    <td className="px-4 py-3">
                      <StatusPill value={reservation.status} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill value={reservation.paymentStatus} subtle />
                    </td>
                    <td className="px-4 py-3 font-black text-primary">
                      {formatCurrency(reservation.total)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => openConversation(reservation)}
                        disabled={!canMessage || openingId === reservation.id}
                        title={canMessage ? undefined : CLIENT_MESSAGING_LOCKED_REASON}
                        className="admin-action disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <MessageCircle className="size-4" />
                        {openingId === reservation.id ? "Ouverture..." : "Envoyer un message"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusPill({ value, subtle = false }: { value: string; subtle?: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black ${
        subtle ? "bg-secondary text-primary" : "bg-emerald-50 text-emerald-800"
      }`}
    >
      {value}
    </span>
  );
}
