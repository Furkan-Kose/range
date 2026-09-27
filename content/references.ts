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
  pageDescription: {
    tr: "Range Media olarak birlikte çalıştığımız markalar ve ürettiğimiz işlerden bir seçki.",
    en: "A selection of the brands we have worked with and the work we have made together.",
  },
  filterAll: { tr: "Tümü", en: "All" },
  servicesLabel: { tr: "Hizmetler", en: "Services" },
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
    slug: "yuzyuzeyken-konusuruz",
    name: "Yüzyüzeyken Konuşuruz",
    category: { tr: "Sosyal Medya · Prodüksiyon", en: "Social Media · Production" },
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
    category: { tr: "Etkinlik · Prodüksiyon", en: "Event · Production" },
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
    category: { tr: "Tanıtım Filmi · Drone", en: "Brand Film · Aerial" },
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
    category: { tr: "Sergi · Prodüksiyon", en: "Exhibition · Production" },
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
    category: { tr: "Sosyal Medya · İçerik", en: "Social Media · Content" },
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
    category: { tr: "Otomotiv", en: "Automotive" },
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
    slug: "atlantis-dogal-kaynak-suyu",
    name: "Atlantis Doğal Kaynak Suyu",
    category: { tr: "Marka İletişimi", en: "Brand Communication" },
    description: {
      tr: "Range Media olarak, Atlantis Su için sosyal medya tasarımları hazırladık. Bu projede, markanın doğal kaynak suyunu ve premium hissiyatını öne çıkaran doğa temalı görseller kullandık.Tasarımlarımız, ürünün kalitesini ve saflığını vurguladı. Atlantis Su'nun şişe tasarımları ve logosunu belirgin şekilde yerleştirerek marka bilinirliğini artırmayı hedefledik. Atlantis Su, bu projeyle geniş bir kitleye ulaştı. Range Media olarak, başarılı bir tanıtım kampanyası yönetmenin gururunu yaşıyoruz.",
      en: "As Range Media, we designed social media visuals for Atlantis Water. In this project, we used nature-themed visuals that emphasized the brand’s natural spring water and premium feel. Our designs highlighted the product’s quality and purity. By prominently featuring Atlantis Water’s bottle designs and logo, we aimed to boost brand awareness. With this project, Atlantis Water reached a wide audience. As Range Media, we take pride in managing a successful promotional campaign.",
    },
    logo: "/images/references/logos/atlantis-dogal-kaynak-suyu.webp",
    coverImage: "/images/references/covers/atlantis-dogal-kaynak-suyu.jpg", // TODO
    gallery: [],
    services: ["sosyal-medya-yonetimi"],
  },
  {
    slug: "aydinoglu-yapi",
    name: "Aydınoğlu Yapı",
    category: { tr: "Kurumsal", en: "Corporate" },
    description: {
      tr: "Range Media olarak, köklü yapı tecrübesiyle öne çıkan Aydınoğlu Yapı için markanın kurumsal duruşunu yansıtan sosyal medya içerikleri ürettik. Projelerin estetik, güven ve yaşam kalitesi vurgusunu öne çıkaran içerik kurguları ile dijital mecralarda daha tutarlı ve güçlü bir iletişim dili oluşturmayı hedefledik.",
      en: "As Range Media, we produced social media content for Aydınoğlu Yapı, a company distinguished by its long-standing expertise in construction. With content concepts that emphasize the aesthetics, trust, and quality of life reflected in their projects, we aimed to build a more consistent and impactful communication style across digital platforms.",
    },
    logo: "/images/references/logos/aydinoglu-yapi.webp",
    coverImage: "/images/references/covers/aydinoglu-yapi.jpg", // TODO
    gallery: [],
    services: ["sosyal-medya-yonetimi"],
  },
  {
    slug: "bowax",
    name: "Bowax",
    category: { tr: "Ürün · İçerik", en: "Product · Content" },
    description: {
      tr: "Range Media olarak, Bowax için özel sosyal medya tasarımları ve videolar hazırladık. PPF kaplama ve cam filmi gibi ürünlerini öne çıkaran estetik ve dikkat çekici tasarımlar ve videolar hazırladık. Ürünlerin araçlara sunduğu koruma ve estetik katkıları görsel olarak anlattık. Renk ve düzen seçimlerimiz Bowax'ın kimliğine uygun olarak yapıldı. Bu işbirliğinde Bowax, İstanbul'da geniş bir kitleye ulaşarak marka bilinirliğini artırdı. Range Media olarak, Bowax'ın tanıtımında başarılı bir kampanya yürütmekten gurur duyuyoruz.",
      en: "As Range Media, we created custom social media designs and videos for Bowax. We prepared aesthetic and attention-grabbing visuals that showcased products like PPF coating and window film. Our content visually demonstrated the protection and aesthetic benefits these products provide for vehicles. The color schemes and layouts were carefully chosen to align with Bowax’s brand identity. Through this collaboration, Bowax reached a large audience in Istanbul, increasing its brand recognition. As Range Media, we take pride in executing a successful promotional campaign for Bowax.",
    },
    logo: "/images/references/logos/bowax.webp",
    coverImage: "/images/references/covers/bowax.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/969286862",
      "https://vimeo.com/969286389",
      "https://vimeo.com/969284694",
      "https://vimeo.com/969286677",
    ],
    services: ["sosyal-medya-yonetimi", "produksiyon"],
  },
  {
    slug: "cahide-plazzo",
    name: "Cahide Plazzo",
    category: { tr: "Etkinlik", en: "Event" },
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
    slug: "chez-bebek",
    name: "Chez Bebek",
    category: { tr: "Yeme İçme", en: "Hospitality" },
    description: {
      tr: "Range Media olarak, Chez Bebek gece kulübü ve restoranı için dikkat çekici Instagram Reels videoları hazırladık. Açılış gecesi ve etkinlikleri kapsayan videolarımızda, mekanın şıklığını ve eğlenceli atmosferini öne çıkardık. Dinamik ve estetik görsellerle Chez Bebek'in benzersiz deneyimini yansıttık. Bu videolar sayesinde milyonlarca izlenme elde edildi ve sosyal medya etkileşimleri büyük ölçüde arttı. Range Media olarak, bu başarılı tanıtım kampanyasını yönetmenin gururunu yaşıyoruz.",
      en: "As Range Media, we created eye-catching Instagram Reels videos for Chez Bebek nightclub and restaurant. Our videos, covering the grand opening and events, highlighted the venue’s elegance and lively atmosphere. With dynamic and aesthetic visuals, we captured the unique experience of Chez Bebek. These videos achieved millions of views and significantly boosted social media engagement. As Range Media, we take pride in managing this successful promotional campaign.",
    },
    logo: "/images/references/logos/chez-bebek.webp",
    coverImage: "/images/references/covers/chez-bebek.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/980465286",
      "https://vimeo.com/980476364",
      "https://vimeo.com/980476911",
    ],
    services: ["produksiyon"],
    featured: true,
    metadata: [
      { label: { tr: "Sonuç", en: "Result" }, value: { tr: "Milyonlarca izlenme", en: "Millions of views" } },
    ],
  },
  {
    slug: "cleanxcar",
    name: "CleanXCar",
    category: { tr: "Sosyal Medya", en: "Social Media" },
    description: {
      tr: "Range Media olarak, CleanXCar için profesyonel video edit hizmetleri sunduk. Detaylı araç bakımı alanında uzmanlaşmış bu Alman şirketi için hazırladığımız videolar, CleanXCar'ın üzerinde çalıştığı arabaları ve hizmetlerini ön plana çıkardı. Videolarımız sayesinde, CleanXCar geniş kitlelere ulaşarak marka bilinirliğini ve müşteri tabanını önemli ölçüde artırdı. Range Media olarak, bu başarılı tanıtım kampanyasını yönetmenin gururunu yaşıyoruz.",
      en: "As Range Media, we provided professional video editing services for CleanXCar. For this German company specializing in detailed car care, our videos highlighted the vehicles and services they worked on. Thanks to our videos, CleanXCar reached a wide audience, significantly increasing brand awareness and customer base. As Range Media, we take pride in managing this successful promotional campaign.",
    },
    logo: "/images/references/logos/cleanxcar.webp",
    coverImage: "/images/references/covers/cleanxcar.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/980462062",
      "https://vimeo.com/980460881",
      "https://vimeo.com/980461148",
    ],
    services: ["sosyal-medya-yonetimi"],
  },
  {
    slug: "concentit",
    name: "Concentit",
    category: { tr: "Teknoloji", en: "Technology" },
    description: {
      tr: "Range Media olarak, SAP danışmanlığı alanında uzman ConcentIT için kurumsal kimliğe uygun sosyal medya içerikleri hazırladık. Teknik uzmanlığı anlaşılır hale getiren, hizmetleri öne çıkaran içerik dili ve planlamasıyla markanın dijital iletişimini daha güçlü ve tutarlı bir yapıya kavuşturmayı hedefledik. Stratejik içerik yaklaşımımızla ConcentIT’nin sektör otoritesini destekleyen, güven veren bir dijital görünüm oluşturduk.",
      en: "As Range Media, we created corporate identity–aligned social media content for ConcentIT, a company specialized in SAP consultancy. With a content language and planning approach that makes technical expertise easy to understand and highlights their services, we aimed to build a stronger and more consistent digital communication structure for the brand. Through our strategic content approach, we developed a trustworthy digital presence that reinforces ConcentIT’s authority in the industry.",
    },
    logo: "/images/references/logos/concentit.webp",
    coverImage: "/images/references/covers/concentit.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/1141880021",
    ],
    services: ["sosyal-medya-yonetimi"],
  },
  {
    slug: "the-dark-world-production",
    name: "The Dark World Production",
    category: { tr: "Eğlence", en: "Entertainment" },
    description: {
      tr: "The Dark World Production yapım şirketi ile Serdar Ortaç 'İlaç, Kim Bulmuş Aşkı', Ramiz Ozbay 'Hollywood Efsaneleri 'Kara Şimşek', Belma Şahin 'Dua', Aziz Yuldashev 'Konser Çekimleri' gibi ünlü sanatçıların kliplerinin kapak fotoğraflarını ve backstage çekimlerini yaptık.",
      en: "In collaboration with The Dark World Production, we captured cover photos and backstage footage for music videos of famous artists, including Serdar Ortaç’s 'İlaç, Kim Bulmuş Aşkı,' Ramiz Ozbay’s 'Hollywood Efsaneleri: Kara Şimşek,' Belma Şahin’s 'Dua,' and Aziz Yuldashev’s concert recordings.",
    },
    logo: "/images/references/logos/the-dark-world-production.webp",
    coverImage: "/images/references/covers/the-dark-world-production.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/965724523",
    ],
    services: ["produksiyon"],
  },
  {
    slug: "ilhan-dogan",
    name: "İlhan Doğan",
    category: { tr: "Kurumsal", en: "Corporate" },
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
    category: { tr: "Kurumsal", en: "Corporate" },
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
    slug: "oncu-kale",
    name: "Öncü Kale",
    category: { tr: "Marka İletişimi", en: "Brand Communication" },
    description: {
      tr: "Range Media olarak, banyo–mutfak ve yapı çözümleri alanında hizmet veren Öncü Kale için ürün ve showroom odaklı sosyal medya içerikleri ve tasarımlar ürettik. Marka kimliğine uygun görsel kurgu ve içerik planlamasıyla, hizmet ve ürün çeşitliliğini anlaşılır ve dikkat çekici bir iletişime dönüştürmeyi hedefledik. Yaptığımız çalışmalarla Öncü Kale’nin dijitalde daha güçlü, düzenli ve güven veren bir görünürlük kazanmasına destek olduk.",
      en: "As Range Media, we produced product- and showroom-focused social media content and designs for Öncü Kale, a company providing solutions in bathroom–kitchen and building systems. With a visual concept and content planning aligned with the brand identity, we aimed to transform their diverse services and products into clear and attention-grabbing communication. Through our work, we supported Öncü Kale in achieving a stronger, more consistent, and trustworthy digital presence.",
    },
    logo: "/images/references/logos/oncu-kale.webp",
    coverImage: "/images/references/covers/oncu-kale.jpg", // TODO
    gallery: [],
    videos: [
      "https://vimeo.com/1141883101",
    ],
    services: ["sosyal-medya-yonetimi"],
  },
  {
    slug: "pekin-pekin",
    name: "Pekin&Pekin",
    category: { tr: "Yeme İçme", en: "Hospitality" },
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
    category: { tr: "Ürün · İçerik", en: "Product · Content" },
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
    category: { tr: "Spor", en: "Sports" },
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
