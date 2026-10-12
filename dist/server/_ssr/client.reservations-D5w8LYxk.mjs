import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useI18n, ag as CLIENT_MESSAGING_LOCKED_REASON, ah as CLIENT_MESSAGING_LOCKED_REASON_EN, ai as ACTIVE_RESERVATION_STATUSES, I as localizeRoomName, aj as listClientReservations, N as tr, J as getReservationStatusLabels, K as getPaymentStatusLabels, ak as createConversationForClientReservation } from "./router-CgbkQim6.mjs";
import "../_libs/seroval.mjs";
import { a7 as CalendarCheck, ac as RefreshCw, M as MessageCircle } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
function ClientReservations() {
  const navigate = useNavigate();
  const {
    t,
    locale,
    formatCurrency
  } = useI18n();
  const lockedReason = t(CLIENT_MESSAGING_LOCKED_REASON, CLIENT_MESSAGING_LOCKED_REASON_EN);
  const reservationStatusLabels = getReservationStatusLabels(locale);
  const paymentStatusLabels = getPaymentStatusLabels(locale);
  const [reservations, setReservations] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [openingId, setOpeningId] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setReservations(await listClientReservations());
    } catch (err) {
      setError(err instanceof Error ? err.message : tr("Réservations indisponibles.", "Bookings unavailable."));
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    void load();
  }, []);
  const canMessage = reactExports.useMemo(() => reservations.some((reservation) => ACTIVE_RESERVATION_STATUSES.includes(reservation.status)), [reservations]);
  const openConversation = async (reservation) => {
    setOpeningId(reservation.id);
    try {
      const conversation = await createConversationForClientReservation(reservation);
      navigate({
        to: "/client/messages",
        search: {
          conversation: conversation.id
        }
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("Conversation impossible.", "The conversation could not be opened."));
    } finally {
      setOpeningId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-4" }),
          t("Portail client", "Guest portal")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-3xl font-black text-primary", children: t("Mes réservations", "My bookings") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: t("Réservations liées à votre profil client ou à votre email.", "Bookings linked to your guest profile or your email.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: load, className: "admin-action h-10 px-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-4" }),
        t("Actualiser", "Refresh")
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive", children: error }),
    !loading && reservations.length > 0 && !canMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-900", children: lockedReason }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)]", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-10 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block mt-3 h-10 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block mt-3 h-10 w-full" })
    ] }) : reservations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state m-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "mx-auto mb-3 size-8 text-accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-black text-primary", children: t("Aucune réservation liée", "No linked bookings") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: lockedReason }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/search", search: {
        adults: 2,
        children: 0,
        roomType: "Tous"
      }, className: "admin-action mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-4" }),
        t("Réserver un appart-hôtel", "Book the aparthotel")
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[900px] text-left text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/70 text-xs uppercase tracking-[0.12em] text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Réservation", "Booking") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Chambre", "Room") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Check-in", "Check-in") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Check-out", "Check-out") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Statut", "Status") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Paiement", "Payment") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Total", "Total") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Action", "Action") })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: reservations.map((reservation) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-black text-primary", children: reservation.reservationNumber }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: localizeRoomName({
          name: reservation.roomName,
          id: reservation.roomTypeId
        }, locale) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: reservation.checkIn }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: reservation.checkOut }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPill, { value: reservationStatusLabels[reservation.status] ?? reservation.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPill, { value: paymentStatusLabels[reservation.paymentStatus] ?? reservation.paymentStatus, subtle: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-black text-primary", children: formatCurrency(reservation.total) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => openConversation(reservation), disabled: !canMessage || openingId === reservation.id, title: canMessage ? void 0 : lockedReason, className: "admin-action disabled:cursor-not-allowed disabled:opacity-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-4" }),
          openingId === reservation.id ? t("Ouverture...", "Opening...") : t("Envoyer un message", "Send a message")
        ] }) })
      ] }, reservation.id)) })
    ] }) }) })
  ] });
}
function StatusPill({
  value,
  subtle = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex rounded-full px-2.5 py-1 text-xs font-black ${subtle ? "bg-secondary text-primary" : "bg-emerald-50 text-emerald-800"}`, children: value });
}
export {
  ClientReservations as component
};
