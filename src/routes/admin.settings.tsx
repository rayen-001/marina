import { createFileRoute } from "@tanstack/react-router";
import { ImageUp, Save } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminLayout } from "@/components/admin/admin-layout";
import { getHotelSettings, updateHotelSettings } from "@/lib/services/settingsService";

export const Route = createFileRoute("/admin/settings")({
  loader: async () => {
    const settings = await getHotelSettings();
    return { settings };
  },
  head: () => ({
    meta: [{ title: "Paramètres - Marina Cap Monastir" }],
  }),
  component: AdminSettings,
});

function AdminSettings() {
  const loaderData = Route.useLoaderData();
  const [settings, setSettings] = useState({ ...loaderData.settings });
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const save = async () => {
    setSaving(true);
    try {
      await updateHotelSettings(settings);
      toast.success("Paramètres enregistrés.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Enregistrement impossible.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Paramètres hôtel"
      description="Configuration locale prête pour Supabase: identité, facturation, fiscalité et règles de séjour."
      actions={
        <AdminButton
          variant="primary"
          onClick={() => void save()}
          loading={saving}
          icon={<Save className="size-4" />}
        >
          Enregistrer
        </AdminButton>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="grid gap-4 rounded-lg border border-border bg-card p-5 shadow-sm md:grid-cols-2">
          <SettingField label="Nom hôtel">
            <input
              value={settings.hotelName}
              onChange={(event) => update("hotelName", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label="Téléphone réception">
            <input
              value={settings.phone}
              onChange={(event) => update("phone", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label="Fax réception">
            <input
              value={settings.fax}
              onChange={(event) => update("fax", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label="Email réception">
            <input
              value={settings.email}
              onChange={(event) => update("email", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label="Email marketing">
            <input
              value={settings.marketingEmail}
              onChange={(event) => update("marketingEmail", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label="Email capitainerie">
            <input
              value={settings.capitainerieEmail}
              onChange={(event) => update("capitainerieEmail", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label="Téléphones capitainerie">
            <input
              value={settings.capitaineriePhones.join(", ")}
              onChange={(event) =>
                update(
                  "capitaineriePhones",
                  event.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                )
              }
              className="admin-input"
            />
          </SettingField>
          <SettingField label="Logo path">
            <input
              value={settings.logoUrl}
              onChange={(event) => update("logoUrl", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label="Matricule fiscale">
            <input
              value={settings.taxRegistration}
              onChange={(event) => update("taxRegistration", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label="Préfixe facture">
            <input
              value={settings.invoicePrefix}
              onChange={(event) => update("invoicePrefix", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label="Devise par défaut">
            <select
              value={settings.defaultCurrency}
              onChange={(event) => update("defaultCurrency", event.target.value as "TND" | "EUR")}
              className="admin-input"
            >
              <option value="TND">TND</option>
              <option value="EUR">EUR</option>
            </select>
          </SettingField>
          <SettingField label="Heure check-in">
            <input
              type="time"
              value={settings.checkInTime}
              onChange={(event) => update("checkInTime", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label="Heure check-out">
            <input
              type="time"
              value={settings.checkOutTime}
              onChange={(event) => update("checkOutTime", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label="Taxe">
            <input
              type="number"
              step="0.01"
              value={settings.taxRate}
              onChange={(event) => update("taxRate", Number(event.target.value))}
              className="admin-input"
            />
          </SettingField>
          <SettingField label="Acompte">
            <input
              type="number"
              step="0.01"
              value={settings.depositPercentage}
              onChange={(event) => update("depositPercentage", Number(event.target.value))}
              className="admin-input"
            />
          </SettingField>
          <SettingField label="Adresse">
            <textarea
              value={settings.address}
              onChange={(event) => update("address", event.target.value)}
              rows={4}
              className="admin-input min-h-24"
            />
          </SettingField>
        </section>

        <aside className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <h2 className="text-lg font-bold text-primary">Logo & média</h2>
          <div className="mt-4 flex items-center gap-4">
            <img
              src={settings.logoUrl}
              alt={settings.hotelName}
              className="size-20 rounded-md object-cover"
            />
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-primary"
            >
              <ImageUp className="size-4" />
              Upload
            </button>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            Placeholder d'upload. TODO: connecter Supabase Storage ou un back-office média.
          </p>
          <div className="mt-5 rounded-md bg-secondary p-4 text-sm">
            <div className="font-semibold text-primary">Valeurs par défaut</div>
            <p className="mt-2 text-muted-foreground">
              Marina Cap Monastir · TND · Check-in 14:00 · Check-out 11:00.
            </p>
          </div>
        </aside>
      </div>
    </AdminLayout>
  );
}

function SettingField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
