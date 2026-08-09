import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import type { Guest, PaymentStatus, Reservation, ReservationStatus } from "@/data/hotel";
import { getCurrentAdminProfile } from "@/lib/auth/adminAuth";
import {
  getClientSessionProfile,
  mapSupabaseError,
  type ClientProfile,
} from "@/lib/auth/clientAuth";
import { getCurrentProfile, isAdminRole, type UserProfile } from "@/lib/auth/profilesAuth";
import { getSupabaseOrNull } from "@/lib/supabase/serviceHelpers";
import type { ConversationStatus, MessageSenderType, Tables } from "@/lib/supabase/types";

type MessageRow = Tables<"messages">;
type ProfileRow = Tables<"profiles">;
type ReservationRow = Tables<"reservations">;
type RoomRow = Pick<Tables<"room_types">, "id" | "name">;

/** Statuses that count as an active Appart-Hôtel reservation for portal access and messaging. */
export const ACTIVE_RESERVATION_STATUSES: ReservationStatus[] = [
  "pending",
  "confirmed",
  "checked_in",
];

export type ClientReservation = {
  id: string;
  reservationNumber: string;
  roomTypeId: string;
  roomName: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  status: ReservationStatus;
  paymentStatus: PaymentStatus;
  total: number;
  adults: number;
  children: number;
};

export type ConversationMessage = {
  id: string;
  conversationId: string;
  senderRole: MessageSenderType;
  senderUserId: string | null;
  senderId: string;
  receiverId: string;
  body: string;
  isRead: boolean;
  createdAt: string;
};

export type Conversation = {
  id: string;
  clientUserId: string | null;
  guestId: string | null;
  reservationId: string | null;
  subject: string;
  status: ConversationStatus;
  adminReadAt: string | null;
  clientReadAt: string | null;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
};

export type ConversationSummary = Conversation & {
  clientName: string;
  clientEmail: string | null;
  clientPhone: string | null;
  reservationNumber: string | null;
  roomName: string | null;
  checkIn: string | null;
  checkOut: string | null;
  total: number | null;
  latestMessage: ConversationMessage | null;
  unreadAdminCount: number;
  unreadClientCount: number;
};

export type CreateConversationInput = {
  clientUserId?: string | null;
  guestId?: string | null;
  reservationId?: string | null;
  subject: string;
};

export type SendMessageInput = {
  conversationId: string;
  body: string;
  senderRole: MessageSenderType;
};

export type ConversationMessageRealtimeEvent = RealtimePostgresChangesPayload<MessageRow>;

export async function listClientReservations(): Promise<ClientReservation[]> {
  const context = await requireClientContext();
  if (!context.profile?.active) return [];

  return fetchHotelReservations(context.user.id);
}

/** Whether the signed-in client has at least one Appart-Hôtel reservation that is
 * pending, confirmed or checked in — the gate for contacting the administration. */
export async function clientHasMessagingAccess(): Promise<boolean> {
  const reservations = await listClientReservations();
  return reservations.some((reservation) =>
    ACTIVE_RESERVATION_STATUSES.includes(reservation.status),
  );
}

export const CLIENT_MESSAGING_LOCKED_REASON =
  "Vous devez avoir une réservation Appart-Hôtel avant de contacter l'administration.";

export async function listClientConversations(): Promise<ConversationSummary[]> {
  const context = await requireClientContext();
  const supabase = await requireMessagingSupabase();
  const client = profileFromClient(context.profile);
  const admins = await fetchAdminProfiles();
  if (admins.length === 0) return [];

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(`sender_id.eq.${client.id},receiver_id.eq.${client.id}`)
    .order("created_at", { ascending: true })
    .limit(1000);

  if (error) throw mapSupabaseError(error);

  const messages = data ?? [];
  const adminIdsWithMessages = unique(
    messages
      .map((message) => {
        if (message.sender_id === client.id) return message.receiver_id;
        if (message.receiver_id === client.id) return message.sender_id;
        return "";
      })
      .filter((id) => admins.some((admin) => admin.id === id)),
  );
  const adminIds = adminIdsWithMessages.length > 0 ? adminIdsWithMessages : [admins[0].id];

  return adminIds
    .map((adminId) => {
      const admin = admins.find((item) => item.id === adminId);
      if (!admin) return null;
      const ownMessages = messages
        .filter((message) => isPairMessage(message, client.id, admin.id))
        .map((message) => mapMessage(message, client, admin));
      const latestMessage = ownMessages[ownMessages.length - 1] ?? null;
      return makeConversationSummary({
        id: admin.id,
        subject: "Reception Marina",
        client,
        other: admin,
        latestMessage,
        messages: ownMessages,
        perspective: "client",
      });
    })
    .filter((value): value is ConversationSummary => Boolean(value))
    .sort(compareConversationSummaries);
}

