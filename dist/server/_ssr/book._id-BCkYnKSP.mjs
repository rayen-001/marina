import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as BookingSummary } from "./booking-summary-Zdk_wime.mjs";
import { S as SiteHeader } from "./site-header-DrEtGnYb.mjs";
import { aD as Route$d, u as useI18n, a as getRoomCapacity, ad as calculateTotal, ae as getBookingQuote, C as bookingStore, aE as createClientReservation } from "./router-CgbkQim6.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { an as ArrowLeft, h as UserRound, s as ShieldCheck, aE as Zap, a4 as ConciergeBell, a7 as CalendarCheck, a1 as CircleCheck } from "../_libs/lucide-react.mjs";
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
const today = /* @__PURE__ */ new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1e3);
const afterTomorrow = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1e3);
const iso = (date) => date.toISOString().slice(0, 10);
function BookPage() {
  const {
    room
  } = Route$d.useLoaderData();
  const {
    t,
    locale
  } = useI18n();
  const {
    clientProfile
  } = Route$d.useRouteContext();
  const navigate = useNavigate();
  const draft = bookingStore.get();
  const checkIn = draft.checkIn ?? iso(tomorrow);
  const checkOut = draft.checkOut ?? iso(afterTomorrow);
  const adults = draft.adults || 2;
  const children = draft.children || 0;
  const capacity = getRoomCapacity(room);
  const fallbackBreakdown = reactExports.useMemo(() => calculateTotal(room, checkIn, checkOut), [room, checkIn, checkOut]);
  const [quote, setQuote] = reactExports.useState(null);
  const [quoteLoading, setQuoteLoading] = reactExports.useState(true);
  const breakdown = quote?.breakdown ?? fallbackBreakdown;
  const availability = quote?.availability ?? room.totalUnits;
  const selectedNightPrice = breakdown.nights > 0 ? Math.round(breakdown.roomPrice / breakdown.nights) : room.pricePerNight;
  const [phone, setPhone] = reactExports.useState("");
  const [country, setCountry] = reactExports.useState(locale === "en" ? "Tunisia" : "Tunisie");
  const [identityNumber, setIdentityNumber] = reactExports.useState("");
  const [specialRequests, setSpecialRequests] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let isMounted = true;
    setQuoteLoading(true);
    void getBookingQuote(room, checkIn, checkOut).then((nextQuote) => {
      if (!isMounted) return;
      setQuote(nextQuote);
      setQuoteLoading(false);
    }).catch(() => {
      if (!isMounted) return;
      setQuote(null);
      setQuoteLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, [room, checkIn, checkOut]);
  const validGuest = phone.trim().length > 5 && country.trim().length > 1 && identityNumber.trim().length > 3;
  const fitsCapacity = adults + children <= capacity;
  const canSubmit = validGuest && fitsCapacity && breakdown.nights > 0 && Boolean(quote?.canBook) && !quoteLoading;
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!canSubmit || submitting) return;
    try {
      setSubmitting(true);
      const reservation = await createClientReservation({
        roomId: room.id,
        checkIn,
        checkOut,
        adults,
        children,
        phone,
        country,
        identityNumber,
        specialRequests
      });
      navigate({
        to: "/confirmation",
        search: {
          reservation: reservation.reservationNumber
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : t("Impossible de créer la réservation.", "The booking could not be created."));
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-4 py-8 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/room/$id", params: {
        id: room.id
      }, search: {
        checkIn,
        checkOut,
        adults,
        children
      }, className: "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
        t("Retour à l'appartement", "Back to the apartment")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-10 lg:grid-cols-[1fr_390px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-accent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "size-3.5" }),
              t("Informations client", "Guest details")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title text-primary", children: t("Finaliser la réservation", "Complete your booking") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-sm leading-6 text-muted-foreground", children: t("Ces informations seront utilisées pour la confirmation et l'accueil à la réception.", "These details are used for your confirmation and check-in at reception.") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-secondary/50 px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-primary", children: t("Informations personnelles", "Personal details") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center gap-2 rounded-lg bg-secondary/60 px-4 py-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "size-4 shrink-0 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: t("Réservation au nom de", "Booking in the name of") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-primary", children: clientProfile.fullName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  "(",
                  clientProfile.email,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("Téléphone", "Phone"), required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: phone, onChange: (event) => setPhone(event.target.value), placeholder: "+216 ...", className: "field-input", required: true }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("Pays", "Country"), required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: country, onChange: (event) => setCountry(event.target.value), className: "field-input", required: true }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("CIN / Passeport", "ID card / Passport"), required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: identityNumber, onChange: (event) => setIdentityNumber(event.target.value), placeholder: t("Référence d'identité", "ID number"), className: "field-input", required: true }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "md:col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground", children: t("Demandes spéciales", "Special requests") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: specialRequests, onChange: (event) => setSpecialRequests(event.target.value), placeholder: t("Arrivée tardive, lit bébé, place de parking...", "Late arrival, baby cot, parking space..."), rows: 4, className: "field-input min-h-28" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-lg border border-turquoise/25 bg-gradient-to-br from-turquoise/8 to-turquoise/4 p-5 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-3 flex items-center gap-2 text-base font-bold text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-5 text-turquoise" }),
              t("Confirmation", "Confirmation")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-7 text-muted-foreground", children: t(`Aucun numéro de carte ni CVC n'est collecté ou stocké. Votre demande de réservation est envoyée à la réception avec le statut "en attente" et sera confirmée manuellement par l'équipe Marina Cap Monastir.`, 'No card number or CVC is collected or stored. Your booking request is sent to reception as "pending" and will be confirmed manually by the Marina Cap Monastir team.') })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2.5 sm:grid-cols-3", children: [{
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-4 text-emerald-600" }),
            text: t("Réservation sécurisée", "Secure booking")
          }, {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4 text-turquoise" }),
            text: t("Réponse rapide de la réception", "Quick reply from reception")
          }, {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ConciergeBell, { className: "size-4 text-accent" }),
            text: t("Réception disponible", "Reception available")
          }].map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 rounded-lg border border-border bg-card px-3.5 py-3 text-xs font-semibold text-muted-foreground shadow-sm", children: [
            badge.icon,
            badge.text
          ] }, badge.text)) }),
          !fitsCapacity && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-destructive/10 p-4 text-sm font-medium text-destructive", children: t(`La capacité demandée dépasse la capacité de cet appartement (${capacity} personnes).`, `The number of guests exceeds this apartment's capacity (${capacity} guests).`) }),
          quoteLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-secondary p-4 text-sm font-medium text-muted-foreground", children: t("Vérification du tarif et de la disponibilité...", "Checking rate and availability...") }),
          !quoteLoading && quote?.reason && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-destructive/10 p-4 text-sm font-medium text-destructive", children: quote.reason }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-destructive/10 p-4 text-sm font-medium text-destructive", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: !canSubmit || submitting, className: "inline-flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-ocean hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-5" }),
            submitting ? t("Envoi en cours...", "Sending...") : t("Envoyer la demande de réservation", "Send booking request")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 lg:sticky lg:top-24 lg:self-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookingSummary, { room, breakdown, checkIn, checkOut, nightlyPrice: selectedNightPrice, nightlyRates: quote?.nightlyRates ?? [] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-card p-4 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5 text-xs font-medium text-muted-foreground", children: [{
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3.5 text-emerald-600" }),
            text: t(`Disponibilité : ${availability} unité${availability > 1 ? "s" : ""} sur ces dates`, `Availability: ${availability} unit${availability > 1 ? "s" : ""} on these dates`)
          }, {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3.5 text-turquoise" }),
            text: t("Aucune carte bancaire requise", "No bank card required")
          }, {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ConciergeBell, { className: "size-3.5 text-accent" }),
            text: t("Présentez votre confirmation à la réception", "Show your confirmation at reception")
          }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 shrink-0", children: item.icon }),
            item.text
          ] }, item.text)) }) })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  required,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground", children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-destructive", children: "*" })
    ] }),
    children
  ] });
}
export {
  BookPage as component
};
