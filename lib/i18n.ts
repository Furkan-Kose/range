export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

/** Her dilli metin alanı bu şekildedir: { tr: "...", en: "..." } */
export type Localized = { tr: string; en: string };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Localized alanı aktif dile çevirir. EN boşsa TR'ye düşer. */
export function t(value: Localized, locale: Locale): string {
  return value[locale] || value.tr;
}

/** "/references" → TR: "/references", EN: "/en/references" */
export function localePath(href: string, locale: Locale): string {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  if (locale === defaultLocale) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

/** Aktif path'i diğer dile çevirir (dil seçici için). */
export function switchLocalePath(pathname: string, target: Locale): string {
  const stripped = pathname.replace(/^\/(en|tr)(?=\/|$)/, "") || "/";
  return localePath(stripped, target);
}

export function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
