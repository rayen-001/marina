import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, Search, Users } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { roomTypeOptions } from "@/data/hotel";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "hero" | "inline";
  defaultCheckIn?: string;
  defaultCheckOut?: string;
  defaultAdults?: number;
  defaultChildren?: number;
  defaultRoomType?: string;
  roomTypes?: string[];
};

const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
const afterTomorrow = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
const iso = (date: Date) => date.toISOString().slice(0, 10);

export function SearchForm({
  variant = "hero",
  defaultCheckIn = iso(tomorrow),
  defaultCheckOut = iso(afterTomorrow),
  defaultAdults = 2,
  defaultChildren = 0,
  defaultRoomType = "Tous",
  roomTypes,
}: Props) {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [adults, setAdults] = useState(defaultAdults);
  const [children, setChildren] = useState(defaultChildren);
  const [roomType, setRoomType] = useState(defaultRoomType);
  const types = ["Tous", ...(roomTypes ?? roomTypeOptions())];

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate({
      to: "/search",
      search: { checkIn, checkOut, adults, children, roomType },
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "relative grid gap-3 overflow-hidden rounded-lg border bg-card p-3 shadow-[var(--shadow-premium)] md:grid-cols-[1fr_1fr_1.15fr_0.95fr_auto] md:items-end md:p-4",
        variant === "hero" ? "border-white/65" : "border-border shadow-[var(--shadow-soft)]",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-turquoise to-primary" />
      <Field icon={<CalendarDays className="size-4" />} label="Arrivée">
        <input
          type="date"
          value={checkIn}
          onChange={(event) => setCheckIn(event.target.value)}
          className="w-full bg-transparent text-sm font-bold text-foreground outline-none"
        />
      </Field>
      <Field icon={<CalendarDays className="size-4" />} label="Départ">
        <input
          type="date"
          value={checkOut}
          onChange={(event) => setCheckOut(event.target.value)}
          className="w-full bg-transparent text-sm font-bold text-foreground outline-none"
        />
      </Field>
      <Field icon={<Users className="size-4" />} label="Voyageurs">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            min={1}
            max={8}
            value={adults}
            aria-label="Adultes"
            onChange={(event) => setAdults(Number(event.target.value))}
            className="w-full min-w-0 bg-transparent text-sm font-bold text-foreground outline-none"
          />
          <input
            type="number"
            min={0}
            max={6}
            value={children}
            aria-label="Enfants"
            onChange={(event) => setChildren(Number(event.target.value))}
            className="w-full min-w-0 bg-transparent text-sm font-bold text-foreground outline-none"
          />
        </div>
      </Field>
      <Field icon={<Search className="size-4" />} label="Type">
        <select
          value={roomType}
          onChange={(event) => setRoomType(event.target.value)}
          className="w-full bg-transparent text-sm font-bold text-foreground outline-none"
        >
          {types.map((type, index) => (
            <option key={`${type}-${index}`} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-ocean hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60"
      >
        <Search className="size-4" />
        Rechercher
      </button>
    </form>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block rounded-lg border border-border bg-background/70 px-3 py-2.5 shadow-inner transition focus-within:border-ring focus-within:bg-card focus-within:ring-2 focus-within:ring-ring/15">
      <span className="mb-1.5 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-muted-foreground">
        <span className="text-accent">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}
