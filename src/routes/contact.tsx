import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, Loader2, Mail, MapPin, Phone, Send, ShipWheel } from "lucide-react";
import React, { useState } from "react";
import heroImg from "@/assets/hero-marina.jpg";
import { SiteHeader } from "@/components/site-header";
import { getHotelSettings } from "@/lib/services/settingsService";
import { createContactConversation } from "@/lib/services/reservationMessageService";

export const Route = createFileRoute("/contact")({
  loader: async () => {
    const settings = await getHotelSettings();
    return { settings };
  },
  head: () => ({
    meta: [
      { title: "Contact - Marina Cap Monastir" },
      {
        name: "description",
        content: "Contactez la réception et la capitainerie de Marina Cap Monastir.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { settings } = Route.useLoaderData();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Réservation Appart-Hôtel");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !message.trim()) {
      setErrorMessage("Veuillez remplir au moins votre nom et votre message.");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    const res = await createContactConversation({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject,
      message: message.trim(),
    });

    setSubmitting(false);
    if (res.success) {
      setSentSuccess(true);
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } else {
      setErrorMessage(res.error || "Erreur lors de l'envoi du message.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <img
            src={heroImg}
            alt="Marina Cap Monastir"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="luxury-hero-overlay absolute inset-0" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 text-white md:px-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] shadow-lg backdrop-blur">
              <ShipWheel className="size-4 text-accent" />
              Contact
            </div>
            <h1 className="max-w-3xl text-4xl font-black md:text-6xl">
              Contacter Marina Cap Monastir
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/78">
              Réception pour l'appart-hôtel, capitainerie pour le port de plaisance et les escales.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <InfoCard title="Appart Hôtel / Réception">
              <Info icon={<Phone className="size-5" />} label="Téléphone" value={settings.phone} href="tel:+21673462305" />
              <Info icon={<Phone className="size-5" />} label="Fax" value={settings.fax} />
              <Info icon={<Mail className="size-5" />} label="Réservation" value={settings.email} href={`mailto:${settings.email}`} />
              <Info icon={<Mail className="size-5" />} label="Marketing" value={settings.marketingEmail} href={`mailto:${settings.marketingEmail}`} />
              <Info icon={<MapPin className="size-5" />} label="Adresse" value={settings.address} />
            </InfoCard>

            <InfoCard title="Capitainerie">
              {settings.capitaineriePhones.map((phone) => (
                <Info key={phone} icon={<Phone className="size-5" />} label="Téléphone" value={phone} href={`tel:${toTel(phone)}`} />
              ))}
              <Info
                icon={<Mail className="size-5" />}
                label="Email"
                value={settings.capitainerieEmail}
                href={`mailto:${settings.capitainerieEmail}`}
              />
              <Info icon={<MapPin className="size-5" />} label="Adresse" value={settings.address} />
            </InfoCard>

            <Link
              to="/search"
              search={{ adults: 2, children: 0, roomType: "Tous" }}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-ocean"
            >
              <CalendarDays className="size-4" />
              Réserver maintenant
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-premium)]">
            {sentSuccess && (
              <div className="mb-4 flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <div className="text-sm font-semibold">
                  Votre message a été transmis à la réception avec succès ! Nous vous répondrons sous peu.
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs font-semibold text-destructive">
                {errorMessage}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nom complet">
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="field-input"
                  placeholder="Nom et prénom"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field-input"
                  placeholder="client@email.com"
                />
              </Field>
              <Field label="Téléphone">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="field-input"
                  placeholder="+216 ..."
                />
              </Field>
              <Field label="Objet">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="field-input"
                >
                  <option value="Réservation Appart-Hôtel">Réservation Appart-Hôtel</option>
                  <option value="Réservation Port de Plaisance">Réservation Port de Plaisance</option>
                  <option value="Capitainerie">Capitainerie</option>
                  <option value="Demande spéciale">Demande spéciale</option>
                </select>
              </Field>
              <label className="md:col-span-2">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Message
                </span>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="field-input min-h-36"
                  placeholder="Dates, nombre de voyageurs, demande port, préférence d'appartement..."
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-ocean disabled:opacity-50"
            >
              {submitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              {submitting ? "Envoi en cours..." : "Envoyer la demande"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="premium-card premium-card-hover rounded-lg p-5">
      <h2 className="mb-4 text-lg font-black text-primary">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Info({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = href ? (
    <a href={href} className="font-semibold text-primary hover:text-accent">
      {value}
    </a>
  ) : (
    <span className="font-semibold text-primary">{value}</span>
  );

  return (
    <div className="flex items-start gap-3 text-sm">
      <span className="mt-0.5 text-accent">{icon}</span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </div>
        <div className="mt-1 leading-6">{content}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function toTel(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}
