import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MessageCircle, Plus, RefreshCw, Send } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { getClientSessionProfile, type ClientProfile } from "@/lib/auth/clientAuth";
import {
  clientHasMessagingAccess,
  CLIENT_MESSAGING_LOCKED_REASON,
  createConversation,
  getMessages,
  listClientConversations,
  markConversationRead,
  sendMessage,
  subscribeToConversationMessages,
  type ConversationMessage,
  type ConversationSummary,
} from "@/lib/services/messageService";

type ClientMessagesSearch = {
  conversation?: string;
};

const DEPARTMENT_OPTIONS = [
  {
    id: "marina",
    label: "🏢 Réception Marina (Hôtel)",
    badgeText: "🏢 Réception Marina",
    badgeStyle: "bg-ocean/10 text-ocean border-ocean/20",
    subjects: [
      "Hôtel - Demande générale",
      "Hôtel - Question réservation",
      "Hôtel - Paiement & Facture",
      "Hôtel - Arrivée / Check-in",
      "Hôtel - Demandes spéciales / Services",
    ],
  },
  {
    id: "capitainerie",
    label: "⚓ Capitainerie (Port de Plaisance)",
    badgeText: "⚓ Capitainerie",
    badgeStyle: "bg-teal-50 text-teal-800 border-teal-200",
    subjects: [
      "Port - Demande d'amarrage / Ponton",
      "Port - Assistance VHF 16 & 09",
      "Port - Tarifs & Formalités escale",
      "Port - Eau, Électricité & Carburant",
    ],
  },
];

export const Route = createFileRoute("/client/messages")({
  validateSearch: (search: Record<string, unknown>): ClientMessagesSearch => ({
    conversation: typeof search.conversation === "string" ? search.conversation : undefined,
  }),
  head: () => ({
    meta: [{ title: "Messages client - Marina Cap Monastir" }],
  }),
  component: ClientMessages,
});

