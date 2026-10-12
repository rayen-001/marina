import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { aS as Route$6, u as useI18n, aT as listAdminConversations, an as getMessages, ao as markConversationRead, N as tr, aq as setActiveConversationId, M as subscribeToConversationMessages, _ as AdminLayout, ar as localizeSubject, aU as updateConversationStatus, y as sendMessage } from "./router-CgbkQim6.mjs";
import "../_libs/seroval.mjs";
import { f as Search, a1 as CircleCheck, a2 as Send, M as MessageCircle, ac as RefreshCw } from "../_libs/lucide-react.mjs";
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
function AdminMessages() {
  const navigate = useNavigate();
  const search = Route$6.useSearch();
  const {
    t,
    locale,
    formatCurrency
  } = useI18n();
  const [conversations, setConversations] = reactExports.useState([]);
  const [messages, setMessages] = reactExports.useState([]);
  const [selectedId, setSelectedId] = reactExports.useState(search.conversation ?? null);
  const [statusFilter, setStatusFilter] = reactExports.useState("open");
  const [query, setQuery] = reactExports.useState("");
  const [reply, setReply] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [messagesLoading, setMessagesLoading] = reactExports.useState(false);
  const [sending, setSending] = reactExports.useState(false);
  const [updatingStatus, setUpdatingStatus] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const bottomRef = reactExports.useRef(null);
  const filteredConversations = reactExports.useMemo(() => {
    const needle = query.trim().toLowerCase();
    return conversations.filter((conversation) => {
      if (statusFilter !== "all" && conversation.status !== statusFilter) return false;
      if (!needle) return true;
      return [conversation.clientName, conversation.clientEmail, conversation.clientPhone, conversation.reservationNumber, conversation.subject, conversation.latestMessage?.body].filter(Boolean).join(" ").toLowerCase().includes(needle);
    });
  }, [conversations, query, statusFilter]);
  const selectedConversation = reactExports.useMemo(() => conversations.find((conversation) => conversation.id === selectedId) ?? conversations.find((conversation) => conversation.id === search.conversation) ?? filteredConversations[0] ?? null, [conversations, filteredConversations, search.conversation, selectedId]);
  const selectedConversationId = selectedConversation?.id ?? null;
  const loadConversations = reactExports.useCallback(async () => {
    setError("");
    const next = await listAdminConversations();
    setConversations(next);
    setSelectedId((current) => current ?? search.conversation ?? next[0]?.id ?? null);
  }, [search.conversation]);
  const loadMessages = reactExports.useCallback(async (conversationId) => {
    setMessagesLoading(true);
    try {
      const next = await getMessages(conversationId);
      setMessages(next);
      await markConversationRead(conversationId, "admin");
      setConversations((current) => current.map((conversation) => conversation.id === conversationId ? {
        ...conversation,
        unreadAdminCount: 0
      } : conversation));
    } catch (err) {
      setError(err instanceof Error ? err.message : tr("Messages indisponibles.", "Messages unavailable."));
    } finally {
      setMessagesLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    let mounted = true;
    setLoading(true);
    void listAdminConversations().then((next) => {
      if (!mounted) return;
      setConversations(next);
      setSelectedId(search.conversation ?? next[0]?.id ?? null);
    }).catch((err) => {
      if (mounted) {
        setError(err instanceof Error ? err.message : tr("Conversations indisponibles.", "Conversations unavailable."));
      }
    }).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [search.conversation]);
  reactExports.useEffect(() => {
    if (search.conversation && search.conversation !== selectedId) {
      setSelectedId(search.conversation);
    }
  }, [search.conversation, selectedId]);
  reactExports.useEffect(() => {
    if (!selectedConversationId) {
      setMessages([]);
      setActiveConversationId(null);
      return;
    }
    setActiveConversationId(selectedConversationId);
    void loadMessages(selectedConversationId);
    return () => {
      setActiveConversationId(null);
    };
  }, [loadMessages, selectedConversationId]);
  reactExports.useEffect(() => {
    let unsubscribe = null;
    let mounted = true;
    void subscribeToConversationMessages(() => {
      void loadConversations();
      if (selectedConversationId) void loadMessages(selectedConversationId);
    }).then((cleanup) => {
      if (mounted) unsubscribe = cleanup;
    });
    const interval = window.setInterval(() => {
      void loadConversations();
      if (selectedConversationId) void loadMessages(selectedConversationId);
    }, 1e4);
    return () => {
      mounted = false;
      unsubscribe?.();
      window.clearInterval(interval);
    };
  }, [loadConversations, loadMessages, selectedConversationId]);
  reactExports.useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }, [messages.length, selectedConversationId]);
  const openConversation = (conversationId) => {
    setSelectedId(conversationId);
    navigate({
      to: "/admin/messages",
      search: {
        conversation: conversationId
      }
    });
  };
  const submit = async (event) => {
    event.preventDefault();
    if (!selectedConversation || !reply.trim() || sending) return;
    setSending(true);
    setError("");
    try {
      const sent = await sendMessage({
        conversationId: selectedConversation.id,
        body: reply,
        senderRole: "admin"
      });
      setMessages((current) => [...current, sent]);
      setReply("");
      await loadConversations();
      toast.success(t("Message envoyé.", "Message sent."));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("Message non envoyé.", "Message not sent."));
    } finally {
      setSending(false);
    }
  };
  const toggleStatus = async () => {
    if (!selectedConversation) return;
    setUpdatingStatus(true);
    try {
      await updateConversationStatus(selectedConversation.id, selectedConversation.status === "open" ? "closed" : "open");
      await loadConversations();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("Mise à jour impossible.", "Update failed."));
    } finally {
      setUpdatingStatus(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: t("Messages clients", "Guest messages"), description: t("Conversations client liées aux réservations, demandes générales et réponses de la réception.", "Guest conversations about bookings, general enquiries and reception replies."), actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: loadConversations, className: "admin-action h-10 px-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-4" }),
    t("Actualiser", "Refresh")
  ] }), children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid min-h-[720px] overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)] xl:grid-cols-[390px_minmax(0,1fr)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "border-b border-border bg-secondary/35 xl:border-b-0 xl:border-r", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 border-b border-border p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (event) => setQuery(event.target.value), placeholder: t("Client, email, réservation...", "Guest, email, booking..."), className: "admin-input pl-9" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: ["open", "closed", "all"].map((value) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setStatusFilter(value), className: `h-9 rounded-md border px-2 text-xs font-black transition ${statusFilter === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-primary hover:border-accent"}`, children: value === "open" ? t("Ouverts", "Open") : value === "closed" ? t("Clos", "Closed") : t("Tous", "All") }, value)) })
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-20 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block mt-2 h-20 w-full" })
        ] }) : filteredConversations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-sm text-muted-foreground", children: t("Aucune conversation ne correspond aux filtres.", "No conversations match the filters.") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[650px] overflow-y-auto p-2", children: filteredConversations.map((conversation) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => openConversation(conversation.id), className: `mb-2 w-full rounded-lg border p-3 text-left transition hover:border-accent ${selectedConversation?.id === conversation.id ? "border-primary bg-card" : "border-border bg-card/70"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-black text-primary", children: conversation.clientName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 truncate text-xs text-muted-foreground", children: conversation.clientEmail || conversation.reservationNumber || localizeSubject(conversation.subject, locale) })
            ] }),
            conversation.unreadAdminCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-destructive px-2 py-0.5 text-xs font-black text-white", children: conversation.unreadAdminCount })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground", children: conversation.latestMessage?.body ?? t("Aucun message envoyé.", "No messages sent.") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between gap-2 text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: conversation.status === "open" ? t("Ouvert", "Open") : t("Clos", "Closed") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatChatTime(conversation.lastMessageAt, locale) })
          ] })
        ] }, conversation.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[720px] flex-col", children: selectedConversation ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-card px-5 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black text-primary", children: selectedConversation.clientName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-xs font-black ${selectedConversation.status === "open" ? "bg-emerald-50 text-emerald-800" : "bg-secondary text-muted-foreground"}`, children: selectedConversation.status === "open" ? t("Ouvert", "Open") : t("Clos", "Closed") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
                selectedConversation.clientEmail ?? "-",
                " ·",
                " ",
                selectedConversation.clientPhone ?? "-"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: toggleStatus, disabled: updatingStatus, className: "admin-action", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4" }),
              selectedConversation.status === "open" ? t("Clôturer", "Close") : t("Réouvrir", "Reopen")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 text-sm md:grid-cols-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailTile, { label: t("Sujet", "Subject"), value: localizeSubject(selectedConversation.subject, locale) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailTile, { label: t("Réservation", "Booking"), value: selectedConversation.reservationNumber ?? t("Non liée", "Not linked") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailTile, { label: t("Séjour", "Stay"), value: formatStay(selectedConversation, t("au", "to")) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailTile, { label: t("Total", "Total"), value: typeof selectedConversation.total === "number" ? formatCurrency(selectedConversation.total) : "-" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3 overflow-y-auto bg-[#eef7f4] p-4", children: [
          messagesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: t("Chargement des messages...", "Loading messages...") }) : messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-12 max-w-sm rounded-lg border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground", children: t("Aucun message dans cette conversation.", "No messages in this conversation.") }) : messages.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(ChatBubble, { message: item, currentRole: "admin" }, item.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: submit, className: "border-t border-border bg-card p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:flex-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: reply, onChange: (event) => setReply(event.target.value), placeholder: t("Répondre au client...", "Reply to the guest..."), className: "admin-input min-h-20 flex-1", maxLength: 1600 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: !reply.trim() || sending, className: "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-black text-primary-foreground disabled:opacity-50 sm:self-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" }),
            sending ? t("Envoi...", "Sending...") : t("Répondre", "Reply")
          ] })
        ] }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center justify-center p-6 text-center text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mx-auto mb-3 size-8 text-accent" }),
        t("Sélectionnez une conversation client.", "Select a guest conversation.")
      ] }) }) })
    ] })
  ] });
}
function ChatBubble({
  message,
  currentRole
}) {
  const {
    t,
    locale
  } = useI18n();
  const own = message.senderRole === currentRole;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${own ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `max-w-[82%] rounded-lg px-3 py-2 text-sm shadow-sm ${own ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 text-[10px] font-bold uppercase opacity-70", children: [
      message.senderRole === "admin" ? t("Réception", "Reception") : t("Client", "Guest"),
      " ·",
      " ",
      formatChatTime(message.createdAt, locale)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap leading-6", children: message.body })
  ] }) });
}
function DetailTile({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-background p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 break-words font-black text-primary", children: value })
  ] });
}
function formatStay(conversation, separator) {
  if (!conversation.checkIn || !conversation.checkOut) return "-";
  return `${conversation.checkIn} ${separator} ${conversation.checkOut}`;
}
function formatChatTime(value, locale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}
export {
  AdminMessages as component
};
