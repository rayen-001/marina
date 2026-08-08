import { createFileRoute } from "@tanstack/react-router";
import { Anchor, CheckCircle2, Mail, Phone, Sailboat, User } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { getSupabaseOrNull } from "@/lib/supabase/serviceHelpers";

type FormData = {
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  nationality: string;
  phone: string;
  email: string;
  confirmEmail: string;
  boatName: string;
  flag: string;
  length: string;
  width: string;
  draught: string;
  boatType: string;
  checkIn: string;
  checkOut: string;
  depositAmount: string;
  depositCurrency: "EUR" | "TND";
  specialRequirements: string;
  newsletter: boolean;
};

type SuccessData = {
  reservationNumber: string;
  boatName: string;
  checkIn: string;
  checkOut: string;
  depositAmount: string;
  depositCurrency: string;
  deliveryMode?: "email" | "database_fallback" | "mailto";
  setupInstructions?: string;
};

type CapitainerieEmailResponse = {
  emailSent?: boolean;
  setupRequired?: boolean;
  instructions?: string;
  reservationNumber?: string;
  error?: string;
};

const initialForm: FormData = {
  lastName: "",
  firstName: "",
  dateOfBirth: "",
  nationality: "Tunisia",
  phone: "+216",
  email: "",
  confirmEmail: "",
  boatName: "",
  flag: "",
  length: "",
  width: "",
  draught: "",
  boatType: "",
  checkIn: "",
  checkOut: "",
  depositAmount: "",
  depositCurrency: "EUR",
  specialRequirements: "",
  newsletter: false,
};

function validate(form: FormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.lastName.trim()) errors.lastName = "Nom requis";
  if (!form.firstName.trim()) errors.firstName = "Prénom requis";
  if (!form.dateOfBirth) errors.dateOfBirth = "Date de naissance requise";
  if (!form.nationality.trim()) errors.nationality = "Nationalité requise";
  if (!form.phone.trim()) errors.phone = "Téléphone requis";
  if (!form.email.trim()) {
    errors.email = "Email requis";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Email invalide";
  }
  if (form.email !== form.confirmEmail) errors.confirmEmail = "Les emails ne correspondent pas";
  if (!form.boatName.trim()) errors.boatName = "Nom du bateau requis";
  if (!form.flag.trim()) errors.flag = "Pavillon requis";
  const length = parseFloat(form.length);
  if (!form.length || isNaN(length) || length <= 0)
    errors.length = "Longueur invalide (doit être > 0)";
  const width = parseFloat(form.width);
  if (!form.width || isNaN(width) || width <= 0) errors.width = "Largeur invalide (doit être > 0)";
  const draught = parseFloat(form.draught);
  if (!form.draught || isNaN(draught) || draught <= 0)
    errors.draught = "Tirant d'eau invalide (doit être > 0)";
  if (!form.boatType) errors.boatType = "Type de bateau requis";
  if (!form.checkIn) errors.checkIn = "Date d'arrivée requise";
  if (!form.checkOut) errors.checkOut = "Date de sortie requise";
  if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn)
    errors.checkOut = "La date de sortie doit être après la date d'arrivée";
  const deposit = parseFloat(form.depositAmount);
  if (!form.depositAmount || isNaN(deposit) || deposit <= 0) {
    errors.depositAmount = "Acompte requis";
  } else if (form.depositCurrency === "EUR" && deposit < 300) {
    errors.depositAmount = "Acompte minimum 300 €";
  } else if (form.depositCurrency === "TND" && deposit < 1000) {
    errors.depositAmount = "Acompte minimum 1 000 TND";
  }
  return errors;
}

async function sendCapitainerieEmail(
  supabase: NonNullable<Awaited<ReturnType<typeof getSupabaseOrNull>>>,
  form: FormData,
): Promise<CapitainerieEmailResponse> {
  try {
    const { data, error } = await supabase.functions.invoke<CapitainerieEmailResponse>(
      "send-capitainerie-reservation-email",
      {
        body: buildCapitainerieEmailPayload(form),
      },
    );

    if (error) {
      console.error("[Capitainerie] Edge Function error", error);
      return {
        emailSent: false,
        error: error.message,
        instructions:
          "Verifiez que l'Edge Function send-capitainerie-reservation-email est deployee et que EMAIL_PROVIDER_API_KEY ou les identifiants SMTP sont configures.",
      };
    }

    return (
      data ?? {
        emailSent: false,
        instructions:
          "L'Edge Function n'a pas retourne de reponse. La reservation sera sauvegardee en fallback.",
      }
    );
  } catch (error) {
    console.error("[Capitainerie] Email submit failed", error);
    return {
      emailSent: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
      instructions:
        "Configurez EMAIL_PROVIDER_API_KEY ou les identifiants SMTP, CAPITAINERIE_EMAIL et redeployez l'Edge Function send-capitainerie-reservation-email.",
    };
  }
}

