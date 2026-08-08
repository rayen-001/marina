import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Anchor,
  BedDouble,
  CalendarDays,
  ChevronDown,
  CreditCard,
  Crown,
  FileText,
  Home,
  Hotel,
  LogOut,
  Bell,
  MessageCircle,
  Menu,
  Plug,
  Search,
  Settings,
  Table2,
  TrendingUp,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  canAccessAdmin,
  getCurrentAdminProfile,
  signOutAdmin,
  type AdminProfile,
} from "@/lib/auth/adminAuth";
import { cn } from "@/lib/utils";
import {
  getUnreadAdminConversationCount,
  listAdminConversations,
  subscribeToConversationMessages,
  type ConversationSummary,
} from "@/lib/services/messageService";
import { adminButtonClasses } from "./AdminButton";
import { AdminNewReservationButton } from "./AdminNewReservationModal";

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  onReservationCreated?: () => void | Promise<void>;
};

const navItems = [
  { to: "/admin", label: "Tableau de bord", icon: Home },
  { to: "/admin/rooms", label: "Chambres", icon: BedDouble },
  { to: "/admin/reservations", label: "Réservations", icon: Table2 },
  { to: "/admin/messages", label: "Messages clients", icon: MessageCircle },
  { to: "/admin/clients", label: "Clients", icon: Users },
  { to: "/admin/calendar", label: "Calendrier", icon: CalendarDays },
  { to: "/admin/payments", label: "Paiements", icon: CreditCard },
  { to: "/admin/invoices", label: "Factures", icon: FileText },
  { to: "/admin/settings", label: "Paramètres", icon: Settings },
  { to: "/admin/channels", label: "Channels", icon: Plug },
  { to: "/admin/statistics", label: "Statistiques", icon: TrendingUp },
  { to: "/admin/direction", label: "Direction", icon: Crown },
  { to: "/admin/port-tarifs", label: "Tarifs Port", icon: Anchor },
] as const;

