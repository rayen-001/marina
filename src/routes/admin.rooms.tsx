import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AlertTriangle, Plus, Save, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminLayout } from "@/components/admin/admin-layout";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatCurrency, getRoomCapacity, type Room } from "@/data/hotel";
import { isSupabaseConfigured } from "@/lib/supabase/isSupabaseConfigured";
import type { Tables, TablesInsert, TablesUpdate } from "@/lib/supabase/types";

const DEFAULT_ROOM_IMAGE = "/images/rooms/studio.jpg";
const ROOM_CATEGORIES: Room["type"][] = ["Studio", "Appartement", "Suite", "Chambre"];
const ROOM_STATUSES: Room["status"][] = [
  "active",
  "maintenance",
  "inactive",
  "occupied",
  "cleaning_required",
];

export const Route = createFileRoute("/admin/rooms")({
  loader: loadAdminRoomTypes,
  head: () => ({
    meta: [{ title: "Chambres - Marina Cap Monastir" }],
  }),
  pendingComponent: AdminRoomsPending,
  component: AdminRooms,
});

const EXPECTED_ROOM_COUNT = 4;

function AdminRoomsPending() {
  return (
    <AdminLayout
      title="Gestion des chambres"
      description="Créez et ajustez les types de chambres, unités, tarifs, photos, équipements et statuts."
    >
      <div className="space-y-3">
        {Array.from({ length: EXPECTED_ROOM_COUNT }).map((_, index) => (
          <div key={index} className="skeleton-block h-16 w-full rounded-lg" />
        ))}
      </div>
    </AdminLayout>
  );
}

type RoomAmenityRow = Tables<"room_amenities">;
type RoomImageRow = Tables<"room_images">;
type RoomUnitRow = Tables<"room_units">;
type RoomTypeInsert = TablesInsert<"room_types">;
type RoomTypeUpdate = TablesUpdate<"room_types">;
type AdminRoom = Room & { units: RoomUnitRow[] };

type AdminRoomRow = Omit<Tables<"room_types">, "type"> & {
  type?: Room["type"] | null;
  category?: Room["type"] | null;
  room_amenities?: RoomAmenityRow[] | null;
  room_images?: RoomImageRow[] | null;
  room_units?: RoomUnitRow[] | null;
};

type LoaderData = {
  roomItems: AdminRoom[];
  loadError: string | null;
  loadErrorDetail: string | null;
  supabaseConfigured: boolean;
};

type RoomFormState = {
  id: string;
  name: string;
  slug: string;
  category: Room["type"];
  description: string;
  pricePerNight: string;
  capacityAdults: string;
  capacityChildren: string;
  beds: string;
  bathrooms: string;
  totalUnits: string;
  status: Room["status"];
  amenitiesText: string;
  imagesText: string;
};

async function loadAdminRoomTypes(): Promise<LoaderData> {
  const supabaseConfigured = isSupabaseConfigured();

  if (import.meta.env.DEV) {
    console.info("[AdminRooms] Supabase configured", supabaseConfigured);
  }

  if (!supabaseConfigured) {
    return {
      roomItems: [],
      loadError:
        "Supabase n'est pas configuré. Configurez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.",
      loadErrorDetail: null,
      supabaseConfigured,
    };
  }

  try {
    const { supabase } = await import("@/lib/supabase/client");
    const { data, error } = await supabase
      .from("room_types")
      .select(
        `
        *,
        room_amenities(*),
        room_images(*),
        room_units(*)
      `,
      )
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("[AdminRooms] room_types query failed", error);
      return {
        roomItems: [],
        loadError: getSupabaseErrorMessage(error),
        loadErrorDetail: getErrorDetail(error),
        supabaseConfigured,
      };
    }

    const rows = (data ?? []) as AdminRoomRow[];
    const roomItems = rows.map(mapAdminRoomFromRow);

    // Explicit diagnostic requested for the "admin only shows 1 room" bug:
    // this logs the raw, unfiltered room_types rows the admin query actually
    // received from Supabase, so a mismatch against the public site's 4
    // rooms is visible directly instead of guessed at.
    console.log("Room types:", roomItems);
    console.log(
      "Room types (raw rows, status included):",
      rows.map((row) => ({ id: row.id, name: row.name, slug: row.slug, status: row.status })),
    );

    return {
      roomItems,
      loadError: null,
      loadErrorDetail: null,
      supabaseConfigured,
    };
  } catch (error) {
    console.error("[AdminRooms] room_types load failed", error);
    return {
      roomItems: [],
      loadError: getSupabaseErrorMessage(error),
      loadErrorDetail: getErrorDetail(error),
      supabaseConfigured,
    };
  }
}

