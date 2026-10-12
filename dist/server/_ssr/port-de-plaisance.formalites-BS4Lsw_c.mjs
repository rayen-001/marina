import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteHeader } from "./site-header-DrEtGnYb.mjs";
import { u as useI18n } from "./router-CgbkQim6.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { ay as FileCheckCorner, an as ArrowLeft, az as Radio, a1 as CircleCheck, $ as LogIn, L as LogOut, s as ShieldCheck, Y as Phone, A as Anchor } from "../_libs/lucide-react.mjs";
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
const ARRIVAL_DOCS = [{
  fr: "Titre de navigation du bateau (acte de francisation ou certificat d'immatriculation)",
  en: "Boat navigation papers (certificate of registry or registration certificate)"
}, {
  fr: "Passeports en cours de validité de tous les membres d'équipage",
  en: "Valid passports for all crew members"
}, {
  fr: "Rôle d'équipage (liste des personnes à bord)",
  en: "Crew list (everyone on board)"
}, {
  fr: "Police d'assurance du bateau couvrant la responsabilité civile",
  en: "Boat insurance policy covering third-party liability"
}, {
  fr: "Clearance de sortie du dernier port étranger (pour les bateaux en provenance de l'étranger)",
  en: "Port clearance from the last foreign port (for boats arriving from abroad)"
}, {
  fr: "Carnet de santé ou déclaration sanitaire si requis",
  en: "Health record or health declaration if required"
}, {
  fr: "Manifeste de bord (douanes)",
  en: "Ship's manifest (customs)"
}];
const DEPARTURE_DOCS = [{
  fr: "Règlement intégral des droits de port (escale, services, suppléments)",
  en: "Full payment of harbour dues (stay, services, extras)"
}, {
  fr: "Restitution de la clé d'accès aux équipements",
  en: "Return of the facilities access key"
}, {
  fr: "Clearance de sortie délivré par la capitainerie",
  en: "Port clearance issued by the harbour office"
}, {
  fr: "Notification préalable au minimum 2 h avant l'appareillage",
  en: "Notice at least 2 hours before departure"
}];
function FormalitesPage() {
  const {
    t,
    pick
  } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-gradient-to-br from-ocean via-primary to-[#0a3f5c] py-14 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(214,168,79,0.22),transparent_65%)]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-5xl px-4 md:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheckCorner, { className: "size-3.5 text-accent" }),
          t("Port de Plaisance", "Marina")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: t("Formalités d'entrée et de sortie", "Entry and exit formalities") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-base leading-7 text-white/75", children: t("Procédures et documents requis pour les plaisanciers à Marina Cap Monastir.", "Procedures and documents required for boaters at Marina Cap Monastir.") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl px-4 py-12 md:px-6 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/port-de-plaisance", className: "inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
        t("Retour au port", "Back to the marina")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "size-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-primary", children: t("Contact VHF", "VHF contact") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
            t("À l'approche du port, appelez la capitainerie sur le", "When approaching the harbour, call the harbour office on"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: t("canal VHF 09", "VHF channel 09") }),
            " ",
            t("(ou canal 16 en secours). Un agent vous guidera pour l'accostage et vous attribuera un poste à quai.", "(or channel 16 as a backup). An agent will guide you in and assign you a berth.")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-gradient-to-r from-primary to-turquoise" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-primary", children: t("Police Frontière", "Border police") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-7 text-muted-foreground", children: t("Les formalités de police de frontière pour les plaisanciers en provenance de l'étranger concernant les membres de l'équipage et les passagers doivent être exécutées avant accès à terre et avant départ pour l'étranger. Ainsi une déclaration d'entrée est formulée par le capitaine du navire et visée par la police de frontière. Cette déclaration, qui sera présentée à toute réquisition des autorités dans les autres ports d'escale, vous dispensera de toute autre formalité.", "For boaters arriving from abroad, border police formalities for crew and passengers must be completed before going ashore and before leaving for a foreign destination. The skipper fills in an entry declaration, which is stamped by the border police. Show this declaration whenever the authorities ask for it in other ports of call; no other formality will be required.") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-sm font-black uppercase tracking-[0.12em] text-muted-foreground", children: t("Documents à présenter", "Documents to show") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-2", children: [t("Papiers du bateau", "Boat papers"), t("Passeport des passagers en cours de validité", "Valid passports for passengers")].map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm leading-6 text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 size-4 shrink-0 text-emerald-600" }),
            doc
          ] }, doc)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-premium)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-gradient-to-r from-accent via-turquoise to-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "size-5 text-emerald-700" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-primary", children: t("Procédure d'arrivée", "Arrival procedure") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("Entrée au port / Entry procedure", "Entering the harbour") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-3", children: [t("Appeler la capitainerie sur VHF 09/16 à l'approche du port.", "Call the harbour office on VHF 09/16 when approaching the harbour."), t("Accoster au quai d'accueil désigné par la capitainerie.", "Moor at the reception quay designated by the harbour office."), t("Se présenter au guichet de la capitainerie dans les 2 heures suivant l'arrivée.", "Report to the harbour office desk within 2 hours of arrival."), t("Remettre les documents requis et régler l'acompte demandé.", "Hand in the required documents and pay the requested deposit."), t("Retirer votre badge d'accès aux sanitaires et équipements communs.", "Collect your access badge for the toilets and shared facilities.")].map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-black text-primary", children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pt-0.5 text-sm leading-6 text-foreground", children: step })
          ] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-sm font-black uppercase tracking-[0.12em] text-muted-foreground", children: t("Documents à remettre", "Documents to hand in") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: ARRIVAL_DOCS.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm leading-6 text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 size-4 shrink-0 text-emerald-600" }),
              pick(doc)
            ] }, doc.fr)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-gradient-to-r from-primary via-turquoise to-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-5 text-blue-700" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-primary", children: t("Procédure de départ", "Departure procedure") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("Sortie du port / Departure procedure", "Leaving the harbour") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: DEPARTURE_DOCS.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm leading-6 text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 size-4 shrink-0 text-blue-600" }),
            pick(doc)
          ] }, doc.fr)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-gradient-to-r from-ocean to-turquoise" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-5 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-primary", children: t("Consignes de sécurité & règlement", "Safety rules & regulations") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: [{
            rule: t("Vitesse maximale dans le port : 3 nœuds", "Maximum speed in the harbour: 3 knots")
          }, {
            rule: t("Amarrage interdit hors des postes désignés", "Mooring only at designated berths")
          }, {
            rule: t("Interdiction de rejets d'hydrocarbures ou déchets à l'eau", "No discharge of fuel or waste into the water")
          }, {
            rule: t("Respect du silence nocturne de 22h à 7h", "Quiet hours from 10 pm to 7 am")
          }, {
            rule: t("Interdiction de feu nu sur les pontons", "No open flames on the pontoons")
          }, {
            rule: t("Présence obligatoire d'extincteur à bord", "A fire extinguisher on board is mandatory")
          }, {
            rule: t("Port du gilet de sauvetage recommandé pour les enfants", "Life jackets recommended for children")
          }, {
            rule: t("Accès aux pontons réservé aux plaisanciers accrédités", "Pontoon access for registered boaters only")
          }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 rounded-lg border border-border bg-secondary/30 px-3 py-2.5 text-sm text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mt-0.5 size-4 shrink-0 text-accent" }),
            item.rule
          ] }, item.rule)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-red-200 bg-red-50 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-red-800", children: t("Urgences", "Emergencies") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2 text-sm text-red-900", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: t("SAR Tunisie :", "SAR Tunisia:") }),
              " 70 717 171"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: t("SAMU :", "Ambulance (SAMU):") }),
              " 190"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: t("Police :", "Police:") }),
              " 197"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: t("Pompiers :", "Fire brigade:") }),
              " 198"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-1 text-xs opacity-75", children: t("Ou VHF canal 16 (détresse)", "Or VHF channel 16 (distress)") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/20 bg-primary/5 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-primary", children: t("Capitainerie", "Harbour office") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: t("BP.N°60 - 5000 Monastir, Tunisie", "PO Box 60 - 5000 Monastir, Tunisia") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+21673462305", className: "flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4 text-accent" }),
              "(+216) 73 46 23 05"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+21673462066", className: "flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4 text-accent" }),
              "(+216) 73 46 20 66"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/port-de-plaisance/reservation", className: "inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white transition hover:bg-ocean", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { className: "size-3.5" }),
            t("Réserver en ligne", "Book online")
          ] }) })
        ] })
      ] })
    ] }),
    false
  ] });
}
export {
  FormalitesPage as component
};