export function AdminLayout({
  title,
  description,
  children,
  actions,
  onReservationCreated,
}: Props) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [latestConversations, setLatestConversations] = useState<ConversationSummary[]>([]);
  const visibleNavItems = admin
    ? navItems.filter((item) => canAccessAdmin(admin.role, item.to))
    : navItems;

  useEffect(() => {
    let isMounted = true;

    void getCurrentAdminProfile().then((profile) => {
      if (isMounted) setAdmin(profile);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    let cleanup: (() => void) | undefined;

    const refreshMessages = async () => {
      const [count, summaries] = await Promise.all([
        getUnreadAdminConversationCount(),
        listAdminConversations(),
      ]);
      if (!isMounted) return;
      setUnreadMessages(count);
      setLatestConversations(summaries.slice(0, 3));
    };

    void refreshMessages();
    void subscribeToConversationMessages(() => {
      void refreshMessages();
    }).then((unsubscribe) => {
      cleanup = unsubscribe ?? undefined;
    });

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const logout = async () => {
    await signOutAdmin();
    navigate({ to: "/login" });
  };
  const notificationCount = unreadMessages;

  return (
    <div className="admin-shell min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 overflow-hidden border-r border-white/10 bg-ocean text-white shadow-2xl lg:block">
        <div className="marina-pattern absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-ocean to-[#041d2b]" />
        <div className="relative flex h-full flex-col">
          <BrandBlock />
          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {visibleNavItems.map((item) => (
              <AdminNavLink key={item.to} item={item} pathname={pathname} />
            ))}
          </nav>
          <div className="border-t border-white/10 p-4">
            <div className="rounded-xl border border-white/10 bg-white/8 p-4 text-xs leading-5 text-white/72 shadow-inner">
              <div className="font-semibold text-white">Session sécurisée</div>
              <p className="mt-1">Supabase Auth, rôles admin et politiques RLS restent actifs.</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-border/80 bg-background/76 shadow-sm backdrop-blur-xl">
          <div className="flex min-h-20 flex-col gap-4 px-4 py-4 md:px-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-card text-primary shadow-sm transition hover:border-accent hover:bg-accent/10 lg:hidden"
                  aria-label="Ouvrir le menu admin"
                >
                  <Menu className="size-5" />
                </button>
                <div>
                  <div className="section-kicker">
                    <Hotel className="size-4" />
                    Administration
                  </div>
                  <h1 className="mt-2 text-2xl font-black leading-tight text-primary md:text-3xl">
                    {title}
                  </h1>
                </div>
              </div>
              {description && (
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              )}
            </div>

            <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center md:justify-end">
              <label className="relative min-w-0 md:w-80">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Rechercher client, chambre, facture..."
                  className="admin-input h-11 rounded-xl border-primary/10 bg-card/90 pl-9 shadow-sm"
                />
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {admin && canAccessAdmin(admin.role, "/admin/reservations") && (
                  <AdminNewReservationButton variant="secondary" onCreated={onReservationCreated} />
                )}
                {actions}
                <div className="relative hidden md:block">
                  <button
                    type="button"
                    onClick={() => {
                      setNotificationsOpen((value) => !value);
                      setProfileOpen(false);
                    }}
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-bold text-primary shadow-sm transition hover:border-accent hover:bg-accent/10"
                    aria-expanded={notificationsOpen}
                  >
                    <span className="relative">
                      <Bell className="size-4 text-accent" />
                      {unreadMessages > 0 && (
                        <span className="absolute -right-1 -top-1 size-2 rounded-full bg-destructive ring-2 ring-card" />
                      )}
                    </span>
                    {notificationCount}
                  </button>
                  {notificationsOpen && (
                    <div className="absolute right-0 top-12 z-40 w-80 rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-lift)]">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="text-sm font-black text-primary">Notifications</div>
                        <div className="rounded-full bg-accent/15 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-primary">
                          Live
                        </div>
                      </div>
                      <div className="space-y-2">
                        {latestConversations.length === 0 ? (
                          <div className="rounded-lg border border-dashed border-border bg-background p-3 text-center text-xs text-muted-foreground">
                            Aucune notification pour le moment.
                          </div>
                        ) : (
                          latestConversations.map((item) => (
                            <Link
                              key={item.id}
                              to="/admin/messages"
                              search={{ conversation: item.id }}
                              className="block rounded-lg border border-border bg-background p-3 text-xs transition hover:border-accent"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="font-bold text-primary">{item.clientName}</div>
                                {item.unreadAdminCount > 0 && (
                                  <span className="rounded-full bg-destructive px-2 py-0.5 text-[10px] font-black text-white">
                                    {item.unreadAdminCount}
                                  </span>
                                )}
                              </div>
                              <div className="mt-1 line-clamp-2 leading-5 text-muted-foreground">
                                {item.latestMessage?.body ?? "Conversation client"}
                              </div>
                            </Link>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative hidden md:block">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen((value) => !value);
                      setNotificationsOpen(false);
                    }}
                    className="inline-flex h-11 items-center gap-3 rounded-xl border border-border bg-card px-3 text-left shadow-sm transition hover:border-accent hover:bg-accent/10"
                    aria-expanded={profileOpen}
                  >
                    <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-primary">
                      <UserRound className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block max-w-28 truncate text-xs font-black text-primary">
                        {admin?.name ?? "Admin"}
                      </span>
                      <span className="block max-w-28 truncate text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                        {admin?.role ?? "chargement"}
                      </span>
                    </span>
                    <ChevronDown className="size-4 text-muted-foreground" />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-12 z-40 w-64 rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-lift)]">
                      <div className="rounded-lg bg-secondary p-3">
                        <div className="font-black text-primary">{admin?.name ?? "Admin"}</div>
                        <div className="mt-1 text-xs font-medium text-muted-foreground">
                          {admin?.role ?? "chargement"} | Marina Cap Monastir
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={logout}
                        className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border bg-card text-sm font-bold text-primary transition hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <LogOut className="size-4" />
                        Deconnexion
                      </button>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="hidden size-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive md:inline-flex"
                  title="Déconnexion admin"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 pb-28 pt-6 md:px-6 lg:pb-10">{children}</main>

        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-background/92 p-2 shadow-2xl backdrop-blur-xl lg:hidden">
          {visibleNavItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const active =
              item.to === "/admin" ? pathname === "/admin" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-w-0 flex-col items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-bold text-muted-foreground transition",
                  active && "bg-primary text-primary-foreground shadow-sm",
                )}
              >
                <Icon className="size-4" />
                <span className="max-w-full truncate">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-bold text-muted-foreground transition hover:bg-secondary hover:text-primary"
          >
            <Menu className="size-4" />
            Menu
          </button>
        </nav>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-ocean/65 backdrop-blur-sm"
            aria-label="Fermer le menu admin"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative h-full w-[min(22rem,88vw)] overflow-hidden bg-ocean text-white shadow-2xl">
            <div className="marina-pattern absolute inset-0 opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-ocean to-[#041d2b]" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-white/10">
                <BrandBlock compact />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="mr-4 inline-flex size-10 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white"
                  aria-label="Fermer le menu admin"
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                {visibleNavItems.map((item) => (
                  <AdminNavLink key={item.to} item={item} pathname={pathname} />
                ))}
              </nav>
              <div className="border-t border-white/10 p-4">
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 text-sm font-bold text-white"
                >
                  <LogOut className="size-4" />
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BrandBlock({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-b border-white/10 p-5",
        compact && "border-b-0",
      )}
    >
      <img
        src="/icons/icon-512.png?v=2"
        alt="Marina Cap Monastir"
        className="size-12 rounded-lg object-cover shadow-lg"
      />
      <div className="min-w-0">
        <div className="truncate font-black tracking-tight text-white">Marina Cap Monastir</div>
        <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Extranet hôtelier
        </div>
      </div>
    </div>
  );
}

function AdminNavLink({ item, pathname }: { item: (typeof navItems)[number]; pathname: string }) {
  const Icon = item.icon;
  const active = item.to === "/admin" ? pathname === "/admin" : pathname.startsWith(item.to);

  return (
    <Link
      to={item.to}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-white/72 transition-all duration-200 hover:bg-white/10 hover:text-white",
        active &&
          "bg-white text-primary shadow-lg shadow-black/10 hover:bg-white hover:text-primary",
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-md bg-white/8 text-white/80 transition",
          active && "bg-accent/18 text-primary",
        )}
      >
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 truncate">{item.label}</span>
    </Link>
  );
}
