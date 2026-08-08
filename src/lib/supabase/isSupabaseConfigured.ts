function getEnvVar(key: string): string | undefined {
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key];
  }
  return undefined;
}

export function isSupabaseConfigured() {
  return Boolean(getEnvVar("VITE_SUPABASE_URL") && getEnvVar("VITE_SUPABASE_ANON_KEY"));
}
