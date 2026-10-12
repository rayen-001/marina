import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { aG as Route$b, u as useI18n, _ as AdminLayout, aH as AdminButton, aI as updateHotelSettings } from "./router-CgbkQim6.mjs";
import "../_libs/seroval.mjs";
import { aG as ImageUp, m as Save } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "./server-4up-b2hM.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
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
function AdminSettings() {
  const loaderData = Route$b.useLoaderData();
  const {
    t
  } = useI18n();
  const [settings, setSettings] = reactExports.useState({
    ...loaderData.settings
  });
  const [saving, setSaving] = reactExports.useState(false);
  const update = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value
    }));
  };
  const save = async () => {
    setSaving(true);
    try {
      await updateHotelSettings(settings);
      toast.success(t("Paramètres enregistrés.", "Settings saved."));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("Enregistrement impossible.", "Save failed."));
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: t("Paramètres hôtel", "Hotel settings"), description: t("Configuration prête pour Supabase : identité, facturation, fiscalité et règles de séjour.", "Supabase-ready configuration: identity, invoicing, tax and stay rules."), actions: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminButton, { variant: "primary", onClick: () => void save(), loading: saving, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-4" }), children: t("Enregistrer", "Save") }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-[1fr_360px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 rounded-lg border border-border bg-card p-5 shadow-sm md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: t("Nom hôtel", "Hotel name"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: settings.hotelName, onChange: (event) => update("hotelName", event.target.value), className: "admin-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: t("Téléphone réception", "Reception phone"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: settings.phone, onChange: (event) => update("phone", event.target.value), className: "admin-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: t("Fax réception", "Reception fax"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: settings.fax, onChange: (event) => update("fax", event.target.value), className: "admin-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: t("Email réception", "Reception email"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: settings.email, onChange: (event) => update("email", event.target.value), className: "admin-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: t("Email marketing", "Marketing email"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: settings.marketingEmail, onChange: (event) => update("marketingEmail", event.target.value), className: "admin-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: t("Email capitainerie", "Harbour office email"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: settings.capitainerieEmail, onChange: (event) => update("capitainerieEmail", event.target.value), className: "admin-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: t("Téléphones capitainerie", "Harbour office phones"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: settings.capitaineriePhones.join(", "), onChange: (event) => update("capitaineriePhones", event.target.value.split(",").map((item) => item.trim()).filter(Boolean)), className: "admin-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: t("Chemin du logo", "Logo path"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: settings.logoUrl, onChange: (event) => update("logoUrl", event.target.value), className: "admin-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: t("Matricule fiscale", "Tax ID"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: settings.taxRegistration, onChange: (event) => update("taxRegistration", event.target.value), className: "admin-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: t("Préfixe facture", "Invoice prefix"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: settings.invoicePrefix, onChange: (event) => update("invoicePrefix", event.target.value), className: "admin-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: t("Devise par défaut", "Default currency"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: settings.defaultCurrency, onChange: (event) => update("defaultCurrency", event.target.value), className: "admin-input", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "TND", children: "TND" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "EUR", children: "EUR" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: t("Heure check-in", "Check-in time"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "time", value: settings.checkInTime, onChange: (event) => update("checkInTime", event.target.value), className: "admin-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: t("Heure check-out", "Check-out time"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "time", value: settings.checkOutTime, onChange: (event) => update("checkOutTime", event.target.value), className: "admin-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: t("Taxe", "Tax"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", step: "0.01", value: settings.taxRate, onChange: (event) => update("taxRate", Number(event.target.value)), className: "admin-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: t("Acompte", "Deposit"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", step: "0.01", value: settings.depositPercentage, onChange: (event) => update("depositPercentage", Number(event.target.value)), className: "admin-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: t("Adresse", "Address"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: settings.address, onChange: (event) => update("address", event.target.value), rows: 4, className: "admin-input min-h-24" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-lg border border-border bg-card p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-primary", children: t("Logo & média", "Logo & media") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: settings.logoUrl, alt: settings.hotelName, className: "size-20 rounded-md object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUp, { className: "size-4" }),
          t("Téléverser", "Upload")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs leading-5 text-muted-foreground", children: t("Upload pas encore branché : à connecter à Supabase Storage ou à un back-office média.", "Upload not wired yet: connect Supabase Storage or a media back office.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-md bg-secondary p-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-primary", children: t("Valeurs par défaut", "Defaults") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Marina Cap Monastir · TND · Check-in 14:00 · Check-out 11:00." })
      ] })
    ] })
  ] }) });
}
function SettingField({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground", children: label }),
    children
  ] });
}
export {
  AdminSettings as component
};
