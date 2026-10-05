import { createFileRoute } from "@tanstack/react-router";
import {
  Anchor,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Mail,
  Phone,
  Sailboat,
  User,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { getCurrentSessionProfile } from "@/lib/auth/profilesAuth";
import { headT } from "@/lib/i18n/head";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { tr, type Localized } from "@/lib/i18n/locale";
import { getSupabaseOrNull } from "@/lib/supabase/serviceHelpers";
import { cn } from "@/lib/utils";

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
  if (!form.lastName.trim()) errors.lastName = tr("Nom requis", "Last name required");
  if (!form.firstName.trim()) errors.firstName = tr("Prénom requis", "First name required");
  if (!form.dateOfBirth)
    errors.dateOfBirth = tr("Date de naissance requise", "Date of birth required");
  if (!form.nationality.trim())
    errors.nationality = tr("Nationalité requise", "Nationality required");
  if (!form.phone.trim()) errors.phone = tr("Téléphone requis", "Phone required");
  if (!form.email.trim()) {
    errors.email = tr("Email requis", "Email required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = tr("Email invalide", "Invalid email");
  }
  if (form.email !== form.confirmEmail) {
    errors.confirmEmail = tr("Les emails ne correspondent pas", "Emails do not match");
  }
  if (!form.boatName.trim()) errors.boatName = tr("Nom du bateau requis", "Boat name required");
  if (!form.flag.trim()) errors.flag = tr("Pavillon requis", "Flag required");
  const length = parseFloat(form.length);
  if (!form.length || isNaN(length) || length <= 0)
    errors.length = tr("Longueur invalide (doit être > 0)", "Invalid length (must be > 0)");
  const width = parseFloat(form.width);
  if (!form.width || isNaN(width) || width <= 0)
    errors.width = tr("Largeur invalide (doit être > 0)", "Invalid width (must be > 0)");
  const draught = parseFloat(form.draught);
  if (!form.draught || isNaN(draught) || draught <= 0)
    errors.draught = tr("Tirant d'eau invalide (doit être > 0)", "Invalid draught (must be > 0)");
  if (!form.boatType) errors.boatType = tr("Type de bateau requis", "Boat type required");
  if (!form.checkIn) errors.checkIn = tr("Date d'arrivée requise", "Arrival date required");
  if (!form.checkOut) errors.checkOut = tr("Date de sortie requise", "Departure date required");
  if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn)
    errors.checkOut = tr(
      "La date de sortie doit être après la date d'arrivée",
      "The departure date must be after the arrival date",
    );
  const deposit = parseFloat(form.depositAmount);
  if (!form.depositAmount || isNaN(deposit) || deposit <= 0) {
    errors.depositAmount = tr("Acompte requis", "Deposit required");
  } else if (form.depositCurrency === "EUR" && deposit < 300) {
    errors.depositAmount = tr("Acompte minimum 300 €", "Minimum deposit €300");
  } else if (form.depositCurrency === "TND" && deposit < 1000) {
    errors.depositAmount = tr("Acompte minimum 1 000 TND", "Minimum deposit 1,000 TND");
  }
  return errors;
}

// The form is filled in 3 steps; every field belongs to exactly one step.
const STEPS: { id: string; icon: LucideIcon; title: Localized; fields: (keyof FormData)[] }[] = [
  {
    id: "client",
    icon: User,
    title: { fr: "Client", en: "Client" },
    fields: [
      "lastName",
      "firstName",
      "dateOfBirth",
      "nationality",
      "phone",
      "email",
      "confirmEmail",
    ],
  },
  {
    id: "boat",
    icon: Sailboat,
    title: { fr: "Bateau", en: "Boat" },
    fields: ["boatName", "flag", "length", "width", "draught", "boatType"],
  },
  {
    id: "stay",
    icon: CalendarDays,
    title: { fr: "Dates & acompte", en: "Dates & deposit" },
    fields: [
      "checkIn",
      "checkOut",
      "depositAmount",
      "depositCurrency",
      "specialRequirements",
      "newsletter",
    ],
  },
];
const LAST_STEP = STEPS.length - 1;

function isStepField(step: number, field: string) {
  return (STEPS[step].fields as string[]).includes(field);
}

/** Errors of one step only ("Suivant" checks the current step before moving on). */
function validateStep(form: FormData, step: number) {
  return Object.fromEntries(
    Object.entries(validate(form)).filter(([field]) => isStepField(step, field)),
  );
}

