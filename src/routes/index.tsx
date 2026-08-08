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
  ShipWheel,
  ShoppingBag,
  Sparkles,
  Utensils,
  Waves,
} from "lucide-react";
import heroImg from "@/assets/hero-marina.jpg";
import { RoomCard } from "@/components/room-card";
import { SiteHeader } from "@/components/site-header";
import { getHotelSettings } from "@/lib/services/settingsService";
import { listRoomTypes } from "@/lib/services/roomService";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [settings, roomItems] = await Promise.all([getHotelSettings(), listRoomTypes()]);
    return { settings, roomItems };
  },
  head: () => ({
    meta: [
      { title: "Marina Cap Monastir - Réservation appart-hôtel et port de plaisance" },
      {
        name: "description",
        content:
          "Réservez un appartement ou une place au port de plaisance à Marina Cap Monastir, avec réception, capitainerie, commerces et activités marines.",
      },
      { property: "og:title", content: "Marina Cap Monastir" },
      {
        property: "og:description",
        content: "Appart-hôtel et port de plaisance au bord de la Méditerranée à Monastir.",
      },
    ],
  }),
  component: Home,
});

const NEWS_PREVIEW = [
  {
    title: "Nettoyage du fond du port",
    date: "2018-10-27",
    image: "/images/news/nettoyage-fond-port-2018.jpg",
    slug: "nettoyage-du-fond-du-port-27-10-2018",
  },
  {
    title: "Opération blanche de lutte contre l'incendie",
    date: "2018-11-30",
    image: "/images/news/operation-blanche-incendie-2018.jpg",
    slug: "operation-blanche-de-lutte-contre-incendie-30-11-2018",
  },
  {
    title: "Inauguration du « Yachting Club »",
    date: "2017-11-30",
    image: "/images/news/inauguration-yachting-club-2017.jpg",
    slug: "inauguration-du-yachting-club-30-11-2017",
  },
];

