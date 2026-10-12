import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  type ErrorComponentProps,
  useRouter,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { loadHotelDataFromSupabase } from "../lib/supabase/hotelData";
import { getRequestLocale } from "../lib/i18n/get-request-locale";
import { headT } from "../lib/i18n/head";
import { I18nProvider, useI18n } from "../lib/i18n/I18nProvider";

function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          {t("Page introuvable", "Page not found")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t(
            "La page demandée n'existe pas ou a été déplacée.",
            "The page you are looking for does not exist or has been moved.",
          )}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("Retour à l'accueil", "Back to home")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  const { t } = useI18n();

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("Cette page ne s'est pas chargée", "This page could not be loaded")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t(
            "Une erreur est survenue. Vous pouvez réessayer ou revenir à l'accueil.",
            "Something went wrong. You can try again or go back to the home page.",
          )}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("Réessayer", "Try again")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("Accueil", "Home")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: () => ({ locale: getRequestLocale() }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Marina Cap Monastir" },
      {
        name: "description",
        content: headT(
          "Appart-hôtel et port de plaisance à Monastir.",
          "Aparthotel and marina in Monastir, Tunisia.",
        ),
      },
    ],
    links: [
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/icons/icon-192.png" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  loader: async () => {
    await loadHotelDataFromSupabase();
    return null;
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const { locale } = Route.useRouteContext();
  return (
    <html lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient, locale } = Route.useRouteContext();
  const [, setDataVersion] = useState(0);

  useEffect(() => {
    let isMounted = true;

    void loadHotelDataFromSupabase().then((loaded) => {
      if (loaded && isMounted) setDataVersion((version) => version + 1);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider initialLocale={locale}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <Toaster richColors closeButton />
      </I18nProvider>
    </QueryClientProvider>
  );
}
