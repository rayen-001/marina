import { isSupabaseConfigured } from "./isSupabaseConfigured";

export async function getSupabaseOrNull() {
  if (!isSupabaseConfigured()) return null;
  try {
    const { supabase } = await import("./client");
    return supabase;
  } catch (error) {
    console.warn("Supabase client initialization failed.", error);
    return null;
  }
}

export function warnSupabaseFallback(scope: string, error: unknown) {
  console.warn(`Supabase ${scope} failed; using local mock fallback.`, error);
}

export function replaceArray<T>(target: T[], next: T[]) {
  target.splice(0, target.length, ...next);
}
