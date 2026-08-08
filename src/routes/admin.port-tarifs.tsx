import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AlertTriangle, Anchor, Plus, PowerOff, RefreshCw, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminLayout } from "@/components/admin/admin-layout";
import {
  createPortTariff,
  listPortTariffs,
  updatePortTariff,
  type PortTariff,
  type PortTariffInput,
} from "@/lib/services/portTariffService";

export const Route = createFileRoute("/admin/port-tarifs")({
  loader: async () => {
    try {
      const tariffs = await listPortTariffs();
      return { tariffs, error: null as string | null };
    } catch (error) {
      return {
        tariffs: [] as PortTariff[],
        error: error instanceof Error ? error.message : "Erreur Supabase inconnue.",
      };
    }
  },
  head: () => ({
    meta: [{ title: "Tarifs Port - Marina Cap Monastir" }],
  }),
  component: AdminPortTarifsPage,
});

type Draft = {
  id: string;
  isNew: boolean;
  category: string;
  lengthMin: string;
  lengthMax: string;
  dailyPrice: string;
  monthlyPrice: string;
  yearlyPrice: string;
  winteringPrice: string;
  currency: string;
  note: string;
  active: boolean;
  sortOrder: string;
};

function toDraft(tariff: PortTariff): Draft {
  return {
    id: tariff.id,
    isNew: false,
    category: tariff.category,
    lengthMin: numToStr(tariff.lengthMin),
    lengthMax: numToStr(tariff.lengthMax),
    dailyPrice: numToStr(tariff.dailyPrice),
    monthlyPrice: numToStr(tariff.monthlyPrice),
    yearlyPrice: numToStr(tariff.yearlyPrice),
    winteringPrice: numToStr(tariff.winteringPrice),
    currency: tariff.currency,
    note: tariff.note ?? "",
    active: tariff.active,
    sortOrder: String(tariff.sortOrder),
  };
}

function blankDraft(nextSortOrder: number): Draft {
  return {
    id: `new-${Date.now()}`,
    isNew: true,
    category: "",
    lengthMin: "",
    lengthMax: "",
    dailyPrice: "",
    monthlyPrice: "",
    yearlyPrice: "",
    winteringPrice: "",
    currency: "TND",
    note: "",
    active: true,
    sortOrder: String(nextSortOrder),
  };
}

function numToStr(value: number | null) {
  return value === null || value === undefined ? "" : String(value);
}

