import { createFileRoute } from "@tanstack/react-router";
import {
  Anchor,
  Building2,
  Car,
  Download,
  Fuel,
  Layers,
  Map,
  Maximize2,
  Printer,
  Ship,
  Umbrella,
  Waves,
  X,
  ZoomIn,
} from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";

const PLAN_IMAGE = "/images/plan-port-marina-cap-monastir.png";

const portZones = [
  {
    name: "Réception Appart-Hôtel",
    description: "Accueil et enregistrement des résidents et visiteurs",
    icon: Building2,
    color: "border-blue-200 bg-blue-50 text-blue-900",
    iconBg: "bg-blue-100",
  },
  {
    name: "Capitainerie",
    description: "Services administratifs, coordination port et assistance plaisanciers",
    icon: Ship,
    color: "border-primary/20 bg-primary/5 text-primary",
    iconBg: "bg-primary/10",
  },
  {
    name: "Parking",
    description: "Stationnement réservé aux résidents et visiteurs du port",
    icon: Car,
    color: "border-slate-200 bg-slate-50 text-slate-800",
    iconBg: "bg-slate-100",
  },
  {
    name: "Quai d'Honneur",
    description: "Quai principal d'accueil officiel et cérémonies",
    icon: Anchor,
    color: "border-accent/30 bg-amber-50 text-amber-900",
    iconBg: "bg-amber-100",
  },
  {
    name: "Quai Présidentiel",
    description: "Zone VIP dédiée aux yachts et bateaux de prestige",
    icon: Layers,
    color: "border-purple-200 bg-purple-50 text-purple-900",
    iconBg: "bg-purple-100",
  },
  {
    name: "Avant Port",
    description: "Zone d'entrée principale pour manœuvres et transit",
    icon: Waves,
    color: "border-cyan-200 bg-cyan-50 text-cyan-900",
    iconBg: "bg-cyan-100",
  },
  {
    name: "Station AGIL",
    description: "Ravitaillement en carburant pour bateaux et yachts",
    icon: Fuel,
    color: "border-orange-200 bg-orange-50 text-orange-900",
    iconBg: "bg-orange-100",
  },
  {
    name: "Plage sablée",
    description: "Plage privée aménagée, accessible aux résidents",
    icon: Umbrella,
    color: "border-yellow-200 bg-yellow-50 text-yellow-900",
    iconBg: "bg-yellow-100",
  },
  {
    name: "Entrée principale",
    description: "Accès sécurisé principal du complexe Marina Cap Monastir",
    icon: Map,
    color: "border-green-200 bg-green-50 text-green-900",
    iconBg: "bg-green-100",
  },
];

export const Route = createFileRoute("/port-de-plaisance/plan")({
  head: () => ({
    meta: [
      { title: "Plan du Port — Marina Cap Monastir" },
      {
        name: "description",
        content:
          "Découvrez le plan du port de plaisance de Marina Cap Monastir, les accès principaux, la réception Appart-Hôtel, la capitainerie, les quais et les zones de services.",
      },
    ],
  }),
  component: PlanPortPage,
});

function PlanPortPage() {
  const [fullscreen, setFullscreen] = useState(false);

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = PLAN_IMAGE;
    link.download = "plan-port-marina-cap-monastir.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {fullscreen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4"
          onClick={() => setFullscreen(false)}
        >
          <button
            type="button"
            onClick={() => setFullscreen(false)}
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur transition hover:bg-white/22"
            aria-label="Fermer"
          >
            <X className="size-5" />
          </button>
          <img
            src={PLAN_IMAGE}
            alt="Plan du port de plaisance Marina Cap Monastir"
            className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Page header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean via-primary to-[#0a3f5c] py-16 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(214,168,79,0.25),transparent_65%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] backdrop-blur">
            <Map className="size-3.5 text-accent" />
            Port de Plaisance
          </div>
          <h1 className="text-4xl font-black md:text-5xl">Plan du Port</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/75">
            Marina Cap Monastir — Port de Plaisance
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {/* Plan card */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-premium)]">
          <div className="h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" />
          <div className="p-6 md:p-10">
            <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-accent">
              <Anchor className="size-3.5" />
              Port de plaisance — Marina Cap Monastir
            </div>
            <h2 className="text-2xl font-black text-primary">Plan du Port de Plaisance</h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-muted-foreground">
              Découvrez le plan du port de plaisance de Marina Cap Monastir, les accès principaux,
              la réception Appart-Hôtel, la capitainerie, les quais et les zones de services.
            </p>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFullscreen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-ocean"
              >
                <Maximize2 className="size-4" />
                Plein écran
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-primary/25 bg-transparent px-4 text-sm font-bold text-primary transition hover:border-primary/50 hover:bg-primary/5"
              >
                <Download className="size-4" />
                Télécharger
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-transparent px-4 text-sm font-bold text-muted-foreground transition hover:border-primary/25 hover:text-primary"
              >
                <Printer className="size-4" />
                Imprimer
              </button>
            </div>

            {/* Plan image */}
            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-secondary/20">
              <button
                type="button"
                onClick={() => setFullscreen(true)}
                className="group relative block w-full cursor-zoom-in"
                title="Cliquer pour agrandir"
              >
                <img
                  src={PLAN_IMAGE}
                  alt="Plan du port de plaisance Marina Cap Monastir"
                  className="w-full object-contain transition-opacity group-hover:opacity-96"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = "none";
                    const parent = img.parentElement;
                    if (parent) {
                      const fallback = document.createElement("div");
                      fallback.className =
                        "flex aspect-[4/3] items-center justify-center p-10 text-center";
                      fallback.innerHTML =
                        '<div class="space-y-2"><p class="text-sm font-semibold text-muted-foreground">Image non disponible</p></div>';
                      parent.appendChild(fallback);
                    }
                  }}
                />
                <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-2 text-xs font-bold text-white backdrop-blur">
                    <ZoomIn className="size-3.5" />
                    Agrandir
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Zone info cards */}
        <section className="mt-12">
          <div className="mb-8 text-center">
            <div className="section-kicker mx-auto mb-3 justify-center">
              <Anchor className="size-3.5" />
              Zones et services
            </div>
            <h2 className="section-title mx-auto">Repères du port</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
              Retrouvez ci-dessous les principaux repères du port de plaisance de Marina Cap
              Monastir.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portZones.map((zone) => (
              <div
                key={zone.name}
                className={`rounded-xl border p-5 transition hover:-translate-y-0.5 hover:shadow-md ${zone.color}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${zone.iconBg}`}
                  >
                    <zone.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-black">{zone.name}</h3>
                    <p className="mt-1 text-sm opacity-70">{zone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      {import.meta.env.DEV && (
        <div className="fixed bottom-2 right-2 z-[9999] rounded bg-black/70 px-2 py-1 text-[10px] text-white">
          /port-de-plaisance/plan · PlanPortPage
        </div>
      )}
    </div>
  );
}
