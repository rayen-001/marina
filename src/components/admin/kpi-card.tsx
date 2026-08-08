import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  detail?: string;
  trend?: string;
  icon: LucideIcon;
  tone?: "navy" | "gold" | "turquoise" | "green" | "red";
};

const toneClasses: Record<
  NonNullable<Props["tone"]>,
  { rail: string; badge: string; icon: string }
> = {
  navy: {
    rail: "from-primary via-ocean to-primary",
    badge: "border-primary/15 bg-primary/10 text-primary",
    icon: "border-primary/15 bg-primary/10 text-primary",
  },
  gold: {
    rail: "from-accent via-accent to-primary",
    badge: "border-accent/30 bg-accent/15 text-primary",
    icon: "border-accent/30 bg-accent/15 text-primary",
  },
  turquoise: {
    rail: "from-turquoise via-turquoise to-primary",
    badge: "border-turquoise/25 bg-turquoise/10 text-primary",
    icon: "border-turquoise/25 bg-turquoise/10 text-primary",
  },
  green: {
    rail: "from-emerald-500 via-emerald-500 to-primary",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-800",
    icon: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
  red: {
    rail: "from-destructive via-destructive to-primary",
    badge: "border-destructive/20 bg-destructive/10 text-destructive",
    icon: "border-destructive/20 bg-destructive/10 text-destructive",
  },
};

export function KpiCard({ label, value, detail, trend, icon: Icon, tone = "navy" }: Props) {
  const toneClass = toneClasses[tone];

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[var(--shadow-lift)]">
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-85",
          toneClass.rail,
        )}
      />
      <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-turquoise/10 transition group-hover:bg-accent/15" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-sm font-bold text-muted-foreground">{label}</div>
          <div className="mt-2 text-2xl font-black leading-none text-primary md:text-3xl">
            {value}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {trend && (
              <span
                className={cn(
                  "inline-flex rounded-full border px-2 py-1 text-[10px] font-black uppercase tracking-[0.1em]",
                  toneClass.badge,
                )}
              >
                {trend}
              </span>
            )}
            {detail && (
              <span className="text-xs font-semibold text-muted-foreground">{detail}</span>
            )}
          </div>
        </div>
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-lg border shadow-sm transition group-hover:scale-105",
            toneClass.icon,
          )}
        >
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
}

export function KpiCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="skeleton-block h-4 w-28" />
          <div className="skeleton-block h-8 w-20" />
          <div className="flex gap-2">
            <div className="skeleton-block h-6 w-16 rounded-full" />
            <div className="skeleton-block h-6 w-24 rounded-full" />
          </div>
        </div>
        <div className="skeleton-block size-11" />
      </div>
    </div>
  );
}
