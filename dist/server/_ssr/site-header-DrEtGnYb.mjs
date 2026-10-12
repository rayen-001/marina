import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, e as useNavigate, d as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { R as Root2, T as Trigger, P as Portal2, C as Content2, L as Label2, S as Separator2, I as Item2, a as SubTrigger2, b as SubContent2, c as CheckboxItem2, d as ItemIndicator2, e as RadioItem2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { u as useI18n, L as LanguageSwitch, q as isAdminRole, v as getSupabaseOrNull, c as cn, as as signOut, p as getCurrentSessionProfile } from "./router-CgbkQim6.mjs";
import { i as ChevronDown, a7 as CalendarCheck, A as Anchor, X, d as Menu, aq as User, h as UserRound, p as UserPlus, J as ChevronRight, ar as Check, aA as Circle } from "../_libs/lucide-react.mjs";
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
const HIDDEN_PREFIXES = ["/search", "/book/", "/room/", "/property/", "/confirmation"];
const PORT_BOOKING_PATH = "/port-de-plaisance/reservation";
function FloatingBookButton() {
  const { t } = useI18n();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;
  const onPortBooking = pathname.startsWith(PORT_BOOKING_PATH);
  return (
    // `floating-book-bar` reserves room at the bottom of the page (styles.css) so the bar never hides content.
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "floating-book-bar fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex overflow-hidden rounded-full shadow-[0_12px_32px_-8px_rgb(0_59_92/0.55)] ring-4 ring-white/70 sm:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/search",
          search: { adults: 2, children: 0, roomType: "Tous" },
          "aria-label": t("Réserver un appartement", "Book an apartment"),
          className: "inline-flex h-12 items-center gap-2 bg-accent px-4 text-sm font-black text-accent-foreground transition active:bg-primary active:text-primary-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-5" }),
            t("Appartement", "Apartment")
          ]
        }
      ),
      !onPortBooking && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/port-de-plaisance/reservation",
          "aria-label": t("Réserver une place au port", "Book a berth"),
          className: "inline-flex h-12 items-center gap-2 border-l border-white/25 bg-primary px-4 text-sm font-black text-primary-foreground transition active:bg-ocean",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { className: "size-5" }),
            t("Port", "Berth")
          ]
        }
      )
    ] })
  );
}
function getPortLinks(t) {
  return [
    { label: t("Présentation du Port", "About the marina"), to: "/port-de-plaisance" },
    { label: t("Plan du Port", "Marina map"), to: "/port-de-plaisance/plan" },
    {
      label: t("Réservation Port de Plaisance", "Berth booking"),
      to: "/port-de-plaisance/reservation"
    },
    {
      label: t("Formalités d'entrée et de sortie", "Entry & exit formalities"),
      to: "/port-de-plaisance/formalites"
    },
    { label: t("Tarifs Port", "Marina rates"), to: "/port-de-plaisance/tarifs" }
  ];
}
function SiteHeader() {
  const [open, setOpen] = reactExports.useState(false);
  const { t } = useI18n();
  const portLinks = getPortLinks(t);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50 border-b border-black/[0.07] bg-white/96 shadow-sm backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex shrink-0 items-center gap-3", onClick: () => setOpen(false), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/icons/icon-512.png",
              alt: "Marina Cap Monastir",
              className: "size-10 rounded-lg object-cover shadow-sm"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden leading-tight sm:block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-black tracking-wide text-primary", children: "Marina Cap Monastir" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground", children: t("Appart-hôtel & port", "Aparthotel & marina") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-4 whitespace-nowrap text-sm font-semibold xl:flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-foreground/75 transition-colors hover:text-primary", children: t("Accueil", "Home") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/search",
              search: { adults: 2, children: 0, roomType: "Tous" },
              className: "text-foreground/75 transition-colors hover:text-primary",
              children: t("Appart-Hôtel", "Aparthotel")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/port-de-plaisance",
                className: "inline-flex items-center gap-1 text-foreground/75 transition-colors hover:text-primary",
                children: [
                  t("Port de Plaisance", "Marina"),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-3.5" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "invisible absolute left-0 top-full w-80 translate-y-2 rounded-lg border border-border bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100", children: portLinks.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: item.to,
                className: "block rounded-md px-3 py-2.5 text-sm font-semibold text-foreground/75 transition hover:bg-secondary hover:text-primary",
                children: item.label
              },
              item.to
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/activites",
              className: "text-foreground/75 transition-colors hover:text-primary",
              children: t("Activités", "Activities")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/presentation",
              className: "text-foreground/75 transition-colors hover:text-primary",
              children: t("Présentation", "About")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/actualites",
              className: "text-foreground/75 transition-colors hover:text-primary",
              children: t("Actualités", "News")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "text-foreground/75 transition-colors hover:text-primary", children: t("Contacter", "Contact us") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSwitch, { className: "hidden sm:inline-flex" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/search",
              search: { adults: 2, children: 0, roomType: "Tous" },
              className: "hidden h-10 items-center gap-2 whitespace-nowrap rounded-lg bg-accent px-4 text-sm font-black text-accent-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-md sm:inline-flex",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-4" }),
                t("Réserver", "Book")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/port-de-plaisance/reservation",
              title: t("Réserver une place au port", "Book a berth"),
              className: "hidden h-10 items-center gap-2 whitespace-nowrap rounded-lg border border-primary/25 px-3 text-sm font-black text-primary transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/5 sm:inline-flex",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { className: "size-4" }),
                t("Port", "Berth")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSwitch, { variant: "segmented", className: "sm:hidden" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccountNav, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              title: "Menu",
              onClick: () => setOpen((value) => !value),
              className: "inline-flex size-10 items-center justify-center rounded-lg border border-border bg-white text-muted-foreground shadow-sm transition hover:border-primary/30 hover:text-primary xl:hidden",
              "aria-expanded": open,
              children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-5" })
            }
          )
        ] })
      ] }),
      open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-white px-4 py-4 shadow-lg xl:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "grid gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSwitch, { variant: "segmented", className: "mb-3 h-11 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/search",
              search: { adults: 2, children: 0, roomType: "Tous" },
              onClick: () => setOpen(false),
              className: "flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg bg-accent px-2 py-2.5 text-center text-sm font-black leading-tight text-accent-foreground shadow-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-5" }),
                t("Réserver un appartement", "Book an apartment")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/port-de-plaisance/reservation",
              onClick: () => setOpen(false),
              className: "flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg bg-primary px-2 py-2.5 text-center text-sm font-black leading-tight text-primary-foreground shadow-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { className: "size-5" }),
                t("Réserver au port", "Book a berth")
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MobileLink, { to: "/", label: t("Accueil", "Home"), onNavigate: () => setOpen(false) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MobileLink,
          {
            to: "/search",
            label: t("Appart-Hôtel", "Aparthotel"),
            search: { adults: 2, children: 0, roomType: "Tous" },
            onNavigate: () => setOpen(false)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MobileLink,
          {
            to: "/port-de-plaisance",
            label: t("Port de Plaisance", "Marina"),
            onNavigate: () => setOpen(false)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-3 border-l border-border pl-3", children: portLinks.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: item.to,
            onClick: () => setOpen(false),
            className: "flex min-h-10 items-center rounded-lg px-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-primary",
            children: item.label
          },
          item.to
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MobileLink,
          {
            to: "/activites",
            label: t("Activités", "Activities"),
            onNavigate: () => setOpen(false)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MobileLink,
          {
            to: "/presentation",
            label: t("Présentation", "About"),
            onNavigate: () => setOpen(false)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MobileLink,
          {
            to: "/actualites",
            label: t("Actualités", "News"),
            onNavigate: () => setOpen(false)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MobileLink,
          {
            to: "/contact",
            label: t("Contacter", "Contact us"),
            onNavigate: () => setOpen(false)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MobileRegisterLink, { onNavigate: () => setOpen(false) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingBookButton, {})
  ] });
}
function useSessionProfile() {
  const [state, setState] = reactExports.useState({
    loading: true,
    context: null
  });
  reactExports.useEffect(() => {
    let mounted = true;
    let unsubscribe;
    const refresh = async () => {
      try {
        const context = await getCurrentSessionProfile();
        if (mounted) setState({ loading: false, context });
      } catch {
        if (mounted) setState({ loading: false, context: null });
      }
    };
    void refresh();
    void getSupabaseOrNull().then((supabase) => {
      if (!supabase || !mounted) return;
      const {
        data: { subscription }
      } = supabase.auth.onAuthStateChange(() => {
        void refresh();
      });
      unsubscribe = () => subscription.unsubscribe();
    });
    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, []);
  return state;
}
function AccountNav() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { loading, context } = useSessionProfile();
  const logout = async () => {
    await signOut();
    navigate({ to: "/login" });
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "aria-hidden": "true",
        className: "h-10 w-10 shrink-0 animate-pulse rounded-lg bg-primary/10 sm:w-32"
      }
    );
  }
  if (!context) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/login",
        className: "inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-ocean hover:shadow-md sm:px-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden whitespace-nowrap sm:inline", children: t("Connexion", "Sign in") })
        ]
      }
    );
  }
  const { profile } = context;
  const capitainerie = profile.role === "capitainerie";
  const admin = isAdminRole(profile.role) || capitainerie;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "aria-label": profile.fullName,
        className: "inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-ocean hover:shadow-md sm:px-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "size-4 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden max-w-[9rem] truncate sm:inline xl:hidden", children: profile.fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-3.5 shrink-0" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { className: "truncate", children: profile.fullName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
      capitainerie ? /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/port-tarifs", children: t("Tarifs Port", "Marina rates") }) }) : admin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", children: t("Tableau de bord", "Dashboard") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/messages", children: t("Messages", "Messages") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/settings", children: t("Administration", "Administration") }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/client", children: t("Mon espace", "My account") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/client/reservations", children: t("Mes réservations", "My bookings") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/client/messages", children: t("Messages", "Messages") }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { onSelect: () => void logout(), children: t("Déconnexion", "Sign out") })
    ] })
  ] });
}
function MobileRegisterLink({ onNavigate }) {
  const { t } = useI18n();
  const { loading, context } = useSessionProfile();
  if (loading || context) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/register",
      onClick: onNavigate,
      className: "mt-2 flex h-11 items-center justify-center gap-2 rounded-lg border border-primary/30 text-sm font-bold text-primary",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "size-4" }),
        t("Créer un compte", "Create an account")
      ]
    }
  );
}
function MobileLink({
  to,
  label,
  search,
  onNavigate
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to,
      search,
      onClick: onNavigate,
      className: "flex min-h-11 items-center rounded-lg px-4 text-sm font-semibold text-foreground transition hover:bg-secondary hover:text-primary",
      children: label
    }
  );
}
export {
  SiteHeader as S
};
