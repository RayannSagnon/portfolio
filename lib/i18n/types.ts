export type Locale = "en" | "fr";

export const LOCALE_STORAGE_KEY = "rs_locale";

export const locales: Locale[] = ["en", "fr"];

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "fr";
}
