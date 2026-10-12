import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useI18n, f as getClientSessionProfile, aj as listClientReservations, am as listClientConversations, N as tr, ai as ACTIVE_RESERVATION_STATUSES, J as getReservationStatusLabels } from "./router-CgbkQim6.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { h as UserRound, B as BedDouble, a7 as CalendarCheck, M as MessageCircle, aa as ReceiptText } from "../_libs/lucide-react.mjs";
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
function ClientDashboard() {
  const {
    t,
    locale,
    formatCurrency
  } = useI18n();
  const statusLabels = getReservationStatusLabels(locale);
  const [profile, setProfile] = reactExports.useState(null);
  const [reservations, setReservations] = reactExports.useState([]);
  const [conversations, setConversations] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    void Promise.all([getClientSessionProfile(), listClientReservations(), listClientConversations()]).then(([context, nextReservations, nextConversations]) => {
      if (!mounted) return;
      setProfile(context?.profile ?? null);
      setReservations(nextReservations);
      setConversations(nextConversations);
    }).catch((err) => {
      if (mounted) {
        setError(err instanceof Error ? err.message : tr("Données client indisponibles.", "Guest data unavailable."));
      }
    }).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);
  const upcoming = reactExports.useMemo(() => reservations.filter((reservation) => reservation.checkOut >= todayIso()).sort((a, b) => a.checkIn.localeCompare(b.checkIn))[0] ?? null, [reservations]);
  const unreadCount = conversations.reduce((sum, conversation) => sum + conversation.unreadClientCount, 0);
  const canMessage = reservations.some((reservation) => ACTIVE_RESERVATION_STATUSES.includes(reservation.status));
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardSkeleton, {});
  if (reservations.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden rounded-xl border border-white/15 bg-primary p-5 text-white shadow-[var(--shadow-premium)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marina-pattern absolute inset-0 opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "size-4" }),
            t("Portail client", "Guest portal")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 text-3xl font-black leading-tight md:text-4xl", children: [
            t("Bonjour", "Hello"),
            " ",
            profile?.fullName ?? t("Client", "Guest")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-[var(--shadow-soft)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-accent/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "size-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-primary", children: t("Aucune réservation pour le moment", "No bookings yet") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground", children: t("Votre tableau de bord et la messagerie deviennent disponibles dès votre première réservation Appart-Hôtel.", "Your dashboard and messaging become available with your first aparthotel booking.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/search", search: {
          adults: 2,
          children: 0,
          roomType: "Tous"
        }, className: "mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-black text-primary-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-4" }),
          t("Réserver un appart-hôtel", "Book the aparthotel")
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden rounded-xl border border-white/15 bg-primary p-5 text-white shadow-[var(--shadow-premium)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marina-pattern absolute inset-0 opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "size-4" }),
            t("Portail client", "Guest portal")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 text-3xl font-black leading-tight md:text-4xl", children: [
            t("Bonjour", "Hello"),
            " ",
            profile?.fullName ?? t("Client", "Guest")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-6 text-white/75", children: t("Retrouvez vos séjours, vos échanges avec la réception et les informations utiles à votre arrivée.", "Find your stays, your messages with reception and useful information for your arrival.") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/client/reservations", className: "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-black text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-4" }),
            t("Voir mes réservations", "View my bookings")
          ] }),
          canMessage ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/client/messages", className: "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 text-sm font-black text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-4" }),
            t("Contacter la réception", "Contact reception")
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { title: t("Vous devez avoir une réservation Appart-Hôtel avant de contacter l'administration.", "You need an aparthotel booking before contacting the administration."), className: "inline-flex h-10 cursor-not-allowed items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 text-sm font-black text-white/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-4" }),
            t("Contacter la réception", "Contact reception")
          ] })
        ] })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardMetric, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-5" }), label: t("Réservations", "Bookings"), value: String(reservations.length), detail: t("Dossiers liés à votre email", "Bookings linked to your email") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardMetric, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptText, { className: "size-5" }), label: t("Prochain séjour", "Next stay"), value: upcoming ? upcoming.checkIn : "-", detail: upcoming ? upcoming.reservationNumber : t("Aucune arrivée prévue", "No upcoming arrival") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardMetric, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-5" }), label: t("Messages non lus", "Unread messages"), value: String(unreadCount), detail: t("Réponses de la réception", "Replies from reception") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-6 xl:grid-cols-[1fr_0.8fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black text-primary", children: t("Prochaine réservation", "Next booking") }),
        upcoming ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg border border-border bg-background p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black text-primary", children: upcoming.reservationNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: upcoming.roomName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800", children: statusLabels[upcoming.status] ?? upcoming.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 text-sm sm:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoTile, { label: t("Arrivée", "Check-in"), value: upcoming.checkIn }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoTile, { label: t("Départ", "Check-out"), value: upcoming.checkOut }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoTile, { label: t("Total", "Total"), value: formatCurrency(upcoming.total) })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyClientState, { title: t("Aucune réservation à venir", "No upcoming bookings"), text: t("Vos prochaines réservations apparaîtront ici dès qu'elles seront liées à votre compte.", "Your upcoming bookings will appear here once they are linked to your account.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black text-primary", children: t("Derniers messages", "Latest messages") }),
        conversations.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: conversations.slice(0, 4).map((conversation) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/client/messages", search: {
          conversation: conversation.id
        }, className: "block rounded-lg border border-border bg-background p-3 transition hover:border-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-black text-primary", children: conversation.subject }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-sm text-muted-foreground", children: conversation.latestMessage?.body ?? t("Aucun message envoyé.", "No messages sent.") })
          ] }),
          conversation.unreadClientCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-destructive px-2 py-0.5 text-xs font-black text-white", children: conversation.unreadClientCount })
        ] }) }, conversation.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyClientState, { title: t("Aucun message", "No messages"), text: t("Contactez la réception depuis la messagerie si vous avez une question.", "Contact reception through messaging if you have a question.") })
      ] })
    ] })
  ] });
}
function DashboardMetric({
  icon,
  label,
  value,
  detail
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-black uppercase tracking-[0.12em] text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 items-center justify-center rounded-lg bg-accent/15 text-primary", children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-3xl font-black text-primary", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: detail })
  ] });
}
function InfoTile({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-card p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-black uppercase tracking-[0.12em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-black text-primary", children: value })
  ] });
}
function EmptyClientState({
  title,
  text
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg border border-dashed border-border bg-background p-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black text-primary", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground", children: text })
  ] });
}
function DashboardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-48 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-32 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-32 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-32 w-full" })
    ] })
  ] });
}
function todayIso() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
export {
  ClientDashboard as component
};
