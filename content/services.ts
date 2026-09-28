import type { Service } from "@/lib/types";

// Hizmetler — ana sayfadaki "Neler Yapıyoruz" bölümü ve /services/[slug] sayfaları buradan okur.
// Yeni hizmet eklemek için: lib/types.ts içindeki ServiceSlug'a slug'ı ekle, sonra bu diziye yeni obje ekle.
// Medya: dosyaları public/images/services/ ve public/videos/services/ altına koy, yolları buraya yaz.
// orientation: "vertical" (dikey video → ana sayfada dar dikey kart) | "horizontal" (yatay → video arka planlı geniş kart).
// Sıra = ana sayfadaki sıra (kullanıcı isteği: Prodüksiyon, Sosyal Medya, AI Prodüksiyon).
// EN: metinler TR'den çevrildi — gözden geçir.

export const servicesSection = {
  eyebrow: { tr: "Hizmetlerimiz", en: "Our Services" },
  title: { tr: "Neler Yapıyoruz", en: "What We Do" },
  // /services sayfası
  pageTitle: { tr: "Neler Yapıyoruz", en: "What We Do" },
  pageDescription: {
    tr: "Prodüksiyon, AI prodüksiyon ve sosyal medya yönetimini strateji ile üretimin aynı ekipte buluştuğu tek bir yaratıcı yapı içinde yönetiyoruz.",
    en: "We manage production, AI production and social media within one creative structure where strategy and production sit in the same team.",
  },
  description: {
    tr: "Her şeyi yapmaya çalışmıyoruz. 360 derece hizmet veren bir ajans olmak yerine; hizmetlerimizi güncel teknoloji ve bakış açımızla bir araya getiriyoruz. Çünkü farkın, daha fazla hizmet sıralamakla değil; doğru alanlarda daha güçlü işler üretmekle oluştuğuna inanıyoruz.",
    en: "We don't try to do everything. Rather than being a 360-degree agency, we bring our services together with up-to-date technology and our own perspective — because we believe the difference comes not from listing more services, but from producing stronger work in the right areas.",
  },
};

