import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { getClientSessionProfile, type ClientProfile } from "@/lib/auth/clientAuth";
import { headT } from "@/lib/i18n/head";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { tr } from "@/lib/i18n/locale";

export const Route = createFileRoute("/client/profile")({
  head: () => ({
    meta: [
      { title: headT("Profil client - Marina Cap Monastir", "My profile - Marina Cap Monastir") },
    ],
  }),
  component: ClientProfilePage,
});

function ClientProfilePage() {
  const { t } = useI18n();
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    void getClientSessionProfile()
      .then((context) => {
        if (mounted) setProfile(context?.profile ?? null);
      })
      .catch((err) => {
        if (mounted) {
          setError(
            err instanceof Error ? err.message : tr("Profil indisponible.", "Profile unavailable."),
          );
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-5">
      <header>
        <div className="section-kicker">
          <UserRound className="size-4" />
          {t("Profil", "Profile")}
        </div>
        <h1 className="mt-2 text-3xl font-black text-primary">{t("Mon profil", "My profile")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t(
            "Informations de compte utilisées pour lier vos réservations.",
            "Account details used to link your bookings.",
          )}
        </p>
      </header>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
          {error}
        </div>
      )}

      <section className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
        {loading ? (
          <div className="skeleton-block h-40 w-full" />
        ) : profile ? (
          <div className="grid gap-4 md:grid-cols-2">
            <ProfileTile
              icon={<UserRound className="size-5" />}
              label={t("Nom", "Name")}
              value={profile.fullName}
            />
            <ProfileTile
              icon={<Mail className="size-5" />}
              label={t("Email", "Email")}
              value={profile.email}
            />
            <ProfileTile
              icon={<Phone className="size-5" />}
              label={t("Téléphone", "Phone")}
              value={profile.phone ?? "-"}
            />
            <ProfileTile
              icon={<ShieldCheck className="size-5" />}
              label={t("Statut", "Status")}
              value={
                profile.active
                  ? t("Compte actif", "Active account")
                  : t("Compte inactif", "Inactive account")
              }
            />
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            {t("Profil client introuvable.", "Guest profile not found.")}
          </div>
        )}
      </section>
    </div>
  );
}

function ProfileTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-accent/15 text-primary">
          {icon}
        </div>
        <div>
          <div className="text-xs font-black uppercase tracking-[0.12em] text-muted-foreground">
            {label}
          </div>
          <div className="mt-1 font-black text-primary">{value}</div>
        </div>
      </div>
    </div>
  );
}
