import { hotelSettings, type HotelSettings } from "@/data/hotel";
import { getSupabaseOrNull, warnSupabaseFallback } from "@/lib/supabase/serviceHelpers";
import type { Tables } from "@/lib/supabase/types";

type HotelSettingsRow = Tables<"hotel_settings">;

export async function getHotelSettings() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return hotelSettings;

  try {
    const { data, error } = await supabase
      .from("hotel_settings")
      .select("*")
      .order("created_at")
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    if (!data) return hotelSettings;

    Object.assign(hotelSettings, mapHotelSettingsFromDb(data));
    return hotelSettings;
  } catch (error) {
    warnSupabaseFallback("hotel settings query", error);
    return hotelSettings;
  }
}

export const getHotelSettingsAsync = getHotelSettings;

export async function updateHotelSettings(next: Partial<HotelSettings>) {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return updateHotelSettingsInMock(next);

  try {
    const { data: existing, error: existingError } = await supabase
      .from("hotel_settings")
      .select("id")
      .order("created_at")
      .limit(1)
      .maybeSingle();

    if (existingError) throw existingError;
    if (!existing) return updateHotelSettingsInMock(next);

    const { data, error } = await supabase
      .from("hotel_settings")
      .update(mapHotelSettingsToDb(next))
      .eq("id", existing.id)
      .select("*")
      .single();

    if (error) throw error;

    Object.assign(hotelSettings, mapHotelSettingsFromDb(data));
    return hotelSettings;
  } catch (error) {
    warnSupabaseFallback("hotel settings update", error);
    return updateHotelSettingsInMock(next);
  }
}

function updateHotelSettingsInMock(next: Partial<HotelSettings>) {
  Object.assign(hotelSettings, next);
  return hotelSettings;
}

function resolveLogoUrl(rawLogoUrl: string | null): string {
  if (!rawLogoUrl || rawLogoUrl.endsWith("/assets/marina-logo.png") || rawLogoUrl === "marina-logo.png") {
    return hotelSettings.logoUrl;
  }
  return rawLogoUrl;
}

function resolveHeroUrl(rawHeroUrl: string | null): string {
  if (!rawHeroUrl || rawHeroUrl.endsWith("/assets/hero-marina.jpg") || rawHeroUrl === "hero-marina.jpg") {
    return hotelSettings.heroUrl;
  }
  return rawHeroUrl;
}

function mapHotelSettingsFromDb(row: HotelSettingsRow): HotelSettings {
  return {
    hotelName: row.hotel_name,
    logoUrl: resolveLogoUrl(row.logo_url),
    heroUrl: resolveHeroUrl(row.hero_url),
    phone: row.phone,
    fax: row.fax ?? hotelSettings.fax,
    email: row.email,
    marketingEmail: row.marketing_email ?? hotelSettings.marketingEmail,
    capitainerieEmail: row.capitainerie_email ?? hotelSettings.capitainerieEmail,
    capitaineriePhones: row.capitainerie_phones ?? hotelSettings.capitaineriePhones,
    address: row.address,
    taxRegistration: row.tax_registration,
    invoicePrefix: row.invoice_prefix,
    defaultCurrency: row.default_currency,
    checkInTime: row.check_in_time,
    checkOutTime: row.check_out_time,
    taxRate: Number(row.tax_rate),
    depositPercentage: Number(row.deposit_percentage),
  };
}

function mapHotelSettingsToDb(settings: Partial<HotelSettings>) {
  return {
    hotel_name: settings.hotelName,
    logo_url: settings.logoUrl,
    hero_url: settings.heroUrl,
    phone: settings.phone,
    fax: settings.fax,
    email: settings.email,
    marketing_email: settings.marketingEmail,
    capitainerie_email: settings.capitainerieEmail,
    capitainerie_phones: settings.capitaineriePhones,
    address: settings.address,
    tax_registration: settings.taxRegistration,
    invoice_prefix: settings.invoicePrefix,
    default_currency: settings.defaultCurrency,
    check_in_time: settings.checkInTime,
    check_out_time: settings.checkOutTime,
    tax_rate: settings.taxRate,
    deposit_percentage: settings.depositPercentage,
  };
}
