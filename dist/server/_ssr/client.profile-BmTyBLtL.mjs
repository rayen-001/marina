import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useI18n, f as getClientSessionProfile, N as tr } from "./router-CgbkQim6.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { h as UserRound, Z as Mail, Y as Phone, s as ShieldCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
function ClientProfilePage() {
  const {
    t
  } = useI18n();
  const [profile, setProfile] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
    let mounted = true;
    void getClientSessionProfile().then((context) => {
      if (mounted) setProfile(context?.profile ?? null);
    }).catch((err) => {
      if (mounted) {
        setError(err instanceof Error ? err.message : tr("Profil indisponible.", "Profile unavailable."));
      }
    }).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "size-4" }),
        t("Profil", "Profile")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-3xl font-black text-primary", children: t("Mon profil", "My profile") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: t("Informations de compte utilisées pour lier vos réservations.", "Account details used to link your bookings.") })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-40 w-full" }) : profile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileTile, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "size-5" }), label: t("Nom", "Name"), value: profile.fullName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileTile, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-5" }), label: t("Email", "Email"), value: profile.email }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileTile, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-5" }), label: t("Téléphone", "Phone"), value: profile.phone ?? "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileTile, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-5" }), label: t("Statut", "Status"), value: profile.active ? t("Compte actif", "Active account") : t("Compte inactif", "Inactive account") })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: t("Profil client introuvable.", "Guest profile not found.") }) })
  ] });
}
function ProfileTile({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-background p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 items-center justify-center rounded-lg bg-accent/15 text-primary", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-black uppercase tracking-[0.12em] text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-black text-primary", children: value })
    ] })
  ] }) });
}
export {
  ClientProfilePage as component
};
