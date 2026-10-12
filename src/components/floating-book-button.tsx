import { Link, useRouterState } from "@tanstack/react-router";
import { Anchor, CalendarCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";

// Phone-only shortcuts: from `sm` up the sticky header already shows "Réserver" and "Port".
// Hidden on pages that already are the booking flow (or have their own sticky booking bar).
const HIDDEN_PREFIXES = ["/search", "/book/", "/room/", "/property/", "/confirmation"];
const PORT_BOOKING_PATH = "/port-de-plaisance/reservation";

export function FloatingBookButton() {
  const { t } = useI18n();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;
  const onPortBooking = pathname.startsWith(PORT_BOOKING_PATH);

  return (
    // `floating-book-bar` reserves room at the bottom of the page (styles.css) so the bar never hides content.
    <div className="floating-book-bar fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex overflow-hidden rounded-full shadow-[0_12px_32px_-8px_rgb(0_59_92/0.55)] ring-4 ring-white/70 sm:hidden">
      <Link
        to="/search"
        search={{ adults: 2, children: 0, roomType: "Tous" }}
        aria-label={t("Réserver un appartement", "Book an apartment")}
        className="inline-flex h-12 items-center gap-2 bg-accent px-4 text-sm font-black text-accent-foreground transition active:bg-primary active:text-primary-foreground"
      >
        <CalendarCheck className="size-5" />
        {t("Appartement", "Apartment")}
      </Link>
      {!onPortBooking && (
        <Link
          to="/port-de-plaisance/reservation"
          aria-label={t("Réserver une place au port", "Book a berth")}
          className="inline-flex h-12 items-center gap-2 border-l border-white/25 bg-primary px-4 text-sm font-black text-primary-foreground transition active:bg-ocean"
        >
          <Anchor className="size-5" />
          {t("Port", "Berth")}
        </Link>
      )}
    </div>
  );
}
