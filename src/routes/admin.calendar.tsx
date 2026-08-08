import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AlertTriangle, CalendarRange, ChevronLeft, ChevronRight, Plus, Save } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminNewReservationButton } from "@/components/admin/AdminNewReservationModal";
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
import type { DayAvailability } from "@/lib/services/rateCalendarService";
import type {
  RoomRateInventoryMode,
  RoomStatus,
  Tables,
  TablesInsert,
  UnitStatus,
} from "@/lib/supabase/types";

type EditableCalendarStatus =
  | "available"
  | "partially_reserved"
  | "not_available"
  | "closed"
  | "maintenance";

type CalendarViewMode = "14_days" | "month" | "3_months" | "year";
type InventoryMode = RoomRateInventoryMode;

type CalendarRangeValue = {
  startDate: string;
  endDate: string;
};

type RoomUnitOption = Pick<Tables<"room_units">, "id" | "room_type_id" | "unit_number" | "status">;

type AdminCalendarRoom = {
  id: string;
  name: string;
  pricePerNight: number;
  totalUnits: number;
  status: RoomStatus;
  units: RoomUnitOption[];
  cells: CalendarCell[];
};

type CalendarCell = {
  roomTypeId: string;
  date: string;
  availableUnits: number;
  reservedUnits: number;
  totalUnits: number;
  price: number;
  status: DayAvailability;
  effectiveStatus: DayAvailability;
  minNights: number;
  note: string | null;
  inventoryMode: InventoryMode;
  unitsAvailableOverride: number | null;
  selectedUnitIds: string[];
  hasCustomRate: boolean;
  rateData: CalendarRateRow | null;
};

type LoaderData = {
  days: string[];
  rooms: AdminCalendarRoom[];
  loadError: string | null;
  loadErrorDetail: string | null;
  blockLoadError: string | null;
  unitLoadError: string | null;
  rateCount: number;
  supabaseConfigured: boolean;
};

type CalendarReservationQueryResult = {
  data: ReservationSlice[];
  error: unknown | null;
  roomUnitIdAvailable: boolean;
  fallbackUsed: boolean;
};

type CellFormState = {
  price: string;
  status: EditableCalendarStatus;
  minNights: string;
  note: string;
  inventoryMode: InventoryMode;
  unitsAvailableOverride: string;
  selectedUnitIds: string[];
};

type BulkInventoryMode = Exclude<InventoryMode, "specific_units">;

type BulkFormState = Omit<CellFormState, "inventoryMode" | "selectedUnitIds"> & {
  inventoryMode: BulkInventoryMode;
  roomTypeIds: string[];
  startDate: string;
  endDate: string;
};

type AdminRoomRow = Pick<
  Tables<"room_types">,
  "id" | "name" | "price_per_night" | "total_units" | "status"
>;

type CalendarRateRow = Tables<"room_rate_calendar"> & {
  status?: DayAvailability | null;
  note?: string | null;
  notes?: string | null;
  updated_at?: string | null;
  inventory_mode?: InventoryMode | null;
  units_available_override?: number | null;
  selected_unit_ids?: string[] | null;
};

type AvailabilityBlockStatus =
  | "closed"
  | "not_available"
  | "maintenance"
  | "partially_available"
  | "partially_reserved";

type AvailabilityBlockRow = {
  id?: string;
  room_type_id: string;
  start_date: string;
  end_date: string;
  status: AvailabilityBlockStatus;
  reason?: string | null;
  created_at?: string | null;
};

type ReservationSlice = {
  id?: string;
  room_type_id: string;
  room_unit_id: string | null;
  check_in: string;
  check_out: string;
  status: Tables<"reservations">["status"];
};

const CALENDAR_STATUS_OPTIONS: EditableCalendarStatus[] = [
  "available",
  "partially_reserved",
  "not_available",
  "closed",
  "maintenance",
];

const INVENTORY_MODE_OPTIONS: Array<{ value: InventoryMode; label: string }> = [
  { value: "auto", label: "Automatique" },
  { value: "all", label: "Toutes les chambres" },
  { value: "quantity", label: "Quantité disponible" },
  { value: "specific_units", label: "Chambres précises" },
  { value: "closed", label: "Fermé" },
];

const BULK_INVENTORY_MODE_OPTIONS: Array<{ value: BulkInventoryMode; label: string }> = [
  { value: "auto", label: "Automatique" },
  { value: "all", label: "Toutes les chambres" },
  { value: "quantity", label: "Quantité disponible" },
  { value: "closed", label: "Fermé" },
];

const VIEW_OPTIONS: Array<{ value: CalendarViewMode; label: string }> = [
  { value: "14_days", label: "14 jours" },
  { value: "month", label: "Mois" },
  { value: "3_months", label: "3 mois" },
  { value: "year", label: "Année" },
];

const AVAILABLE_YEARS = [2026, 2027, 2028];
const MONTH_NAMES = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const Route = createFileRoute("/admin/calendar")({
  loader: () => loadAdminCalendarData(getDefaultCalendarRange()),
  head: () => ({
    meta: [{ title: "Calendrier - Marina Cap Monastir" }],
  }),
  component: AdminCalendar,
});

