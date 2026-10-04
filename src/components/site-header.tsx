import { Link, useNavigate } from "@tanstack/react-router";
import {
  Anchor,
  CalendarCheck,
  ChevronDown,
  Menu,
  Phone,
  ShipWheel,
  User,
  UserPlus,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getCurrentSessionProfile,
  isAdminRole,
  signOut,
  type SessionProfile,
} from "@/lib/auth/profilesAuth";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getSupabaseOrNull } from "@/lib/supabase/serviceHelpers";
import { FloatingBookButton } from "./floating-book-button";
import { LanguageSwitch } from "./language-switch";

type Translate = ReturnType<typeof useI18n>["t"];

function getPortLinks(t: Translate): { label: string; to: string }[] {
  return [
    { label: t("Présentation du Port", "About the marina"), to: "/port-de-plaisance" },
    { label: t("Plan du Port", "Marina map"), to: "/port-de-plaisance/plan" },
    {
      label: t("Réservation Port de Plaisance", "Berth booking"),
      to: "/port-de-plaisance/reservation",
    },
    {
      label: t("Formalités d'entrée et de sortie", "Entry & exit formalities"),
      to: "/port-de-plaisance/formalites",
    },
    { label: t("Tarifs Port", "Marina rates"), to: "/port-de-plaisance/tarifs" },
  ];
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  const portLinks = getPortLinks(t);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-white/96 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
            <img
              src="/icons/icon-512.png"
              alt="Marina Cap Monastir"
              className="size-10 rounded-lg object-cover shadow-sm"
            />
            <div className="hidden leading-tight sm:block">
              <div className="text-sm font-black tracking-wide text-primary">
                Marina Cap Monastir
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t("Appart-hôtel & port", "Aparthotel & marina")}
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-4 whitespace-nowrap text-sm font-semibold xl:flex 2xl:gap-6">
            <Link to="/" className="text-foreground/75 transition-colors hover:text-primary">
              {t("Accueil", "Home")}
            </Link>
            <Link
              to="/search"
              search={{ adults: 2, children: 0, roomType: "Tous" }}
              className="text-foreground/75 transition-colors hover:text-primary"
            >
              {t("Appart-Hôtel", "Aparthotel")}
            </Link>
            <div className="group relative">
              <Link
                to="/port-de-plaisance"
                className="inline-flex items-center gap-1 text-foreground/75 transition-colors hover:text-primary"
              >
                {t("Port de Plaisance", "Marina")}
                <ChevronDown className="size-3.5" />
              </Link>
              <div className="invisible absolute left-0 top-full w-80 translate-y-2 rounded-lg border border-border bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {portLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to as "/port-de-plaisance"}
                    className="block rounded-md px-3 py-2.5 text-sm font-semibold text-foreground/75 transition hover:bg-secondary hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/activites"
              className="text-foreground/75 transition-colors hover:text-primary"
            >
              {t("Activités", "Activities")}
            </Link>
            <Link
              to="/presentation"
              className="text-foreground/75 transition-colors hover:text-primary"
            >
              {t("Présentation", "About")}
            </Link>
            <Link
              to="/actualites"
              className="text-foreground/75 transition-colors hover:text-primary"
            >
              {t("Actualités", "News")}
            </Link>
            <Link to="/contact" className="text-foreground/75 transition-colors hover:text-primary">
              {t("Contacter", "Contact us")}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitch className="hidden sm:inline-flex" />
            <Link
              to="/search"
              search={{ adults: 2, children: 0, roomType: "Tous" }}
              className="hidden h-10 items-center gap-2 whitespace-nowrap rounded-lg bg-accent px-4 text-sm font-black text-accent-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-md sm:inline-flex"
            >
              <CalendarCheck className="size-4" />
              {t("Réserver", "Book")}
            </Link>
            <a
              href="/contact?service=reception"
              title={t("Réception", "Reception")}
              aria-label={t("Réception", "Reception")}
              className="hidden size-10 items-center justify-center rounded-lg border border-primary/25 text-primary transition-all hover:border-primary/50 hover:bg-primary/5 sm:inline-flex"
            >
              <Phone className="size-4" />
            </a>
            <Link
              to="/port-de-plaisance/reservation"
              title={t("Capitainerie", "Harbour office")}
              aria-label={t("Capitainerie", "Harbour office")}
              className="hidden size-10 items-center justify-center rounded-lg border border-primary/25 text-primary transition-all hover:border-primary/50 hover:bg-primary/5 sm:inline-flex"
            >
              <ShipWheel className="size-4" />
            </Link>
            <AccountNav />
            <button
              type="button"
              title="Menu"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-white text-muted-foreground shadow-sm transition hover:border-primary/30 hover:text-primary xl:hidden"
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-white px-4 py-4 shadow-lg xl:hidden">
            <nav className="grid gap-1">
              <Link
                to="/search"
                search={{ adults: 2, children: 0, roomType: "Tous" }}
                onClick={() => setOpen(false)}
                className="mb-2 flex h-12 items-center justify-center gap-2 rounded-lg bg-accent text-sm font-black text-accent-foreground shadow-sm"
              >
                <CalendarCheck className="size-4" />
                {t("Réserver un appartement", "Book an apartment")}
              </Link>
              <MobileLink to="/" label={t("Accueil", "Home")} onNavigate={() => setOpen(false)} />
              <MobileLink
                to="/search"
                label={t("Appart-Hôtel", "Aparthotel")}
                search={{ adults: 2, children: 0, roomType: "Tous" }}
                onNavigate={() => setOpen(false)}
              />
              <MobileLink
                to="/port-de-plaisance"
                label={t("Port de Plaisance", "Marina")}
                onNavigate={() => setOpen(false)}
              />
              <div className="ml-3 border-l border-border pl-3">
                {portLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to as "/port-de-plaisance"}
                    onClick={() => setOpen(false)}
                    className="flex min-h-10 items-center rounded-lg px-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <MobileLink
                to="/activites"
                label={t("Activités", "Activities")}
                onNavigate={() => setOpen(false)}
              />
              <MobileLink
                to="/presentation"
                label={t("Présentation", "About")}
                onNavigate={() => setOpen(false)}
              />
              <MobileLink
                to="/actualites"
                label={t("Actualités", "News")}
                onNavigate={() => setOpen(false)}
              />
              <MobileLink
                to="/contact"
                label={t("Contacter", "Contact us")}
                onNavigate={() => setOpen(false)}
              />
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
                <a
                  href="/contact?service=reception"
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-white shadow-sm"
                >
                  <Phone className="size-4" />
                  {t("Réception", "Reception")}
                </a>
                <Link
                  to="/port-de-plaisance/reservation"
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center justify-center gap-2 rounded-lg border border-primary/30 text-sm font-bold text-primary"
                >
                  <Anchor className="size-4" />
                  {t("Capitainerie", "Harbour office")}
                </Link>
              </div>
              <MobileRegisterLink onNavigate={() => setOpen(false)} />
              <LanguageSwitch className="mt-2 h-11 w-full sm:hidden" />
            </nav>
          </div>
        )}
      </header>
      <FloatingBookButton />
    </>
  );
}