function buildCapitainerieEmailPayload(form: FormData) {
  return {
    lastName: form.lastName,
    firstName: form.firstName,
    dateOfBirth: form.dateOfBirth,
    nationality: form.nationality,
    phone: form.phone,
    email: form.email,
    confirmEmail: form.confirmEmail,
    boatName: form.boatName,
    flag: form.flag,
    length: parseFloat(form.length),
    width: parseFloat(form.width),
    draught: parseFloat(form.draught),
    boatType: form.boatType,
    checkIn: form.checkIn,
    checkOut: form.checkOut,
    depositAmount: parseFloat(form.depositAmount),
    depositCurrency: form.depositCurrency,
    specialRequirements: form.specialRequirements || null,
    newsletter: form.newsletter,
    submittedAt: new Date().toISOString(),
  };
}

export const Route = createFileRoute("/port-de-plaisance/reservation")({
  head: () => ({
    meta: [
      { title: "Réservation Port de Plaisance — Marina Cap Monastir" },
      {
        name: "description",
        content:
          "Réservez votre place au port de plaisance de Marina Cap Monastir. Formulaire de réservation pour plaisanciers, escale, passage, hivernage.",
      },
    ],
  }),
  component: ReservationPortPage,
});

function ReservationPortPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<SuccessData | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstError = document.querySelector("[data-field-error]");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const supabase = await getSupabaseOrNull();

      if (!supabase) {
        // Fallback: build a mailto and open it so the user can still send their request
        const subject = encodeURIComponent(
          `Demande réservation port — ${form.boatName} — ${form.checkIn}`,
        );
        const body = encodeURIComponent(
          `Nom: ${form.lastName} ${form.firstName}\n` +
            `Naissance: ${form.dateOfBirth}\n` +
            `Nationalité: ${form.nationality}\n` +
            `Téléphone: ${form.phone}\n` +
            `Email: ${form.email}\n` +
            `Confirmation email: ${form.confirmEmail}\n\n` +
            `Bateau: ${form.boatName} (${form.boatType})\n` +
            `Pavillon: ${form.flag}\n` +
            `Longueur: ${form.length} m  Largeur: ${form.width} m  Tirant: ${form.draught} m\n\n` +
            `Arrivée: ${form.checkIn}  Départ: ${form.checkOut}\n` +
            `Acompte: ${form.depositAmount} ${form.depositCurrency}\n` +
            `Date de soumission: ${new Date().toISOString()}\n\n` +
            (form.specialRequirements ? `Besoins spéciaux: ${form.specialRequirements}\n` : ""),
        );
        window.location.href = `mailto:capitainerie@marinamonastir.tn?subject=${subject}&body=${body}`;
        setSuccess({
          reservationNumber: `PORT-${new Date().getFullYear()}-MAIL`,
          boatName: form.boatName,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          depositAmount: form.depositAmount,
          depositCurrency: form.depositCurrency,
          deliveryMode: "mailto",
          setupInstructions:
            "Supabase n'est pas configure. Configurez Supabase et l'Edge Function send-capitainerie-reservation-email pour envoyer l'email serveur automatiquement.",
        });
        setSubmitting(false);
        return;
      }

      const emailResult = await sendCapitainerieEmail(supabase, form);
      if (emailResult.emailSent) {
        setSuccess({
          reservationNumber: emailResult.reservationNumber ?? `PORT-${Date.now()}`,
          boatName: form.boatName,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          depositAmount: form.depositAmount,
          depositCurrency: form.depositCurrency,
          deliveryMode: "email",
        });
        return;
      }

      console.warn(
        "[Capitainerie] Email provider not configured or Edge Function failed. Saving reservation in database fallback.",
        emailResult,
      );

      const { data, error } = await supabase.rpc("create_port_reservation", {
        p_last_name: form.lastName,
        p_first_name: form.firstName,
        p_date_of_birth: form.dateOfBirth,
        p_nationality: form.nationality,
        p_phone: form.phone,
        p_email: form.email,
        p_boat_name: form.boatName,
        p_flag: form.flag,
        p_length: parseFloat(form.length),
        p_width: parseFloat(form.width),
        p_draught: parseFloat(form.draught),
        p_boat_type: form.boatType,
        p_check_in: form.checkIn,
        p_check_out: form.checkOut,
        p_deposit_amount: parseFloat(form.depositAmount),
        p_deposit_currency: form.depositCurrency,
        p_special_requirements: form.specialRequirements || null,
        p_newsletter: form.newsletter,
      });

      if (error) {
        if (import.meta.env.DEV) console.error("Port reservation RPC error:", error);
        throw new Error(
          error.message ||
            "Erreur lors de l'envoi. Veuillez réessayer ou contacter la capitainerie.",
        );
      }

      const result = data as { reservation_id: string; reservation_number: string } | null;
      setSuccess({
        reservationNumber: result?.reservation_number ?? `PORT-${Date.now()}`,
        boatName: form.boatName,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        depositAmount: form.depositAmount,
        depositCurrency: form.depositCurrency,
        deliveryMode: "database_fallback",
        setupInstructions:
          emailResult.instructions ??
          "Configurez EMAIL_PROVIDER_API_KEY ou les identifiants SMTP, CAPITAINERIE_EMAIL et redeployez l'Edge Function send-capitainerie-reservation-email.",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur inattendue. Veuillez réessayer.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return <SuccessCard success={success} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Page header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean via-primary to-[#0a3f5c] py-16 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(214,168,79,0.25),transparent_65%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 md:px-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] backdrop-blur">
            <Anchor className="size-3.5 text-accent" />
            Port de Plaisance
          </div>
          <h1 className="text-4xl font-black md:text-5xl">Réservation Port de Plaisance</h1>
          <p className="mt-3 text-base text-white/75">
            Saisissez vos coordonnées / Enter your details
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <form onSubmit={handleSubmit} noValidate>
          {/* Section 1 — Coordonnées client */}
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-premium)]">
            <div className="h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" />
            <div className="p-6 md:p-8">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <User className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-primary">Coordonnées client</h2>
                  <p className="text-sm text-muted-foreground">Client information</p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Nom / Name"
                  id="lastName"
                  value={form.lastName}
                  error={errors.lastName}
                  required
                  onChange={(v) => setField("lastName", v)}
                  placeholder="DUPONT"
                />
                <FormField
                  label="Prénom / First Name"
                  id="firstName"
                  value={form.firstName}
                  error={errors.firstName}
                  required
                  onChange={(v) => setField("firstName", v)}
                  placeholder="Jean"
                />
                <FormField
                  label="Date de naissance / Date of Birth"
                  id="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  error={errors.dateOfBirth}
                  required
                  onChange={(v) => setField("dateOfBirth", v)}
                />
                <FormField
                  label="Nationalité / Nationality"
                  id="nationality"
                  value={form.nationality}
                  error={errors.nationality}
                  required
                  onChange={(v) => setField("nationality", v)}
                  placeholder="Tunisia"
                />
                <FormField
                  label="Téléphone / Phone"
                  id="phone"
                  type="tel"
                  value={form.phone}
                  error={errors.phone}
                  required
                  onChange={(v) => setField("phone", v)}
                  placeholder="+216 73 46 23 05"
                />
                <FormField
                  label="Email"
                  id="email"
                  type="email"
                  value={form.email}
                  error={errors.email}
                  required
                  onChange={(v) => setField("email", v)}
                  placeholder="nom@exemple.com"
                />
                <div className="sm:col-span-2">
                  <FormField
                    label="Confirmer Email / Confirm Email"
                    id="confirmEmail"
                    type="email"
                    value={form.confirmEmail}
                    error={errors.confirmEmail}
                    required
                    onChange={(v) => setField("confirmEmail", v)}
                    placeholder="nom@exemple.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 — Informations bateau */}
          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-premium)]">
            <div className="h-1.5 bg-gradient-to-r from-primary via-turquoise to-accent" />
            <div className="p-6 md:p-8">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Sailboat className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-primary">Informations sur le Bateau</h2>
                  <p className="text-sm text-muted-foreground">Boat information</p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Nom du bateau / Boat Name"
                  id="boatName"
                  value={form.boatName}
                  error={errors.boatName}
                  required
                  onChange={(v) => setField("boatName", v)}
                  placeholder="Sea Dream"
                />
                <FormField
                  label="Pavillon / Flag"
                  id="flag"
                  value={form.flag}
                  error={errors.flag}
                  required
                  onChange={(v) => setField("flag", v)}
                  placeholder="Tunisie"
                />
                <FormField
                  label="Longueur / Length (m)"
                  id="length"
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.length}
                  error={errors.length}
                  required
                  onChange={(v) => setField("length", v)}
                  placeholder="12.0"
                />
                <FormField
                  label="Largeur / Width (m)"
                  id="width"
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.width}
                  error={errors.width}
                  required
                  onChange={(v) => setField("width", v)}
                  placeholder="4.0"
                />
                <FormField
                  label="Tirant d'eau / Draught (m)"
                  id="draught"
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.draught}
                  error={errors.draught}
                  required
                  onChange={(v) => setField("draught", v)}
                  placeholder="1.8"
                />

                {/* Boat type select */}
                <div>
                  <label
                    htmlFor="boatType"
                    className="mb-1.5 block text-sm font-semibold text-foreground"
                  >
                    Type *
                  </label>
                  <select
                    id="boatType"
                    value={form.boatType}
                    onChange={(e) => setField("boatType", e.target.value)}
                    className={`h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/20 ${
                      errors.boatType
                        ? "border-red-400 focus:ring-red-200"
                        : "border-border focus:border-primary/50"
                    }`}
                  >
                    <option value="">Sélectionner / Select</option>
                    <option value="Monocoque">Monocoque</option>
                    <option value="Catamaran">Catamaran</option>
                    <option value="Yacht">Yacht</option>
                    <option value="Bateau moteur">Bateau moteur</option>
                    <option value="Voilier">Voilier</option>
                    <option value="Autre">Autre</option>
                  </select>
                  {errors.boatType && (
                    <p data-field-error className="mt-1 text-xs text-red-500">
                      {errors.boatType}
                    </p>
                  )}
                </div>

                <FormField
                  label="Date d'arrivée / Check-in Date"
                  id="checkIn"
                  type="date"
                  value={form.checkIn}
                  error={errors.checkIn}
                  required
                  onChange={(v) => setField("checkIn", v)}
                />
                <FormField
                  label="Date de sortie / Check-out Date"
                  id="checkOut"
                  type="date"
                  value={form.checkOut}
                  error={errors.checkOut}
                  required
                  onChange={(v) => setField("checkOut", v)}
                />

                {/* Deposit */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-foreground">
                    Acompte / Deposit (Min 300€ / 1 000 TND) *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={form.depositAmount}
                      onChange={(e) => setField("depositAmount", e.target.value)}
                      placeholder={form.depositCurrency === "EUR" ? "300" : "1000"}
                      className={`h-10 flex-1 rounded-lg border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/20 ${
                        errors.depositAmount
                          ? "border-red-400 focus:ring-red-200"
                          : "border-border focus:border-primary/50"
                      }`}
                    />
                    <select
                      value={form.depositCurrency}
                      onChange={(e) => setField("depositCurrency", e.target.value as "EUR" | "TND")}
                      className="h-10 rounded-lg border border-border bg-background px-3 text-sm font-semibold outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="EUR">EUR</option>
                      <option value="TND">TND</option>
                    </select>
                  </div>
                  {errors.depositAmount && (
                    <p data-field-error className="mt-1 text-xs text-red-500">
                      {errors.depositAmount}
                    </p>
                  )}
                </div>

                {/* Special requirements */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="specialRequirements"
                    className="mb-1.5 block text-sm font-semibold text-foreground"
                  >
                    Besoins spéciaux / Special Requirements
                  </label>
                  <textarea
                    id="specialRequirements"
                    value={form.specialRequirements}
                    onChange={(e) => setField("specialRequirements", e.target.value)}
                    rows={4}
                    placeholder="Let us know if you have any special requirements..."
                    className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Newsletter */}
                <div className="sm:col-span-2">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={form.newsletter}
                      onChange={(e) => setField("newsletter", e.target.checked)}
                      className="size-4 rounded border-border accent-primary"
                    />
                    <span className="text-sm font-semibold text-foreground">
                      S'abonner à la newsletter / Subscribe to newsletter
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit error */}
          {submitError && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
              {submitError}
            </div>
          )}

          {/* Submit button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={submitting}
              className="h-14 w-full rounded-xl bg-primary text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-ocean disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Envoi en cours..." : "Book Now / Réserver"}
            </button>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Un membre de l'équipe de la capitainerie vous contactera pour confirmer votre
              réservation.
            </p>
          </div>
        </form>

        {/* Contact block */}
        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="h-1 bg-gradient-to-r from-primary to-turquoise" />
          <div className="p-6">
            <h3 className="font-black text-primary">Capitainerie Marina Cap Monastir</h3>
            <p className="mt-1 text-sm text-muted-foreground">BP.N°60 - 5000 Monastir - Tunisie</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <a
                href="tel:+21673462305"
                className="flex items-center gap-2.5 text-sm font-semibold text-foreground transition hover:text-primary"
              >
                <Phone className="size-4 text-accent" />
                (+216) 73 46 23 05
              </a>
              <a
                href="tel:+21673462066"
                className="flex items-center gap-2.5 text-sm font-semibold text-foreground transition hover:text-primary"
              >
                <Phone className="size-4 text-accent" />
                (+216) 73 46 20 66
              </a>
              <a
                href="mailto:capitainerie@marinamonastir.tn"
                className="flex items-center gap-2.5 text-sm font-semibold text-primary transition hover:text-accent sm:col-span-2"
              >
                <Mail className="size-4 text-accent" />
                capitainerie@marinamonastir.tn
              </a>
            </div>
          </div>
        </div>
      </main>
      {import.meta.env.DEV && (
        <div className="fixed bottom-2 right-2 z-[9999] rounded bg-black/70 px-2 py-1 text-[10px] text-white">
          /port-de-plaisance/reservation · ReservationPortPage
        </div>
      )}
    </div>
  );
}

