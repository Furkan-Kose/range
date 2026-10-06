import type { Reference } from "@/lib/types";

// Referanslar — ana sayfa, /references ve /references/[slug] sayfaları buradan okur.
// Yeni referans eklemek: diziye yeni bir obje ekle + logosunu public/images/references/logos/ altına koy.
//   coverImage → public/images/references/covers/<slug>.jpg
//   gallery    → public/images/references/<slug>/1.jpg, 2.jpg ...
//   videos     → Vimeo/YouTube linki veya "/videos/references/<dosya>.mp4"
// Sıralama: bu dizideki sıra sitede de kullanılır.

export const referencesSection = {
  eyebrow: { tr: "Referanslar", en: "Selected Work" },
  title: {
    tr: "Birlikte çalıştığımız markalar",
    en: "Brands we've worked with",
  },
  description: {
    tr: "Otomotivden sanata, spordan gece hayatına; farklı sektörlerde prodüksiyon ve sosyal medya çalışmaları.",
    en: "From automotive to art, sport to nightlife — production and social media work across very different sectors.",
  },
  featuredLabel: { tr: "Öne çıkan projeler", en: "Featured projects" },
  pageTitle: { tr: "Referanslar", en: "Work" },
  // Referansın kendi açıklaması yoksa meta description: "<Marka> — ..."
  metaFallback: {
    tr: "Range Media ile birlikte ürettiğimiz işler.",
    en: "Work we produced together with Range Media.",
  },
  pageDescription: {
    tr: "Range Media olarak birlikte çalıştığımız markalar ve ürettiğimiz işlerden bir seçki.",
    en: "A selection of the brands we have worked with and the work we have made together.",
  },
  videosLabel: { tr: "Videolar", en: "Films" },
  galleryLabel: { tr: "Galeri", en: "Gallery" },
  aboutProject: { tr: "Proje hakkında", en: "About the project" },
  descriptionMissing: {
    tr: "Proje açıklaması eklenecek.",
    en: "Project description to be added.",
  },
};

