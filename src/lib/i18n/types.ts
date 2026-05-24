export type Locale = "ar" | "en";

export const defaultLocale: Locale = "ar";

export const locales: Locale[] = ["ar", "en"];

export type LocalizedString = Record<Locale, string>;

export function t(locale: Locale, value: LocalizedString): string {
  return value[locale];
}
