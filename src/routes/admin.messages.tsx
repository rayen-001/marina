import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, RefreshCw, Search, Send } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/admin-layout";
import { formatCurrency } from "@/data/hotel";
import {
  getMessages,
  listAdminConversations,
  markConversationRead,
  sendMessage,
  subscribeToConversationMessages,
  updateConversationStatus,
  type ConversationMessage,
  type ConversationSummary,
} from "@/lib/services/messageService";

type AdminMessagesSearch = {
  conversation?: string;
};

type StatusFilter = "open" | "closed" | "all";

export const Route = createFileRoute("/admin/messages")({
  validateSearch: (search: Record<string, unknown>): AdminMessagesSearch => ({
    conversation: typeof search.conversation === "string" ? search.conversation : undefined,
  }),
  head: () => ({
    meta: [{ title: "Messages clients - Marina Cap Monastir" }],
  }),
  component: AdminMessages,
});

function AdminMessages() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(search.conversation ?? null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("open");
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [departmentFilter, setDepartmentFilter] = useState<"all" | "marina" | "capitainerie">("all");

  const isCapitainerieSubject = (subject: string) =>
    subject.toLowerCase().includes("port") ||
    subject.toLowerCase().includes("capitainerie") ||
    subject.toLowerCase().includes("amarrage") ||
    subject.toLowerCase().includes("vhf") ||
    subject.toLowerCase().includes("ponton");

  const filteredConversations = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return conversations.filter((conversation) => {
      if (statusFilter !== "all" && conversation.status !== statusFilter) return false;

      const isPort = isCapitainerieSubject(conversation.subject);
      if (departmentFilter === "marina" && isPort) return false;
      if (departmentFilter === "capitainerie" && !isPort) return false;

      if (!needle) return true;
      return [
        conversation.clientName,
        conversation.clientEmail,
        conversation.clientPhone,
        conversation.reservationNumber,
        conversation.subject,
        conversation.latestMessage?.body,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [conversations, departmentFilter, query, statusFilter]);

  const selectedConversation = useMemo(
    () =>
      conversations.find((conversation) => conversation.id === selectedId) ??
      conversations.find((conversation) => conversation.id === search.conversation) ??
      filteredConversations[0] ??
      null,
    [conversations, filteredConversations, search.conversation, selectedId],
  );
  const selectedConversationId = selectedConversation?.id ?? null;

  const loadConversations = useCallback(async () => {
    setError("");
    const next = await listAdminConversations();
    setConversations(next);
    setSelectedId((current) => current ?? search.conversation ?? next[0]?.id ?? null);
  }, [search.conversation]);

  const loadMessages = useCallback(async (conversationId: string) => {
    setMessagesLoading(true);
    try {
      const next = await getMessages(conversationId);
      setMessages(next);
      await markConversationRead(conversationId, "admin");
      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === conversationId
            ? { ...conversation, unreadAdminCount: 0 }
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

    void listAdminConversations()
      .then((next) => {
        if (!mounted) return;
        setConversations(next);
        setSelectedId(search.conversation ?? next[0]?.id ?? null);
      })
      .catch((err) => {
        if (mounted) setError(err instanceof Error ? err.message : "Conversations indisponibles.");
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
      navigate({ to: "/admin/messages", search: { conversation: selectedConversationId } });
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
    navigate({ to: "/admin/messages", search: { conversation: conversationId } });
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
        senderRole: "admin",
      });
      setMessages((current) => [...current, sent]);
      setReply("");
      await loadConversations();
      toast.success("Message envoyé.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Message non envoyé.");
    } finally {
      setSending(false);
    }
  };

  const toggleStatus = async () => {
    if (!selectedConversation) return;
    setUpdatingStatus(true);
    try {
      await updateConversationStatus(
        selectedConversation.id,
        selectedConversation.status === "open" ? "closed" : "open",
      );
      await loadConversations();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Mise à jour impossible.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <AdminLayout
      title="Messages clients"
      description="Conversations client liées aux réservations, demandes générales et réponses de la réception."
      actions={
        <button type="button" onClick={loadConversations} className="admin-action h-10 px-3">
          <RefreshCw className="size-4" />
          Actualiser
        </button>
      }
    >
      {error && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
          {error}
        </div>
      )}

      <section className="grid min-h-[720px] overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)] xl:grid-cols-[390px_minmax(0,1fr)]">
        <aside className="border-b border-border bg-secondary/35 xl:border-b-0 xl:border-r">
          <div className="space-y-3 border-b border-border p-3">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Client, email, réservation..."
                className="admin-input pl-9"
              />
            </label>
            <div className="grid grid-cols-3 gap-1 rounded-lg bg-secondary/60 p-1">
              <button
                type="button"
                onClick={() => setDepartmentFilter("all")}
                className={`rounded-md py-1 text-center text-xs font-bold transition ${
                  departmentFilter === "all"
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Tous
              </button>
              <button
                type="button"
                onClick={() => setDepartmentFilter("marina")}
                className={`rounded-md py-1 text-center text-xs font-bold transition ${
                  departmentFilter === "marina"
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                🏢 Hôtel
              </button>
              <button
                type="button"
                onClick={() => setDepartmentFilter("capitainerie")}
                className={`rounded-md py-1 text-center text-xs font-bold transition ${
                  departmentFilter === "capitainerie"
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                ⚓ Capitainerie
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(["open", "closed", "all"] as StatusFilter[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatusFilter(value)}
                  className={`h-9 rounded-md border px-2 text-xs font-black transition ${
                    statusFilter === value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-primary hover:border-accent"
                  }`}
                >
                  {value === "open" ? "Ouverts" : value === "closed" ? "Clos" : "Tous etats"}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="p-3">
              <div className="skeleton-block h-20 w-full" />
              <div className="skeleton-block mt-2 h-20 w-full" />
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Aucune conversation ne correspond aux filtres.
            </div>
          ) : (
            <div className="max-h-[650px] overflow-y-auto p-2">
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
                    <div className="flex items-start justify-between gap-3">
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
                        <div className="truncate font-black text-primary">
                          {conversation.clientName}
                        </div>
                        <div className="mt-0.5 truncate text-xs text-muted-foreground">
                          {conversation.reservationNumber ?? conversation.subject}
                        </div>
                      </div>
                      {conversation.unreadAdminCount > 0 && (
                        <span className="rounded-full bg-destructive px-2 py-0.5 text-xs font-black text-white">
                          {conversation.unreadAdminCount}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
                      {conversation.latestMessage?.body ?? "Aucun message envoyé."}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-2 text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground">
                      <span>{conversation.status}</span>
                      <span>{formatChatTime(conversation.lastMessageAt)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </aside>

        <div className="flex min-h-[720px] flex-col">
          {selectedConversation ? (
            <>
              <div className="border-b border-border bg-card px-5 py-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-black text-primary">
                        {selectedConversation.clientName}
                      </h2>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-black ${
                          selectedConversation.status === "open"
                            ? "bg-emerald-50 text-emerald-800"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {selectedConversation.status === "open" ? "Ouvert" : "Clos"}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {selectedConversation.clientEmail ?? "-"} ·{" "}
                      {selectedConversation.clientPhone ?? "-"}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={toggleStatus}
                    disabled={updatingStatus}
                    className="admin-action"
                  >
                    <CheckCircle2 className="size-4" />
                    {selectedConversation.status === "open" ? "Clôturer" : "Réouvrir"}
                  </button>
                </div>

                <div className="mt-4 grid gap-3 text-sm md:grid-cols-4">
                  <DetailTile label="Sujet" value={selectedConversation.subject} />
                  <DetailTile
                    label="Réservation"
                    value={selectedConversation.reservationNumber ?? "Non liée"}
                  />
                  <DetailTile label="Séjour" value={formatStay(selectedConversation)} />
                  <DetailTile
                    label="Total"
                    value={
                      typeof selectedConversation.total === "number"
                        ? formatCurrency(selectedConversation.total)
                        : "-"
                    }
                  />
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto bg-[#eef7f4] p-4">
                {messagesLoading ? (
                  <div className="text-sm text-muted-foreground">Chargement des messages...</div>
                ) : messages.length === 0 ? (
                  <div className="mx-auto mt-12 max-w-sm rounded-lg border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
                    Aucun message dans cette conversation.
                  </div>
                ) : (
                  messages.map((item) => (
                    <ChatBubble key={item.id} message={item} currentRole="admin" />
                  ))
                )}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={submit} className="border-t border-border bg-card p-3">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <textarea
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    placeholder="Répondre au client..."
                    className="admin-input min-h-20 flex-1"
                    maxLength={1600}
                  />
                  <button
                    type="submit"
                    disabled={!reply.trim() || sending}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-black text-primary-foreground disabled:opacity-50 sm:self-end"
                  >
                    <Send className="size-4" />
                    {sending ? "Envoi..." : "Répondre"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-muted-foreground">
              <div>
                <MessageCircle className="mx-auto mb-3 size-8 text-accent" />
                Sélectionnez une conversation client.
              </div>
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
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
          {message.senderRole === "admin" ? "Réception" : "Client"} ·{" "}
          {formatChatTime(message.createdAt)}
        </div>
        <p className="whitespace-pre-wrap leading-6">{message.body}</p>
      </div>
    </div>
  );
}

function DetailTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-3">
      <div className="text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 break-words font-black text-primary">{value}</div>
    </div>
  );
}

function formatStay(conversation: ConversationSummary) {
  if (!conversation.checkIn || !conversation.checkOut) return "-";
  return `${conversation.checkIn} au ${conversation.checkOut}`;
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
