import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Phone, Waves } from "lucide-react";
import heroImg from "@/assets/hero-marina.jpg";
import { SiteHeader } from "@/components/site-header";
import { boatActivities } from "@/data/activities";

export const Route = createFileRoute("/activites")({
  head: () => ({
    meta: [
      { title: "Activités & excursions en bateau - Marina Cap Monastir" },
      {
        name: "description",
        content:
          "Navire Barbaros, catamaran, pêche en mer, coucher de soleil, jet-ski, plongée et location de yacht au départ de Marina Cap Monastir.",
      },
    ],
  }),
  component: ActivitiesPage,
});

function ActivitiesPage() {
  const [featured, ...others] = boatActivities;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <img
            src={heroImg}
            alt="Bateaux au port de Marina Cap Monastir"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="luxury-hero-overlay absolute inset-0" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 text-white md:px-6">
            <div className="section-kicker mb-4 text-accent">
              <Waves className="size-3.5" />
              Activités
            </div>
            <h1 className="hero-title max-w-3xl">Excursions et sorties en bateau</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/78">
              Au départ de la marina, profitez de la Méditerranée autrement : croisières, pêche,
              sports nautiques, plongée ou sortie privée en voilier.
            </p>
          </div>
        </section>

        {featured && (
          <section className="mx-auto max-w-7xl px-4 pt-16 md:px-6">
            <article className="premium-card grid overflow-hidden rounded-lg md:grid-cols-[22rem_1fr]">
              {featured.image && (
                <img
                  src={featured.image}
                  alt={featured.title.fr}
                  className="h-56 w-full object-cover md:h-full"
                />
              )}
              <div className="p-6 md:p-10">
                <div className="section-kicker mb-3">À la une</div>
                <h2 className="section-title">{featured.title.fr}</h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {featured.description.fr}
                </p>
              </div>
            </article>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="mb-10">
            <div className="section-kicker mb-3">
              <Waves className="size-3.5" />
              Sorties en mer
            </div>
            <h2 className="section-title">Toutes les sorties en bateau</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((activity) => {
              const Icon = activity.icon;
              return (
                <article
                  key={activity.id}
                  className="premium-card premium-card-hover rounded-lg p-6"
                >
                  <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-secondary text-accent">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-black text-primary">{activity.title.fr}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {activity.description.fr}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
          <div className="flex flex-col gap-6 rounded-lg bg-gradient-to-br from-ocean to-primary p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h2 className="text-2xl font-black md:text-3xl">Envie d'une sortie en mer ?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/75">
                Contactez la réception pour connaître les horaires, les tarifs et les disponibilités
                des excursions.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-black text-accent-foreground transition hover:-translate-y-0.5 hover:bg-white"
              >
                <Phone className="size-4" />
                Contacter
              </Link>
              <Link
                to="/search"
                search={{ adults: 2, children: 0, roomType: "Tous" }}
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/18"
              >
                <CalendarCheck className="size-4" />
                Réserver un appartement
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
