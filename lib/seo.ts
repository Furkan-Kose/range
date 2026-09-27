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

/** Her sayfa için title, description, canonical, hreflang ve Open Graph üretir. */
export function buildMetadata({ locale, path, title, description, image, type = "website", publishedTime, noindex }: Args): Metadata {
  const ogImage = [image, site.ogImage].find((src) => mediaExists(src));
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
