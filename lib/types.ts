import type { Localized } from "./i18n";

export type { Localized };

export type ServiceSlug = "ai-produksiyon" | "produksiyon" | "sosyal-medya-yonetimi";

/** Görsel veya video. Dosya yoksa site otomatik olarak placeholder gösterir. */
export type MediaItem = {
  image?: string; // "/images/..." — video varsa poster olarak da kullanılır
  video?: string; // "/videos/..." (mp4)
  alt?: Localized;
};

export type Service = {
  slug: ServiceSlug;
  number: string; // "01"
  title: Localized;
  shortDescription: Localized;
  headline: Localized; // detay sayfası alt başlığı
  body: Localized[]; // detay sayfası paragrafları
  methods: Localized[]; // alt hizmetler — ilki ana sayfada görselin üstündeki etiket olarak görünür
  media: MediaItem; // ana sayfa + detay sayfası görseli/videosu
};

export type Reference = {
  slug: string;
  name: string;
  category: Localized;
  shortDescription?: Localized; // liste/önizleme metni (yoksa description kısaltılır)
  description?: Localized;
  logo: string; // "/images/references/logos/<slug>.webp" (beyaz, transparan)
  coverImage?: string; // "/images/references/covers/<slug>.jpg"
  gallery?: string[]; // "/images/references/<slug>/1.jpg" ...
  videos?: string[]; // Vimeo / YouTube linkleri veya "/videos/references/..." mp4
  services: ServiceSlug[];
  featured?: boolean; // ana sayfada öne çıkan projeler listesinde gösterilir
  metadata?: { label: Localized; value: Localized }[]; // ör. Yıl, Sonuç
};

export type Testimonial = {
  name: string;
  company: string;
  quote: Localized;
  photo: string;
};

export type BlogBlock =
  | { type: "p"; text: Localized }
  | { type: "h2"; text: Localized }
  | { type: "quote"; text: Localized }
  | { type: "image"; src: string; alt: Localized; caption?: Localized };

export type BlogPost = {
  slug: string;
  title: Localized;
  excerpt: Localized;
  category: Localized;
  date: string; // "2026-01-15"
  cover?: string;
  placeholder?: boolean; // true ise sayfada "örnek içerik" etiketi görünür
  body: BlogBlock[];
};
