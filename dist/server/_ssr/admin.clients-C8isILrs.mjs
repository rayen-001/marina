import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useI18n, _ as AdminLayout, a0 as adminButtonClasses, v as getSupabaseOrNull, N as tr, aT as listAdminConversations } from "./router-CgbkQim6.mjs";
import { C as CreateClientAccountButton } from "./CreateClientAccountButton-eM_9t3wQ.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { h as UserRound, ac as RefreshCw, Z as Mail, M as MessageCircle } from "../_libs/lucide-react.mjs";
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
import "../_libs/zod.mjs";
function AdminClients() {
  const {
    t,
    locale
  } = useI18n();
  const [clients, setClients] = reactExports.useState([]);
  const [conversations, setConversations] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [query, setQuery] = reactExports.useState("");
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const supabase = await getSupabaseOrNull();
      if (!supabase) throw new Error(tr("Supabase n'est pas configuré.", "Supabase is not configured."));
      const [{
        data,
        error: clientsError
      }, nextConversations] = await Promise.all([supabase.from("profiles").select("*").eq("role", "client").order("full_name", {
        ascending: true
      }), listAdminConversations()]);
      if (clientsError) throw clientsError;
      setClients(data ?? []);
      setConversations(nextConversations);
    } catch (err) {
      setError(err instanceof Error ? err.message : tr("Clients indisponibles.", "Guests unavailable."));
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    void load();
  }, []);
  const conversationMap = reactExports.useMemo(() => new Map(conversations.map((conversation) => [conversation.id, conversation])), [conversations]);
  const filteredClients = reactExports.useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return clients;
    return clients.filter((client) => `${client.full_name ?? ""} ${client.email ?? ""}`.toLowerCase().includes(needle));
  }, [clients, query]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: t("Clients", "Guests"), description: t("Comptes clients Supabase Auth avec profil client et accès messagerie.", "Supabase Auth guest accounts with guest profile and messaging access."), actions: /* @__PURE__ */ jsxRuntimeExports.jsx(CreateClientAccountButton, { onCreated: load }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative min-w-0 flex-1 md:max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (event) => setQuery(event.target.value), placeholder: t("Rechercher un client...", "Search for a guest..."), className: "admin-input pl-9" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: load, className: adminButtonClasses("outline", "md"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-4" }),
        t("Actualiser", "Refresh")
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)]", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-14 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block mt-3 h-14 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block mt-3 h-14 w-full" })
    ] }) : filteredClients.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state m-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "mx-auto mb-3 size-8 text-accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-black text-primary", children: t("Aucun client", "No guests") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t("Les comptes clients créés depuis l'administration apparaîtront ici.", "Guest accounts created from the administration will appear here.") })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[760px] text-left text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/70 text-xs uppercase tracking-[0.12em] text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Client", "Guest") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Email", "Email") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Créé le", "Created on") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Non lus", "Unread") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Action", "Action") })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredClients.map((client) => {
        const conversation = conversationMap.get(client.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-black text-primary", children: client.full_name ?? t("Client", "Guest") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4" }),
            client.email ?? "-"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: formatDate(client.created_at, locale) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: conversation?.unreadAdminCount ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-destructive px-2.5 py-1 text-xs font-black text-white", children: conversation.unreadAdminCount }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "0" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/messages", search: {
            conversation: client.id
          }, className: adminButtonClasses("outline", "sm"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-4" }),
            t("Messages", "Messages")
          ] }) })
        ] }, client.id);
      }) })
    ] }) }) })
  ] });
}
function formatDate(value, locale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(date);
}
export {
  AdminClients as component
};
