// /about sayfası içerikleri.
// Metinler mevcut içerik dosyalarındaki (hizmetler, Neden Range Media) ifadelerden derlendi.
// TODO: Kuruluş hikâyesi ve ekip bilgileri eklenince aşağıdaki placeholder alanları doldur.

export const about = {
  seo: {
    title: { tr: "Hakkımızda", en: "About" },
    description: {
      tr: "Range Media; prodüksiyon kökenli, strateji ve üretimi aynı yapı içinde yöneten butik bir yaratıcı medya ajansıdır.",
      en: "Range Media is a boutique creative media agency rooted in production, running strategy and production under one roof.",
    },
  },
  hero: {
    eyebrow: { tr: "Hakkımızda", en: "About" },
    title: {
      tr: "Prodüksiyon bizim *çıkış noktamız.*",
      en: "Production is *where we began*.",
    },
    lead: {
      tr: "Bir içeriğin yalnızca teknik olarak iyi görünmesini değil; doğru mesajı, duyguyu ve marka kimliğini taşımasını önemsiyoruz.",
      en: "We care not only that content looks technically good, but that it carries the right message, emotion and brand identity.",
    },
    // TODO: ekip / set fotoğrafı veya video ekle
    media: { image: "/images/about/hero.jpg", video: "/videos/hero/hero.mp4" },
  },

  // Hikâyemiz — metnin solundaki başlık (mevcut içerikten)
  story: {
    eyebrow: { tr: "Hikâyemiz", en: "Our Story" },
    title: { tr: "İyi bir fikir, doğru üretimle görünür olur.", en: "A good idea becomes visible through the right production." },
  },

  // Uzun metin — her öğe bir paragraf.
  body: [
    {
      tr: "Prodüksiyon, Range Media'nın çıkış noktasıdır. Bir içeriğin yalnızca teknik olarak iyi görünmesini değil; doğru mesajı, duyguyu ve marka kimliğini taşımasını önemsiyoruz. Reklam filmlerinden marka videolarına, sosyal medya prodüksiyonlarından yapay zekâ destekli yeni nesil işlere kadar her üretimi bu anlayışla ele alıyoruz.",
      en: "Production is where Range Media began. We care not only that content looks technically good, but that it carries the right message, emotion and brand identity. From commercials and brand films to social media productions and new AI-driven work, we approach every project with that mindset.",
    },
    {
      tr: "Her projeye markanın kimliği, hedefi ve iletişim dili üzerinden yaklaşıyoruz. Hazır şablonlarla ilerlemek yerine projeye özel bir görsel dünya oluşturuyor; fikrin ilk taslağından son görüntüsüne kadar her aşamayı yaratıcı bir bütünlük içinde yönetiyoruz.",
      en: "We approach every project through the brand's identity, goals and tone of voice. Instead of relying on templates, we build a visual world specific to each project and manage every stage — from the first sketch to the final frame — as one creative whole.",
    },
    {
      tr: "Çok sayıda markayla standart paketler üzerinden ilerlemiyoruz. Birlikte çalıştığımız marka sayısını kontrollü tutarak her projeye gereken zamanı ve yaratıcı odağı ayırıyoruz. Yalnızca içerik teslim eden dışarıdan bir ajans değil, markanızı tanıyan ve süreci sahiplenen bir ekip gibi çalışıyoruz.",
      en: "We don't run many brands through standard packages. By keeping the number of brands we work with under control, we give every project the time and creative focus it needs — working not as an outside agency that just delivers content, but as a team that knows your brand and owns the process.",
    },
    {
      tr: "Strateji, fikir geliştirme, prodüksiyon, tasarım ve yayın aynı yapı içinde yönetilir. İçeriği planlayan ekip ile içeriği üreten ekibin birlikte çalışması sayesinde fikir ile uygulama arasındaki bütünlüğü koruyor, markanın dijital dünyada tutarlı ve güven veren bir iletişim kurmasını sağlıyoruz.",
      en: "Strategy, ideation, production, design and publishing are managed within one structure. Because the team that plans the content works alongside the team that produces it, the idea and its execution stay aligned — helping the brand communicate consistently and credibly online.",
    },
  ],

  // Ekibimiz — TODO: gerçek isim, pozisyon ve fotoğraflarla değiştir (fotoğraflar: public/images/about/team/)
  team: {
    eyebrow: { tr: "Ekibimiz", en: "Our Team" },
    title: { tr: "Range Media'nın arkasındaki ekip", en: "The team behind Range Media" },
    members: [
      { name: "Ad Soyad", role: { tr: "Pozisyon", en: "Role" }, photo: "/images/about/team/1.jpg" }, // TODO
      { name: "Ad Soyad", role: { tr: "Pozisyon", en: "Role" }, photo: "/images/about/team/2.jpg" }, // TODO
      { name: "Ad Soyad", role: { tr: "Pozisyon", en: "Role" }, photo: "/images/about/team/3.jpg" }, // TODO
      { name: "Ad Soyad", role: { tr: "Pozisyon", en: "Role" }, photo: "/images/about/team/4.jpg" }, // TODO
    ],
  },
};
