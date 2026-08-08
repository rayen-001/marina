import { useRouter } from "@tanstack/react-router";
import { CalendarPlus, Save } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { isSupabaseConfigured } from "@/lib/supabase/isSupabaseConfigured";
import type { ChannelSource, PaymentStatus, ReservationStatus, Tables } from "@/lib/supabase/types";
import { AdminButton, type AdminButtonVariant } from "./AdminButton";

type AdminPaymentStatus = "unpaid" | "partial" | "paid";
type InventoryMode = "auto" | "all" | "quantity" | "specific_units" | "closed";

type RoomTypeOption = Pick<
  Tables<"room_types">,
  "id" | "name" | "slug" | "price_per_night" | "total_units" | "status"
>;

type RoomUnitOption = Pick<Tables<"room_units">, "id" | "room_type_id" | "unit_number" | "status">;

type RateCalendarRow = Tables<"room_rate_calendar"> & {
  inventory_mode?: InventoryMode | null;
  units_available_override?: number | null;
  selected_unit_ids?: string[] | null;
  status?: string | null;
};

type ReservationOverlapRow = {
  id?: string;
  room_type_id: string;
  room_unit_id: string | null;
  check_in: string;
  check_out: string;
  status: string;
};

type ReservationQueryResult = {
  rows: ReservationOverlapRow[];
  roomUnitIdAvailable: boolean;
  fallbackUsed: boolean;
};

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  identity: string;
  roomTypeId: string;
  roomUnitId: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  status: Extract<ReservationStatus, "pending" | "confirmed" | "checked_in">;
  paymentStatus: AdminPaymentStatus;
  notes: string;
};

type PricePreview = {
  nights: number;
  nightly: Array<{ date: string; price: number; custom: boolean }>;
  subtotal: number;
  deposit: number;
  total: number;
  availableUnits: number | null;
  unavailable: boolean;
  reason: string | null;
};

type MutationResult<T> = {
  data: T | null;
  error: unknown | null;
};

type LegacyGuestInsertClient = {
  insert: (payload: Record<string, unknown>) => {
    select: (columns: string) => {
      single: () => Promise<MutationResult<Tables<"guests">>>;
    };
  };
};

type AdminNewReservationButtonProps = {
  variant?: AdminButtonVariant;
  className?: string;
  onCreated?: () => void | Promise<void>;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  country: "Tunisie",
  identity: "",
  roomTypeId: "",
  roomUnitId: "",
  checkIn: "",
  checkOut: "",
  adults: "1",
  children: "0",
  status: "confirmed",
  paymentStatus: "unpaid",
  notes: "",
};

const unavailableMessage = "Cette chambre n'est pas disponible pour les dates sélectionnées.";

export function AdminNewReservationButton({
  variant = "primary",
  className,
  onCreated,
}: AdminNewReservationButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdminButton
        type="button"
        variant={variant}
        className={className}
        icon={<CalendarPlus className="size-4" />}
        onClick={() => setOpen(true)}
      >
        Nouvelle réservation
      </AdminButton>
      <AdminNewReservationModal open={open} onOpenChange={setOpen} onCreated={onCreated} />
    </>
  );
}

