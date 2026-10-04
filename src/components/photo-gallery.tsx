import { ChevronLeft, ChevronRight, Expand, ImageOff, Store } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  galleryCategories,
  galleryComingSoon,
  galleryPhotos,
  type GalleryCategory,
  type GalleryComingSoon,
  type GalleryPhoto,
} from "@/data/gallery";
import { useI18n } from "@/lib/i18n/I18nProvider";

type OpenPhoto = { category: GalleryCategory; index: number };

export function PhotoGallery() {
  const { t, pick } = useI18n();
  const [open, setOpen] = useState<OpenPhoto | null>(null);
  const photosOf = (category: GalleryCategory) =>
    galleryPhotos.filter((photo) => photo.category === category);

  const openPhotos = open ? photosOf(open.category) : [];
  const current = open ? openPhotos[open.index] : undefined;

  const step = (delta: number) =>
    setOpen((state) => {
      if (!state) return state;
      const count = photosOf(state.category).length;
      return { ...state, index: (state.index + delta + count) % count };
    });

  return (
    <>
      <Tabs defaultValue={galleryCategories[0].id}>
        <TabsList className="mx-auto flex h-auto w-fit max-w-full flex-wrap justify-center gap-1 rounded-lg border border-border bg-white p-1.5 shadow-sm">
          {galleryCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="h-10 gap-2 px-4 text-sm font-bold text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:px-5"
            >
              {pick(category.label)}
              {photosOf(category.id).length > 0 && (
                <span className="rounded-full bg-black/[0.06] px-1.5 text-[11px] font-black tabular-nums">
                  {photosOf(category.id).length}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {galleryCategories.map((category) => {
          const photos = photosOf(category.id);
          return (
            <TabsContent key={category.id} value={category.id} className="mt-8">
              {photos.length === 0 && galleryComingSoon[category.id] ? (
                <ComingSoonGrid content={galleryComingSoon[category.id]!} />
              ) : photos.length === 0 ? (
                <div className="premium-card mx-auto flex max-w-xl flex-col items-center rounded-lg px-6 py-12 text-center">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-secondary text-accent">
                    <Store className="size-6" />
                  </div>
                  <h3 className="text-lg font-black text-primary">
                    {t("Photos bientôt disponibles", "Photos coming soon")}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {t(
                      `La galerie ${category.label.fr.toLowerCase()} de Marina Cap Monastir sera enrichie prochainement.`,
                      `New ${category.label.en.toLowerCase()} photos of Marina Cap Monastir will be added soon.`,
                    )}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {photos.map((photo, index) => (
                    <GalleryTile
                      key={photo.src}
                      photo={photo}
                      onOpen={() => setOpen({ category: category.id, index })}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      <Dialog open={Boolean(current)} onOpenChange={(value) => !value && setOpen(null)}>
        <DialogContent
          aria-describedby={undefined}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") step(1);
            if (event.key === "ArrowLeft") step(-1);
          }}
          className="max-w-5xl gap-3 border-none bg-ocean/95 p-3 text-white sm:p-4"
        >
          {current && (
            <>
              <div className="relative flex items-center justify-center">
                <img
                  src={current.src}
                  alt={pick(current.alt)}
                  className="max-h-[75vh] w-auto max-w-full rounded-md object-contain"
                />
                {openPhotos.length > 1 && (
                  <>
                    <LightboxArrow side="left" onClick={() => step(-1)} />
                    <LightboxArrow side="right" onClick={() => step(1)} />
                  </>
                )}
              </div>
              <div className="flex items-center justify-between gap-4 px-1 pr-8 text-sm">
                <DialogTitle className="text-sm font-semibold leading-6 text-white">
                  {pick(current.alt)}
                </DialogTitle>
                <span className="shrink-0 tabular-nums text-white/60">
                  {(open?.index ?? 0) + 1} / {openPhotos.length}
                </span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function ComingSoonGrid({ content }: { content: GalleryComingSoon }) {
  const { t, pick } = useI18n();
  return (
    <div>
      <p className="mx-auto mb-6 max-w-3xl text-center text-base font-black leading-7 text-primary">
        {pick(content.title)}
      </p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {content.cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-ocean via-primary to-turquoise p-4 text-center text-white shadow-[var(--shadow-soft)]"
            >
              <div className="marina-pattern absolute inset-0 opacity-40" />
              <div className="relative flex size-14 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg">
                <Icon className="size-7" />
              </div>
              <div className="relative mt-3 text-sm font-black md:text-base">
                {pick(card.label)}
              </div>
              <span className="relative mt-2 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] backdrop-blur">
                <ImageOff className="size-3" />
                {t("Visuels bientôt disponibles", "Photos coming soon")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GalleryTile({ photo, onOpen }: { photo: GalleryPhoto; onOpen: () => void }) {
  const { t, pick } = useI18n();
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-secondary shadow-[var(--shadow-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`${t("Agrandir", "Enlarge")} : ${pick(photo.alt)}`}
    >
      <img
        src={photo.src}
        alt={pick(photo.alt)}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ocean/80 via-ocean/0 to-transparent p-3 text-left opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="flex w-full items-end justify-between gap-2 text-xs font-semibold text-white">
          {pick(photo.alt)}
          <Expand className="size-4 shrink-0" />
        </span>
      </span>
    </button>
  );
}

function LightboxArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const { t } = useI18n();
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        side === "left"
          ? t("Photo précédente", "Previous photo")
          : t("Photo suivante", "Next photo")
      }
      className={`absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition hover:bg-white ${
        side === "left" ? "left-2" : "right-2"
      }`}
    >
      <Icon className="size-5" />
    </button>
  );
}
