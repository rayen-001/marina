import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, b as getServerFnById } from "./server-4up-b2hM.mjs";
import { u as useI18n, a0 as adminButtonClasses, v as getSupabaseOrNull } from "./router-CgbkQim6.mjs";
import { p as UserPlus, X } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const createClientAccountInput = objectType({
  accessToken: stringType().min(1),
  fullName: stringType().min(1, "Nom complet requis."),
  email: stringType().email("Email client invalide."),
  password: stringType().min(6, "Le mot de passe doit contenir au moins 6 caracteres."),
  phone: stringType().optional()
});
const createClientAccount = createServerFn({
  method: "POST"
}).inputValidator(createClientAccountInput).handler(createSsrRpc("2f6f4cf0a18d2bb6dec41631fdad1a27506754df9e2936b62d5e8770d543f422"));
function CreateClientAccountButton({ onCreated }) {
  const { t } = useI18n();
  const [open, setOpen] = reactExports.useState(false);
  const [fullName, setFullName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const reset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setError("");
  };
  const close = () => {
    if (loading) return;
    reset();
    setOpen(false);
  };
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = await getSupabaseOrNull();
      if (!supabase)
        throw new Error(t("Supabase n'est pas configuré.", "Supabase is not configured."));
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw new Error(sessionError.message);
      const token = data.session?.access_token;
      if (!token) throw new Error(t("Session admin requise.", "Admin session required."));
      await createClientAccount({
        data: {
          accessToken: token,
          fullName,
          email,
          phone,
          password
        }
      });
      toast.success(t("Compte client créé.", "Guest account created."));
      reset();
      setOpen(false);
      await onCreated?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : t("Création du compte client impossible.", "The guest account could not be created.");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen(true),
        className: adminButtonClasses("primary", "md"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "size-4" }),
          t("Créer compte client", "Create guest account")
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-ocean/65 px-4 py-8 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "absolute inset-0",
          "aria-label": t("Fermer", "Close"),
          onClick: close
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: submit,
          className: "relative w-full max-w-lg rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-lift)]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "size-4" }),
                  t("Client", "Guest")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-xl font-black text-primary", children: t("Créer compte client", "Create guest account") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: close,
                  className: "inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition hover:text-primary",
                  "aria-label": t("Fermer", "Close"),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AdminClientField, { label: t("Nom complet", "Full name"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: fullName,
                  onChange: (event) => setFullName(event.target.value),
                  className: "admin-input",
                  autoComplete: "name",
                  required: true
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AdminClientField, { label: t("Téléphone", "Phone"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: phone,
                  onChange: (event) => setPhone(event.target.value),
                  className: "admin-input",
                  autoComplete: "tel"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AdminClientField, { label: t("Email", "Email"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "email",
                  value: email,
                  onChange: (event) => setEmail(event.target.value),
                  className: "admin-input",
                  autoComplete: "email",
                  required: true
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AdminClientField, { label: t("Mot de passe", "Password"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "password",
                  value: password,
                  onChange: (event) => setPassword(event.target.value),
                  className: "admin-input",
                  autoComplete: "new-password",
                  minLength: 6,
                  required: true
                }
              ) })
            ] }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 rounded-md bg-destructive/10 p-3 text-sm font-semibold text-destructive", children: error }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: close,
                  disabled: loading,
                  className: adminButtonClasses("outline", "md"),
                  children: t("Annuler", "Cancel")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "submit",
                  disabled: loading,
                  className: adminButtonClasses("primary", "md"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "size-4" }),
                    loading ? t("Création...", "Creating...") : t("Créer", "Create")
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] });
}
function AdminClientField({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground", children: label }),
    children
  ] });
}
export {
  CreateClientAccountButton as C
};
