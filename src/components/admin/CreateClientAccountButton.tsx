import { UserPlus, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { createClientAccount } from "@/lib/auth/createClientAccount.server";
import { getSupabaseOrNull } from "@/lib/supabase/serviceHelpers";
import { adminButtonClasses } from "./AdminButton";

type Props = {
  onCreated?: () => void | Promise<void>;
};

export function CreateClientAccountButton({ onCreated }: Props) {
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setError("");
  };

  const close = () => {
    if (loading) return;
    reset();
    setOpen(false);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = await getSupabaseOrNull();
      if (!supabase) throw new Error("Supabase n'est pas configure.");

      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw new Error(sessionError.message);
      const token = data.session?.access_token;
      if (!token) throw new Error("Session admin requise.");

      await createClientAccount({
        data: {
          accessToken: token,
          fullName,
          email,
          phone,
          password,
        },
      });

      toast.success("Compte client cree.");
      reset();
      setOpen(false);
      await onCreated?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Creation du compte client impossible.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={adminButtonClasses("primary", "md")}
      >
        <UserPlus className="size-4" />
        Créer compte client
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ocean/65 px-4 py-8 backdrop-blur-sm">
          <button type="button" className="absolute inset-0" aria-label="Fermer" onClick={close} />
          <form
            onSubmit={submit}
            className="relative w-full max-w-lg rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-lift)]"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="section-kicker">
                  <UserPlus className="size-4" />
                  Client
                </div>
                <h2 className="mt-2 text-xl font-black text-primary">Créer compte client</h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition hover:text-primary"
                aria-label="Fermer"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <AdminClientField label="Nom complet">
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="admin-input"
                  autoComplete="name"
                  required
                />
              </AdminClientField>
              <AdminClientField label="Telephone">
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="admin-input"
                  autoComplete="tel"
                />
              </AdminClientField>
              <AdminClientField label="Email">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="admin-input"
                  autoComplete="email"
                  required
                />
              </AdminClientField>
              <AdminClientField label="Mot de passe">
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="admin-input"
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </AdminClientField>
            </div>

            {error && (
              <p className="mt-4 rounded-md bg-destructive/10 p-3 text-sm font-semibold text-destructive">
                {error}
              </p>
            )}

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={close}
                disabled={loading}
                className={adminButtonClasses("outline", "md")}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className={adminButtonClasses("primary", "md")}
              >
                <UserPlus className="size-4" />
                {loading ? "Creation..." : "Créer"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

function AdminClientField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
