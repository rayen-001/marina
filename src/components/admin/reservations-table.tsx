import { Link, useNavigate } from "@tanstack/react-router";
import { FileText, MessageCircle, MoreHorizontal, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  channelLabels,
  formatCurrency,
  paymentStatusLabels,
  reservations,
  reservationStatusLabels,
  rooms,
  type ChannelSource,
  type PaymentStatus,
  type ReservationStatus,
} from "@/data/hotel";
import {
  calculatePaidAmount,
  calculateRemainingAmount,
  setPaymentStatus as setPaymentStatusRemote,
} from "@/lib/services/paymentService";
import { generateInvoicePreview } from "@/lib/services/invoiceService";
import { createConversationForAdminReservation } from "@/lib/services/messageService";
import {
  assignRoomUnit,
  setReservationStatus as setReservationStatusRemote,
} from "@/lib/services/reservationService";
import { listRoomUnits, type RoomUnitOption } from "@/lib/services/roomService";
import { StatusBadge } from "./status-badge";

type Props = {
  compact?: boolean;
};

export function ReservationsTable({ compact = false }: Props) {
  const navigate = useNavigate();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [roomId, setRoomId] = useState("all");
  const [status, setStatus] = useState<ReservationStatus | "all">("all");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | "all">("all");
  const [source, setSource] = useState<ChannelSource | "all">("all");
  const [guestSearch, setGuestSearch] = useState("");
  const [version, setVersion] = useState(0);
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [openingMessageId, setOpeningMessageId] = useState<string | null>(null);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [unitsByRoom, setUnitsByRoom] = useState<Record<string, RoomUnitOption[]>>({});
  const [unitsLoadingRoomId, setUnitsLoadingRoomId] = useState<string | null>(null);

  const needle = guestSearch.trim().toLowerCase();
  const rows = reservations
    .filter((reservation) => {
      if (dateFrom && reservation.checkOut < dateFrom) return false;
      if (dateTo && reservation.checkIn > dateTo) return false;
      if (roomId !== "all" && reservation.roomId !== roomId) return false;
      if (status !== "all" && reservation.status !== status) return false;
      if (paymentStatus !== "all" && reservation.paymentStatus !== paymentStatus) return false;
      if (source !== "all" && reservation.source !== source) return false;
      if (
        needle &&
        !`${reservation.reservationNumber} ${reservation.guest.fullName} ${reservation.guest.email} ${reservation.guest.phone} ${reservation.guest.identityNumber}`
          .toLowerCase()
          .includes(needle)
      ) {
        return false;
      }
      return true;
    })
    .slice(0, compact ? 6 : undefined);

  const setReservation = (reservationId: string, nextStatus: ReservationStatus) => {
    setReservationStatusRemote(reservationId, nextStatus)
      .then(() => {
        setVersion((value) => value + 1);
        toast.success("Statut de la reservation mis a jour.");
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Mise a jour du statut impossible.");
      });
  };

  const setPayment = (reservationId: string, nextStatus: PaymentStatus) => {
    setPaymentStatusRemote(reservationId, nextStatus)
      .then(() => {
        setVersion((value) => value + 1);
        toast.success("Statut de paiement mis a jour.");
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Mise a jour du paiement impossible.");
      });
  };

  const toggleActionMenu = (reservation: (typeof reservations)[number]) => {
    setOpenActionId((current) => (current === reservation.id ? null : reservation.id));
    if (!unitsByRoom[reservation.roomId]) {
      setUnitsLoadingRoomId(reservation.roomId);
      void listRoomUnits(reservation.roomId)
        .then((units) => setUnitsByRoom((current) => ({ ...current, [reservation.roomId]: units })))
        .catch((error) =>
          toast.error(error instanceof Error ? error.message : "Unites indisponibles."),
        )
        .finally(() => setUnitsLoadingRoomId(null));
    }
  };

  const assignUnit = async (reservationId: string, roomUnitId: string) => {
    setAssigningId(reservationId);
    try {
      await assignRoomUnit(reservationId, roomUnitId || null);
      toast.success(roomUnitId ? "Appartement assigne." : "Assignation retiree.");
      setOpenActionId(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Assignation impossible.");
    } finally {
      setAssigningId(null);
    }
  };

  const createInvoice = async (reservationId: string) => {
    try {
      await generateInvoicePreview(reservationId);
      toast.success("Facture generee.");
      setOpenActionId(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Generation de facture impossible.");
    }
  };

  const messageClient = async (reservation: (typeof reservations)[number]) => {
    setOpeningMessageId(reservation.id);
    try {
      const result = await createConversationForAdminReservation(reservation);
      if (!result.linkedClientProfile) {
        toast.info("Client account not linked yet.");
      }
      setOpenActionId(null);
      navigate({ to: "/admin/messages", search: { conversation: result.conversation.id } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Conversation impossible.");
    } finally {
      setOpeningMessageId(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)]">
      {!compact && (
        <div className="grid gap-3 border-b border-border bg-card p-4 md:grid-cols-3 xl:grid-cols-7">
          <label className="relative md:col-span-3 xl:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={guestSearch}
              onChange={(event) => setGuestSearch(event.target.value)}
              placeholder="Client, téléphone, email, CIN, réservation..."
              className="admin-input pl-9"
            />
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={(event) => setDateFrom(event.target.value)}
            className="admin-input"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(event) => setDateTo(event.target.value)}
            className="admin-input"
          />
          <select
            value={roomId}
            onChange={(event) => setRoomId(event.target.value)}
            className="admin-input"
          >
            <option value="all">Toutes les chambres</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as ReservationStatus | "all")}
            className="admin-input"
          >
            <option value="all">Tous statuts</option>
            {Object.entries(reservationStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={paymentStatus}
            onChange={(event) => setPaymentStatus(event.target.value as PaymentStatus | "all")}
            className="admin-input"
          >
            <option value="all">Tous paiements</option>
            {Object.entries(paymentStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={source}
            onChange={(event) => setSource(event.target.value as ChannelSource | "all")}
            className="admin-input"
          >
            <option value="all">Toutes sources</option>
            {Object.entries(channelLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1500px] text-left text-sm">
          <thead className="bg-secondary/70 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Réservation</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Pays / ID</th>
              <th className="px-4 py-3">Chambre</th>
              <th className="px-4 py-3">Dates</th>
              <th className="px-4 py-3">Nuits</th>
              <th className="px-4 py-3">Voyageurs</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Paiement</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payé</th>
              <th className="px-4 py-3">Restant</th>
              <th className="px-4 py-3">Demandes</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((reservation) => {
              const room = rooms.find((item) => item.id === reservation.roomId);
              const paid = calculatePaidAmount(reservation.id);
              const remaining = calculateRemainingAmount(reservation.id);
              return (
                <tr
                  key={`${reservation.id}-${version}`}
                  className="border-t border-border align-top"
                >
                  <td className="px-4 py-3 font-semibold text-primary">
                    {reservation.reservationNumber}
                  </td>
                  <td className="px-4 py-3 font-medium">{reservation.guest.fullName}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div>{reservation.guest.phone}</div>
                    <div className="text-xs">{reservation.guest.email}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div>{reservation.guest.country}</div>
                    <div className="text-xs">{reservation.guest.identityNumber}</div>
                  </td>
                  <td className="px-4 py-3">{room?.name ?? reservation.roomId}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {reservation.checkIn} au {reservation.checkOut}
                  </td>
                  <td className="px-4 py-3">{reservation.nights}</td>
                  <td className="px-4 py-3">
                    {reservation.adults} ad. · {reservation.children} enf.
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge kind="source" value={reservation.source} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge kind="reservation" value={reservation.status} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge kind="payment" value={reservation.paymentStatus} />
                  </td>
                  <td className="px-4 py-3 font-semibold">{formatCurrency(reservation.total)}</td>
                  <td className="px-4 py-3">{formatCurrency(paid)}</td>
                  <td className="px-4 py-3">{formatCurrency(remaining)}</td>
                  <td className="max-w-[220px] px-4 py-3 text-muted-foreground">
                    {reservation.specialRequests ?? "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => toggleActionMenu(reservation)}
                        className="admin-action h-9 px-3"
                        aria-expanded={openActionId === reservation.id}
                      >
                        <MoreHorizontal className="size-4" />
                        Actions
                      </button>
                      {openActionId === reservation.id && (
                        <div className="absolute right-0 top-10 z-20 grid w-56 gap-1 rounded-xl border border-border bg-card p-2 shadow-[var(--shadow-lift)]">
                          {reservation.status === "pending" && (
                            <ActionMenuButton
                              label="Rejeter"
                              danger
                              onClick={() => setReservation(reservation.id, "cancelled")}
                            />
                          )}
                          <ActionMenuButton
                            label="Confirmer"
                            onClick={() => setReservation(reservation.id, "confirmed")}
                          />
                          <ActionMenuButton
                            label="Check-in"
                            onClick={() => setReservation(reservation.id, "checked_in")}
                          />
                          <ActionMenuButton
                            label="Check-out"
                            onClick={() => setReservation(reservation.id, "checked_out")}
                          />
                          <ActionMenuButton
                            label="Annuler"
                            danger
                            onClick={() => setReservation(reservation.id, "cancelled")}
                          />
                          <div className="mt-1 border-t border-border pt-1">
                            <label className="block px-2 pb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                              Assigner un appartement
                            </label>
                            <select
                              defaultValue=""
                              disabled={
                                assigningId === reservation.id ||
                                unitsLoadingRoomId === reservation.roomId
                              }
                              onChange={(event) =>
                                void assignUnit(reservation.id, event.target.value)
                              }
                              className="admin-input h-9 w-full disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <option value="">
                                {unitsLoadingRoomId === reservation.roomId
                                  ? "Chargement..."
                                  : "Choisir une unite"}
                              </option>
                              {(unitsByRoom[reservation.roomId] ?? []).map((unit) => (
                                <option key={unit.id} value={unit.id}>
                                  Unite {unit.unitNumber}
                                </option>
                              ))}
                            </select>
                          </div>
                          <ActionMenuButton
                            label="Acompte"
                            onClick={() => setPayment(reservation.id, "deposit_paid")}
                          />
                          <ActionMenuButton
                            label="Marquer paye"
                            onClick={() => setPayment(reservation.id, "paid")}
                          />
                          <ActionMenuButton
                            label="Generer facture"
                            icon={<FileText className="size-3.5" />}
                            onClick={() => void createInvoice(reservation.id)}
                          />
                          <ActionMenuButton
                            label={
                              openingMessageId === reservation.id
                                ? "Ouverture..."
                                : "Message client"
                            }
                            icon={<MessageCircle className="size-3.5" />}
                            onClick={() => void messageClient(reservation)}
                          />
                          <Link to="/admin/invoices" className="admin-action justify-start">
                            Voir facture
                          </Link>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={16} className="px-4 py-12">
                  <div className="empty-state mx-auto max-w-xl py-10">
                    <Search className="mx-auto mb-3 size-8 text-accent" />
                    <div className="text-lg font-black text-primary">Aucune réservation</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Aucune réservation ne correspond aux filtres sélectionnés.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ActionMenuButton({
  label,
  icon,
  danger = false,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`admin-action justify-start ${
        danger ? "text-destructive hover:border-destructive/40 hover:bg-destructive/10" : ""
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