export async function listAdminConversations(): Promise<ConversationSummary[]> {
  const admin = await requireAdminContext();
  const supabase = await requireMessagingSupabase();
  const [allClients, admins] = await Promise.all([fetchClientProfiles(), fetchAdminProfiles()]);
  if (allClients.length === 0) return [];

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(3000);

  if (error) throw mapSupabaseError(error);

  const adminIds = new Set(admins.map((item) => item.id));
  const messages = (data ?? []).filter(
    (message) =>
      (adminIds.has(message.sender_id) &&
        allClients.some((client) => client.id === message.receiver_id)) ||
      (adminIds.has(message.receiver_id) &&
        allClients.some((client) => client.id === message.sender_id)),
  );

  // Admin only sees clients who have (or had) a reservation — plus anyone with
  // existing message history, so a past conversation never disappears.
  const clientIdsWithMessages = new Set(
    messages
      .flatMap((message) => [message.sender_id, message.receiver_id])
      .filter((id) => !adminIds.has(id)),
  );
  const clientIdsWithReservation = await fetchClientIdsWithReservation(
    allClients.map((client) => client.id),
  );
  const clients = allClients.filter(
    (client) => clientIdsWithReservation.has(client.id) || clientIdsWithMessages.has(client.id),
  );

  return clients
    .map((client) => {
      const ownMessages = messages
        .filter(
          (message) =>
            (message.sender_id === client.id && adminIds.has(message.receiver_id)) ||
            (message.receiver_id === client.id && adminIds.has(message.sender_id)),
        )
        .map((message) => mapMessage(message, client, admin));
      const latestMessage = ownMessages[ownMessages.length - 1] ?? null;

      return makeConversationSummary({
        id: client.id,
        subject: "Conversation client",
        client,
        other: admin,
        latestMessage,
        messages: ownMessages,
        perspective: "admin",
      });
    })
    .sort(compareConversationSummaries);
}

