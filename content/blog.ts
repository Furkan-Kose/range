import type { BlogPost } from "@/lib/types";

// Blog yazıları — /blog ve /blog/[slug] buradan okur.
// Yeni yazı: diziye obje ekle. En yeni tarihli yazı listede en üstte (öne çıkan) görünür.
// Gövde blokları: { type: "p" | "h2" | "quote", text } veya { type: "image", src, alt, caption? }
// Kapak görselleri: public/images/blog/
//
// TODO: Aşağıdaki yazılar ÖRNEK/placeholder'dır (placeholder: true). Gerçek yazılarla değiştir.

export const blogSection = {
  eyebrow: { tr: "Blog", en: "Journal" },
  title: { tr: "Setten notlar", en: "Notes from the set" },
  description: {
    tr: "Prodüksiyon, yapay zekâ ve sosyal medya üzerine yazılar.",
    en: "Writing on production, AI and social media.",
  },
  placeholderBadge: { tr: "Örnek içerik", en: "Sample content" },
};

const placeholderBody: BlogPost["body"] = [
  {
    type: "p",
    text: {
      tr: "Bu yazının içeriği henüz eklenmedi. content/blog.ts dosyasından gövde bloklarını düzenleyebilirsiniz.",
      en: "This post's content hasn't been added yet. Edit the body blocks in content/blog.ts.",
    },
  },
  { type: "h2", text: { tr: "Ara başlık", en: "Subheading" } },
  {
    type: "p",
    text: {
      tr: "Paragraf, ara başlık, alıntı ve görsel blokları desteklenir.",
      en: "Paragraph, subheading, quote and image blocks are supported.",
    },
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-produksiyon-nedir",
    placeholder: true,
    date: "2026-09-01",
    category: { tr: "AI Prodüksiyon", en: "AI Production" },
    title: {
      tr: "AI prodüksiyon: hızdan fazlası",
      en: "AI production: more than speed",
    },
    excerpt: {
      tr: "Örnek yazı — içerik eklenecek.",
      en: "Sample post — content to be added.",
    },
    cover: "/images/blog/ai-produksiyon-nedir.jpg",
    body: placeholderBody,
  },
  {
    slug: "sosyal-medyada-icerik-sistemi",
    placeholder: true,
    date: "2026-08-15",
    category: { tr: "Sosyal Medya", en: "Social Media" },
    title: {
      tr: "Sosyal medyada içerik sistemi kurmak",
      en: "Building a content system for social media",
    },
    excerpt: {
      tr: "Örnek yazı — içerik eklenecek.",
      en: "Sample post — content to be added.",
    },
    cover: "/images/blog/sosyal-medyada-icerik-sistemi.jpg",
    body: placeholderBody,
  },
  {
    slug: "cekim-oncesi-hazirlik",
    placeholder: true,
    date: "2026-07-20",
    category: { tr: "Prodüksiyon", en: "Production" },
    title: {
      tr: "Çekim öncesi hazırlık neden her şeydir?",
      en: "Why pre-production is everything",
    },
    excerpt: {
      tr: "Örnek yazı — içerik eklenecek.",
      en: "Sample post — content to be added.",
    },
    cover: "/images/blog/cekim-oncesi-hazirlik.jpg",
    body: placeholderBody,
  },
  {
    slug: "etkinlik-cekimleri",
    placeholder: true,
    date: "2026-06-10",
    category: { tr: "Prodüksiyon", en: "Production" },
    title: {
      tr: "Etkinlik çekimlerinde anı yakalamak",
      en: "Capturing the moment at live events",
    },
    excerpt: {
      tr: "Örnek yazı — içerik eklenecek.",
      en: "Sample post — content to be added.",
    },
    cover: "/images/blog/etkinlik-cekimleri.jpg",
    body: placeholderBody,
  },
];

export const getSortedPosts = () =>
  [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
