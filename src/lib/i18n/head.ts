import { getRequestLocale } from "./get-request-locale";

/**
 * Translation for route `head()` (page title / meta). Reads the language cookie directly
 * (server: request cookie, browser: document.cookie) so titles follow a language switch.
 */
export function headT(fr: string, en: string) {
  return getRequestLocale() === "en" ? en : fr;
}
