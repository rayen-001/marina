export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type CurrencyCode = "TND" | "EUR";
export type RoomTypeName = "Studio" | "Appartement" | "Suite" | "Chambre";
export type RoomStatus = "active" | "inactive" | "maintenance" | "occupied" | "cleaning_required";
export type UnitStatus =
  | "available"
  | "occupied"
  | "maintenance"
  | "cleaning_required"
  | "inactive";
export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "checked_in"
  | "checked_out"
  | "cancelled"
  | "no_show";
export type PaymentStatus = "unpaid" | "deposit_paid" | "paid" | "refunded";
export type PaymentMethod =
  | "cash"
  | "card"
  | "bank_transfer"
  | "online"
  | "booking_com_payout"
  | "airbnb_payout"
  | "expedia_payout";
export type ChannelSource =
  | "admin"
  | "direct"
  | "booking_com"
  | "airbnb"
  | "expedia"
  | "phone"
  | "walk_in";
export type ChannelStatus = "connected" | "not_connected";
export type InvoiceStatus = "draft" | "issued" | "paid" | "void";
export type AdminRole =
  | "owner"
  | "manager"
  | "receptionist"
  | "accountant"
  | "housekeeping"
  | "port_captain";
export type ChannelSyncStatus = "synced" | "warning" | "error" | "not_mapped";
export type SyncDirection = "pull" | "push";
export type SyncStatus = "pending" | "success" | "warning" | "error";
export type AutomationAlertType =
  | "payment_pending"
  | "arrival_today"
  | "departure_today"
  | "overbooking_risk"
  | "maintenance_room"
  | "channel_sync_error"
  | "invoice_not_generated";
export type AlertSeverity = "info" | "warning" | "critical";
export type BerthStatus = "available" | "occupied" | "maintenance" | "inactive";
export type BoatStayStatus = "expected" | "checked_in" | "checked_out" | "cancelled";
export type PortServiceStatus = "pending" | "completed" | "cancelled";
export type RoomDateAvailabilityStatus =
  | "available"
  | "partially_reserved"
  | "reserved"
  | "maintenance"
  | "closed";
export type RoomRateCalendarStatus = RoomDateAvailabilityStatus | "not_available";
export type RoomRateInventoryMode = "auto" | "all" | "quantity" | "specific_units" | "closed";
export type ConversationStatus = "open" | "closed";
export type MessageSenderType = "admin" | "client";
export type ProfileRole = "admin" | "owner" | "client" | "capitainerie";

