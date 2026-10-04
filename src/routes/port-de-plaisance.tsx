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
import { headT } from "@/lib/i18n/head";
import { useI18n } from "@/lib/i18n/I18nProvider";

export const Route = createFileRoute("/port-de-plaisance")({
  head: () => ({
    meta: [
      { title: headT("Port de Plaisance - Marina Cap Monastir", "Marina - Marina Cap Monastir") },
      {
        name: "description",
        content: headT(
          "Découvrez le port de plaisance de Marina Cap Monastir : 300 anneaux, escale, passage, hivernage, régates et surveillance 24h/24.",
          "Discover the Marina Cap Monastir harbour: 300 berths, port of call, transit, wintering, regattas and 24/7 security.",
        ),
      },
    ],
  }),
  component: PortDePlaisancePage,
});

function PortDePlaisancePage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useI18n();
  if (pathname !== "/port-de-plaisance") return <Outlet />;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <img
            src={heroImg}
            alt={t("Port de plaisance", "Marina")}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="luxury-hero-overlay absolute inset-0" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 text-white md:px-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] shadow-lg backdrop-blur">
              <Anchor className="size-4 text-accent" />
              {t("Port de Plaisance", "Marina")}
            </div>
            <h1 className="hero-title max-w-3xl">
              {t("Marina Cap Monastir côté mer", "Marina Cap Monastir from the sea")}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/78">
              {t(
                "Le port de plaisance de Marina Cap Monastir est à la fois un port d'escale, de passage, d'hivernage et de régates. Il constitue un point de rencontre privilégié pour les plaisanciers et les clubs nautiques.",
                "The Marina Cap Monastir harbour is a port of call, transit, wintering and regattas — a favourite meeting place for boaters and sailing clubs.",
              )}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              t("300 anneaux", "300 berths"),
              t("Port d'escale", "Port of call"),
              t("Port de passage", "Transit port"),
              t("Hivernage", "Wintering"),
              t("Régates", "Regattas"),
              t("Surveillance 24h/24", "24/7 security"),
              t("Agents de sécurité", "Security staff"),
              t("Certification ISO 14001 V 2015", "ISO 14001:2015 certified"),
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
                {t("Services port", "Marina services")}
              </div>
              <h2 className="section-title">
                {t("Une marina organisée pour les plaisanciers", "A marina designed for boaters")}
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: t("Sécurité 24h/24", "24/7 security"),
                  icon: <ShieldCheck className="size-6" />,
                },
                { title: t("300 anneaux", "300 berths"), icon: <Anchor className="size-6" /> },
                {
                  title: t("Services plaisanciers", "Services for boaters"),
                  icon: <Sailboat className="size-6" />,
                },
                {
                  title: t("Environnement certifié", "Certified environment"),
                  icon: <Waves className="size-6" />,
                },
                {
                  title: t("Capitainerie", "Harbour office"),
                  icon: <ShipWheel className="size-6" />,
                },
                { title: t("Plan du port", "Marina map"), icon: <Map className="size-6" /> },
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
                  label: t("Tarifs Port", "Marina rates"),
                  to: "/port-de-plaisance/tarifs",
                  icon: <FileText className="size-4" />,
                },
                {
                  label: t("Formalités", "Formalities"),
                  to: "/port-de-plaisance/formalites",
                  icon: <FileText className="size-4" />,
                },
                {
                  label: t("Réservation Port", "Berth booking"),
                  to: "/port-de-plaisance/reservation",
                  icon: <Anchor className="size-4" />,
                },
                {
                  label: t("Plan du Port", "Marina map"),
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
