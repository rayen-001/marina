import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, ExternalLink, RefreshCw } from "lucide-react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { StatusBadge } from "@/components/admin/status-badge";
import { channelConnections, channelLabels, type ChannelConnection } from "@/data/hotel";
import { listRoomTypes } from "@/lib/services/roomService";
import { getSupabaseOrNull, warnSupabaseFallback } from "@/lib/supabase/serviceHelpers";
import type { Tables } from "@/lib/supabase/types";
import type { ChannelRoomMapping, RoomType } from "@/lib/types/hotel";
import * as airbnb from "@/lib/channels/airbnbAdapter";
import * as bookingCom from "@/lib/channels/bookingComAdapter";
import * as expedia from "@/lib/channels/expediaAdapter";

export const Route = createFileRoute("/admin/channels")({
  head: () => ({
    meta: [{ title: "Channels - Marina Cap Monastir" }],
  }),
  loader: loadChannelPageData,
  component: AdminChannels,
});

type SyncLogRow = Tables<"sync_logs">;
type ChannelConnectionRow = Tables<"channel_connections">;
type ChannelRoomMappingRow = Tables<"channel_room_mappings">;
type ChannelLog = {
  channel: string;
  level: string;
  message: string;
};

function AdminChannels() {
  const { connections, mappings, roomOptions, logs, usingMockLogs } = Route.useLoaderData();

  return (
    <AdminLayout
      title="Channel manager"
      description="Prototype professionnel pour Booking.com, Airbnb et Expedia. Aucun appel API réel n'est effectué."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {connections
          .filter((channel) => ["booking_com", "airbnb", "expedia"].includes(channel.id))
          .map((channel) => (
            <article
              key={channel.id}
              className="rounded-lg border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-primary">{channel.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Commission: {channel.commissionRate ?? 0}% · Sync:{" "}
                    {channel.lastSync ?? "jamais"}
                  </p>
                </div>
                <StatusBadge kind="channel" value={channel.status} />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                <Metric label="Importées" value={channel.importedReservationsCount ?? 0} />
                <Metric label="Dispos" value={channel.pushedAvailabilityCount ?? 0} />
                <Metric label="Prix" value={channel.pushedPricesCount ?? 0} />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary"
                >
                  <RefreshCw className="size-4" />
                  Sync now
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary"
                >
                  <ExternalLink className="size-4" />
                  Configurer
                </button>
              </div>
              <div className="mt-4 space-y-2">
                {(channel.errors ?? []).map((error) => (
                  <Notice key={error} tone="error" text={error} />
                ))}
                {(channel.warnings ?? []).map((warning) => (
                  <Notice key={warning} tone="warning" text={warning} />
                ))}
              </div>
            </article>
          ))}
      </div>

      <section className="mt-6 rounded-lg border border-border bg-card shadow-sm">
        <div className="border-b border-border p-5">
          <h2 className="text-lg font-bold text-primary">Mapping chambres / listings</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Chaque type local peut être relié à un identifiant externe par canal.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Type local</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">Listing ID</th>
                <th className="px-4 py-3">Statut sync</th>
              </tr>
            </thead>
            <tbody>
              {mappings.map((mapping) => {
                const room = roomOptions.find((item) => item.id === mapping.roomTypeId);
                return (
                  <tr key={mapping.id} className="border-t border-border">
                    <td className="px-4 py-3 font-semibold text-primary">{room?.name}</td>
                    <td className="px-4 py-3">{mapping.channel}</td>
                    <td className="px-4 py-3 text-muted-foreground">{mapping.externalListingId}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-md px-2.5 py-1 text-xs font-semibold ${mapping.syncStatus === "synced" ? "bg-emerald-50 text-emerald-800" : mapping.syncStatus === "warning" ? "bg-amber-50 text-amber-800" : "bg-secondary text-muted-foreground"}`}
                      >
                        {mapping.syncStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card p-5 shadow-sm">
        <h2 className="text-lg font-bold text-primary">
          {usingMockLogs ? "Logs adaptateurs mock" : "Logs synchronisation"}
        </h2>
        <div className="mt-4 space-y-2">
          {logs.map((log, index) => (
            <div key={index} className="rounded-md border border-border bg-background p-3 text-sm">
              <span className="font-semibold text-primary">{log.channel}</span> · {log.level}:{" "}
              {log.message}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          TODO: une synchronisation réelle exige identifiants officiels, accès partenaire, OAuth/API
          keys, webhooks, limites de débit, retry logic, Booking.com Connectivity API, Airbnb
          official/partner API et Expedia Rapid / Partner Central API.
        </p>
      </section>
    </AdminLayout>
  );
}

async function loadChannelPageData() {
  const roomItems = await listRoomTypes();
  const roomOptions = roomItems.map(({ id, name }) => ({ id, name }));
  const fallbackData = {
    connections: channelConnections,
    mappings: buildMockMappings(roomItems),
    roomOptions,
    logs: getMockAdapterLogs(),
    usingMockLogs: true,
  };

  const supabase = await getSupabaseOrNull();
  if (!supabase) return fallbackData;

  try {
    const [connectionsResult, mappingsResult, logsResult] = await Promise.all([
      supabase.from("channel_connections").select("*").order("channel"),
      supabase.from("channel_room_mappings").select("*").order("channel"),
      supabase.from("sync_logs").select("*").order("started_at", { ascending: false }).limit(20),
    ]);

    if (connectionsResult.error) throw connectionsResult.error;
    if (mappingsResult.error) throw mappingsResult.error;
    if (logsResult.error) throw logsResult.error;

    return {
      connections: connectionsResult.data?.length
        ? connectionsResult.data.map(mapChannelConnection)
        : channelConnections,
      mappings: mappingsResult.data?.length
        ? mappingsResult.data.map(mapChannelRoomMapping)
        : buildMockMappings(roomItems),
      roomOptions,
      logs: logsResult.data?.length ? logsResult.data.map(mapSyncLog) : getMockAdapterLogs(),
      usingMockLogs: !logsResult.data?.length,
    };
  } catch (error) {
    warnSupabaseFallback("channel data query", error);
    return fallbackData;
  }
}

function mapChannelConnection(row: ChannelConnectionRow): ChannelConnection {
  return {
    id: row.channel,
    name: row.name ?? channelLabels[row.channel] ?? row.channel,
    status: row.status,
    lastSync: row.last_sync ? row.last_sync.slice(0, 10) : undefined,
    commissionRate: row.commission_rate ?? undefined,
    importedReservationsCount: row.imported_reservations_count,
    pushedAvailabilityCount: row.pushed_availability_count,
    pushedPricesCount: row.pushed_prices_count,
    errors: row.errors ?? undefined,
    warnings: row.warnings ?? undefined,
  };
}

function mapChannelRoomMapping(row: ChannelRoomMappingRow): ChannelRoomMapping {
  return {
    id: row.id,
    roomTypeId: row.room_type_id,
    channel: row.channel,
    externalListingId: row.external_listing_id,
    syncStatus: row.sync_status,
  };
}

function mapSyncLog(row: SyncLogRow): ChannelLog {
  return {
    channel: channelLabels[row.channel] ?? row.channel,
    level: row.status,
    message: row.message ?? `${row.direction} ${row.status}`,
  };
}

function buildMockMappings(roomItems: RoomType[]): ChannelRoomMapping[] {
  return roomItems.flatMap((room) => [
    {
      id: `booking-${room.id}`,
      roomTypeId: room.id,
      channel: "booking_com",
      externalListingId: `BC-${room.id.toUpperCase()}`,
      syncStatus: "synced",
    },
    {
      id: `airbnb-${room.id}`,
      roomTypeId: room.id,
      channel: "airbnb",
      externalListingId: "-",
      syncStatus: "not_mapped",
    },
    {
      id: `expedia-${room.id}`,
      roomTypeId: room.id,
      channel: "expedia",
      externalListingId: `EXP-${room.id.slice(0, 8)}`,
      syncStatus: "warning",
    },
  ]);
}

function getMockAdapterLogs(): ChannelLog[] {
  return [
    ...bookingCom.getSyncLogsMock().map((log) => ({ channel: "Booking.com", ...log })),
    ...airbnb.getSyncLogsMock().map((log) => ({ channel: "Airbnb", ...log })),
    ...expedia.getSyncLogsMock().map((log) => ({ channel: "Expedia", ...log })),
  ];
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md bg-secondary p-3">
      <div className="text-xl font-bold text-primary">{value}</div>
      <div className="mt-1 text-muted-foreground">{label}</div>
    </div>
  );
}

function Notice({ tone, text }: { tone: "warning" | "error"; text: string }) {
  return (
    <div
      className={`flex items-start gap-2 rounded-md p-3 text-xs font-medium ${tone === "error" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-800"}`}
    >
      {tone === "error" ? (
        <AlertTriangle className="mt-0.5 size-4" />
      ) : (
        <CheckCircle2 className="mt-0.5 size-4" />
      )}
      {text}
    </div>
  );
}