function AdminRooms() {
  const { roomItems, loadError, loadErrorDetail, supabaseConfigured } = Route.useLoaderData();
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<RoomFormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);

  const selectedRoom = editingId ? roomItems.find((room) => room.id === editingId) : null;

  const startEditing = (room: Room) => {
    setEditingId(room.id);
    setForm(roomToForm(room));
  };

  const cancelEditing = () => {
    setEditingId(null);
    setForm(null);
  };

  const updateForm = <Key extends keyof RoomFormState>(key: Key, value: RoomFormState[Key]) => {
    setForm((current) => (current ? { ...current, [key]: value } : current));
  };

  const createRoom = async () => {
    setCreating(true);
    try {
      const supabase = await requireAdminSupabase();
      const slug = createDraftSlug(roomItems);
      const payload: RoomTypeInsert = {
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
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("room_types")
        .insert(payload)
        .select("*")
        .single();
      if (error) throw error;

      await replaceRoomAmenities(supabase, data.id, ["Wi-Fi gratuit", "Climatisation"]);
      await replaceRoomImages(supabase, data.id, [DEFAULT_ROOM_IMAGE], data.name);
      await router.invalidate();

      const createdRoom = mapAdminRoomFromRow({
        ...(data as Tables<"room_types">),
        room_amenities: [
          {
            id: "draft-amenity-1",
            room_type_id: data.id,
            amenity: "Wi-Fi gratuit",
            created_at: "",
          },
          {
            id: "draft-amenity-2",
            room_type_id: data.id,
            amenity: "Climatisation",
            created_at: "",
          },
        ],
        room_images: [
          {
            id: "draft-image-1",
            room_type_id: data.id,
            url: DEFAULT_ROOM_IMAGE,
            image_url: null,
            alt_text: data.name,
            sort_order: 1,
            created_at: "",
          },
        ],
        room_units: [],
      });

      setEditingId(createdRoom.id);
      setForm(roomToForm(createdRoom));
      toast.success("Type de chambre créé.");
    } catch (error) {
      console.error("[AdminRooms] room type create failed", error);
      toast.error(getSupabaseErrorMessage(error));
    } finally {
      setCreating(false);
    }
  };

  const handleSaveRoom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form) return;

    setSaving(true);
    try {
      const supabase = await requireAdminSupabase();
      const payload = buildRoomUpdatePayload(form);

      if (import.meta.env.DEV) {
        console.info("[AdminRooms] update payload", payload);
      }

      const { data, error } = await supabase
        .from("room_types")
        .update(payload)
        .eq("id", form.id)
        .select()
        .single();

      if (import.meta.env.DEV) {
        console.info("[AdminRooms] update result", data);
        console.info("[AdminRooms] update error", error);
      }

      if (error) throw error;

      await replaceRoomAmenities(supabase, form.id, parseList(form.amenitiesText));
      await replaceRoomImages(
        supabase,
        form.id,
        parseList(form.imagesText),
        payload.name ?? selectedRoom?.name ?? form.name,
      );
      toast.success("Type de chambre enregistré.");
      cancelEditing();
      await router.invalidate();
    } catch (error) {
      console.error("[AdminRooms] room type update failed", error);
      toast.error(getSupabaseErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Gestion des chambres"
      description="Créez et ajustez les types de chambres, unités, tarifs, photos, équipements et statuts."
      actions={
        <AdminButton
          variant="primary"
          onClick={createRoom}
          icon={<Plus className="size-4" />}
          loading={creating}
          disabled={!supabaseConfigured || Boolean(loadError)}
        >
          Nouveau type
        </AdminButton>
      }
    >
      {loadError && (
        <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
            <div>
              <div className="font-bold">
                Impossible de charger les types de chambres depuis Supabase.
              </div>
              <p className="mt-1 leading-6">{loadError}</p>
              {loadErrorDetail && (
                <p className="mt-2 rounded-md bg-background/70 p-2 font-mono text-xs text-foreground">
                  {loadErrorDetail}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {!loadError && roomItems.length !== EXPECTED_ROOM_COUNT && (
        <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
            <div>
              <div className="font-bold">
                {roomItems.length} type{roomItems.length > 1 ? "s" : ""} de chambre chargé
                {roomItems.length > 1 ? "s" : ""} depuis Supabase (attendu : {EXPECTED_ROOM_COUNT}).
              </div>
              <p className="mt-1 leading-6">
                Le site public affiche 4 logements même quand Supabase en renvoie moins, car il
                complète les manquants avec des valeurs par défaut locales. Cette page n'a pas ce
                filet de sécurité : elle montre exactement ce que contient la table{" "}
                <code className="rounded bg-white/60 px-1">room_types</code>. Vérifiez la console
                du navigateur ("Room types (raw rows...)") et la colonne <code>status</code> pour
                les 4 logements attendus.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Photo</th>
                  <th className="px-4 py-3">Chambre</th>
                  <th className="px-4 py-3">Unités</th>
                  <th className="px-4 py-3">Capacité</th>
                  <th className="px-4 py-3">Prix</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {roomItems.map((room) => (
                  <tr key={room.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      <img
                        src={room.images[0] ?? DEFAULT_ROOM_IMAGE}
                        alt={room.name}
                        className="size-14 rounded-md object-cover"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-primary">{room.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {room.type} · {room.beds}
                      </div>
                    </td>
                    <td className="px-4 py-3">{room.totalUnits}</td>
                    <td className="px-4 py-3">{getRoomCapacity(room)} personnes</td>
                    <td className="px-4 py-3 font-semibold">
                      {formatCurrency(room.pricePerNight)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge kind="room" value={room.status} />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => startEditing(room)}
                        className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-primary hover:border-primary"
                      >
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))}
                {roomItems.length === 0 && !loadError && (
                  <tr className="border-t border-border">
                    <td colSpan={7} className="px-4 py-8 text-center text-sm text-muted-foreground">
                      Aucun type de chambre trouvé dans Supabase.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-primary">Modifier le type de chambre</h2>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Les modifications sont enregistrées dans Supabase.
              </p>
            </div>
            {form && (
              <button
                type="button"
                onClick={cancelEditing}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-primary hover:text-primary"
                aria-label="Annuler l'édition"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {form ? (
            <form onSubmit={handleSaveRoom} className="mt-4 space-y-4">
              <AdminField label="Nom">
                <input
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  className="admin-input"
                  required
                />
              </AdminField>
              <AdminField label="Slug">
                <input
                  value={form.slug}
                  onChange={(event) => updateForm("slug", slugify(event.target.value))}
                  className="admin-input"
                  required
                />
              </AdminField>
              <AdminField label="Catégorie">
                <select
                  value={form.category}
                  onChange={(event) => updateForm("category", event.target.value as Room["type"])}
                  className="admin-input"
                >
                  {ROOM_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </AdminField>
              <AdminField label="Description">
                <textarea
                  value={form.description}
                  onChange={(event) => updateForm("description", event.target.value)}
                  className="admin-input min-h-28"
                  required
                />
              </AdminField>
              <div className="grid grid-cols-2 gap-3">
                <AdminField label="Prix / nuit">
                  <input
                    type="number"
                    min={0}
                    value={form.pricePerNight}
                    onChange={(event) => updateForm("pricePerNight", event.target.value)}
                    className="admin-input"
                    required
                  />
                </AdminField>
                <AdminField label="Unités">
                  <input
                    type="number"
                    min={0}
                    value={form.totalUnits}
                    onChange={(event) => updateForm("totalUnits", event.target.value)}
                    className="admin-input"
                    required
                  />
                </AdminField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <AdminField label="Adultes">
                  <input
                    type="number"
                    min={0}
                    value={form.capacityAdults}
                    onChange={(event) => updateForm("capacityAdults", event.target.value)}
                    className="admin-input"
                    required
                  />
                </AdminField>
                <AdminField label="Enfants">
                  <input
                    type="number"
                    min={0}
                    value={form.capacityChildren}
                    onChange={(event) => updateForm("capacityChildren", event.target.value)}
                    className="admin-input"
                    required
                  />
                </AdminField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <AdminField label="Lits">
                  <input
                    value={form.beds}
                    onChange={(event) => updateForm("beds", event.target.value)}
                    className="admin-input"
                    required
                  />
                </AdminField>
                <AdminField label="Salles de bain">
                  <input
                    type="number"
                    min={0}
                    value={form.bathrooms}
                    onChange={(event) => updateForm("bathrooms", event.target.value)}
                    className="admin-input"
                    required
                  />
                </AdminField>
              </div>
              <AdminField label="Statut">
                <select
                  value={form.status}
                  onChange={(event) => updateForm("status", event.target.value as Room["status"])}
                  className="admin-input"
                >
                  {ROOM_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {formatStatus(status)}
                    </option>
                  ))}
                </select>
              </AdminField>
              <AdminField label="Équipements">
                <textarea
                  value={form.amenitiesText}
                  onChange={(event) => updateForm("amenitiesText", event.target.value)}
                  className="admin-input min-h-24"
                  placeholder="Un équipement par ligne ou séparé par virgule"
                />
              </AdminField>
              <AdminField label="Images">
                <textarea
                  value={form.imagesText}
                  onChange={(event) => updateForm("imagesText", event.target.value)}
                  className="admin-input min-h-20"
                  placeholder="/images/rooms/studio.jpg"
                />
              </AdminField>
              {parseList(form.imagesText).length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {parseList(form.imagesText)
                    .slice(0, 3)
                    .map((image) => (
                      <img
                        key={image}
                        src={image}
                        alt={form.name}
                        className="aspect-square rounded-md border border-border object-cover"
                      />
                    ))}
                </div>
              )}
              <div className="flex gap-2 pt-1">
                <AdminButton
                  type="button"
                  variant="secondary"
                  onClick={cancelEditing}
                  className="flex-1"
                  disabled={saving}
                >
                  Annuler
                </AdminButton>
                <AdminButton type="submit" variant="primary" loading={saving} className="flex-1">
                  <Save className="size-4" />
                  Enregistrer
                </AdminButton>
              </div>
            </form>
          ) : (
            <div className="mt-4 rounded-md border border-dashed border-border bg-secondary/50 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-primary">
                Sélectionnez un type de chambre à modifier.
              </p>
              <p className="mt-2 leading-6">
                Le formulaire s'ouvrira ici avec les données Supabase déjà renseignées.
              </p>
            </div>
          )}
        </aside>
      </div>
    </AdminLayout>
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

function mapAdminRoomFromRow(row: AdminRoomRow): AdminRoom {
  const images = [...(row.room_images ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((image) => image.url || image.image_url || "")
    .filter(Boolean);

  return {
    id: row.id,
    slug: row.slug ?? row.id,
    name: row.name,
    type: row.category ?? row.type ?? "Appartement",
    description: row.description,
    pricePerNight: Number(row.price_per_night),
    capacityAdults: row.capacity_adults,
    capacityChildren: row.capacity_children,
    beds: row.beds,
    bathrooms: row.bathrooms,
    totalUnits: row.total_units,
    amenities: (row.room_amenities ?? []).map((amenity) => amenity.amenity).filter(Boolean),
    images,
    status: row.status,
    bookings: [],
    units: [...(row.room_units ?? [])].sort((a, b) => a.unit_number.localeCompare(b.unit_number)),
  };
}

function roomToForm(room: Room): RoomFormState {
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
    imagesText: room.images.join("\n"),
  };
}

function buildRoomUpdatePayload(form: RoomFormState): RoomTypeUpdate {
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
    updated_at: new Date().toISOString(),
  };
}

async function requireAdminSupabase() {
  const configured = isSupabaseConfigured();

  if (import.meta.env.DEV) {
    console.info("[AdminRooms] Supabase configured", configured);
  }

  if (!configured) {
    throw new Error(
      "Supabase n'est pas configuré. Configurez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.",
    );
  }

  const { supabase } = await import("@/lib/supabase/client");
  return supabase;
}

async function replaceRoomAmenities(
  supabase: Awaited<ReturnType<typeof requireAdminSupabase>>,
  roomId: string,
  amenities: string[],
) {
  const deleteResult = await supabase.from("room_amenities").delete().eq("room_type_id", roomId);
  if (deleteResult.error) throw deleteResult.error;

  if (amenities.length === 0) return;

  const insertResult = await supabase.from("room_amenities").insert(
    amenities.map((amenity) => ({
      room_type_id: roomId,
      amenity,
    })),
  );
  if (insertResult.error) throw insertResult.error;
}

async function replaceRoomImages(
  supabase: Awaited<ReturnType<typeof requireAdminSupabase>>,
  roomId: string,
  images: string[],
  roomName: string,
) {
  const deleteResult = await supabase.from("room_images").delete().eq("room_type_id", roomId);
  if (deleteResult.error) throw deleteResult.error;

  if (images.length === 0) return;

  const insertResult = await supabase.from("room_images").insert(
    images.map((url, index) => ({
      room_type_id: roomId,
      url,
      alt_text: roomName,
      sort_order: index + 1,
    })),
  );
  if (insertResult.error) throw insertResult.error;
}

function parseList(value: string) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function toNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function createDraftSlug(rooms: Room[]) {
  const base = `nouveau-type-${Date.now().toString(36)}`;
  const existing = new Set(rooms.map((room) => room.slug ?? room.id));
  if (!existing.has(base)) return base;
  return `${base}-${rooms.length + 1}`;
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatStatus(status: Room["status"]) {
  const labels: Record<Room["status"], string> = {
    active: "Actif",
    maintenance: "Maintenance",
    inactive: "Inactif",
    occupied: "Occupé",
    cleaning_required: "Ménage requis",
  };
  return labels[status];
}

function getSupabaseErrorMessage(error: unknown) {
  if (isPermissionError(error)) {
    return "Permission Supabase refusée. Vérifiez les policies room_types.";
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
