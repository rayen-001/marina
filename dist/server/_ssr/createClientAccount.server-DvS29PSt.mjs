import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-4up-b2hM.mjs";
import process from "node:process";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function getSupabaseAdminClient() {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase admin API is not configured.");
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
const createClientAccountInput = objectType({
  accessToken: stringType().min(1),
  fullName: stringType().min(1, "Nom complet requis."),
  email: stringType().email("Email client invalide."),
  password: stringType().min(6, "Le mot de passe doit contenir au moins 6 caracteres."),
  phone: stringType().optional()
});
const createClientAccount_createServerFn_handler = createServerRpc({
  id: "2f6f4cf0a18d2bb6dec41631fdad1a27506754df9e2936b62d5e8770d543f422",
  name: "createClientAccount",
  filename: "src/lib/auth/createClientAccount.server.ts"
}, (opts) => createClientAccount.__executeServer(opts));
const createClientAccount = createServerFn({
  method: "POST"
}).inputValidator(createClientAccountInput).handler(createClientAccount_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseAdminClient();
  const email = data.email.trim().toLowerCase();
  const fullName = data.fullName.trim();
  const phone = data.phone?.trim() ?? "";
  const {
    data: callerData,
    error: callerError
  } = await supabase.auth.getUser(data.accessToken);
  if (callerError || !callerData.user) throw new Error("Session admin invalide.");
  const {
    data: callerProfile,
    error: profileError
  } = await supabase.from("profiles").select("id, role").eq("id", callerData.user.id).maybeSingle();
  if (profileError) throw profileError;
  if (!callerProfile || !["admin", "owner"].includes(callerProfile.role)) {
    throw new Error("Acces reserve aux admins.");
  }
  const {
    data: created,
    error: createError
  } = await supabase.auth.admin.createUser({
    email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      phone,
      role: "client"
    }
  });
  if (createError || !created.user) {
    throw new Error(createError?.message ?? "Creation du compte client impossible.");
  }
  const {
    data: profile,
    error: insertError
  } = await supabase.from("profiles").upsert({
    id: created.user.id,
    full_name: fullName,
    email,
    role: "client"
  }).select("*").single();
  if (insertError) {
    await supabase.auth.admin.deleteUser(created.user.id);
    throw insertError;
  }
  return {
    userId: created.user.id,
    profile
  };
});
export {
  createClientAccount_createServerFn_handler
};
