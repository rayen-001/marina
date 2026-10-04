import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, RefreshCw, Search, Send } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/admin-layout";
import { headT } from "@/lib/i18n/head";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { localizeSubject } from "@/lib/i18n/labels";
import { tr, type Locale } from "@/lib/i18n/locale";
import {
  getMessages,
  listAdminConversations,
  markConversationRead,
  sendMessage,
  setActiveConversationId,
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
    meta: [
      {
        title: headT("Messages clients - Marina Cap Monastir", "Guest messages - Marina Cap Monastir"),
      },
    ],
  }),
  component: AdminMessages,
});

function AdminMessages() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { t, locale, formatCurrency } = useI18n();
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

  const filteredConversations = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return conversations.filter((conversation) => {
      if (statusFilter !== "all" && conversation.status !== statusFilter) return false;
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
  }, [conversations, query, statusFilter]);

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
      setError(err instanceof Error ? err.message : tr("Messages indisponibles.", "Messages unavailable."));
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
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : tr("Conversations indisponibles.", "Conversations unavailable."),
          );
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [search.conversation]);

  useEffect(() => {
    if (search.conversation && search.conversation !== selectedId) {
      setSelectedId(search.conversation);
    }
  }, [search.conversation, selectedId]);

  useEffect(() => {
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
      await updateConversationStatus(
        selectedConversation.id,
        selectedConversation.status === "open" ? "closed" : "open",
      );
      await loadConversations();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("Mise à jour impossible.", "Update failed."));
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <AdminLayout
      title={t("Messages clients", "Guest messages")}
      description={t(
        "Conversations client liées aux réservations, demandes générales et réponses de la réception.",
        "Guest conversations about bookings, general enquiries and reception replies.",
      )}
      actions={
        <button type="button" onClick={loadConversations} className="admin-action h-10 px-3">
          <RefreshCw className="size-4" />
          {t("Actualiser", "Refresh")}
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
                placeholder={t("Client, email, réservation...", "Guest, email, booking...")}
                className="admin-input pl-9"
              />
            </label>
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
                  {value === "open"
                    ? t("Ouverts", "Open")
                    : value === "closed"
                      ? t("Clos", "Closed")
                      : t("Tous", "All")}
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
              {t(
                "Aucune conversation ne correspond aux filtres.",
                "No conversations match the filters.",
              )}
            </div>
          ) : (
            <div className="max-h-[650px] overflow-y-auto p-2">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => openConversation(conversation.id)}
                  className={`mb-2 w-full rounded-lg border p-3 text-left transition hover:border-accent ${
                    selectedConversation?.id === conversation.id
                      ? "border-primary bg-card"
                      : "border-border bg-card/70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-black text-primary">
                        {conversation.clientName}
                      </div>
                      <div className="mt-1 truncate text-xs text-muted-foreground">
                        {conversation.clientEmail ||
                          conversation.reservationNumber ||
                          localizeSubject(conversation.subject, locale)}
                      </div>
                    </div>
                    {conversation.unreadAdminCount > 0 && (
                      <span className="rounded-full bg-destructive px-2 py-0.5 text-xs font-black text-white">
                        {conversation.unreadAdminCount}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
                    {conversation.latestMessage?.body ?? t("Aucun message envoyé.", "No messages sent.")}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2 text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground">
                    <span>
                      {conversation.status === "open" ? t("Ouvert", "Open") : t("Clos", "Closed")}
                    </span>
                    <span>{formatChatTime(conversation.lastMessageAt, locale)}</span>
                  </div>
                </button>
              ))}
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
                        {selectedConversation.status === "open" ? t("Ouvert", "Open") : t("Clos", "Closed")}
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
                    {selectedConversation.status === "open"
                      ? t("Clôturer", "Close")
                      : t("Réouvrir", "Reopen")}
                  </button>
                </div>

                <div className="mt-4 grid gap-3 text-sm md:grid-cols-4">
                  <DetailTile
                    label={t("Sujet", "Subject")}
                    value={localizeSubject(selectedConversation.subject, locale)}
                  />
                  <DetailTile
                    label={t("Réservation", "Booking")}
                    value={selectedConversation.reservationNumber ?? t("Non liée", "Not linked")}
                  />
                  <DetailTile
                    label={t("Séjour", "Stay")}
                    value={formatStay(selectedConversation, t("au", "to"))}
                  />
                  <DetailTile
                    label={t("Total", "Total")}
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
                  <div className="text-sm text-muted-foreground">
                    {t("Chargement des messages...", "Loading messages...")}
                  </div>
                ) : messages.length === 0 ? (
                  <div className="mx-auto mt-12 max-w-sm rounded-lg border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
                    {t("Aucun message dans cette conversation.", "No messages in this conversation.")}
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
                    placeholder={t("Répondre au client...", "Reply to the guest...")}
                    className="admin-input min-h-20 flex-1"
                    maxLength={1600}
                  />
                  <button
                    type="submit"
                    disabled={!reply.trim() || sending}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-black text-primary-foreground disabled:opacity-50 sm:self-end"
                  >
                    <Send className="size-4" />
                    {sending ? t("Envoi...", "Sending...") : t("Répondre", "Reply")}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-muted-foreground">
              <div>
                <MessageCircle className="mx-auto mb-3 size-8 text-accent" />
                {t("Sélectionnez une conversation client.", "Select a guest conversation.")}
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
  const { t, locale } = useI18n();
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
          {message.senderRole === "admin" ? t("Réception", "Reception") : t("Client", "Guest")} ·{" "}
          {formatChatTime(message.createdAt, locale)}
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

function formatStay(conversation: ConversationSummary, separator: string) {
  if (!conversation.checkIn || !conversation.checkOut) return "-";
  return `${conversation.checkIn} ${separator} ${conversation.checkOut}`;
}

function formatChatTime(value: string, locale: Locale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
