export type Locale = "fr" | "en";

export const DEFAULT_LOCALE: Locale = "fr";
export const LOCALE_COOKIE = "marina_lang";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/** A text available in both site languages. */
export type Localized<T = string> = { fr: T; en: T };

export function normalizeLocale(value: unknown): Locale {
  return value === "en" ? "en" : DEFAULT_LOCALE;
}

/** BCP-47 tag used by Intl formatters. */
export function intlLocale(locale: Locale) {
  return locale === "en" ? "en-GB" : "fr-FR";
}

export function readLocaleFromDocumentCookie(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  return normalizeLocale(match?.[1]);
}

export function writeLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
}

// Locale for code that runs outside React (services, event-handler errors).
// Only updated in the browser, so concurrent server renders never share it;
// components must use `useI18n()` instead.
let activeLocale: Locale = DEFAULT_LOCALE;

export function setActiveLocale(locale: Locale) {
  if (typeof window !== "undefined") activeLocale = locale;
}

export function getActiveLocale(): Locale {
  return typeof window === "undefined" ? DEFAULT_LOCALE : activeLocale;
}

/** Non-React translation helper — picks the French or English text for the active locale. */
export function tr(fr: string, en: string) {
  return getActiveLocale() === "en" ? en : fr;
}
