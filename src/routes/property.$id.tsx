import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { RoomDetailPage } from "@/components/room-detail-page";
import { SiteHeader } from "@/components/site-header";
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
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.room.name} - Marina Cap Monastir`
          : "Chambre - Marina Cap Monastir",
      },
      {
        name: "description",
        content: loaderData?.room.description ?? "Détail chambre Marina Cap Monastir.",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-primary">Chambre introuvable</h1>
        <Link
          to="/search"
          search={{ adults: 2, children: 0, roomType: "Tous" }}
          className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Voir les chambres
        </Link>
      </div>
    </div>
  ),
  component: LegacyRoomRoute,
});

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