export const services: Service[] = [
  {
    slug: "produksiyon",
    number: "01",
    title: { tr: "Prodüksiyon", en: "Production" },
    shortDescription: {
      tr: "Fikirleri güçlü görüntülere dönüştürüyoruz. Reklam filmi, marka videosu, fotoğraf ve sosyal medya prodüksiyonlarını yaratıcı ekip, profesyonel ekipman ve güçlü post-prodüksiyonla hayata geçiriyoruz.",
      en: "We turn ideas into powerful images. We bring commercials, brand films, photography and social media productions to life with a creative crew, professional equipment and strong post-production.",
    },
    headline: {
      tr: "İyi bir fikir, doğru üretimle görünür olur",
      en: "A good idea becomes visible through the right production",
    },
    body: [
      {
        tr: "Prodüksiyon, Range Media'nın çıkış noktasıdır. Bir içeriğin yalnızca teknik olarak iyi görünmesini değil; doğru mesajı, duyguyu ve marka kimliğini taşımasını önemsiyoruz.",
        en: "Production is where Range Media began. We care not only that content looks technically good, but that it carries the right message, emotion and brand identity.",
      },
      {
        tr: "Reklam filmleri, marka videoları, kurumsal içerikler, sosyal medya prodüksiyonları, etkinlik çekimleri ve profesyonel fotoğraf çalışmaları üretiyoruz. Her projeyi aynı kalıba yerleştirmek yerine markanın ihtiyacına, hedef kitlesine ve yayınlanacağı platforma göre tasarlıyoruz.",
        en: "We produce commercials, brand films, corporate content, social media productions, event coverage and professional photography. Rather than forcing every project into the same mould, we design each one around the brand's needs, its audience and the platform it will live on.",
      },
      {
        tr: "Konsept geliştirmeden çekim planına, ekip ve ekipman organizasyonundan kurgu, renk ve ses tasarımına kadar üretimin tüm aşamalarını tek bir yaratıcı yapı içinde yönetiyoruz.",
        en: "From concept development to shooting plans, from crew and equipment to editing, colour and sound design, we manage every stage of production within one creative structure.",
      },
      {
        tr: "Güçlü teknik altyapımızı yaratıcı anlatımla birleştirerek yalnızca iyi görünen değil, izleyicide karşılık bulan ve markaya değer katan içerikler ortaya çıkarıyoruz.",
        en: "By combining solid technical infrastructure with creative storytelling, we create content that doesn't just look good — it resonates with viewers and adds value to the brand.",
      },
    ],
    methods: [
      { tr: "Reklam filmleri", en: "Commercials" },
      { tr: "Marka videoları", en: "Brand films" },
      { tr: "Kurumsal içerikler", en: "Corporate content" },
      { tr: "Sosyal medya prodüksiyonları", en: "Social media productions" },
      { tr: "Etkinlik çekimleri", en: "Event coverage" },
      { tr: "Profesyonel fotoğraf", en: "Professional photography" },
      { tr: "Kurgu, renk ve ses tasarımı", en: "Editing, colour & sound design" },
    ],
    // Şimdilik hero videosu kullanılıyor — TODO: hizmete özel görsel/video ekle
    media: { image: "/images/services/produksiyon.jpg", video: "/videos/services/produksiyon.mp4", orientation: "vertical" },
  },
  {
    slug: "sosyal-medya-yonetimi",
    number: "02",
    title: { tr: "Sosyal Medya Yönetimi", en: "Social Media Management" },
    shortDescription: {
      tr: "Sosyal medyayı yalnızca paylaşım yapılan bir alan olarak görmüyoruz. Markanızın dilini, içerik sistemini ve dijital görünürlüğünü strateji, üretim ve veriye dayalı yönetimle geliştiriyoruz.",
      en: "We don't see social media as just a place to post. We develop your brand's voice, content system and digital visibility through strategy, production and data-driven management.",
    },
    headline: {
      tr: "Paylaşım yapmak değil, markaya ait bir iletişim sistemi kurmak",
      en: "Not just posting — building a communication system that belongs to the brand",
    },
    body: [
      {
        tr: "Her markanın aynı içeriklere ve aynı iletişim yöntemlerine ihtiyacı olmadığını biliyoruz. Bu nedenle hazır paketler ve tekrar eden içerik kalıplarıyla değil, markaya özel ilerliyoruz.",
        en: "We know that not every brand needs the same content or the same way of communicating. That's why we work brand-specifically, not with ready-made packages and repetitive content formulas.",
      },
      {
        tr: "Önce markayı, sektörü, hedef kitleyi ve mevcut dijital görünürlüğü analiz ediyoruz. Ardından markayı yansıtan bir iletişim dili, sürdürülebilir içerik planı ve güçlü bir görsel akış oluşturuyoruz.",
        en: "First we analyse the brand, its sector, its audience and its current digital presence. Then we build a tone of voice that reflects the brand, a sustainable content plan and a strong visual flow.",
      },
      {
        tr: "Strateji, fikir geliştirme, prodüksiyon, tasarım, metin yazımı, yayın planlaması ve performans analizini aynı yapı içinde yönetiyoruz. İçeriği planlayan ekip ile içeriği üreten ekibin birlikte çalışması sayesinde fikir ile uygulama arasındaki bütünlüğü koruyoruz.",
        en: "We manage strategy, ideation, production, design, copywriting, publishing schedules and performance analysis within the same structure. Because the team that plans the content works alongside the team that produces it, the idea and its execution stay aligned.",
      },
      {
        tr: "Amacımız yalnızca hesapları aktif tutmak değil; markanın dijital dünyada tutarlı, tanınabilir ve güven veren bir iletişim kurmasını sağlamak. Verileri düzenli olarak takip ediyor, elde edilen sonuçlara göre içerik yaklaşımını sürekli geliştiriyoruz.",
        en: "Our aim isn't just to keep accounts active, but to help the brand communicate consistently, recognisably and credibly online. We track the data regularly and keep refining the content approach based on results.",
      },
    ],
    methods: [
      { tr: "Strateji ve analiz", en: "Strategy & analysis" },
      { tr: "Fikir geliştirme", en: "Ideation" },
      { tr: "İçerik prodüksiyonu", en: "Content production" },
      { tr: "Tasarım", en: "Design" },
      { tr: "Metin yazımı", en: "Copywriting" },
      { tr: "Yayın planlaması", en: "Publishing schedule" },
      { tr: "Performans analizi", en: "Performance analysis" },
    ],
    // TODO: görsel/video ekle
    media: { image: "/images/services/sosyal-medya-yonetimi.jpg", video: "/videos/services/sosyal-medya.mp4", orientation: "vertical" },
  },
  {
    slug: "ai-produksiyon",
    number: "03",
    title: { tr: "AI Prodüksiyon", en: "AI Production" },
    shortDescription: {
      tr: "Yapay zekâyı yalnızca hız kazanmak için değil, yeni anlatım biçimleri oluşturmak için kullanıyoruz. Markalara özel görsel dünyalar, reklam içerikleri ve yeni nesil dijital prodüksiyonlar tasarlıyoruz.",
      en: "We use AI not just to move faster, but to create new ways of storytelling. We design brand-specific visual worlds, advertising content and next-generation digital productions.",
    },
    headline: {
      tr: "Fikrin sınırlarını genişleten yeni nesil prodüksiyon",
      en: "Next-generation production that expands the limits of an idea",
    },
    body: [
      {
        tr: "AI prodüksiyonu, birkaç komutla hızlı içerik üretmekten ibaret görmüyoruz. Yapay zekânın sunduğu imkânları yaratıcı yönetmenlik, tasarım ve prodüksiyon deneyimimizle birleştiriyoruz.",
        en: "We don't see AI production as generating quick content with a few prompts. We combine what AI makes possible with our experience in creative direction, design and production.",
      },
      {
        tr: "Her projeye markanın kimliği, hedefi ve iletişim dili üzerinden yaklaşıyoruz. Hazır şablonlarla ilerlemek yerine projeye özel bir görsel dünya oluşturuyor; fikrin ilk taslağından son görüntüsüne kadar her aşamayı yaratıcı bir bütünlük içinde yönetiyoruz.",
        en: "We approach every project through the brand's identity, goals and tone of voice. Instead of relying on templates, we build a visual world specific to the project and manage every stage — from the first sketch of the idea to the final frame — as one creative whole.",
      },
      {
        tr: "AI reklam filmleri, ürün görselleştirmeleri, sanal sahneler, konsept çalışmaları, yaratıcı içerik varyasyonları ve yapay zekâ destekli post-prodüksiyon süreçleri geliştiriyoruz. Böylece fiziksel prodüksiyonla gerçekleştirilmesi zor, maliyetli veya zaman alan fikirleri daha esnek bir üretim modeliyle hayata geçiriyoruz.",
        en: "We develop AI commercials, product visualisations, virtual sets, concept work, creative content variations and AI-assisted post-production. This lets us bring to life ideas that would be difficult, costly or time-consuming to realise with physical production, through a more flexible production model.",
      },
      {
        tr: "Amacımız yalnızca yeni teknolojileri kullanmak değil; markanız için gerçekten anlamlı, özgün ve iz bırakan işler üretmek.",
        en: "Our goal isn't simply to use new technology — it's to create work that is genuinely meaningful, original and memorable for your brand.",
      },
    ],
    methods: [
      { tr: "AI reklam filmleri", en: "AI commercials" },
      { tr: "Ürün görselleştirmeleri", en: "Product visualisation" },
      { tr: "Sanal sahneler", en: "Virtual sets" },
      { tr: "Konsept çalışmaları", en: "Concept development" },
      { tr: "Yaratıcı içerik varyasyonları", en: "Creative content variations" },
      { tr: "AI destekli post-prodüksiyon", en: "AI-assisted post-production" },
    ],
    // TODO: görsel/video ekle
    media: { image: "/images/services/ai-produksiyon.jpg", video: "/videos/services/ai-produksiyon.mp4", orientation: "horizontal" },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
