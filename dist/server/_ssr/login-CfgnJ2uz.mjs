import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { o as Route$y, u as useI18n, i as isSupabaseConfigured, p as getCurrentSessionProfile, e as logoUrl, L as LanguageSwitch, q as isAdminRole, s as signInWithPasswordAndProfile, h as linkGuestReservationsToClient, t as getDefaultPathForRole } from "./router-CgbkQim6.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { s as ShieldCheck, V as LockKeyhole } from "../_libs/lucide-react.mjs";
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
function LoginPage() {
  const navigate = useNavigate();
  const search = Route$y.useSearch();
  const {
    t
  } = useI18n();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [checkingSession, setCheckingSession] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const configured = isSupabaseConfigured();
  reactExports.useEffect(() => {
    let mounted = true;
    void getCurrentSessionProfile().then((context) => {
      if (!mounted || !context) return;
      navigateToRole(navigate, context.profile.role, search.redirect);
    }).catch(() => {
    }).finally(() => {
      if (mounted) setCheckingSession(false);
    });
    return () => {
      mounted = false;
    };
  }, [navigate, search.redirect]);
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const context = await signInWithPasswordAndProfile(email, password);
      if (context.profile.role === "client") await linkGuestReservationsToClient();
      navigateToRole(navigate, context.profile.role, search.redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("Connexion impossible.", "Sign-in failed."));
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "grid min-h-screen bg-secondary/60 lg:grid-cols-[0.95fr_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoUrl, alt: "Marina Cap Monastir", className: "size-12 rounded-md object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black", children: "Marina Cap Monastir" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/70", children: t("Admin & client", "Admin & guests") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-4 text-accent" }),
          "Supabase Auth"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "max-w-xl text-5xl font-black leading-tight", children: t("Accès sécurisé aux espaces Marina Cap Monastir.", "Secure access to your Marina Cap Monastir account.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-xl text-sm leading-7 text-white/70", children: t("Utilisez le même formulaire pour l'administration et le portail client. Le rôle du profil détermine automatiquement l'espace d'arrivée.", "Use the same form for the administration and the guest portal. Your profile role decides where you land.") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "flex items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl shadow-primary/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-11 items-center justify-center rounded-md bg-secondary text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, { className: "size-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black text-primary", children: t("Connexion", "Sign in") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("Email et mot de passe.", "Email and password.") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSwitch, { className: "ml-auto" })
      ] }),
      !configured && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 rounded-md bg-amber-50 p-3 text-sm font-medium text-amber-900", children: t("Supabase n'est pas configuré. La connexion nécessite VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.", "Supabase is not configured. Signing in requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.") }),
      search.redirect?.startsWith("/book/") && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 rounded-md bg-primary/8 p-3 text-sm font-medium text-primary", children: t("Vous devez vous connecter ou créer un compte avant de confirmer votre réservation.", "Please sign in or create an account before confirming your booking.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground", children: t("Email", "Email") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (event) => setEmail(event.target.value), className: "admin-input", placeholder: t("nom@exemple.com", "name@example.com"), autoComplete: "email", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-4 block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground", children: t("Mot de passe", "Password") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: (event) => setPassword(event.target.value), className: "admin-input", placeholder: "********", autoComplete: "current-password", required: true })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading || checkingSession || !configured, className: "mt-5 w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60", children: loading || checkingSession ? t("Vérification...", "Checking...") : t("Se connecter", "Sign in") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap items-center justify-between gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "font-semibold text-muted-foreground hover:text-primary", children: t("Retour au site public", "Back to the website") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", search: search.redirect ? {
          redirect: search.redirect
        } : void 0, className: "font-black text-primary hover:text-accent", children: t("Créer un compte", "Create an account") })
      ] })
    ] }) })
  ] });
}
function navigateToRole(navigate, role, redirectPath) {
  const canUseRedirect = redirectPath && (role === "capitainerie" && redirectPath.startsWith("/admin/port-tarifs") || isAdminRole(role) && redirectPath.startsWith("/admin") || role === "client" && (redirectPath.startsWith("/client") || redirectPath.startsWith("/book/")));
  const target = canUseRedirect ? redirectPath : getDefaultPathForRole(role);
  navigate({
    to: target
  });
}
export {
  LoginPage as component
};
