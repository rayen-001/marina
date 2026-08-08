import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/supabase/admin.server";

const createClientAccountInput = z.object({
  accessToken: z.string().min(1),
  fullName: z.string().min(1, "Nom complet requis."),
  email: z.string().email("Email client invalide."),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caracteres."),
  phone: z.string().optional(),
});

export const createClientAccount = createServerFn({ method: "POST" })
  .inputValidator(createClientAccountInput)
  .handler(async ({ data }) => {
    const supabase = getSupabaseAdminClient();
    const email = data.email.trim().toLowerCase();
    const fullName = data.fullName.trim();
    const phone = data.phone?.trim() ?? "";

    const { data: callerData, error: callerError } = await supabase.auth.getUser(data.accessToken);
    if (callerError || !callerData.user) throw new Error("Session admin invalide.");

    const { data: callerProfile, error: profileError } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("id", callerData.user.id)
      .maybeSingle();

    if (profileError) throw profileError;
    if (!callerProfile || !["admin", "owner"].includes(callerProfile.role)) {
      throw new Error("Acces reserve aux admins.");
    }

    const { data: created, error: createError } = await supabase.auth.admin.createUser({
      email,
      password: data.password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        phone,
        role: "client",
      },
    });

    if (createError || !created.user) {
      throw new Error(createError?.message ?? "Creation du compte client impossible.");
    }

    const { data: profile, error: insertError } = await supabase
      .from("profiles")
      .upsert({
        id: created.user.id,
        full_name: fullName,
        email,
        role: "client",
      })
      .select("*")
      .single();

    if (insertError) {
      await supabase.auth.admin.deleteUser(created.user.id);
      throw insertError;
    }

    return { userId: created.user.id, profile };
  });
