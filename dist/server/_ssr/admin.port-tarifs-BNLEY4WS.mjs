import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { aN as Route$8, u as useI18n, _ as AdminLayout, aH as AdminButton, aO as createPortTariff, aP as updatePortTariff } from "./router-CgbkQim6.mjs";
import "../_libs/seroval.mjs";
import { ab as TriangleAlert, ac as RefreshCw, A as Anchor, m as Save, aH as Trash2, aI as PowerOff, aD as Plus } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
function toDraft(tariff) {
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
    sortOrder: String(tariff.sortOrder)
  };
}
function blankDraft(nextSortOrder) {
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
    sortOrder: String(nextSortOrder)
  };
}
function numToStr(value) {
  return value === null || value === void 0 ? "" : String(value);
}
function strToNum(value) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}
function draftToInput(draft) {
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
    sortOrder: strToNum(draft.sortOrder) ?? 0
  };
}
function AdminPortTarifsPage() {
  const loaderData = Route$8.useLoaderData();
  const router = useRouter();
  const {
    t
  } = useI18n();
  const unknownError = t("Erreur Supabase inconnue.", "Unknown Supabase error.");
  const [drafts, setDrafts] = reactExports.useState(loaderData.tariffs.map(toDraft));
  const [savingId, setSavingId] = reactExports.useState(null);
  const updateDraft = (id, patch) => {
    setDrafts((current) => current.map((draft) => draft.id === id ? {
      ...draft,
      ...patch
    } : draft));
  };
  const addRow = () => {
    const nextSortOrder = drafts.reduce((max, draft) => Math.max(max, Number(draft.sortOrder) || 0), 0) + 1;
    setDrafts((current) => [...current, blankDraft(nextSortOrder)]);
  };
  const removeUnsavedRow = (id) => {
    setDrafts((current) => current.filter((draft) => draft.id !== id));
  };
  const saveRow = async (draft) => {
    if (!draft.category.trim()) {
      toast.error(t("La catégorie est obligatoire.", "The category is required."));
      return;
    }
    setSavingId(draft.id);
    try {
      const input = draftToInput(draft);
      const saved = draft.isNew ? await createPortTariff(input) : await updatePortTariff(draft.id, input);
      setDrafts((current) => current.map((item) => item.id === draft.id ? toDraft(saved) : item));
      toast.success(t("Tarif enregistré.", "Rate saved."));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : unknownError);
    } finally {
      setSavingId(null);
    }
  };
  const toggleActive = async (draft) => {
    if (draft.isNew) {
      updateDraft(draft.id, {
        active: !draft.active
      });
      return;
    }
    setSavingId(draft.id);
    try {
      const saved = await updatePortTariff(draft.id, {
        active: !draft.active
      });
      setDrafts((current) => current.map((item) => item.id === draft.id ? toDraft(saved) : item));
      toast.success(saved.active ? t("Tarif réactivé.", "Rate reactivated.") : t("Tarif désactivé.", "Rate deactivated."));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : unknownError);
    } finally {
      setSavingId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: t("Gestion des Tarifs Port", "Marina rate management"), description: t("Modifiez les tarifs de la Capitainerie affichés sur le site public.", "Edit the harbour office rates shown on the public website."), actions: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminButton, { variant: "primary", onClick: addRow, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }), children: t("Ajouter un tarif", "Add a rate") }), children: [
    loaderData.error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-4 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 font-semibold", children: loaderData.error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminButton, { variant: "outline", size: "sm", onClick: () => void router.invalidate(), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-3.5" }), children: t("Réessayer", "Try again") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { className: "size-3.5" }),
          t("Tarifs d'accostage", "Berthing rates")
        ] }),
        drafts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-dashed border-primary/20 bg-secondary/40 p-8 text-center text-sm text-muted-foreground", children: t("Aucun tarif enregistré. Ajoutez une première ligne de tarif.", "No rates saved yet. Add a first rate row.") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[1180px] text-left text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-secondary/60 text-xs font-black uppercase tracking-[0.1em] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3", children: t("Catégorie", "Category") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3", children: t("Long. min (m)", "Min. length (m)") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3", children: t("Long. max (m)", "Max. length (m)") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3", children: t("Prix jour", "Daily price") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3", children: t("Prix mois", "Monthly price") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3", children: t("Prix an", "Yearly price") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3", children: t("Hivernage", "Wintering") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3", children: t("Devise", "Currency") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3", children: t("Note", "Note") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3", children: t("Actif", "Active") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3", children: t("Actions", "Actions") })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: drafts.map((draft) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border align-top", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: draft.category, onChange: (event) => updateDraft(draft.id, {
              category: event.target.value
            }), className: "admin-input h-10 w-44", placeholder: t("Ex : 7,5 m à 8,49 m", "e.g. 7.5 m to 8.49 m") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", step: "0.01", value: draft.lengthMin, onChange: (event) => updateDraft(draft.id, {
              lengthMin: event.target.value
            }), className: "admin-input h-10 w-24" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", step: "0.01", value: draft.lengthMax, onChange: (event) => updateDraft(draft.id, {
              lengthMax: event.target.value
            }), className: "admin-input h-10 w-24" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", step: "0.01", value: draft.dailyPrice, onChange: (event) => updateDraft(draft.id, {
              dailyPrice: event.target.value
            }), className: "admin-input h-10 w-24" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", step: "0.01", value: draft.monthlyPrice, onChange: (event) => updateDraft(draft.id, {
              monthlyPrice: event.target.value
            }), className: "admin-input h-10 w-24" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", step: "0.01", value: draft.yearlyPrice, onChange: (event) => updateDraft(draft.id, {
              yearlyPrice: event.target.value
            }), className: "admin-input h-10 w-24" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", step: "0.01", value: draft.winteringPrice, onChange: (event) => updateDraft(draft.id, {
              winteringPrice: event.target.value
            }), className: "admin-input h-10 w-24" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: draft.currency, onChange: (event) => updateDraft(draft.id, {
              currency: event.target.value
            }), className: "admin-input h-10 w-16" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: draft.note, onChange: (event) => updateDraft(draft.id, {
              note: event.target.value
            }), className: "admin-input h-10 w-40", placeholder: t("Observation", "Note") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex h-10 items-center gap-2 text-xs font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: draft.active, onChange: (event) => updateDraft(draft.id, {
                active: event.target.checked
              }), className: "size-4" }),
              draft.active ? t("Actif", "Active") : t("Inactif", "Inactive")
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AdminButton, { variant: "primary", size: "sm", loading: savingId === draft.id, onClick: () => void saveRow(draft), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-3.5" }), children: t("Enregistrer", "Save") }),
              draft.isNew ? /* @__PURE__ */ jsxRuntimeExports.jsx(AdminButton, { variant: "ghost", size: "sm", onClick: () => removeUnsavedRow(draft.id), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5" }), children: t("Annuler", "Cancel") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AdminButton, { variant: draft.active ? "outline" : "success", size: "sm", loading: savingId === draft.id, onClick: () => void toggleActive(draft), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PowerOff, { className: "size-3.5" }), children: draft.active ? t("Désactiver", "Deactivate") : t("Réactiver", "Reactivate") })
            ] }) })
          ] }, draft.id)) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  AdminPortTarifsPage as component
};
