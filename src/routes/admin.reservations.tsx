import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ConciergeBell } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminActionBar } from "@/components/admin/AdminActionBar";
import { AdminNewReservationButton } from "@/components/admin/AdminNewReservationModal";
import { ReservationsTable } from "@/components/admin/reservations-table";
import { AdminLayout } from "@/components/admin/admin-layout";
import { listPayments } from "@/lib/services/paymentService";
import { listReservations } from "@/lib/services/reservationService";
import { listRoomTypes } from "@/lib/services/roomService";

export const Route = createFileRoute("/admin/reservations")({
  head: () => ({
    meta: [{ title: "Réservations - Marina Cap Monastir" }],
  }),
  loader: async () => {
    await Promise.all([listRoomTypes(), listReservations(), listPayments()]);
    return null;
  },
  component: AdminReservations,
});

function AdminReservations() {
  const router = useRouter();
  const [notif, setNotif] = useState<string | null>(null);

  useEffect(() => {
    if (!notif) return;
    const t = window.setTimeout(() => setNotif(null), 3500);
    return () => clearTimeout(t);
  }, [notif]);

  return (
    <AdminLayout
      title="Réservations"
      description="Filtrez par date, chambre, statut, paiement et source, puis lancez les actions de check-in ou check-out."
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <AdminNewReservationButton variant="primary" onCreated={() => router.invalidate()} />
          <AdminActionBar
            actions={[
              {
                label: "Réception",
                icon: <ConciergeBell className="size-4" />,
                variant: "outline",
                onClick: () => setNotif("Vue réception bientôt disponible."),
              },
            ]}
          />
        </div>
      }
    >
      {notif && (
        <div
          role="status"
          className="mb-4 flex items-center gap-3 rounded-md border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-primary"
        >
          <span className="flex-1">{notif}</span>
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setNotif(null)}
            className="rounded-sm text-primary/50 transition hover:text-primary"
          >
            ✕
          </button>
        </div>
      )}
      <ReservationsTable />
    </AdminLayout>
  );
}
