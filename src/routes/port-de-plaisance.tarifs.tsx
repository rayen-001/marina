import { createFileRoute, Link } from "@tanstack/react-router";
import { Anchor, ArrowLeft, Info, Mail, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { listActivePortTariffs, type PortTariff } from "@/lib/services/portTariffService";

export const Route = createFileRoute("/port-de-plaisance/tarifs")({
  loader: async () => {
    try {
      return { tariffs: await listActivePortTariffs() };
    } catch (error) {
      console.warn("[TarifsPortPage] port_tariffs query failed", error);
      return { tariffs: [] as PortTariff[] };
    }
  },
  head: () => ({
    meta: [
      { title: "Tarifs Port — Marina Cap Monastir" },
      {
        name: "description",
        content:
          "Tarifs d'accostage du port de plaisance de Marina Cap Monastir en dinar tunisien (TND) : journalier, mensuel, annuel, hivernage.",
      },
    ],
  }),
  component: TarifsPortPage,
});

function formatPrice(value: number | null, currency: string) {
  if (value === null || value === undefined) return "-";
  return `${value} ${currency}`;
}

function TarifsPortPage() {
  const { tariffs } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative overflow-hidden bg-gradient-to-br from-ocean via-primary to-[#0a3f5c] py-14 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(214,168,79,0.22),transparent_65%)]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 md:px-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] backdrop-blur">
            <Anchor className="size-3.5 text-accent" />
            Port de Plaisance
          </div>
          <h1 className="text-4xl font-black md:text-5xl">Tarifs du Port</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/75">
            Tarifs d'accostage 2025 en dinar tunisien (TND).
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-12 md:px-6 space-y-10">
        <Link
          to="/port-de-plaisance"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Retour au port
        </Link>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <Info className="mt-0.5 size-4 shrink-0 text-amber-600" />
          <span>
            Tarifs 2025, hors taxes et sujets à modification. Contactez la capitainerie pour
            confirmation et devis personnalisé.
          </span>
        </div>

        {/* Rates table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-premium)]">
          <div className="h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" />
          <div className="p-6 md:p-8">
            <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-accent">
              <Anchor className="size-3.5" />
              Tarifs d'accostage
            </div>
            <h2 className="text-2xl font-black text-primary">Tarifs par catégorie de bateau</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Prix hors taxes (H.T), en dinar tunisien (TND).
            </p>

            {tariffs.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-primary/20 bg-secondary/40 p-6 text-center text-sm text-muted-foreground">
                Les tarifs détaillés sont à confirmer auprès de la Capitainerie.
              </div>
            ) : (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/60 text-xs font-black uppercase tracking-[0.12em] text-muted-foreground">
                      <th className="px-4 py-3">Longueur du bateau</th>
                      <th className="px-4 py-3">Journalier</th>
                      <th className="px-4 py-3">Mensuel</th>
                      <th className="px-4 py-3">Annuel</th>
                      <th className="px-4 py-3">Hivernage</th>
                      <th className="px-4 py-3">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tariffs.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-border transition hover:bg-secondary/30"
                      >
                        <td className="px-4 py-3 font-semibold">{row.category}</td>
                        <td className="px-4 py-3 font-mono text-sm">
                          {formatPrice(row.dailyPrice, row.currency)}
                        </td>
                        <td className="px-4 py-3 font-mono text-sm">
                          {formatPrice(row.monthlyPrice, row.currency)}
                        </td>
                        <td className="px-4 py-3 font-mono text-sm">
                          {formatPrice(row.yearlyPrice, row.currency)}
                        </td>
                        <td className="px-4 py-3 font-mono text-sm">
                          {formatPrice(row.winteringPrice, row.currency)}
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">
                          {row.note ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6 space-y-1.5 text-xs leading-6 text-muted-foreground">
              <p className="font-black uppercase tracking-[0.1em] text-primary">Observations</p>
              <p>Le tarif affiché est hors taxes (H.T).</p>
              <p>Prix eau/électricité forfaitaire pour l'accostage annuel.</p>
              <p>Accostage &lt; 4 h = ½ tarif d'accostage.</p>
              <p>Bateau multicoque : +80 %.</p>
              <p>Bateau professionnel : 75 dt/m²/an.</p>
            </div>

            <p className="mt-4 rounded-lg bg-secondary/40 px-4 py-3 text-xs font-semibold leading-6 text-primary">
              Prix en TTC = ((Prix HT + 7 % TVA) + (Eau/Élec + 19 % TVA)) + (FDSCT 1 %) + Timbre (1
              dinar).
            </p>
          </div>
        </div>

        {/* Contact / Reservation CTA */}
        <div className="overflow-hidden rounded-xl border border-primary/20 bg-primary/5 shadow-sm">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-black text-primary">Réserver une place</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pour confirmer votre escale ou votre hivernage, contactez la capitainerie ou utilisez
              notre formulaire de réservation en ligne.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/port-de-plaisance/reservation"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-ocean"
              >
                <Anchor className="size-4" />
                Réserver en ligne
              </Link>
              <a
                href="tel:+21673462305"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-primary/25 px-5 text-sm font-bold text-primary transition hover:border-primary/50 hover:bg-primary/5"
              >
                <Phone className="size-4" />
                (+216) 73 46 23 05
              </a>
              <a
                href="mailto:capitainerie@marinamonastir.tn"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-5 text-sm font-semibold text-muted-foreground transition hover:border-primary/25 hover:text-primary"
              >
                <Mail className="size-4" />
                capitainerie@marinamonastir.tn
              </a>
            </div>
          </div>
        </div>
      </main>
      {import.meta.env.DEV && (
        <div className="fixed bottom-2 right-2 z-[9999] rounded bg-black/70 px-2 py-1 text-[10px] text-white">
          /port-de-plaisance/tarifs · TarifsPortPage
        </div>
      )}
    </div>
  );
}
