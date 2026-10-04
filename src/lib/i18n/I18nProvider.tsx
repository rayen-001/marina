import { useRouter } from "@tanstack/react-router";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  getActiveLocale,
  intlLocale,
  setActiveLocale,
  writeLocaleCookie,
  type Locale,
  type Localized,
} from "./locale";

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Inline translation: `t("Réserver", "Book")`. */
  t: (fr: string, en: string) => string;
  /** Picks the right language from a `{ fr, en }` object (data files). */
  pick: <T>(value: Localized<T>) => T;
  formatDate: (value: string, options?: Intl.DateTimeFormatOptions) => string;
  formatCurrency: (value: number) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // `initialLocale` (from the cookie, read during SSR) only seeds the state: afterwards
  // `setLocale` is the single source of truth, so a slow router reload can't flip it back.
  // Keep the non-React helper (`tr`) in sync before children render.
  setActiveLocale(locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      writeLocaleCookie(next);
      setActiveLocale(next);
      setLocaleState(next);
      // Re-run loaders/head() so page titles and loader-built text follow the new language.
      void router.invalidate();
    },
    [router],
  );

  const value = useMemo(() => buildI18nValue(locale, setLocale), [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function buildI18nValue(locale: Locale, setLocale: (locale: Locale) => void): I18nValue {
  const tag = intlLocale(locale);
  return {
    locale,
    setLocale,
    t: (fr, en) => (locale === "en" ? en : fr),
    pick: (localized) => localized[locale],
    formatDate: (value, options = { day: "2-digit", month: "short", year: "numeric" }) =>
      new Intl.DateTimeFormat(tag, options).format(new Date(`${value.slice(0, 10)}T12:00:00`)),
    formatCurrency: (value) =>
      new Intl.NumberFormat(locale === "en" ? "en-GB" : "fr-TN", {
        style: "currency",
        currency: "TND",
        maximumFractionDigits: 0,
      }).format(value),
  };
}

// Used by screens rendered outside the provider (root 404 / error boundary).
function fallbackSetLocale(next: Locale) {
  writeLocaleCookie(next);
  if (typeof window !== "undefined") window.location.reload();
}

export function useI18n() {
  return useContext(I18nContext) ?? buildI18nValue(getActiveLocale(), fallbackSetLocale);
}
