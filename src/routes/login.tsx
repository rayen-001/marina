import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import logoUrl from "@/assets/marina-logo.png";
import { linkGuestReservationsToClient } from "@/lib/auth/clientAuth";
import {
  getCurrentSessionProfile,
  getDefaultPathForRole,
  isAdminRole,
  signInWithPasswordAndProfile,
  type ProfileRole,
} from "@/lib/auth/profilesAuth";
import { isSupabaseConfigured } from "@/lib/supabase/isSupabaseConfigured";

type LoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect:
      typeof search.redirect === "string" &&
      (search.redirect.startsWith("/admin") ||
        search.redirect.startsWith("/client") ||
        search.redirect.startsWith("/book/"))
        ? search.redirect
        : undefined,
  }),
  head: () => ({
    meta: [{ title: "Connexion - Marina Cap Monastir" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");
  const configured = isSupabaseConfigured();

  useEffect(() => {
    let mounted = true;
    void getCurrentSessionProfile()
      .then((context) => {
        if (!mounted || !context) return;
        navigateToRole(navigate, context.profile.role, search.redirect);
      })
      .catch(() => {
        // The form below displays the actionable state.
      })
      .finally(() => {
        if (mounted) setCheckingSession(false);
      });

    return () => {
      mounted = false;
    };
  }, [navigate, search.redirect]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const context = await signInWithPasswordAndProfile(email, password);
      if (context.profile.role === "client") await linkGuestReservationsToClient();
      navigateToRole(navigate, context.profile.role, search.redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connexion impossible.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-secondary/60 lg:grid-cols-[0.95fr_1fr]">
      <section className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoUrl}
            alt="Marina Cap Monastir"
            className="size-12 rounded-md object-cover"
          />
          <div>
            <div className="font-black">Marina Cap Monastir</div>
            <div className="text-xs text-white/70">Admin & client</div>
          </div>
        </Link>
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm">
            <ShieldCheck className="size-4 text-accent" />
            Supabase Auth
          </div>
          <h1 className="max-w-xl text-5xl font-black leading-tight">
            Acces securise aux espaces Marina Cap Monastir.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
            Utilisez le meme formulaire pour l'administration et le portail client. Le role du
            profil determine automatiquement l'espace d'arrivee.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-12">
        <form
          onSubmit={submit}
          className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl shadow-primary/10"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-md bg-secondary text-primary">
              <LockKeyhole className="size-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-primary">Connexion</h1>
              <p className="text-sm text-muted-foreground">Email et mot de passe Supabase.</p>
            </div>
          </div>

          {!configured && (
            <p className="mb-4 rounded-md bg-amber-50 p-3 text-sm font-medium text-amber-900">
              Supabase n'est pas configure. La connexion necessite VITE_SUPABASE_URL et
              VITE_SUPABASE_ANON_KEY.
            </p>
          )}

          {search.redirect?.startsWith("/book/") && (
            <p className="mb-4 rounded-md bg-primary/8 p-3 text-sm font-medium text-primary">
              Vous devez vous connecter ou creer un compte avant de confirmer votre reservation.
            </p>
          )}

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="admin-input"
              placeholder="nom@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Mot de passe
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="admin-input"
              placeholder="********"
              autoComplete="current-password"
              required
            />
          </label>

          {error && (
            <p className="mt-4 rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || checkingSession || !configured}
            className="mt-5 w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading || checkingSession ? "Verification..." : "Se connecter"}
          </button>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
            <Link to="/" className="font-semibold text-muted-foreground hover:text-primary">
              Retour au site public
            </Link>
            <Link
              to="/register"
              search={search.redirect ? { redirect: search.redirect } : undefined}
              className="font-black text-primary hover:text-accent"
            >
              Creer un compte
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

function navigateToRole(
  navigate: ReturnType<typeof useNavigate>,
  role: ProfileRole,
  redirectPath?: string,
) {
  const canUseRedirect =
    redirectPath &&
    ((role === "capitainerie" && redirectPath.startsWith("/admin/port-tarifs")) ||
      (isAdminRole(role) && redirectPath.startsWith("/admin")) ||
      (role === "client" &&
        (redirectPath.startsWith("/client") || redirectPath.startsWith("/book/"))));
  const target = canUseRedirect ? redirectPath : getDefaultPathForRole(role);

  if (import.meta.env.DEV) {
    console.info("[auth] navigateToRole", { role, redirectPath, target });
  }

  navigate({ to: target as never });
}
