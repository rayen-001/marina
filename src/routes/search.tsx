import { createFileRoute } from "@tanstack/react-router";
import { Filter, RotateCcw, Search as SearchIcon, SlidersHorizontal, Waves } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { RoomCard, RoomCardSkeleton } from "@/components/room-card";
import { SearchForm } from "@/components/search-form";
import { SiteHeader } from "@/components/site-header";
import { formatCurrency, getRoomCapacity } from "@/data/hotel";
import { getRoomAvailability, listRoomTypes } from "@/lib/services/roomService";

type SearchParams = {
  checkIn?: string;
  checkOut?: string;
  adults: number;
  children: number;
  roomType: string;
};

export const Route = createFileRoute("/search")({
  loader: async () => {
    const roomItems = await listRoomTypes();
    return { roomItems };
  },
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    checkIn: typeof search.checkIn === "string" ? search.checkIn : undefined,
    checkOut: typeof search.checkOut === "string" ? search.checkOut : undefined,
    adults: Number(search.adults) || 2,
    children: Number(search.children) || 0,
    roomType: typeof search.roomType === "string" ? search.roomType : "Tous",
  }),
  head: () => ({
    meta: [
      { title: "Appart-Hôtel - Marina Cap Monastir" },
      {
        name: "description",
        content:
          "Recherchez les studios et appartements disponibles à Marina Cap Monastir, au coeur du port de plaisance de Monastir.",
      },
    ],
  }),
  component: SearchPage,
});

const SORTS = [
  { id: "recommended", label: "Recommandé" },
  { id: "price-asc", label: "Prix croissant" },
  { id: "price-desc", label: "Prix décroissant" },
  { id: "capacity", label: "Capacité" },
] as const;

type SortKey = (typeof SORTS)[number]["id"];

