import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a$ as Route, u as useI18n, b0 as toIsoDate, b1 as getInitialPeriodState, b2 as getCalendarRange, b3 as loadAdminCalendarData, _ as AdminLayout, b4 as Button, b5 as AVAILABLE_YEARS, D as Dialog, k as DialogContent, b6 as DialogHeader, m as DialogTitle, b7 as DialogDescription, b8 as Input, b9 as Textarea, ba as DialogFooter, a4 as AdminNewReservationButton, aH as AdminButton, bb as firstOfMonth, bc as requireAdminSupabase, bd as getSupabaseErrorMessage, be as getErrorDetail, bf as getDatesBetween, N as tr } from "./router-CgbkQim6.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { ab as TriangleAlert, D as ChevronLeft, J as ChevronRight, aD as Plus, m as Save, aM as CalendarRange } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./server-4up-b2hM.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
const CALENDAR_STATUS_OPTIONS = ["available", "partially_reserved", "not_available", "closed", "maintenance"];
const INVENTORY_MODE_OPTIONS = [{
  value: "auto",
  label: "Automatique"
}, {
  value: "all",
  label: "Toutes les chambres"
}, {
  value: "quantity",
  label: "Quantité disponible"
}, {
  value: "specific_units",
  label: "Chambres précises"
}, {
  value: "closed",
  label: "Fermé"
}];
const BULK_INVENTORY_MODE_OPTIONS = [{
  value: "auto",
  label: "Automatique"
}, {
  value: "all",
  label: "Toutes les chambres"
}, {
  value: "quantity",
  label: "Quantité disponible"
}, {
  value: "closed",
  label: "Fermé"
}];
const VIEW_OPTIONS = [{
  value: "14_days",
  label: {
    fr: "14 jours",
    en: "14 days"
  }
}, {
  value: "month",
  label: {
    fr: "Mois",
    en: "Month"
  }
}, {
  value: "3_months",
  label: {
    fr: "3 mois",
    en: "3 months"
  }
}, {
  value: "year",
  label: {
    fr: "Année",
    en: "Year"
  }
}];
const MONTH_NAMES = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const CALENDAR_STATUS_LABELS = {
  available: {
    fr: "Disponible",
    en: "Available"
  },
  partially_reserved: {
    fr: "Partiellement réservé",
    en: "Partly booked"
  },
  not_available: {
    fr: "Indisponible",
    en: "Unavailable"
  },
  closed: {
    fr: "Fermé",
    en: "Closed"
  },
  maintenance: {
    fr: "Maintenance",
    en: "Maintenance"
  },
  reserved: {
    fr: "Réservé",
    en: "Booked"
  }
};
const INVENTORY_MODE_LABELS = {
  auto: {
    fr: "Automatique",
    en: "Automatic"
  },
  all: {
    fr: "Toutes les chambres",
    en: "All rooms"
  },
  quantity: {
    fr: "Quantité disponible",
    en: "Available quantity"
  },
  specific_units: {
    fr: "Chambres précises",
    en: "Specific rooms"
  },
  closed: {
    fr: "Fermé",
    en: "Closed"
  }
};
const MONTH_NAMES_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function monthName(index, locale) {
  return (locale === "en" ? MONTH_NAMES_EN : MONTH_NAMES)[index];
}
function calendarStatusLabel(status, locale) {
  return CALENDAR_STATUS_LABELS[status]?.[locale] ?? status;
}
function inventoryModeLabel(mode, locale) {
  return INVENTORY_MODE_LABELS[mode]?.[locale] ?? mode;
}
function AdminCalendar() {
  const initialData = Route.useLoaderData();
  const router = useRouter();
  const {
    t,
    pick,
    locale
  } = useI18n();
  const todayIso = reactExports.useMemo(() => toIsoDate(/* @__PURE__ */ new Date()), []);
  const initialPeriod = reactExports.useMemo(() => getInitialPeriodState(todayIso), [todayIso]);
  const [viewMode, setViewMode] = reactExports.useState("month");
  const [selectedYear, setSelectedYear] = reactExports.useState(initialPeriod.selectedYear);
  const [selectedMonth, setSelectedMonth] = reactExports.useState(initialPeriod.selectedMonth);
  const [anchorDate, setAnchorDate] = reactExports.useState(initialPeriod.anchorDate);
  const [calendarData, setCalendarData] = reactExports.useState(initialData);
  const [calendarLoading, setCalendarLoading] = reactExports.useState(false);
  const [selectedCell, setSelectedCell] = reactExports.useState(null);
  const [cellForm, setCellForm] = reactExports.useState(() => emptyCellForm());
  const [cellEditorOpen, setCellEditorOpen] = reactExports.useState(false);
  const [cellSaving, setCellSaving] = reactExports.useState(false);
  const [bulkEditorOpen, setBulkEditorOpen] = reactExports.useState(false);
  const [bulkForm, setBulkForm] = reactExports.useState(() => initialBulkForm(initialData.days, initialData.rooms));
  const [bulkSaving, setBulkSaving] = reactExports.useState(false);
  const [generatingUnitsFor, setGeneratingUnitsFor] = reactExports.useState(null);
  const periodRange = reactExports.useMemo(() => getCalendarRange(viewMode, selectedYear, selectedMonth, anchorDate), [anchorDate, selectedMonth, selectedYear, viewMode]);
  reactExports.useEffect(() => {
    let cancelled = false;
    setCalendarLoading(true);
    loadAdminCalendarData(periodRange).then((next) => {
      if (cancelled) return;
      setCalendarData(next);
      setBulkForm((current) => syncBulkFormWithData(current, next));
    }).finally(() => {
      if (!cancelled) setCalendarLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [periodRange]);
  const selectedRoom = reactExports.useMemo(() => calendarData.rooms.find((room) => room.id === selectedCell?.roomTypeId) ?? null, [calendarData.rooms, selectedCell]);
  const monthSections = reactExports.useMemo(() => groupDaysByMonth(calendarData.days, locale), [calendarData.days, locale]);
  const refetchCalendar = async () => {
    const next = await loadAdminCalendarData(periodRange);
    setCalendarData(next);
    setBulkForm((current) => syncBulkFormWithData(current, next));
    if (selectedCell) {
      const refreshedCell = findCell(next.rooms, selectedCell.roomTypeId, selectedCell.date);
      if (refreshedCell) setSelectedCell(refreshedCell);
    }
    await router.invalidate();
  };
  const openCellEditor = (cell) => {
    setSelectedCell(cell);
    setCellForm(formFromCell(cell));
    setCellEditorOpen(true);
  };
  const saveCell = async (event) => {
    event.preventDefault();
    if (!selectedCell) return;
    const validation = validateRateForm(cellForm, selectedCell.totalUnits);
    if (validation) {
      toast.error(validation);
      return;
    }
    setCellSaving(true);
    const payload = buildCellPayload(cellForm, selectedCell);
    try {
      const supabase = await requireAdminSupabase();
      const result = await supabase.from("room_rate_calendar").upsert(payload, {
        onConflict: "room_type_id,date"
      });
      if (false) ;
      if (result.error) throw result.error;
      toast.success(t("Disponibilité enregistrée.", "Availability saved."));
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
      roomTypeIds: current.roomTypeIds.length > 0 ? current.roomTypeIds : calendarData.rooms.map((room) => room.id),
      startDate: current.startDate || periodRange.startDate,
      endDate: current.endDate || periodRange.endDate,
      price: current.price || String(calendarData.rooms.find((room) => current.roomTypeIds.includes(room.id))?.pricePerNight ?? "")
    }));
    setBulkEditorOpen(true);
  };
  const toggleBulkRoom = (roomTypeId) => {
    setBulkForm((current) => ({
      ...current,
      roomTypeIds: current.roomTypeIds.includes(roomTypeId) ? current.roomTypeIds.filter((id) => id !== roomTypeId) : [...current.roomTypeIds, roomTypeId]
    }));
  };
  const saveBulk = async (event) => {
    event.preventDefault();
    const validation = validateBulkForm(bulkForm);
    if (validation) {
      toast.error(validation);
      return;
    }
    const dates = getDatesBetween(bulkForm.startDate, bulkForm.endDate);
    const updatedAt = (/* @__PURE__ */ new Date()).toISOString();
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
        ...buildBulkInventoryPayload(bulkForm, room?.totalUnits ?? 0)
      }));
    });
    setBulkSaving(true);
    try {
      const supabase = await requireAdminSupabase();
      const result = await supabase.from("room_rate_calendar").upsert(payload, {
        onConflict: "room_type_id,date"
      });
      if (false) ;
      if (result.error) throw result.error;
      toast.success(t("Période enregistrée.", "Period saved."));
      await refetchCalendar();
      setBulkEditorOpen(false);
    } catch (error) {
      console.error("[AdminCalendar] Supabase result/error", error);
      toast.error(getSupabaseErrorMessage(error));
    } finally {
      setBulkSaving(false);
    }
  };
  const generateMissingUnits = async (room) => {
    const rows = buildMissingUnitRows(room);
    if (rows.length === 0) {
      toast.info(t("Toutes les unités existent déjà pour ce type de chambre.", "All units already exist for this room type."));
      return;
    }
    setGeneratingUnitsFor(room.id);
    try {
      const supabase = await requireAdminSupabase();
      const result = await supabase.from("room_units").insert(rows);
      if (result.error) throw result.error;
      toast.success(t(`${rows.length} unité(s) créée(s).`, `${rows.length} unit(s) created.`));
      await refetchCalendar();
    } catch (error) {
      console.error("[AdminCalendar] room_units insert error", error);
      toast.error(getErrorDetail(error) ?? t("Impossible de générer les unités.", "Could not generate the units."));
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
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setAnchorDate(firstOfMonth(selectedYear, month));
  };
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setAnchorDate(firstOfMonth(year, selectedMonth));
  };
  const handleCellInventoryModeChange = (mode) => {
    setCellForm((form) => ({
      ...form,
      inventoryMode: mode,
      status: mode === "closed" ? "closed" : form.status === "closed" ? "available" : form.status,
      unitsAvailableOverride: mode === "quantity" ? form.unitsAvailableOverride || String(selectedCell?.availableUnits ?? 0) : mode === "all" ? String(selectedCell?.totalUnits ?? 0) : mode === "closed" ? "0" : form.unitsAvailableOverride,
      selectedUnitIds: mode === "specific_units" ? form.selectedUnitIds : mode === "auto" ? [] : form.selectedUnitIds
    }));
  };
  const periodLabel = getPeriodLabel(viewMode, periodRange, t("au", "to"));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: t("Calendrier de disponibilité", "Availability calendar"), description: t("Vue grille par type de chambre et par date, avec édition directe des tarifs, statuts, inventaire et règles de séjour.", "Grid view by room type and date, with direct editing of rates, statuses, inventory and stay rules."), onReservationCreated: refetchCalendar, actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminNewReservationButton, { variant: "primary", onCreated: refetchCalendar }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminButton, { variant: "secondary", onClick: openBulkEditor, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarRange, { className: "size-4" }), disabled: !calendarData.supabaseConfigured || Boolean(calendarData.loadError), children: t("Modifier une période", "Edit a period") })
  ] }), children: [
    calendarData.loadError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 size-5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: t("Impossible de charger le calendrier depuis Supabase.", "Could not load the calendar from Supabase.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 leading-6", children: calendarData.loadError }),
        calendarData.loadErrorDetail && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 rounded-md bg-background/70 p-2 font-mono text-xs text-foreground", children: calendarData.loadErrorDetail })
      ] })
    ] }) }),
    (calendarData.blockLoadError || calendarData.unitLoadError) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: t("Calendrier chargé partiellement.", "Calendar partially loaded.") }),
      calendarData.blockLoadError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: calendarData.blockLoadError }),
      calendarData.unitLoadError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: calendarData.unitLoadError })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 rounded-lg border border-border bg-card p-4 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: VIEW_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setViewMode(option.value), className: `h-9 rounded-md border px-3 text-sm font-semibold transition ${viewMode === option.value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-primary hover:bg-secondary"}`, children: pick(option.label) }, option.value)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: goToPreviousPeriod, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-4" }),
            t("Précédent", "Previous")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: goToToday, children: t("Aujourd'hui", "Today") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: goToNextPeriod, children: [
            t("Suivant", "Next"),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: selectedMonth, onChange: (event) => handleMonthChange(Number(event.target.value)), className: "admin-input h-9 min-h-9 w-[150px]", children: MONTH_NAMES.map((month, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: index + 1, children: monthName(index, locale) }, month)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: selectedYear, onChange: (event) => handleYearChange(Number(event.target.value)), className: "admin-input h-9 min-h-9 w-[110px]", children: AVAILABLE_YEARS.map((year) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: year, children: year }, year)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: periodLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          calendarData.days.length,
          " ",
          t("jour(s)", "day(s)")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          calendarData.rooms.length,
          " ",
          t("type(s) de chambre", "room type(s)")
        ] }),
        calendarLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Chargement...", "Loading...") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: viewMode === "year" ? "grid gap-5 xl:grid-cols-2" : "space-y-5", children: monthSections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarMonthSection, { days: section.days, rooms: calendarData.rooms, title: section.title, today: todayIso, compact: viewMode === "year", onCellClick: openCellEditor }, section.monthKey)) }),
    calendarData.rooms.length === 0 && !calendarData.loadError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground", children: t("Aucun type de chambre trouvé dans Supabase.", "No room types found in Supabase.") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: cellEditorOpen, onOpenChange: setCellEditorOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] max-w-3xl overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t("Modifier la disponibilité", "Edit availability") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          selectedRoom?.name ?? t("Type de chambre", "Room type"),
          " ·",
          " ",
          selectedCell?.date ?? "-"
        ] })
      ] }),
      selectedCell && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: saveCell, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 rounded-lg border border-border bg-secondary/35 p-4 text-sm sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoLine, { label: t("Type de chambre", "Room type"), value: selectedRoom?.name ?? "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoLine, { label: t("Date sélectionnée", "Selected date"), value: selectedCell.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoLine, { label: t("Disponibles / total", "Available / total"), value: `${selectedCell.availableUnits}/${selectedCell.totalUnits}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoLine, { label: t("Prix actuel", "Current price"), value: `${Math.round(selectedCell.price)} DT` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoLine, { label: t("Statut actuel", "Current status"), value: calendarStatusLabel(selectedCell.status, locale) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoLine, { label: t("Minimum de nuits", "Minimum nights"), value: String(selectedCell.minNights) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoLine, { label: t("Mode inventaire", "Inventory mode"), value: inventoryModeLabel(selectedCell.inventoryMode, locale) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoLine, { label: t("Note", "Note"), value: selectedCell.note || "-", wide: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Prix", "Price"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: cellForm.price, onChange: (event) => setCellForm((form) => ({
            ...form,
            price: event.target.value
          })), required: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Statut", "Status"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: cellForm.status, onChange: (event) => setCellForm((form) => ({
            ...form,
            status: event.target.value
          })), className: "admin-input", children: CALENDAR_STATUS_OPTIONS.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: status, children: calendarStatusLabel(status, locale) }, status)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Minimum de nuits", "Minimum nights"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 1, value: cellForm.minNights, onChange: (event) => setCellForm((form) => ({
            ...form,
            minNights: event.target.value
          })), required: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Note", "Note"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: cellForm.note, onChange: (event) => setCellForm((form) => ({
            ...form,
            note: event.target.value
          })), className: "min-h-24" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-primary", children: t("Nombre de chambres disponibles", "Number of rooms available") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: t("Le mode choisi contrôle le calcul de disponibilité pour cette date.", "The selected mode controls how availability is calculated for this date.") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Mode", "Mode"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: cellForm.inventoryMode, onChange: (event) => handleCellInventoryModeChange(event.target.value), className: "admin-input", children: INVENTORY_MODE_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option.value, children: inventoryModeLabel(option.value, locale) }, option.value)) }) }),
            cellForm.inventoryMode === "quantity" && /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Nombre disponible", "Number available"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, max: selectedCell.totalUnits, value: cellForm.unitsAvailableOverride, onChange: (event) => setCellForm((form) => ({
              ...form,
              unitsAvailableOverride: event.target.value
            })), required: true }) })
          ] }),
          cellForm.inventoryMode === "specific_units" && selectedRoom && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
            selectedRoom.units.length < selectedRoom.totalUnits && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(`${selectedRoom.units.length}/${selectedRoom.totalUnits} unités existent pour ce type de chambre.`, `${selectedRoom.units.length}/${selectedRoom.totalUnits} units exist for this room type.`) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", loading: generatingUnitsFor === selectedRoom.id, onClick: () => generateMissingUnits(selectedRoom), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
                t("Générer les unités manquantes", "Generate missing units")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid max-h-56 gap-2 overflow-auto rounded-md border border-border bg-secondary/20 p-3 sm:grid-cols-2", children: [
              selectedRoom.units.map((unit) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-3 rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: cellForm.selectedUnitIds.includes(unit.id), onChange: () => setCellForm((form) => ({
                  ...form,
                  selectedUnitIds: toggleId(form.selectedUnitIds, unit.id)
                })), className: "size-4 accent-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block", children: [
                    t("Unité", "Unit"),
                    " ",
                    unit.unit_number
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: unit.status })
                ] })
              ] }, unit.id)),
              selectedRoom.units.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border border-dashed border-border bg-background p-4 text-sm text-muted-foreground", children: t("Aucune unité n'existe encore pour ce type de chambre.", "No units exist yet for this room type.") })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setCellEditorOpen(false), children: t("Annuler", "Cancel") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", loading: cellSaving, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-4" }),
            t("Enregistrer", "Save")
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: bulkEditorOpen, onOpenChange: setBulkEditorOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] max-w-4xl overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t("Modifier une période", "Edit a period") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: t("Appliquez les mêmes règles à plusieurs types de chambre et dates.", "Apply the same rules to several room types and dates.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: saveBulk, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Types de chambre sélectionnés", "Selected room types"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid max-h-48 gap-2 overflow-auto rounded-lg border border-border bg-secondary/20 p-3 sm:grid-cols-2", children: calendarData.rooms.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-start gap-3 rounded-md border border-border bg-card p-3 text-sm font-semibold text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: bulkForm.roomTypeIds.includes(room.id), onChange: () => toggleBulkRoom(room.id), className: "mt-1 size-4 accent-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: room.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground", children: [
              room.totalUnits,
              " ",
              t("unités", "units"),
              " · ",
              Math.round(room.pricePerNight),
              " ",
              "DT ",
              t("par défaut", "default")
            ] })
          ] })
        ] }, room.id)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Date de début", "Start date"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: bulkForm.startDate, onChange: (event) => setBulkForm((form) => ({
            ...form,
            startDate: event.target.value
          })), required: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Date de fin", "End date"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: bulkForm.endDate, onChange: (event) => setBulkForm((form) => ({
            ...form,
            endDate: event.target.value
          })), required: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Prix", "Price"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: bulkForm.price, onChange: (event) => setBulkForm((form) => ({
            ...form,
            price: event.target.value
          })), required: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Statut", "Status"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: bulkForm.status, onChange: (event) => setBulkForm((form) => ({
            ...form,
            status: event.target.value
          })), className: "admin-input", children: CALENDAR_STATUS_OPTIONS.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: status, children: calendarStatusLabel(status, locale) }, status)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Minimum de nuits", "Minimum nights"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 1, value: bulkForm.minNights, onChange: (event) => setBulkForm((form) => ({
            ...form,
            minNights: event.target.value
          })), required: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Note", "Note"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: bulkForm.note, onChange: (event) => setBulkForm((form) => ({
            ...form,
            note: event.target.value
          })) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Mode inventaire", "Inventory mode"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: bulkForm.inventoryMode, onChange: (event) => setBulkForm((form) => ({
            ...form,
            inventoryMode: event.target.value,
            status: event.target.value === "closed" ? "closed" : form.status === "closed" ? "available" : form.status,
            unitsAvailableOverride: event.target.value === "closed" ? "0" : form.unitsAvailableOverride
          })), className: "admin-input", children: BULK_INVENTORY_MODE_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option.value, children: inventoryModeLabel(option.value, locale) }, option.value)) }) }),
          bulkForm.inventoryMode === "quantity" && /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Nombre disponible", "Number available"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: bulkForm.unitsAvailableOverride, onChange: (event) => setBulkForm((form) => ({
            ...form,
            unitsAvailableOverride: event.target.value
          })), required: true }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setBulkEditorOpen(false), children: t("Annuler", "Cancel") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", loading: bulkSaving, children: t("Appliquer", "Apply") })
        ] })
      ] })
    ] }) })
  ] });
}
function CalendarMonthSection({
  days,
  rooms,
  title,
  today,
  compact,
  onCellClick
}) {
  const {
    t,
    locale
  } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "overflow-hidden rounded-lg border border-border bg-card shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-secondary/55 px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold uppercase tracking-[0.12em] text-primary", children: title }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: `w-full text-sm ${compact ? "min-w-[1060px]" : "min-w-[1180px]"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary text-xs uppercase tracking-[0.12em] text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "sticky left-0 z-10 bg-secondary px-4 py-3 text-left", children: t("Chambre", "Room") }),
        days.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: `px-2 py-3 text-center ${day === today ? "bg-accent/20 text-primary" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-mono", children: compact ? day.slice(8, 10) : formatDayHeader(day) }) }, day))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rooms.map((room) => {
        const cellsByDate = new Map(room.cells.map((cell) => [cell.date, cell]));
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "sticky left-0 z-10 bg-card px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-primary", children: room.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              room.totalUnits,
              " ",
              t("unités", "units")
            ] })
          ] }),
          days.map((day) => {
            const cell = cellsByDate.get(day);
            if (!cell) return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-3" }, `${room.id}-${day}`);
            return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-1.5 py-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onCellClick(cell), className: `min-h-[82px] w-full rounded-md border px-2 py-2 text-xs font-semibold transition hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${cellClass(cell.effectiveStatus)}`, title: `${room.name} - ${cell.date} - ${cell.availableUnits}/${cell.totalUnits}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-sm font-black", children: [
                cell.availableUnits,
                "/",
                cell.totalUnits
              ] }),
              cell.hasCustomRate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1 block text-[11px] font-bold", children: [
                Math.round(cell.price),
                " DT"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block truncate rounded px-1.5 py-0.5 text-[10px] font-bold", children: calendarStatusLabel(cell.effectiveStatus, locale) }),
              cell.hasCustomRate && cell.minNights > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1 block text-[10px] font-semibold", children: [
                "min ",
                cell.minNights,
                " ",
                t("nuits", "nights")
              ] })
            ] }) }, `${room.id}-${day}`);
          })
        ] }, `${room.id}-${title}`);
      }) })
    ] }) })
  ] });
}
function shiftPeriod(viewMode, selectedYear, selectedMonth, anchorDate, direction) {
  const base = viewMode === "14_days" ? /* @__PURE__ */ new Date(`${anchorDate}T12:00:00`) : /* @__PURE__ */ new Date(`${firstOfMonth(selectedYear, selectedMonth)}T12:00:00`);
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
    anchorDate: toIsoDate(next)
  };
}
function clampYear(year) {
  return Math.max(AVAILABLE_YEARS[0], Math.min(AVAILABLE_YEARS[AVAILABLE_YEARS.length - 1], year));
}
function initialBulkForm(days, rooms) {
  return {
    roomTypeIds: rooms.map((room) => room.id),
    startDate: days[0] ?? "",
    endDate: days.at(-1) ?? "",
    price: rooms[0] ? String(rooms[0].pricePerNight) : "",
    status: "available",
    minNights: "1",
    note: "",
    inventoryMode: "auto",
    unitsAvailableOverride: ""
  };
}
function syncBulkFormWithData(form, data) {
  const validIds = new Set(data.rooms.map((room) => room.id));
  const selectedIds = form.roomTypeIds.filter((id) => validIds.has(id));
  return {
    ...form,
    roomTypeIds: selectedIds.length > 0 ? selectedIds : data.rooms.map((room) => room.id),
    startDate: form.startDate || data.days[0] || "",
    endDate: form.endDate || data.days.at(-1) || "",
    price: form.price || (data.rooms[0] ? String(data.rooms[0].pricePerNight) : "")
  };
}
function emptyCellForm() {
  return {
    price: "",
    status: "available",
    minNights: "1",
    note: "",
    inventoryMode: "auto",
    unitsAvailableOverride: "",
    selectedUnitIds: []
  };
}
function formFromCell(cell) {
  return {
    price: String(cell.price),
    status: toEditableStatus(cell.status),
    minNights: String(cell.minNights),
    note: cell.note ?? "",
    inventoryMode: cell.inventoryMode,
    unitsAvailableOverride: cell.unitsAvailableOverride === null ? "" : String(cell.unitsAvailableOverride),
    selectedUnitIds: cell.selectedUnitIds
  };
}
function buildCellPayload(form, cell) {
  return {
    room_type_id: cell.roomTypeId,
    date: cell.date,
    price: Number(form.price),
    status: form.inventoryMode === "closed" ? "closed" : form.status,
    min_nights: Number(form.minNights),
    note: normalizeNote(form.note),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    ...buildInventoryPayload(form.inventoryMode, form.unitsAvailableOverride, form.selectedUnitIds, cell.totalUnits)
  };
}
function buildBulkInventoryPayload(form, totalUnits) {
  return buildInventoryPayload(form.inventoryMode, form.unitsAvailableOverride, [], totalUnits);
}
function buildInventoryPayload(inventoryMode, unitsAvailableOverride, selectedUnitIds, totalUnits) {
  if (inventoryMode === "auto") {
    return {
      inventory_mode: "auto",
      units_available_override: null,
      selected_unit_ids: null
    };
  }
  if (inventoryMode === "all") {
    return {
      inventory_mode: "all",
      units_available_override: totalUnits,
      selected_unit_ids: null
    };
  }
  if (inventoryMode === "quantity") {
    return {
      inventory_mode: "quantity",
      units_available_override: Number(unitsAvailableOverride),
      selected_unit_ids: null
    };
  }
  if (inventoryMode === "specific_units") {
    return {
      inventory_mode: "specific_units",
      units_available_override: selectedUnitIds.length,
      selected_unit_ids: selectedUnitIds
    };
  }
  return {
    inventory_mode: "closed",
    units_available_override: 0,
    selected_unit_ids: null
  };
}
function toEditableStatus(status) {
  if (status === "reserved") return "not_available";
  if (CALENDAR_STATUS_OPTIONS.includes(status)) {
    return status;
  }
  return "available";
}
function validateRateForm(form, totalUnits) {
  const price = Number(form.price);
  const minNights = Number(form.minNights);
  if (!Number.isFinite(price) || price < 0) return tr("Le prix doit être positif.", "The price must be positive.");
  if (!Number.isInteger(minNights) || minNights < 1) {
    return tr("Le minimum de nuits doit être supérieur ou égal à 1.", "Minimum nights must be 1 or more.");
  }
  return validateInventoryForm(form.inventoryMode, form.unitsAvailableOverride, form.selectedUnitIds, totalUnits);
}
function validateInventoryForm(inventoryMode, unitsAvailableOverride, selectedUnitIds, totalUnits) {
  if (inventoryMode === "quantity") {
    const quantity = Number(unitsAvailableOverride);
    if (!Number.isInteger(quantity) || quantity < 0) {
      return tr("Le nombre disponible doit être un entier positif.", "The available number must be a positive whole number.");
    }
    if (typeof totalUnits === "number" && quantity > totalUnits) {
      return tr("Le nombre disponible ne peut pas dépasser le total d'unités.", "The available number cannot exceed the total number of units.");
    }
  }
  if (inventoryMode === "specific_units" && selectedUnitIds.length === 0) {
    return tr("Sélectionnez au moins une unité.", "Select at least one unit.");
  }
  return null;
}
function validateBulkForm(form) {
  const rateError = validateRateForm({
    ...form,
    selectedUnitIds: []
  }, void 0);
  if (rateError) return rateError;
  if (form.roomTypeIds.length === 0) return tr("Sélectionnez au moins un type de chambre.", "Select at least one room type.");
  if (!form.startDate || !form.endDate) return tr("Sélectionnez une période.", "Select a period.");
  if (form.startDate > form.endDate) return tr("La date de fin doit être après la date de début.", "The end date must be after the start date.");
  return null;
}
function normalizeNote(note) {
  const trimmed = note.trim();
  return trimmed.length > 0 ? trimmed : null;
}
function toggleId(ids, id) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}
function findCell(rooms, roomTypeId, date) {
  return rooms.find((room) => room.id === roomTypeId)?.cells.find((cell) => cell.date === date) ?? null;
}
function buildMissingUnitRows(room) {
  const missingCount = Math.max(0, room.totalUnits - room.units.length);
  const existingNumbers = new Set(room.units.map((unit) => unit.unit_number.trim()));
  const rows = [];
  for (let index = 1; rows.length < missingCount && index <= room.totalUnits + missingCount + 100; index++) {
    const unitNumber = String(index).padStart(2, "0");
    if (existingNumbers.has(unitNumber)) continue;
    existingNumbers.add(unitNumber);
    rows.push({
      room_type_id: room.id,
      unit_number: unitNumber,
      status: "available"
    });
  }
  return rows;
}
function groupDaysByMonth(days, locale) {
  const sections = /* @__PURE__ */ new Map();
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
      title: `${monthName(month - 1, locale)} ${year}`,
      days: sectionDays
    };
  });
}
function formatDayHeader(date) {
  const day = /* @__PURE__ */ new Date(`${date}T12:00:00`);
  return `${String(day.getDate()).padStart(2, "0")}/${String(day.getMonth() + 1).padStart(2, "0")}`;
}
function getPeriodLabel(viewMode, range, separator) {
  if (viewMode === "year") return range.startDate.slice(0, 4);
  if (range.startDate === range.endDate) return range.startDate;
  return `${range.startDate} ${separator} ${range.endDate}`;
}
function cellClass(status) {
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
function AdminField({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground", children: label }),
    children
  ] });
}
function InfoLine({
  label,
  value,
  wide
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: wide ? "sm:col-span-2" : void 0, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 break-words font-semibold text-primary", children: value })
  ] });
}
export {
  AdminCalendar as component
};
