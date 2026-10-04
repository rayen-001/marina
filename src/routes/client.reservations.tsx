import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CalendarCheck, MessageCircle, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { headT } from "@/lib/i18n/head";
import { useI18n } from "@/lib/i18n/I18nProvider";
import {
  CLIENT_MESSAGING_LOCKED_REASON_EN,
  getPaymentStatusLabels,
  getReservationStatusLabels,
} from "@/lib/i18n/labels";
import { tr } from "@/lib/i18n/locale";
import { localizeRoomName } from "@/lib/i18n/rooms";
import {
  ACTIVE_RESERVATION_STATUSES,
  CLIENT_MESSAGING_LOCKED_REASON,
  createConversationForClientReservation,
  listClientReservations,
  type ClientReservation,
} from "@/lib/services/messageService";

export const Route = createFileRoute("/client/reservations")({
  head: () => ({
    meta: [
      {
        title: headT("Mes réservations - Marina Cap Monastir", "My bookings - Marina Cap Monastir"),
      },
    ],
  }),
  component: ClientReservations,
});

function ClientReservations() {
  const navigate = useNavigate();
  const { t, locale, formatCurrency } = useI18n();
  const lockedReason = t(CLIENT_MESSAGING_LOCKED_REASON, CLIENT_MESSAGING_LOCKED_REASON_EN);
  const reservationStatusLabels = getReservationStatusLabels(locale);
  const paymentStatusLabels = getPaymentStatusLabels(locale);
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
      setError(
        err instanceof Error
          ? err.message
          : tr("Réservations indisponibles.", "Bookings unavailable."),
      );
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
      toast.error(
        err instanceof Error
          ? err.message
          : t("Conversation impossible.", "The conversation could not be opened."),
      );
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
            {t("Portail client", "Guest portal")}
          </div>
          <h1 className="mt-2 text-3xl font-black text-primary">
            {t("Mes réservations", "My bookings")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(
              "Réservations liées à votre profil client ou à votre email.",
              "Bookings linked to your guest profile or your email.",
            )}
          </p>
        </div>
        <button type="button" onClick={load} className="admin-action h-10 px-3">
          <RefreshCw className="size-4" />
          {t("Actualiser", "Refresh")}
        </button>
      </header>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
          {error}
        </div>
      )}

      {!loading && reservations.length > 0 && !canMessage && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
          {lockedReason}
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
            <div className="text-lg font-black text-primary">
              {t("Aucune réservation liée", "No linked bookings")}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{lockedReason}</p>
            <Link
              to="/search"
              search={{ adults: 2, children: 0, roomType: "Tous" }}
              className="admin-action mt-4"
            >
              <CalendarCheck className="size-4" />
              {t("Réserver un appart-hôtel", "Book the aparthotel")}
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-secondary/70 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">{t("Réservation", "Booking")}</th>
                  <th className="px-4 py-3">{t("Chambre", "Room")}</th>
                  <th className="px-4 py-3">{t("Check-in", "Check-in")}</th>
                  <th className="px-4 py-3">{t("Check-out", "Check-out")}</th>
                  <th className="px-4 py-3">{t("Statut", "Status")}</th>
                  <th className="px-4 py-3">{t("Paiement", "Payment")}</th>
                  <th className="px-4 py-3">{t("Total", "Total")}</th>
                  <th className="px-4 py-3">{t("Action", "Action")}</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id} className="border-t border-border">
                    <td className="px-4 py-3 font-black text-primary">
                      {reservation.reservationNumber}
                    </td>
                    <td className="px-4 py-3">
                      {localizeRoomName(
                        { name: reservation.roomName, id: reservation.roomTypeId },
                        locale,
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{reservation.checkIn}</td>
                    <td className="px-4 py-3 text-muted-foreground">{reservation.checkOut}</td>
                    <td className="px-4 py-3">
                      <StatusPill
                        value={reservationStatusLabels[reservation.status] ?? reservation.status}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill
                        value={
                          paymentStatusLabels[reservation.paymentStatus] ??
                          reservation.paymentStatus
                        }
                        subtle
                      />
                    </td>
                    <td className="px-4 py-3 font-black text-primary">
                      {formatCurrency(reservation.total)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => openConversation(reservation)}
                        disabled={!canMessage || openingId === reservation.id}
                        title={canMessage ? undefined : lockedReason}
                        className="admin-action disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <MessageCircle className="size-4" />
                        {openingId === reservation.id
                          ? t("Ouverture...", "Opening...")
                          : t("Envoyer un message", "Send a message")}
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
