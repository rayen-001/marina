import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { getClientSessionProfile, type ClientProfile } from "@/lib/auth/clientAuth";

export const Route = createFileRoute("/client/profile")({
  head: () => ({
    meta: [{ title: "Profil client - Marina Cap Monastir" }],
  }),
  component: ClientProfilePage,
});

function ClientProfilePage() {
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
        if (mounted) setError(err instanceof Error ? err.message : "Profil indisponible.");
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
          Profil
        </div>
        <h1 className="mt-2 text-3xl font-black text-primary">Mon profil</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Informations de compte utilisées pour lier vos réservations.
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
              label="Nom"
              value={profile.fullName}
            />
            <ProfileTile icon={<Mail className="size-5" />} label="Email" value={profile.email} />
            <ProfileTile
              icon={<Phone className="size-5" />}
              label="Téléphone"
              value={profile.phone ?? "-"}
            />
            <ProfileTile
              icon={<ShieldCheck className="size-5" />}
              label="Statut"
              value={profile.active ? "Compte actif" : "Compte inactif"}
            />
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">Profil client introuvable.</div>
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