export async function getMessages(conversationId: string): Promise<ConversationMessage[]> {
  const current = await requireCurrentProfile();
  const supabase = await requireMessagingSupabase();

  if (isAdminRole(current.role)) {
    const admins = await fetchAdminProfiles();
    const adminIds = new Set(admins.map((admin) => admin.id));
    const client = await fetchProfileById(conversationId);
    if (!client || client.role !== "client") return [];

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${client.id},receiver_id.eq.${client.id}`)
      .order("created_at", { ascending: true });

    if (error) throw mapSupabaseError(error);
    return (data ?? [])
      .filter(
        (message) =>
          (message.sender_id === client.id && adminIds.has(message.receiver_id)) ||
          (message.receiver_id === client.id && adminIds.has(message.sender_id)),
      )
      .map((message) => mapMessage(message, client, current));
  }

  const other = await fetchProfileById(conversationId);
  if (!other || !isAdminRole(other.role)) return [];

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(
      `and(sender_id.eq.${current.id},receiver_id.eq.${other.id}),and(sender_id.eq.${other.id},receiver_id.eq.${current.id})`,
    )
    .order("created_at", { ascending: true });

  if (error) throw mapSupabaseError(error);
  return (data ?? []).map((message) => mapMessage(message, current, other));
}

export async function createConversation(input: CreateConversationInput): Promise<Conversation> {
  const current = await requireCurrentProfile();

  if (current.role === "client") {
    if (!(await clientHasMessagingAccess())) throw new Error(CLIENT_MESSAGING_LOCKED_REASON);

    const admins = await fetchAdminProfiles();
    const admin = admins[0];
    if (!admin) throw new Error("Aucun compte admin disponible.");
    return makeConversation(admin.id, input.subject || "Reception Marina");
  }

  if (input.clientUserId) {
    const client = await fetchProfileById(input.clientUserId);
    if (client?.role === "client") return makeConversation(client.id, input.subject);
  }

  throw new Error("Client introuvable.");
}

export async function createConversationForClientReservation(_reservation?: ClientReservation) {
  return createConversation({ subject: "Question reservation" });
}

export async function createConversationForAdminReservation(reservation: Reservation) {
  const profile = await findClientProfileForGuest(reservation.guest.id, reservation.guest.email);
  if (!profile) {
    throw new Error("Aucun compte client n'est lie a cette reservation.");
  }

  return {
    conversation: makeConversation(profile.userId, reservation.reservationNumber),
    linkedClientProfile: profile,
  };
}

export async function sendMessage(input: SendMessageInput): Promise<ConversationMessage> {
  const body = input.body.trim();
  if (!body) throw new Error("Message requis.");

  const current = await requireCurrentProfile();
  if (current.role === "client" && !(await clientHasMessagingAccess())) {
    throw new Error(CLIENT_MESSAGING_LOCKED_REASON);
  }

  const supabase = await requireMessagingSupabase();
  const receiver = await resolveReceiver(current, input.conversationId);

  const { data, error } = await supabase
    .from("messages")
    .insert({
      sender_id: current.id,
      receiver_id: receiver.id,
      body,
      is_read: false,
    })
    .select("*")
    .single();

  if (error) throw mapSupabaseError(error);
  return mapMessage(data, current, receiver);
}

export async function markConversationRead(
  conversationId: string,
  _readerRole?: MessageSenderType,
) {
  if (!conversationId) return;

  const current = await requireCurrentProfile();
  const supabase = await requireMessagingSupabase();

  try {
    if (isAdminRole(current.role)) {
      await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("sender_id", conversationId)
        .eq("is_read", false);

      await supabase
        .from("reservation_messages")
        .update({ is_read: true })
        .eq("is_read", false);
    } else {
      await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("receiver_id", current.id)
        .eq("is_read", false);

      await supabase
        .from("reservation_messages")
        .update({ is_read: true })
        .eq("is_read", false);
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("messages_marked_read", { detail: { conversationId } }));
    }
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn("[markConversationRead] failed to update read status", err);
    }
  }
}

export async function updateConversationStatus(
  conversationId: string,
  _status?: ConversationStatus,
) {
  return makeConversation(conversationId, "Conversation client");
}

export async function getUnreadAdminConversationCount() {
  const conversations = await listAdminConversations();
  return conversations.filter((conversation) => conversation.unreadAdminCount > 0).length;
}

export async function getUnreadClientConversationCount() {
  const conversations = await listClientConversations();
  return conversations.filter((conversation) => conversation.unreadClientCount > 0).length;
}

export async function findClientProfileForGuest(_guestId?: string | null, email?: string | null) {
  const normalizedEmail = email?.trim().toLowerCase();
  if (!normalizedEmail) return null;

  const supabase = await requireMessagingSupabase();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "client")
    .ilike("email", normalizedEmail)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw mapSupabaseError(error);
  return data ? mapClientProfileRow(data) : null;
}

export async function linkClientProfileForReservationGuest(guest: Guest) {
  return findClientProfileForGuest(guest.id, guest.email);
}

export async function subscribeToConversationMessages(
  onEvent: (event: ConversationMessageRealtimeEvent) => void,
) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return null;

  const channelName = `direct-messages-${Math.random().toString(36).slice(2, 9)}`;
  const channel = supabase
    .channel(channelName)
    .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, (payload) =>
      onEvent(payload as ConversationMessageRealtimeEvent),
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}

async function fetchHotelReservations(clientId: string) {
  const supabase = await requireMessagingSupabase();
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("guest_id", clientId)
    .order("check_in", { ascending: true });

  if (error) throw mapSupabaseError(error);

  const reservations = data ?? [];
  const roomIds = unique(reservations.map((reservation) => reservation.room_type_id));
  const rooms = await fetchRoomsByIds(roomIds);
  return reservations.map((reservation) => mapClientReservation(reservation, rooms));
}

async function fetchRoomsByIds(ids: string[]) {
  if (ids.length === 0) return [] as RoomRow[];
  const supabase = await requireMessagingSupabase();
  const { data, error } = await supabase.from("room_types").select("id, name").in("id", ids);
  if (error) throw mapSupabaseError(error);
  return data ?? [];
}

async function fetchClientIdsWithReservation(clientIds: string[]) {
  if (clientIds.length === 0) return new Set<string>();

  const supabase = await requireMessagingSupabase();
  const { data, error } = await supabase
    .from("reservations")
    .select("guest_id")
    .in("guest_id", clientIds);

  if (error) throw mapSupabaseError(error);
  return new Set((data ?? []).map((row) => row.guest_id));
}

async function fetchAdminProfiles() {
  const supabase = await requireMessagingSupabase();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .in("role", ["owner", "admin"])
    .order("role", { ascending: false })
    .order("created_at", { ascending: true });

  if (error) throw mapSupabaseError(error);
  return (data ?? []).map(mapUserProfileRow);
}

async function fetchClientProfiles() {
  const supabase = await requireMessagingSupabase();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "client")
    .order("full_name", { ascending: true });

  if (error) throw mapSupabaseError(error);
  return (data ?? []).map(mapUserProfileRow);
}

async function fetchProfileById(id: string) {
  const supabase = await requireMessagingSupabase();
  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).maybeSingle();
  if (error) throw mapSupabaseError(error);
  return data ? mapUserProfileRow(data) : null;
}

async function resolveReceiver(current: UserProfile, conversationId: string) {
  if (isAdminRole(current.role)) {
    const client = await fetchProfileById(conversationId);
    if (!client || client.role !== "client") throw new Error("Client introuvable.");
    return client;
  }

  const requested = await fetchProfileById(conversationId);
  if (requested && isAdminRole(requested.role)) return requested;

  const admins = await fetchAdminProfiles();
  const admin = admins[0];
  if (!admin) throw new Error("Aucun compte admin disponible.");
  return admin;
}

async function requireMessagingSupabase() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) throw new Error("Supabase n'est pas configure.");
  return supabase;
}

async function requireClientContext() {
  const context = await getClientSessionProfile();
  if (!context) throw new Error("Session client requise.");
  return context;
}

async function requireAdminContext() {
  const admin = await getCurrentAdminProfile();
  if (!admin?.active) throw new Error("Compte admin requis.");
  return profileFromAdmin(admin);
}

async function requireCurrentProfile() {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Session requise.");
  return profile;
}

function makeConversation(id: string, subject: string): Conversation {
  const now = new Date().toISOString();
  return {
    id,
    clientUserId: id,
    guestId: null,
    reservationId: null,
    subject: subject || "Conversation",
    status: "open",
    adminReadAt: null,
    clientReadAt: null,
    lastMessageAt: now,
    createdAt: now,
    updatedAt: now,
  };
}

function makeConversationSummary({
  id,
  subject,
  client,
  other,
  latestMessage,
  messages,
  perspective,
}: {
  id: string;
  subject: string;
  client: UserProfile;
  other: UserProfile;
  latestMessage: ConversationMessage | null;
  messages: ConversationMessage[];
  perspective: "admin" | "client";
}): ConversationSummary {
  const now = new Date().toISOString();
  const lastMessageAt = latestMessage?.createdAt ?? client.createdAt ?? now;
  const unreadAdminCount = messages.filter(
    (message) => message.senderRole === "client" && !message.isRead,
  ).length;
  const unreadClientCount = messages.filter(
    (message) => message.senderRole === "admin" && !message.isRead,
  ).length;

  return {
    id,
    clientUserId: client.id,
    guestId: null,
    reservationId: null,
    subject,
    status: "open",
    adminReadAt: null,
    clientReadAt: null,
    lastMessageAt,
    createdAt: lastMessageAt,
    updatedAt: lastMessageAt,
    clientName: perspective === "admin" ? client.fullName : other.fullName,
    clientEmail: perspective === "admin" ? client.email : other.email,
    clientPhone: null,
    reservationNumber: null,
    roomName: null,
    checkIn: null,
    checkOut: null,
    total: null,
    latestMessage,
    unreadAdminCount,
    unreadClientCount,
  };
}

function mapMessage(row: MessageRow, first: UserProfile, second: UserProfile): ConversationMessage {
  const sender =
    row.sender_id === first.id ? first : row.sender_id === second.id ? second : undefined;
  const receiver =
    row.receiver_id === first.id ? first : row.receiver_id === second.id ? second : undefined;
  // Fall back to elimination (via the resolved receiver) before guessing —
  // only defaults to "admin" if the row matches neither known participant.
  const resolvedSender =
    sender ?? (receiver === first ? second : receiver === second ? first : undefined);
  const senderRole: MessageSenderType = resolvedSender?.role === "client" ? "client" : "admin";
  const conversationId = senderRole === "client" ? row.sender_id : row.receiver_id;

  return {
    id: row.id,
    conversationId,
    senderRole,
    senderUserId: row.sender_id,
    senderId: row.sender_id,
    receiverId: row.receiver_id,
    body: row.body,
    isRead: row.is_read,
    createdAt: row.created_at,
  };
}

function mapUserProfileRow(row: ProfileRow): UserProfile {
  return {
    id: row.id,
    userId: row.id,
    fullName: row.full_name ?? row.email ?? "Utilisateur",
    name: row.full_name ?? row.email ?? "Utilisateur",
    email: row.email ?? "",
    role: row.role,
    active: true,
    createdAt: row.created_at,
  };
}

function mapClientProfileRow(row: ProfileRow): ClientProfile {
  return {
    id: row.id,
    userId: row.id,
    guestId: null,
    email: row.email ?? "",
    fullName: row.full_name ?? row.email ?? "Client",
    phone: null,
    active: true,
    createdAt: row.created_at,
    updatedAt: row.created_at,
  };
}

function profileFromClient(profile: ClientProfile): UserProfile {
  return {
    id: profile.id,
    userId: profile.userId,
    fullName: profile.fullName,
    name: profile.fullName,
    email: profile.email,
    role: "client",
    active: true,
    createdAt: profile.createdAt,
  };
}

function profileFromAdmin(
  profile: Awaited<ReturnType<typeof getCurrentAdminProfile>>,
): UserProfile {
  if (!profile) throw new Error("Compte admin requis.");
  return {
    id: profile.id,
    userId: profile.userId,
    fullName: profile.name,
    name: profile.name,
    email: profile.email,
    role: profile.role,
    active: true,
    createdAt: new Date().toISOString(),
  };
}

function mapClientReservation(row: ReservationRow, rooms: RoomRow[]): ClientReservation {
  return {
    id: row.id,
    reservationNumber: row.reservation_number,
    roomTypeId: row.room_type_id,
    roomName: rooms.find((room) => room.id === row.room_type_id)?.name ?? "Chambre",
    guestId: row.guest_id,
    checkIn: row.check_in,
    checkOut: row.check_out,
    status: row.status,
    paymentStatus: row.payment_status,
    total: row.total,
    adults: row.adults,
    children: row.children,
  };
}

function isPairMessage(message: MessageRow, firstId: string, secondId: string) {
  return (
    (message.sender_id === firstId && message.receiver_id === secondId) ||
    (message.sender_id === secondId && message.receiver_id === firstId)
  );
}

function compareConversationSummaries(a: ConversationSummary, b: ConversationSummary) {
  const byDate = b.lastMessageAt.localeCompare(a.lastMessageAt);
  if (byDate !== 0) return byDate;
  return a.clientName.localeCompare(b.clientName);
}

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}