function useSessionProfile() {
  const [state, setState] = useState<{ loading: boolean; context: SessionProfile | null }>({
    loading: true,
    context: null,
  });

  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | undefined;

    const refresh = async () => {
      try {
        const context = await getCurrentSessionProfile();
        if (mounted) setState({ loading: false, context });
      } catch {
        if (mounted) setState({ loading: false, context: null });
      }
    };

    void refresh();

    void getSupabaseOrNull().then((supabase) => {
      if (!supabase || !mounted) return;
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(() => {
        void refresh();
      });
      unsubscribe = () => subscription.unsubscribe();
    });

    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, []);

  return state;
}

function AccountNav() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { loading, context } = useSessionProfile();

  const logout = async () => {
    await signOut();
    navigate({ to: "/login" });
  };

  if (loading) {
    return (
      <div
        aria-hidden="true"
        className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-primary/10 sm:w-32"
      />
    );
  }

  if (!context) {
    return (
      <Link
        to="/login"
        className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-ocean hover:shadow-md sm:px-4"
      >
        <User className="size-4" />
        <span className="hidden whitespace-nowrap sm:inline">{t("Connexion", "Sign in")}</span>
      </Link>
    );
  }

  const { profile } = context;
  const capitainerie = profile.role === "capitainerie";
  const admin = isAdminRole(profile.role) || capitainerie;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-ocean hover:shadow-md sm:px-4"
        >
          <UserRound className="size-4 shrink-0" />
          <span className="hidden max-w-[9rem] truncate sm:inline">{profile.fullName}</span>
          <ChevronDown className="size-3.5 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate">{profile.fullName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {capitainerie ? (
          <DropdownMenuItem asChild>
            <Link to="/admin/port-tarifs">{t("Tarifs Port", "Marina rates")}</Link>
          </DropdownMenuItem>
        ) : admin ? (
          <>
            <DropdownMenuItem asChild>
              <Link to="/admin">{t("Tableau de bord", "Dashboard")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/admin/messages">{t("Messages", "Messages")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/admin/settings">{t("Administration", "Administration")}</Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link to="/client">{t("Mon espace", "My account")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/client/reservations">{t("Mes réservations", "My bookings")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/client/messages">{t("Messages", "Messages")}</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => void logout()}>
          {t("Déconnexion", "Sign out")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileRegisterLink({ onNavigate }: { onNavigate: () => void }) {
  const { t } = useI18n();
  const { loading, context } = useSessionProfile();
  if (loading || context) return null;

  return (
    <Link
      to="/register"
      onClick={onNavigate}
      className="mt-2 flex h-11 items-center justify-center gap-2 rounded-lg border border-primary/30 text-sm font-bold text-primary"
    >
      <UserPlus className="size-4" />
      {t("Créer un compte", "Create an account")}
    </Link>
  );
}

function MobileLink({
  to,
  label,
  search,
  onNavigate,
}: {
  to:
    | "/"
    | "/search"
    | "/port-de-plaisance"
    | "/activites"
    | "/presentation"
    | "/actualites"
    | "/contact";
  label: string;
  search?: { adults: number; children: number; roomType: string };
  onNavigate: () => void;
}) {
  return (
    <Link
      to={to}
      search={search}
      onClick={onNavigate}
      className="flex min-h-11 items-center rounded-lg px-4 text-sm font-semibold text-foreground transition hover:bg-secondary hover:text-primary"
    >
      {label}
    </Link>
  );
}