/** Splits the account's full name: the first word is the first name, the rest the last name. */
function splitFullName(fullName: string) {
  if (fullName.includes("@")) return { firstName: "", lastName: "" }; // profile without a name
  const [firstName = "", ...rest] = fullName.trim().split(/\s+/);
  return { firstName, lastName: rest.join(" ") };
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
        instructions: tr(
          "Vérifiez que l'Edge Function send-capitainerie-reservation-email est déployée et que EMAIL_PROVIDER_API_KEY ou les identifiants SMTP sont configurés.",
          "Check that the send-capitainerie-reservation-email Edge Function is deployed and that EMAIL_PROVIDER_API_KEY or the SMTP credentials are configured.",
        ),
      };
    }

    return (
      data ?? {
        emailSent: false,
        instructions: tr(
          "L'Edge Function n'a pas retourné de réponse. La réservation sera sauvegardée en fallback.",
          "The Edge Function returned no response. The booking will be saved as a fallback.",
        ),
      }
    );
  } catch (error) {
    console.error("[Capitainerie] Email submit failed", error);
    return {
      emailSent: false,
      error: error instanceof Error ? error.message : tr("Erreur inconnue", "Unknown error"),
      instructions: tr(
        "Configurez EMAIL_PROVIDER_API_KEY ou les identifiants SMTP, CAPITAINERIE_EMAIL et redéployez l'Edge Function send-capitainerie-reservation-email.",
        "Set EMAIL_PROVIDER_API_KEY or the SMTP credentials and CAPITAINERIE_EMAIL, then redeploy the send-capitainerie-reservation-email Edge Function.",
      ),
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
      {
        title: headT(
          "Réservation Port de Plaisance — Marina Cap Monastir",
          "Berth booking — Marina Cap Monastir",
        ),
      },
      {
        name: "description",
        content: headT(
          "Réservez votre place au port de plaisance de Marina Cap Monastir. Formulaire de réservation pour plaisanciers, escale, passage, hivernage.",
          "Book your berth at the Marina Cap Monastir harbour. Booking form for boaters: stopover, transit, wintering.",
        ),
      },
    ],
  }),
  component: ReservationPortPage,
});

