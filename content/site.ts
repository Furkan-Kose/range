// Genel site bilgileri ve varsayılan SEO metinleri.

export const site = {
  name: "Range Media",
  // Ana adres www (Vercel'de yalın adres buraya 308 ile yönleniyor). Sitemap, OG, canonical ve JSON-LD bunu kullanır.
  url: "https://www.rangemedia.com.tr",
  logo: {
    // Beyaz harfli orijinal logo — koyu temada
    onDark: "/images/logo/logo.png",
    // Koyu harfli varyant — açık temada (orijinalden otomatik üretildi; resmi dosya varsa değiştir)
    onLight: "/images/logo/logo-dark.png",
    width: 1228,
    height: 710,
  },
  // TODO: 1200x630 OG görseli ekle
  ogImage: "/images/og.jpg",
  seo: {
    title: {
      tr: "Range Media — Prodüksiyon, AI Prodüksiyon ve Sosyal Medya Ajansı",
      en: "Range Media — Production, AI Production & Social Media Agency",
    },
    description: {
      tr: "Range Media; reklam filmi, fotoğraf ve video prodüksiyonu, yapay zekâ destekli prodüksiyon ve sosyal medya yönetimini tek bir yaratıcı yapı içinde yönetir.",
      en: "Range Media brings commercial, photo and video production, AI-driven production and social media management together under one creative structure.",
    },
  },
};
