import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Anchor,
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Compass,
  ConciergeBell,
  Eye,
  Facebook,
  Mail,
  Map,
  MapPin,
  Newspaper,
  Phone,
  Sailboat,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Utensils,
  Waves,
} from "lucide-react";
import heroImg from "@/assets/hero-marina.jpg";
import { RoomCard } from "@/components/room-card";
import { boatActivities } from "@/data/activities";
import { SiteHeader } from "@/components/site-header";
import { headT } from "@/lib/i18n/head";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { listRoomTypes } from "@/lib/services/roomService";

export const Route = createFileRoute("/")({
  loader: async () => {
    const roomItems = await listRoomTypes();
    return { roomItems };
  },
  head: () => ({
    meta: [
      {
        title: headT(
          "Marina Cap Monastir - Réservation appart-hôtel et port de plaisance",
          "Marina Cap Monastir - Aparthotel and marina bookings",
        ),
      },
      {
        name: "description",
        content: headT(
          "Réservez un appartement ou une place au port de plaisance à Marina Cap Monastir, avec réception, capitainerie, commerces et activités marines.",
          "Book an apartment or a berth at Marina Cap Monastir, with reception, harbour office, shops and sea activities.",
        ),
      },
      { property: "og:title", content: "Marina Cap Monastir" },
      {
        property: "og:description",
        content: headT(
          "Appart-hôtel et port de plaisance au bord de la Méditerranée à Monastir.",
          "Aparthotel and marina on the Mediterranean in Monastir.",
        ),
      },
    ],
  }),
  component: Home,
});

const NEWS_PREVIEW = [
  {
    title: { fr: "Nettoyage du fond du port", en: "Harbour seabed clean-up" },
    date: "2018-10-27",
    image: "/images/news/nettoyage-fond-port-2018.jpg",
    slug: "nettoyage-du-fond-du-port-27-10-2018",
  },
  {
    title: {
      fr: "Opération blanche de lutte contre l'incendie",
      en: "Fire-fighting drill",
    },
    date: "2018-11-30",
    image: "/images/news/operation-blanche-incendie-2018.jpg",
    slug: "operation-blanche-de-lutte-contre-incendie-30-11-2018",
  },
  {
    title: { fr: "Inauguration du « Yachting Club »", en: "Opening of the “Yachting Club”" },
    date: "2017-11-30",
    image: "/images/news/inauguration-yachting-club-2017.jpg",
    slug: "inauguration-du-yachting-club-30-11-2017",
  },
];

