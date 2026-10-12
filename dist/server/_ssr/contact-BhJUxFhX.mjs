import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useI18n, A as Route$x, n as heroImg, v as getSupabaseOrNull, w as getCurrentProfile, x as createConversation, y as sendMessage, z as warnSupabaseFallback } from "./router-CgbkQim6.mjs";
import { S as SiteHeader } from "./site-header-DrEtGnYb.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { K as ShipWheel, Y as Phone, Z as Mail, t as MapPin, C as CalendarDays, _ as CircleUserRound, $ as LogIn, a0 as UserCheck, a1 as CircleCheck, j as LoaderCircle, a2 as Send } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
const mockMessages = [];
async function resolveOwnerIdForContact(supabase) {
  try {
    const { data: roomData } = await supabase.from("room_types").select("owner_id").not("owner_id", "is", null).limit(1).maybeSingle();
    if (roomData?.owner_id) return roomData.owner_id;
    const { data: resData } = await supabase.from("reservations").select("owner_id").not("owner_id", "is", null).limit(1).maybeSingle();
    return resData?.owner_id ?? null;
  } catch {
    return null;
  }
}
async function createContactConversation(input) {
  const supabase = await getSupabaseOrNull();
  const formattedMessage = `[${input.subject}] ${input.message.trim()}`;
  if (!supabase) {
    const convId = `mock-conv-contact-${Date.now()}`;
    ({
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    mockMessages.push({
      id: `mock-msg-${Date.now()}`,
      conversationId: convId,
      senderType: "client",
      senderName: input.fullName,
      message: formattedMessage,
      isRead: false,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    return { success: true };
  }
  try {
    const currentProfile = await getCurrentProfile().catch(() => null);
    if (currentProfile && currentProfile.role === "client") {
      try {
        const conv = await createConversation({ subject: input.subject || "Contact Reception" });
        await sendMessage({ conversationId: conv.id, body: formattedMessage });
      } catch (portalErr) {
        warnSupabaseFallback("contact portal message sync", portalErr);
      }
    }
    const ownerId = await resolveOwnerIdForContact(supabase);
    const insertPayload = {
      client_name: input.fullName,
      client_email: input.email || null,
      client_phone: input.phone || null,
      status: "open"
    };
    if (ownerId) insertPayload.owner_id = ownerId;
    let { data: convData, error: convErr } = await supabase.from("reservation_conversations").insert(insertPayload).select("*").single();
    if (convErr) throw convErr;
    const { error: msgErr } = await supabase.from("reservation_messages").insert({
      conversation_id: convData.id,
      sender_type: "client",
      sender_name: input.fullName,
      message: formattedMessage,
      is_read: false
    });
    if (msgErr) throw msgErr;
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur lors de l'envoi";
    warnSupabaseFallback("contact form submission", error);
    return { success: false, error: message };
  }
}
function ContactPage() {
  const {
    t
  } = useI18n();
  const {
    settings,
    userProfile
  } = Route$x.useLoaderData();
  const [fullName, setFullName] = reactExports.useState(userProfile?.fullName ?? userProfile?.name ?? "");
  const [email, setEmail] = reactExports.useState(userProfile?.email ?? "");
  const [phone, setPhone] = reactExports.useState(userProfile?.phone ?? "");
  const [subject, setSubject] = reactExports.useState("Réservation Appart-Hôtel");
  const [message, setMessage] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [sentSuccess, setSentSuccess] = reactExports.useState(false);
  const [errorMessage, setErrorMessage] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (userProfile) {
      if (!fullName) setFullName(userProfile.fullName ?? userProfile.name ?? "");
      if (!email) setEmail(userProfile.email ?? "");
      if (!phone && userProfile.phone) setPhone(userProfile.phone);
    }
  }, [userProfile]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !message.trim()) {
      setErrorMessage(t("Veuillez remplir au moins votre nom et votre message.", "Please fill in at least your name and your message."));
      return;
    }
    setSubmitting(true);
    setErrorMessage(null);
    const res = await createContactConversation({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject,
      message: message.trim()
    });
    setSubmitting(false);
    if (res.success) {
      setSentSuccess(true);
      setMessage("");
    } else {
      setErrorMessage(res.error || t("Erreur lors de l'envoi du message.", "The message could not be sent."));
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Marina Cap Monastir", className: "absolute inset-0 h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "luxury-hero-overlay absolute inset-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4 py-20 text-white md:px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] shadow-lg backdrop-blur", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShipWheel, { className: "size-4 text-accent" }),
            t("Contacter", "Contact us")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "hero-title max-w-3xl", children: t("Contacter Marina Cap Monastir", "Contact Marina Cap Monastir") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-2xl text-base leading-8 text-white/78", children: t("Réception pour l'appart-hôtel, capitainerie pour le port de plaisance et les escales.", "Reception for the aparthotel, harbour office for the marina and stopovers.") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto grid max-w-7xl gap-6 px-4 py-12 md:px-6 lg:grid-cols-[0.9fr_1.1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoCard, { title: t("Appart Hôtel / Réception", "Aparthotel / Reception"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-5" }), label: t("Téléphone", "Phone"), value: settings.phone, href: "tel:+21673462305" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-5" }), label: t("Fax", "Fax"), value: settings.fax }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-5" }), label: t("Réservation", "Bookings"), value: settings.email, href: `mailto:${settings.email}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-5" }), label: t("Marketing", "Marketing"), value: settings.marketingEmail, href: `mailto:${settings.marketingEmail}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-5" }), label: t("Adresse", "Address"), value: settings.address })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoCard, { title: t("Capitainerie", "Harbour office"), children: [
            settings.capitaineriePhones.map((phone2) => /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-5" }), label: t("Téléphone", "Phone"), value: phone2, href: `tel:${toTel(phone2)}` }, phone2)),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-5" }), label: "Email", value: settings.capitainerieEmail, href: `mailto:${settings.capitainerieEmail}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-5" }), label: t("Adresse", "Address"), value: settings.address })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/search", search: {
            adults: 2,
            children: 0,
            roomType: "Tous"
          }, className: "inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-ocean", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-4" }),
            t("Réserver maintenant", "Book now")
          ] })
        ] }),
        !userProfile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-lg border border-primary/20 bg-card p-8 text-center shadow-[var(--shadow-premium)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUserRound, { className: "size-8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black text-primary", children: t("Compte Client Requis", "Guest account required") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-md text-sm leading-6 text-muted-foreground", children: t("Pour envoyer un message à la réception de Marina Cap Monastir et recevoir votre réponse directement dans votre espace client, veuillez vous connecter à votre compte.", "To message the Marina Cap Monastir reception and get the reply straight in your guest account, please sign in.") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/login", search: {
              redirect: "/contact"
            }, className: "inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-ocean", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "size-4" }),
              t("Se connecter", "Sign in")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-6 text-sm font-semibold text-foreground transition hover:border-primary hover:bg-primary/5", children: t("Créer un compte", "Create an account") })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-premium)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2 rounded-md bg-primary/5 px-3 py-2 text-xs font-bold text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "size-4 text-emerald-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              t("Connecté en tant que", "Signed in as"),
              " ",
              userProfile.fullName || userProfile.name,
              " (",
              userProfile.email,
              ")"
            ] })
          ] }),
          sentSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-5 shrink-0 text-emerald-600 dark:text-emerald-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: t("Votre message a été transmis à la réception avec succès ! Nous vous répondrons sous peu.", "Your message has been sent to reception. We will reply shortly.") })
          ] }),
          errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs font-semibold text-destructive", children: errorMessage }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("Nom complet", "Full name"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, readOnly: !!userProfile, value: fullName, onChange: (e) => setFullName(e.target.value), className: `field-input ${userProfile ? "bg-muted/50 cursor-not-allowed font-semibold text-foreground/80" : ""}`, placeholder: t("Nom et prénom", "First and last name") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("Email", "Email"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, readOnly: !!userProfile, value: email, onChange: (e) => setEmail(e.target.value), className: `field-input ${userProfile ? "bg-muted/50 cursor-not-allowed font-semibold text-foreground/80" : ""}`, placeholder: "client@email.com" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("Téléphone", "Phone"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: phone, onChange: (e) => setPhone(e.target.value), className: "field-input", placeholder: "+216 ..." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("Objet", "Subject"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: subject, onChange: (e) => setSubject(e.target.value), className: "field-input", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Réservation Appart-Hôtel", children: t("Réservation Appart-Hôtel", "Aparthotel booking") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Réservation Port de Plaisance", children: t("Réservation Port de Plaisance", "Berth booking") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Capitainerie", children: t("Capitainerie", "Harbour office") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Demande spéciale", children: t("Demande spéciale", "Special request") })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground", children: t("Message", "Message") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, value: message, onChange: (e) => setMessage(e.target.value), className: "field-input min-h-36", placeholder: t("Dates, nombre de voyageurs, demande port, préférence d'appartement...", "Dates, number of guests, berth request, apartment preference...") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: submitting, className: "mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-ocean disabled:opacity-50", children: [
            submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" }),
            submitting ? t("Envoi en cours...", "Sending...") : t("Envoyer la demande", "Send request")
          ] })
        ] })
      ] })
    ] })
  ] });
}
function InfoCard({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-card premium-card-hover rounded-lg p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-lg font-black text-primary", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children })
  ] });
}
function Info({
  icon,
  label,
  value,
  href
}) {
  const content = href ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, className: "font-semibold text-primary hover:text-accent", children: value }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: value });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 text-accent", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 leading-6", children: content })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground", children: label }),
    children
  ] });
}
function toTel(phone) {
  return phone.replace(/[^\d+]/g, "");
}
export {
  ContactPage as component
};
