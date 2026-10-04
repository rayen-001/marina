import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";

// Phone-only shortcut: from `sm` up the sticky header already shows a "Réserver" button.
// Hidden on pages that already are the booking flow (or have their own sticky booking bar).
const HIDDEN_PREFIXES = ["/search", "/book/", "/room/", "/property/", "/confirmation"];

export function FloatingBookButton() {
  const { t } = useI18n();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;

  return (
    <Link
      to="/search"
      search={{ adults: 2, children: 0, roomType: "Tous" }}
      aria-label={t("Réserver un appartement", "Book an apartment")}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-accent px-5 text-sm font-black text-accent-foreground shadow-[0_12px_32px_-8px_rgb(0_59_92/0.55)] ring-4 ring-white/70 transition-all hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground sm:hidden"
    >
      <CalendarCheck className="size-5" />
      {t("Réserver", "Book")}
    </Link>
  );
}
