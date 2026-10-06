import type { Metadata } from "next";
import { site } from "@/content/site";
import { mediaExists } from "./media";
import { localePath, locales, type Locale } from "./i18n";

type Args = {
  locale: Locale;
  path: string; // dil prefix'i olmadan: "/about"
  title?: string; // boşsa varsayılan site başlığı
  description: string;
  image?: string;
  /** Blog yazıları için "article" */
  type?: "website" | "article";
  publishedTime?: string;
  /** Örnek/yer tutucu içerik: arama motorlarına kapalı */
  noindex?: boolean;
};

/** Meta açıklama: ~155 karakterde kelime sınırından keser, sonuna "…" ekler. */
export function metaDescription(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:–—-]+$/, "") + "…";
}

/** Her sayfa için title, description, canonical, hreflang ve Open Graph üretir. */
export function buildMetadata({ locale, path, title, description, image, type = "website", publishedTime, noindex }: Args): Metadata {
  // Yerel görsel varsa onu, uzak (https) görsel verildiyse onu (ör. Vimeo kapağı), yoksa varsayılan paylaşım görseli
  const ogImage = [image, site.ogImage].find((src) => (src?.startsWith("https://") ? true : mediaExists(src)));
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: localePath(path, locale),
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, localePath(path, l)])),
        "x-default": localePath(path, "tr"),
      },
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      ...(publishedTime ? { publishedTime } : {}),
      siteName: site.name,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: localePath(path, locale),
      title: title ? `${title} — ${site.name}` : site.seo.title[locale],
      description,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: { card: "summary_large_image" },
  };
}
