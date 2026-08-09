import { redirect } from "@tanstack/react-router";
import { getSupabaseOrNull } from "@/lib/supabase/serviceHelpers";
import type { UserProfile } from "./profilesAuth";
import {
  getCurrentSessionProfile,
  getDefaultPathForRole,
  mapSupabaseError,
  registerClient,
  sendPasswordReset,
  signInWithPasswordAndProfile,
  signOut,
  type ClientRegisterInput,
  type ClientRegisterResult,
  type SessionProfile,
} from "./profilesAuth";

export type ClientProfile = {
  id: string;
  userId: string;
  guestId: string | null;
  email: string;
  fullName: string;
  phone: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ClientSessionProfile = Omit<SessionProfile, "profile"> & {
  profile: ClientProfile;
};

export type { ClientRegisterInput, ClientRegisterResult };

export async function signInClient(email: string, password: string) {
  const context = await signInWithPasswordAndProfile(email, password);
  if (context.profile.role !== "client") {
    await signOut();
    throw new Error("Ce compte n'est pas un compte client.");
  }

  return {
    session: context.session,
    user: context.user,
    profile: mapClientProfile(context.profile),
  };
}

export { registerClient };

export async function sendClientPasswordReset(email: string) {
  await sendPasswordReset(email, "/login");
}

export async function signOutClient() {
  await signOut();
}

export async function getClientSessionProfile(): Promise<ClientSessionProfile | null> {
  const context = await getCurrentSessionProfile();
  if (!context || context.profile.role !== "client") return null;

  return {
    session: context.session,
    user: context.user,
    profile: mapClientProfile(context.profile),
  };
}

export async function requireClientSession(pathname = "/client") {
  const context = await getCurrentSessionProfile();

  if (!context) {
    throw redirect({
      to: "/login",
      search: { redirect: pathname },
    });
  }

  if (context.profile.role !== "client") {
    if (import.meta.env.DEV) {
      console.info("[ClientLayout] non-client role blocked from /client, redirecting", {
        authUserId: context.user.id,
        profileUserId: context.profile.userId,
        profileRole: context.profile.role,
        redirectTarget: getDefaultPathForRole(context.profile.role),
      });
    }
    throw redirect({ to: getDefaultPathForRole(context.profile.role) as never });
  }

  return context.session;
}

/**
 * Reconciles the signed-in client with any reservation made under the same
 * email while unauthenticated (or made through the anonymous checkout flow
 * while logged in), by re-pointing those reservations' guest_id at the
 * client's own profile/auth id. No-op for non-client sessions.
 */
export async function linkGuestReservationsToClient() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return;

  try {
    const { error } = await supabase.rpc("link_guest_reservations_to_client");
    if (error && error.code !== "PGRST202" && error.code !== "42883" && import.meta.env.DEV) {
      console.warn("[clientAuth] link_guest_reservations_to_client failed", error);
    }
  } catch {
    // Ignore RPC missing error gracefully
  }
}

export { mapSupabaseError };

function mapClientProfile(profile: UserProfile): ClientProfile {
  return {
    id: profile.id,
    userId: profile.userId,
    guestId: null,
    email: profile.email,
    fullName: profile.fullName,
    phone: null,
    active: true,
    createdAt: profile.createdAt,
    updatedAt: profile.createdAt,
  };
}
