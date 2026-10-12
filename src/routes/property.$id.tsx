import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { RoomDetailPage } from "@/components/room-detail-page";
import { SiteHeader } from "@/components/site-header";
import { getRequestLocale } from "@/lib/i18n/get-request-locale";
import { headT } from "@/lib/i18n/head";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { localizeRoom } from "@/lib/i18n/rooms";
import { getRoomType } from "@/lib/services/roomService";

export const Route = createFileRoute("/property/$id")({
  validateSearch: (search: Record<string, unknown>) => ({
    checkIn: typeof search.checkIn === "string" ? search.checkIn : undefined,
    checkOut: typeof search.checkOut === "string" ? search.checkOut : undefined,
    adults: Number(search.adults) || 2,
    children: Number(search.children) || 0,
  }),
  loader: async ({ params }) => {
    const room = await getRoomType(params.id);
    if (!room) throw notFound();
    return { room };
  },
  head: ({ loaderData }) => {
    const room = loaderData ? localizeRoom(loaderData.room, getRequestLocale()) : null;
    return {
      meta: [
        {
          title: room
            ? `${room.name} - Marina Cap Monastir`
            : headT("Chambre - Marina Cap Monastir", "Room - Marina Cap Monastir"),
        },
        {
          name: "description",
          content:
            room?.description ??
            headT("Détail chambre Marina Cap Monastir.", "Marina Cap Monastir room details."),
        },
      ],
    };
  },
  notFoundComponent: PropertyNotFound,
  component: LegacyRoomRoute,
});

function PropertyNotFound() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-primary">
          {t("Chambre introuvable", "Room not found")}
        </h1>
        <Link
          to="/search"
          search={{ adults: 2, children: 0, roomType: "Tous" }}
          className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          {t("Voir les chambres", "See the rooms")}
        </Link>
      </div>
    </div>
  );
}

function LegacyRoomRoute() {
  const { room } = Route.useLoaderData();
  const incoming = Route.useSearch();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <RoomDetailPage room={room} incoming={incoming} />
    </div>
  );
}
