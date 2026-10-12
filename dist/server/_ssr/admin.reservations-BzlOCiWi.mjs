import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { A as AdminActionBar } from "./AdminActionBar-0DOHgydV.mjs";
import { u as useI18n, _ as AdminLayout, a4 as AdminNewReservationButton } from "./router-CgbkQim6.mjs";
import { R as ReservationsTable } from "./reservations-table-Cbgcc6pE.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { a4 as ConciergeBell } from "../_libs/lucide-react.mjs";
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
import "./status-badge-Cw5SwgC6.mjs";
function AdminReservations() {
  const router = useRouter();
  const {
    t
  } = useI18n();
  const [notif, setNotif] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!notif) return;
    const timer = window.setTimeout(() => setNotif(null), 3500);
    return () => clearTimeout(timer);
  }, [notif]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: t("Réservations", "Bookings"), description: t("Filtrez par date, chambre, statut, paiement et source, puis lancez les actions de check-in ou check-out.", "Filter by date, room, status, payment and source, then run check-in or check-out actions."), actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminNewReservationButton, { variant: "primary", onCreated: () => router.invalidate() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminActionBar, { actions: [{
      label: t("Réception", "Reception"),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ConciergeBell, { className: "size-4" }),
      variant: "outline",
      onClick: () => setNotif(t("Vue réception bientôt disponible.", "Reception view coming soon."))
    }] })
  ] }), children: [
    notif && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "status", className: "mb-4 flex items-center gap-3 rounded-md border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: notif }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": t("Fermer", "Close"), onClick: () => setNotif(null), className: "rounded-sm text-primary/50 transition hover:text-primary", children: "✕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReservationsTable, {})
  ] });
}
export {
  AdminReservations as component
};
