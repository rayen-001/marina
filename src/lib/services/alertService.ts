import { createHotelOperationAlerts } from "@/lib/automation/alertsAutomation";
import type { AutomationAlert } from "@/lib/types/hotel";
import { getSupabaseOrNull, warnSupabaseFallback } from "@/lib/supabase/serviceHelpers";
import type { Tables } from "@/lib/supabase/types";
import { getTodayIso } from "./statisticsService";

type AutomationAlertRow = Tables<"automation_alerts">;

export async function listAutomationAlerts(today = getTodayIso()) {
  const fallbackAlerts = createHotelOperationAlerts(today);
  const supabase = await getSupabaseOrNull();
  if (!supabase) return fallbackAlerts;

  try {
    const { data, error } = await supabase
      .from("automation_alerts")
      .select("*")
      .eq("is_resolved", false)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw error;
    if (!data?.length) return fallbackAlerts;

    return data.map(mapAutomationAlertFromDb);
  } catch (error) {
    warnSupabaseFallback("automation alert query", error);
    return fallbackAlerts;
  }
}

function mapAutomationAlertFromDb(row: AutomationAlertRow): AutomationAlert {
  return {
    id: row.id,
    type: row.type,
    severity: row.severity,
    title: row.title,
    description: row.description,
    reservationId: row.reservation_id ?? undefined,
    roomTypeId: row.room_type_id ?? undefined,
    createdAt: row.created_at,
  };
}
