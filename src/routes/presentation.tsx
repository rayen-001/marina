import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Anchor,
  ArrowRight,
  Award,
  Compass,
  ConciergeBell,
  Images,
  MapPin,
  Sailboat,
  ShieldCheck,
  ShoppingBag,
  Utensils,
  Waves,
  Wrench,
} from "lucide-react";
import heroImg from "@/assets/hero-marina.jpg";
import { PhotoGallery } from "@/components/photo-gallery";
import { SiteHeader } from "@/components/site-header";
import { headT } from "@/lib/i18n/head";
import { useI18n } from "@/lib/i18n/I18nProvider";

const ISO_IMAGE = "/images/port/certification-iso14001.png";
const PAVILLON_IMAGE = "/images/port/label-pavillon-bleu.jpg";

export const Route = createFileRoute("/presentation")({
  head: () => ({
    meta: [
      { title: headT("Présentation - Marina Cap Monastir", "About - Marina Cap Monastir") },
      {
        name: "description",
        content: headT(
          "Présentation de Marina Cap Monastir, appart-hôtel et port de plaisance à Monastir.",
          "About Marina Cap Monastir, aparthotel and marina in Monastir.",
        ),
      },
    ],
  }),
  component: PresentationPage,
});

function PresentationPage() {
  const { t } = useI18n();
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
            <div className="section-kicker mb-4 text-accent">{t("Présentation", "About")}</div>
            <h1 className="hero-title max-w-3xl">
              {t(
                "Une charmante escapade de Marina à Monastir",
                "A charming marina getaway in Monastir",
              )}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/78">
              {t(
                "À l'horizon de la ville animée de Monastir, Marina Cap Monastir vous invite à découvrir un complexe touristique familial, idéal pour des vacances uniques au bord de la Méditerranée.",
                "On the edge of lively Monastir, Marina Cap Monastir welcomes you to a family-friendly resort, ideal for a unique holiday by the Mediterranean.",
              )}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: t("Des beaux paysages", "Beautiful scenery"),
                icon: <Compass className="size-5" />,
              },
              {
                title: t("Divers restaurants", "A choice of restaurants"),
                icon: <Utensils className="size-5" />,
              },
              {
                title: t("Activités marines", "Sea activities"),
                icon: <Waves className="size-5" />,
              },
              {
                title: t("Un confort sans fin", "Comfort at every turn"),
                icon: <ConciergeBell className="size-5" />,
              },
              {
                title: t("Commerces et services", "Shops and services"),
                icon: <ShoppingBag className="size-5" />,
              },
              { title: t("Port de plaisance", "Marina"), icon: <Sailboat className="size-5" /> },
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
            {t("Réserver en ligne", "Book online")}
            <ArrowRight className="size-4" />
          </Link>
        </section>

        <section className="bg-secondary/50 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-8 text-center">
              <div className="section-kicker mx-auto mb-3 justify-center">
                <Images className="size-3.5" />
                {t("Galerie", "Gallery")}
              </div>
              <h2 className="section-title mx-auto">
                {t("La Marina en images", "The Marina in pictures")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                {t(
                  "Paysages, hébergements, commerces et temps forts de Marina Cap Monastir.",
                  "Scenery, accommodation, shops and highlights of Marina Cap Monastir.",
                )}
              </p>
            </div>
            <PhotoGallery />
          </div>
        </section>

        {/* Port de plaisance — real official presentation */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-8">
              <div className="section-kicker mb-3">
                <Anchor className="size-3.5" />
                {t("Port de Plaisance", "Marina")}
              </div>
              <h2 className="section-title">
                {t(
                  "Port d'escale, de passage et d'hivernage",
                  "A port of call, transit and wintering",
                )}
              </h2>
            </div>
            <div className="premium-card rounded-lg p-6 md:p-8">
              <p className="text-base leading-8 text-muted-foreground">
                {t(
                  "Port d'escale, de passage, d'hivernage et de régates, le port de plaisance a fait de la Marina et de la ville le point d'appui des clubs nautiques les plus réputés d'Europe et un lieu de rencontre international convivial et privilégié.",
                  "A port of call, transit, wintering and regattas, the marina has made the Marina and the town a base for Europe's best-known sailing clubs and a friendly, exclusive international meeting place.",
                )}
              </p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                {t(
                  "Le port est doté de 300 anneaux, proposant à ses plaisanciers toutes les commodités nécessaires et donnant à leur sécurité une importance capitale puisqu'il est surveillé 24h/24 par des agents de sécurité et par des caméras de surveillance.",
                  "The harbour has 300 berths and offers boaters every facility they need. Safety is a top priority: the marina is guarded 24/7 by security staff and CCTV cameras.",
                )}
              </p>
              <p className="mt-4 text-base font-semibold leading-8 text-primary">
                {t(
                  "La Marina de Monastir est le premier port de plaisance en Afrique à avoir obtenu la certification ISO 14001 V 2015, contribuant à un système de management environnemental.",
                  "Marina de Monastir is the first marina in Africa to be awarded ISO 14001:2015 certification for its environmental management system.",
                )}
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
              <h3 className="text-lg font-black text-primary">
                {t("Équipements et services à quai", "Quayside facilities and services")}
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                {[
                  t("Service d'accueil 24/24", "24/7 welcome service"),
                  t(
                    "Eau et électricité sur bornes de quais 220/380/550 volts",
                    "Water and electricity at quay terminals (220/380/550 V)",
                  ),
                  t("Bloc sanitaire, douche", "Toilets and showers"),
                  t("Wifi, caméras de surveillance", "Wi-Fi, CCTV cameras"),
                  t("Police et douanes 7j/7j", "Police and customs 7 days a week"),
                  t("Tapisserie et réparation de voiles", "Upholstery and sail repair"),
                  t("Station gasoil", "Diesel station"),
                  t("Laverie", "Laundry"),
                  t("Amicale des plaisanciers", "Boaters' association"),
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
              <h3 className="text-lg font-black text-primary">
                {t("Plan d'eau du port", "Harbour basin")}
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                <li>{t("Capacité totale : 300 anneaux", "Total capacity: 300 berths")}</li>
                <li>{t("Longueur bateau maxi : 45 m", "Maximum boat length: 45 m")}</li>
                <li>{t("Jetée extérieure : 7 m", "Outer jetty: 7 m")}</li>
                <li>{t("Rade : 6 m – 15 m", "Roadstead: 6 m – 15 m")}</li>
                <li>{t("Chenal : 6 m", "Channel: 6 m")}</li>
              </ul>
              <h3 className="mt-6 text-lg font-black text-primary">
                {t("Prestations techniques", "Technical services")}
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                <li>{t("Aires de carénage", "Careening areas")}</li>
                <li>
                  {t(
                    "Travel-lift 30 tonnes, grue 1,5 tonnes",
                    "30-tonne travel lift, 1.5-tonne crane",
                  )}
                </li>
                <li>
                  {t(
                    "Mécanicien, électricien, frigoriste, menuiserie",
                    "Mechanic, electrician, refrigeration technician, carpentry",
                  )}
                </li>
                <li>{t("Remplissage de bouteilles camping gaz", "Camping gas bottle refills")}</li>
                <li>
                  {t(
                    "Travel-lift jusqu'à 250 tonnes au port de pêche, à 1 mile",
                    "Travel lift up to 250 tonnes at the fishing port, 1 mile away",
                  )}
                </li>
              </ul>
            </article>

            <article className="premium-card rounded-lg p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-secondary text-accent">
                <MapPin className="size-5" />
              </div>
              <h3 className="text-lg font-black text-primary">
                {t("Localisation du port", "Marina location")}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {t(
                  "Le port se situe au centre-ville de Monastir et à 6 km seulement de l'aéroport international Habib Bourguiba.",
                  "The marina is in the centre of Monastir, just 6 km from Habib Bourguiba International Airport.",
                )}
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                <li>{t("Latitude Nord : 35°46' 7''", "Latitude North: 35°46' 7''")}</li>
                <li>{t("Longitude Est : 10°50' 1''", "Longitude East: 10°50' 1''")}</li>
                <li>{t("80 M Nq de Pantelleria", "80 NM from Pantelleria")}</li>
                <li>{t("180 M Nq de Malte", "180 NM from Malta")}</li>
                <li>{t("226 M Nq de Palerme", "226 NM from Palermo")}</li>
                <li>{t("570 M Nq de Nice", "570 NM from Nice")}</li>
              </ul>
            </article>
          </div>
        </section>

        {/* Certifications */}
        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
          <div className="mb-8 text-center">
            <div className="section-kicker mx-auto mb-3 justify-center">
              <Award className="size-3.5" />
              {t("Certifications", "Certifications")}
            </div>
            <h2 className="section-title mx-auto">
              {t("Des standards reconnus", "Recognised standards")}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="premium-card flex flex-col items-center rounded-lg p-6 text-center">
              <h3 className="mb-4 text-base font-black text-primary">
                {t("La Certification ISO 14001 V 2015", "ISO 14001:2015 certification")}
              </h3>
              <img
                src={ISO_IMAGE}
                alt={t("Certification ISO 14001 V 2015", "ISO 14001:2015 certification")}
                className="h-24 object-contain"
              />
            </div>
            <div className="premium-card flex flex-col items-center rounded-lg p-6 text-center">
              <h3 className="mb-4 text-base font-black text-primary">
                {t("Le Label Pavillon Bleu", "Blue Flag label")}
              </h3>
              <img
                src={PAVILLON_IMAGE}
                alt={t("Label Pavillon Bleu", "Blue Flag label")}
                className="h-24 object-contain"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
