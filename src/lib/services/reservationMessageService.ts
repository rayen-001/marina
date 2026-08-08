import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import type { Reservation } from "@/data/hotel";
import { getSupabaseOrNull, warnSupabaseFallback } from "@/lib/supabase/serviceHelpers";
import type { MessageSenderType, Tables } from "@/lib/supabase/types";

type ConversationRow = Tables<"reservation_conversations">;
type MessageRow = Tables<"reservation_messages">;

export type ReservationConversation = {
  id: string;
  ownerId: string;
  reservationId: string;
  clientName: string;
  clientEmail: string | null;
  clientPhone: string | null;
  status: "open" | "closed";
  createdAt: string;
  updatedAt: string;
};

export type ReservationMessage = {
  id: string;
  conversationId: string;
  senderType: MessageSenderType;
  senderName: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export type ConversationSummary = ReservationConversation & {
  latestMessage: ReservationMessage | null;
  unreadAdminCount: number;
};

export type ReservationMessageRealtimeEvent = RealtimePostgresChangesPayload<MessageRow>;

const mockConversations: ReservationConversation[] = [];
const mockMessages: ReservationMessage[] = [];

export async function getOrCreateReservationConversation(
  reservation: Reservation,
  createIfMissing = true,
): Promise<ReservationConversation | null> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return getOrCreateMockConversation(reservation, createIfMissing);

  try {
    const direct = await supabase
      .from("reservation_conversations")
      .select("*")
      .eq("reservation_id", reservation.id)
      .maybeSingle();

    if (direct.data) return mapConversation(direct.data);
    if (direct.error && !isPermissionError(direct.error)) throw direct.error;
    if (!createIfMissing) return null;

    const rpc = await (supabase.rpc as any)("get_or_create_reservation_conversation", {
      p_reservation_id: reservation.id,
      p_client_name: reservation.guest.fullName,
      p_client_email: reservation.guest.email,
      p_client_phone: reservation.guest.phone,
    });

    if (rpc.error) throw rpc.error;
    return mapConversation(normalizeRpcRow<ConversationRow>(rpc.data));
  } catch (error) {
    warnSupabaseFallback("reservation conversation lookup", error);
    return getOrCreateMockConversation(reservation, createIfMissing);
  }
}

export async function listReservationMessages(conversationId: string): Promise<ReservationMessage[]> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return mockMessagesForConversation(conversationId);

  try {
    const direct = await supabase
      .from("reservation_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (direct.data && !direct.error && direct.data.length > 0) return direct.data.map(mapMessage);
    if (direct.error && !isPermissionError(direct.error)) throw direct.error;

    const rpc = await (supabase.rpc as any)("get_reservation_conversation_messages", {
      p_conversation_id: conversationId,
    });
    if (rpc.error) {
      if (direct.data && !direct.error) return direct.data.map(mapMessage);
      throw rpc.error;
    }
    return (rpc.data ?? []).map(mapMessage);
  } catch (error) {
    warnSupabaseFallback("reservation messages query", error);
    return mockMessagesForConversation(conversationId);
  }
}

export async function sendReservationMessage(input: {
  conversationId: string;
  senderType: MessageSenderType;
  senderName: string;
  message: string;
}): Promise<ReservationMessage> {
  const message = input.message.trim();
  if (!message) throw new Error("Message requis.");

  const supabase = await getSupabaseOrNull();
  if (!supabase) return insertMockMessage({ ...input, message });

  try {
    const rpc = await (supabase.rpc as any)("send_reservation_message", {
      p_conversation_id: input.conversationId,
      p_sender_type: input.senderType,
      p_sender_name: input.senderName,
      p_message: message,
    });

    if (!rpc.error && rpc.data) return mapMessage(normalizeRpcRow<MessageRow>(rpc.data));
    if (rpc.error && !isMissingFunctionError(rpc.error)) throw rpc.error;

    const { data, error } = await supabase
      .from("reservation_messages")
      .insert({
        conversation_id: input.conversationId,
        sender_type: input.senderType,
        sender_name: input.senderName,
        message,
        is_read: false,
      })
      .select("*")
      .single();

    if (error) throw error;
    return mapMessage(data);
  } catch (error) {
    warnSupabaseFallback("reservation message insert", error);
    return insertMockMessage({ ...input, message });
  }
}