function SearchPage() {
  const search = Route.useSearch();
  const { roomItems } = Route.useLoaderData();
  const roomTypes = useMemo(
    () => Array.from(new Set(roomItems.map((room) => room.type))),
    [roomItems],
  );
  const allAmenities = useMemo(
    () => Array.from(new Set(roomItems.flatMap((room) => room.amenities))).sort(),
    [roomItems],
  );
  const highestPrice = Math.max(160, ...roomItems.map((room) => room.pricePerNight));
  const [activeType, setActiveType] = useState(search.roomType);
  const [maxPrice, setMaxPrice] = useState(highestPrice);
  const [amenities, setAmenities] = useState<Set<string>>(new Set());
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [availabilityByRoom, setAvailabilityByRoom] = useState<Record<string, number>>({});

  useEffect(() => {
    setActiveType(search.roomType);
  }, [search.roomType]);

  const datesSelected = Boolean(
    search.checkIn && search.checkOut && search.checkIn < search.checkOut,
  );

  useEffect(() => {
    let isMounted = true;

    if (!datesSelected || !search.checkIn || !search.checkOut) {
      setAvailabilityByRoom({});
      setLoading(false);
      return;
    }

    setLoading(true);
    void Promise.all(
      roomItems.map(
        async (room) =>
          [room.id, await getRoomAvailability(room, search.checkIn, search.checkOut)] as const,
      ),
    ).then((entries) => {
      if (!isMounted) return;
      setAvailabilityByRoom(Object.fromEntries(entries));
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [datesSelected, roomItems, search.checkIn, search.checkOut]);

  const enriched = useMemo(
    () =>
      roomItems.map((room) => ({
        room,
        available: datesSelected ? (availabilityByRoom[room.id] ?? 0) : room.totalUnits,
      })),
    [availabilityByRoom, datesSelected, roomItems],
  );

  const filtered = useMemo(() => {
    const requestedGuests = search.adults + search.children;
    const list = enriched.filter(({ room, available }) => {
      if (activeType !== "Tous" && room.type !== activeType) return false;
      if (room.pricePerNight > maxPrice) return false;
      if (requestedGuests > getRoomCapacity(room)) return false;
      for (const amenity of amenities) {
        if (!room.amenities.includes(amenity)) return false;
      }
      if (datesSelected && onlyAvailable && available <= 0) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.room.pricePerNight - b.room.pricePerNight);
        break;
      case "price-desc":
        list.sort((a, b) => b.room.pricePerNight - a.room.pricePerNight);
        break;
      case "capacity":
        list.sort((a, b) => getRoomCapacity(b.room) - getRoomCapacity(a.room));
        break;
    }

    if (datesSelected) {
      list.sort((a, b) => Number(b.available > 0) - Number(a.available > 0));
    }

    return list;
  }, [
    activeType,
    amenities,
    datesSelected,
    enriched,
    maxPrice,
    onlyAvailable,
    search.adults,
    search.children,
    sort,
  ]);

  const resetFilters = () => {
    setActiveType("Tous");
    setMaxPrice(highestPrice);
    setAmenities(new Set());
    setOnlyAvailable(true);
    setSort("recommended");
  };

  const toggleAmenity = (amenity: string) => {
    setAmenities((current) => {
      const next = new Set(current);
      if (next.has(amenity)) next.delete(amenity);
      else next.add(amenity);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="border-b border-border bg-secondary/50 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-5 md:px-6">
          <SearchForm
            variant="inline"
            defaultCheckIn={search.checkIn}
            defaultCheckOut={search.checkOut}
            defaultAdults={search.adults}
            defaultChildren={search.children}
            defaultRoomType={search.roomType}
            roomTypes={roomTypes}
          />
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              <SearchIcon className="size-3.5" />
              Résultats de recherche
            </div>
            <h1 className="text-3xl font-black text-primary md:text-4xl">
              Studios et appartements disponibles
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">{filtered.length}</span> résultat
              {filtered.length > 1 ? "s" : ""} · {search.adults} adulte
              {search.adults > 1 ? "s" : ""}
              {search.children > 0
                ? `, ${search.children} enfant${search.children > 1 ? "s" : ""}`
                : ""}
              {datesSelected ? ` · ${search.checkIn} -> ${search.checkOut}` : ""}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="admin-input h-10 min-w-[160px]"
            >
              {SORTS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              className={`inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-bold shadow-sm transition lg:hidden ${
                showFilters
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-primary hover:border-accent hover:bg-accent/10"
              }`}
            >
              <SlidersHorizontal className="size-4" />
              Filtres
            </button>
          </div>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {["Tous", ...roomTypes].map((type, idx) => (
            <button
              key={`${type}-${idx}`}
              type="button"
              onClick={() => setActiveType(type)}
              className={`h-9 whitespace-nowrap rounded-lg px-4 text-sm font-semibold transition ${
                activeType === type
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-card text-muted-foreground shadow-sm hover:border-accent hover:bg-accent/10 hover:text-primary"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[268px_1fr]">
          <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="sticky top-[100px] overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]">
              <div className="border-b border-border bg-secondary/50 px-4 py-3">
                <div className="flex items-center justify-between">
                  <h2 className="inline-flex items-center gap-2 font-bold text-primary">
                    <Filter className="size-4 text-accent" />
                    Filtres
                  </h2>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground transition hover:bg-secondary hover:text-primary"
                  >
                    <RotateCcw className="size-3.5" />
                    Réinitialiser
                  </button>
                </div>
              </div>

              <div className="space-y-6 p-4">
                {datesSelected && (
                  <div className="flex items-center justify-between gap-3 rounded-lg bg-secondary/60 px-3 py-3 text-sm font-medium">
                    <span className="text-foreground">Disponibles uniquement</span>
                    <input
                      type="checkbox"
                      checked={onlyAvailable}
                      onChange={(event) => setOnlyAvailable(event.target.checked)}
                      className="size-4 accent-primary"
                    />
                  </div>
                )}

                <div>
                  <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Prix maximum / nuitée
                  </label>
                  <input
                    type="range"
                    min={80}
                    max={highestPrice}
                    step={5}
                    value={maxPrice}
                    onChange={(event) => setMaxPrice(Number(event.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">80 TND</span>
                    <span className="rounded-md bg-primary px-2 py-0.5 text-sm font-bold text-primary-foreground">
                      {formatCurrency(maxPrice)}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Équipements
                  </label>
                  <div className="max-h-64 space-y-1.5 overflow-auto pr-1">
                    {allAmenities.map((amenity) => (
                      <label
                        key={amenity}
                        className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                      >
                        <input
                          type="checkbox"
                          checked={amenities.has(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="accent-primary"
                        />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section>
            {loading ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <RoomCardSkeleton key={index} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="empty-state">
                <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Waves className="size-7" />
                </div>
                <h2 className="text-2xl font-bold text-primary">Aucune disponibilité trouvée</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                  Modifiez les dates, le nombre de voyageurs ou les filtres pour afficher d'autres
                  logements.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-ocean"
                >
                  <RotateCcw className="size-4" />
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map(({ room, available }) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    availableUnits={available}
                    showAvailability={datesSelected}
                    checkIn={search.checkIn}
                    checkOut={search.checkOut}
                    adults={search.adults}
                    children={search.children}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
