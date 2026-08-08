import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Anchor,
  ArrowRight,
  Award,
  Compass,
  ConciergeBell,
  MapPin,
  Sailboat,
  ShieldCheck,
  ShoppingBag,
  Utensils,
  Waves,
  Wrench,
} from "lucide-react";
import heroImg from "@/assets/hero-marina.jpg";
import { SiteHeader } from "@/components/site-header";

const ISO_IMAGE = "/images/port/certification-iso14001.png";
const PAVILLON_IMAGE = "/images/port/label-pavillon-bleu.jpg";

export const Route = createFileRoute("/presentation")({
  head: () => ({
    meta: [
      { title: "Présentation - Marina Cap Monastir" },
      {
        name: "description",
        content:
          "Présentation de Marina Cap Monastir, appart-hôtel et port de plaisance à Monastir.",
      },
    ],
  }),
  component: PresentationPage,
});

function PresentationPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <img
            src={heroImg}
            alt="Marina Cap Monastir"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="luxury-hero-overlay absolute inset-0" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 text-white md:px-6">
            <div className="section-kicker mb-4 text-accent">Présentation</div>
            <h1 className="max-w-3xl text-4xl font-black md:text-6xl">
              Une charmante escapade de Marina à Monastir
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/78">
              À l'horizon de la ville animée de Monastir, Marina Cap Monastir vous invite à
              découvrir un complexe touristique familial, idéal pour des vacances uniques au bord de
              la Méditerranée.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Des beaux paysages", icon: <Compass className="size-5" /> },
              { title: "Divers restaurants", icon: <Utensils className="size-5" /> },
              { title: "Activités marines", icon: <Waves className="size-5" /> },
              { title: "Un confort sans fin", icon: <ConciergeBell className="size-5" /> },
              { title: "Commerces et services", icon: <ShoppingBag className="size-5" /> },
              { title: "Port de plaisance", icon: <Sailboat className="size-5" /> },
            ].map((item) => (
              <article key={item.title} className="premium-card premium-card-hover rounded-lg p-6">
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-secondary text-accent">
                  {item.icon}
                </div>
                <h2 className="text-lg font-black text-primary">{item.title}</h2>
              </article>
            ))}
          </div>
          <Link
            to="/search"
            search={{ adults: 2, children: 0, roomType: "Tous" }}
            className="mt-10 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-ocean"
          >
            Réserver en ligne
            <ArrowRight className="size-4" />
          </Link>
        </section>

        {/* Port de plaisance — real official presentation */}
        <section className="bg-secondary/50 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-8">
              <div className="section-kicker mb-3">
                <Anchor className="size-3.5" />
                Port de Plaisance
              </div>
              <h2 className="section-title">Port d'escale, de passage et d'hivernage</h2>
            </div>
            <div className="premium-card rounded-lg p-6 md:p-8">
              <p className="text-base leading-8 text-muted-foreground">
                Le port de plaisance est à la fois un port d'escale, de passage, d'hivernage et de
                régates, a fait de la Marina et de la ville le point d'appui des clubs nautiques les
                plus réputés en Europe et un lieu de rencontre international convivial et
                privilégié.
              </p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Le port est doté de 300 anneaux, proposant à ses plaisanciers toutes les commodités
                nécessaires et donnant à leur sécurité une importance capitale puisqu'il est
                surveillé 24h/24h par des agents de sécurité et par des caméras de surveillance.
              </p>
              <p className="mt-4 text-base font-semibold leading-8 text-primary">
                La Marina de Monastir est le premier port de plaisance en Afrique à avoir obtenu la
                certification ISO 14001 V 2015, contribuant à un système de management
                environnemental.
              </p>
            </div>
          </div>
        </section>

        {/* Equipements, plan d'eau, localisation */}
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="premium-card rounded-lg p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-secondary text-accent">
                <Wrench className="size-5" />
              </div>
              <h3 className="text-lg font-black text-primary">Équipements et services à quai</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                {[
                  "Service d'accueil 24/24",
                  "Eau et électricité sur bornes de quais 220/380/550 volts",
                  "Bloc sanitaire, douche",
                  "Wifi, caméras de surveillance",
                  "Police et douanes 7j/7j",
                  "Tapisserie et réparation de voiles",
                  "Station gasoil",
                  "Laverie",
                  "Amicale des plaisanciers",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="premium-card rounded-lg p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-secondary text-accent">
                <Waves className="size-5" />
              </div>
              <h3 className="text-lg font-black text-primary">Plan d'eau du port</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                <li>Capacité totale : 300 anneaux</li>
                <li>Longueur bateau maxi : 45 m</li>
                <li>Jetée extérieure : 7 m</li>
                <li>Rade : 6 m – 15 m</li>
                <li>Chenal : 6 m</li>
              </ul>
              <h3 className="mt-6 text-lg font-black text-primary">Prestations techniques</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                <li>Aires de carénage</li>
                <li>Travel-lift 30 tonnes, grue 1,5 tonnes</li>
                <li>Mécanicien, électricien, frigoriste, menuiserie</li>
                <li>Remplissage de bouteilles camping gaz</li>
                <li>Travel-lift jusqu'à 250 tonnes au port de pêche, à 1 mile</li>
              </ul>
            </article>

            <article className="premium-card rounded-lg p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-secondary text-accent">
                <MapPin className="size-5" />
              </div>
              <h3 className="text-lg font-black text-primary">Localisation du port</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Le port se situe au centre-ville de Monastir et à 6 km seulement de l'aéroport
                international Habib Bourguiba.
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                <li>Latitude Nord : 35°46' 7''</li>
                <li>Longitude Est : 10°50' 1''</li>
                <li>80 M Nq de Pantelleria</li>
                <li>180 M Nq de Malte</li>
                <li>226 M Nq de Palerme</li>
                <li>570 M Nq de Nice</li>
              </ul>
            </article>
          </div>
        </section>

        {/* Certifications */}
        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
          <div className="mb-8 text-center">
            <div className="section-kicker mx-auto mb-3 justify-center">
              <Award className="size-3.5" />
              Certifications
            </div>
            <h2 className="section-title mx-auto">Des standards reconnus</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="premium-card flex flex-col items-center rounded-lg p-6 text-center">
              <h3 className="mb-4 text-base font-black text-primary">
                La Certification ISO 14001 V 2015
              </h3>
              <img
                src={ISO_IMAGE}
                alt="Certification ISO 14001 V 2015"
                className="h-24 object-contain"
              />
            </div>
            <div className="premium-card flex flex-col items-center rounded-lg p-6 text-center">
              <h3 className="mb-4 text-base font-black text-primary">Le Label Pavillon Bleu</h3>
              <img src={PAVILLON_IMAGE} alt="Label Pavillon Bleu" className="h-24 object-contain" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
