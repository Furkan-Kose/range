import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { references } from "@/content/references";
import { blogPosts } from "@/content/blog";
import { localePath, locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = new Map(blogPosts.filter((p) => !p.placeholder).map((p) => [`/blog/${p.slug}`, p.date]));
  const paths = [
    "/",
    "/services",
    "/references",
    "/about",
    "/blog",
    "/contact",
    ...services.map((s) => `/services/${s.slug}`),
    ...references.map((r) => `/references/${r.slug}`),
    ...blogPosts.filter((p) => !p.placeholder).map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((path) => ({
    url: `${site.url}${localePath(path, "tr")}`,
    ...(posts.has(path) ? { lastModified: posts.get(path) } : {}),
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${site.url}${localePath(path, l)}`])),
        "x-default": `${site.url}${localePath(path, "tr")}`,
      },
    },
  }));
}
