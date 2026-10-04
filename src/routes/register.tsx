import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import logoUrl from "@/assets/marina-logo.png";
import { getClientSessionProfile, linkGuestReservationsToClient, registerClient } from "@/lib/auth/clientAuth";
import { LanguageSwitch } from "@/components/language-switch";
import { headT } from "@/lib/i18n/head";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { isSupabaseConfigured } from "@/lib/supabase/isSupabaseConfigured";

type RegisterSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/register")({
  validateSearch: (search: Record<string, unknown>): RegisterSearch => ({
    redirect:
      typeof search.redirect === "string" &&
      (search.redirect.startsWith("/admin") ||
        search.redirect.startsWith("/client") ||
        search.redirect.startsWith("/book/"))
        ? search.redirect
        : undefined,
  }),
  head: () => ({
    meta: [
      {
        title: headT(
          "Créer un compte - Marina Cap Monastir",
          "Create an account - Marina Cap Monastir",
        ),
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { t } = useI18n();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const configured = isSupabaseConfigured();

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError(t("Les mots de passe ne correspondent pas.", "Passwords do not match."));
      return;
    }

    setLoading(true);
    try {
      const result = await registerClient({ fullName, email, phone, password });
      if (result.needsEmailConfirmation) {
        setMessage(
          t(
            "Vérifiez votre email pour activer votre compte, puis connectez-vous.",
            "Check your email to activate your account, then sign in.",
          ),
        );
        return;
      }
      await linkGuestReservationsToClient();
      navigate({ to: (search.redirect ?? "/client") as never });
    } catch (err) {
      setError(err instanceof Error ? err.message : t("Inscription impossible.", "Sign-up failed."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-secondary/60 lg:grid-cols-[0.9fr_1fr]">
      <section className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoUrl}
            alt="Marina Cap Monastir"
            className="size-12 rounded-md object-cover"
          />
          <div>
            <div className="font-black">Marina Cap Monastir</div>
            <div className="text-xs text-white/70">{t("Portail client", "Guest portal")}</div>
          </div>
        </Link>
        <div>
          <h1 className="max-w-xl text-5xl font-black leading-tight">
            {t("Créez votre accès client.", "Create your guest account.")}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
            {t(
              "Le portail relie automatiquement vos réservations si l'email correspond à une réservation déjà enregistrée.",
              "The portal automatically links your bookings when the email matches an existing booking.",
            )}
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-12">
        <form
          onSubmit={submit}
          className="w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-xl shadow-primary/10"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-md bg-secondary text-primary">
              <UserPlus className="size-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-primary">
                {t("Créer un compte", "Create an account")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("Activez votre espace personnel.", "Activate your personal space.")}
              </p>
            </div>
            <LanguageSwitch className="ml-auto" />
          </div>

          {!configured && (
            <p className="mb-4 rounded-md bg-amber-50 p-3 text-sm font-medium text-amber-900">
              {t(
                "Supabase n'est pas configuré. La création de compte nécessite Supabase Auth.",
                "Supabase is not configured. Creating an account requires Supabase Auth.",
              )}
            </p>
          )}

          {search.redirect?.startsWith("/book/") && (
            <p className="mb-4 rounded-md bg-primary/8 p-3 text-sm font-medium text-primary">
              {t(
                "Vous devez vous connecter ou créer un compte avant de confirmer votre réservation.",
                "Please sign in or create an account before confirming your booking.",
              )}
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <RegisterField label={t("Nom complet", "Full name")}>
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="admin-input"
                autoComplete="name"
                required
              />
            </RegisterField>
            <RegisterField label={t("Téléphone", "Phone")}>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="admin-input"
                autoComplete="tel"
                required
              />
            </RegisterField>
            <RegisterField label={t("Email", "Email")}>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="admin-input"
                autoComplete="email"
                required
              />
            </RegisterField>
            <div />
            <RegisterField label={t("Mot de passe", "Password")}>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="admin-input"
                autoComplete="new-password"
                minLength={6}
                required
              />
            </RegisterField>
            <RegisterField label={t("Confirmer", "Confirm")}>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="admin-input"
                autoComplete="new-password"
                minLength={6}
                required
              />
            </RegisterField>
          </div>

          {message && (
            <div className="mt-4 rounded-md border border-emerald-500/30 bg-emerald-50/80 p-4 text-sm font-medium text-emerald-900">
              <p>{message}</p>
              <button
                type="button"
                onClick={async () => {
                  setLoading(true);
                  try {
                    const session = await getClientSessionProfile();
                    if (session?.profile) {
                      await linkGuestReservationsToClient();
                      navigate({ to: (search.redirect ?? "/client") as never });
                    } else {
                      navigate({ to: "/login" as never });
                    }
                  } catch {
                    navigate({ to: "/login" as never });
                  } finally {
                    setLoading(false);
                  }
                }}
                className="mt-3 inline-flex h-9 items-center gap-2 rounded-md bg-emerald-700 px-4 text-xs font-bold text-white shadow hover:bg-emerald-800"
              >
                {t("J'ai confirmé mon email — Se connecter", "I've confirmed my email — Sign in")}
              </button>
            </div>
          )}
          {error && (
            <p className="mt-4 rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !configured}
            className="mt-5 w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? t("Création...", "Creating...") : t("Créer mon compte", "Create my account")}
          </button>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
            <Link to="/" className="font-semibold text-muted-foreground hover:text-primary">
              {t("Retour au site", "Back to the website")}
            </Link>
            <Link
              to="/login"
              search={search.redirect ? { redirect: search.redirect } : undefined}
              className="font-black text-primary hover:text-accent"
            >
              {t("J'ai déjà un compte", "I already have an account")}
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

function RegisterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
