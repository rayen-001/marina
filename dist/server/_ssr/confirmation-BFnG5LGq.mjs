import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteHeader } from "./site-header-DrEtGnYb.mjs";
import { B as Route$w, u as useI18n, C as bookingStore, E as getReservationByNumber, F as getRoom, G as getReservation, H as getRoomType, I as localizeRoomName, J as getReservationStatusLabels, K as getPaymentStatusLabels } from "./router-CgbkQim6.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { C as CalendarDays, a1 as CircleCheck, U as Users, a3 as Star, Z as Mail, t as MapPin, a4 as ConciergeBell, M as MessageCircle, Y as Phone, a5 as Printer, a6 as Download, s as ShieldCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-4up-b2hM.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
function ConfirmationPage() {
  const search = Route$w.useSearch();
  const {
    t,
    locale,
    formatCurrency,
    formatDate
  } = useI18n();
  const remembered = bookingStore.get().reservationNumber;
  const reservationNumber = search.reservation ?? remembered;
  const initialReservation = getReservationByNumber(reservationNumber);
  const initialRoom = initialReservation ? getRoom(initialReservation.roomId) : void 0;
  const [reservation, setReservation] = reactExports.useState(initialReservation);
  const [room, setRoom] = reactExports.useState(initialRoom);
  const [loading, setLoading] = reactExports.useState(Boolean(reservationNumber && !initialReservation));
  reactExports.useEffect(() => {
    if (!reservationNumber) return;
    let isMounted = true;
    setLoading(true);
    void getReservation(reservationNumber).then(async (nextReservation) => {
      if (!isMounted) return;
      setReservation(nextReservation);
      if (nextReservation) {
        const nextRoom = await getRoomType(nextReservation.roomId);
        if (isMounted) setRoom(nextRoom);
      }
    }).finally(() => {
      if (isMounted) setLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, [reservationNumber]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-4 py-24 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-secondary text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-primary", children: t("Chargement de la réservation", "Loading your booking") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-7 text-muted-foreground", children: t("Nous récupérons les détails de votre séjour.", "We are retrieving the details of your stay.") })
      ] })
    ] });
  }
  if (!reservation || !room) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-4 py-24 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-secondary text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-primary", children: t("Réservation introuvable", "Booking not found") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-7 text-muted-foreground", children: t("Lancez une nouvelle recherche pour créer une réservation Marina Cap Monastir.", "Start a new search to make a Marina Cap Monastir booking.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/search", search: {
          adults: 2,
          children: 0,
          roomType: "Tous"
        }, className: "mt-6 inline-flex h-11 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground", children: t("Rechercher une chambre", "Search for a room") })
      ] })
    ] });
  }
  const remaining = Math.max(0, reservation.total - reservation.deposit);
  const awaitingConfirmation = reservation.status === "pending";
  const cancelled = reservation.status === "cancelled" || reservation.status === "no_show";
  const reservationStatusLabels = getReservationStatusLabels(locale);
  const paymentStatusLabels = getPaymentStatusLabels(locale);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl px-4 py-10 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center animate-fade-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "success-ring-container mx-auto mb-5 inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-success-pop shadow-lg shadow-emerald-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-10", strokeWidth: 1.5 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title text-primary animate-fade-up-delay-1", children: awaitingConfirmation ? t("Demande de réservation envoyée !", "Booking request sent!") : cancelled ? t("Réservation annulée", "Booking cancelled") : t("Réservation confirmée !", "Booking confirmed!") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground animate-fade-up-delay-2", children: awaitingConfirmation ? t("Votre demande de séjour à Marina Cap Monastir est bien enregistrée. La réception va la confirmer très prochainement : conservez ce numéro de réservation.", "Your stay request at Marina Cap Monastir has been recorded. Reception will confirm it shortly: keep this booking number.") : cancelled ? t("Cette réservation a été annulée. Contactez la réception pour toute question.", "This booking has been cancelled. Contact reception if you have any questions.") : t("Votre séjour à Marina Cap Monastir est enregistré. Présentez ce numéro de confirmation à la réception lors de votre arrivée.", "Your stay at Marina Cap Monastir has been recorded. Show this confirmation number at reception when you arrive.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/8 via-card to-turquoise/5 shadow-[var(--shadow-premium)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 p-6 sm:flex-row sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center sm:text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground", children: t("Numéro de réservation", "Booking number") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-4xl font-black tracking-wider text-primary", children: reservation.reservationNumber }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-center gap-4 text-xs text-muted-foreground sm:justify-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold ${reservation.status === "confirmed" || reservation.status === "checked_in" ? "bg-emerald-50 text-emerald-700" : "bg-secondary text-secondary-foreground"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3" }),
                reservationStatusLabels[reservation.status]
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 font-semibold", children: paymentStatusLabels[reservation.paymentStatus] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground", children: t("Total séjour", "Stay total") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-3xl font-black text-primary", children: formatCurrency(reservation.total) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
              reservation.nights,
              " ",
              reservation.nights > 1 ? t("nuits", "nights") : t("nuit", "night")
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoBlock, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-5" }), title: t("Client", "Guest"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: t("Nom", "Name"), value: reservation.guest.fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: t("Email", "Email"), value: reservation.guest.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: t("Téléphone", "Phone"), value: reservation.guest.phone }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: t("Pays", "Country"), value: reservation.guest.country }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: t("CIN / Passeport", "ID card / Passport"), value: reservation.guest.identityNumber })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoBlock, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-5" }), title: t("Séjour", "Stay"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: t("Logement", "Accommodation"), value: localizeRoomName(room, locale) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: t("Arrivée", "Check-in"), value: formatDate(reservation.checkIn) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: t("Départ", "Check-out"), value: formatDate(reservation.checkOut) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: t("Voyageurs", "Guests"), value: t(`${reservation.adults} adulte${reservation.adults > 1 ? "s" : ""}${reservation.children > 0 ? `, ${reservation.children} enfant${reservation.children > 1 ? "s" : ""}` : ""}`, `${reservation.adults} adult${reservation.adults > 1 ? "s" : ""}${reservation.children > 0 ? `, ${reservation.children} ${reservation.children > 1 ? "children" : "child"}` : ""}`) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: t("Localisation", "Location"), value: "Marina Cap Monastir" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-secondary/50 px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-primary", children: t("Détail du prix", "Price breakdown") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceRow, { label: t("Prix chambre", "Room price"), value: formatCurrency(reservation.roomPrice) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceRow, { label: t("Taxes et frais", "Taxes and fees"), value: formatCurrency(reservation.taxesAndFees) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceRow, { label: t("Acompte", "Deposit"), value: formatCurrency(reservation.deposit), accent: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceRow, { label: t("Reste à régler", "Balance due"), value: formatCurrency(remaining) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-border pt-3 text-base font-black text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Total", "Total") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(reservation.total) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl border border-border bg-card p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-4 flex items-center gap-2 text-sm font-bold text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-4 text-accent" }),
          t("Prochaines étapes", "Next steps")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 text-sm sm:grid-cols-3", children: [{
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4 text-accent" }),
          title: t("Confirmation email", "Confirmation email"),
          text: t("Un email de confirmation a été envoyé à votre adresse.", "A confirmation email has been sent to your address.")
        }, {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4 text-turquoise" }),
          title: t("Arrivée à l'hôtel", "Arriving at the hotel"),
          text: t("Présentez votre numéro de réservation à la réception.", "Show your booking number at reception.")
        }, {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ConciergeBell, { className: "size-4 text-primary" }),
          title: t("Besoin d'aide ?", "Need help?"),
          text: t("Contactez la réception pour toute demande spéciale.", "Contact reception for any special request.")
        }].map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-secondary", children: step.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground", children: step.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs leading-5 text-muted-foreground", children: step.text })
          ] })
        ] }, step.title)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-2 flex items-center gap-2 text-sm font-bold text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-4 text-accent" }),
          t("Une question sur ce séjour ?", "A question about this stay?")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-6 text-muted-foreground", children: t("Retrouvez cette réservation et échangez avec la réception depuis votre espace client.", "Find this booking and message reception from your guest account.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/client/messages", className: "mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-ocean", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-4" }),
          t("Contacter la réception", "Contact reception")
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/search", search: {
          adults: 2,
          children: 0,
          roomType: "Tous"
        }, className: "inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-ocean", children: t("Nouvelle réservation", "New booking") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${reservation.guest.email}`, className: "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-bold text-primary shadow-sm transition hover:border-accent hover:bg-accent/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4" }),
          t("Envoyer par email", "Send by email")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+21673468300", className: "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-bold text-primary shadow-sm transition hover:border-accent hover:bg-accent/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4" }),
          t("Réception", "Reception")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => window.print(), className: "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-bold text-primary shadow-sm transition hover:border-accent hover:bg-accent/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "size-4" }),
          t("Imprimer", "Print")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-bold text-primary shadow-sm transition hover:border-accent hover:bg-accent/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4" }),
          t("Télécharger PDF", "Download PDF")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center justify-center gap-5 rounded-2xl border border-border bg-secondary/40 px-5 py-4 text-xs font-semibold text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3.5 text-emerald-600" }),
          t("Réservation sécurisée", "Secure booking")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3.5 text-turquoise" }),
          t("Données protégées", "Data protected")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ConciergeBell, { className: "size-3.5 text-accent" }),
          t("Support réception 24h/24", "24/7 reception support")
        ] })
      ] })
    ] })
  ] });
}
function InfoBlock({
  icon,
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "overflow-hidden rounded-2xl border border-border bg-card shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-border bg-secondary/50 px-5 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-primary", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 p-5 text-sm", children })
  ] });
}
function Row({
  label,
  value,
  strong = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-right ${strong ? "font-bold text-primary" : "font-semibold text-foreground"}`, children: value })
  ] });
}
function PriceRow({
  label,
  value,
  accent = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold ${accent ? "text-accent" : "text-foreground"}`, children: value })
  ] });
}
export {
  ConfirmationPage as component
};