function SuccessCard({ success }: { success: SuccessData }) {
  const fmt = (d: string) =>
    new Date(d + "T12:00:00").toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-16 md:px-6">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-premium)]">
          <div className="h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" />
          <div className="p-8 text-center md:p-12">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="size-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-black text-primary">Demande envoyée</h1>
            <p className="hidden">
              {success.reservationNumber.endsWith("-MAIL")
                ? "Votre client de messagerie a été ouvert avec les détails pré-remplis. Envoyez l'email pour finaliser votre demande."
                : "Votre demande de réservation portuaire a été envoyée."}
              <br />
              Un membre de l'équipe de la capitainerie vous contactera sous 24h.
            </p>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Votre demande a \u00e9t\u00e9 envoy\u00e9e \u00e0 la capitainerie. Nous vous
              contacterons bient\u00f4t.
            </p>

            {success.deliveryMode !== "email" && (
              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left text-sm leading-6 text-amber-900">
                <div className="font-black">Configuration email requise</div>
                <p className="mt-1">
                  {success.setupInstructions ??
                    "Configurez EMAIL_PROVIDER_API_KEY ou les identifiants SMTP et CAPITAINERIE_EMAIL dans les secrets Supabase. La demande a ete sauvegardee en fallback."}
                </p>
              </div>
            )}

            {/* Reservation summary */}
            <div className="mt-8 rounded-xl border border-border bg-secondary/40 p-5 text-left">
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-semibold text-muted-foreground">N° de réservation</dt>
                  <dd className="font-black text-primary">{success.reservationNumber}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-semibold text-muted-foreground">Bateau</dt>
                  <dd className="font-semibold">{success.boatName}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-semibold text-muted-foreground">Arrivée</dt>
                  <dd className="font-semibold">{fmt(success.checkIn)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-semibold text-muted-foreground">Départ</dt>
                  <dd className="font-semibold">{fmt(success.checkOut)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-semibold text-muted-foreground">Acompte</dt>
                  <dd className="font-semibold">
                    {success.depositAmount} {success.depositCurrency}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Contact capitainerie */}
            <div className="mt-6 rounded-xl border border-primary/15 bg-primary/5 p-5 text-left">
              <h3 className="font-black text-primary">Contacter la capitainerie</h3>
              <div className="mt-3 space-y-2">
                <a
                  href="tel:+21673462305"
                  className="flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-primary"
                >
                  <Phone className="size-4 text-accent" />
                  (+216) 73 46 23 05
                </a>
                <a
                  href="tel:+21673462066"
                  className="flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-primary"
                >
                  <Phone className="size-4 text-accent" />
                  (+216) 73 46 20 66
                </a>
                <a
                  href="mailto:capitainerie@marinamonastir.tn"
                  className="flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-accent"
                >
                  <Mail className="size-4 text-accent" />
                  capitainerie@marinamonastir.tn
                </a>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="/"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-ocean"
              >
                Retour à l'accueil
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FormField({
  label,
  id,
  value,
  error,
  required,
  type = "text",
  placeholder,
  min,
  step,
  onChange,
}: {
  label: string;
  id: string;
  value: string;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  min?: string;
  step?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-foreground">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        step={step}
        className={`h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/20 ${
          error ? "border-red-400 focus:ring-red-200" : "border-border focus:border-primary/50"
        }`}
      />
      {error && (
        <p data-field-error className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