function ReservationPortPage() {
  const { t, pick, locale } = useI18n();
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<SuccessData | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [prefilled, setPrefilled] = useState(false);
  const stepsRef = useRef<HTMLDivElement>(null);
  // What to bring into view once the next render is on screen: the first error or the new step.
  const pendingScroll = useRef<"error" | "step" | null>(null);

  // Signed-in clients get their name and email filled in (only empty fields, still editable).
  useEffect(() => {
    let mounted = true;
    void getCurrentSessionProfile()
      .then((context) => {
        if (!mounted || !context || context.profile.role !== "client") return;
        const name = splitFullName(context.profile.fullName);
        const email = context.profile.email.trim();
        setForm((prev) => {
          const fillEmail = !prev.email && !prev.confirmEmail;
          return {
            ...prev,
            firstName: prev.firstName || name.firstName,
            lastName: prev.lastName || name.lastName,
            email: fillEmail ? email : prev.email,
            confirmEmail: fillEmail ? email : prev.confirmEmail,
          };
        });
        setPrefilled(Boolean(name.firstName || email));
      })
      .catch(() => {
        // Not signed in or Supabase unreachable: the form simply starts empty.
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const target = pendingScroll.current;
    if (!target) return;
    pendingScroll.current = null;
    if (target === "error") {
      document
        .querySelector("[data-field-error]")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      stepsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step, errors]);

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  const goToStep = (next: number) => {
    pendingScroll.current = "step";
    setStep(next);
  };

  // "Suivant" (or Enter): check only the current step, keep the errors already shown elsewhere.
  const goNext = () => {
    const stepErrors = validateStep(form, step);
    setErrors((prev) => ({
      ...Object.fromEntries(Object.entries(prev).filter(([field]) => !isStepField(step, field))),
      ...stepErrors,
    }));
    if (Object.keys(stepErrors).length > 0) {
      pendingScroll.current = "error";
      return;
    }
    goToStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < LAST_STEP) {
      goNext();
      return;
    }
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Go back to the first step that still needs a correction.
      const errorStep = STEPS.findIndex((s) => s.fields.some((field) => validationErrors[field]));
      if (errorStep !== -1) setStep(errorStep);
      pendingScroll.current = "error";
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
          setupInstructions: t(
            "Supabase n'est pas configuré. Configurez Supabase et l'Edge Function send-capitainerie-reservation-email pour envoyer l'email serveur automatiquement.",
            "Supabase is not configured. Set up Supabase and the send-capitainerie-reservation-email Edge Function to send the email automatically.",
          ),
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
            t(
              "Erreur lors de l'envoi. Veuillez réessayer ou contacter la capitainerie.",
              "Sending failed. Please try again or contact the harbour office.",
            ),
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
          t(
            "Configurez EMAIL_PROVIDER_API_KEY ou les identifiants SMTP, CAPITAINERIE_EMAIL et redéployez l'Edge Function send-capitainerie-reservation-email.",
            "Set EMAIL_PROVIDER_API_KEY or the SMTP credentials and CAPITAINERIE_EMAIL, then redeploy the send-capitainerie-reservation-email Edge Function.",
          ),
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : t("Erreur inattendue. Veuillez réessayer.", "Unexpected error. Please try again.");
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
            {t("Port de Plaisance", "Marina")}
          </div>
          <h1 className="page-title">{t("Réservation Port de Plaisance", "Berth booking")}</h1>
          <p className="mt-3 text-base text-white/75">
            {t("Saisissez vos coordonnées / Enter your details", "Enter your details")}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <form onSubmit={handleSubmit} noValidate>
          {/* Stepper */}
          <div
            ref={stepsRef}
            className="mb-6 scroll-mt-24 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5"
          >
            <p
              aria-live="polite"
              className="text-xs font-black uppercase tracking-[0.16em] text-muted-foreground"
            >
              {t(`Étape ${step + 1} sur ${STEPS.length}`, `Step ${step + 1} of ${STEPS.length}`)}
              <span className="text-primary sm:hidden"> · {pick(STEPS[step].title)}</span>
            </p>
            <ol className="mt-3 flex items-center">
              {STEPS.map((s, index) => {
                const Icon = s.icon;
                const done = index < step;
                const current = index === step;
                const badge = (
                  <>
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-full border-2 transition",
                        done && "border-primary bg-primary text-primary-foreground",
                        current && "border-accent bg-accent/15 text-primary",
                        !done && !current && "border-border bg-background text-muted-foreground",
                      )}
                    >
                      {done ? <Check className="size-4" /> : <Icon className="size-4" />}
                    </span>
                    <span
                      className={cn(
                        "sr-only text-sm font-bold sm:not-sr-only",
                        current
                          ? "text-primary"
                          : done
                            ? "text-foreground"
                            : "text-muted-foreground",
                      )}
                    >
                      {pick(s.title)}
                    </span>
                  </>
                );
                return (
                  <li
                    key={s.id}
                    aria-current={current ? "step" : undefined}
                    className={cn("flex items-center", index < LAST_STEP && "flex-1")}
                  >
                    {done ? (
                      <button
                        type="button"
                        onClick={() => goToStep(index)}
                        disabled={submitting}
                        title={t("Revenir à cette étape", "Back to this step")}
                        className="flex items-center gap-2 rounded-full transition hover:opacity-80"
                      >
                        {badge}
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">{badge}</div>
                    )}
                    {index < LAST_STEP && (
                      <span
                        aria-hidden
                        className={cn(
                          "mx-2 h-0.5 flex-1 rounded-full transition sm:mx-3",
                          done ? "bg-primary" : "bg-border",
                        )}
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Step 1 — Coordonnées client */}
          {step === 0 && (
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-premium)]">
              <div className="h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" />
              <div className="p-6 md:p-8">
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <User className="size-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-primary">
                      {t("Coordonnées client", "Client information")}
                    </h2>
                    {/* English subtitle kept on the French page (bilingual form) */}
                    {locale === "fr" && (
                      <p className="text-sm text-muted-foreground">Client information</p>
                    )}
                  </div>
                </div>

                {prefilled && (
                  <p className="mb-5 rounded-lg border border-primary/15 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary">
                    {t(
                      "Nom et email repris de votre compte — vous pouvez les modifier.",
                      "Name and email taken from your account — you can change them.",
                    )}
                  </p>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label={t("Nom / Name", "Last name")}
                    id="lastName"
                    value={form.lastName}
                    error={errors.lastName}
                    required
                    onChange={(v) => setField("lastName", v)}
                    placeholder="DUPONT"
                  />
                  <FormField
                    label={t("Prénom / First Name", "First name")}
                    id="firstName"
                    value={form.firstName}
                    error={errors.firstName}
                    required
                    onChange={(v) => setField("firstName", v)}
                    placeholder="Jean"
                  />
                  <FormField
                    label={t("Date de naissance / Date of Birth", "Date of birth")}
                    id="dateOfBirth"
                    type="date"
                    value={form.dateOfBirth}
                    error={errors.dateOfBirth}
                    required
                    onChange={(v) => setField("dateOfBirth", v)}
                  />
                  <FormField
                    label={t("Nationalité / Nationality", "Nationality")}
                    id="nationality"
                    value={form.nationality}
                    error={errors.nationality}
                    required
                    onChange={(v) => setField("nationality", v)}
                    placeholder="Tunisia"
                  />
                  <FormField
                    label={t("Téléphone / Phone", "Phone")}
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
                    placeholder={t("nom@exemple.com", "name@example.com")}
                  />
                  <div className="sm:col-span-2">
                    <FormField
                      label={t("Confirmer Email / Confirm Email", "Confirm email")}
                      id="confirmEmail"
                      type="email"
                      value={form.confirmEmail}
                      error={errors.confirmEmail}
                      required
                      onChange={(v) => setField("confirmEmail", v)}
                      placeholder={t("nom@exemple.com", "name@example.com")}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Informations bateau */}
          {step === 1 && (
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-premium)]">
              <div className="h-1.5 bg-gradient-to-r from-primary via-turquoise to-accent" />
              <div className="p-6 md:p-8">
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Sailboat className="size-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-primary">
                      {t("Informations sur le Bateau", "Boat information")}
                    </h2>
                    {locale === "fr" && (
                      <p className="text-sm text-muted-foreground">Boat information</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label={t("Nom du bateau / Boat Name", "Boat name")}
                    id="boatName"
                    value={form.boatName}
                    error={errors.boatName}
                    required
                    onChange={(v) => setField("boatName", v)}
                    placeholder="Sea Dream"
                  />
                  <FormField
                    label={t("Pavillon / Flag", "Flag")}
                    id="flag"
                    value={form.flag}
                    error={errors.flag}
                    required
                    onChange={(v) => setField("flag", v)}
                    placeholder={t("Tunisie", "Tunisia")}
                  />
                  <FormField
                    label={t("Longueur / Length (m)", "Length (m)")}
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
                    label={t("Largeur / Width (m)", "Width (m)")}
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
                    label={t("Tirant d'eau / Draught (m)", "Draught (m)")}
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
                      <option value="">{t("Sélectionner / Select", "Select")}</option>
                      <option value="Monocoque">{t("Monocoque", "Monohull")}</option>
                      <option value="Catamaran">Catamaran</option>
                      <option value="Yacht">Yacht</option>
                      <option value="Bateau moteur">{t("Bateau moteur", "Motorboat")}</option>
                      <option value="Voilier">{t("Voilier", "Sailboat")}</option>
                      <option value="Autre">{t("Autre", "Other")}</option>
                    </select>
                    {errors.boatType && (
                      <p data-field-error className="mt-1 text-xs text-red-500">
                        {errors.boatType}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Dates & acompte */}
          {step === 2 && (
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-premium)]">
              <div className="h-1.5 bg-gradient-to-r from-turquoise via-primary to-accent" />
              <div className="p-6 md:p-8">
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <CalendarDays className="size-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-primary">
                      {t("Dates & acompte", "Dates & deposit")}
                    </h2>
                    {locale === "fr" && (
                      <p className="text-sm text-muted-foreground">Dates & deposit</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label={t("Date d'arrivée / Check-in Date", "Arrival date")}
                    id="checkIn"
                    type="date"
                    value={form.checkIn}
                    error={errors.checkIn}
                    required
                    onChange={(v) => setField("checkIn", v)}
                  />
                  <FormField
                    label={t("Date de sortie / Check-out Date", "Departure date")}
                    id="checkOut"
                    type="date"
                    value={form.checkOut}
                    error={errors.checkOut}
                    required
                    onChange={(v) => setField("checkOut", v)}
                  />

                  {/* Deposit */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="depositAmount"
                      className="mb-1.5 block text-sm font-semibold text-foreground"
                    >
                      {t(
                        "Acompte / Deposit (Min 300€ / 1 000 TND)",
                        "Deposit (min €300 / 1,000 TND)",
                      )}{" "}
                      *
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="depositAmount"
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
                        aria-label={t("Devise de l'acompte", "Deposit currency")}
                        value={form.depositCurrency}
                        onChange={(e) =>
                          setField("depositCurrency", e.target.value as "EUR" | "TND")
                        }
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
                      {t("Besoins spéciaux / Special Requirements", "Special requirements")}
                    </label>
                    <textarea
                      id="specialRequirements"
                      value={form.specialRequirements}
                      onChange={(e) => setField("specialRequirements", e.target.value)}
                      rows={4}
                      placeholder={t(
                        "Indiquez-nous vos besoins particuliers...",
                        "Let us know if you have any special requirements...",
                      )}
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
                        {t(
                          "S'abonner à la newsletter / Subscribe to newsletter",
                          "Subscribe to the newsletter",
                        )}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit error */}
          {submitError && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
              {submitError}
            </div>
          )}

          {/* Step navigation — the main button is the form's submit button so Enter moves forward */}
          <div className="mt-6">
            <div className="flex gap-3">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => goToStep(step - 1)}
                  disabled={submitting}
                  className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 text-base font-bold text-primary shadow-sm transition hover:border-primary/40 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ArrowLeft className="size-4" />
                  {t("Précédent", "Back")}
                </button>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-ocean disabled:cursor-not-allowed disabled:opacity-60"
              >
                {step < LAST_STEP ? (
                  <>
                    {t("Suivant", "Next")}
                    <ArrowRight className="size-4" />
                  </>
                ) : submitting ? (
                  t("Envoi en cours...", "Sending...")
                ) : (
                  t("Book Now / Réserver", "Book now")
                )}
              </button>
            </div>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              {t(
                "Un membre de l'équipe de la capitainerie vous contactera pour confirmer votre réservation.",
                "A member of the harbour office team will contact you to confirm your booking.",
              )}
            </p>
          </div>
        </form>

        {/* Contact block */}
        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="h-1 bg-gradient-to-r from-primary to-turquoise" />
          <div className="p-6">
            <h3 className="font-black text-primary">
              {t("Capitainerie Marina Cap Monastir", "Marina Cap Monastir harbour office")}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("BP.N°60 - 5000 Monastir - Tunisie", "PO Box 60 - 5000 Monastir - Tunisia")}
            </p>
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
  const { t, formatDate } = useI18n();
  const fmt = (d: string) => formatDate(d, { day: "2-digit", month: "long", year: "numeric" });

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
            <h1 className="text-3xl font-black text-primary">
              {t("Demande envoyée", "Request sent")}
            </h1>
            <p className="hidden">
              {success.reservationNumber.endsWith("-MAIL")
                ? "Votre client de messagerie a été ouvert avec les détails pré-remplis. Envoyez l'email pour finaliser votre demande."
                : "Votre demande de réservation portuaire a été envoyée."}
              <br />
              Un membre de l'équipe de la capitainerie vous contactera sous 24h.
            </p>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {t(
                "Votre demande a été envoyée à la capitainerie. Nous vous contacterons bientôt.",
                "Your request has been sent to the harbour office. We will contact you soon.",
              )}
            </p>

            {success.deliveryMode !== "email" && (
              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left text-sm leading-6 text-amber-900">
                <div className="font-black">
                  {t("Configuration email requise", "Email setup required")}
                </div>
                <p className="mt-1">
                  {success.setupInstructions ??
                    t(
                      "Configurez EMAIL_PROVIDER_API_KEY ou les identifiants SMTP et CAPITAINERIE_EMAIL dans les secrets Supabase. La demande a été sauvegardée en fallback.",
                      "Set EMAIL_PROVIDER_API_KEY or the SMTP credentials and CAPITAINERIE_EMAIL in the Supabase secrets. The request was saved as a fallback.",
                    )}
                </p>
              </div>
            )}

            {/* Reservation summary */}
            <div className="mt-8 rounded-xl border border-border bg-secondary/40 p-5 text-left">
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-semibold text-muted-foreground">
                    {t("N° de réservation", "Booking no.")}
                  </dt>
                  <dd className="font-black text-primary">{success.reservationNumber}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-semibold text-muted-foreground">{t("Bateau", "Boat")}</dt>
                  <dd className="font-semibold">{success.boatName}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-semibold text-muted-foreground">{t("Arrivée", "Arrival")}</dt>
                  <dd className="font-semibold">{fmt(success.checkIn)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-semibold text-muted-foreground">
                    {t("Départ", "Departure")}
                  </dt>
                  <dd className="font-semibold">{fmt(success.checkOut)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-semibold text-muted-foreground">{t("Acompte", "Deposit")}</dt>
                  <dd className="font-semibold">
                    {success.depositAmount} {success.depositCurrency}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Contact capitainerie */}
            <div className="mt-6 rounded-xl border border-primary/15 bg-primary/5 p-5 text-left">
              <h3 className="font-black text-primary">
                {t("Contacter la capitainerie", "Contact the harbour office")}
              </h3>
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
                {t("Retour à l'accueil", "Back to home")}
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
