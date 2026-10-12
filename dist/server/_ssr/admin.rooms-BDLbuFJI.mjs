import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { aJ as Route$a, u as useI18n, _ as AdminLayout, aK as EXPECTED_ROOM_COUNT, l as localizeRoomType, a as getRoomCapacity, aH as AdminButton, aL as getSupabaseErrorMessage$1, aM as mapAdminRoomFromRow, i as isSupabaseConfigured, N as tr } from "./router-CgbkQim6.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as StatusBadge } from "./status-badge-Cw5SwgC6.mjs";
import "../_libs/seroval.mjs";
import { ab as TriangleAlert, X, m as Save, aD as Plus } from "../_libs/lucide-react.mjs";
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
const DEFAULT_ROOM_IMAGE = "/images/rooms/studio.jpg";
const ROOM_CATEGORIES = ["Studio", "Appartement", "Suite", "Chambre"];
const ROOM_STATUSES = ["active", "maintenance", "inactive", "occupied", "cleaning_required"];
function AdminRooms() {
  const {
    roomItems,
    loadError,
    loadErrorDetail,
    supabaseConfigured
  } = Route$a.useLoaderData();
  const router = useRouter();
  const {
    t,
    locale,
    formatCurrency
  } = useI18n();
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const [creating, setCreating] = reactExports.useState(false);
  const selectedRoom = editingId ? roomItems.find((room) => room.id === editingId) : null;
  const startEditing = (room) => {
    setEditingId(room.id);
    setForm(roomToForm(room));
  };
  const cancelEditing = () => {
    setEditingId(null);
    setForm(null);
  };
  const updateForm = (key, value) => {
    setForm((current) => current ? {
      ...current,
      [key]: value
    } : current);
  };
  const createRoom = async () => {
    setCreating(true);
    try {
      const supabase = await requireAdminSupabase();
      const slug = createDraftSlug(roomItems);
      const payload = {
        slug,
        name: "Nouveau type",
        type: "Appartement",
        description: "Description à compléter.",
        price_per_night: 120,
        capacity_adults: 2,
        capacity_children: 0,
        beds: "1 lit double",
        bathrooms: 1,
        total_units: 1,
        status: "active",
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      const {
        data,
        error
      } = await supabase.from("room_types").insert(payload).select("*").single();
      if (error) throw error;
      await replaceRoomAmenities(supabase, data.id, ["Wi-Fi gratuit", "Climatisation"]);
      await replaceRoomImages(supabase, data.id, [DEFAULT_ROOM_IMAGE], data.name);
      await router.invalidate();
      const createdRoom = mapAdminRoomFromRow({
        ...data,
        room_amenities: [{
          id: "draft-amenity-1",
          room_type_id: data.id,
          amenity: "Wi-Fi gratuit",
          created_at: ""
        }, {
          id: "draft-amenity-2",
          room_type_id: data.id,
          amenity: "Climatisation",
          created_at: ""
        }],
        room_images: [{
          id: "draft-image-1",
          room_type_id: data.id,
          url: DEFAULT_ROOM_IMAGE,
          image_url: null,
          alt_text: data.name,
          sort_order: 1,
          created_at: ""
        }],
        room_units: []
      });
      setEditingId(createdRoom.id);
      setForm(roomToForm(createdRoom));
      toast.success(t("Type de chambre créé.", "Room type created."));
    } catch (error) {
      console.error("[AdminRooms] room type create failed", error);
      toast.error(getSupabaseErrorMessage$1(error));
    } finally {
      setCreating(false);
    }
  };
  const handleSaveRoom = async (event) => {
    event.preventDefault();
    if (!form) return;
    setSaving(true);
    try {
      const supabase = await requireAdminSupabase();
      const payload = buildRoomUpdatePayload(form);
      if (false) ;
      const {
        data,
        error
      } = await supabase.from("room_types").update(payload).eq("id", form.id).select().single();
      if (false) ;
      if (error) throw error;
      await replaceRoomAmenities(supabase, form.id, parseList(form.amenitiesText));
      await replaceRoomImages(supabase, form.id, parseList(form.imagesText), payload.name ?? selectedRoom?.name ?? form.name);
      toast.success(t("Type de chambre enregistré.", "Room type saved."));
      cancelEditing();
      await router.invalidate();
    } catch (error) {
      console.error("[AdminRooms] room type update failed", error);
      toast.error(getSupabaseErrorMessage$1(error));
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: t("Gestion des chambres", "Room management"), description: t("Créez et ajustez les types de chambres, unités, tarifs, photos, équipements et statuts.", "Create and adjust room types, units, rates, photos, amenities and statuses."), actions: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminButton, { variant: "primary", onClick: createRoom, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }), loading: creating, disabled: !supabaseConfigured || Boolean(loadError), children: t("Nouveau type", "New room type") }), children: [
    loadError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 size-5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: t("Impossible de charger les types de chambres depuis Supabase.", "Could not load room types from Supabase.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 leading-6", children: loadError }),
        loadErrorDetail && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 rounded-md bg-background/70 p-2 font-mono text-xs text-foreground", children: loadErrorDetail })
      ] })
    ] }) }),
    !loadError && roomItems.length !== EXPECTED_ROOM_COUNT && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 size-5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: t(`${roomItems.length} type${roomItems.length > 1 ? "s" : ""} de chambre chargé${roomItems.length > 1 ? "s" : ""} depuis Supabase (attendu : ${EXPECTED_ROOM_COUNT}).`, `${roomItems.length} room type${roomItems.length > 1 ? "s" : ""} loaded from Supabase (expected: ${EXPECTED_ROOM_COUNT}).`) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 leading-6", children: [
          t("Le site public affiche 4 logements même quand Supabase en renvoie moins, car il complète les manquants avec des valeurs par défaut locales. Cette page n'a pas ce filet de sécurité : elle montre exactement ce que contient la table", "The public site always shows 4 room types, even when Supabase returns fewer, because it fills the gaps with local defaults. This page has no such safety net: it shows exactly what the table contains:"),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "rounded bg-white/60 px-1", children: "room_types" }),
          ".",
          " ",
          t('Vérifiez la console du navigateur ("Room types (raw rows...)") et la colonne', 'Check the browser console ("Room types (raw rows...)") and the'),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "status" }),
          " ",
          t("pour les 4 logements attendus.", "column for the 4 expected room types.")
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-[1fr_420px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-border bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[920px] text-left text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary text-xs uppercase tracking-[0.12em] text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Photo", "Photo") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Chambre", "Room") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Unités", "Units") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Capacité", "Capacity") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Prix", "Price") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Statut", "Status") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Action", "Action") })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          roomItems.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: room.images[0] ?? DEFAULT_ROOM_IMAGE, alt: room.name, className: "size-14 rounded-md object-cover" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-primary", children: room.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                localizeRoomType(room.type, locale),
                " · ",
                room.beds
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: room.totalUnits }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
              getRoomCapacity(room),
              " ",
              t("personnes", "guests")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold", children: formatCurrency(room.pricePerNight) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { kind: "room", value: room.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => startEditing(room), className: "rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-primary hover:border-primary", children: t("Modifier", "Edit") }) })
          ] }, room.id)),
          roomItems.length === 0 && !loadError && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-4 py-8 text-center text-sm text-muted-foreground", children: t("Aucun type de chambre trouvé dans Supabase.", "No room types found in Supabase.") }) })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-lg border border-border bg-card p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-primary", children: t("Modifier le type de chambre", "Edit room type") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs leading-5 text-muted-foreground", children: t("Les modifications sont enregistrées dans Supabase.", "Changes are saved to Supabase.") })
          ] }),
          form && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: cancelEditing, className: "inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-primary hover:text-primary", "aria-label": t("Annuler l'édition", "Cancel editing"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }) })
        ] }),
        form ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveRoom, className: "mt-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Nom", "Name"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.name, onChange: (event) => updateForm("name", event.target.value), className: "admin-input", required: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Slug", "Slug"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.slug, onChange: (event) => updateForm("slug", slugify(event.target.value)), className: "admin-input", required: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Catégorie", "Category"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.category, onChange: (event) => updateForm("category", event.target.value), className: "admin-input", children: ROOM_CATEGORIES.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: category, children: localizeRoomType(category, locale) }, category)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Description", "Description"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.description, onChange: (event) => updateForm("description", event.target.value), className: "admin-input min-h-28", required: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Prix / nuit", "Price / night"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, value: form.pricePerNight, onChange: (event) => updateForm("pricePerNight", event.target.value), className: "admin-input", required: true }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Unités", "Units"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, value: form.totalUnits, onChange: (event) => updateForm("totalUnits", event.target.value), className: "admin-input", required: true }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Adultes", "Adults"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, value: form.capacityAdults, onChange: (event) => updateForm("capacityAdults", event.target.value), className: "admin-input", required: true }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Enfants", "Children"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, value: form.capacityChildren, onChange: (event) => updateForm("capacityChildren", event.target.value), className: "admin-input", required: true }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Lits", "Beds"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.beds, onChange: (event) => updateForm("beds", event.target.value), className: "admin-input", required: true }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Salles de bain", "Bathrooms"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, value: form.bathrooms, onChange: (event) => updateForm("bathrooms", event.target.value), className: "admin-input", required: true }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Statut", "Status"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.status, onChange: (event) => updateForm("status", event.target.value), className: "admin-input", children: ROOM_STATUSES.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: status, children: formatStatus(status, locale) }, status)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Équipements", "Amenities"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.amenitiesText, onChange: (event) => updateForm("amenitiesText", event.target.value), className: "admin-input min-h-24", placeholder: t("Un équipement par ligne ou séparé par virgule", "One amenity per line or comma-separated") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: t("Images", "Images"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.imagesText, onChange: (event) => updateForm("imagesText", event.target.value), className: "admin-input min-h-20", placeholder: "/images/rooms/studio.jpg" }) }),
          parseList(form.imagesText).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: parseList(form.imagesText).slice(0, 3).map((image) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt: form.name, className: "aspect-square rounded-md border border-border object-cover" }, image)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AdminButton, { type: "button", variant: "secondary", onClick: cancelEditing, className: "flex-1", disabled: saving, children: t("Annuler", "Cancel") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminButton, { type: "submit", variant: "primary", loading: saving, className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-4" }),
              t("Enregistrer", "Save")
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-md border border-dashed border-border bg-secondary/50 p-4 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-primary", children: t("Sélectionnez un type de chambre à modifier.", "Select a room type to edit.") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 leading-6", children: t("Le formulaire s'ouvrira ici avec les données Supabase déjà renseignées.", "The form will open here, pre-filled with the Supabase data.") })
        ] })
      ] })
    ] })
  ] });
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
function roomToForm(room) {
  return {
    id: room.id,
    name: room.name,
    slug: room.slug ?? room.id,
    category: room.type,
    description: room.description,
    pricePerNight: String(room.pricePerNight),
    capacityAdults: String(room.capacityAdults),
    capacityChildren: String(room.capacityChildren),
    beds: room.beds,
    bathrooms: String(room.bathrooms),
    totalUnits: String(room.totalUnits),
    status: room.status,
    amenitiesText: room.amenities.join("\n"),
    imagesText: room.images.join("\n")
  };
}
function buildRoomUpdatePayload(form) {
  return {
    name: form.name.trim(),
    slug: form.slug.trim(),
    type: form.category,
    description: form.description.trim(),
    price_per_night: toNumber(form.pricePerNight),
    capacity_adults: toNumber(form.capacityAdults),
    capacity_children: toNumber(form.capacityChildren),
    beds: form.beds.trim(),
    bathrooms: toNumber(form.bathrooms),
    total_units: toNumber(form.totalUnits),
    status: form.status,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
}
async function requireAdminSupabase() {
  const configured = isSupabaseConfigured();
  if (!configured) {
    throw new Error(tr("Supabase n'est pas configuré. Configurez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.", "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."));
  }
  const {
    supabase
  } = await import("./client-Bsz3xj8E.mjs");
  return supabase;
}
async function replaceRoomAmenities(supabase, roomId, amenities) {
  const deleteResult = await supabase.from("room_amenities").delete().eq("room_type_id", roomId);
  if (deleteResult.error) throw deleteResult.error;
  if (amenities.length === 0) return;
  const insertResult = await supabase.from("room_amenities").insert(amenities.map((amenity) => ({
    room_type_id: roomId,
    amenity
  })));
  if (insertResult.error) throw insertResult.error;
}
async function replaceRoomImages(supabase, roomId, images, roomName) {
  const deleteResult = await supabase.from("room_images").delete().eq("room_type_id", roomId);
  if (deleteResult.error) throw deleteResult.error;
  if (images.length === 0) return;
  const insertResult = await supabase.from("room_images").insert(images.map((url, index) => ({
    room_type_id: roomId,
    url,
    alt_text: roomName,
    sort_order: index + 1
  })));
  if (insertResult.error) throw insertResult.error;
}
function parseList(value) {
  return value.split(/[\n,]/).map((item) => item.trim()).filter(Boolean);
}
function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
function createDraftSlug(rooms) {
  const base = `nouveau-type-${Date.now().toString(36)}`;
  const existing = new Set(rooms.map((room) => room.slug ?? room.id));
  if (!existing.has(base)) return base;
  return `${base}-${rooms.length + 1}`;
}
function slugify(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function formatStatus(status, locale) {
  const labels = {
    active: {
      fr: "Actif",
      en: "Active"
    },
    maintenance: {
      fr: "Maintenance",
      en: "Maintenance"
    },
    inactive: {
      fr: "Inactif",
      en: "Inactive"
    },
    occupied: {
      fr: "Occupé",
      en: "Occupied"
    },
    cleaning_required: {
      fr: "Ménage requis",
      en: "Cleaning required"
    }
  };
  return labels[status][locale];
}
export {
  AdminRooms as component
};
