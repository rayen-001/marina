import type {
  ChannelConnection,
  ChannelSource,
  Guest,
  HotelSettings,
  Invoice,
  Payment,
  PaymentMethod,
  PaymentStatus,
  Reservation,
  ReservationStatus,
  Room,
  RoomStatus,
} from "@/data/hotel";

export type {
  ChannelConnection,
  ChannelSource,
  Guest,
  HotelSettings,
  Invoice,
  Payment,
  PaymentMethod,
  PaymentStatus,
  Reservation,
  ReservationStatus,
  RoomStatus,
};

export type RoomType = Room;

export type RoomUnit = {
  id: string;
  roomTypeId: string;
  unitNumber: string;
  floor?: string;
  status: "available" | "occupied" | "maintenance" | "cleaning_required" | "inactive";
};

export type InvoiceItem = {
  id: string;
  invoiceId: string;
  label: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export type ChannelRoomMapping = {
  id: string;
  roomTypeId: string;
  channel: Exclude<ChannelSource, "direct" | "phone" | "walk_in">;
  externalListingId: string;
  syncStatus: "synced" | "warning" | "error" | "not_mapped";
};

export type AutomationAlert = {
  id: string;
  type:
    | "payment_pending"
    | "arrival_today"
    | "departure_today"
    | "overbooking_risk"
    | "maintenance_room"
    | "channel_sync_error"
    | "invoice_not_generated";
  severity: "info" | "warning" | "critical";
  title: string;
  description: string;
  reservationId?: string;
  roomTypeId?: string;
  createdAt: string;
};

export type RevenueStats = {
  month: string;
  revenue: number;
  adr: number;
  revpar: number;
  unpaidAmount: number;
};

export type OccupancyStats = {
  date: string;
  occupiedUnits: number;
  availableUnits: number;
  occupancyRate: number;
};

export type AdminRole =
  | "owner"
  | "manager"
  | "receptionist"
  | "accountant"
  | "housekeeping"
  | "port_captain";
