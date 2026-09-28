// Ana sayfa metinleri ve medyası (Hero, Neden Range Media, RNG Sport, Instagram, İletişim bölümü).
// Hizmetler → content/services.ts, Referanslar → content/references.ts, Testimonial → content/testimonials.ts
//
// Başlıklarda: *kelime* → italik serif vurgu, \n → satır sonu.

export const hero = {
  title: {
    tr: "Fikri geliştirir,\n*hayata geçiririz.*",
    en: "We develop the idea,\n*and bring it to life.*",
  },
  description: {
    tr: "Markalar için reklam filmleri, fotoğraflar ve dijital içerikler üretiyoruz. Prodüksiyon, yapay zekâ ve sosyal medya çalışmalarını fikir aşamasından yayına kadar birlikte yürütüyoruz.",
    en: "We produce commercials, photography and digital content for brands. We run production, AI and social media work together — from the idea stage all the way to publishing.",
  },
  video: "/videos/hero/hero.mp4",
  // Poster: videonun 1. saniyesinden alındı (hızlı açılış + LCP) — istersen değiştir
  poster: "/images/hero-poster.jpg",
  // Video üzerindeki küçük metadata etiketleri
  tags: [
    { tr: "Prodüksiyon", en: "Production" },
    { tr: "AI", en: "AI" },
    { tr: "Foto / Video", en: "Photo / Video" },
    { tr: "Sosyal Medya", en: "Social Media" },
  ],
  videoLabel: { tr: "Showreel", en: "Showreel" },
};

export const whyRange = {
  eyebrow: { tr: "Neden Range Media?", en: "Why Range Media?" },
  title: {
    tr: "Az sayıda markayla, süreci baştan sona sahiplenerek çalışıyoruz.",
    en: "We work with a small number of brands and own the process end to end.",
  },
  items: [
    {
      code: "01A",
      title: { tr: "Butik Çalışma Modeli", en: "A Boutique Model" },
      text: {
        tr: "Çok sayıda markayla standart paketler üzerinden ilerlemiyoruz. Birlikte çalıştığımız marka sayısını kontrollü tutarak her projeye gereken zamanı ve yaratıcı odağı ayırıyoruz.",
        en: "We don't run many brands through standard packages. By keeping the number of brands we work with under control, we give every project the time and creative focus it needs.",
      },
    },
    {
      code: "02A",
      title: { tr: "Markanızın Bir Parçası Gibi", en: "Part of Your Brand" },
      text: {
        tr: "Yalnızca içerik teslim eden dışarıdan bir ajans değil, markanızı tanıyan ve süreci sahiplenen bir ekip gibi çalışıyoruz.",
        en: "We're not an outside agency that just delivers content — we work like a team that knows your brand and owns the process.",
      },
    },
    {
      code: "03A",
      title: { tr: "Strateji ve Prodüksiyon Bir Arada", en: "Strategy and Production Together" },
      text: {
        tr: "İçerikleri planlayan ve üreten ekip aynı yapı içinde çalışır. Böylece fikir, çekim, tasarım ve yayın süreçlerinde güçlü bir bütünlük sağlarız.",
        en: "The team that plans the content and the team that produces it work in the same structure — keeping ideas, shoots, design and publishing tightly aligned.",
      },
    },
  ],
};

export const rngSport = {
  eyebrow: { tr: "Bir Range Media markası", en: "A Range Media brand" },
  name: "RNG Sport",
  // TODO: RNG Sport logosu eklenince yolu yaz: "/images/rng-sport/logo.png" (boşken yazı logosu gösterilir)
  logo: "",
  title: {
    tr: "Spor organizasyonlarına özel medya çözümleri",
    en: "Media solutions built for sports events",
  },
  description: {
    tr: "RNG Sport olarak spor organizasyonlarının yalnızca çekimini değil, tüm görsel iletişim ve içerik teslim sürecini yönetiyoruz. Sporculara, kulüplere ve organizatörlere özel çözümler sunuyoruz.",
    en: "At RNG Sport we manage not only the filming of sports events but the entire visual communication and content delivery process — with solutions tailored to athletes, clubs and organisers.",
  },
  cta: { tr: "Websitemizi Ziyaret Et", en: "Visit Our Website" },
  // TODO: RNG Sport web sitesi adresi
  url: "https://rngsport.com",
  video: {
    desktop: "/videos/rng-sport/web.mp4",
    mobile: "/videos/rng-sport/mobile.mp4",
    poster: "/images/rng-sport-poster.jpg", // videonun 1. saniyesinden alındı — istersen değiştir
  },
  features: [
    {
      title: { tr: "Rezervasyon Sistemi", en: "Booking System" },
      text: {
        tr: "Sporcular çekim paketlerini organizasyon öncesinde kolayca rezerve edebilir.",
        en: "Athletes can easily book shoot packages ahead of the event.",
      },
    },
    {
      title: { tr: "Kişiye Özel Galeri", en: "Personal Gallery" },
      text: {
        tr: "Hazırlanan içerikler her sporcuya özel, güvenli bir galeri üzerinden teslim edilir.",
        en: "Content is delivered to each athlete through a private, secure gallery.",
      },
    },
    {
      title: { tr: "Canlı Yayın", en: "Live Broadcast" },
      text: {
        tr: "Organizasyonlar profesyonel ekipman ve yayın altyapısıyla canlı olarak izleyicilere ulaştırılır.",
        en: "Events are streamed live to audiences with professional equipment and broadcast infrastructure.",
      },
    },
    {
      title: { tr: "Satış Sonrası Destek", en: "After-Sales Support" },
      text: {
        tr: "Teslimat ve kullanım sürecinde sporculara kesintisiz destek sağlanır.",
        en: "Athletes get uninterrupted support through delivery and beyond.",
      },
    },
  ],
};

export const instagram = {
  eyebrow: { tr: "Instagram", en: "Instagram" },
  title: {
    tr: "Setten, sahneden, kurgudan.",
    en: "From the set, the stage, the edit.",
  },
  cta: { tr: "Instagram'da Takip Et", en: "Follow on Instagram" },
  // @range.media'nın son 5 gönderisi (2026-09-27'de elle çekildi — otomatik güncellenmez).
  // Güncellemek için: görseli public/images/instagram/ altına koy, gönderi linkini yaz. Sıra = sitedeki sıra.
  posts: [
    { image: "/images/instagram/1.jpg", href: "https://www.instagram.com/reel/DdCKuAbOTXu/" },
    { image: "/images/instagram/2.jpg", href: "https://www.instagram.com/reel/DcbuTncoFq5/" },
    { image: "/images/instagram/3.jpg", href: "https://www.instagram.com/reel/DcMPApaIZmt/" },
    { image: "/images/instagram/4.jpg", href: "https://www.instagram.com/reel/DbtAp3nqLis/" },
    { image: "/images/instagram/5.jpg", href: "https://www.instagram.com/p/DbYWZoBAA7P/" },
  ],
};

export const contactSection = {
  eyebrow: { tr: "İletişim", en: "Contact" },
  title: {
    tr: "Projenizi konuşalım.",
    en: "Let's talk about your project.",
  },
  description: {
    tr: "Aklınızdaki fikri anlatın; size en kısa sürede dönüş yapalım.",
    en: "Tell us the idea on your mind — we'll get back to you shortly.",
  },
};
