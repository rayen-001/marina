import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { CalendarCheck, Globe, Home, LogOut, Menu, MessageCircle, UserRound, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import logoUrl from "@/assets/marina-logo.png";
import { getClientSessionProfile, signOutClient, type ClientProfile } from "@/lib/auth/clientAuth";
import { getCurrentSessionProfile, getDefaultPathForRole } from "@/lib/auth/profilesAuth";

type Props = {
  children: React.ReactNode;
};

const navItems = [
  { to: "/client", label: "Dashboard", icon: Home },
  { to: "/client/reservations", label: "Mes réservations", icon: CalendarCheck },
  { to: "/client/messages", label: "Messages", icon: MessageCircle },
  { to: "/client/profile", label: "Profil", icon: UserRound },
] as const;

export function ClientLayout({ children }: Props) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!profile) return;

    let mounted = true;
    let cleanupFn: (() => void) | undefined;

    const updateUnread = async () => {
      try {
        const count = await getUnreadClientConversationCount();
        if (mounted) setUnreadCount(count);
      } catch {}
    };

    void updateUnread();
    void subscribeToConversationMessages(() => {
      void updateUnread();
    })
      .then((fn) => {
        if (mounted && fn) cleanupFn = fn;
        else fn?.();
      })
      .catch(() => {});

    return () => {
      mounted = false;
      cleanupFn?.();
    };
  }, [pathname, profile]);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError("");
    void getCurrentSessionProfile()
      .then(async (rawContext) => {
        if (!mounted) return;

        if (!rawContext) {
          navigate({ to: "/login", search: { redirect: pathname } });
          return;
        }

        if (rawContext.profile.role !== "client") {
          navigate({ to: getDefaultPathForRole(rawContext.profile.role) as never });
          return;
        }

        const context = await getClientSessionProfile();
        if (!mounted || !context) return;
        setProfile(context.profile);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : "Session client indisponible.");
      })
      .finally(() => {
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
    return (
      <main className="flex min-h-screen items-center justify-center bg-secondary/60 px-4">
        <div className="w-full max-w-sm rounded-lg border border-border bg-card p-5 text-center shadow-[var(--shadow-soft)]">
          <div className="mx-auto mb-3 size-10 animate-pulse rounded-lg bg-secondary" />
          <div className="font-black text-primary">Chargement du portail client</div>
          <p className="mt-2 text-sm text-muted-foreground">Vérification de votre session.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-secondary/60 px-4">
        <div className="w-full max-w-lg rounded-lg border border-destructive/30 bg-card p-5 shadow-[var(--shadow-soft)]">
          <h1 className="text-lg font-black text-destructive">Portail client indisponible</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{error}</p>
          <button type="button" onClick={logout} className="admin-action mt-4">
            Retour à la connexion
          </button>
        </div>
      </main>
    );
  }

  if (!profile?.active) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-secondary/60 px-4">
        <div className="w-full max-w-lg rounded-lg border border-amber-300 bg-card p-5 shadow-[var(--shadow-soft)]">
          <h1 className="text-lg font-black text-primary">Compte client bloqué</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Votre compte client est inactif. Contactez la réception pour réactiver l'accès au
            portail.
          </p>
          <button type="button" onClick={logout} className="admin-action mt-4">
            Déconnexion
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="admin-shell min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col bg-primary text-primary-foreground shadow-[var(--shadow-premium)] lg:flex">
        <ClientBrand />
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-3">
          {navItems.map((item) => (
            <ClientNavItem
              key={item.to}
              item={item}
              pathname={pathname}
              unreadCount={item.to === "/client/messages" ? unreadCount : 0}
            />
          ))}
          <div className="pt-3">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-lg border border-accent/40 bg-accent/20 px-3 py-2.5 text-sm font-black text-accent-light transition hover:bg-accent/35 hover:text-white"
            >
              <Globe className="size-4" />
              Retour au site Web
            </Link>
          </div>
        </nav>
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 rounded-lg border border-white/10 bg-white/8 p-3">
            <div className="truncate text-sm font-black">{profile.fullName}</div>
            <div className="mt-1 truncate text-xs text-white/65">{profile.email}</div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 text-sm font-bold text-white transition hover:bg-white/20"
          >
            <LogOut className="size-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-border bg-card/92 px-4 py-3 shadow-sm backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <ClientBrand compact />
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-background text-primary"
            aria-label="Ouvrir le menu client"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-primary/50 backdrop-blur-sm lg:hidden">
          <div className="flex h-full w-[min(22rem,88vw)] flex-col bg-primary text-white shadow-[var(--shadow-lift)]">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <ClientBrand />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-md border border-white/15 bg-white/10"
                aria-label="Fermer le menu client"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-3">
              {navItems.map((item) => (
                <ClientNavItem
                  key={item.to}
                  item={item}
                  pathname={pathname}
                  unreadCount={item.to === "/client/messages" ? unreadCount : 0}
                  onClick={() => setMenuOpen(false)}
                />
              ))}
              <div className="pt-3">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg border border-accent/40 bg-accent/20 px-3 py-2.5 text-sm font-black text-accent-light transition hover:bg-accent/35 hover:text-white"
                >
                  <Globe className="size-4" />
                  Retour au site Web
                </Link>
              </div>
            </nav>
            <div className="border-t border-white/10 p-4">
              <button
                type="button"
                onClick={logout}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 text-sm font-bold"
              >
                <LogOut className="size-4" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="min-h-screen px-4 py-5 lg:ml-72 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}

function ClientBrand({ compact = false }: { compact?: boolean }) {
  const titleClass = compact ? "text-primary" : "text-white";

  return (
    <Link to="/" className={`flex items-center gap-3 transition hover:opacity-90 ${compact ? "" : "p-4"}`}>
      <img src={logoUrl} alt="Marina Cap Monastir" className="size-11 rounded-md object-cover" />
      <div className="min-w-0">
        <div className={`truncate font-black tracking-tight ${titleClass}`}>
          Marina Cap Monastir
        </div>
        <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Portail client
        </div>
      </div>
    </Link>
  );
}

function ClientNavItem({
  item,
  pathname,
  unreadCount = 0,
  onClick,
}: {
  item: (typeof navItems)[number];
  pathname: string;
  unreadCount?: number;
  onClick?: () => void;
}) {
  const active =
    item.to === "/client"
      ? pathname === "/client" || pathname === "/client/dashboard"
      : pathname === item.to;
  const Icon = item.icon;

  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={`flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm font-bold transition ${
        active
          ? "bg-white text-primary shadow-sm"
          : "text-white/78 hover:bg-white/10 hover:text-white"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Icon className="size-4 shrink-0" />
        <span className="truncate">{item.label}</span>
      </div>
      {unreadCount > 0 && (
        <span className="rounded-full bg-destructive px-2 py-0.5 text-xs font-black text-white shadow-sm">
          {unreadCount}
        </span>
      )}
    </Link>
  );
}
