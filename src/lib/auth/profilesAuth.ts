import { redirect } from "@tanstack/react-router";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseOrNull } from "@/lib/supabase/serviceHelpers";
import type { Tables, TablesInsert } from "@/lib/supabase/types";

export type ProfileRole = "admin" | "owner" | "client" | "capitainerie";

export type UserProfile = {
  id: string;
  userId: string;
  fullName: string;
  name: string;
  email: string;
  role: ProfileRole;
  active: boolean;
  createdAt: string;
};

export type SessionProfile = {
  session: Session;
  user: User;
  profile: UserProfile;
};

export type ClientRegisterInput = {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
};

export type ClientRegisterResult = {
  needsEmailConfirmation: boolean;
  profile: UserProfile | null;
};

type ProfileRow = Tables<"profiles">;

const VALID_ROLES: ProfileRole[] = ["admin", "owner", "client", "capitainerie"];

function isValidRole(role: unknown): role is ProfileRole {
  return typeof role === "string" && (VALID_ROLES as string[]).includes(role);
}

export function isAdminRole(role: ProfileRole | null | undefined) {
  return role === "admin" || role === "owner";
}

export function getDefaultPathForRole(role: ProfileRole) {
  if (role === "capitainerie") return "/admin/port-tarifs";
  return isAdminRole(role) ? "/admin" : "/client";
}

export async function signInWithPasswordAndProfile(email: string, password: string) {
  const supabase = await requireSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error) throw new Error(error.message || "Connexion impossible.");
  if (!data.user || !data.session) throw new Error("Connexion impossible.");

  const profile = await fetchProfileForUser(data.user);
  if (!profile) {
    await supabase.auth.signOut();
    throw new Error("Profil utilisateur introuvable.");
  }

  if (import.meta.env.DEV) {
    console.info("[auth] signIn resolved profile", {
      authUserId: data.user.id,
      profileUserId: profile.userId,
      profileRole: profile.role,
      redirectTarget: getDefaultPathForRole(profile.role),
    });
  }

  return { session: data.session, user: data.user, profile };
}

export async function registerClient(input: ClientRegisterInput): Promise<ClientRegisterResult> {
  const supabase = await requireSupabaseClient();
  const email = input.email.trim().toLowerCase();
  const fullName = input.fullName.trim();
  const phone = input.phone?.trim() ?? "";

  const emailRedirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/client/login`
      : "https://marina-six-iota.vercel.app/client/login";

  const { data, error } = await supabase.auth.signUp({
    email,
    password: input.password,
    options: {
      emailRedirectTo,
      data: {
        full_name: fullName,
        phone,
        role: "client",
      },
    },
  });

  if (error) throw new Error(error.message || "Inscription impossible.");
  if (!data.user) throw new Error("Inscription impossible.");

  if (!data.session) {
    return { needsEmailConfirmation: true, profile: null };
  }

  const profile = await ensureClientProfile(data.user, { fullName, email });
  return { needsEmailConfirmation: false, profile };
}

export async function sendPasswordReset(email: string, redirectPath = "/login") {
  const supabase = await requireSupabaseClient();
  const redirectTo =
    typeof window !== "undefined" ? `${window.location.origin}${redirectPath}` : undefined;
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo,
  });
  if (error) throw new Error(error.message || "Reinitialisation impossible.");
}

export async function signOut() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message || "Deconnexion impossible.");
}

export async function getCurrentSessionProfile(): Promise<SessionProfile | null> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return null;

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw new Error(sessionError.message || "Session indisponible.");
  if (!sessionData.session) return null;

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw new Error(userError.message || "Utilisateur indisponible.");
  if (!userData.user) return null;

  const profile = await fetchProfileForUser(userData.user);
  if (!profile) return null;

  return { session: sessionData.session, user: userData.user, profile };
}

export async function getCurrentProfile() {
  const context = await getCurrentSessionProfile();
  return context?.profile ?? null;
}

export async function requireProfileRole(roles: ProfileRole[], pathname = "/") {
  const context = await getCurrentSessionProfile();

  if (!context) {
    throw redirect({
      to: "/login",
      search: { redirect: pathname },
    });
  }

  if (!roles.includes(context.profile.role)) {
    throw redirect({ to: getDefaultPathForRole(context.profile.role) });
  }

  return context;
}

export async function fetchProfileForUser(user: User): Promise<UserProfile | null> {
  const supabase = await requireSupabaseClient();
  // profiles.id is the auth user id (profiles.id references auth.users(id)),
  // so this is the "profiles.user_id = auth.user.id" lookup — never derived
  // from email or any other heuristic.
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw mapSupabaseError(error);
  if (!data) {
    if (import.meta.env.DEV) {
      console.info("[auth] no profiles row for auth user", { authUserId: user.id });
    }
    return null;
  }

  // A missing/unrecognized role must never silently fall back to "client" —
  // treat it the same as "no profile" so the caller shows an explicit error
  // instead of routing the user into a portal they don't belong in.
  if (!isValidRole(data.role)) {
    if (import.meta.env.DEV) {
      console.info("[auth] profiles row has invalid/missing role", {
        authUserId: user.id,
        profileId: data.id,
        role: data.role,
      });
    }
    return null;
  }

  return mapProfile(data);
}

export async function ensureClientProfile(
  user: User,
  fallback?: { fullName?: string; email?: string },
) {
  const supabase = await requireSupabaseClient();
  const email = (fallback?.email ?? user.email ?? "").trim().toLowerCase();
  if (!email) throw new Error("Email client introuvable.");

  const existing = await fetchProfileForUser(user);
  if (existing) {
    if (existing.role !== "client") {
      throw new Error("Ce compte n'est pas un compte client.");
    }
    return existing;
  }

  const fullName =
    fallback?.fullName?.trim() ||
    readMetadataString(user, "full_name") ||
    readMetadataString(user, "name") ||
    email;
  const payload: TablesInsert<"profiles"> = {
    id: user.id,
    full_name: fullName,
    email,
    role: "client",
  };

  const { data, error } = await supabase.from("profiles").insert(payload).select("*").single();
  if (error) throw mapSupabaseError(error);
  return mapProfile(data);
}

export function mapSupabaseError(error: unknown) {
  if (isPermissionError(error)) {
    return new Error("Permission Supabase refusee. Verifiez les policies RLS profiles/messages.");
  }

  return new Error(getErrorDetail(error) ?? "Erreur Supabase inconnue.");
}

async function requireSupabaseClient() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) throw new Error("Supabase n'est pas configure.");
  return supabase;
}

function mapProfile(row: ProfileRow): UserProfile {
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

function readMetadataString(user: User, key: string) {
  const value = user.user_metadata?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getErrorDetail(error: unknown) {
  if (!error) return null;
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;

  const maybeError = error as { message?: string; details?: string; hint?: string; code?: string };
  const parts = [maybeError.message, maybeError.details, maybeError.hint, maybeError.code].filter(
    Boolean,
  );
  return parts.length ? parts.join(" | ") : JSON.stringify(error);
}

function isPermissionError(error: unknown) {
  const maybeError = error as {
    code?: string;
    status?: number;
    message?: string;
    details?: string;
  };
  const haystack = [maybeError?.message, maybeError?.details, maybeError?.code]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    maybeError?.code === "42501" ||
    maybeError?.status === 401 ||
    maybeError?.status === 403 ||
    haystack.includes("permission") ||
    haystack.includes("row-level security") ||
    haystack.includes("rls") ||
    haystack.includes("not authorized")
  );
}
