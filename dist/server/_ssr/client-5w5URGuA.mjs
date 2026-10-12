import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { Q as publicClientRoutes, u as useI18n, M as subscribeToConversationMessages, p as getCurrentSessionProfile, t as getDefaultPathForRole, f as getClientSessionProfile, N as tr, L as LanguageSwitch, O as getUnreadClientConversationCount, P as signOutClient, e as logoUrl } from "./router-CgbkQim6.mjs";
import { d as useRouterState, O as Outlet, e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { H as House, a7 as CalendarCheck, M as MessageCircle, h as UserRound, G as Globe, L as LogOut, d as Menu, X } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./server-4up-b2hM.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
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
const navItems = [
  { to: "/client", label: { fr: "Tableau de bord", en: "Dashboard" }, icon: House },
  {
    to: "/client/reservations",
    label: { fr: "Mes réservations", en: "My bookings" },
    icon: CalendarCheck
  },
  { to: "/client/messages", label: { fr: "Messages", en: "Messages" }, icon: MessageCircle },
  { to: "/client/profile", label: { fr: "Profil", en: "Profile" }, icon: UserRound }
];
function ClientLayout({ children }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const { t } = useI18n();
  const [profile, setProfile] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const [unreadCount, setUnreadCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!profile) return;
    let mounted = true;
    let cleanupFn;
    const updateUnread = async () => {
      try {
        const count = await getUnreadClientConversationCount();
        if (mounted) setUnreadCount(count);
      } catch {
      }
    };
    void updateUnread();
    const handleReadEvent = () => {
      void updateUnread();
    };
    window.addEventListener("messages_marked_read", handleReadEvent);
    void subscribeToConversationMessages(() => {
      void updateUnread();
    }).then((fn) => {
      if (mounted && fn) cleanupFn = fn;
      else fn?.();
    }).catch(() => {
    });
    return () => {
      mounted = false;
      window.removeEventListener("messages_marked_read", handleReadEvent);
      cleanupFn?.();
    };
  }, [pathname, profile]);
  reactExports.useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    void getCurrentSessionProfile().then(async (rawContext) => {
      if (!mounted) return;
      if (!rawContext) {
        navigate({ to: "/login", search: { redirect: pathname } });
        return;
      }
      if (rawContext.profile.role !== "client") {
        navigate({ to: getDefaultPathForRole(rawContext.profile.role) });
        return;
      }
      const context = await getClientSessionProfile();
      if (!mounted || !context) return;
      setProfile(context.profile);
    }).catch((err) => {
      if (!mounted) return;
      setError(
        err instanceof Error ? err.message : tr("Session client indisponible.", "Guest session unavailable.")
      );
    }).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [navigate, pathname]);
  const logout = async () => {
    await signOutClient();
    navigate({ to: "/login" });
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex min-h-screen items-center justify-center bg-secondary/60 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm rounded-lg border border-border bg-card p-5 text-center shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-3 size-10 animate-pulse rounded-lg bg-secondary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black text-primary", children: t("Chargement du portail client", "Loading the guest portal") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t("Vérification de votre session.", "Checking your session.") })
    ] }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex min-h-screen items-center justify-center bg-secondary/60 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg rounded-lg border border-destructive/30 bg-card p-5 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-black text-destructive", children: t("Portail client indisponible", "Guest portal unavailable") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-6 text-muted-foreground", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: logout, className: "admin-action mt-4", children: t("Retour à la connexion", "Back to sign-in") })
    ] }) });
  }
  if (!profile?.active) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex min-h-screen items-center justify-center bg-secondary/60 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg rounded-lg border border-amber-300 bg-card p-5 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-black text-primary", children: t("Compte client bloqué", "Guest account blocked") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-6 text-muted-foreground", children: t(
        "Votre compte client est inactif. Contactez la réception pour réactiver l'accès au portail.",
        "Your guest account is inactive. Contact reception to reactivate portal access."
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: logout, className: "admin-action mt-4", children: t("Déconnexion", "Sign out") })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-shell min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "fixed inset-y-0 left-0 z-40 hidden w-72 flex-col bg-primary text-primary-foreground shadow-[var(--shadow-premium)] lg:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ClientBrand, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 space-y-1 overflow-y-auto px-4 py-3", children: [
        navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ClientNavItem,
          {
            item,
            pathname,
            unreadCount: item.to === "/client/messages" ? unreadCount : 0
          },
          item.to
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "flex items-center gap-3 rounded-lg border border-accent/40 bg-accent/20 px-3 py-2.5 text-sm font-black text-accent-light transition hover:bg-accent/35 hover:text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "size-4" }),
              t("Retour au site Web", "Back to the website")
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/10 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSwitch, { className: "mb-3 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 rounded-lg border border-white/10 bg-white/8 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-black", children: profile.fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 truncate text-xs text-white/65", children: profile.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: logout,
            className: "inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 text-sm font-bold text-white transition hover:bg-white/20",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
              t("Déconnexion", "Sign out")
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 border-b border-border bg-card/92 px-4 py-3 shadow-sm backdrop-blur lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ClientBrand, { compact: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSwitch, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setMenuOpen(true),
            className: "inline-flex size-10 items-center justify-center rounded-md border border-border bg-background text-primary",
            "aria-label": t("Ouvrir le menu client", "Open the guest menu"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-5" })
          }
        )
      ] })
    ] }) }),
    menuOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-primary/50 backdrop-blur-sm lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full w-[min(22rem,88vw)] flex-col bg-primary text-white shadow-[var(--shadow-lift)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-white/10 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClientBrand, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setMenuOpen(false),
            className: "inline-flex size-10 items-center justify-center rounded-md border border-white/15 bg-white/10",
            "aria-label": t("Fermer le menu client", "Close the guest menu"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 space-y-1 overflow-y-auto px-4 py-3", children: [
        navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ClientNavItem,
          {
            item,
            pathname,
            unreadCount: item.to === "/client/messages" ? unreadCount : 0,
            onClick: () => setMenuOpen(false)
          },
          item.to
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            onClick: () => setMenuOpen(false),
            className: "flex items-center gap-3 rounded-lg border border-accent/40 bg-accent/20 px-3 py-2.5 text-sm font-black text-accent-light transition hover:bg-accent/35 hover:text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "size-4" }),
              t("Retour au site Web", "Back to the website")
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: logout,
          className: "inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 text-sm font-bold",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
            t("Déconnexion", "Sign out")
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen px-4 py-5 lg:ml-72 lg:px-8 lg:py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl", children }) })
  ] });
}
function ClientBrand({ compact = false }) {
  const { t } = useI18n();
  const titleClass = compact ? "text-primary" : "text-white";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: `flex items-center gap-3 transition hover:opacity-90 ${compact ? "" : "p-4"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoUrl, alt: "Marina Cap Monastir", className: "size-11 rounded-md object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `truncate font-black tracking-tight ${titleClass}`, children: "Marina Cap Monastir" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent", children: t("Portail client", "Guest portal") })
    ] })
  ] });
}
function ClientNavItem({
  item,
  pathname,
  unreadCount = 0,
  onClick
}) {
  const { pick } = useI18n();
  const active = item.to === "/client" ? pathname === "/client" || pathname === "/client/dashboard" : pathname === item.to;
  const Icon = item.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: item.to,
      onClick,
      className: `flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm font-bold transition ${active ? "bg-white text-primary shadow-sm" : "text-white/78 hover:bg-white/10 hover:text-white"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: pick(item.label) })
        ] }),
        unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-destructive px-2 py-0.5 text-xs font-black text-white shadow-sm", children: unreadCount })
      ]
    }
  );
}
function ClientRoute() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname
  });
  if (publicClientRoutes.has(pathname)) return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ClientLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
export {
  ClientRoute as component
};
