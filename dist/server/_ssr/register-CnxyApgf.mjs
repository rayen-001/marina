import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { d as Route$B, u as useI18n, i as isSupabaseConfigured, e as logoUrl, L as LanguageSwitch, f as getClientSessionProfile, h as linkGuestReservationsToClient, j as registerClient } from "./router-CgbkQim6.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { p as UserPlus } from "../_libs/lucide-react.mjs";
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
function RegisterPage() {
  const navigate = useNavigate();
  const search = Route$B.useSearch();
  const {
    t
  } = useI18n();
  const [fullName, setFullName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const configured = isSupabaseConfigured();
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (password !== confirmPassword) {
      setError(t("Les mots de passe ne correspondent pas.", "Passwords do not match."));
      return;
    }
    setLoading(true);
    try {
      const result = await registerClient({
        fullName,
        email,
        phone,
        password
      });
      if (result.needsEmailConfirmation) {
        setMessage(t("Vérifiez votre email pour activer votre compte, puis connectez-vous.", "Check your email to activate your account, then sign in."));
        return;
      }
      await linkGuestReservationsToClient();
      navigate({
        to: search.redirect ?? "/client"
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : t("Inscription impossible.", "Sign-up failed."));
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "grid min-h-screen bg-secondary/60 lg:grid-cols-[0.9fr_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoUrl, alt: "Marina Cap Monastir", className: "size-12 rounded-md object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black", children: "Marina Cap Monastir" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/70", children: t("Portail client", "Guest portal") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "max-w-xl text-5xl font-black leading-tight", children: t("Créez votre accès client.", "Create your guest account.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-xl text-sm leading-7 text-white/70", children: t("Le portail relie automatiquement vos réservations si l'email correspond à une réservation déjà enregistrée.", "The portal automatically links your bookings when the email matches an existing booking.") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "flex items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-xl shadow-primary/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-11 items-center justify-center rounded-md bg-secondary text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "size-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black text-primary", children: t("Créer un compte", "Create an account") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("Activez votre espace personnel.", "Activate your personal space.") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSwitch, { className: "ml-auto" })
      ] }),
      !configured && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 rounded-md bg-amber-50 p-3 text-sm font-medium text-amber-900", children: t("Supabase n'est pas configuré. La création de compte nécessite Supabase Auth.", "Supabase is not configured. Creating an account requires Supabase Auth.") }),
      search.redirect?.startsWith("/book/") && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 rounded-md bg-primary/8 p-3 text-sm font-medium text-primary", children: t("Vous devez vous connecter ou créer un compte avant de confirmer votre réservation.", "Please sign in or create an account before confirming your booking.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterField, { label: t("Nom complet", "Full name"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: fullName, onChange: (event) => setFullName(event.target.value), className: "admin-input", autoComplete: "name", required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterField, { label: t("Téléphone", "Phone"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: phone, onChange: (event) => setPhone(event.target.value), className: "admin-input", autoComplete: "tel", required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterField, { label: t("Email", "Email"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (event) => setEmail(event.target.value), className: "admin-input", autoComplete: "email", required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterField, { label: t("Mot de passe", "Password"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: (event) => setPassword(event.target.value), className: "admin-input", autoComplete: "new-password", minLength: 6, required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterField, { label: t("Confirmer", "Confirm"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: confirmPassword, onChange: (event) => setConfirmPassword(event.target.value), className: "admin-input", autoComplete: "new-password", minLength: 6, required: true }) })
      ] }),
      message && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-md border border-emerald-500/30 bg-emerald-50/80 p-4 text-sm font-medium text-emerald-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: async () => {
          setLoading(true);
          try {
            const session = await getClientSessionProfile();
            if (session?.profile) {
              await linkGuestReservationsToClient();
              navigate({
                to: search.redirect ?? "/client"
              });
            } else {
              navigate({
                to: "/login"
              });
            }
          } catch {
            navigate({
              to: "/login"
            });
          } finally {
            setLoading(false);
          }
        }, className: "mt-3 inline-flex h-9 items-center gap-2 rounded-md bg-emerald-700 px-4 text-xs font-bold text-white shadow hover:bg-emerald-800", children: t("J'ai confirmé mon email — Se connecter", "I've confirmed my email — Sign in") })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading || !configured, className: "mt-5 w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60", children: loading ? t("Création...", "Creating...") : t("Créer mon compte", "Create my account") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap items-center justify-between gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "font-semibold text-muted-foreground hover:text-primary", children: t("Retour au site", "Back to the website") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", search: search.redirect ? {
          redirect: search.redirect
        } : void 0, className: "font-black text-primary hover:text-accent", children: t("J'ai déjà un compte", "I already have an account") })
      ] })
    ] }) })
  ] });
}
function RegisterField({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground", children: label }),
    children
  ] });
}
export {
  RegisterPage as component
};