function ClientMessages() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(search.conversation ?? null);
  const [reply, setReply] = useState("");
  const [selectedDept, setSelectedDept] = useState("marina");
  const [newSubject, setNewSubject] = useState(DEPARTMENT_OPTIONS[0].subjects[0]);
  const [filterDept, setFilterDept] = useState<"all" | "marina" | "capitainerie">("all");
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [creating, setCreating] = useState(false);
  const [canMessage, setCanMessage] = useState(true);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const availableSubjects = useMemo(() => {
    const dept = DEPARTMENT_OPTIONS.find((d) => d.id === selectedDept);
    return dept ? dept.subjects : DEPARTMENT_OPTIONS[0].subjects;
  }, [selectedDept]);

  const selectedConversation = useMemo(
    () =>
      conversations.find((conversation) => conversation.id === selectedId) ??
      conversations.find((conversation) => conversation.id === search.conversation) ??
      conversations[0] ??
      null,
    [conversations, search.conversation, selectedId],
  );
  const selectedConversationId = selectedConversation?.id ?? null;

  const isCapitainerieSubject = (subject: string) =>
    subject.toLowerCase().includes("port") ||
    subject.toLowerCase().includes("capitainerie") ||
    subject.toLowerCase().includes("amarrage") ||
    subject.toLowerCase().includes("vhf") ||
    subject.toLowerCase().includes("ponton");

  const filteredConversations = useMemo(() => {
    if (filterDept === "all") return conversations;
    return conversations.filter((c) => {
      const isPort = isCapitainerieSubject(c.subject);
      return filterDept === "capitainerie" ? isPort : !isPort;
    });
  }, [conversations, filterDept]);

  const loadConversations = useCallback(async () => {
    setError("");
    const next = await listClientConversations();
    setConversations(next);
    setSelectedId((current) => current ?? search.conversation ?? next[0]?.id ?? null);
  }, [search.conversation]);

  const loadMessages = useCallback(async (conversationId: string) => {
    setMessagesLoading(true);
    try {
      const next = await getMessages(conversationId);
      setMessages(next);
      await markConversationRead(conversationId, "client");
      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === conversationId
            ? { ...conversation, unreadClientCount: 0 }
            : conversation,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Messages indisponibles.");
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    void Promise.all([
      getClientSessionProfile(),
      listClientConversations(),
      clientHasMessagingAccess(),
    ])
      .then(([context, nextConversations, eligible]) => {
        if (!mounted) return;
        setProfile(context?.profile ?? null);
        setUserId(context?.user.id ?? null);
        setConversations(nextConversations);
        setCanMessage(eligible);
        setSelectedId(search.conversation ?? nextConversations[0]?.id ?? null);
      })
      .catch((err) => {
        if (mounted) setError(err instanceof Error ? err.message : "Messagerie indisponible.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [search.conversation]);

  useEffect(() => {
    if (!selectedConversationId) {
      setMessages([]);
      return;
    }

    if (selectedId !== selectedConversationId) setSelectedId(selectedConversationId);
    if (search.conversation !== selectedConversationId) {
      navigate({ to: "/client/messages", search: { conversation: selectedConversationId } });
    }
    void loadMessages(selectedConversationId);
  }, [loadMessages, navigate, search.conversation, selectedConversationId, selectedId]);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
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
    }, 10_000);

    return () => {
      mounted = false;
      unsubscribe?.();
      window.clearInterval(interval);
    };
  }, [loadConversations, loadMessages, selectedConversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, selectedConversationId]);

  const openConversation = (conversationId: string) => {
    setSelectedId(conversationId);
    navigate({ to: "/client/messages", search: { conversation: conversationId } });
  };

  const createGeneralConversation = async () => {
    if (!userId || !profile) return;
    setCreating(true);
    setError("");
    try {
      const conversation = await createConversation({
        clientUserId: userId,
        guestId: profile.guestId,
        subject: newSubject,
      });
      await loadConversations();
      openConversation(conversation.id);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Conversation impossible.");
    } finally {
      setCreating(false);
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedConversation || !reply.trim() || sending) return;

    setSending(true);
    setError("");
    try {
      const sent = await sendMessage({
        conversationId: selectedConversation.id,
        body: reply,
        senderRole: "client",
      });
      setMessages((current) => [...current, sent]);
      setReply("");
      await loadConversations();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Message non envoyé.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="section-kicker">
            <MessageCircle className="size-4" />
            Messagerie Directe
          </div>
          <h1 className="mt-2 text-3xl font-black text-primary">Centre de Contact</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Échangez directement avec la Réception Marina (Séjours) ou la Capitainerie (Port de Plaisance).
          </p>
        </div>
        <button type="button" onClick={loadConversations} className="admin-action h-10 px-3">
          <RefreshCw className="size-4" />
          Actualiser
        </button>
      </header>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
          {error}
        </div>
      )}

      {!loading && !canMessage && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
          {CLIENT_MESSAGING_LOCKED_REASON}
        </div>
      )}

      <section className="grid min-h-[680px] overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)] xl:grid-cols-[380px_minmax(0,1fr)]">
        <aside className="flex flex-col border-b border-border bg-secondary/35 xl:border-b-0 xl:border-r">
          <div className="space-y-3 border-b border-border bg-card/60 p-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Nouvelle conversation
            </div>

            <div className="grid grid-cols-2 gap-1.5 rounded-lg bg-secondary/60 p-1">
              {DEPARTMENT_OPTIONS.map((dept) => (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => {
                    setSelectedDept(dept.id);
                    setNewSubject(dept.subjects[0]);
                  }}
                  className={`rounded-md py-1.5 text-center text-xs font-bold transition ${
                    selectedDept === dept.id
                      ? "bg-card text-primary shadow-sm"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {dept.id === "marina" ? "🏢 Hôtel" : "⚓ Capitainerie"}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <select
                value={newSubject}
                onChange={(event) => setNewSubject(event.target.value)}
                disabled={!canMessage}
                className="admin-input h-10 min-h-10 flex-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {availableSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={createGeneralConversation}
                disabled={creating || !canMessage}
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
                title={canMessage ? "Créer une conversation" : CLIENT_MESSAGING_LOCKED_REASON}
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 border-b border-border px-3 py-2 text-xs font-semibold text-muted-foreground">
            <button
              type="button"
              onClick={() => setFilterDept("all")}
              className={`rounded-md px-2.5 py-1 transition ${
                filterDept === "all" ? "bg-primary text-primary-foreground font-bold" : "hover:bg-card"
              }`}
            >
              Tous ({conversations.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterDept("marina")}
              className={`rounded-md px-2.5 py-1 transition ${
                filterDept === "marina" ? "bg-primary text-primary-foreground font-bold" : "hover:bg-card"
              }`}
            >
              🏢 Hôtel
            </button>
            <button
              type="button"
              onClick={() => setFilterDept("capitainerie")}
              className={`rounded-md px-2.5 py-1 transition ${
                filterDept === "capitainerie" ? "bg-primary text-primary-foreground font-bold" : "hover:bg-card"
              }`}
            >
              ⚓ Capitainerie
            </button>
          </div>

          {loading ? (
            <div className="p-3">
              <div className="skeleton-block h-16 w-full" />
              <div className="skeleton-block mt-2 h-16 w-full" />
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Aucune conversation dans cette catégorie.
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-2">
              {filteredConversations.map((conversation) => {
                const isPort = isCapitainerieSubject(conversation.subject);
                return (
                  <button
                    key={conversation.id}
                    type="button"
                    onClick={() => openConversation(conversation.id)}
                    className={`mb-2 w-full rounded-lg border p-3 text-left transition hover:border-accent ${
                      selectedConversation?.id === conversation.id
                        ? "border-primary bg-card shadow-sm"
                        : "border-border bg-card/70"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="mb-1">
                          <span
                            className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${
                              isPort
                                ? "border-teal-300 bg-teal-50 text-teal-900"
                                : "border-ocean/20 bg-ocean/10 text-ocean-dark"
                            }`}
                          >
                            {isPort ? "⚓ Capitainerie" : "🏢 Réception Marina"}
                          </span>
                        </div>
                        <div className="truncate font-black text-primary">{conversation.subject}</div>
                        <div className="mt-0.5 truncate text-xs text-muted-foreground">
                          {conversation.reservationNumber ?? "Demande directe"}
                        </div>
                      </div>
                      {conversation.unreadClientCount > 0 && (
                        <span className="rounded-full bg-destructive px-2 py-0.5 text-xs font-black text-white">
                          {conversation.unreadClientCount}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
                      {conversation.latestMessage?.body ?? "Aucun message envoyé."}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </aside>

        <div className="flex min-h-[680px] flex-col">
          {selectedConversation ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-5 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block rounded-md border px-2.5 py-0.5 text-xs font-black uppercase tracking-wide ${
                        isCapitainerieSubject(selectedConversation.subject)
                          ? "border-teal-300 bg-teal-50 text-teal-900"
                          : "border-ocean/20 bg-ocean/10 text-ocean-dark"
                      }`}
                    >
                      {isCapitainerieSubject(selectedConversation.subject)
                        ? "⚓ Capitainerie (Port de Plaisance)"
                        : "🏢 Réception Marina Cap Monastir"}
                    </span>
                  </div>
                  <div className="mt-1 text-lg font-black text-primary">{selectedConversation.subject}</div>
                  <div className="text-xs text-muted-foreground">
                    {selectedConversation.reservationNumber
                      ? `${selectedConversation.reservationNumber} · ${selectedConversation.roomName ?? "Appartement"}`
                      : "Demande de contact directe"}
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto bg-[#eef7f4] p-4">
                {messagesLoading ? (
                  <div className="text-sm text-muted-foreground">Chargement des messages...</div>
                ) : messages.length === 0 ? (
                  <div className="mx-auto mt-12 max-w-sm rounded-lg border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
                    Envoyez votre premier message à la réception.
                  </div>
                ) : (
                  messages.map((item) => (
                    <ChatBubble key={item.id} message={item} currentRole="client" />
                  ))
                )}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={submit} className="border-t border-border bg-card p-3">
                {!canMessage && (
                  <p className="mb-2 text-xs font-semibold text-amber-800">
                    {CLIENT_MESSAGING_LOCKED_REASON}
                  </p>
                )}
                <div className="flex flex-col gap-2 sm:flex-row">
                  <textarea
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    placeholder="Écrire un message..."
                    disabled={!canMessage}
                    className="admin-input min-h-20 flex-1 disabled:cursor-not-allowed disabled:opacity-60"
                    maxLength={1600}
                  />
                  <button
                    type="submit"
                    disabled={!canMessage || !reply.trim() || sending}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-black text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:self-end"
                  >
                    <Send className="size-4" />
                    {sending ? "Envoi..." : "Envoyer"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-muted-foreground">
              Sélectionnez ou créez une conversation.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ChatBubble({
  message,
  currentRole,
}: {
  message: ConversationMessage;
  currentRole: "client" | "admin";
}) {
  const own = message.senderRole === currentRole;

  return (
    <div className={`flex ${own ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-lg px-3 py-2 text-sm shadow-sm ${
          own
            ? "bg-primary text-primary-foreground"
            : "border border-border bg-card text-foreground"
        }`}
      >
        <div className="mb-1 text-[10px] font-bold uppercase opacity-70">
          {message.senderRole === "admin" ? "Réception" : "Vous"} ·{" "}
          {formatChatTime(message.createdAt)}
        </div>
        <p className="whitespace-pre-wrap leading-6">{message.body}</p>
      </div>
    </div>
  );
}

function formatChatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
