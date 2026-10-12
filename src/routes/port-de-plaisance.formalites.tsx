import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Anchor,
  ArrowLeft,
  CheckCircle2,
  FileCheck2,
  LogIn,
  LogOut,
  Phone,
  Radio,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/port-de-plaisance/formalites")({
  head: () => ({
    meta: [
      { title: "Formalités Port — Marina Cap Monastir" },
      {
        name: "description",
        content:
          "Formalités d'entrée et de sortie du port de plaisance de Marina Cap Monastir — documents requis, procédures d'accueil, VHF, consignes de sécurité.",
      },
    ],
  }),
  component: FormalitesPage,
});

const ARRIVAL_DOCS = [
  "Titre de navigation du bateau (acte de francisation ou certificat d'immatriculation)",
  "Passeports en cours de validité de tous les membres d'équipage",
  "Rôle d'équipage (liste des personnes à bord)",
  "Police d'assurance du bateau couvrant la responsabilité civile",
  "Clearance de sortie du dernier port étranger (pour les bateaux en provenance de l'étranger)",
  "Carnet de santé ou déclaration sanitaire si requis",
  "Manifeste de bord (douanes)",
];

const DEPARTURE_DOCS = [
  "Règlement intégral des droits de port (escale, services, suppléments)",
  "Restitution de la clé d'accès aux équipements",
  "Clearance de sortie délivré par la capitainerie",
  "Notification préalable au minimum 2 h avant l'appareillage",
];

function FormalitesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative overflow-hidden bg-gradient-to-br from-ocean via-primary to-[#0a3f5c] py-14 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(214,168,79,0.22),transparent_65%)]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 md:px-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] backdrop-blur">
            <FileCheck2 className="size-3.5 text-accent" />
            Port de Plaisance
          </div>
          <h1 className="text-4xl font-black md:text-5xl">Formalités d'entrée et de sortie</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/75">
            Procédures et documents requis pour les plaisanciers à Marina Cap Monastir.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-12 md:px-6 space-y-8">
        <Link
          to="/port-de-plaisance"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Retour au port
        </Link>

        {/* VHF contact */}
        <div className="flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Radio className="size-5 text-primary" />
          </div>
          <div>
            <p className="font-black text-primary">Contact VHF</p>
            <p className="mt-1 text-sm text-muted-foreground">
              À l'approche du port, appelez la capitainerie sur le{" "}
              <strong className="text-primary">canal VHF 09</strong> (ou canal 16 en secours). Un
              agent vous guidera pour l'accostage et vous attribuera un poste à quai.
            </p>
          </div>
        </div>

        {/* Police Frontière — contenu officiel */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="h-1 bg-gradient-to-r from-primary to-turquoise" />
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-black text-primary">Police Frontière</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Les formalités de police de frontière pour les plaisanciers en provenance de
              l'étranger concernant les membres de l'équipage et les passagers doivent être
              exécutées avant accès à terre et avant départ pour l'étranger. Ainsi une déclaration
              d'entrée est formulée par le capitaine du navire et visée par la police de frontière.
              Cette déclaration, qui sera présentée à toute réquisition des autorités dans les
              autres ports d'escale, vous dispensera de toute autre formalité.
            </p>
            <h3 className="mt-4 text-sm font-black uppercase tracking-[0.12em] text-muted-foreground">
              Documents à présenter
            </h3>
            <ul className="mt-2 space-y-2">
              {["Papiers du bateau", "Passeport des passagers en cours de validité"].map((doc) => (
                <li
                  key={doc}
                  className="flex items-start gap-2.5 text-sm leading-6 text-foreground"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Arrivée */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-premium)]">
          <div className="h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" />
          <div className="p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                <LogIn className="size-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-xl font-black text-primary">Procédure d'arrivée</h2>
                <p className="text-sm text-muted-foreground">Entrée au port / Entry procedure</p>
              </div>
            </div>

            <ol className="space-y-3">
              {[
                "Appeler la capitainerie sur VHF 09/16 à l'approche du port.",
                "Accoster au quai d'accueil désigné par la capitainerie.",
                "Se présenter au guichet de la capitainerie dans les 2 heures suivant l'arrivée.",
                "Remettre les documents requis et régler l'acompte demandé.",
                "Retirer votre badge d'accès aux sanitaires et équipements communs.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-black text-primary">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm leading-6 text-foreground">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-6">
              <h3 className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-muted-foreground">
                Documents à remettre
              </h3>
              <ul className="space-y-2">
                {ARRIVAL_DOCS.map((doc) => (
                  <li
                    key={doc}
                    className="flex items-start gap-2.5 text-sm leading-6 text-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Départ */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="h-1.5 bg-gradient-to-r from-primary via-turquoise to-accent" />
          <div className="p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                <LogOut className="size-5 text-blue-700" />
              </div>
              <div>
                <h2 className="text-xl font-black text-primary">Procédure de départ</h2>
                <p className="text-sm text-muted-foreground">
                  Sortie du port / Departure procedure
                </p>
              </div>
            </div>
            <ul className="space-y-2">
              {DEPARTURE_DOCS.map((doc) => (
                <li
                  key={doc}
                  className="flex items-start gap-2.5 text-sm leading-6 text-foreground"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Règlement intérieur */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="h-1 bg-gradient-to-r from-ocean to-turquoise" />
          <div className="p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <ShieldCheck className="size-5 text-accent" />
              </div>
              <h2 className="text-xl font-black text-primary">
                Consignes de sécurité &amp; règlement
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { rule: "Vitesse maximale dans le port : 3 nœuds" },
                { rule: "Amarrage interdit hors des postes désignés" },
                { rule: "Interdiction de rejets d'hydrocarbures ou déchets à l'eau" },
                { rule: "Respect du silence nocturne de 22h à 7h" },
                { rule: "Interdiction de feu nu sur les pontons" },
                { rule: "Présence obligatoire d'extincteur à bord" },
                { rule: "Port du gilet de sauvetage recommandé pour les enfants" },
                { rule: "Accès aux pontons réservé aux plaisanciers accrédités" },
              ].map((item) => (
                <div
                  key={item.rule}
                  className="flex items-start gap-2.5 rounded-lg border border-border bg-secondary/30 px-3 py-2.5 text-sm text-foreground"
                >
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
                  {item.rule}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Urgence & Contact */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <h3 className="font-black text-red-800">Urgences</h3>
            <div className="mt-3 space-y-2 text-sm text-red-900">
              <p>
                <strong>SAR Tunisie :</strong> 70 717 171
              </p>
              <p>
                <strong>SAMU :</strong> 190
              </p>
              <p>
                <strong>Police :</strong> 197
              </p>
              <p>
                <strong>Pompiers :</strong> 198
              </p>
              <p className="pt-1 text-xs opacity-75">Ou VHF canal 16 (détresse)</p>
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <h3 className="font-black text-primary">Capitainerie</h3>
            <p className="mt-1 text-sm text-muted-foreground">BP.N°60 - 5000 Monastir, Tunisie</p>
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
            </div>
            <div className="mt-4">
              <Link
                to="/port-de-plaisance/reservation"
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white transition hover:bg-ocean"
              >
                <Anchor className="size-3.5" />
                Réserver en ligne
              </Link>
            </div>
          </div>
        </div>
      </main>
      {import.meta.env.DEV && (
        <div className="fixed bottom-2 right-2 z-[9999] rounded bg-black/70 px-2 py-1 text-[10px] text-white">
          /port-de-plaisance/formalites · FormalitesPage
        </div>
      )}
    </div>
  );
}