export async function markReservationMessagesRead(
  conversationId: string,
  readerType: MessageSenderType,
) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) {
    for (const message of mockMessages) {
      if (message.conversationId === conversationId && message.senderType !== readerType) {
        message.isRead = true;
      }
    }
    return;
  }

  try {
    const rpc = await (supabase.rpc as any)("mark_reservation_messages_read", {
      p_conversation_id: conversationId,
      p_reader_type: readerType,
    });
    if (!rpc.error) return;

    const { error } = await supabase
      .from("reservation_messages")
      .update({ is_read: true })
      .eq("conversation_id", conversationId)
      .neq("sender_type", readerType);
    if (error) throw error;
  } catch (error) {
    warnSupabaseFallback("reservation message read update", error);
  }
}

export async function listConversationSummaries(): Promise<ConversationSummary[]> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return buildMockSummaries();

  try {
    const [conversationsResult, messagesResult] = await Promise.all([
      supabase
        .from("reservation_conversations")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(50),
      supabase
        .from("reservation_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(300),
    ]);

    if (conversationsResult.error) throw conversationsResult.error;
    if (messagesResult.error) throw messagesResult.error;

    const messages = (messagesResult.data ?? []).map(mapMessage);
    return (conversationsResult.data ?? []).map((row) => buildSummary(mapConversation(row), messages));
  } catch (error) {
    warnSupabaseFallback("reservation conversation summaries", error);
    return buildMockSummaries();
  }
}

export async function getUnreadReservationMessageCount() {
  const summaries = await listConversationSummaries();
  return summaries.reduce((sum, conversation) => sum + conversation.unreadAdminCount, 0);
}

async function resolveOwnerIdForContact(supabase: any): Promise<string | null> {
  try {
    const { data: roomData } = await supabase
      .from("room_types")
      .select("owner_id")
      .not("owner_id", "is", null)
      .limit(1)
      .maybeSingle();

    if (roomData?.owner_id) return roomData.owner_id;

    const { data: resData } = await supabase
      .from("reservations")
      .select("owner_id")
      .not("owner_id", "is", null)
      .limit(1)
      .maybeSingle();

    return resData?.owner_id ?? null;
  } catch {
    return null;
  }
}

export async function createContactConversation(input: {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await getSupabaseOrNull();
  const formattedMessage = `[${input.subject}] ${input.message.trim()}`;

  if (!supabase) {
    const convId = `mock-conv-contact-${Date.now()}`;
    const newConv: ReservationConversation = {
      id: convId,
      ownerId: "mock-admin-001",
      reservationId: "",
      clientName: input.fullName,
      clientEmail: input.email || null,
      clientPhone: input.phone || null,
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockConversations.unshift(newConv);
    mockMessages.push({
      id: `mock-msg-${Date.now()}`,
      conversationId: convId,
      senderType: "guest",
      senderName: input.fullName,
      message: formattedMessage,
      isRead: false,
      createdAt: new Date().toISOString(),
    });
    return { success: true };
  }

  try {
    const ownerId = await resolveOwnerIdForContact(supabase);
    const insertPayload: Record<string, unknown> = {
      client_name: input.fullName,
      client_email: input.email || null,
      client_phone: input.phone || null,
      status: "open",
    };
    if (ownerId) insertPayload.owner_id = ownerId;

    let { data: convData, error: convErr } = await supabase
      .from("reservation_conversations")
      .insert(insertPayload)
      .select("*")
      .single();

    if (convErr) throw convErr;

    const { error: msgErr } = await supabase
      .from("reservation_messages")
      .insert({
        conversation_id: convData.id,
        sender_type: "guest",
        sender_name: input.fullName,
        message: formattedMessage,
        is_read: false,
      });

    if (msgErr) throw msgErr;
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur lors de l'envoi";
    warnSupabaseFallback("contact form submission", error);
    return { success: false, error: message };
  }
}

export async function subscribeToReservationMessages(
  onEvent: (event: ReservationMessageRealtimeEvent) => void,
) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return () => undefined;

  // Remove any existing channel with the same name to avoid
  // "cannot add callbacks after subscribe()" on React re-renders
  const existing = supabase.getChannels().find((c) => c.topic === "realtime:reservation-messages");
  if (existing) await supabase.removeChannel(existing);

  const channel = supabase
    .channel("reservation-messages")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "reservation_messages" },
      (payload) => onEvent(payload as ReservationMessageRealtimeEvent),
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}

