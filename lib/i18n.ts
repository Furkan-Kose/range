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

/**
 * Sayfa adreslerinin dile göre karşılığı. Kod içinde (klasörler, menü, linkler) HEP iç yol kullanılır
 * (`/services`); TR'de adres çubuğunda Türkçesi görünür (`/hizmetler`). EN iç yolla aynı (`/en/services`).
 * Yeni üst seviye sayfa eklenirse buraya TR karşılığını ekle.
 */
export const segmentAliases: Record<Locale, Record<string, string>> = {
  tr: { services: "hizmetler", references: "referanslar", about: "hakkimizda", contact: "iletisim" },
  en: {},
};

/** İlk segmenti çevirir: iç yol → o dilin adresi (`/services/x` → TR `/hizmetler/x`). */
function aliasFirstSegment(path: string, locale: Locale): string {
  const [, first = "", ...rest] = path.split("/");
  const alias = segmentAliases[locale][first];
  return alias ? ["", alias, ...rest].join("/") : path;
}

/** "/references" → TR: "/referanslar", EN: "/en/references" */
export function localePath(href: string, locale: Locale): string {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  const [path, hash = ""] = href.split("#");
  const localized = aliasFirstSegment(path || "/", locale) + (hash ? `#${hash}` : "");
  if (locale === defaultLocale) return localized;
  return localized === "/" ? `/${locale}` : `/${locale}${localized}`;
}

/**
 * Herhangi bir adresi iç yola çevirir: dil önekini atar, Türkçe segmenti koddaki karşılığına döndürür.
 * "/hizmetler/produksiyon" | "/tr/services/produksiyon" | "/en/services/produksiyon" → "/services/produksiyon"
 */
export function toInternalPath(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|tr)(?=\/|$)/, "") || "/";
  const [, first = "", ...rest] = stripped.split("/");
  for (const map of Object.values(segmentAliases)) {
    const internal = Object.keys(map).find((k) => map[k] === first);
    if (internal) return ["", internal, ...rest].join("/");
  }
  return stripped;
}

/** Aktif path'i diğer dile çevirir (dil seçici için). */
export function switchLocalePath(pathname: string, target: Locale): string {
  return localePath(toInternalPath(pathname), target);
}

export function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
