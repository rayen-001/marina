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
import { headT } from "@/lib/i18n/head";
import { useI18n } from "@/lib/i18n/I18nProvider";

const PLAN_IMAGE = "/images/plan-port-marina-cap-monastir.png";

const portZones = [
  {
    name: { fr: "Réception Appart-Hôtel", en: "Aparthotel reception" },
    description: {
      fr: "Accueil et enregistrement des résidents et visiteurs",
      en: "Welcome and check-in for residents and visitors",
    },
    icon: Building2,
    color: "border-blue-200 bg-blue-50 text-blue-900",
    iconBg: "bg-blue-100",
  },
  {
    name: { fr: "Capitainerie", en: "Harbour office" },
    description: {
      fr: "Services administratifs, coordination port et assistance plaisanciers",
      en: "Administration, harbour coordination and help for boaters",
    },
    icon: Ship,
    color: "border-primary/20 bg-primary/5 text-primary",
    iconBg: "bg-primary/10",
  },
  {
    name: { fr: "Parking", en: "Car park" },
    description: {
      fr: "Stationnement réservé aux résidents et visiteurs du port",
      en: "Parking for residents and marina visitors",
    },
    icon: Car,
    color: "border-slate-200 bg-slate-50 text-slate-800",
    iconBg: "bg-slate-100",
  },
  {
    name: { fr: "Quai d'Honneur", en: "Quai d'Honneur (main quay)" },
    description: {
      fr: "Quai principal d'accueil officiel et cérémonies",
      en: "Main quay for official arrivals and ceremonies",
    },
    icon: Anchor,
    color: "border-accent/30 bg-amber-50 text-amber-900",
    iconBg: "bg-amber-100",
  },
  {
    name: { fr: "Quai Présidentiel", en: "Presidential quay" },
    description: {
      fr: "Zone VIP dédiée aux yachts et bateaux de prestige",
      en: "VIP area for yachts and prestige boats",
    },
    icon: Layers,
    color: "border-purple-200 bg-purple-50 text-purple-900",
    iconBg: "bg-purple-100",
  },
  {
    name: { fr: "Avant Port", en: "Outer harbour" },
    description: {
      fr: "Zone d'entrée principale pour manœuvres et transit",
      en: "Main entrance area for manoeuvres and transit",
    },
    icon: Waves,
    color: "border-cyan-200 bg-cyan-50 text-cyan-900",
    iconBg: "bg-cyan-100",
  },
  {
    name: { fr: "Station AGIL", en: "AGIL fuel station" },
    description: {
      fr: "Ravitaillement en carburant pour bateaux et yachts",
      en: "Refuelling for boats and yachts",
    },
    icon: Fuel,
    color: "border-orange-200 bg-orange-50 text-orange-900",
    iconBg: "bg-orange-100",
  },
  {
    name: { fr: "Plage sablée", en: "Sandy beach" },
    description: {
      fr: "Plage privée aménagée, accessible aux résidents",
      en: "Private, equipped beach for residents",
    },
    icon: Umbrella,
    color: "border-yellow-200 bg-yellow-50 text-yellow-900",
    iconBg: "bg-yellow-100",
  },
  {
    name: { fr: "Entrée principale", en: "Main entrance" },
    description: {
      fr: "Accès sécurisé principal du complexe Marina Cap Monastir",
      en: "Main secure entrance to the Marina Cap Monastir complex",
    },
    icon: Map,
    color: "border-green-200 bg-green-50 text-green-900",
    iconBg: "bg-green-100",
  },
];

export const Route = createFileRoute("/port-de-plaisance/plan")({
  head: () => ({
    meta: [
      { title: headT("Plan du Port — Marina Cap Monastir", "Marina map — Marina Cap Monastir") },
      {
        name: "description",
        content: headT(
          "Découvrez le plan du port de plaisance de Marina Cap Monastir, les accès principaux, la réception Appart-Hôtel, la capitainerie, les quais et les zones de services.",
          "See the Marina Cap Monastir harbour map: main entrances, aparthotel reception, harbour office, quays and service areas.",
        ),
      },
    ],
  }),
  component: PlanPortPage,
});

