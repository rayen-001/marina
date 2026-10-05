import type { Highlight } from "@/data/highlights";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** Strong-point card: real photo when available, otherwise an illustrated panel with the icon. */
export function HighlightCard({
  highlight,
  headingLevel = "h3",
}: {
  highlight: Highlight;
  headingLevel?: "h2" | "h3";
}) {
  const { pick } = useI18n();
  const Heading = headingLevel;
  const Icon = highlight.icon;
  const title = pick(highlight.title);

  return (
    <article className="premium-card premium-card-hover group overflow-hidden rounded-lg">
      <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
        {highlight.image ? (
          <img
            src={highlight.image}
            alt={highlight.imageAlt ? pick(highlight.imageAlt) : title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ocean via-primary to-turquoise">
            <div className="marina-pattern absolute inset-0 opacity-40" />
            <div className="relative flex size-16 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg">
              <Icon className="size-8" />
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 p-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent">
          <Icon className="size-5" />
        </div>
        <Heading className="text-lg font-black text-primary">{title}</Heading>
      </div>
    </article>
  );
}
