import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RoomDetailPage } from "@/components/room-detail-page";
import { SiteHeader } from "@/components/site-header";
import { getMonthlyCalendar, type MonthCalendar } from "@/lib/services/rateCalendarService";
import { getRoomType } from "@/lib/services/roomService";

async function loadCalendars(roomId: string, totalUnits: number, defaultPrice: number): Promise<MonthCalendar[]> {
  const today = new Date();
  const months = Array.from({ length: 3 }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth() + index, 1);
    return { year: date.getFullYear(), month: date.getMonth() + 1 };
  });
  return Promise.all(
    months.map(({ year, month }) =>
      getMonthlyCalendar(roomId, year, month, totalUnits, defaultPrice),
    ),
  );
}

export const Route = createFileRoute("/room/$id")({
  validateSearch: (search: Record<string, unknown>) => ({
    checkIn: typeof search.checkIn === "string" ? search.checkIn : undefined,
    checkOut: typeof search.checkOut === "string" ? search.checkOut : undefined,
    adults: Number(search.adults) || 2,
    children: Number(search.children) || 0,
  }),
  // staleTime: 0 ensures the loader always runs fresh — no cached stale availability
  staleTime: 0,
  loader: async ({ params }) => {
    const room = await getRoomType(params.id);
    if (!room) throw notFound();
    const defaultPrice = room.pricePerNight;
    const totalUnits = room.totalUnits ?? 1;
    const calendars = await loadCalendars(room.id, totalUnits, defaultPrice);
    return { room, calendars, totalUnits, defaultPrice };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.room.name} - Marina Cap Monastir`
          : "Appartement - Marina Cap Monastir",
      },
      {
        name: "description",
        content: loaderData?.room.description ?? "Détail appartement Marina Cap Monastir.",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-primary">Appartement introuvable</h1>
        <Link
          to="/search"
          search={{ adults: 2, children: 0, roomType: "Tous" }}
          className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Voir les appartements
        </Link>
      </div>
    </div>
  ),
  component: RoomRoute,
});

function RoomRoute() {
  const { room, calendars: initialCalendars, totalUnits, defaultPrice } = Route.useLoaderData();
  const incoming = Route.useSearch();
  const [calendars, setCalendars] = useState(initialCalendars);

  // Always reload calendars client-side on mount to get real-time availability
  useEffect(() => {
    let cancelled = false;
    loadCalendars(room.id, totalUnits, defaultPrice).then((fresh) => {
      if (!cancelled) setCalendars(fresh);
    });
    return () => { cancelled = true; };
  }, [room.id, totalUnits, defaultPrice]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <RoomDetailPage room={room} incoming={incoming} calendars={calendars} />
    </div>
  );
}