export const references: Reference[] = [
  {
    slug: "nage-ai",
    name: "NAGE AI",
    tagline: {
      tr: "Bilginin İzinde, Yeni Bir Çağın Eşiğinde",
      en: "On the Trail of Knowledge, at the Threshold of a New Age",
    },
    description: {
      tr: "Bir pazar yerindeki alışverişten uzaya yükselen roketlere uzanan bu filmin merkezinde, insanlığın kuşaklar boyunca biriktirdiği bilgi var. NAGE AI’ın bilginin kaynağını görünür kılma vizyonunu, bu uzun yolculuğun devamı olarak ele aldık. Yapay zekâyla ürettiğimiz sahnelerde geçmişin izlerini geleceğin imgeleriyle buluşturduk; hikâyeyi markanın davetiyle tamamladık: “Meet the new dawn.”",
      en: "From a trade in a marketplace to rockets rising into space, this film is centred on the knowledge humanity has accumulated across generations. We approached NAGE AI’s vision of making the source of knowledge visible as the continuation of that long journey. In scenes created with AI, we brought the traces of the past together with images of the future, and closed the story with the brand’s invitation: “Meet the new dawn.”",
    },
    logo: "/images/references/logos/nage-ai.webp", // TODO: logo eklenince otomatik görünür (yoksa ad yazı olarak çıkar)
    coverImage: "/images/references/covers/nage-ai.jpg", // TODO
    gallery: [],
    videos: ["https://vimeo.com/1233497224"],
    services: ["ai-produksiyon"],
    featured: true,
  },
  {
    slug: "yuzyuzeyken-konusuruz",
    name: "Yüzyüzeyken Konuşuruz",
    description: {
      tr: "Range Media olarak, Yüzyüzeyken Konuşuruz grubunun sosyal medya hesaplarını yönetiyor, konser çekimleri ve içerik tasarımlarıyla hayranlarına unutulmaz anlar sunmalarına destek oluyoruz. Yaratıcı görseller, etkileyici videolar ve stratejik içerik planlamamızla grubun dijital dünyadaki gücünü artırıyoruz.",
      en: "Range Media manages the social media accounts of the band Yüzyüzeyken Konuşuruz, supporting them with concert coverage and content design so they can give their audience moments worth remembering. Through creative visuals, compelling video and strategic content planning we strengthen the band's presence in the digital space.",
    },
    logo: "/images/references/logos/yuzyuzeyken-konusuruz.webp",
    coverImage: "/images/references/covers/yuzyuzeyken-konusuruz.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/1006749457",
      "https://vimeo.com/1038140785",
      "https://vimeo.com/1038139143",
    ],
    services: ["sosyal-medya-yonetimi", "produksiyon"],
    featured: true,
  },
  {
    slug: "damat-tween",
    name: "Damat Tween",
    description: {
      tr: "Range Media olarak, Damat Tween'in Nişantaşı şubesinde Kerem Alışık'ın katılımıyla gerçekleşen mağaza etkinliğinin fotoğraf ve video prodüksiyonunu üstlendik. Etkinliğin özel anlarını öne çıkaran profesyonel çekimlerimizle markanın prestijini ve etkinlik atmosferini başarıyla yansıttık.",
      en: "Range Media handled the photo and video production for Damat Tween's in-store event at their Nişantaşı location, attended by Kerem Alışık. Our coverage highlighted the standout moments of the evening and conveyed both the prestige of the brand and the atmosphere of the event.",
    },
    logo: "/images/references/logos/damat-tween.webp",
    coverImage: "/images/references/covers/damat-tween.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/1037357042",
    ],
    services: ["produksiyon"],
  },
  {
    slug: "inventist-akademi",
    name: "Inventist Akademi",
    description: {
      tr: "Türkiye'nin en büyük spor akademisi İnventist Akademi, Egeiz Yapı ve Range Media iş birliğiyle hayat buldu. Kompleks, Range Media tarafından hazırlanan video prodüksiyon, drone çekimleri ve tanıtım filmi ile duyuruldu.",
      en: "Inventist Akademi, Türkiye's largest sports academy, came to life through a collaboration between Egeiz Yapı and Range Media. The complex was announced with a video production, aerial cinematography and brand film produced by Range Media.",
    },
    logo: "/images/references/logos/inventist-akademi.webp",
    coverImage: "/images/references/covers/inventist-akademi.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/952459673",
    ],
    services: ["produksiyon"],
  },
  {
    slug: "mimar-sinan-guzel-sanatlar-universitesi",
    name: "Mimar Sinan Güzel Sanatlar Üniversitesi",
    description: {
      tr: "Range Media olarak, Coşar Kulaksız'ın Tophane Tek Kubbe'de gerçekleşen Arada sergisinin tanıtım videosunu hazırladık. Çekimlerimizle serginin atmosferini ve eserlerin ruhunu ön plana çıkarmayı hedefledik.",
      en: "Range Media produced the promotional film for Coşar Kulaksız's exhibition Arada, held at Tophane Tek Kubbe. Our coverage aimed to bring forward both the atmosphere of the exhibition and the spirit of the works themselves.",
    },
    logo: "/images/references/logos/mimar-sinan-guzel-sanatlar-universitesi.webp",
    coverImage: "/images/references/covers/mimar-sinan-guzel-sanatlar-universitesi.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/1038558430",
    ],
    services: ["produksiyon"],
  },
  {
    slug: "misk-insaat",
    name: "Misk İnşaat",
    description: {
      tr: "Range Media olarak, İstanbul odaklı inşaat ve gayrimenkul yatırımı alanında faaliyet gösteren Misk İnşaat için dijital iletişimi güçlendiren içerikler hazırladık. Markanın proje vizyonunu daha net anlatan, güven veren bir görsel dil oluşturarak sosyal medya tarafında sürdürülebilir bir içerik akışı kurguladık. Bu çalışma ile Misk İnşaat'ın dijital dünyada daha profesyonel ve bütüncül bir marka duruşu sergilemesine katkı sunmayı amaçladık.",
      en: "Range Media developed content to strengthen the digital communication of Misk İnşaat, an Istanbul-based construction and real-estate investment company. We established a visual language that conveys the company's project vision more clearly and builds trust, then structured a sustainable content flow for their social channels — helping Misk İnşaat present a more professional and coherent brand presence online.",
    },
    logo: "/images/references/logos/misk-insaat.webp",
    coverImage: "/images/references/covers/misk-insaat.jpg", // TODO
    gallery: [],
    videos: [
      "https://youtu.be/XIJNovIlnB0",
    ],
    services: ["sosyal-medya-yonetimi"],
  },
  {
    slug: "porsche-zentrum-landau",
    name: "Porsche Zentrum Landau",
    description: {
      tr: "Range Media olarak, Porsche Zentrum Landau için Reels video edit hizmetleri sunduk. Bu projede, Porsche'nin performansını, lüks tasarımını vurgulayan ve etkinliklerini tanıtan videolar oluşturduk. Araçların hızını, gücünü ve zarafetini ön plana çıkaran görseller ve montaj teknikleri kullanarak marka algısını güçlendirdik. Porsche Zentrum Landau, bu Reels videoları sayesinde geniş bir kitleye ulaştı ve sosyal medya etkileşimlerini önemli ölçüde artırdı. Range Media olarak, bu başarılı tanıtım kampanyasını yönetmenin gururunu yaşıyoruz.",
      en: "As Range Media, we provided Reels video editing services for Porsche Zentrum Landau. In this project, we created videos that highlighted Porsche’s performance, luxurious design, and events. Using visuals and editing techniques that emphasized the speed, power, and elegance of the vehicles, we strengthened the brand perception. Thanks to these Reels videos, Porsche Zentrum Landau reached a broad audience and significantly increased social media engagement. As Range Media, we take pride in managing this successful promotional campaign.",
    },
    logo: "/images/references/logos/porsche-zentrum-landau.webp",
    coverImage: "/images/references/covers/porsche-zentrum-landau.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/980446779",
      "https://vimeo.com/980443829",
      "https://vimeo.com/980444488",
      "https://vimeo.com/980443238",
    ],
    services: ["produksiyon"],
    featured: true,
  },
  {
    slug: "cahide-plazzo",
    name: "Cahide Plazzo",
    description: {
      tr: "Cahide Plazzo’nun enerjisini ve unutulmaz gece hayatını yansıttığımız sosyal medya videolarımızla, izleyicileri bu eşsiz mekana davet ediyoruz. Etkileyici performanslar, canlı müzik ve coşkulu atmosferi takipçilere ulaştırarak, bir sonraki unutulmaz geceye hazır olmalarını sağlıyoruz.",
      en: "With our social media videos reflecting Cahide Plazzo’s energy and unforgettable nightlife, we invite viewers to this unique venue. By showcasing impressive performances, live music, and a vibrant atmosphere, we ensure they are ready for the next unforgettable night.",
    },
    logo: "/images/references/logos/cahide-plazzo.webp",
    coverImage: "/images/references/covers/cahide-plazzo.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/969270085",
    ],
    services: ["produksiyon"],
  },
  {
    slug: "ilhan-dogan",
    name: "İlhan Doğan",
    // TODO: açıklama eklenecek
    logo: "/images/references/logos/ilhan-dogan.webp",
    coverImage: "/images/references/covers/ilhan-dogan.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/1038963455",
    ],
    services: ["sosyal-medya-yonetimi"],
  },
  {
    slug: "ogb",
    name: "OGB",
    description: {
      tr: "Range Media olarak, OGB Attorney Partnership’in sosyal medya içeriklerini hazırlıyor ve yönetimini üstleniyoruz. Hukuk sektöründeki uzmanlıklarını yansıtan özgün tasarımlar, etkili içerik planlaması ve profesyonel yaklaşımımızla markanın dijital dünyadaki varlığını güçlendiriyoruz.",
      en: "As Range Media, we prepare and manage social media content for OGB Attorney Partnership. Through unique designs, effective content planning, and our professional approach, we strengthen the brand’s digital presence in the legal sector.",
    },
    logo: "/images/references/logos/ogb.webp",
    coverImage: "/images/references/covers/ogb.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/1037361676",
    ],
    services: ["sosyal-medya-yonetimi"],
  },
  {
    slug: "pekin-pekin",
    name: "Pekin&Pekin",
    description: {
      tr: "Pekin Attorney Partnership, yeni başlangıcını 11 Eylül'de Divan Kuruçeşme'de düzenlediği şık bir davetle duyurdu. Konukların katılımıyla oldukça sıcak bir ortam oluşan gecede, biz de Range Media olarak tüm detayları görüntülemek için çalıştık. Amacımız, gecenin ruhunu ve samimiyetini yansıtan kareler yakalamaktı.",
      en: "Pekin Attorney Partnership announced its new beginning with an elegant event held on September 11 at Divan Kuruçeşme. With the participation of the guests, the evening turned into a warm and welcoming gathering, and as Range Media, we worked to capture every detail. Our goal was to capture moments that reflected the spirit and sincerity of the night.",
    },
    logo: "/images/references/logos/pekin-pekin.webp",
    coverImage: "/images/references/covers/pekin-pekin.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/1121188058",
    ],
    services: ["produksiyon"],
  },
  {
    slug: "revy",
    name: "Revy",
    description: {
      tr: "Revy App için etkinlik video çekimleri, uygulama içi tanıtım videoları ve tasarımlar hazırladık. Bu hizmet, uygulamanın farklı yönlerini ve kullanım alanlarını kullanıcılarla paylaşarak marka bilinirliğini artırdı. Revy App'in dinamik ve yenilikçi kimliğini yansıtan görsellerimizle, sosyal medya platformlarında geniş bir kitleye ulaşmayı hedefledik.",
      en: "For Revy App, we produced event video shoots, in-app promotional videos, and designs. This service helped showcase different aspects and use cases of the app, increasing brand awareness. Through our visuals that reflect Revy App’s dynamic and innovative identity, we aimed to reach a wide audience on social media platforms.",
    },
    logo: "/images/references/logos/revy.webp",
    coverImage: "/images/references/covers/revy.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/980474271",
    ],
    services: ["sosyal-medya-yonetimi", "produksiyon"],
  },
  {
    slug: "ritmika-cimnastik",
    name: "Ritmika Cimnastik",
    description: {
      tr: "Range Media olarak, Ritmika Cimnastik Spor Kulübü için fotoğraf video ve tasarım hizmeti sunduk. Kasım 2022'te başladığımız bu projede, YouTube ve Reels video çekimleri ile kulübün etkileşimlerini artırmayı hedefledik. Ekip olarak, tasarım ve video elementlerini kullanarak kulübü ve etkinliklerini tanıttık. Çalışmalarımız sonucunda, kulübün etkileşimlerini sosyal medya yönetimine başladığımız andan itibaren 4 ayda 4,000'den 2.8 milyona çıkardık. Şu anda Ritmika Cimnastik'in Instagram hesabı aylık 2 milyonun üzerinde aktif erişime sahip. Range Media olarak, bu başarılı tanıtım kampanyasını yönetmenin gururunu yaşıyoruz.",
      en: "As Range Media, we provided photography, video, and design services for Ritmika Gymnastics Sports Club. Starting in November 2022, in this project, we aimed to increase the club's engagement through YouTube and Reels video shoots. As a team, we promoted the club and its events using design and video elements. As a result of our efforts, the club's engagement grew from 4,000 to 2.8 million in just 4 months after we began managing its social media. Currently, Ritmika Gymnastics' Instagram account has over 2 million active reach per month. As Range Media, we take pride in managing this successful promotional campaign.",
    },
    logo: "/images/references/logos/ritmika-cimnastik.webp",
    coverImage: "/images/references/covers/ritmika-cimnastik.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/980433940",
      "https://vimeo.com/980438339",
      "https://vimeo.com/980438936",
      "https://vimeo.com/980437473",
    ],
    services: ["produksiyon", "sosyal-medya-yonetimi"],
    featured: true,
    metadata: [
      { label: { tr: "Başlangıç", en: "Started" }, value: { tr: "Kasım 2022", en: "November 2022" } },
      { label: { tr: "Etkileşim", en: "Engagement" }, value: { tr: "4 ayda 4.000 → 2,8 milyon", en: "4,000 → 2.8M in 4 months" } },
      { label: { tr: "Aylık erişim", en: "Monthly reach" }, value: { tr: "2 milyon+", en: "2M+" } },
    ],
  },
];

export const getReference = (slug: string) => references.find((r) => r.slug === slug);