function AdminCalendar() {
  const initialData = Route.useLoaderData();
  const router = useRouter();
  const todayIso = useMemo(() => toIsoDate(new Date()), []);
  const initialPeriod = useMemo(() => getInitialPeriodState(todayIso), [todayIso]);
  const [viewMode, setViewMode] = useState<CalendarViewMode>("month");
  const [selectedYear, setSelectedYear] = useState(initialPeriod.selectedYear);
  const [selectedMonth, setSelectedMonth] = useState(initialPeriod.selectedMonth);
  const [anchorDate, setAnchorDate] = useState(initialPeriod.anchorDate);
  const [calendarData, setCalendarData] = useState(initialData);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [selectedCell, setSelectedCell] = useState<CalendarCell | null>(null);
  const [cellForm, setCellForm] = useState<CellFormState>(() => emptyCellForm());
  const [cellEditorOpen, setCellEditorOpen] = useState(false);
  const [cellSaving, setCellSaving] = useState(false);
  const [bulkEditorOpen, setBulkEditorOpen] = useState(false);
  const [bulkForm, setBulkForm] = useState<BulkFormState>(() =>
    initialBulkForm(initialData.days, initialData.rooms),
  );
  const [bulkSaving, setBulkSaving] = useState(false);
  const [generatingUnitsFor, setGeneratingUnitsFor] = useState<string | null>(null);

  const periodRange = useMemo(
    () => getCalendarRange(viewMode, selectedYear, selectedMonth, anchorDate),
    [anchorDate, selectedMonth, selectedYear, viewMode],
  );

  useEffect(() => {
    let cancelled = false;
    setCalendarLoading(true);

    loadAdminCalendarData(periodRange)
      .then((next) => {
        if (cancelled) return;
        setCalendarData(next);
        setBulkForm((current) => syncBulkFormWithData(current, next));
      })
      .finally(() => {
        if (!cancelled) setCalendarLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [periodRange]);

  const selectedRoom = useMemo(
    () => calendarData.rooms.find((room) => room.id === selectedCell?.roomTypeId) ?? null,
    [calendarData.rooms, selectedCell],
  );

  const monthSections = useMemo(() => groupDaysByMonth(calendarData.days), [calendarData.days]);

  const refetchCalendar = async () => {
    const next = await loadAdminCalendarData(periodRange);
    setCalendarData(next);
    setBulkForm((current) => syncBulkFormWithData(current, next));

    if (selectedCell) {
      const refreshedCell = findCell(next.rooms, selectedCell.roomTypeId, selectedCell.date);
      if (refreshedCell) setSelectedCell(refreshedCell);
    }

    if (import.meta.env.DEV) {
      console.info("[AdminCalendar] refetched calendar data count", {
        rooms: next.rooms.length,
        rates: next.rateCount,
        cells: next.rooms.reduce((count, room) => count + room.cells.length, 0),
      });
    }

    await router.invalidate();
  };

  const openCellEditor = (cell: CalendarCell) => {
    if (import.meta.env.DEV) {
      console.info("[AdminCalendar] clicked room type id", cell.roomTypeId);
      console.info("[AdminCalendar] clicked date", cell.date);
      console.info(
        "[AdminCalendar] current rate data",
        cell.rateData ?? {
          price: cell.price,
          status: cell.status,
          min_nights: cell.minNights,
          note: cell.note,
          inventory_mode: cell.inventoryMode,
          units_available_override: cell.unitsAvailableOverride,
          selected_unit_ids: cell.selectedUnitIds,
        },
      );
    }

    setSelectedCell(cell);
    setCellForm(formFromCell(cell));
    setCellEditorOpen(true);
  };

  const saveCell = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedCell) return;

    const validation = validateRateForm(cellForm, selectedCell.totalUnits);
    if (validation) {
      toast.error(validation);
      return;
    }

    setCellSaving(true);
    const payload = buildCellPayload(cellForm, selectedCell);

    if (import.meta.env.DEV) {
      console.info("[AdminCalendar] save payload", payload);
    }

    try {
      const supabase = await requireAdminSupabase();
      const result = await supabase.from("room_rate_calendar").upsert(payload, {
        onConflict: "room_type_id,date",
      });

      if (import.meta.env.DEV) {
        console.info("[AdminCalendar] Supabase result/error", result);
      }

      if (result.error) throw result.error;

      toast.success("Disponibilité enregistrée.");
      await refetchCalendar();
      setCellEditorOpen(false);
    } catch (error) {
      console.error("[AdminCalendar] Supabase result/error", error);
      toast.error(getSupabaseErrorMessage(error));
    } finally {
      setCellSaving(false);
    }
  };

  const openBulkEditor = () => {
    setBulkForm((current) => ({
      ...syncBulkFormWithData(current, calendarData),
      roomTypeIds:
        current.roomTypeIds.length > 0
          ? current.roomTypeIds
          : calendarData.rooms.map((room) => room.id),
      startDate: current.startDate || periodRange.startDate,
      endDate: current.endDate || periodRange.endDate,
      price:
        current.price ||
        String(
          calendarData.rooms.find((room) => current.roomTypeIds.includes(room.id))?.pricePerNight ??
            "",
        ),
    }));
    setBulkEditorOpen(true);
  };

  const toggleBulkRoom = (roomTypeId: string) => {
    setBulkForm((current) => ({
      ...current,
      roomTypeIds: current.roomTypeIds.includes(roomTypeId)
        ? current.roomTypeIds.filter((id) => id !== roomTypeId)
        : [...current.roomTypeIds, roomTypeId],
    }));
  };

  const saveBulk = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateBulkForm(bulkForm);
    if (validation) {
      toast.error(validation);
      return;
    }

    const dates = getDatesBetween(bulkForm.startDate, bulkForm.endDate, true);
    const updatedAt = new Date().toISOString();
    const roomById = new Map(calendarData.rooms.map((room) => [room.id, room]));
    const payload = bulkForm.roomTypeIds.flatMap((roomTypeId) => {
      const room = roomById.get(roomTypeId);
      return dates.map((date) => ({
        room_type_id: roomTypeId,
        date,
        price: Number(bulkForm.price),
        status: bulkForm.inventoryMode === "closed" ? "closed" : bulkForm.status,
        min_nights: Number(bulkForm.minNights),
        note: normalizeNote(bulkForm.note),
        updated_at: updatedAt,
        ...buildBulkInventoryPayload(bulkForm, room?.totalUnits ?? 0),
      }));
    });

    if (import.meta.env.DEV) {
      console.info("[AdminCalendar] save payload", {
        bulk: true,
        roomTypeIds: bulkForm.roomTypeIds,
        dates,
        rows: payload.length,
        inventory_mode: bulkForm.inventoryMode,
        units_available_override: bulkForm.unitsAvailableOverride,
      });
    }

    setBulkSaving(true);
    try {
      const supabase = await requireAdminSupabase();
      const result = await supabase.from("room_rate_calendar").upsert(payload, {
        onConflict: "room_type_id,date",
      });

      if (import.meta.env.DEV) {
        console.info("[AdminCalendar] Supabase result/error", result);
      }

      if (result.error) throw result.error;

      toast.success("Période enregistrée.");
      await refetchCalendar();
      setBulkEditorOpen(false);
    } catch (error) {
      console.error("[AdminCalendar] Supabase result/error", error);
      toast.error(getSupabaseErrorMessage(error));
    } finally {
      setBulkSaving(false);
    }
  };

  const generateMissingUnits = async (room: AdminCalendarRoom) => {
    const rows = buildMissingUnitRows(room);
    if (rows.length === 0) {
      toast.info("Toutes les unités existent déjà pour ce type de chambre.");
      return;
    }

    setGeneratingUnitsFor(room.id);
    try {
      const supabase = await requireAdminSupabase();
      const result = await supabase.from("room_units").insert(rows);

      if (result.error) throw result.error;

      toast.success(`${rows.length} unité(s) créée(s).`);
      await refetchCalendar();
    } catch (error) {
      console.error("[AdminCalendar] room_units insert error", error);
      toast.error(getErrorDetail(error) ?? "Impossible de générer les unités.");
    } finally {
      setGeneratingUnitsFor(null);
    }
  };

  const goToPreviousPeriod = () => {
    const next = shiftPeriod(viewMode, selectedYear, selectedMonth, anchorDate, -1);
    setSelectedYear(next.selectedYear);
    setSelectedMonth(next.selectedMonth);
    setAnchorDate(next.anchorDate);
  };

  const goToNextPeriod = () => {
    const next = shiftPeriod(viewMode, selectedYear, selectedMonth, anchorDate, 1);
    setSelectedYear(next.selectedYear);
    setSelectedMonth(next.selectedMonth);
    setAnchorDate(next.anchorDate);
  };

  const goToToday = () => {
    const next = getInitialPeriodState(todayIso);
    setSelectedYear(next.selectedYear);
    setSelectedMonth(next.selectedMonth);
    setAnchorDate(next.anchorDate);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    setAnchorDate(firstOfMonth(selectedYear, month));
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setAnchorDate(firstOfMonth(year, selectedMonth));
  };

  const handleCellInventoryModeChange = (mode: InventoryMode) => {
    setCellForm((form) => ({
      ...form,
      inventoryMode: mode,
      status: mode === "closed" ? "closed" : form.status === "closed" ? "available" : form.status,
      unitsAvailableOverride:
        mode === "quantity"
          ? form.unitsAvailableOverride || String(selectedCell?.availableUnits ?? 0)
          : mode === "all"
            ? String(selectedCell?.totalUnits ?? 0)
            : mode === "closed"
              ? "0"
              : form.unitsAvailableOverride,
      selectedUnitIds:
        mode === "specific_units"
          ? form.selectedUnitIds
          : mode === "auto"
            ? []
            : form.selectedUnitIds,
    }));
  };

  const periodLabel = getPeriodLabel(viewMode, periodRange);

  return (
    <AdminLayout
      title="Calendrier de disponibilité"
      description="Vue grille par type de chambre et par date, avec édition directe des tarifs, statuts, inventaire et règles de séjour."
      onReservationCreated={refetchCalendar}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <AdminNewReservationButton variant="primary" onCreated={refetchCalendar} />
          <AdminButton
            variant="secondary"
            onClick={openBulkEditor}
            icon={<CalendarRange className="size-4" />}
            disabled={!calendarData.supabaseConfigured || Boolean(calendarData.loadError)}
          >
            Modifier une période
          </AdminButton>
        </div>
      }
    >
      {calendarData.loadError && (
        <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
            <div>
              <div className="font-bold">Impossible de charger le calendrier depuis Supabase.</div>
              <p className="mt-1 leading-6">{calendarData.loadError}</p>
              {calendarData.loadErrorDetail && (
                <p className="mt-2 rounded-md bg-background/70 p-2 font-mono text-xs text-foreground">
                  {calendarData.loadErrorDetail}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {(calendarData.blockLoadError || calendarData.unitLoadError) && (
        <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <div className="font-bold">Calendrier chargé partiellement.</div>
          {calendarData.blockLoadError && <p className="mt-1">{calendarData.blockLoadError}</p>}
          {calendarData.unitLoadError && <p className="mt-1">{calendarData.unitLoadError}</p>}
        </div>
      )}

      <div className="mb-5 rounded-lg border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            {VIEW_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setViewMode(option.value)}
                className={`h-9 rounded-md border px-3 text-sm font-semibold transition ${
                  viewMode === option.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-primary hover:bg-secondary"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={goToPreviousPeriod}>
              <ChevronLeft className="size-4" />
              Précédent
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={goToToday}>
              Aujourd'hui
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={goToNextPeriod}>
              Suivant
              <ChevronRight className="size-4" />
            </Button>

            <select
              value={selectedMonth}
              onChange={(event) => handleMonthChange(Number(event.target.value))}
              className="admin-input h-9 min-h-9 w-[150px]"
            >
              {MONTH_NAMES.map((month, index) => (
                <option key={month} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(event) => handleYearChange(Number(event.target.value))}
              className="admin-input h-9 min-h-9 w-[110px]"
            >
              {AVAILABLE_YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{periodLabel}</span>
          <span>{calendarData.days.length} jour(s)</span>
          <span>{calendarData.rooms.length} type(s) de chambre</span>
          {calendarLoading && <span>Chargement...</span>}
        </div>
      </div>

      <div className={viewMode === "year" ? "grid gap-5 xl:grid-cols-2" : "space-y-5"}>
        {monthSections.map((section) => (
          <CalendarMonthSection
            key={section.monthKey}
            days={section.days}
            rooms={calendarData.rooms}
            title={section.title}
            today={todayIso}
            compact={viewMode === "year"}
            onCellClick={openCellEditor}
          />
        ))}
      </div>

      {calendarData.rooms.length === 0 && !calendarData.loadError && (
        <div className="rounded-lg border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
          Aucun type de chambre trouvé dans Supabase.
        </div>
      )}

      <Dialog open={cellEditorOpen} onOpenChange={setCellEditorOpen}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier la disponibilité</DialogTitle>
            <DialogDescription>
              {selectedRoom?.name ?? "Type de chambre"} · {selectedCell?.date ?? "-"}
            </DialogDescription>
          </DialogHeader>

          {selectedCell && (
            <form onSubmit={saveCell} className="space-y-5">
              <div className="grid gap-3 rounded-lg border border-border bg-secondary/35 p-4 text-sm sm:grid-cols-2">
                <InfoLine label="Type de chambre" value={selectedRoom?.name ?? "-"} />
                <InfoLine label="Date sélectionnée" value={selectedCell.date} />
                <InfoLine
                  label="Disponibles / total"
                  value={`${selectedCell.availableUnits}/${selectedCell.totalUnits}`}
                />
                <InfoLine label="Prix actuel" value={`${Math.round(selectedCell.price)} DT`} />
                <InfoLine label="Statut actuel" value={selectedCell.status} />
                <InfoLine label="Minimum de nuits" value={String(selectedCell.minNights)} />
                <InfoLine label="Mode inventaire" value={selectedCell.inventoryMode} />
                <InfoLine label="Note" value={selectedCell.note || "-"} wide />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <AdminField label="Prix">
                  <Input
                    type="number"
                    min={0}
                    value={cellForm.price}
                    onChange={(event) =>
                      setCellForm((form) => ({ ...form, price: event.target.value }))
                    }
                    required
                  />
                </AdminField>
                <AdminField label="Statut">
                  <select
                    value={cellForm.status}
                    onChange={(event) =>
                      setCellForm((form) => ({
                        ...form,
                        status: event.target.value as EditableCalendarStatus,
                      }))
                    }
                    className="admin-input"
                  >
                    {CALENDAR_STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </AdminField>
                <AdminField label="Minimum de nuits">
                  <Input
                    type="number"
                    min={1}
                    value={cellForm.minNights}
                    onChange={(event) =>
                      setCellForm((form) => ({ ...form, minNights: event.target.value }))
                    }
                    required
                  />
                </AdminField>
                <AdminField label="Note">
                  <Textarea
                    value={cellForm.note}
                    onChange={(event) =>
                      setCellForm((form) => ({ ...form, note: event.target.value }))
                    }
                    className="min-h-24"
                  />
                </AdminField>
              </div>

              <div className="rounded-lg border border-border bg-card p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-primary">Nombre de chambres disponibles</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Le mode choisi contrôle le calcul de disponibilité pour cette date.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <AdminField label="Mode">
                    <select
                      value={cellForm.inventoryMode}
                      onChange={(event) =>
                        handleCellInventoryModeChange(event.target.value as InventoryMode)
                      }
                      className="admin-input"
                    >
                      {INVENTORY_MODE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </AdminField>

                  {cellForm.inventoryMode === "quantity" && (
                    <AdminField label="Nombre disponible">
                      <Input
                        type="number"
                        min={0}
                        max={selectedCell.totalUnits}
                        value={cellForm.unitsAvailableOverride}
                        onChange={(event) =>
                          setCellForm((form) => ({
                            ...form,
                            unitsAvailableOverride: event.target.value,
                          }))
                        }
                        required
                      />
                    </AdminField>
                  )}
                </div>

                {cellForm.inventoryMode === "specific_units" && selectedRoom && (
                  <div className="mt-4 space-y-3">
                    {selectedRoom.units.length < selectedRoom.totalUnits && (
                      <div className="flex flex-col gap-3 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between">
                        <span>
                          {selectedRoom.units.length}/{selectedRoom.totalUnits} unités existent pour
                          ce type de chambre.
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          loading={generatingUnitsFor === selectedRoom.id}
                          onClick={() => generateMissingUnits(selectedRoom)}
                        >
                          <Plus className="size-4" />
                          Générer les unités manquantes
                        </Button>
                      </div>
                    )}

                    <div className="grid max-h-56 gap-2 overflow-auto rounded-md border border-border bg-secondary/20 p-3 sm:grid-cols-2">
                      {selectedRoom.units.map((unit) => (
                        <label
                          key={unit.id}
                          className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold text-primary"
                        >
                          <input
                            type="checkbox"
                            checked={cellForm.selectedUnitIds.includes(unit.id)}
                            onChange={() =>
                              setCellForm((form) => ({
                                ...form,
                                selectedUnitIds: toggleId(form.selectedUnitIds, unit.id),
                              }))
                            }
                            className="size-4 accent-primary"
                          />
                          <span>
                            <span className="block">Unité {unit.unit_number}</span>
                            <span className="text-xs font-medium text-muted-foreground">
                              {unit.status}
                            </span>
                          </span>
                        </label>
                      ))}
                      {selectedRoom.units.length === 0 && (
                        <div className="rounded-md border border-dashed border-border bg-background p-4 text-sm text-muted-foreground">
                          Aucune unité n'existe encore pour ce type de chambre.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setCellEditorOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" loading={cellSaving}>
                  <Save className="size-4" />
                  Enregistrer
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={bulkEditorOpen} onOpenChange={setBulkEditorOpen}>
        <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier une période</DialogTitle>
            <DialogDescription>
              Appliquez les mêmes règles à plusieurs types de chambre et dates.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={saveBulk} className="space-y-5">
            <AdminField label="Types de chambre sélectionnés">
              <div className="grid max-h-48 gap-2 overflow-auto rounded-lg border border-border bg-secondary/20 p-3 sm:grid-cols-2">
                {calendarData.rooms.map((room) => (
                  <label
                    key={room.id}
                    className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-card p-3 text-sm font-semibold text-primary"
                  >
                    <input
                      type="checkbox"
                      checked={bulkForm.roomTypeIds.includes(room.id)}
                      onChange={() => toggleBulkRoom(room.id)}
                      className="mt-1 size-4 accent-primary"
                    />
                    <span>
                      <span className="block">{room.name}</span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {room.totalUnits} unités · {Math.round(room.pricePerNight)} DT par défaut
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </AdminField>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <AdminField label="Date de début">
                <Input
                  type="date"
                  value={bulkForm.startDate}
                  onChange={(event) =>
                    setBulkForm((form) => ({ ...form, startDate: event.target.value }))
                  }
                  required
                />
              </AdminField>
              <AdminField label="Date de fin">
                <Input
                  type="date"
                  value={bulkForm.endDate}
                  onChange={(event) =>
                    setBulkForm((form) => ({ ...form, endDate: event.target.value }))
                  }
                  required
                />
              </AdminField>
              <AdminField label="Prix">
                <Input
                  type="number"
                  min={0}
                  value={bulkForm.price}
                  onChange={(event) =>
                    setBulkForm((form) => ({ ...form, price: event.target.value }))
                  }
                  required
                />
              </AdminField>
              <AdminField label="Statut">
                <select
                  value={bulkForm.status}
                  onChange={(event) =>
                    setBulkForm((form) => ({
                      ...form,
                      status: event.target.value as EditableCalendarStatus,
                    }))
                  }
                  className="admin-input"
                >
                  {CALENDAR_STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </AdminField>
              <AdminField label="Minimum de nuits">
                <Input
                  type="number"
                  min={1}
                  value={bulkForm.minNights}
                  onChange={(event) =>
                    setBulkForm((form) => ({ ...form, minNights: event.target.value }))
                  }
                  required
                />
              </AdminField>
              <AdminField label="Note">
                <Input
                  value={bulkForm.note}
                  onChange={(event) =>
                    setBulkForm((form) => ({ ...form, note: event.target.value }))
                  }
                />
              </AdminField>
              <AdminField label="Mode inventaire">
                <select
                  value={bulkForm.inventoryMode}
                  onChange={(event) =>
                    setBulkForm((form) => ({
                      ...form,
                      inventoryMode: event.target.value as BulkInventoryMode,
                      status:
                        event.target.value === "closed"
                          ? "closed"
                          : form.status === "closed"
                            ? "available"
                            : form.status,
                      unitsAvailableOverride:
                        event.target.value === "closed" ? "0" : form.unitsAvailableOverride,
                    }))
                  }
                  className="admin-input"
                >
                  {BULK_INVENTORY_MODE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </AdminField>
              {bulkForm.inventoryMode === "quantity" && (
                <AdminField label="Nombre disponible">
                  <Input
                    type="number"
                    min={0}
                    value={bulkForm.unitsAvailableOverride}
                    onChange={(event) =>
                      setBulkForm((form) => ({
                        ...form,
                        unitsAvailableOverride: event.target.value,
                      }))
                    }
                    required
                  />
                </AdminField>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setBulkEditorOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" loading={bulkSaving}>
                Appliquer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

function CalendarMonthSection({
  days,
  rooms,
  title,
  today,
  compact,
  onCellClick,
}: {
  days: string[];
  rooms: AdminCalendarRoom[];
  title: string;
  today: string;
  compact: boolean;
  onCellClick: (cell: CalendarCell) => void;
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-secondary/55 px-4 py-3">
        <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-primary">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className={`w-full text-sm ${compact ? "min-w-[1060px]" : "min-w-[1180px]"}`}>
          <thead className="bg-secondary text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <tr>
              <th className="sticky left-0 z-10 bg-secondary px-4 py-3 text-left">Chambre</th>
              {days.map((day) => (
                <th
                  key={day}
                  className={`px-2 py-3 text-center ${day === today ? "bg-accent/20 text-primary" : ""}`}
                >
                  <span className="block font-mono">
                    {compact ? day.slice(8, 10) : formatDayHeader(day)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => {
              const cellsByDate = new Map(room.cells.map((cell) => [cell.date, cell]));
              return (
                <tr key={`${room.id}-${title}`} className="border-t border-border">
                  <td className="sticky left-0 z-10 bg-card px-4 py-3">
                    <div className="font-semibold text-primary">{room.name}</div>
                    <div className="text-xs text-muted-foreground">{room.totalUnits} unités</div>
                  </td>
                  {days.map((day) => {
                    const cell = cellsByDate.get(day);
                    if (!cell) return <td key={`${room.id}-${day}`} className="px-2 py-3" />;
                    return (
                      <td key={`${room.id}-${day}`} className="px-1.5 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => onCellClick(cell)}
                          className={`min-h-[82px] w-full rounded-md border px-2 py-2 text-xs font-semibold transition hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${cellClass(cell.effectiveStatus)}`}
                          title={`${room.name} - ${cell.date} - ${cell.availableUnits}/${cell.totalUnits}`}
                        >
                          <span className="block text-sm font-black">
                            {cell.availableUnits}/{cell.totalUnits}
                          </span>
                          {cell.hasCustomRate && (
                            <span className="mt-1 block text-[11px] font-bold">
                              {Math.round(cell.price)} DT
                            </span>
                          )}
                          <span className="mt-1 block truncate rounded px-1.5 py-0.5 text-[10px] font-bold">
                            {cell.effectiveStatus}
                          </span>
                          {cell.hasCustomRate && cell.minNights > 1 && (
                            <span className="mt-1 block text-[10px] font-semibold">
                              min {cell.minNights} nuits
                            </span>
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

async function loadAdminCalendarData(range = getDefaultCalendarRange()): Promise<LoaderData> {
  const days = getDatesBetween(range.startDate, range.endDate, true);
  const supabaseConfigured = isSupabaseConfigured();

  if (import.meta.env.DEV) {
    console.info("[AdminCalendar] Supabase configured", supabaseConfigured);
  }

  if (!supabaseConfigured) {
    return {
      days,
      rooms: [],
      loadError:
        "Supabase n'est pas configuré. Configurez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.",
      loadErrorDetail: null,
      blockLoadError: null,
      unitLoadError: null,
      rateCount: 0,
      supabaseConfigured,
    };
  }

  try {
    const supabase = await requireAdminSupabase();
    const startDate = range.startDate;
    const endDate = range.endDate;
    const endExclusive = addDays(endDate, 1);

    const roomResult = await supabase
      .from("room_types")
      .select("id, name, price_per_night, total_units, status")
      .order("name");

    if (roomResult.error) throw roomResult.error;

    const roomRows = (roomResult.data ?? []) as AdminRoomRow[];
    const roomIds = roomRows.map((room) => room.id);

    const [ratesResult, reservationsResult, blocksResult, unitsResult] =
      roomIds.length > 0
        ? await Promise.all([
            supabase
              .from("room_rate_calendar")
              .select("*")
              .in("room_type_id", roomIds)
              .gte("date", startDate)
              .lte("date", endDate)
              .order("date"),
            fetchCalendarReservations(supabase, roomIds, startDate, endExclusive),
            supabase
              .from("room_availability_blocks")
              .select("id, room_type_id, start_date, end_date, status, reason, created_at")
              .in("room_type_id", roomIds)
              .lt("start_date", endExclusive)
              .gte("end_date", startDate),
            supabase
              .from("room_units")
              .select("id, room_type_id, unit_number, status")
              .in("room_type_id", roomIds)
              .order("unit_number"),
          ])
        : [
            { data: [], error: null },
            { data: [], error: null, roomUnitIdAvailable: false, fallbackUsed: false },
            { data: [], error: null },
            { data: [], error: null },
          ];

    if (ratesResult.error) throw ratesResult.error;
    if (reservationsResult.error) throw reservationsResult.error;

    const blockLoadError = blocksResult.error
      ? `Les blocs de disponibilité n'ont pas pu être chargés: ${getErrorDetail(blocksResult.error)}`
      : null;
    const unitLoadError = unitsResult.error
      ? `Les unités de chambre n'ont pas pu être chargées: ${getErrorDetail(unitsResult.error)}`
      : null;

    if (blocksResult.error) {
      console.error("[AdminCalendar] availability blocks query failed", blocksResult.error);
    }
    if (unitsResult.error) {
      console.error("[AdminCalendar] room_units query failed", unitsResult.error);
    }

    const rates = (ratesResult.data ?? []) as CalendarRateRow[];
    const blocks = (blocksResult.error ? [] : (blocksResult.data ?? [])) as AvailabilityBlockRow[];
    const units = (unitsResult.error ? [] : (unitsResult.data ?? [])) as RoomUnitOption[];
    const reservationRows = (reservationsResult.data ?? []) as ReservationSlice[];

    if (import.meta.env.DEV) {
      console.info(
        "[AdminCalendar] room_unit_id column available",
        reservationsResult.roomUnitIdAvailable,
      );
      console.info("[AdminCalendar] reservations count", reservationRows.length);
      if (reservationsResult.fallbackUsed) {
        console.info(
          "[AdminCalendar] fallback mode: reservations.room_unit_id missing, using room_type_id availability",
        );
      }
    }

    const rateByRoomDate = new Map(
      rates.map((rate) => [makeRoomDateKey(rate.room_type_id, rate.date), rate]),
    );
    const blockByRoomDate = buildBlockByRoomDate(blocks, startDate, endDate);
    const reservationsByRoomDate = buildReservationCountByRoomDate(
      reservationRows,
      startDate,
      endExclusive,
    );
    const occupiedUnitsByRoomDate = buildOccupiedUnitIdsByRoomDate(
      reservationRows,
      startDate,
      endExclusive,
    );
    const unitsByRoom = groupUnitsByRoom(units);

    const rooms = roomRows.map((room) => {
      const totalUnits = Math.max(0, Number(room.total_units ?? 0));
      return {
        id: room.id,
        name: room.name,
        pricePerNight: Number(room.price_per_night ?? 0),
        totalUnits,
        status: room.status,
        units: unitsByRoom.get(room.id) ?? [],
        cells: days.map((date) => {
          const key = makeRoomDateKey(room.id, date);
          const rate = rateByRoomDate.get(key) ?? null;
          const block = blockByRoomDate.get(key) ?? null;
          const reservedUnits = reservationsByRoomDate.get(key) ?? 0;
          const occupiedUnitIds = occupiedUnitsByRoomDate.get(key) ?? new Set<string>();
          const rateStatus = normalizeCalendarStatus(rate?.status);
          const blockStatus = normalizeBlockStatus(block?.status);
          const inventoryMode = normalizeInventoryMode(rate?.inventory_mode);
          const unitsAvailableOverride = normalizeUnitsAvailableOverride(
            rate?.units_available_override,
          );
          const selectedUnitIds = normalizeSelectedUnitIds(rate?.selected_unit_ids);
          const status = inventoryMode === "closed" ? "closed" : (blockStatus ?? rateStatus);
          const price = Number(rate?.price ?? room.price_per_night ?? 0);
          const minNights = Math.max(1, Number(rate?.min_nights ?? 1));
          const note = rate?.note ?? rate?.notes ?? null;
          const availableUnits = calculateAvailableUnits({
            totalUnits,
            reservedUnits,
            status,
            block,
            inventoryMode,
            unitsAvailableOverride,
            selectedUnitIds,
            occupiedUnitIds,
            roomUnitIdAvailable: reservationsResult.roomUnitIdAvailable,
          });

          return {
            roomTypeId: room.id,
            date,
            availableUnits,
            reservedUnits,
            totalUnits,
            price,
            status,
            effectiveStatus: getEffectiveStatus(status, availableUnits, totalUnits),
            minNights,
            note,
            inventoryMode,
            unitsAvailableOverride,
            selectedUnitIds,
            hasCustomRate: Boolean(rate),
            rateData: rate,
          };
        }),
      };
    });

    if (import.meta.env.DEV) {
      console.info("[AdminCalendar] loaded calendar", {
        rooms: rooms.length,
        rates: rates.length,
        reservations: reservationRows.length,
        units: units.length,
      });
    }

    return {
      days,
      rooms,
      loadError: null,
      loadErrorDetail: null,
      blockLoadError,
      unitLoadError,
      rateCount: rates.length,
      supabaseConfigured,
    };
  } catch (error) {
    console.error("[AdminCalendar] calendar load failed", error);
    return {
      days,
      rooms: [],
      loadError: getSupabaseErrorMessage(error),
      loadErrorDetail: getErrorDetail(error),
      blockLoadError: null,
      unitLoadError: null,
      rateCount: 0,
      supabaseConfigured,
    };
  }
}

async function fetchCalendarReservations(
  supabase: Awaited<ReturnType<typeof requireAdminSupabase>>,
  roomIds: string[],
  startDate: string,
  endExclusive: string,
): Promise<CalendarReservationQueryResult> {
  const withRoomUnitId = await supabase
    .from("reservations")
    .select("id, room_type_id, room_unit_id, check_in, check_out, status")
    .in("room_type_id", roomIds)
    .neq("status", "cancelled")
    .lt("check_in", endExclusive)
    .gt("check_out", startDate);

  if (!withRoomUnitId.error) {
    return {
      data: ((withRoomUnitId.data ?? []) as ReservationSlice[]).map((reservation) => ({
        ...reservation,
        room_unit_id: reservation.room_unit_id ?? null,
      })),
      error: null,
      roomUnitIdAvailable: true,
      fallbackUsed: false,
    };
  }

  if (!isMissingRoomUnitIdColumnError(withRoomUnitId.error)) {
    return {
      data: [],
      error: withRoomUnitId.error,
      roomUnitIdAvailable: false,
      fallbackUsed: false,
    };
  }

  if (import.meta.env.DEV) {
    console.info(
      "[AdminCalendar] fallback mode: retrying reservations query without room_unit_id",
      {
        error: withRoomUnitId.error,
      },
    );
  }

  const withoutRoomUnitId = await supabase
    .from("reservations")
    .select("id, room_type_id, check_in, check_out, status")
    .in("room_type_id", roomIds)
    .neq("status", "cancelled")
    .lt("check_in", endExclusive)
    .gt("check_out", startDate);

  if (withoutRoomUnitId.error) {
    return {
      data: [],
      error: withoutRoomUnitId.error,
      roomUnitIdAvailable: false,
      fallbackUsed: true,
    };
  }

  return {
    data: ((withoutRoomUnitId.data ?? []) as Array<Omit<ReservationSlice, "room_unit_id">>).map(
      (reservation) => ({
        ...reservation,
        room_unit_id: null,
      }),
    ),
    error: null,
    roomUnitIdAvailable: false,
    fallbackUsed: true,
  };
}

async function requireAdminSupabase() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase n'est pas configuré. Configurez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.",
    );
  }

  const { supabase } = await import("@/lib/supabase/client");
  return supabase;
}

function getDefaultCalendarRange() {
  const today = toIsoDate(new Date());
  const { selectedYear, selectedMonth } = getInitialPeriodState(today);
  return getCalendarRange("month", selectedYear, selectedMonth, today);
}

function getInitialPeriodState(today: string) {
  const todayDate = new Date(`${today}T12:00:00`);
  const currentYear = todayDate.getFullYear();
  const selectedYear = AVAILABLE_YEARS.includes(currentYear) ? currentYear : AVAILABLE_YEARS[0];
  return {
    selectedYear,
    selectedMonth: todayDate.getMonth() + 1,
    anchorDate:
      selectedYear === currentYear ? today : firstOfMonth(selectedYear, todayDate.getMonth() + 1),
  };
}

function getCalendarRange(
  viewMode: CalendarViewMode,
  selectedYear: number,
  selectedMonth: number,
  anchorDate: string,
): CalendarRangeValue {
  if (viewMode === "14_days") {
    return { startDate: anchorDate, endDate: addDays(anchorDate, 13) };
  }

  if (viewMode === "year") {
    return { startDate: `${selectedYear}-01-01`, endDate: `${selectedYear}-12-31` };
  }

  const startDate = firstOfMonth(selectedYear, selectedMonth);
  const endMonthDate = addMonths(startDate, viewMode === "3_months" ? 2 : 0);
  return { startDate, endDate: lastOfMonth(endMonthDate) };
}

function shiftPeriod(
  viewMode: CalendarViewMode,
  selectedYear: number,
  selectedMonth: number,
  anchorDate: string,
  direction: -1 | 1,
) {
  const base =
    viewMode === "14_days"
      ? new Date(`${anchorDate}T12:00:00`)
      : new Date(`${firstOfMonth(selectedYear, selectedMonth)}T12:00:00`);
  const next = new Date(base);

  if (viewMode === "14_days") next.setDate(next.getDate() + direction * 14);
  if (viewMode === "month") next.setMonth(next.getMonth() + direction);
  if (viewMode === "3_months") next.setMonth(next.getMonth() + direction * 3);
  if (viewMode === "year") next.setFullYear(next.getFullYear() + direction);

  const boundedYear = clampYear(next.getFullYear());
  if (boundedYear !== next.getFullYear()) next.setFullYear(boundedYear);

  return {
    selectedYear: boundedYear,
    selectedMonth: next.getMonth() + 1,
    anchorDate: toIsoDate(next),
  };
}

function clampYear(year: number) {
  return Math.max(AVAILABLE_YEARS[0], Math.min(AVAILABLE_YEARS[AVAILABLE_YEARS.length - 1], year));
}

function initialBulkForm(days: string[], rooms: AdminCalendarRoom[]): BulkFormState {
  return {
    roomTypeIds: rooms.map((room) => room.id),
    startDate: days[0] ?? "",
    endDate: days.at(-1) ?? "",
    price: rooms[0] ? String(rooms[0].pricePerNight) : "",
    status: "available",
    minNights: "1",
    note: "",
    inventoryMode: "auto",
    unitsAvailableOverride: "",
  };
}

function syncBulkFormWithData(form: BulkFormState, data: LoaderData): BulkFormState {
  const validIds = new Set(data.rooms.map((room) => room.id));
  const selectedIds = form.roomTypeIds.filter((id) => validIds.has(id));

  return {
    ...form,
    roomTypeIds: selectedIds.length > 0 ? selectedIds : data.rooms.map((room) => room.id),
    startDate: form.startDate || data.days[0] || "",
    endDate: form.endDate || data.days.at(-1) || "",
    price: form.price || (data.rooms[0] ? String(data.rooms[0].pricePerNight) : ""),
  };
}

function emptyCellForm(): CellFormState {
  return {
    price: "",
    status: "available",
    minNights: "1",
    note: "",
    inventoryMode: "auto",
    unitsAvailableOverride: "",
    selectedUnitIds: [],
  };
}

function formFromCell(cell: CalendarCell): CellFormState {
  return {
    price: String(cell.price),
    status: toEditableStatus(cell.status),
    minNights: String(cell.minNights),
    note: cell.note ?? "",
    inventoryMode: cell.inventoryMode,
    unitsAvailableOverride:
      cell.unitsAvailableOverride === null ? "" : String(cell.unitsAvailableOverride),
    selectedUnitIds: cell.selectedUnitIds,
  };
}

function buildCellPayload(
  form: CellFormState,
  cell: CalendarCell,
): TablesInsert<"room_rate_calendar"> {
  return {
    room_type_id: cell.roomTypeId,
    date: cell.date,
    price: Number(form.price),
    status: form.inventoryMode === "closed" ? "closed" : form.status,
    min_nights: Number(form.minNights),
    note: normalizeNote(form.note),
    updated_at: new Date().toISOString(),
    ...buildInventoryPayload(
      form.inventoryMode,
      form.unitsAvailableOverride,
      form.selectedUnitIds,
      cell.totalUnits,
    ),
  };
}

function buildBulkInventoryPayload(form: BulkFormState, totalUnits: number) {
  return buildInventoryPayload(form.inventoryMode, form.unitsAvailableOverride, [], totalUnits);
}

function buildInventoryPayload(
  inventoryMode: InventoryMode,
  unitsAvailableOverride: string,
  selectedUnitIds: string[],
  totalUnits: number,
) {
  if (inventoryMode === "auto") {
    return {
      inventory_mode: "auto" as const,
      units_available_override: null,
      selected_unit_ids: null,
    };
  }

  if (inventoryMode === "all") {
    return {
      inventory_mode: "all" as const,
      units_available_override: totalUnits,
      selected_unit_ids: null,
    };
  }

  if (inventoryMode === "quantity") {
    return {
      inventory_mode: "quantity" as const,
      units_available_override: Number(unitsAvailableOverride),
      selected_unit_ids: null,
    };
  }

  if (inventoryMode === "specific_units") {
    return {
      inventory_mode: "specific_units" as const,
      units_available_override: selectedUnitIds.length,
      selected_unit_ids: selectedUnitIds,
    };
  }

  return {
    inventory_mode: "closed" as const,
    units_available_override: 0,
    selected_unit_ids: null,
  };
}

function toEditableStatus(status: DayAvailability): EditableCalendarStatus {
  if (status === "reserved") return "not_available";
  if (CALENDAR_STATUS_OPTIONS.includes(status as EditableCalendarStatus)) {
    return status as EditableCalendarStatus;
  }
  return "available";
}

function validateRateForm(form: CellFormState, totalUnits?: number) {
  const price = Number(form.price);
  const minNights = Number(form.minNights);
  if (!Number.isFinite(price) || price < 0) return "Le prix doit être positif.";
  if (!Number.isInteger(minNights) || minNights < 1) {
    return "Le minimum de nuits doit être supérieur ou égal à 1.";
  }

  return validateInventoryForm(
    form.inventoryMode,
    form.unitsAvailableOverride,
    form.selectedUnitIds,
    totalUnits,
  );
}

function validateInventoryForm(
  inventoryMode: InventoryMode,
  unitsAvailableOverride: string,
  selectedUnitIds: string[],
  totalUnits?: number,
) {
  if (inventoryMode === "quantity") {
    const quantity = Number(unitsAvailableOverride);
    if (!Number.isInteger(quantity) || quantity < 0) {
      return "Le nombre disponible doit être un entier positif.";
    }
    if (typeof totalUnits === "number" && quantity > totalUnits) {
      return "Le nombre disponible ne peut pas dépasser le total d'unités.";
    }
  }

  if (inventoryMode === "specific_units" && selectedUnitIds.length === 0) {
    return "Sélectionnez au moins une unité.";
  }

  return null;
}

function validateBulkForm(form: BulkFormState) {
  const rateError = validateRateForm({ ...form, selectedUnitIds: [] }, undefined);
  if (rateError) return rateError;
  if (form.roomTypeIds.length === 0) return "Sélectionnez au moins un type de chambre.";
  if (!form.startDate || !form.endDate) return "Sélectionnez une période.";
  if (form.startDate > form.endDate) return "La date de fin doit être après la date de début.";
  return null;
}

function buildReservationCountByRoomDate(
  reservations: ReservationSlice[],
  startDate: string,
  endExclusive: string,
) {
  const counts = new Map<string, number>();

  for (const reservation of reservations) {
    if (!isActiveReservationStatus(reservation.status)) continue;

    const current = new Date(`${maxDate(reservation.check_in, startDate)}T12:00:00`);
    const end = new Date(`${minDate(reservation.check_out, endExclusive)}T12:00:00`);

    while (current < end) {
      const date = toIsoDate(current);
      const key = makeRoomDateKey(reservation.room_type_id, date);
      counts.set(key, (counts.get(key) ?? 0) + 1);
      current.setDate(current.getDate() + 1);
    }
  }

  return counts;
}

function buildOccupiedUnitIdsByRoomDate(
  reservations: ReservationSlice[],
  startDate: string,
  endExclusive: string,
) {
  const occupied = new Map<string, Set<string>>();

  for (const reservation of reservations) {
    if (!isActiveReservationStatus(reservation.status) || !reservation.room_unit_id) continue;

    const current = new Date(`${maxDate(reservation.check_in, startDate)}T12:00:00`);
    const end = new Date(`${minDate(reservation.check_out, endExclusive)}T12:00:00`);

    while (current < end) {
      const date = toIsoDate(current);
      const key = makeRoomDateKey(reservation.room_type_id, date);
      const unitIds = occupied.get(key) ?? new Set<string>();
      unitIds.add(reservation.room_unit_id);
      occupied.set(key, unitIds);
      current.setDate(current.getDate() + 1);
    }
  }

  return occupied;
}

function buildBlockByRoomDate(blocks: AvailabilityBlockRow[], startDate: string, endDate: string) {
  const blockByDate = new Map<string, AvailabilityBlockRow>();

  for (const block of blocks) {
    const current = new Date(`${maxDate(block.start_date, startDate)}T12:00:00`);
    const end = new Date(`${minDate(block.end_date, endDate)}T12:00:00`);

    while (current <= end) {
      const date = toIsoDate(current);
      blockByDate.set(makeRoomDateKey(block.room_type_id, date), block);
      current.setDate(current.getDate() + 1);
    }
  }

  return blockByDate;
}

function calculateAvailableUnits({
  totalUnits,
  reservedUnits,
  status,
  block,
  inventoryMode,
  unitsAvailableOverride,
  selectedUnitIds,
  occupiedUnitIds,
  roomUnitIdAvailable,
}: {
  totalUnits: number;
  reservedUnits: number;
  status: DayAvailability;
  block: AvailabilityBlockRow | null;
  inventoryMode: InventoryMode;
  unitsAvailableOverride: number | null;
  selectedUnitIds: string[];
  occupiedUnitIds: Set<string>;
  roomUnitIdAvailable: boolean;
}) {
  let availableUnits = calculateInventoryAvailability({
    totalUnits,
    reservedUnits,
    inventoryMode,
    unitsAvailableOverride,
    selectedUnitIds,
    occupiedUnitIds,
    roomUnitIdAvailable,
  });

  if (block?.status === "closed" || block?.status === "not_available") {
    availableUnits = 0;
  }

  if (isBlockingStatus(status)) availableUnits = 0;
  return Math.min(totalUnits, Math.max(0, availableUnits));
}

function calculateInventoryAvailability({
  totalUnits,
  reservedUnits,
  inventoryMode,
  unitsAvailableOverride,
  selectedUnitIds,
  occupiedUnitIds,
  roomUnitIdAvailable,
}: {
  totalUnits: number;
  reservedUnits: number;
  inventoryMode: InventoryMode;
  unitsAvailableOverride: number | null;
  selectedUnitIds: string[];
  occupiedUnitIds: Set<string>;
  roomUnitIdAvailable: boolean;
}) {
  if (inventoryMode === "closed") return 0;
  if (inventoryMode === "all") return totalUnits;
  if (inventoryMode === "quantity") return clampCount(unitsAvailableOverride ?? 0, totalUnits);
  if (inventoryMode === "specific_units") {
    const selectedCount = selectedUnitIds.length || unitsAvailableOverride || 0;
    if (!roomUnitIdAvailable || selectedUnitIds.length === 0) {
      return clampCount(selectedCount, totalUnits);
    }

    const occupiedSelectedUnits = selectedUnitIds.filter((unitId) =>
      occupiedUnitIds.has(unitId),
    ).length;
    return clampCount(selectedCount - occupiedSelectedUnits, totalUnits);
  }
  return clampCount(totalUnits - reservedUnits, totalUnits);
}

function getEffectiveStatus(
  status: DayAvailability,
  availableUnits: number,
  totalUnits: number,
): DayAvailability {
  if (isBlockingStatus(status)) return status;
  if (totalUnits > 0 && availableUnits <= 0) return "not_available";
  if (availableUnits > 0 && availableUnits < totalUnits) return "partially_reserved";
  return status;
}

function isBlockingStatus(status: DayAvailability) {
  return (
    status === "not_available" ||
    status === "closed" ||
    status === "maintenance" ||
    status === "reserved"
  );
}

function isActiveReservationStatus(status: string | null | undefined) {
  return status !== "cancelled" && status !== "no_show" && status !== "checked_out";
}

function normalizeCalendarStatus(status?: DayAvailability | string | null): DayAvailability {
  if (
    status === "available" ||
    status === "partially_reserved" ||
    status === "not_available" ||
    status === "closed" ||
    status === "maintenance" ||
    status === "reserved"
  ) {
    return status;
  }
  return "available";
}

function normalizeBlockStatus(
  status?: AvailabilityBlockStatus | string | null,
): DayAvailability | null {
  if (status === "closed" || status === "not_available" || status === "maintenance") {
    return status;
  }
  if (status === "partially_available" || status === "partially_reserved") {
    return "partially_reserved";
  }
  return null;
}

function normalizeInventoryMode(mode?: InventoryMode | string | null): InventoryMode {
  if (
    mode === "auto" ||
    mode === "all" ||
    mode === "quantity" ||
    mode === "specific_units" ||
    mode === "closed"
  ) {
    return mode;
  }
  return "auto";
}

function normalizeUnitsAvailableOverride(value?: number | string | null) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeSelectedUnitIds(value?: string[] | null) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
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

function addDays(date: string, days: number) {
  const next = new Date(`${date}T12:00:00`);
  next.setDate(next.getDate() + days);
  return toIsoDate(next);
}

function addMonths(date: string, months: number) {
  const next = new Date(`${date}T12:00:00`);
  next.setMonth(next.getMonth() + months);
  return toIsoDate(next);
}

function firstOfMonth(year: number, month: number) {
  return `${year}-${String(month).padStart(2, "0")}-01`;
}

function lastOfMonth(date: string) {
  const current = new Date(`${date}T12:00:00`);
  return toIsoDate(new Date(current.getFullYear(), current.getMonth() + 1, 0, 12));
}

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function makeRoomDateKey(roomTypeId: string, date: string) {
  return `${roomTypeId}:${date}`;
}

function maxDate(first: string, second: string) {
  return first > second ? first : second;
}

function minDate(first: string, second: string) {
  return first < second ? first : second;
}

function normalizeNote(note: string) {
  const trimmed = note.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function clampCount(value: number, totalUnits: number) {
  return Math.min(totalUnits, Math.max(0, Math.trunc(value)));
}

function toggleId(ids: string[], id: string) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

function findCell(rooms: AdminCalendarRoom[], roomTypeId: string, date: string) {
  return (
    rooms.find((room) => room.id === roomTypeId)?.cells.find((cell) => cell.date === date) ?? null
  );
}

function groupUnitsByRoom(units: RoomUnitOption[]) {
  const grouped = new Map<string, RoomUnitOption[]>();

  for (const unit of units) {
    const current = grouped.get(unit.room_type_id) ?? [];
    current.push(unit);
    grouped.set(unit.room_type_id, current);
  }

  return grouped;
}

function buildMissingUnitRows(room: AdminCalendarRoom) {
  const missingCount = Math.max(0, room.totalUnits - room.units.length);
  const existingNumbers = new Set(room.units.map((unit) => unit.unit_number.trim()));
  const rows: Array<{ room_type_id: string; unit_number: string; status: UnitStatus }> = [];

  for (
    let index = 1;
    rows.length < missingCount && index <= room.totalUnits + missingCount + 100;
    index++
  ) {
    const unitNumber = String(index).padStart(2, "0");
    if (existingNumbers.has(unitNumber)) continue;
    existingNumbers.add(unitNumber);
    rows.push({
      room_type_id: room.id,
      unit_number: unitNumber,
      status: "available",
    });
  }

  return rows;
}

function groupDaysByMonth(days: string[]) {
  const sections = new Map<string, string[]>();

  for (const day of days) {
    const monthKey = day.slice(0, 7);
    const current = sections.get(monthKey) ?? [];
    current.push(day);
    sections.set(monthKey, current);
  }

  return [...sections.entries()].map(([monthKey, sectionDays]) => {
    const year = Number(monthKey.slice(0, 4));
    const month = Number(monthKey.slice(5, 7));
    return {
      monthKey,
      title: `${MONTH_NAMES[month - 1]} ${year}`,
      days: sectionDays,
    };
  });
}

function formatDayHeader(date: string) {
  const day = new Date(`${date}T12:00:00`);
  return `${String(day.getDate()).padStart(2, "0")}/${String(day.getMonth() + 1).padStart(2, "0")}`;
}

function getPeriodLabel(viewMode: CalendarViewMode, range: CalendarRangeValue) {
  if (viewMode === "year") return range.startDate.slice(0, 4);
  if (range.startDate === range.endDate) return range.startDate;
  return `${range.startDate} au ${range.endDate}`;
}

function cellClass(status: DayAvailability) {
  switch (status) {
    case "available":
      return "border-emerald-200 bg-emerald-50 text-emerald-900";
    case "partially_reserved":
      return "border-amber-200 bg-amber-50 text-amber-900";
    case "not_available":
      return "border-rose-200 bg-rose-50 text-rose-900";
    case "closed":
      return "border-gray-200 bg-gray-100 text-gray-700";
    case "maintenance":
      return "border-sky-200 bg-sky-50 text-sky-900";
    case "reserved":
      return "border-rose-200 bg-rose-50 text-rose-900";
  }
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

function InfoLine({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 break-words font-semibold text-primary">{value}</div>
    </div>
  );
}

function getSupabaseErrorMessage(error: unknown) {
  if (isPermissionError(error)) {
    return "Permission Supabase refusée. Vérifiez les policies room_rate_calendar.";
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

function isMissingRoomUnitIdColumnError(error: unknown) {
  const maybeError = error as { code?: string; message?: string; details?: string; hint?: string };
  const haystack = [maybeError?.message, maybeError?.details, maybeError?.hint]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return maybeError?.code === "42703" && haystack.includes("room_unit_id");
}