export type Database = {
  public: {
    Tables: {
      hotel_settings: {
        Row: {
          id: string;
          hotel_name: string;
          logo_url: string | null;
          hero_url: string | null;
          phone: string;
          fax: string | null;
          email: string;
          marketing_email: string | null;
          capitainerie_email: string | null;
          capitainerie_phones: string[] | null;
          address: string;
          tax_registration: string;
          invoice_prefix: string;
          default_currency: CurrencyCode;
          check_in_time: string;
          check_out_time: string;
          tax_rate: number;
          deposit_percentage: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          hotel_name: string;
          logo_url?: string | null;
          hero_url?: string | null;
          phone: string;
          fax?: string | null;
          email: string;
          marketing_email?: string | null;
          capitainerie_email?: string | null;
          capitainerie_phones?: string[] | null;
          address: string;
          tax_registration: string;
          invoice_prefix?: string;
          default_currency?: CurrencyCode;
          check_in_time?: string;
          check_out_time?: string;
          tax_rate?: number;
          deposit_percentage?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          hotel_name?: string;
          logo_url?: string | null;
          hero_url?: string | null;
          phone?: string;
          fax?: string | null;
          email?: string;
          marketing_email?: string | null;
          capitainerie_email?: string | null;
          capitainerie_phones?: string[] | null;
          address?: string;
          tax_registration?: string;
          invoice_prefix?: string;
          default_currency?: CurrencyCode;
          check_in_time?: string;
          check_out_time?: string;
          tax_rate?: number;
          deposit_percentage?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          role: ProfileRole;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          role: ProfileRole;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          role?: ProfileRole;
          created_at?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          body: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          receiver_id: string;
          body: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          sender_id?: string;
          receiver_id?: string;
          body?: string;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_sender_id_fkey";
            columns: ["sender_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_receiver_id_fkey";
            columns: ["receiver_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      room_types: {
        Row: {
          id: string;
          slug: string | null;
          name: string;
          type: RoomTypeName;
          description: string;
          price_per_night: number;
          capacity_adults: number;
          capacity_children: number;
          beds: string;
          bathrooms: number;
          total_units: number;
          status: RoomStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug?: string | null;
          name: string;
          type: RoomTypeName;
          description: string;
          price_per_night: number;
          capacity_adults?: number;
          capacity_children?: number;
          beds: string;
          bathrooms?: number;
          total_units?: number;
          status?: RoomStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string | null;
          name?: string;
          type?: RoomTypeName;
          description?: string;
          price_per_night?: number;
          capacity_adults?: number;
          capacity_children?: number;
          beds?: string;
          bathrooms?: number;
          total_units?: number;
          status?: RoomStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      room_images: {
        Row: {
          id: string;
          room_type_id: string;
          url: string;
          image_url?: string | null;
          alt_text: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          room_type_id: string;
          url: string;
          image_url?: string | null;
          alt_text?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          room_type_id?: string;
          url?: string;
          image_url?: string | null;
          alt_text?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "room_images_room_type_id_fkey";
            columns: ["room_type_id"];
            referencedRelation: "room_types";
            referencedColumns: ["id"];
          },
        ];
      };
      room_amenities: {
        Row: {
          id: string;
          room_type_id: string;
          amenity: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          room_type_id: string;
          amenity: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          room_type_id?: string;
          amenity?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "room_amenities_room_type_id_fkey";
            columns: ["room_type_id"];
            referencedRelation: "room_types";
            referencedColumns: ["id"];
          },
        ];
      };
      room_units: {
        Row: {
          id: string;
          room_type_id: string;
          unit_number: string;
          floor: string | null;
          status: UnitStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          room_type_id: string;
          unit_number: string;
          floor?: string | null;
          status?: UnitStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          room_type_id?: string;
          unit_number?: string;
          floor?: string | null;
          status?: UnitStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "room_units_room_type_id_fkey";
            columns: ["room_type_id"];
            referencedRelation: "room_types";
            referencedColumns: ["id"];
          },
        ];
      };
      guests: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          country: string;
          identity_number: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone: string;
          country: string;
          identity_number: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          country?: string;
          identity_number?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      reservations: {
        Row: {
          id: string;
          reservation_number: string;
          room_type_id: string;
          room_unit_id: string | null;
          guest_id: string;
          check_in: string;
          check_out: string;
          adults: number;
          children: number;
          status: ReservationStatus;
          payment_status: PaymentStatus;
          source: ChannelSource;
          special_requests: string | null;
          nights: number;
          room_price: number;
          taxes_and_fees: number;
          deposit: number;
          total: number;
          paid_amount: number;
          remaining_amount: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reservation_number: string;
          room_type_id: string;
          room_unit_id?: string | null;
          guest_id: string;
          check_in: string;
          check_out: string;
          adults?: number;
          children?: number;
          status?: ReservationStatus;
          payment_status?: PaymentStatus;
          source?: ChannelSource;
          special_requests?: string | null;
          nights: number;
          room_price: number;
          taxes_and_fees: number;
          deposit: number;
          total: number;
          paid_amount?: number;
          remaining_amount?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reservation_number?: string;
          room_type_id?: string;
          room_unit_id?: string | null;
          guest_id?: string;
          check_in?: string;
          check_out?: string;
          adults?: number;
          children?: number;
          status?: ReservationStatus;
          payment_status?: PaymentStatus;
          source?: ChannelSource;
          special_requests?: string | null;
          nights?: number;
          room_price?: number;
          taxes_and_fees?: number;
          deposit?: number;
          total?: number;
          paid_amount?: number;
          remaining_amount?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reservations_guest_id_fkey";
            columns: ["guest_id"];
            referencedRelation: "guests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservations_room_type_id_fkey";
            columns: ["room_type_id"];
            referencedRelation: "room_types";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservations_room_unit_id_fkey";
            columns: ["room_unit_id"];
            referencedRelation: "room_units";
            referencedColumns: ["id"];
          },
        ];
      };
      reservation_conversations: {
        Row: {
          id: string;
          owner_id: string;
          reservation_id: string;
          client_name: string;
          client_email: string | null;
          client_phone: string | null;
          status: ConversationStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          reservation_id: string;
          client_name: string;
          client_email?: string | null;
          client_phone?: string | null;
          status?: ConversationStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          reservation_id?: string;
          client_name?: string;
          client_email?: string | null;
          client_phone?: string | null;
          status?: ConversationStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reservation_conversations_reservation_id_fkey";
            columns: ["reservation_id"];
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
        ];
      };
      client_profiles: {
        Row: {
          id: string;
          user_id: string;
          guest_id: string | null;
          email: string;
          full_name: string;
          phone: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          guest_id?: string | null;
          email: string;
          full_name: string;
          phone?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          guest_id?: string | null;
          email?: string;
          full_name?: string;
          phone?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "client_profiles_guest_id_fkey";
            columns: ["guest_id"];
            referencedRelation: "guests";
            referencedColumns: ["id"];
          },
        ];
      };
      conversations: {
        Row: {
          id: string;
          client_user_id: string | null;
          guest_id: string | null;
          reservation_id: string | null;
          subject: string;
          status: ConversationStatus;
          admin_read_at: string | null;
          client_read_at: string | null;
          last_message_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_user_id?: string | null;
          guest_id?: string | null;
          reservation_id?: string | null;
          subject: string;
          status?: ConversationStatus;
          admin_read_at?: string | null;
          client_read_at?: string | null;
          last_message_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_user_id?: string | null;
          guest_id?: string | null;
          reservation_id?: string | null;
          subject?: string;
          status?: ConversationStatus;
          admin_read_at?: string | null;
          client_read_at?: string | null;
          last_message_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "conversations_guest_id_fkey";
            columns: ["guest_id"];
            referencedRelation: "guests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversations_reservation_id_fkey";
            columns: ["reservation_id"];
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
        ];
      };
      conversation_messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_role: MessageSenderType;
          sender_user_id: string | null;
          body: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_role: MessageSenderType;
          sender_user_id?: string | null;
          body: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          sender_role?: MessageSenderType;
          sender_user_id?: string | null;
          body?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "conversation_messages_conversation_id_fkey";
            columns: ["conversation_id"];
            referencedRelation: "conversations";
            referencedColumns: ["id"];
          },
        ];
      };
      reservation_messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_type: MessageSenderType;
          sender_name: string;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_type: MessageSenderType;
          sender_name: string;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          sender_type?: MessageSenderType;
          sender_name?: string;
          message?: string;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reservation_messages_conversation_id_fkey";
            columns: ["conversation_id"];
            referencedRelation: "reservation_conversations";
            referencedColumns: ["id"];
          },
        ];
      };
      payments: {
        Row: {
          id: string;
          reservation_id: string;
          amount: number;
          status: PaymentStatus;
          method: PaymentMethod;
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reservation_id: string;
          amount: number;
          status?: PaymentStatus;
          method: PaymentMethod;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reservation_id?: string;
          amount?: number;
          status?: PaymentStatus;
          method?: PaymentMethod;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payments_reservation_id_fkey";
            columns: ["reservation_id"];
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
        ];
      };
      invoices: {
        Row: {
          id: string;
          reservation_id: string;
          invoice_number: string;
          issued_at: string;
          due_at: string | null;
          status: InvoiceStatus;
          amount: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reservation_id: string;
          invoice_number: string;
          issued_at?: string;
          due_at?: string | null;
          status?: InvoiceStatus;
          amount: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reservation_id?: string;
          invoice_number?: string;
          issued_at?: string;
          due_at?: string | null;
          status?: InvoiceStatus;
          amount?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invoices_reservation_id_fkey";
            columns: ["reservation_id"];
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
        ];
      };
      invoice_items: {
        Row: {
          id: string;
          invoice_id: string;
          label: string;
          quantity: number;
          unit_price: number;
          total: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          label: string;
          quantity?: number;
          unit_price: number;
          total: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          invoice_id?: string;
          label?: string;
          quantity?: number;
          unit_price?: number;
          total?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey";
            columns: ["invoice_id"];
            referencedRelation: "invoices";
            referencedColumns: ["id"];
          },
        ];
      };
      admin_profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          full_name?: string | null;
          email: string;
          role: AdminRole;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          full_name?: string | null;
          email: string;
          role: AdminRole;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          full_name?: string | null;
          email?: string;
          role?: AdminRole;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      channel_connections: {
        Row: {
          id: string;
          channel: ChannelSource;
          name?: string | null;
          status: ChannelStatus;
          last_sync: string | null;
          commission_rate: number | null;
          imported_reservations_count: number;
          pushed_availability_count: number;
          pushed_prices_count: number;
          errors: string[] | null;
          warnings: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          channel: ChannelSource;
          name?: string | null;
          status?: ChannelStatus;
          last_sync?: string | null;
          commission_rate?: number | null;
          imported_reservations_count?: number;
          pushed_availability_count?: number;
          pushed_prices_count?: number;
          errors?: string[] | null;
          warnings?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          channel?: ChannelSource;
          name?: string | null;
          status?: ChannelStatus;
          last_sync?: string | null;
          commission_rate?: number | null;
          imported_reservations_count?: number;
          pushed_availability_count?: number;
          pushed_prices_count?: number;
          errors?: string[] | null;
          warnings?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      channel_room_mappings: {
        Row: {
          id: string;
          room_type_id: string;
          channel_connection_id: string;
          channel: Exclude<ChannelSource, "direct" | "phone" | "walk_in">;
          external_listing_id: string;
          sync_status: ChannelSyncStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          room_type_id: string;
          channel_connection_id: string;
          channel: Exclude<ChannelSource, "direct" | "phone" | "walk_in">;
          external_listing_id: string;
          sync_status?: ChannelSyncStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          room_type_id?: string;
          channel_connection_id?: string;
          channel?: Exclude<ChannelSource, "direct" | "phone" | "walk_in">;
          external_listing_id?: string;
          sync_status?: ChannelSyncStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "channel_room_mappings_room_type_id_fkey";
            columns: ["room_type_id"];
            referencedRelation: "room_types";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "channel_room_mappings_channel_connection_id_fkey";
            columns: ["channel_connection_id"];
            referencedRelation: "channel_connections";
            referencedColumns: ["id"];
          },
        ];
      };
      sync_logs: {
        Row: {
          id: string;
          channel_connection_id: string | null;
          channel: ChannelSource;
          direction: SyncDirection;
          status: SyncStatus;
          message: string | null;
          payload: Json | null;
          started_at: string;
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          channel_connection_id?: string | null;
          channel: ChannelSource;
          direction: SyncDirection;
          status?: SyncStatus;
          message?: string | null;
          payload?: Json | null;
          started_at?: string;
          completed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          channel_connection_id?: string | null;
          channel?: ChannelSource;
          direction?: SyncDirection;
          status?: SyncStatus;
          message?: string | null;
          payload?: Json | null;
          started_at?: string;
          completed_at?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sync_logs_channel_connection_id_fkey";
            columns: ["channel_connection_id"];
            referencedRelation: "channel_connections";
            referencedColumns: ["id"];
          },
        ];
      };
      automation_alerts: {
        Row: {
          id: string;
          type: AutomationAlertType;
          severity: AlertSeverity;
          title: string;
          description: string;
          reservation_id: string | null;
          room_type_id: string | null;
          is_resolved: boolean;
          created_at: string;
          resolved_at: string | null;
        };
        Insert: {
          id?: string;
          type: AutomationAlertType;
          severity?: AlertSeverity;
          title: string;
          description: string;
          reservation_id?: string | null;
          room_type_id?: string | null;
          is_resolved?: boolean;
          created_at?: string;
          resolved_at?: string | null;
        };
        Update: {
          id?: string;
          type?: AutomationAlertType;
          severity?: AlertSeverity;
          title?: string;
          description?: string;
          reservation_id?: string | null;
          room_type_id?: string | null;
          is_resolved?: boolean;
          created_at?: string;
          resolved_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "automation_alerts_reservation_id_fkey";
            columns: ["reservation_id"];
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "automation_alerts_room_type_id_fkey";
            columns: ["room_type_id"];
            referencedRelation: "room_types";
            referencedColumns: ["id"];
          },
        ];
      };
      room_rate_calendar: {
        Row: {
          id: string;
          room_type_id: string;
          date: string;
          price: number;
          status: RoomRateCalendarStatus;
          min_nights: number | null;
          note: string | null;
          notes: string | null;
          inventory_mode: RoomRateInventoryMode;
          units_available_override: number | null;
          selected_unit_ids: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          room_type_id: string;
          date: string;
          price: number;
          status?: RoomRateCalendarStatus;
          min_nights?: number | null;
          note?: string | null;
          notes?: string | null;
          inventory_mode?: RoomRateInventoryMode;
          units_available_override?: number | null;
          selected_unit_ids?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          room_type_id?: string;
          date?: string;
          price?: number;
          status?: RoomRateCalendarStatus;
          min_nights?: number | null;
          note?: string | null;
          notes?: string | null;
          inventory_mode?: RoomRateInventoryMode;
          units_available_override?: number | null;
          selected_unit_ids?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "room_rate_calendar_room_type_id_fkey";
            columns: ["room_type_id"];
            referencedRelation: "room_types";
            referencedColumns: ["id"];
          },
        ];
      };
      room_availability_blocks: {
        Row: {
          id: string;
          room_type_id: string;
          start_date: string;
          end_date: string;
          status: "not_available" | "partially_available";
          reason: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          room_type_id: string;
          start_date: string;
          end_date: string;
          status?: "not_available" | "partially_available";
          reason?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          room_type_id?: string;
          start_date?: string;
          end_date?: string;
          status?: "not_available" | "partially_available";
          reason?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "room_availability_blocks_room_type_id_fkey";
            columns: ["room_type_id"];
            referencedRelation: "room_types";
            referencedColumns: ["id"];
          },
        ];
      };
      room_date_rates: {
        Row: {
          id: string;
          owner_id: string;
          room_id: string;
          date: string;
          price: number;
          availability_status: RoomDateAvailabilityStatus;
          min_nights: number;
          note: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          room_id: string;
          date: string;
          price: number;
          availability_status?: RoomDateAvailabilityStatus;
          min_nights?: number;
          note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          room_id?: string;
          date?: string;
          price?: number;
          availability_status?: RoomDateAvailabilityStatus;
          min_nights?: number;
          note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "room_date_rates_room_id_fkey";
            columns: ["room_id"];
            referencedRelation: "room_types";
            referencedColumns: ["id"];
          },
        ];
      };
      room_date_prices: {
        Row: {
          id: string;
          owner_id: string;
          room_id: string;
          date: string;
          price: number;
          availability_status: RoomDateAvailabilityStatus;
          min_nights: number;
          note: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          room_id: string;
          date: string;
          price: number;
          availability_status?: RoomDateAvailabilityStatus;
          min_nights?: number;
          note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          room_id?: string;
          date?: string;
          price?: number;
          availability_status?: RoomDateAvailabilityStatus;
          min_nights?: number;
          note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "room_date_prices_room_id_fkey";
            columns: ["room_id"];
            referencedRelation: "room_types";
            referencedColumns: ["id"];
          },
        ];
      };
      port_berths: {
        Row: {
          id: string;
          berth_number: string;
          dock: string | null;
          length_meters: number;
          width_meters: number | null;
          status: BerthStatus;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          berth_number: string;
          dock?: string | null;
          length_meters: number;
          width_meters?: number | null;
          status?: BerthStatus;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          berth_number?: string;
          dock?: string | null;
          length_meters?: number;
          width_meters?: number | null;
          status?: BerthStatus;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      boat_stays: {
        Row: {
          id: string;
          berth_id: string;
          guest_id: string;
          boat_name: string;
          boat_registration: string | null;
          arrival_date: string;
          departure_date: string;
          status: BoatStayStatus;
          source: ChannelSource;
          total: number;
          created_at: string;
          updated_at: string;
          // Extended port reservation fields (designed schema)
          reservation_number: string | null;
          flag: string | null;
          boat_type: string | null;
          boat_length: number | null;
          boat_width: number | null;
          boat_draught: number | null;
          deposit_amount: number | null;
          deposit_currency: string | null;
          special_requirements: string | null;
          newsletter: boolean | null;
          // Actual columns stored by create_port_reservation RPC
          owner_full_name: string | null;
          owner_phone: string | null;
          owner_email: string | null;
          nationality: string | null;
          arrival_at: string | null;
          departure_at: string | null;
          length: number | null;
          width: number | null;
          draught: number | null;
        };
        Insert: {
          id?: string;
          berth_id: string;
          guest_id: string;
          boat_name: string;
          boat_registration?: string | null;
          arrival_date: string;
          departure_date: string;
          status?: BoatStayStatus;
          source?: ChannelSource;
          total?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          berth_id?: string;
          guest_id?: string;
          boat_name?: string;
          boat_registration?: string | null;
          arrival_date?: string;
          departure_date?: string;
          status?: BoatStayStatus;
          source?: ChannelSource;
          total?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "boat_stays_berth_id_fkey";
            columns: ["berth_id"];
            referencedRelation: "port_berths";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "boat_stays_guest_id_fkey";
            columns: ["guest_id"];
            referencedRelation: "guests";
            referencedColumns: ["id"];
          },
        ];
      };
      port_services: {
        Row: {
          id: string;
          boat_stay_id: string;
          service_name: string;
          quantity: number;
          unit_price: number;
          total: number;
          status: PortServiceStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          boat_stay_id: string;
          service_name: string;
          quantity?: number;
          unit_price: number;
          total: number;
          status?: PortServiceStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          boat_stay_id?: string;
          service_name?: string;
          quantity?: number;
          unit_price?: number;
          total?: number;
          status?: PortServiceStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "port_services_boat_stay_id_fkey";
            columns: ["boat_stay_id"];
            referencedRelation: "boat_stays";
            referencedColumns: ["id"];
          },
        ];
      };
      port_tariffs: {
        Row: {
          id: string;
          category: string;
          length_min: number | null;
          length_max: number | null;
          daily_price: number | null;
          monthly_price: number | null;
          yearly_price: number | null;
          wintering_price: number | null;
          currency: string;
          note: string | null;
          active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category: string;
          length_min?: number | null;
          length_max?: number | null;
          daily_price?: number | null;
          monthly_price?: number | null;
          yearly_price?: number | null;
          wintering_price?: number | null;
          currency?: string;
          note?: string | null;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category?: string;
          length_min?: number | null;
          length_max?: number | null;
          daily_price?: number | null;
          monthly_price?: number | null;
          yearly_price?: number | null;
          wintering_price?: number | null;
          currency?: string;
          note?: string | null;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      create_port_reservation: {
        Args: {
          p_last_name: string;
          p_first_name: string;
          p_date_of_birth: string;
          p_nationality: string;
          p_phone: string;
          p_email: string;
          p_boat_name: string;
          p_flag: string;
          p_length: number;
          p_width: number;
          p_draught: number;
          p_boat_type: string;
          p_check_in: string;
          p_check_out: string;
          p_deposit_amount: number;
          p_deposit_currency: string;
          p_special_requirements?: string | null;
          p_newsletter?: boolean;
        };
        Returns: {
          reservation_id: string;
          reservation_number: string;
        };
      };
      create_public_reservation: {
        Args: {
          room_type_id: string;
          check_in: string;
          check_out: string;
          adults: number;
          children: number;
          guest_full_name: string;
          guest_email: string;
          guest_phone: string;
          guest_country: string;
          guest_identity_number: string;
          source?: ChannelSource;
          payment_status?: PaymentStatus;
          special_requests?: string | null;
        };
        Returns: {
          reservation_id: string;
          reservation_number: string;
          total: number;
          deposit: number;
          remaining_amount: number;
        };
      };
      get_available_units: {
        Args: {
          room_type_id: string;
          check_in: string;
          check_out: string;
        };
        Returns: number;
      };
      link_guest_reservations_to_client: {
        Args: Record<string, never>;
        Returns: number;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<TableName extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][TableName]["Row"];

export type TablesInsert<TableName extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][TableName]["Insert"];

export type TablesUpdate<TableName extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][TableName]["Update"];
