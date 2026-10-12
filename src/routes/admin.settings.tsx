import { createFileRoute } from "@tanstack/react-router";
import { ImageUp, Save } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminLayout } from "@/components/admin/admin-layout";
import { headT } from "@/lib/i18n/head";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getHotelSettings, updateHotelSettings } from "@/lib/services/settingsService";

export const Route = createFileRoute("/admin/settings")({
  loader: async () => {
    const settings = await getHotelSettings();
    return { settings };
  },
  head: () => ({
    meta: [{ title: headT("Paramètres - Marina Cap Monastir", "Settings - Marina Cap Monastir") }],
  }),
  component: AdminSettings,
});

function AdminSettings() {
  const loaderData = Route.useLoaderData();
  const { t } = useI18n();
  const [settings, setSettings] = useState({ ...loaderData.settings });
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const save = async () => {
    setSaving(true);
    try {
      await updateHotelSettings(settings);
      toast.success(t("Paramètres enregistrés.", "Settings saved."));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("Enregistrement impossible.", "Save failed."),
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout
      title={t("Paramètres hôtel", "Hotel settings")}
      description={t(
        "Configuration prête pour Supabase : identité, facturation, fiscalité et règles de séjour.",
        "Supabase-ready configuration: identity, invoicing, tax and stay rules.",
      )}
      actions={
        <AdminButton
          variant="primary"
          onClick={() => void save()}
          loading={saving}
          icon={<Save className="size-4" />}
        >
          {t("Enregistrer", "Save")}
        </AdminButton>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="grid gap-4 rounded-lg border border-border bg-card p-5 shadow-sm md:grid-cols-2">
          <SettingField label={t("Nom hôtel", "Hotel name")}>
            <input
              value={settings.hotelName}
              onChange={(event) => update("hotelName", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label={t("Téléphone réception", "Reception phone")}>
            <input
              value={settings.phone}
              onChange={(event) => update("phone", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label={t("Fax réception", "Reception fax")}>
            <input
              value={settings.fax}
              onChange={(event) => update("fax", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label={t("Email réception", "Reception email")}>
            <input
              value={settings.email}
              onChange={(event) => update("email", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label={t("Email marketing", "Marketing email")}>
            <input
              value={settings.marketingEmail}
              onChange={(event) => update("marketingEmail", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label={t("Email capitainerie", "Harbour office email")}>
            <input
              value={settings.capitainerieEmail}
              onChange={(event) => update("capitainerieEmail", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label={t("Téléphones capitainerie", "Harbour office phones")}>
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
          <SettingField label={t("Chemin du logo", "Logo path")}>
            <input
              value={settings.logoUrl}
              onChange={(event) => update("logoUrl", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label={t("Matricule fiscale", "Tax ID")}>
            <input
              value={settings.taxRegistration}
              onChange={(event) => update("taxRegistration", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label={t("Préfixe facture", "Invoice prefix")}>
            <input
              value={settings.invoicePrefix}
              onChange={(event) => update("invoicePrefix", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label={t("Devise par défaut", "Default currency")}>
            <select
              value={settings.defaultCurrency}
              onChange={(event) => update("defaultCurrency", event.target.value as "TND" | "EUR")}
              className="admin-input"
            >
              <option value="TND">TND</option>
              <option value="EUR">EUR</option>
            </select>
          </SettingField>
          <SettingField label={t("Heure check-in", "Check-in time")}>
            <input
              type="time"
              value={settings.checkInTime}
              onChange={(event) => update("checkInTime", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label={t("Heure check-out", "Check-out time")}>
            <input
              type="time"
              value={settings.checkOutTime}
              onChange={(event) => update("checkOutTime", event.target.value)}
              className="admin-input"
            />
          </SettingField>
          <SettingField label={t("Taxe", "Tax")}>
            <input
              type="number"
              step="0.01"
              value={settings.taxRate}
              onChange={(event) => update("taxRate", Number(event.target.value))}
              className="admin-input"
            />
          </SettingField>
          <SettingField label={t("Acompte", "Deposit")}>
            <input
              type="number"
              step="0.01"
              value={settings.depositPercentage}
              onChange={(event) => update("depositPercentage", Number(event.target.value))}
              className="admin-input"
            />
          </SettingField>
          <SettingField label={t("Adresse", "Address")}>
            <textarea
              value={settings.address}
              onChange={(event) => update("address", event.target.value)}
              rows={4}
              className="admin-input min-h-24"
            />
          </SettingField>
        </section>

        <aside className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <h2 className="text-lg font-bold text-primary">{t("Logo & média", "Logo & media")}</h2>
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
              {t("Téléverser", "Upload")}
            </button>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            {t(
              "Upload pas encore branché : à connecter à Supabase Storage ou à un back-office média.",
              "Upload not wired yet: connect Supabase Storage or a media back office.",
            )}
          </p>
          <div className="mt-5 rounded-md bg-secondary p-4 text-sm">
            <div className="font-semibold text-primary">{t("Valeurs par défaut", "Defaults")}</div>
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
