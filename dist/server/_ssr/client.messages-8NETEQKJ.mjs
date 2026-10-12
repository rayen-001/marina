import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { al as Route$g, u as useI18n, ag as CLIENT_MESSAGING_LOCKED_REASON, ah as CLIENT_MESSAGING_LOCKED_REASON_EN, am as listClientConversations, an as getMessages, ao as markConversationRead, N as tr, f as getClientSessionProfile, ap as clientHasMessagingAccess, aq as setActiveConversationId, M as subscribeToConversationMessages, ar as localizeSubject, I as localizeRoomName, x as createConversation, y as sendMessage } from "./router-CgbkQim6.mjs";
import "../_libs/seroval.mjs";
import { M as MessageCircle, ac as RefreshCw, aD as Plus, a2 as Send } from "../_libs/lucide-react.mjs";
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
const subjectOptions = ["Demande générale", "Question réservation", "Paiement & Facture", "Arrivée / Check-in", "Demandes spéciales"];
function ClientMessages() {
  const navigate = useNavigate();
  const search = Route$g.useSearch();
  const {
    t,
    locale
  } = useI18n();
  const lockedReason = t(CLIENT_MESSAGING_LOCKED_REASON, CLIENT_MESSAGING_LOCKED_REASON_EN);
  const [profile, setProfile] = reactExports.useState(null);
  const [userId, setUserId] = reactExports.useState(null);
  const [conversations, setConversations] = reactExports.useState([]);
  const [messages, setMessages] = reactExports.useState([]);
  const [selectedId, setSelectedId] = reactExports.useState(search.conversation ?? null);
  const [reply, setReply] = reactExports.useState("");
  const [newSubject, setNewSubject] = reactExports.useState(subjectOptions[0]);
  const [loading, setLoading] = reactExports.useState(true);
  const [messagesLoading, setMessagesLoading] = reactExports.useState(false);
  const [sending, setSending] = reactExports.useState(false);
  const [creating, setCreating] = reactExports.useState(false);
  const [canMessage, setCanMessage] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const bottomRef = reactExports.useRef(null);
  const selectedConversation = reactExports.useMemo(() => conversations.find((conversation) => conversation.id === selectedId) ?? conversations.find((conversation) => conversation.id === search.conversation) ?? conversations[0] ?? null, [conversations, search.conversation, selectedId]);
  const selectedConversationId = selectedConversation?.id ?? null;
  const loadConversations = reactExports.useCallback(async () => {
    setError("");
    const next = await listClientConversations();
    setConversations(next);
    setSelectedId((current) => current ?? search.conversation ?? next[0]?.id ?? null);
  }, [search.conversation]);
  const loadMessages = reactExports.useCallback(async (conversationId) => {
    setMessagesLoading(true);
    try {
      const next = await getMessages(conversationId);
      setMessages(next);
      await markConversationRead(conversationId, "client");
      setConversations((current) => current.map((conversation) => conversation.id === conversationId ? {
        ...conversation,
        unreadClientCount: 0
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
    void Promise.all([getClientSessionProfile(), listClientConversations(), clientHasMessagingAccess()]).then(([context, nextConversations, eligible]) => {
      if (!mounted) return;
      setProfile(context?.profile ?? null);
      setUserId(context?.user.id ?? null);
      setConversations(nextConversations);
      setCanMessage(eligible);
      setSelectedId(search.conversation ?? nextConversations[0]?.id ?? null);
    }).catch((err) => {
      if (mounted) {
        setError(err instanceof Error ? err.message : tr("Messagerie indisponible.", "Messaging unavailable."));
      }
    }).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [search.conversation]);
  reactExports.useEffect(() => {
    if (!selectedConversationId) {
      setMessages([]);
      setActiveConversationId(null);
      return;
    }
    setActiveConversationId(selectedConversationId);
    if (selectedId !== selectedConversationId) setSelectedId(selectedConversationId);
    if (search.conversation !== selectedConversationId) {
      navigate({
        to: "/client/messages",
        search: {
          conversation: selectedConversationId
        }
      });
    }
    void loadMessages(selectedConversationId);
    return () => {
      setActiveConversationId(null);
    };
  }, [loadMessages, navigate, search.conversation, selectedConversationId, selectedId]);
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
      to: "/client/messages",
      search: {
        conversation: conversationId
      }
    });
  };
  const createGeneralConversation = async () => {
    if (!userId || !profile) return;
    setCreating(true);
    setError("");
    try {
      const conversation = await createConversation({
        clientUserId: userId,
        guestId: profile.guestId,
        subject: newSubject
      });
      await loadConversations();
      openConversation(conversation.id);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("Conversation impossible.", "The conversation could not be opened."));
    } finally {
      setCreating(false);
    }
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
        senderRole: "client"
      });
      setMessages((current) => [...current, sent]);
      setReply("");
      await loadConversations();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("Message non envoyé.", "Message not sent."));
    } finally {
      setSending(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-kicker", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-4" }),
          t("Messagerie Directe", "Direct messaging")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-3xl font-black text-primary", children: t("Contacter la réception", "Contact reception") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: t("Une messagerie simple pour vos questions de séjour, réservation, paiement et arrivée.", "Simple messaging for your questions about your stay, booking, payment and arrival.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: loadConversations, className: "admin-action h-10 px-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-4" }),
        t("Actualiser", "Refresh")
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive", children: error }),
    !loading && !canMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-900", children: lockedReason }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid min-h-[680px] overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)] xl:grid-cols-[360px_minmax(0,1fr)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "flex flex-col border-b border-border bg-secondary/35 xl:border-b-0 xl:border-r", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: newSubject, onChange: (event) => setNewSubject(event.target.value), disabled: !canMessage, className: "admin-input h-10 min-h-10 flex-1 disabled:cursor-not-allowed disabled:opacity-60", children: subjectOptions.map((subject) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: subject, children: localizeSubject(subject, locale) }, subject)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: createGeneralConversation, disabled: creating || !canMessage, className: "inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60", title: canMessage ? t("Créer une conversation", "Start a conversation") : lockedReason, "aria-label": t("Créer une conversation", "Start a conversation"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }) })
        ] }) }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block h-16 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-block mt-2 h-16 w-full" })
        ] }) : conversations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-sm text-muted-foreground", children: t("Aucune conversation. Créez un sujet pour contacter la réception.", "No conversations yet. Pick a subject to contact reception.") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-2", children: conversations.map((conversation) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => openConversation(conversation.id), className: `mb-2 w-full rounded-lg border p-3 text-left transition hover:border-accent ${selectedConversation?.id === conversation.id ? "border-primary bg-card shadow-sm" : "border-border bg-card/70"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-black text-primary", children: localizeSubject(conversation.subject, locale) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 truncate text-xs text-muted-foreground", children: conversation.reservationNumber ?? t("Demande générale", "General enquiry") })
            ] }),
            conversation.unreadClientCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-destructive px-2 py-0.5 text-xs font-black text-white", children: conversation.unreadClientCount })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground", children: conversation.latestMessage?.body ?? t("Aucun message envoyé.", "No messages sent.") })
        ] }, conversation.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[680px] flex-col", children: selectedConversation ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-card px-5 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-black text-primary", children: localizeSubject(selectedConversation.subject, locale) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: selectedConversation.reservationNumber ? `${selectedConversation.reservationNumber} · ${selectedConversation.roomName ? localizeRoomName({
            name: selectedConversation.roomName,
            id: ""
          }, locale) : t("Chambre", "Room")}` : t("Réception Marina Cap Monastir", "Marina Cap Monastir reception") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3 overflow-y-auto bg-[#eef7f4] p-4", children: [
          messagesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: t("Chargement des messages...", "Loading messages...") }) : messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-12 max-w-sm rounded-lg border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground", children: t("Envoyez votre premier message à la réception.", "Send your first message to reception.") }) : messages.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(ChatBubble, { message: item, currentRole: "client" }, item.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "border-t border-border bg-card p-3", children: [
          !canMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-semibold text-amber-800", children: lockedReason }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:flex-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: reply, onChange: (event) => setReply(event.target.value), placeholder: t("Écrire un message...", "Write a message..."), disabled: !canMessage, className: "admin-input min-h-20 flex-1 disabled:cursor-not-allowed disabled:opacity-60", maxLength: 1600 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: !canMessage || !reply.trim() || sending, className: "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-black text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:self-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" }),
              sending ? t("Envoi...", "Sending...") : t("Envoyer", "Send")
            ] })
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center justify-center p-6 text-center text-sm text-muted-foreground", children: t("Sélectionnez ou créez une conversation.", "Select or start a conversation.") }) })
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
      message.senderRole === "admin" ? t("Réception", "Reception") : t("Vous", "You"),
      " ·",
      " ",
      formatChatTime(message.createdAt, locale)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap leading-6", children: message.body })
  ] }) });
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
  ClientMessages as component
};
