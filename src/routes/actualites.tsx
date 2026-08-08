import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Newspaper } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/actualites")({
  head: () => ({
    meta: [
      { title: "Actualités - Marina Cap Monastir" },
      {
        name: "description",
        content:
          "Actualités de Marina Cap Monastir : événements nautiques, opérations de nettoyage du port, inaugurations et vie de la marina.",
      },
    ],
  }),
  component: ActualitesPage,
});

type NewsItem = {
  title: string;
  date: string;
  image: string;
};

const news: NewsItem[] = [
  {
    title: "Nettoyage du fond du port",
    date: "2018-10-27",
    image: "/images/news/nettoyage-fond-port-2018.jpg",
  },
  {
    title: "Opération blanche de lutte contre l'incendie",
    date: "2018-11-30",
    image: "/images/news/operation-blanche-incendie-2018.jpg",
  },
  {
    title: "Nettoyage du fond du port",
    date: "2018-01-28",
    image: "/images/news/nettoyage-fond-port-2018-01.jpg",
  },
  {
    title: "Inauguration du « Yachting Club »",
    date: "2017-11-30",
    image: "/images/news/inauguration-yachting-club-2017.jpg",
  },
  {
    title: "Nettoyage du fond du port",
    date: "2017-11-26",
    image: "/images/news/nettoyage-fond-port-2017-11-26.jpg",
  },
  {
    title: "Nettoyage du fond du port",
    date: "2017-11-19",
    image: "/images/news/nettoyage-fond-port-2017-11-19.jpg",
  },
  {
    title: "Cours d'initiation à la guitare",
    date: "2017-11-17",
    image: "/images/news/cours-guitare-2017.jpg",
  },
  {
    title: "Marina Monastir",
    date: "2017-11-16",
    image: "/images/news/marina-monastir-2017-11-16.jpg",
  },
  {
    title: "Marina Monastir",
    date: "2017-11-11",
    image: "/images/news/marina-monastir-2017-11-11.jpg",
  },
  {
    title: "Marina Cap Monastir",
    date: "2017-05-12",
    image: "/images/news/marina-cap-monastir-2017-05.jpg",
  },
];

function formatNewsDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function ActualitesPage() {
  const [featured, ...rest] = news;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-10">
          <div className="section-kicker mb-3">
            <Newspaper className="size-3.5" />
            Actualités
          </div>
          <h1 className="section-title">Actualités Marina Cap Monastir</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
            Retrouvez les événements, opérations d'entretien du port et temps forts de la vie de la
            marina.
          </p>
        </div>

        {/* Featured article */}
        <article className="premium-card overflow-hidden rounded-lg">
          <div className="grid gap-0 md:grid-cols-2">
            <img
              src={featured.image}
              alt={featured.title}
              className="h-64 w-full object-cover md:h-full"
            />
            <div className="flex flex-col justify-center p-6 md:p-8">
              <div className="inline-flex w-fit items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-accent">
                <CalendarDays className="size-3.5" />
                {formatNewsDate(featured.date)}
              </div>
              <h2 className="mt-3 text-2xl font-black text-primary md:text-3xl">
                {featured.title}
              </h2>
            </div>
          </div>
        </article>

        {/* News grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <article
              key={`${item.title}-${item.date}`}
              className="premium-card premium-card-hover overflow-hidden rounded-lg"
            >
              <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-5">
                <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-accent">
                  <CalendarDays className="size-3.5" />
                  {formatNewsDate(item.date)}
                </div>
                <h3 className="mt-2 text-lg font-black text-primary">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