function Home() {
  const { roomItems } = Route.useLoaderData();
  const { t, pick, formatDate } = useI18n();
  const featuredRooms = roomItems.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative min-h-[calc(100vh-4.25rem)] overflow-hidden">
        <img
          src={heroImg}
          alt="Marina Cap Monastir"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(3,20,34,0.94)_0%,rgba(0,59,92,0.78)_44%,rgba(0,59,92,0.22)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background to-transparent" />

        <div className="relative mx-auto flex min-h-[calc(100vh-4.25rem)] max-w-7xl items-center px-4 py-20 md:px-6">
          <div className="max-w-3xl text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] shadow-lg backdrop-blur">
              <MapPin className="size-4 text-accent" />
              {t("Monastir, Tunisie", "Monastir, Tunisia")}
            </div>
            <h1 className="hero-title">
              {t("Bienvenue à Marina Cap Monastir", "Welcome to Marina Cap Monastir")}
            </h1>
            <p className="mt-5 text-xl font-semibold text-accent md:text-2xl">
              {t(
                "Votre séjour les pieds dans l'eau, au cœur de la Méditerranée",
                "Your waterfront stay in the heart of the Mediterranean",
              )}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
              {t(
                "Studios et appartements face au port de plaisance, réception à votre écoute, restaurants, commerces et activités marines : tout est réuni pour des vacances inoubliables à Monastir.",
                "Studios and apartments facing the marina, a friendly reception team, restaurants, shops and sea activities: everything you need for an unforgettable holiday in Monastir.",
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/search"
                search={{ adults: 2, children: 0, roomType: "Tous" }}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-black text-accent-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-white"
              >
                <CalendarDays className="size-4" />
                {t("Réserver en ligne Appart-Hôtel", "Book the aparthotel online")}
              </Link>
              <Link
                to="/port-de-plaisance/reservation"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-primary shadow-lg transition hover:-translate-y-0.5 hover:bg-secondary"
              >
                <Anchor className="size-4" />
                {t("Réserver en ligne Port de Plaisance", "Book a berth online")}
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 text-sm font-black text-white shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/18"
              >
                <Phone className="size-4" />
                {t("Contacter", "Contact us")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="presentation" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="section-kicker mb-3">
              <Sparkles className="size-3.5" />
              {t("Présentation", "About")}
            </div>
            <h2 className="section-title">
              {t(
                "Une charmante escapade de Marina à Monastir",
                "A charming marina getaway in Monastir",
              )}
            </h2>
          </div>
          <p className="text-base leading-8 text-muted-foreground">
            {t(
              "À l'horizon de la ville animée de Monastir, Marina Cap Monastir vous invite à découvrir un complexe touristique familial, idéal pour des vacances uniques au bord de la Méditerranée. Profitez d'un cadre marin, de restaurants, de commerces, d'activités et d'un confort pensé pour rendre votre séjour agréable.",
              "On the edge of lively Monastir, Marina Cap Monastir welcomes you to a family-friendly resort, ideal for a unique holiday by the Mediterranean. Enjoy the seaside setting, restaurants, shops, activities and comfort designed to make your stay a pleasure.",
            )}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: t("Des beaux paysages", "Beautiful scenery"),
              icon: <Compass className="size-5" />,
            },
            {
              title: t("Divers restaurants", "A choice of restaurants"),
              icon: <Utensils className="size-5" />,
            },
            { title: t("Activités marines", "Sea activities"), icon: <Waves className="size-5" /> },
            {
              title: t("Un confort sans fin", "Comfort at every turn"),
              icon: <ConciergeBell className="size-5" />,
            },
            {
              title: t("Commerces et services", "Shops and services"),
              icon: <ShoppingBag className="size-5" />,
            },
            { title: t("Port de plaisance", "Marina"), icon: <Sailboat className="size-5" /> },
          ].map((feature) => (
            <article key={feature.title} className="premium-card premium-card-hover rounded-lg p-5">
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-secondary text-accent">
                {feature.icon}
              </div>
              <h3 className="text-base font-black text-primary">{feature.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ocean py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-4 md:px-6">
          {[
            {
              value: "+2000",
              label: t("Clients de confiance", "Happy guests"),
              icon: <CheckCircle2 className="size-5" />,
            },
            {
              value: "+60",
              label: t("Activités", "Activities"),
              icon: <Waves className="size-5" />,
            },
            {
              value: "+200",
              label: t("Bateaux sur le port", "Boats in the marina"),
              icon: <Sailboat className="size-5" />,
            },
            {
              value: "+120",
              label: t("Chambres", "Rooms"),
              icon: <Building2 className="size-5" />,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-white/12 bg-white/[0.07] p-5 shadow-lg backdrop-blur"
            >
              <div className="mb-4 text-accent">{stat.icon}</div>
              <div className="text-4xl font-black text-white">{stat.value}</div>
              <div className="mt-2 text-sm font-semibold text-white/65">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-kicker mb-3">
              <CalendarDays className="size-3.5" />
              {t("Réservation", "Booking")}
            </div>
            <h2 className="section-title">
              {t("Comment réserver votre appartement", "How to book your apartment")}
            </h2>
          </div>
          <Link
            to="/search"
            search={{ adults: 2, children: 0, roomType: "Tous" }}
            className="inline-flex h-11 w-fit items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-ocean"
          >
            {t("Réservez maintenant", "Book now")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              step: "01",
              title: t("Réservation en ligne", "Book online"),
              text: t(
                "Cliquez sur le bouton de réservation en ligne et choisissez vos dates, votre chambre ou appartement, puis confirmez votre demande.",
                "Click the online booking button, choose your dates and your room or apartment, then confirm your request.",
              ),
            },
            {
              step: "02",
              title: t("Réservation sur place", "Book on site"),
              text: t(
                "Vous pouvez réserver directement auprès de l'administration ou contacter la réception pour plus d'informations.",
                "You can book directly with the administration or contact reception for more information.",
              ),
            },
            {
              step: "03",
              title: "Marina Cap Monastir",
              text: t(
                "Parcourez le site pour découvrir les appartements, les services, les activités et les options disponibles avant de réserver.",
                "Browse the website to discover the apartments, services, activities and options available before booking.",
              ),
            },
          ].map((item) => (
            <article key={item.step} className="premium-card premium-card-hover rounded-lg p-6">
              <div className="mb-5 text-4xl font-black text-accent">{item.step}</div>
              <h3 className="text-xl font-black text-primary">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="chambres" className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="section-kicker mb-3">
                <Building2 className="size-3.5" />
                {t("Appart-Hôtel", "Aparthotel")}
              </div>
              <h2 className="section-title">
                {t("Studios et appartements", "Studios and apartments")}
              </h2>
              <p className="mt-3 max-w-xl text-base text-muted-foreground">
                {t(
                  "Studios et appartements au cœur de la marina, à réserver directement en ligne.",
                  "Studios and apartments in the heart of the marina, bookable directly online.",
                )}
              </p>
            </div>
            <Link
              to="/search"
              search={{ adults: 2, children: 0, roomType: "Tous" }}
              className="inline-flex h-11 w-fit items-center gap-2 rounded-lg border border-primary/20 bg-card px-5 text-sm font-bold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10"
            >
              {t("Voir tous les hébergements", "See all accommodation")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="mb-10 text-center">
          <div className="section-kicker mx-auto mb-3 justify-center">
            <Waves className="size-3.5" />
            {t("Activités", "Activities")}
          </div>
          <h2 className="section-title mx-auto">
            {t("Découvrez Marina Cap Monastir", "Discover Marina Cap Monastir")}
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <Link
            to="/activites"
            className="premium-card premium-card-hover group flex flex-col rounded-lg p-6"
          >
            <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-secondary text-accent">
              <Sailboat className="size-6" />
            </div>
            <h3 className="text-xl font-black text-primary">
              {t("Excursions en bateau", "Boat trips")}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {boatActivities.map((activity) => pick(activity.title)).join(", ")}.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-black text-accent">
              {t("Voir toutes les sorties", "See all boat trips")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          {[
            {
              title: t("Vues distinctives", "Outstanding views"),
              text: t(
                "Chambres et appartements avec vues agréables sur le port et l'environnement marin.",
                "Rooms and apartments with lovely views over the marina and the sea.",
              ),
              icon: <Compass className="size-6" />,
            },
            {
              title: t("Divers commerces", "Shops of every kind"),
              text: t(
                "Restaurants, cafés, marchés et commerces au caractère moderne et traditionnel.",
                "Restaurants, cafés, markets and shops, both modern and traditional.",
              ),
              icon: <ShoppingBag className="size-6" />,
            },
          ].map((activity) => (
            <article
              key={activity.title}
              className="premium-card premium-card-hover rounded-lg p-6"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-secondary text-accent">
                {activity.icon}
              </div>
              <h3 className="text-xl font-black text-primary">{activity.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{activity.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="port" className="bg-gradient-to-b from-ocean to-primary py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-accent">
              <Anchor className="size-3.5" />
              {t("Port de plaisance", "Marina")}
            </div>
            <h2 className="section-title text-white">
              {t(
                "Port d'escale, de passage et d'hivernage",
                "A port of call, transit and wintering",
              )}
            </h2>
            <p className="mt-5 text-base leading-8 text-white/72">
              {t(
                "Le port de plaisance de Marina Cap Monastir accueille plaisanciers, clubs nautiques et séjours au long cours dans un cadre surveillé et certifié.",
                "The Marina Cap Monastir harbour welcomes yachtsmen, sailing clubs and long stays in a supervised, certified setting.",
              )}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/port-de-plaisance"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-bold text-primary transition hover:-translate-y-0.5 hover:bg-secondary"
              >
                {t("Découvrir le port", "Discover the marina")}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/port-de-plaisance/plan"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                <Map className="size-4" />
                {t("Plan du port", "Marina map")}
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              t("300 anneaux", "300 berths"),
              t("Surveillance 24h/24", "24/7 security"),
              t("Certification ISO 14001 V 2015", "ISO 14001:2015 certified"),
              t("Capitainerie", "Harbour office"),
            ].map((item) => (
              <div key={item} className="rounded-lg border border-white/12 bg-white/[0.07] p-5">
                <ShieldCheck className="mb-3 size-5 text-accent" />
                <div className="font-black">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                title: t("Belles vues", "Beautiful views"),
                subtitle: t("Beaucoup de souvenirs", "Lasting memories"),
                icon: <Eye className="size-5" />,
              },
              {
                title: t("Plus de chambres", "More rooms"),
                subtitle: t("Plus de confort", "More comfort"),
                icon: <Building2 className="size-5" />,
              },
              {
                title: t("Activités marines", "Sea activities"),
                subtitle: t("Profitez davantage", "Enjoy even more"),
                icon: <Waves className="size-5" />,
              },
              {
                title: t("Voyages", "Trips"),
                subtitle: t("Bateau, Yacht...", "Boat, yacht..."),
                icon: <Sailboat className="size-5" />,
              },
            ].map((item) => (
              <div key={item.title} className="premium-card rounded-lg p-5">
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-secondary text-accent">
                  {item.icon}
                </div>
                <h3 className="text-base font-black text-primary">{item.title}</h3>
                <p className="mt-1 text-xs font-semibold text-muted-foreground">{item.subtitle}</p>
              </div>
            ))}
          </div>
          <div>
            <div className="section-kicker mb-3">
              <ShieldCheck className="size-3.5" />
              {t("Notre engagement", "Our commitment")}
            </div>
            <h2 className="section-title">
              {t(
                "Marina Cap Monastir s'engage à offrir le meilleur service à tous ses clients",
                "Marina Cap Monastir is committed to giving every guest the best service",
              )}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
              {t(
                "Nous développons des programmes qui donnent énergie et confort pour passer une bonne journée et garder un beau souvenir pour chaque visiteur. Profitez des plus belles activités avec nous.",
                "We create programmes that bring energy and comfort, so every visitor enjoys a great day and leaves with fond memories. Enjoy the best activities with us.",
              )}
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-ocean"
            >
              {t("Contacter", "Contact us")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-kicker mb-3">
              <Newspaper className="size-3.5" />
              {t("Actualités", "News")}
            </div>
            <h2 className="section-title">{t("Explorez nos Actualités", "Explore our news")}</h2>
          </div>
          <Link
            to="/actualites"
            className="inline-flex h-11 w-fit items-center gap-2 rounded-lg border border-primary/20 bg-card px-5 text-sm font-bold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10"
          >
            {t("En savoir plus", "Learn more")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {NEWS_PREVIEW.map((item) => (
            <Link
              key={item.slug}
              to="/actualites"
              className="premium-card premium-card-hover block overflow-hidden rounded-lg"
            >
              <img src={item.image} alt={pick(item.title)} className="h-48 w-full object-cover" />
              <div className="p-5">
                <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-accent">
                  <CalendarDays className="size-3.5" />
                  {formatDate(item.date, { day: "2-digit", month: "long", year: "numeric" })}
                </div>
                <h3 className="mt-2 text-lg font-black text-primary">{pick(item.title)}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {/* Main footer grid */}
          <div className="grid gap-10 py-12 md:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <Anchor className="size-5 text-accent" />
                <span className="text-lg font-black text-primary">Marina Cap Monastir</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {t(
                  "Appart-hôtel, port de plaisance et hospitalité méditerranéenne à Monastir, Tunisie.",
                  "Aparthotel, marina and Mediterranean hospitality in Monastir, Tunisia.",
                )}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {t("BP.N°60 - 5000 Monastir - Tunisie", "PO Box 60 - 5000 Monastir - Tunisia")}
              </p>
              <a
                href="https://www.facebook.com/CAPmarinamonastir11"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
              >
                <Facebook className="size-4 text-accent" />
                Facebook
              </a>
            </div>

            {/* Navigation links */}
            <div>
              <h4 className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-primary">
                Navigation
              </h4>
              <ul className="space-y-2 text-sm font-semibold text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-primary">
                    {t("Accueil", "Home")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search"
                    search={{ adults: 2, children: 0, roomType: "Tous" }}
                    className="hover:text-primary"
                  >
                    {t("Appart-Hôtel", "Aparthotel")}
                  </Link>
                </li>
                <li>
                  <Link to="/port-de-plaisance" className="hover:text-primary">
                    {t("Port de Plaisance", "Marina")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search"
                    search={{ adults: 2, children: 0, roomType: "Tous" }}
                    className="hover:text-primary"
                  >
                    {t("Réservation Appart-Hôtel", "Aparthotel booking")}
                  </Link>
                </li>
                <li>
                  <Link to="/port-de-plaisance/reservation" className="hover:text-primary">
                    {t("Réservation Port de Plaisance", "Berth booking")}
                  </Link>
                </li>
                <li>
                  <Link to="/port-de-plaisance/plan" className="hover:text-primary">
                    {t("Plan du Port", "Marina map")}
                  </Link>
                </li>
                <li>
                  <Link to="/activites" className="hover:text-primary">
                    {t("Activités", "Activities")}
                  </Link>
                </li>
                <li>
                  <Link to="/presentation" className="hover:text-primary">
                    {t("Présentation", "About")}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary">
                    {t("Contacter", "Contact us")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Appart-Hôtel */}
            <div>
              <h4 className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-primary">
                {t("Appart-Hôtel", "Aparthotel")}
              </h4>
              <ul className="space-y-2 text-sm font-semibold text-muted-foreground">
                <li>
                  <a href="tel:+21673462305" className="flex items-center gap-2 hover:text-primary">
                    <Phone className="size-3.5 shrink-0 text-accent" />
                    (+216) 73 46 23 05
                  </a>
                </li>
                <li className="pl-5 text-xs text-muted-foreground/70">Fax : (+216) 73 46 49 97</li>
                <li>
                  <a
                    href="mailto:reservation@marinamonastir.tn"
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <Mail className="size-3.5 shrink-0 text-accent" />
                    reservation@marinamonastir.tn
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:marketing@marinamonastir.tn"
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <Mail className="size-3.5 shrink-0 text-accent" />
                    marketing@marinamonastir.tn
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Capitainerie + Newsletter */}
            <div>
              <h4 className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-primary">
                {t("Capitainerie", "Harbour office")}
              </h4>
              <ul className="space-y-2 text-sm font-semibold text-muted-foreground">
                <li>
                  <a href="tel:+21673462305" className="flex items-center gap-2 hover:text-primary">
                    <Phone className="size-3.5 shrink-0 text-accent" />
                    (+216) 73 46 23 05
                  </a>
                </li>
                <li>
                  <a href="tel:+21673462066" className="flex items-center gap-2 hover:text-primary">
                    <Phone className="size-3.5 shrink-0 text-accent" />
                    (+216) 73 46 20 66
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:capitainerie@marinamonastir.tn"
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <Mail className="size-3.5 shrink-0 text-accent" />
                    capitainerie@marinamonastir.tn
                  </a>
                </li>
              </ul>

              {/* Newsletter */}
              <div className="mt-6 rounded-lg border border-border bg-white p-4">
                <p className="text-xs font-semibold leading-5 text-muted-foreground">
                  {t(
                    "Recevez les actualités, offres et informations de Marina Cap Monastir.",
                    "Get Marina Cap Monastir news, offers and updates.",
                  )}
                </p>
                <a
                  href="mailto:reservation@marinamonastir.tn?subject=Newsletter"
                  className="mt-2 inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-bold text-white transition hover:bg-ocean"
                >
                  {t("S'abonner", "Subscribe")}
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border py-5 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Marina Cap Monastir ·{" "}
            {t("Tous droits réservés", "All rights reserved")}
          </div>
        </div>
      </footer>
    </div>
  );
}