export function AdminNewReservationModal({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void | Promise<void>;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [rooms, setRooms] = useState<RoomTypeOption[]>([]);
  const [units, setUnits] = useState<RoomUnitOption[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [preview, setPreview] = useState<PricePreview | null>(null);
  const [saving, setSaving] = useState(false);

  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === form.roomTypeId) ?? null,
    [form.roomTypeId, rooms],
  );

  useEffect(() => {
    if (!open) return;
    void loadRoomTypes();
  }, [open]);

  useEffect(() => {
    if (!form.roomTypeId) {
      setUnits([]);
      return;
    }
    let cancelled = false;
    void loadRoomUnits(form.roomTypeId, () => cancelled);
    return () => {
      cancelled = true;
    };
  }, [form.roomTypeId]);

  useEffect(() => {
    if (!open || !selectedRoom || !isValidStay(form.checkIn, form.checkOut)) {
      setPreview(null);
      return;
    }

    let cancelled = false;
    setPreviewLoading(true);
    calculatePreview(selectedRoom, form.roomUnitId || null, form.checkIn, form.checkOut)
      .then((next) => {
        if (!cancelled) setPreview(next);
      })
      .catch((error) => {
        console.error("[AdminNewReservation] preview error", error);
        if (!cancelled) {
          setPreview({
            nights: getDatesBetween(form.checkIn, form.checkOut, false).length,
            nightly: [],
            subtotal: 0,
            deposit: 0,
            total: 0,
            availableUnits: null,
            unavailable: true,
            reason: getErrorDetail(error) ?? unavailableMessage,
          });
        }
      })
      .finally(() => {
        if (!cancelled) setPreviewLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [form.checkIn, form.checkOut, form.roomUnitId, open, selectedRoom]);

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetAndClose = () => {
    setForm(initialForm);
    setUnits([]);
    setPreview(null);
    onOpenChange(false);
  };

  async function loadRoomTypes() {
    if (!isSupabaseConfigured()) {
      toast.error("Supabase n'est pas configuré.");
      return;
    }

    setLoadingRooms(true);
    try {
      const supabase = await requireSupabase();
      let result = await supabase
        .from("room_types")
        .select("id, name, slug, price_per_night, total_units, status")
        .eq("status", "active")
        .order("sort_order", { ascending: true });

      if (result.error && isMissingColumnError(result.error, "sort_order")) {
        result = await supabase
          .from("room_types")
          .select("id, name, slug, price_per_night, total_units, status")
          .eq("status", "active")
          .order("name", { ascending: true });
      }

      if (result.error) throw result.error;

      const nextRooms = (result.data ?? []) as RoomTypeOption[];
      setRooms(nextRooms);
      setForm((current) => ({
        ...current,
        roomTypeId: current.roomTypeId || nextRooms[0]?.id || "",
      }));
    } catch (error) {
      console.error("[AdminNewReservation] room_types load error", error);
      toast.error(getSupabaseErrorMessage(error));
    } finally {
      setLoadingRooms(false);
    }
  }

  async function loadRoomUnits(roomTypeId: string, isCancelled: () => boolean) {
    setLoadingUnits(true);
    try {
      const supabase = await requireSupabase();
      const result = await supabase
        .from("room_units")
        .select("id, room_type_id, unit_number, status")
        .eq("room_type_id", roomTypeId)
        .order("unit_number");

      if (result.error) throw result.error;
      if (isCancelled()) return;
      setUnits((result.data ?? []) as RoomUnitOption[]);
      setForm((current) => ({ ...current, roomUnitId: "" }));
    } catch (error) {
      if (isCancelled()) return;
      console.error("[AdminNewReservation] room_units load error", error);
      setUnits([]);
    } finally {
      if (!isCancelled()) setLoadingUnits(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateForm(form);
    if (validation) {
      toast.error(validation);
      return;
    }

    if (!selectedRoom) {
      toast.error("Sélectionnez un type de chambre.");
      return;
    }

    setSaving(true);
    try {
      const currentPreview =
        preview ??
        (await calculatePreview(
          selectedRoom,
          form.roomUnitId || null,
          form.checkIn,
          form.checkOut,
        ));

      if (
        currentPreview.unavailable ||
        (currentPreview.availableUnits !== null && currentPreview.availableUnits <= 0)
      ) {
        toast.error(unavailableMessage);
        return;
      }

      const supabase = await requireSupabase();
      const guest = await createGuest(supabase, form);
      const reservation = await createReservationRow(
        supabase,
        form,
        selectedRoom,
        guest.id,
        currentPreview,
      );

      if (import.meta.env.DEV) {
        console.info("[AdminNewReservation] created reservation", reservation);
      }

      toast.success("Réservation créée avec succès");
      await router.invalidate();
      await onCreated?.();
      resetAndClose();
    } catch (error) {
      console.error("[AdminNewReservation] create error", error);
      toast.error(getSupabaseErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nouvelle réservation</DialogTitle>
          <DialogDescription>
            Créez une réservation hôtel directement dans Supabase.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <section className="rounded-lg border border-border bg-card p-4">
            <SectionTitle title="Client" />
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Nom complet">
                <Input
                  value={form.fullName}
                  onChange={(event) => setField("fullName", event.target.value)}
                  required
                />
              </AdminField>
              <AdminField label="Email">
                <Input
                  type="email"
                  value={form.email}
                  onChange={(event) => setField("email", event.target.value)}
                  required
                />
              </AdminField>
              <AdminField label="Téléphone">
                <Input
                  value={form.phone}
                  onChange={(event) => setField("phone", event.target.value)}
                  required
                />
              </AdminField>
              <AdminField label="Pays">
                <Input
                  value={form.country}
                  onChange={(event) => setField("country", event.target.value)}
                  required
                />
              </AdminField>
              <AdminField label="CIN / Passeport optional">
                <Input
                  value={form.identity}
                  onChange={(event) => setField("identity", event.target.value)}
                />
              </AdminField>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card p-4">
            <SectionTitle title="Séjour" />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <AdminField label="Type de chambre">
                <select
                  value={form.roomTypeId}
                  onChange={(event) => setField("roomTypeId", event.target.value)}
                  className="admin-input"
                  required
                >
                  <option value="">{loadingRooms ? "Chargement..." : "Sélectionner"}</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </AdminField>
              <AdminField label="Numéro / unité optional">
                <select
                  value={form.roomUnitId}
                  onChange={(event) => setField("roomUnitId", event.target.value)}
                  className="admin-input"
                  disabled={!form.roomTypeId || loadingUnits}
                >
                  <option value="">
                    {loadingUnits
                      ? "Chargement..."
                      : units.length
                        ? "Sans unité précise"
                        : "Aucune unité requise"}
                  </option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.unit_number} · {unit.status}
                    </option>
                  ))}
                </select>
              </AdminField>
              <AdminField label="Date d'arrivée">
                <Input
                  type="date"
                  value={form.checkIn}
                  onChange={(event) => setField("checkIn", event.target.value)}
                  required
                />
              </AdminField>
              <AdminField label="Date de départ">
                <Input
                  type="date"
                  value={form.checkOut}
                  onChange={(event) => setField("checkOut", event.target.value)}
                  required
                />
              </AdminField>
              <AdminField label="Adultes">
                <Input
                  type="number"
                  min={1}
                  value={form.adults}
                  onChange={(event) => setField("adults", event.target.value)}
                  required
                />
              </AdminField>
              <AdminField label="Enfants">
                <Input
                  type="number"
                  min={0}
                  value={form.children}
                  onChange={(event) => setField("children", event.target.value)}
                  required
                />
              </AdminField>
              <AdminField label="Statut">
                <select
                  value={form.status}
                  onChange={(event) =>
                    setField("status", event.target.value as FormState["status"])
                  }
                  className="admin-input"
                >
                  <option value="pending">pending</option>
                  <option value="confirmed">confirmed</option>
                  <option value="checked_in">checked_in</option>
                </select>
              </AdminField>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card p-4">
            <SectionTitle title="Paiement" />
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Payment status">
                <select
                  value={form.paymentStatus}
                  onChange={(event) =>
                    setField("paymentStatus", event.target.value as AdminPaymentStatus)
                  }
                  className="admin-input"
                >
                  <option value="unpaid">unpaid</option>
                  <option value="partial">partial</option>
                  <option value="paid">paid</option>
                </select>
              </AdminField>
              <AdminField label="Source">
                <Input value="admin" readOnly />
              </AdminField>
              <AdminField label="Notes optional">
                <Textarea
                  value={form.notes}
                  onChange={(event) => setField("notes", event.target.value)}
                  className="min-h-24"
                />
              </AdminField>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-secondary/30 p-4">
            <SectionTitle title="Résumé" />
            {previewLoading && <p className="text-sm text-muted-foreground">Calcul en cours...</p>}
            {!previewLoading && preview && (
              <div className="space-y-3 text-sm">
                {preview.unavailable && (
                  <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 font-semibold text-destructive">
                    {preview.reason ?? unavailableMessage}
                  </div>
                )}
                <div className="grid gap-3 sm:grid-cols-4">
                  <SummaryTile label="Nuits" value={String(preview.nights)} />
                  <SummaryTile
                    label="Disponibles"
                    value={preview.availableUnits === null ? "-" : String(preview.availableUnits)}
                  />
                  <SummaryTile label="Sous-total" value={`${Math.round(preview.subtotal)} DT`} />
                  <SummaryTile label="Total" value={`${Math.round(preview.total)} DT`} />
                </div>
                <div className="max-h-40 overflow-auto rounded-md border border-border bg-card">
                  {preview.nightly.map((night) => (
                    <div
                      key={night.date}
                      className="flex items-center justify-between gap-3 border-b border-border px-3 py-2 last:border-b-0"
                    >
                      <span className="font-mono text-xs">{night.date}</span>
                      <span className="font-semibold">
                        {Math.round(night.price)} DT{night.custom ? " · tarif calendrier" : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!previewLoading && !preview && (
              <p className="text-sm text-muted-foreground">
                Sélectionnez une chambre et des dates pour afficher le prix.
              </p>
            )}
          </section>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={resetAndClose} disabled={saving}>
              Annuler
            </Button>
            <Button type="submit" loading={saving} disabled={preview?.unavailable}>
              <Save className="size-4" />
              {saving ? "Création en cours..." : "Créer la réservation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

async function calculatePreview(
  room: RoomTypeOption,
  selectedRoomUnitId: string | null,
  checkIn: string,
  checkOut: string,
): Promise<PricePreview> {
  const nights = getDatesBetween(checkIn, checkOut, false);
  const supabase = await requireSupabase();
  const ratesResult = await supabase
    .from("room_rate_calendar")
    .select("*")
    .eq("room_type_id", room.id)
    .gte("date", checkIn)
    .lt("date", checkOut);

  if (ratesResult.error) throw ratesResult.error;

  const reservations = await fetchOverlappingReservations(supabase, room.id, checkIn, checkOut);
  const rateByDate = new Map(
    ((ratesResult.data ?? []) as RateCalendarRow[]).map((rate) => [rate.date, rate]),
  );
  const reservedByDate = buildReservationCountByDate(reservations.rows, checkIn, checkOut);
  const occupiedUnitsByDate = buildOccupiedUnitsByDate(reservations.rows, checkIn, checkOut);
  const totalUnits = Math.max(0, Number(room.total_units ?? 0));
  const availabilityByDate = nights.map((date) => {
    const rate = rateByDate.get(date);
    return calculateAvailableUnitsForNight({
      rate,
      totalUnits,
      reservedUnits: reservedByDate.get(date) ?? 0,
      occupiedUnitIds: occupiedUnitsByDate.get(date) ?? new Set<string>(),
      roomUnitIdAvailable: reservations.roomUnitIdAvailable,
      selectedRoomUnitId,
    });
  });
  const availableUnits = availabilityByDate.length ? Math.min(...availabilityByDate) : 0;
  const nightly = nights.map((date) => {
    const rate = rateByDate.get(date);
    return {
      date,
      price: Number(rate?.price ?? room.price_per_night ?? 0),
      custom: Boolean(rate),
    };
  });
  const subtotal = nightly.reduce((sum, night) => sum + night.price, 0);
  const deposit = Math.round(subtotal * 0.3);

  if (import.meta.env.DEV) {
    console.info(
      "[AdminNewReservation] room_unit_id column available",
      reservations.roomUnitIdAvailable,
    );
    console.info("[AdminNewReservation] reservations count", reservations.rows.length);
    if (reservations.fallbackUsed) {
      console.info(
        "[AdminNewReservation] fallback mode: reservations.room_unit_id missing, using room_type_id availability",
      );
    }
  }

  return {
    nights: nights.length,
    nightly,
    subtotal,
    deposit,
    total: subtotal,
    availableUnits,
    unavailable: nights.length === 0 || availableUnits <= 0,
    reason:
      nights.length === 0
        ? "Sélectionnez une période valide."
        : availableUnits <= 0
          ? unavailableMessage
          : null,
  };
}

async function createGuest(supabase: Awaited<ReturnType<typeof requireSupabase>>, form: FormState) {
  const basePayload = {
    full_name: form.fullName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    country: form.country.trim(),
    identity_number: form.identity.trim(),
    updated_at: new Date().toISOString(),
  };

  let result: MutationResult<Tables<"guests">> = await supabase
    .from("guests")
    .insert(basePayload)
    .select("*")
    .single();

  if (result.error && isMissingColumnError(result.error, "updated_at")) {
    const { updated_at: _updatedAt, ...withoutUpdatedAt } = basePayload;
    result = await supabase.from("guests").insert(withoutUpdatedAt).select("*").single();
  }

  if (result.error && isMissingColumnError(result.error, "identity_number")) {
    const { identity_number: _identityNumber, ...withoutIdentityNumber } = basePayload;
    const legacyGuests = supabase.from("guests") as unknown as LegacyGuestInsertClient;
    result = await legacyGuests
      .insert({ ...withoutIdentityNumber, cin_passport: form.identity.trim() || null })
      .select("*")
      .single();
  }

  if (result.error && isMissingColumnError(result.error, "cin_passport")) {
    const { identity_number: _identityNumber, ...withoutIdentityNumber } = basePayload;
    const legacyGuests = supabase.from("guests") as unknown as LegacyGuestInsertClient;
    result = await legacyGuests.insert(withoutIdentityNumber).select("*").single();
  }

  if (result.error) {
    console.error("[AdminNewReservation] guest insert error", result.error);
    throw result.error;
  }

  if (!result.data) throw new Error("Guest creation did not return a row.");
  return result.data;
}

async function createReservationRow(
  supabase: Awaited<ReturnType<typeof requireSupabase>>,
  form: FormState,
  room: RoomTypeOption,
  guestId: string,
  preview: PricePreview,
) {
  const paymentStatus = toDbPaymentStatus(form.paymentStatus);
  const paidAmount =
    form.paymentStatus === "paid"
      ? preview.total
      : form.paymentStatus === "partial"
        ? preview.deposit
        : 0;
  const remainingAmount = Math.max(0, preview.total - paidAmount);
  const now = new Date().toISOString();
  const payload = {
    reservation_number: generateAdminReservationNumber(),
    guest_id: guestId,
    room_type_id: room.id,
    room_unit_id: form.roomUnitId || null,
    check_in: form.checkIn,
    check_out: form.checkOut,
    adults: Number(form.adults),
    children: Number(form.children),
    status: form.status,
    payment_status: paymentStatus,
    source: "admin" as ChannelSource,
    special_requests: normalizeOptional(form.notes),
    nights: preview.nights,
    room_price: preview.subtotal,
    taxes_and_fees: 0,
    deposit: preview.deposit,
    total: preview.total,
    paid_amount: paidAmount,
    remaining_amount: remainingAmount,
    updated_at: now,
  };

  let result: MutationResult<Tables<"reservations">> = await supabase
    .from("reservations")
    .insert(payload)
    .select("*")
    .single();

  if (result.error && isMissingColumnError(result.error, "room_unit_id")) {
    const { room_unit_id: _roomUnitId, ...withoutRoomUnitId } = payload;
    result = await supabase.from("reservations").insert(withoutRoomUnitId).select("*").single();
  }

  if (result.error && isMissingColumnError(result.error, "updated_at")) {
    const { updated_at: _updatedAt, ...withoutUpdatedAt } = payload;
    result = await supabase.from("reservations").insert(withoutUpdatedAt).select("*").single();
  }

  if (result.error) {
    console.error("[AdminNewReservation] reservation insert error", result.error);
    throw result.error;
  }

  if (!result.data) throw new Error("Reservation creation did not return a row.");
  return result.data;
}

async function fetchOverlappingReservations(
  supabase: Awaited<ReturnType<typeof requireSupabase>>,
  roomTypeId: string,
  checkIn: string,
  checkOut: string,
): Promise<ReservationQueryResult> {
  const withRoomUnitId = await supabase
    .from("reservations")
    .select("id, room_type_id, room_unit_id, check_in, check_out, status")
    .eq("room_type_id", roomTypeId)
    .neq("status", "cancelled")
    .lt("check_in", checkOut)
    .gt("check_out", checkIn);

  if (!withRoomUnitId.error) {
    return {
      rows: ((withRoomUnitId.data ?? []) as ReservationOverlapRow[]).map((row) => ({
        ...row,
        room_unit_id: row.room_unit_id ?? null,
      })),
      roomUnitIdAvailable: true,
      fallbackUsed: false,
    };
  }

  if (!isMissingColumnError(withRoomUnitId.error, "room_unit_id")) throw withRoomUnitId.error;

  const withoutRoomUnitId = await supabase
    .from("reservations")
    .select("id, room_type_id, check_in, check_out, status")
    .eq("room_type_id", roomTypeId)
    .neq("status", "cancelled")
    .lt("check_in", checkOut)
    .gt("check_out", checkIn);

  if (withoutRoomUnitId.error) throw withoutRoomUnitId.error;

  return {
    rows: (
      (withoutRoomUnitId.data ?? []) as Array<Omit<ReservationOverlapRow, "room_unit_id">>
    ).map((row) => ({
      ...row,
      room_unit_id: null,
    })),
    roomUnitIdAvailable: false,
    fallbackUsed: true,
  };
}

function calculateAvailableUnitsForNight({
  rate,
  totalUnits,
  reservedUnits,
  occupiedUnitIds,
  roomUnitIdAvailable,
  selectedRoomUnitId,
}: {
  rate?: RateCalendarRow | null;
  totalUnits: number;
  reservedUnits: number;
  occupiedUnitIds: Set<string>;
  roomUnitIdAvailable: boolean;
  selectedRoomUnitId: string | null;
}) {
  const status = rate?.status ?? "available";
  const mode = normalizeInventoryMode(rate?.inventory_mode);

  if (
    mode === "closed" ||
    status === "closed" ||
    status === "not_available" ||
    status === "maintenance"
  ) {
    return 0;
  }

  if (selectedRoomUnitId && roomUnitIdAvailable && occupiedUnitIds.has(selectedRoomUnitId))
    return 0;
  if (mode === "all") return totalUnits;
  if (mode === "quantity")
    return clampCount(Number(rate?.units_available_override ?? 0), totalUnits);
  if (mode === "specific_units") {
    const selectedUnitIds = Array.isArray(rate?.selected_unit_ids) ? rate.selected_unit_ids : [];
    if (
      selectedRoomUnitId &&
      selectedUnitIds.length > 0 &&
      !selectedUnitIds.includes(selectedRoomUnitId)
    ) {
      return 0;
    }
    if (!roomUnitIdAvailable)
      return clampCount(
        selectedUnitIds.length || Number(rate?.units_available_override ?? 0),
        totalUnits,
      );
    return clampCount(
      selectedUnitIds.filter((unitId) => !occupiedUnitIds.has(unitId)).length,
      totalUnits,
    );
  }

  return clampCount(totalUnits - reservedUnits, totalUnits);
}

function buildReservationCountByDate(
  rows: ReservationOverlapRow[],
  checkIn: string,
  checkOut: string,
) {
  const counts = new Map<string, number>();

  for (const row of rows) {
    if (!isActiveReservation(row.status)) continue;
    const current = new Date(`${maxDate(row.check_in, checkIn)}T12:00:00`);
    const end = new Date(`${minDate(row.check_out, checkOut)}T12:00:00`);
    while (current < end) {
      const date = toIsoDate(current);
      counts.set(date, (counts.get(date) ?? 0) + 1);
      current.setDate(current.getDate() + 1);
    }
  }

  return counts;
}

function buildOccupiedUnitsByDate(
  rows: ReservationOverlapRow[],
  checkIn: string,
  checkOut: string,
) {
  const occupied = new Map<string, Set<string>>();

  for (const row of rows) {
    if (!isActiveReservation(row.status) || !row.room_unit_id) continue;
    const current = new Date(`${maxDate(row.check_in, checkIn)}T12:00:00`);
    const end = new Date(`${minDate(row.check_out, checkOut)}T12:00:00`);
    while (current < end) {
      const date = toIsoDate(current);
      const ids = occupied.get(date) ?? new Set<string>();
      ids.add(row.room_unit_id);
      occupied.set(date, ids);
      current.setDate(current.getDate() + 1);
    }
  }

  return occupied;
}

function validateForm(form: FormState) {
  if (!form.fullName.trim()) return "Le nom complet est obligatoire.";
  if (!form.email.trim()) return "L'email est obligatoire.";
  if (!form.phone.trim()) return "Le téléphone est obligatoire.";
  if (!form.country.trim()) return "Le pays est obligatoire.";
  if (!form.roomTypeId) return "Sélectionnez un type de chambre.";
  if (!isValidStay(form.checkIn, form.checkOut)) return "Sélectionnez des dates valides.";
  if (!Number.isInteger(Number(form.adults)) || Number(form.adults) < 1)
    return "Le nombre d'adultes est invalide.";
  if (!Number.isInteger(Number(form.children)) || Number(form.children) < 0)
    return "Le nombre d'enfants est invalide.";
  return null;
}

function isValidStay(checkIn: string, checkOut: string) {
  return Boolean(checkIn && checkOut && checkIn < checkOut);
}

function getDatesBetween(startDate: string, endDate: string, inclusiveEnd: boolean) {
  if (!startDate || !endDate || startDate > endDate) return [];
  const dates: string[] = [];
  const current = new Date(`${startDate}T12:00:00`);
  const end = new Date(`${endDate}T12:00:00`);

  while (inclusiveEnd ? current <= end : current < end) {
    dates.push(toIsoDate(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

function toDbPaymentStatus(status: AdminPaymentStatus): PaymentStatus {
  if (status === "paid") return "paid";
  if (status === "partial") return "deposit_paid";
  return "unpaid";
}

function generateAdminReservationNumber() {
  const today = new Date();
  const datePart = today.toISOString().slice(0, 10).replaceAll("-", "");
  const randomPart =
    typeof crypto !== "undefined" && "getRandomValues" in crypto
      ? [...crypto.getRandomValues(new Uint8Array(3))]
          .map((value) => value.toString(16).padStart(2, "0"))
          .join("")
          .toUpperCase()
      : Math.random().toString(16).slice(2, 8).toUpperCase();
  return `RES-${datePart}-${randomPart}`;
}

async function requireSupabase() {
  if (!isSupabaseConfigured()) throw new Error("Supabase n'est pas configuré.");
  const { supabase } = await import("@/lib/supabase/client");
  return supabase;
}

function normalizeInventoryMode(mode?: string | null): InventoryMode {
  if (mode === "all" || mode === "quantity" || mode === "specific_units" || mode === "closed")
    return mode;
  return "auto";
}

function isActiveReservation(status: string | null | undefined) {
  return status !== "cancelled" && status !== "no_show" && status !== "checked_out";
}

function clampCount(value: number, totalUnits: number) {
  return Math.min(Math.max(0, Math.trunc(value)), Math.max(0, totalUnits));
}

function maxDate(first: string, second: string) {
  return first > second ? first : second;
}

function minDate(first: string, second: string) {
  return first < second ? first : second;
}

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function normalizeOptional(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function getSupabaseErrorMessage(error: unknown) {
  if (isPermissionError(error)) {
    return "Permission Supabase refusée. Vérifiez les policies guests/reservations.";
  }
  return getErrorDetail(error) ?? "Erreur Supabase inconnue.";
}

function getErrorDetail(error: unknown) {
  if (!error) return null;
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  const maybeError = error as { message?: string; details?: string; hint?: string; code?: string };
  const parts = [maybeError.message, maybeError.details, maybeError.hint, maybeError.code].filter(
    Boolean,
  );
  return parts.length ? parts.join(" | ") : JSON.stringify(error);
}

function isPermissionError(error: unknown) {
  const maybeError = error as {
    code?: string;
    status?: number;
    message?: string;
    details?: string;
    hint?: string;
  };
  const haystack = [maybeError?.message, maybeError?.details, maybeError?.hint, maybeError?.code]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    maybeError?.code === "42501" ||
    maybeError?.status === 401 ||
    maybeError?.status === 403 ||
    haystack.includes("permission") ||
    haystack.includes("row-level security") ||
    haystack.includes("rls") ||
    haystack.includes("not authorized")
  );
}

function isMissingColumnError(error: unknown, column: string) {
  const maybeError = error as { code?: string; message?: string; details?: string; hint?: string };
  const haystack = [maybeError?.message, maybeError?.details, maybeError?.hint]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return maybeError?.code === "42703" && haystack.includes(column.toLowerCase());
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="mb-4 text-sm font-black uppercase tracking-[0.12em] text-primary">{title}</h3>
  );
}

function AdminField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-3">
      <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-lg font-black text-primary">{value}</div>
    </div>
  );
}