function getOrCreateMockConversation(
  reservation: Reservation,
  createIfMissing: boolean,
): ReservationConversation | null {
  const existing = mockConversations.find((conversation) => conversation.reservationId === reservation.id);
  if (existing || !createIfMissing) return existing ?? null;

  const conversation: ReservationConversation = {
    id: `mock-conv-${reservation.id}`,
    ownerId: "mock-admin-001",
    reservationId: reservation.id,
    clientName: reservation.guest.fullName,
    clientEmail: reservation.guest.email,
    clientPhone: reservation.guest.phone,
    status: "open",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockConversations.unshift(conversation);
  return conversation;
}

function insertMockMessage(input: {
  conversationId: string;
  senderType: MessageSenderType;
  senderName: string;
  message: string;
}) {
  const message: ReservationMessage = {
    id: `mock-msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    conversationId: input.conversationId,
    senderType: input.senderType,
    senderName: input.senderName || (input.senderType === "admin" ? "Admin" : "Client"),
    message: input.message,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  mockMessages.push(message);

  const conversation = mockConversations.find((item) => item.id === input.conversationId);
  if (conversation) conversation.updatedAt = message.createdAt;

  return message;
}

function buildMockSummaries() {
  return mockConversations.map((conversation) => buildSummary(conversation, mockMessages));
}

function buildSummary(
  conversation: ReservationConversation,
  messages: ReservationMessage[],
): ConversationSummary {
  const ownMessages = messages
    .filter((message) => message.conversationId === conversation.id)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const latestMessage = ownMessages[ownMessages.length - 1] ?? null;
  const unreadAdminCount = ownMessages.filter(
    (message) => message.senderType === "client" && !message.isRead,
  ).length;

  return { ...conversation, latestMessage, unreadAdminCount };
}

function mockMessagesForConversation(conversationId: string) {
  return mockMessages
    .filter((message) => message.conversationId === conversationId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

function mapConversation(row: ConversationRow): ReservationConversation {
  return {
    id: row.id,
    ownerId: row.owner_id,
    reservationId: row.reservation_id,
    clientName: row.client_name,
    clientEmail: row.client_email,
    clientPhone: row.client_phone,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapMessage(row: MessageRow): ReservationMessage {
  return {
    id: row.id,
    conversationId: row.conversation_id,
    senderType: row.sender_type,
    senderName: row.sender_name,
    message: row.message,
    isRead: row.is_read,
    createdAt: row.created_at,
  };
}

function normalizeRpcRow<T>(value: T | T[]) {
  return Array.isArray(value) ? value[0] : value;
}

function isPermissionError(error: unknown) {
  const maybeError = error as { code?: string; message?: string; status?: number };
  const message = maybeError?.message?.toLowerCase() ?? "";
  return (
    maybeError?.code === "42501" ||
    maybeError?.status === 401 ||
    maybeError?.status === 403 ||
    message.includes("permission") ||
    message.includes("row-level security")
  );
}

function isMissingFunctionError(error: unknown) {
  const maybeError = error as { code?: string; message?: string };
  const message = maybeError?.message?.toLowerCase() ?? "";
  return maybeError?.code === "42883" || message.includes("function");
}