function Home() {
  const { settings, roomItems } = Route.useLoaderData();
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
              Monastir, Tunisie
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">
              Réservez Appartement / Port de plaisance à Marina Cap Monastir
            </h1>
            <p className="mt-4 text-xl font-semibold text-accent">
              Séjournez au cœur de Marina Cap Monastir
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
              Appart-hôtel au port de plaisance de Monastir, chambres, suites et appartements au
              bord de la Méditerranée, avec réception, restaurants, commerces et activités marines.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="tel:+21673462305"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-black text-accent-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-white"
              >
                <Phone className="size-4" />
                Contacter Réception
              </a>
              <a
                href={`mailto:${settings.capitainerieEmail}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 text-sm font-black text-white shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/18"
              >
                <ShipWheel className="size-4" />
                Contact Capitainerie
              </a>
              <Link
                to="/search"
                search={{ adults: 2, children: 0, roomType: "Tous" }}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-primary shadow-lg transition hover:-translate-y-0.5 hover:bg-secondary"
              >
                <CalendarDays className="size-4" />
                Réserver en ligne Appart-Hôtel
              </Link>
              <Link
                to="/port-de-plaisance/reservation"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-accent/50 bg-accent/10 px-5 text-sm font-black text-white shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:bg-accent/20"
              >
                <Anchor className="size-4" />
                Réserver en ligne Port de Plaisance
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
              Présentation
            </div>
            <h2 className="section-title">Une charmante escapade de Marina à Monastir</h2>
          </div>
          <p className="text-base leading-8 text-muted-foreground">
            À l'horizon de la ville animée de Monastir, Marina Cap Monastir vous invite à découvrir
            un complexe touristique familial, idéal pour des vacances uniques au bord de la
            Méditerranée. Profitez d'un cadre marin, de restaurants, de commerces, d'activités et
            d'un confort pensé pour rendre votre séjour agréable.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Des beaux paysages", icon: <Compass className="size-5" /> },
            { title: "Divers restaurants", icon: <Utensils className="size-5" /> },
            { title: "Activités marines", icon: <Waves className="size-5" /> },
            { title: "Un confort sans fin", icon: <ConciergeBell className="size-5" /> },
            { title: "Commerces et services", icon: <ShoppingBag className="size-5" /> },
            { title: "Port de plaisance", icon: <Sailboat className="size-5" /> },
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
              label: "Clients de confiance",
              icon: <CheckCircle2 className="size-5" />,
            },
            { value: "+60", label: "Activités", icon: <Waves className="size-5" /> },
            { value: "+200", label: "Bateaux sur le port", icon: <Sailboat className="size-5" /> },
            { value: "+120", label: "Chambres", icon: <Building2 className="size-5" /> },
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
              Réservation
            </div>
            <h2 className="section-title">Comment réserver votre appartement</h2>
          </div>
          <Link
            to="/search"
            search={{ adults: 2, children: 0, roomType: "Tous" }}
            className="inline-flex h-11 w-fit items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-ocean"
          >
            Réservez maintenant
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Réservation en ligne",
              text: "Cliquez sur le bouton de réservation en ligne et choisissez vos dates, votre chambre ou appartement, puis confirmez votre demande.",
            },
            {
              step: "02",
              title: "Réservation sur place",
              text: "Vous pouvez réserver directement auprès de l'administration ou contacter la réception pour plus d'informations.",
            },
            {
              step: "03",
              title: "Marina Cap Monastir",
              text: "Parcourez le site pour découvrir les appartements, les services, les activités et les options disponibles avant de réserver.",
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
                Appart-Hôtel
              </div>
              <h2 className="section-title">Studios et appartements</h2>
              <p className="mt-3 max-w-xl text-base text-muted-foreground">
                Types d'hébergement issus du contenu officiel Marina Cap Monastir, modernisés pour
                une réservation directe.
              </p>
            </div>
            <Link
              to="/search"
              search={{ adults: 2, children: 0, roomType: "Tous" }}
              className="inline-flex h-11 w-fit items-center gap-2 rounded-lg border border-primary/20 bg-card px-5 text-sm font-bold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10"
            >
              Voir tous les hébergements
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
            Activités
          </div>
          <h2 className="section-title mx-auto">Découvrez Marina Cap Monastir</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Navire Barbaros",
              text: "Excursions quotidiennes avec repas, spectacles et ambiance estivale.",
              icon: <Sailboat className="size-6" />,
            },
            {
              title: "Vues distinctives",
              text: "Chambres et appartements avec vues agréables sur le port et l'environnement marin.",
              icon: <Compass className="size-6" />,
            },
            {
              title: "Divers commerces",
              text: "Restaurants, cafés, marchés et commerces au caractère moderne et traditionnel.",
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
              Port de plaisance
            </div>
            <h2 className="text-3xl font-black md:text-5xl">
              Port d'escale, de passage et d'hivernage
            </h2>
            <p className="mt-5 text-base leading-8 text-white/72">
              Le port de plaisance de Marina Cap Monastir accueille plaisanciers, clubs nautiques et
              séjours au long cours dans un cadre surveillé et certifié.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/port-de-plaisance"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-bold text-primary transition hover:-translate-y-0.5 hover:bg-secondary"
              >
                Découvrir le port
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/port-de-plaisance/plan"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                <Map className="size-4" />
                Plan du port
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "300 anneaux",
              "Surveillance 24h/24",
              "Certification ISO 14001 V 2015",
              "Capitainerie",
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
                title: "Belles vues",
                subtitle: "Beaucoup de souvenirs",
                icon: <Eye className="size-5" />,
              },
              {
                title: "Plus de chambres",
                subtitle: "Plus de confort",
                icon: <Building2 className="size-5" />,
              },
              {
                title: "Activités marines",
                subtitle: "Profitez davantage",
                icon: <Waves className="size-5" />,
              },
              {
                title: "Voyages",
                subtitle: "Bateau, Yacht...",
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
              Notre engagement
            </div>
            <h2 className="section-title">
              Marina Cap Monastir cherche à offrir le meilleur services à tous ses clients
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
              Nous développons des programmes qui donnent énergie et confort pour passer une bonne
              journée et garder un beau souvenir pour chaque visiteur. Profitez des plus belles
              activités avec nous.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-ocean"
            >
              Entrer en contact
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
              Actualités
            </div>
            <h2 className="section-title">Explorez nos Actualités</h2>
          </div>
          <Link
            to="/actualites"
            className="inline-flex h-11 w-fit items-center gap-2 rounded-lg border border-primary/20 bg-card px-5 text-sm font-bold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10"
          >
            En savoir plus
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
              <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-5">
                <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-accent">
                  <CalendarDays className="size-3.5" />
                  {new Intl.DateTimeFormat("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(`${item.date}T12:00:00`))}
                </div>
                <h3 className="mt-2 text-lg font-black text-primary">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="premium-card grid gap-8 rounded-lg p-6 md:grid-cols-2 md:p-8">
          <div>
            <div className="section-kicker mb-3">Contact</div>
            <h2 className="section-title">Réception et capitainerie</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
              Une demande de séjour, d'escale ou de réservation port? Contactez directement l'équipe
              concernée.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ContactMini
              title="Appart Hôtel / Réception"
              phone={settings.phone}
              tel="+21673462305"
              email={settings.email}
            />
            <ContactMini
              title="Capitainerie"
              phone={settings.capitaineriePhones.join(" / ")}
              tel="+21673462066"
              email={settings.capitainerieEmail}
            />
          </div>
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
                Appart-hôtel, port de plaisance et hospitalité méditerranéenne à Monastir, Tunisie.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                BP.N°60 - 5000 Monastir - Tunisie
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
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search"
                    search={{ adults: 2, children: 0, roomType: "Tous" }}
                    className="hover:text-primary"
                  >
                    Appart-Hôtel
                  </Link>
                </li>
                <li>
                  <Link to="/port-de-plaisance" className="hover:text-primary">
                    Port de Plaisance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search"
                    search={{ adults: 2, children: 0, roomType: "Tous" }}
                    className="hover:text-primary"
                  >
                    Réservation Appart-Hôtel
                  </Link>
                </li>
                <li>
                  <Link to="/port-de-plaisance/reservation" className="hover:text-primary">
                    Réservation Port de Plaisance
                  </Link>
                </li>
                <li>
                  <Link to="/port-de-plaisance/plan" className="hover:text-primary">
                    Plan du Port
                  </Link>
                </li>
                <li>
                  <Link to="/presentation" className="hover:text-primary">
                    Présentation
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Appart-Hôtel */}
            <div>
              <h4 className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-primary">
                Appart-Hôtel
              </h4>
              <ul className="space-y-2 text-sm font-semibold text-muted-foreground">
                <li>
                  <a href="tel:+21673462305" className="flex items-center gap-2 hover:text-primary">
                    <Phone className="size-3.5 shrink-0 text-accent" />
                    (+216) 73 46 23 05
                  </a>
                </li>
                <li className="pl-5 text-xs text-muted-foreground/70">Fax: (+216) 73 46 49 97</li>
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
                Capitainerie
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
                  Recevez les actualités, offres et informations de Marina Cap Monastir.
                </p>
                <a
                  href="mailto:reservation@marinamonastir.tn?subject=Newsletter"
                  className="mt-2 inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-bold text-white transition hover:bg-ocean"
                >
                  S'abonner
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border py-5 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Marina Cap Monastir · Tous droits réservés
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactMini({
  title,
  phone,
  tel,
  email,
}: {
  title: string;
  phone: string;
  tel: string;
  email: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-white p-4 shadow-sm">
      <h3 className="font-black text-primary">{title}</h3>
      <a
        href={`tel:${tel}`}
        className="mt-3 block text-sm font-semibold text-foreground hover:text-accent"
      >
        {phone}
      </a>
      <a
        href={`mailto:${email}`}
        className="mt-1 block text-sm font-semibold text-primary hover:text-accent"
      >
        {email}
      </a>
    </div>
  );
}
