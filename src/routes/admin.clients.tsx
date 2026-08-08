import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle, RefreshCw, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { adminButtonClasses } from "@/components/admin/AdminButton";
import { CreateClientAccountButton } from "@/components/admin/CreateClientAccountButton";
import { listAdminConversations, type ConversationSummary } from "@/lib/services/messageService";
import { getSupabaseOrNull } from "@/lib/supabase/serviceHelpers";
import type { Tables } from "@/lib/supabase/types";

type ClientRow = Tables<"profiles">;

export const Route = createFileRoute("/admin/clients")({
  head: () => ({
    meta: [{ title: "Clients - Marina Cap Monastir" }],
  }),
  component: AdminClients,
});

function AdminClients() {
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const supabase = await getSupabaseOrNull();
      if (!supabase) throw new Error("Supabase n'est pas configure.");

      const [{ data, error: clientsError }, nextConversations] = await Promise.all([
        supabase
          .from("profiles")
          .select("*")
          .eq("role", "client")
          .order("full_name", { ascending: true }),
        listAdminConversations(),
      ]);

      if (clientsError) throw clientsError;
      setClients(data ?? []);
      setConversations(nextConversations);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Clients indisponibles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const conversationMap = useMemo(
    () => new Map(conversations.map((conversation) => [conversation.id, conversation])),
    [conversations],
  );
  const filteredClients = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return clients;
    return clients.filter((client) =>
      `${client.full_name ?? ""} ${client.email ?? ""}`.toLowerCase().includes(needle),
    );
  }, [clients, query]);

  return (
    <AdminLayout
      title="Clients"
      description="Comptes clients Supabase Auth avec profil client et accès messagerie."
      actions={<CreateClientAccountButton onCreated={load} />}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <label className="relative min-w-0 flex-1 md:max-w-md">
          <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un client..."
            className="admin-input pl-9"
          />
        </label>
        <button type="button" onClick={load} className={adminButtonClasses("outline", "md")}>
          <RefreshCw className="size-4" />
          Actualiser
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
          {error}
        </div>
      )}

      <section className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)]">
        {loading ? (
          <div className="p-5">
            <div className="skeleton-block h-14 w-full" />
            <div className="skeleton-block mt-3 h-14 w-full" />
            <div className="skeleton-block mt-3 h-14 w-full" />
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="empty-state m-5">
            <UserRound className="mx-auto mb-3 size-8 text-accent" />
            <div className="text-lg font-black text-primary">Aucun client</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Les comptes clients créés depuis l'administration apparaîtront ici.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-secondary/70 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Créé le</th>
                  <th className="px-4 py-3">Non lus</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => {
                  const conversation = conversationMap.get(client.id);
                  return (
                    <tr key={client.id} className="border-t border-border">
                      <td className="px-4 py-3 font-black text-primary">
                        {client.full_name ?? "Client"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-2 text-muted-foreground">
                          <Mail className="size-4" />
                          {client.email ?? "-"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDate(client.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        {conversation?.unreadAdminCount ? (
                          <span className="rounded-full bg-destructive px-2.5 py-1 text-xs font-black text-white">
                            {conversation.unreadAdminCount}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to="/admin/messages"
                          search={{ conversation: client.id }}
                          className={adminButtonClasses("outline", "sm")}
                        >
                          <MessageCircle className="size-4" />
                          Messages
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdminLayout>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
