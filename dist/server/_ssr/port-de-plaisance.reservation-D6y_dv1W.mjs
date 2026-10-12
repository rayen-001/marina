import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SiteHeader } from "./site-header-DrEtGnYb.mjs";
import { u as useI18n, p as getCurrentSessionProfile, c as cn, v as getSupabaseOrNull, N as tr } from "./router-CgbkQim6.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { A as Anchor, aq as User, N as Sailboat, C as CalendarDays, ar as Check, an as ArrowLeft, q as ArrowRight, Y as Phone, Z as Mail, a1 as CircleCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-4up-b2hM.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
const initialForm = {
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
  newsletter: false
};
function validate(form) {
  const errors = {};
  if (!form.lastName.trim()) errors.lastName = tr("Nom requis", "Last name required");
  if (!form.firstName.trim()) errors.firstName = tr("Prénom requis", "First name required");
  if (!form.dateOfBirth) errors.dateOfBirth = tr("Date de naissance requise", "Date of birth required");
  if (!form.nationality.trim()) errors.nationality = tr("Nationalité requise", "Nationality required");
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
  if (!form.length || isNaN(length) || length <= 0) errors.length = tr("Longueur invalide (doit être > 0)", "Invalid length (must be > 0)");
  const width = parseFloat(form.width);
  if (!form.width || isNaN(width) || width <= 0) errors.width = tr("Largeur invalide (doit être > 0)", "Invalid width (must be > 0)");
  const draught = parseFloat(form.draught);
  if (!form.draught || isNaN(draught) || draught <= 0) errors.draught = tr("Tirant d'eau invalide (doit être > 0)", "Invalid draught (must be > 0)");
  if (!form.boatType) errors.boatType = tr("Type de bateau requis", "Boat type required");
  if (!form.checkIn) errors.checkIn = tr("Date d'arrivée requise", "Arrival date required");
  if (!form.checkOut) errors.checkOut = tr("Date de sortie requise", "Departure date required");
  if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn) errors.checkOut = tr("La date de sortie doit être après la date d'arrivée", "The departure date must be after the arrival date");
  const deposit = parseFloat(form.depositAmount);
  if (!form.depositAmount || isNaN(deposit) || deposit <= 0) {
    errors.depositAmount = tr("Acompte requis", "Deposit required");
  } else if (form.depositCurrency === "EUR" && deposit < 300) {
    errors.depositAmount = tr("Acompte minimum 300 €", "Minimum deposit €300");
  } else if (form.depositCurrency === "TND" && deposit < 1e3) {
    errors.depositAmount = tr("Acompte minimum 1 000 TND", "Minimum deposit 1,000 TND");
  }
  return errors;
}
const STEPS = [{
  id: "client",
  icon: User,
  title: {
    fr: "Client",
    en: "Client"
  },
  fields: ["lastName", "firstName", "dateOfBirth", "nationality", "phone", "email", "confirmEmail"]
}, {
  id: "boat",
  icon: Sailboat,
  title: {
    fr: "Bateau",
    en: "Boat"
  },
  fields: ["boatName", "flag", "length", "width", "draught", "boatType"]
}, {
  id: "stay",
  icon: CalendarDays,
  title: {
    fr: "Dates & acompte",
    en: "Dates & deposit"
  },
  fields: ["checkIn", "checkOut", "depositAmount", "depositCurrency", "specialRequirements", "newsletter"]
}];
const LAST_STEP = STEPS.length - 1;
function isStepField(step, field) {
  return STEPS[step].fields.includes(field);
}
function validateStep(form, step) {
  return Object.fromEntries(Object.entries(validate(form)).filter(([field]) => isStepField(step, field)));
}
function splitFullName(fullName) {
  if (fullName.includes("@")) return {
    firstName: "",
    lastName: ""
  };
  const [firstName = "", ...rest] = fullName.trim().split(/\s+/);
  return {
    firstName,
    lastName: rest.join(" ")
  };
}
async function sendCapitainerieEmail(supabase, form) {
  try {
    const {
      data,
      error
    } = await supabase.functions.invoke("send-capitainerie-reservation-email", {
      body: buildCapitainerieEmailPayload(form)
    });
    if (error) {
      console.error("[Capitainerie] Edge Function error", error);
      return {
        emailSent: false,
        error: error.message,
        instructions: tr("Vérifiez que l'Edge Function send-capitainerie-reservation-email est déployée et que EMAIL_PROVIDER_API_KEY ou les identifiants SMTP sont configurés.", "Check that the send-capitainerie-reservation-email Edge Function is deployed and that EMAIL_PROVIDER_API_KEY or the SMTP credentials are configured.")
      };
    }
    return data ?? {
      emailSent: false,
      instructions: tr("L'Edge Function n'a pas retourné de réponse. La réservation sera sauvegardée en fallback.", "The Edge Function returned no response. The booking will be saved as a fallback.")
    };
  } catch (error) {
    console.error("[Capitainerie] Email submit failed", error);
    return {
      emailSent: false,
      error: error instanceof Error ? error.message : tr("Erreur inconnue", "Unknown error"),
      instructions: tr("Configurez EMAIL_PROVIDER_API_KEY ou les identifiants SMTP, CAPITAINERIE_EMAIL et redéployez l'Edge Function send-capitainerie-reservation-email.", "Set EMAIL_PROVIDER_API_KEY or the SMTP credentials and CAPITAINERIE_EMAIL, then redeploy the send-capitainerie-reservation-email Edge Function.")
    };
  }
}
function buildCapitainerieEmailPayload(form) {
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
    submittedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function ReservationPortPage() {
  const {
    t,
    pick,
    locale
  } = useI18n();
  const [form, setForm] = reactExports.useState(initialForm);
  const [step, setStep] = reactExports.useState(0);
  const [errors, setErrors] = reactExports.useState({});
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(null);
  const [submitError, setSubmitError] = reactExports.useState(null);
  const [prefilled, setPrefilled] = reactExports.useState(false);
  const stepsRef = reactExports.useRef(null);
  const pendingScroll = reactExports.useRef(null);
  reactExports.useEffect(() => {
    let mounted = true;
    void getCurrentSessionProfile().then((context) => {
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
          confirmEmail: fillEmail ? email : prev.confirmEmail
        };
      });
      setPrefilled(Boolean(name.firstName || email));
    }).catch(() => {
    });
    return () => {
      mounted = false;
    };
  }, []);
  reactExports.useEffect(() => {
    const target = pendingScroll.current;
    if (!target) return;
    pendingScroll.current = null;
    if (target === "error") {
      document.querySelector("[data-field-error]")?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    } else {
      stepsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [step, errors]);
  const setField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
    setErrors((prev) => {
      const next = {
        ...prev
      };
      delete next[key];
      return next;
    });
  };
  const goToStep = (next) => {
    pendingScroll.current = "step";
    setStep(next);
  };
  const goNext = () => {
    const stepErrors = validateStep(form, step);
    setErrors((prev) => ({
      ...Object.fromEntries(Object.entries(prev).filter(([field]) => !isStepField(step, field))),
      ...stepErrors
    }));
    if (Object.keys(stepErrors).length > 0) {
      pendingScroll.current = "error";
      return;
    }
    goToStep(step + 1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < LAST_STEP) {
      goNext();
      return;
    }
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
        const subject = encodeURIComponent(`Demande réservation port — ${form.boatName} — ${form.checkIn}`);
        const body = encodeURIComponent(`Nom: ${form.lastName} ${form.firstName}
Naissance: ${form.dateOfBirth}
Nationalité: ${form.nationality}
Téléphone: ${form.phone}
Email: ${form.email}
Confirmation email: ${form.confirmEmail}

Bateau: ${form.boatName} (${form.boatType})
Pavillon: ${form.flag}
Longueur: ${form.length} m  Largeur: ${form.width} m  Tirant: ${form.draught} m

Arrivée: ${form.checkIn}  Départ: ${form.checkOut}
Acompte: ${form.depositAmount} ${form.depositCurrency}
Date de soumission: ${(/* @__PURE__ */ new Date()).toISOString()}

` + (form.specialRequirements ? `Besoins spéciaux: ${form.specialRequirements}
` : ""));
        window.location.href = `mailto:capitainerie@marinamonastir.tn?subject=${subject}&body=${body}`;
        setSuccess({
          reservationNumber: `PORT-${(/* @__PURE__ */ new Date()).getFullYear()}-MAIL`,
          boatName: form.boatName,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          depositAmount: form.depositAmount,
          depositCurrency: form.depositCurrency,
          deliveryMode: "mailto",
          setupInstructions: t("Supabase n'est pas configuré. Configurez Supabase et l'Edge Function send-capitainerie-reservation-email pour envoyer l'email serveur automatiquement.", "Supabase is not configured. Set up Supabase and the send-capitainerie-reservation-email Edge Function to send the email automatically.")
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
          deliveryMode: "email"
        });
        return;
      }
      console.warn("[Capitainerie] Email provider not configured or Edge Function failed. Saving reservation in database fallback.", emailResult);
      const {
        data,
        error
      } = await supabase.rpc("create_port_reservation", {
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
        p_newsletter: form.newsletter
      });
      if (error) {
        if (false) ;
        throw new Error(error.message || t("Erreur lors de l'envoi. Veuillez réessayer ou contacter la capitainerie.", "Sending failed. Please try again or contact the harbour office."));
      }
      const result = data;
      setSuccess({
        reservationNumber: result?.reservation_number ?? `PORT-${Date.now()}`,
        boatName: form.boatName,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        depositAmount: form.depositAmount,
        depositCurrency: form.depositCurrency,
        deliveryMode: "database_fallback",
        setupInstructions: emailResult.instructions ?? t("Configurez EMAIL_PROVIDER_API_KEY ou les identifiants SMTP, CAPITAINERIE_EMAIL et redéployez l'Edge Function send-capitainerie-reservation-email.", "Set EMAIL_PROVIDER_API_KEY or the SMTP credentials and CAPITAINERIE_EMAIL, then redeploy the send-capitainerie-reservation-email Edge Function.")
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : t("Erreur inattendue. Veuillez réessayer.", "Unexpected error. Please try again.");
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };
  if (success) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessCard, { success });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-gradient-to-br from-ocean via-primary to-[#0a3f5c] py-16 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(214,168,79,0.25),transparent_65%)]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-4xl px-4 md:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { className: "size-3.5 text-accent" }),
          t("Port de Plaisance", "Marina")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: t("Réservation Port de Plaisance", "Berth booking") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-base text-white/75", children: t("Saisissez vos coordonnées / Enter your details", "Enter your details") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-4xl px-4 py-12 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: stepsRef, className: "mb-6 scroll-mt-24 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { "aria-live": "polite", className: "text-xs font-black uppercase tracking-[0.16em] text-muted-foreground", children: [
            t(`Étape ${step + 1} sur ${STEPS.length}`, `Step ${step + 1} of ${STEPS.length}`),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary sm:hidden", children: [
              " · ",
              pick(STEPS[step].title)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-3 flex items-center", children: STEPS.map((s, index) => {
            const Icon = s.icon;
            const done = index < step;
            const current = index === step;
            const badge = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("flex size-9 shrink-0 items-center justify-center rounded-full border-2 transition", done && "border-primary bg-primary text-primary-foreground", current && "border-accent bg-accent/15 text-primary", !done && !current && "border-border bg-background text-muted-foreground"), children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("sr-only text-sm font-bold sm:not-sr-only", current ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"), children: pick(s.title) })
            ] });
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { "aria-current": current ? "step" : void 0, className: cn("flex items-center", index < LAST_STEP && "flex-1"), children: [
              done ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => goToStep(index), disabled: submitting, title: t("Revenir à cette étape", "Back to this step"), className: "flex items-center gap-2 rounded-full transition hover:opacity-80", children: badge }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: badge }),
              index < LAST_STEP && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: cn("mx-2 h-0.5 flex-1 rounded-full transition sm:mx-3", done ? "bg-primary" : "bg-border") })
            ] }, s.id);
          }) })
        ] }),
        step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-premium)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-7 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-primary", children: t("Coordonnées client", "Client information") }),
                locale === "fr" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Client information" })
              ] })
            ] }),
            prefilled && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-5 rounded-lg border border-primary/15 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary", children: t("Nom et email repris de votre compte — vous pouvez les modifier.", "Name and email taken from your account — you can change them.") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: t("Nom / Name", "Last name"), id: "lastName", value: form.lastName, error: errors.lastName, required: true, onChange: (v) => setField("lastName", v), placeholder: "DUPONT" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: t("Prénom / First Name", "First name"), id: "firstName", value: form.firstName, error: errors.firstName, required: true, onChange: (v) => setField("firstName", v), placeholder: "Jean" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: t("Date de naissance / Date of Birth", "Date of birth"), id: "dateOfBirth", type: "date", value: form.dateOfBirth, error: errors.dateOfBirth, required: true, onChange: (v) => setField("dateOfBirth", v) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: t("Nationalité / Nationality", "Nationality"), id: "nationality", value: form.nationality, error: errors.nationality, required: true, onChange: (v) => setField("nationality", v), placeholder: "Tunisia" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: t("Téléphone / Phone", "Phone"), id: "phone", type: "tel", value: form.phone, error: errors.phone, required: true, onChange: (v) => setField("phone", v), placeholder: "+216 73 46 23 05" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Email", id: "email", type: "email", value: form.email, error: errors.email, required: true, onChange: (v) => setField("email", v), placeholder: t("nom@exemple.com", "name@example.com") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: t("Confirmer Email / Confirm Email", "Confirm email"), id: "confirmEmail", type: "email", value: form.confirmEmail, error: errors.confirmEmail, required: true, onChange: (v) => setField("confirmEmail", v), placeholder: t("nom@exemple.com", "name@example.com") }) })
            ] })
          ] })
        ] }),
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-premium)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-gradient-to-r from-primary via-turquoise to-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-7 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sailboat, { className: "size-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-primary", children: t("Informations sur le Bateau", "Boat information") }),
                locale === "fr" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Boat information" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: t("Nom du bateau / Boat Name", "Boat name"), id: "boatName", value: form.boatName, error: errors.boatName, required: true, onChange: (v) => setField("boatName", v), placeholder: "Sea Dream" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: t("Pavillon / Flag", "Flag"), id: "flag", value: form.flag, error: errors.flag, required: true, onChange: (v) => setField("flag", v), placeholder: t("Tunisie", "Tunisia") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: t("Longueur / Length (m)", "Length (m)"), id: "length", type: "number", min: "0", step: "0.1", value: form.length, error: errors.length, required: true, onChange: (v) => setField("length", v), placeholder: "12.0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: t("Largeur / Width (m)", "Width (m)"), id: "width", type: "number", min: "0", step: "0.1", value: form.width, error: errors.width, required: true, onChange: (v) => setField("width", v), placeholder: "4.0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: t("Tirant d'eau / Draught (m)", "Draught (m)"), id: "draught", type: "number", min: "0", step: "0.1", value: form.draught, error: errors.draught, required: true, onChange: (v) => setField("draught", v), placeholder: "1.8" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "boatType", className: "mb-1.5 block text-sm font-semibold text-foreground", children: "Type *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "boatType", value: form.boatType, onChange: (e) => setField("boatType", e.target.value), className: `h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/20 ${errors.boatType ? "border-red-400 focus:ring-red-200" : "border-border focus:border-primary/50"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: t("Sélectionner / Select", "Select") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Monocoque", children: t("Monocoque", "Monohull") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Catamaran", children: "Catamaran" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Yacht", children: "Yacht" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Bateau moteur", children: t("Bateau moteur", "Motorboat") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Voilier", children: t("Voilier", "Sailboat") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Autre", children: t("Autre", "Other") })
                ] }),
                errors.boatType && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-field-error": true, className: "mt-1 text-xs text-red-500", children: errors.boatType })
              ] })
            ] })
          ] })
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-premium)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-gradient-to-r from-turquoise via-primary to-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-7 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-primary", children: t("Dates & acompte", "Dates & deposit") }),
                locale === "fr" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Dates & deposit" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: t("Date d'arrivée / Check-in Date", "Arrival date"), id: "checkIn", type: "date", value: form.checkIn, error: errors.checkIn, required: true, onChange: (v) => setField("checkIn", v) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: t("Date de sortie / Check-out Date", "Departure date"), id: "checkOut", type: "date", value: form.checkOut, error: errors.checkOut, required: true, onChange: (v) => setField("checkOut", v) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "depositAmount", className: "mb-1.5 block text-sm font-semibold text-foreground", children: [
                  t("Acompte / Deposit (Min 300€ / 1 000 TND)", "Deposit (min €300 / 1,000 TND)"),
                  " ",
                  "*"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "depositAmount", type: "number", min: "0", step: "1", value: form.depositAmount, onChange: (e) => setField("depositAmount", e.target.value), placeholder: form.depositCurrency === "EUR" ? "300" : "1000", className: `h-10 flex-1 rounded-lg border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/20 ${errors.depositAmount ? "border-red-400 focus:ring-red-200" : "border-border focus:border-primary/50"}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { "aria-label": t("Devise de l'acompte", "Deposit currency"), value: form.depositCurrency, onChange: (e) => setField("depositCurrency", e.target.value), className: "h-10 rounded-lg border border-border bg-background px-3 text-sm font-semibold outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "EUR", children: "EUR" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "TND", children: "TND" })
                  ] })
                ] }),
                errors.depositAmount && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-field-error": true, className: "mt-1 text-xs text-red-500", children: errors.depositAmount })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "specialRequirements", className: "mb-1.5 block text-sm font-semibold text-foreground", children: t("Besoins spéciaux / Special Requirements", "Special requirements") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "specialRequirements", value: form.specialRequirements, onChange: (e) => setField("specialRequirements", e.target.value), rows: 4, placeholder: t("Indiquez-nous vos besoins particuliers...", "Let us know if you have any special requirements..."), className: "w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.newsletter, onChange: (e) => setField("newsletter", e.target.checked), className: "size-4 rounded border-border accent-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: t("S'abonner à la newsletter / Subscribe to newsletter", "Subscribe to the newsletter") })
              ] }) })
            ] })
          ] })
        ] }),
        submitError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800", children: submitError }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            step > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => goToStep(step - 1), disabled: submitting, className: "inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 text-base font-bold text-primary shadow-sm transition hover:border-primary/40 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
              t("Précédent", "Back")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting, className: "inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-ocean disabled:cursor-not-allowed disabled:opacity-60", children: step < LAST_STEP ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              t("Suivant", "Next"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
            ] }) : submitting ? t("Envoi en cours...", "Sending...") : t("Book Now / Réserver", "Book now") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-sm text-muted-foreground", children: t("Un membre de l'équipe de la capitainerie vous contactera pour confirmer votre réservation.", "A member of the harbour office team will contact you to confirm your booking.") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 overflow-hidden rounded-xl border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-gradient-to-r from-primary to-turquoise" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-primary", children: t("Capitainerie Marina Cap Monastir", "Marina Cap Monastir harbour office") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: t("BP.N°60 - 5000 Monastir - Tunisie", "PO Box 60 - 5000 Monastir - Tunisia") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-2 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+21673462305", className: "flex items-center gap-2.5 text-sm font-semibold text-foreground transition hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4 text-accent" }),
              "(+216) 73 46 23 05"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+21673462066", className: "flex items-center gap-2.5 text-sm font-semibold text-foreground transition hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4 text-accent" }),
              "(+216) 73 46 20 66"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:capitainerie@marinamonastir.tn", className: "flex items-center gap-2.5 text-sm font-semibold text-primary transition hover:text-accent sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4 text-accent" }),
              "capitainerie@marinamonastir.tn"
            ] })
          ] })
        ] })
      ] })
    ] }),
    false
  ] });
}
function SuccessCard({
  success
}) {
  const {
    t,
    formatDate
  } = useI18n();
  const fmt = (d) => formatDate(d, {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-2xl px-4 py-16 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-premium)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center md:p-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-green-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-8 text-green-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black text-primary", children: t("Demande envoyée", "Request sent") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "hidden", children: [
          success.reservationNumber.endsWith("-MAIL") ? "Votre client de messagerie a été ouvert avec les détails pré-remplis. Envoyez l'email pour finaliser votre demande." : "Votre demande de réservation portuaire a été envoyée.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Un membre de l'équipe de la capitainerie vous contactera sous 24h."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base leading-7 text-muted-foreground", children: t("Votre demande a été envoyée à la capitainerie. Nous vous contacterons bientôt.", "Your request has been sent to the harbour office. We will contact you soon.") }),
        success.deliveryMode !== "email" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left text-sm leading-6 text-amber-900", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black", children: t("Configuration email requise", "Email setup required") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: success.setupInstructions ?? t("Configurez EMAIL_PROVIDER_API_KEY ou les identifiants SMTP et CAPITAINERIE_EMAIL dans les secrets Supabase. La demande a été sauvegardée en fallback.", "Set EMAIL_PROVIDER_API_KEY or the SMTP credentials and CAPITAINERIE_EMAIL in the Supabase secrets. The request was saved as a fallback.") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 rounded-xl border border-border bg-secondary/40 p-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-semibold text-muted-foreground", children: t("N° de réservation", "Booking no.") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-black text-primary", children: success.reservationNumber })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-semibold text-muted-foreground", children: t("Bateau", "Boat") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-semibold", children: success.boatName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-semibold text-muted-foreground", children: t("Arrivée", "Arrival") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-semibold", children: fmt(success.checkIn) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-semibold text-muted-foreground", children: t("Départ", "Departure") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-semibold", children: fmt(success.checkOut) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-semibold text-muted-foreground", children: t("Acompte", "Deposit") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "font-semibold", children: [
              success.depositAmount,
              " ",
              success.depositCurrency
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-xl border border-primary/15 bg-primary/5 p-5 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-primary", children: t("Contacter la capitainerie", "Contact the harbour office") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+21673462305", className: "flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4 text-accent" }),
              "(+216) 73 46 23 05"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+21673462066", className: "flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4 text-accent" }),
              "(+216) 73 46 20 66"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:capitainerie@marinamonastir.tn", className: "flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-accent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4 text-accent" }),
              "capitainerie@marinamonastir.tn"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-ocean", children: t("Retour à l'accueil", "Back to home") }) })
      ] })
    ] }) })
  ] });
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
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: id, className: "mb-1.5 block text-sm font-semibold text-foreground", children: [
      label,
      " ",
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id, type, value, onChange: (e) => onChange(e.target.value), placeholder, min, step, className: `h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/20 ${error ? "border-red-400 focus:ring-red-200" : "border-border focus:border-primary/50"}` }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-field-error": true, className: "mt-1 text-xs text-red-500", children: error })
  ] });
}
export {
  ReservationPortPage as component
};
