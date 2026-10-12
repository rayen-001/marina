import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Anchor,
  ArrowRight,
  Camera,
  FileText,
  Map,
  Sailboat,
  ShieldCheck,
  ShipWheel,
  Waves,
} from "lucide-react";
import heroImg from "@/assets/hero-marina.jpg";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/port-de-plaisance")({
  head: () => ({
    meta: [
      { title: "Port de Plaisance - Marina Cap Monastir" },
      {
        name: "description",
        content:
          "Découvrez le port de plaisance de Marina Cap Monastir: 300 anneaux, escale, passage, hivernage, régates et surveillance 24h/24.",
      },
    ],
  }),
  component: PortDePlaisancePage,
});

function PortDePlaisancePage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/port-de-plaisance") return <Outlet />;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <img
            src={heroImg}
            alt="Port de plaisance"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="luxury-hero-overlay absolute inset-0" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 text-white md:px-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] shadow-lg backdrop-blur">
              <Anchor className="size-4 text-accent" />
              Port de Plaisance
            </div>
            <h1 className="max-w-3xl text-4xl font-black md:text-6xl">
              Marina Cap Monastir côté mer
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/78">
              Le port de plaisance de Marina Cap Monastir est à la fois un port d'escale, de
              passage, d'hivernage et de régates. Il constitue un point de rencontre privilégié pour
              les plaisanciers et les clubs nautiques.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "300 anneaux",
              "Port d'escale",
              "Port de passage",
              "Hivernage",
              "Régates",
              "Surveillance 24h/24",
              "Agents de sécurité",
              "Certification ISO 14001 V 2015",
            ].map((fact) => (
              <div key={fact} className="premium-card rounded-lg p-5">
                <ShieldCheck className="mb-3 size-5 text-accent" />
                <div className="font-black text-primary">{fact}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-secondary/50 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-10">
              <div className="section-kicker mb-3">
                <ShipWheel className="size-3.5" />
                Services port
              </div>
              <h2 className="section-title">Une marina organisée pour les plaisanciers</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Sécurité 24h/24", icon: <ShieldCheck className="size-6" /> },
                { title: "300 anneaux", icon: <Anchor className="size-6" /> },
                { title: "Services plaisanciers", icon: <Sailboat className="size-6" /> },
                { title: "Environnement certifié", icon: <Waves className="size-6" /> },
                { title: "Capitainerie", icon: <ShipWheel className="size-6" /> },
                { title: "Plan du port", icon: <Map className="size-6" /> },
              ].map((card) => (
                <article
                  key={card.title}
                  className="premium-card premium-card-hover rounded-lg p-6"
                >
                  <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-secondary text-accent">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-black text-primary">{card.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="grid gap-4 md:grid-cols-4">
            {(
              [
                {
                  label: "Tarifs Port",
                  to: "/port-de-plaisance/tarifs",
                  icon: <FileText className="size-4" />,
                },
                {
                  label: "Formalités",
                  to: "/port-de-plaisance/formalites",
                  icon: <FileText className="size-4" />,
                },
                {
                  label: "Réservation Port",
                  to: "/port-de-plaisance/reservation",
                  icon: <Anchor className="size-4" />,
                },
                {
                  label: "Plan du Port",
                  to: "/port-de-plaisance/plan",
                  icon: <Camera className="size-4" />,
                },
              ] as const
            ).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-black text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10"
              >
                {link.icon}
                {link.label}
                <ArrowRight className="size-4" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      {import.meta.env.DEV && (
        <div className="fixed bottom-2 right-2 z-[9999] rounded bg-black/70 px-2 py-1 text-[10px] text-white">
          /port-de-plaisance · PortDePlaisancePage
        </div>
      )}
    </div>
  );
}