function PlanPortPage() {
  const [fullscreen, setFullscreen] = useState(false);
  const { t, pick } = useI18n();
  const planAlt = t(
    "Plan du port de plaisance Marina Cap Monastir",
    "Map of the Marina Cap Monastir harbour",
  );

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
            aria-label={t("Fermer", "Close")}
          >
            <X className="size-5" />
          </button>
          <img
            src={PLAN_IMAGE}
            alt={planAlt}
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
            {t("Port de Plaisance", "Marina")}
          </div>
          <h1 className="page-title">{t("Plan du Port", "Marina map")}</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/75">
            {t("Marina Cap Monastir — Port de Plaisance", "Marina Cap Monastir — Marina")}
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
              {t("Port de plaisance — Marina Cap Monastir", "Marina — Marina Cap Monastir")}
            </div>
            <h2 className="text-2xl font-black text-primary">
              {t("Plan du Port de Plaisance", "Harbour map")}
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-muted-foreground">
              {t(
                "Découvrez le plan du port de plaisance de Marina Cap Monastir, les accès principaux, la réception Appart-Hôtel, la capitainerie, les quais et les zones de services.",
                "See the Marina Cap Monastir harbour map: main entrances, aparthotel reception, harbour office, quays and service areas.",
              )}
            </p>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFullscreen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-ocean"
              >
                <Maximize2 className="size-4" />
                {t("Plein écran", "Full screen")}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-primary/25 bg-transparent px-4 text-sm font-bold text-primary transition hover:border-primary/50 hover:bg-primary/5"
              >
                <Download className="size-4" />
                {t("Télécharger", "Download")}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-transparent px-4 text-sm font-bold text-muted-foreground transition hover:border-primary/25 hover:text-primary"
              >
                <Printer className="size-4" />
                {t("Imprimer", "Print")}
              </button>
            </div>

            {/* Plan image */}
            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-secondary/20">
              <button
                type="button"
                onClick={() => setFullscreen(true)}
                className="group relative block w-full cursor-zoom-in"
                title={t("Cliquer pour agrandir", "Click to enlarge")}
              >
                <img
                  src={PLAN_IMAGE}
                  alt={planAlt}
                  className="w-full object-contain transition-opacity group-hover:opacity-96"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = "none";
                    const parent = img.parentElement;
                    if (parent) {
                      const fallback = document.createElement("div");
                      fallback.className =
                        "flex aspect-[4/3] items-center justify-center p-10 text-center";
                      const message = document.createElement("p");
                      message.className = "text-sm font-semibold text-muted-foreground";
                      message.textContent = t("Image non disponible", "Image unavailable");
                      fallback.appendChild(message);
                      parent.appendChild(fallback);
                    }
                  }}
                />
                <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-2 text-xs font-bold text-white backdrop-blur">
                    <ZoomIn className="size-3.5" />
                    {t("Agrandir", "Enlarge")}
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
              {t("Zones et services", "Areas and services")}
            </div>
            <h2 className="section-title mx-auto">{t("Repères du port", "Marina landmarks")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
              {t(
                "Retrouvez ci-dessous les principaux repères du port de plaisance de Marina Cap Monastir.",
                "Below are the main landmarks of the Marina Cap Monastir harbour.",
              )}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portZones.map((zone) => (
              <div
                key={zone.name.fr}
                className={`rounded-xl border p-5 transition hover:-translate-y-0.5 hover:shadow-md ${zone.color}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${zone.iconBg}`}
                  >
                    <zone.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-black">{pick(zone.name)}</h3>
                    <p className="mt-1 text-sm opacity-70">{pick(zone.description)}</p>
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