function strToNum(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

function draftToInput(draft: Draft): PortTariffInput {
  return {
    category: draft.category.trim(),
    lengthMin: strToNum(draft.lengthMin),
    lengthMax: strToNum(draft.lengthMax),
    dailyPrice: strToNum(draft.dailyPrice),
    monthlyPrice: strToNum(draft.monthlyPrice),
    yearlyPrice: strToNum(draft.yearlyPrice),
    winteringPrice: strToNum(draft.winteringPrice),
    currency: draft.currency.trim() || "TND",
    note: draft.note.trim() || null,
    active: draft.active,
    sortOrder: strToNum(draft.sortOrder) ?? 0,
  };
}

function AdminPortTarifsPage() {
  const loaderData = Route.useLoaderData();
  const router = useRouter();
  const [drafts, setDrafts] = useState<Draft[]>(loaderData.tariffs.map(toDraft));
  const [savingId, setSavingId] = useState<string | null>(null);

  const updateDraft = (id: string, patch: Partial<Draft>) => {
    setDrafts((current) =>
      current.map((draft) => (draft.id === id ? { ...draft, ...patch } : draft)),
    );
  };

  const addRow = () => {
    const nextSortOrder =
      drafts.reduce((max, draft) => Math.max(max, Number(draft.sortOrder) || 0), 0) + 1;
    setDrafts((current) => [...current, blankDraft(nextSortOrder)]);
  };

  const removeUnsavedRow = (id: string) => {
    setDrafts((current) => current.filter((draft) => draft.id !== id));
  };

  const saveRow = async (draft: Draft) => {
    if (!draft.category.trim()) {
      toast.error("La catégorie est obligatoire.");
      return;
    }

    setSavingId(draft.id);
    try {
      const input = draftToInput(draft);
      const saved = draft.isNew
        ? await createPortTariff(input)
        : await updatePortTariff(draft.id, input);
      setDrafts((current) => current.map((item) => (item.id === draft.id ? toDraft(saved) : item)));
      toast.success("Tarif enregistré.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur Supabase inconnue.");
    } finally {
      setSavingId(null);
    }
  };

  const toggleActive = async (draft: Draft) => {
    if (draft.isNew) {
      updateDraft(draft.id, { active: !draft.active });
      return;
    }

    setSavingId(draft.id);
    try {
      const saved = await updatePortTariff(draft.id, { active: !draft.active });
      setDrafts((current) => current.map((item) => (item.id === draft.id ? toDraft(saved) : item)));
      toast.success(saved.active ? "Tarif réactivé." : "Tarif désactivé.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur Supabase inconnue.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <AdminLayout
      title="Gestion des Tarifs Port"
      description="Modifiez les tarifs de la Capitainerie affichés sur le site public."
      actions={
        <AdminButton variant="primary" onClick={addRow} icon={<Plus className="size-4" />}>
          Ajouter un tarif
        </AdminButton>
      }
    >
      {loaderData.error && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive shadow-sm">
          <AlertTriangle className="size-4 shrink-0" />
          <span className="flex-1 font-semibold">{loaderData.error}</span>
          <AdminButton
            variant="outline"
            size="sm"
            onClick={() => void router.invalidate()}
            icon={<RefreshCw className="size-3.5" />}
          >
            Réessayer
          </AdminButton>
        </div>
      )}

      <section className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)]">
        <div className="h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" />
        <div className="p-4 md:p-6">
          <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-accent">
            <Anchor className="size-3.5" />
            Tarifs d'accostage
          </div>

          {drafts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-primary/20 bg-secondary/40 p-8 text-center text-sm text-muted-foreground">
              Aucun tarif enregistré. Ajoutez une première ligne de tarif.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1180px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/60 text-xs font-black uppercase tracking-[0.1em] text-muted-foreground">
                    <th className="px-3 py-3">Catégorie</th>
                    <th className="px-3 py-3">Long. min (m)</th>
                    <th className="px-3 py-3">Long. max (m)</th>
                    <th className="px-3 py-3">Prix jour</th>
                    <th className="px-3 py-3">Prix mois</th>
                    <th className="px-3 py-3">Prix an</th>
                    <th className="px-3 py-3">Hivernage</th>
                    <th className="px-3 py-3">Devise</th>
                    <th className="px-3 py-3">Note</th>
                    <th className="px-3 py-3">Actif</th>
                    <th className="px-3 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {drafts.map((draft) => (
                    <tr key={draft.id} className="border-b border-border align-top">
                      <td className="px-3 py-2">
                        <input
                          value={draft.category}
                          onChange={(event) =>
                            updateDraft(draft.id, { category: event.target.value })
                          }
                          className="admin-input h-10 w-44"
                          placeholder="Ex: 7,5 m à 8,49 m"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          step="0.01"
                          value={draft.lengthMin}
                          onChange={(event) =>
                            updateDraft(draft.id, { lengthMin: event.target.value })
                          }
                          className="admin-input h-10 w-24"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          step="0.01"
                          value={draft.lengthMax}
                          onChange={(event) =>
                            updateDraft(draft.id, { lengthMax: event.target.value })
                          }
                          className="admin-input h-10 w-24"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          step="0.01"
                          value={draft.dailyPrice}
                          onChange={(event) =>
                            updateDraft(draft.id, { dailyPrice: event.target.value })
                          }
                          className="admin-input h-10 w-24"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          step="0.01"
                          value={draft.monthlyPrice}
                          onChange={(event) =>
                            updateDraft(draft.id, { monthlyPrice: event.target.value })
                          }
                          className="admin-input h-10 w-24"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          step="0.01"
                          value={draft.yearlyPrice}
                          onChange={(event) =>
                            updateDraft(draft.id, { yearlyPrice: event.target.value })
                          }
                          className="admin-input h-10 w-24"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          step="0.01"
                          value={draft.winteringPrice}
                          onChange={(event) =>
                            updateDraft(draft.id, { winteringPrice: event.target.value })
                          }
                          className="admin-input h-10 w-24"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          value={draft.currency}
                          onChange={(event) =>
                            updateDraft(draft.id, { currency: event.target.value })
                          }
                          className="admin-input h-10 w-16"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          value={draft.note}
                          onChange={(event) => updateDraft(draft.id, { note: event.target.value })}
                          className="admin-input h-10 w-40"
                          placeholder="Observation"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <label className="inline-flex h-10 items-center gap-2 text-xs font-bold">
                          <input
                            type="checkbox"
                            checked={draft.active}
                            onChange={(event) =>
                              updateDraft(draft.id, { active: event.target.checked })
                            }
                            className="size-4"
                          />
                          {draft.active ? "Actif" : "Inactif"}
                        </label>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex flex-wrap gap-2">
                          <AdminButton
                            variant="primary"
                            size="sm"
                            loading={savingId === draft.id}
                            onClick={() => void saveRow(draft)}
                            icon={<Save className="size-3.5" />}
                          >
                            Enregistrer
                          </AdminButton>
                          {draft.isNew ? (
                            <AdminButton
                              variant="ghost"
                              size="sm"
                              onClick={() => removeUnsavedRow(draft.id)}
                              icon={<Trash2 className="size-3.5" />}
                            >
                              Annuler
                            </AdminButton>
                          ) : (
                            <AdminButton
                              variant={draft.active ? "outline" : "success"}
                              size="sm"
                              loading={savingId === draft.id}
                              onClick={() => void toggleActive(draft)}
                              icon={<PowerOff className="size-3.5" />}
                            >
                              {draft.active ? "Désactiver" : "Réactiver"}
                            </AdminButton>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
}
