import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { LOCALE_COOKIE, normalizeLocale, readLocaleFromDocumentCookie } from "./locale";

/** Reads the visitor's language from the `marina_lang` cookie, on the server (SSR) and in the browser. */
export const getRequestLocale = createIsomorphicFn()
  .server(() => normalizeLocale(getCookie(LOCALE_COOKIE)))
  .client(() => readLocaleFromDocumentCookie());
