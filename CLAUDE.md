@AGENTS.md

# Range Media — Proje Rehberi

> Bu dosya projede çalışan herkes (ve Claude) için tek referanstır. **Her önemli değişiklikten sonra güncellenir.**
> Son güncelleme: 2026-09-26 — bölüm geçiş şekilleri, ortak sayfa hero'su (PageHero) ve /services sayfası eklendi.

Range Media (fotoğraf/video, AI prodüksiyon, prodüksiyon, sosyal medya yönetimi) için ajans sitesi.

## Komutlar

```bash
npm run dev        # geliştirme (http://localhost:3000)
npm run build      # production build (tüm sayfalar statik üretilir, 68 sayfa)
npm run start      # build sonrası production sunucu
npm run lint       # ESLint (next core-web-vitals + typescript)
npm run typecheck  # tsc --noEmit (önce bir kez `npm run dev` veya `npx next typegen`: PageProps/LayoutProps tipleri)
```

## Teknoloji

- **Next.js 16** (App Router, Turbopack). Dikkat: Next 16'da `middleware.ts` → **`proxy.ts`**. API'ler için `node_modules/next/dist/docs/` okunmalı.
- **TypeScript**, **Tailwind CSS v4** (config dosyası yok; tema `app/globals.css` içinde `@theme` ile)
- **motion** (Framer Motion'ın yeni paket adı, import: `motion/react`)
- **lenis** (yumuşak kaydırma, `components/motion/SmoothScroll.tsx`; reduced-motion'da kapalı, dokunmatikte native), **yet-another-react-lightbox** (video lightbox). Başka kütüphane yok: ikonlar inline SVG, i18n/tema/marquee/slider el yazımı.

## Klasör haritası

```
app/
  globals.css                 ← TÜM renk token'ları, tipografi ölçeği, film şeridi, marquee, .num-fill
  [locale]/layout.tsx         ← kök layout (html/body, fontlar, tema script'i, Navbar/Footer)
  [locale]/page.tsx           ← ana sayfa — bölüm sırası burada
  [locale]/services/          ← "Neler Yapıyoruz" sayfası + [slug] hizmet detay
  [locale]/references/        ← liste + [slug] detay
  [locale]/about, blog, blog/[slug], contact
  [locale]/not-found.tsx, [locale]/[...rest]/  ← 404
  sitemap.ts, robots.ts
proxy.ts                      ← dil yönlendirme (TR prefixsiz, EN /en)
content/                      ← TÜM METİN + MEDYA YOLLARI
lib/  i18n.ts · types.ts · media.ts (dosya var mı?) · seo.ts (metadata)
components/
  layout/   Navbar, MobileMenu, Footer, Logo, ThemeToggle, LocaleSwitcher
  ui/       Container, Section (divider prop), SectionDivider, SectionHeading(+Eyebrow), Button, Media, BackgroundVideo, VideoEmbed,
            Marquee, FilmStripCard, RichText, VideoGallery, icons
  motion/   Reveal, TextReveal, ImageReveal, MotionProvider
  sections/ Hero, Services(+ServicesList), References(+LogoCard, ReferencePreview), WhyRange,
            Testimonials, RngSport, Instagram, ContactCta(ContactSection, ContactChannels),
            ContactForm, PageHero, ReferencesGrid
public/images/…, public/videos/…   ← medya
_source/                      ← kullanıcının verdiği orijinal ham içerik. Site KULLANMAZ; silinebilir.
```

## İçerik nasıl düzenlenir (component koduna dokunmadan)

| Ne | Dosya |
|---|---|
| Menü linkleri, buton/arayüz metinleri | `content/navigation.ts` |
| Hero, Neden Range Media, RNG Sport, Instagram, iletişim bölümü | `content/home.ts` |
| Hizmetler (+ detay sayfa metinleri) | `content/services.ts` |
| Referanslar | `content/references.ts` |
| Yorumlar (testimonial) | `content/testimonials.ts` |
| Hakkımızda | `content/about.ts` |
| Blog yazıları | `content/blog.ts` |
| Telefon, WhatsApp, e-posta, sosyal medya, form metinleri | `content/contact.ts` |
| Site adı, domain, varsayılan SEO, logo yolları | `content/site.ts` |

- Her metin `{ tr: "...", en: "..." }`. EN boşsa TR gösterilir.
- Başlıklarda `*kelime*` → marka yeşiliyle vurgulu kelime, `\n` → satır sonu. Az kullan (hero'da "yapay zekâya").
- **Yeni referans:** `references.ts` dizisine obje ekle + logoyu `public/images/references/logos/<slug>.webp` olarak koy (beyaz/transparan). Sayfa, sitemap ve kayan logo şeridi otomatik oluşur. (Referanslarda kategori etiketi ve /references filtreleri YOK — kullanıcı kaldırttı.)
- **Yeni hizmet:** `lib/types.ts` → `ServiceSlug`'a slug ekle, `services.ts`'e obje ekle.
- **Yeni blog yazısı:** `blog.ts`'e obje ekle (en yeni tarih = öne çıkan). `placeholder: true` olanlar sitemap'e girmez, "Örnek içerik" etiketi gösterir.
- **Bölüm sırası:** `app/[locale]/page.tsx`.

## Medya

- Yollar content dosyalarında açıkça yazılı. **Dosya yoksa "Görsel / video eklenecek + yol" placeholder'ı görünür**; dosyayı o yola koyunca kendiliğinden gelir (production'da yeniden build).
- `Media`: `src` (görsel) + opsiyonel `video` (mp4). Video varsa görsel poster olur. **Poster yoksa video oynayana kadar alan boş görünür → her video için poster eklemek önerilir.**
- Video boyutları (2026-09-28 sıkıştırma, süre/çözünürlük/ses aynı): hizmet videoları x264 CRF 27 (AI: CRF 29) → ~%20 küçük; hero ve RNG web zaten verimliydi, orijinal kaldı; RNG mobil 1080p → 720x1280 (2 geçiş, 1.2 Mbps; 10.2 → 5.2 MB — telefonda fark görünmez). Yeni video eklerken: H.264, `-movflags +faststart`, dikey kartlar 720x1280 yeterli.
- `BackgroundVideo`: sessiz, döngülü, sadece görünürken oynar, reduced-motion'da otomatik oynamaz, `mobileSrc` ile mobil video.
- Referans videoları (Vimeo/YouTube linki veya mp4): `components/ui/VideoGallery.tsx` — kapak kartları, tıklayınca **lightbox** (kütüphane: `yet-another-react-lightbox`; Vimeo/YouTube için özel iframe slide, mp4 için Video plugin). Kapak görseli ve en-boy oranı build sırasında videodan çekilir (`lib/video.ts` → `getVideoInfo`: Vimeo oEmbed / YouTube `i.ytimg.com`). Çekilemezse logo gösterilir. Uzak görsel alanları `next.config.ts` → `images.remotePatterns`.
- Referans logoları beyaz/transparan; light temada CSS filtre ile koyulaşır (`logo-mono`), logo kartına gelince beyaz görünür.
- Logo: `logo-dark.png` (light tema, koyu harfli — orijinalden üretildi) ve `logo.png` (beyaz harfli: dark tema + hero video üstü).

## Tasarım sistemi (v3 — onaylı maket: aydınlık, klasik + premium)

Kullanıcı iki "kinetik/koyu" denemeyi reddetti; onaylanan yön: **açık tema, sade/klasik yerleşim, videolu hero, yumuşak detaylar.** Abartılı efekt (eğik bantlar, kontur başlıklar, dev tipografi, koyu her yer) EKLEME.

**Renkler** — sadece `app/globals.css` token'ları: `--background, --surface (açık gri bölümler), --surface-2, --foreground, --muted, --border, --brand, --brand-foreground, --brand-soft, --accent-text`.
- Varsayılan **light**; navbar'daki düğmeyle dark. `.on-dark` sınıfı: video üstü metin ve RNG Sport bloğu (iki temada da koyu).
- Marka yeşili `#108A6E` (dark temada `#16a382`). Yeşil: butonlar, eyebrow etiketleri, vurgulu kelime, hover, çizgiler.

**Tipografi** — başlıklar Inter Tight (600), gövde Inter. `text-display` (≤70px hero/detay), `text-h1` (≤56), `text-h2` (≤46), `text-h3` (≤28, büyük kart: film şeridi), `text-h4` (20px, TÜM kart başlıkları: blog, referans, ekip, RNG özellikleri), `text-body`, `text-small`, `text-label` (eyebrow, büyük harf, yeşil). Cümle düzeni (büyük harf başlık yok). Yeni sabit `text-[..rem]` başlık boyu ekleme — bu ölçekten seç.

**Ritim** — bölümler beyaz / `tone="soft"` (açık gri) dönüşümlü; `--section-y` boşluk. Boşluk standardı: `SectionHeading` → içerik `mt-12 md:mt-14`; sayfa içi h2 → metin `mt-6`, h2 → ızgara/medya `mt-8 md:mt-10`; aynı bölümdeki alt bloklar arası `mt-[var(--section-y)]`. Kart/medya köşe yarıçapı HEP `rounded-[20px]` (küçük etiket/input 10px, butonlar 8px). Gövde metni `text-body text-muted`.

**Ana sayfa bileşen kararları (kullanıcı onaylı):**
- Navbar zemini: en üstteyken HER sayfada şeffaf (ana sayfada video üstünde beyaz yazı, iç sayfalarda hero'nun gri zemininde koyu yazı — ayrı beyaz şerit yok); kaydırınca/menü açıkken beyaz + blur + alt çizgi.
- Navbar: **desktop (xl+)** linkler solda, logo ORTADA (en üstte büyük `xl:h-16` ve navbar daha yüksek `--nav-h-top` = 112px → logo etrafındaki boşluk aynı; kaydırınca navbar `--nav-h` = 88px, logo `scale-[0.6875]` = eski boyut). PageHero üst boşluğu `--nav-h-top` kullanır, sağda telefon/WhatsApp/dil/tema/buton. **xl altı** (mobil/tablet) eski düzen: logo solda + hamburger.
- Hero: metin "Fikri geliştirir, hayata geçiririz." (kullanıcı verdi), eyebrow YOK, içerik ORTALI (başlık, açıklama, butonlar; merkezden karartma); "Keşfet" işareti sadece md+. Video navbar dahil tüm alanı kaplar; üst/sol hafif karartma; **alt kenar kısa ve yumuşak beyaz geçiş** (uzun geçiş gri bant yapıyordu); ortada "Keşfet" işareti. Navbar hero'dayken şeffaf + beyaz, kaydırınca açık zemin.
- Hizmetler: eyebrow "Hizmetlerimiz", başlık "Neler Yapıyoruz" + uzun giriş paragrafı (kullanıcı verdi); buton "Hizmeti İncele". Sıra: 01 Prodüksiyon, 02 Sosyal Medya, 03 AI Prodüksiyon. `media.orientation`: `vertical` → 360px 9:16 dikey video kartı + metin (sol/sağ dönüşümlü). Başlık normal kapsayıcı hizasında. Video kapsayıcı kenarına yaslı; metin (448px) HER satırda videosunun hemen yanında aynı boşlukla (`gap-28`) → 2. satır 1. satırın tam ayna görüntüsü; AI kartı tam genişlik. Mobilde tam genişlik 4:5; `horizontal` (AI) → tam genişlik kart, video arka planda, metin üstünde (videodaki gömülü siyah şeritler için video büyütülür). Detay sayfasında medya oranı da orientation'a göre. Dikey video kartlarında sağ üstte **ses aç/kapat** düğmesi (`SoundToggle`, aynı anda tek video sesli; düğme detay linkinin dışında). Görsel/metin dönüşümlü satırlar; görsel köşeleri **çapraz hatla** bağlı (kaydırdıkça yeşillenir, `ServicesList`). Numaralar (01–03) kontur, üzerine gelince yeşille dolar (`.num-fill`). Madde listesi YOK, görsel etrafında çerçeve YOK.
- Referanslar: iki sıra ters yönde **kayan logo kartları** (hover'da durur). Kart hover: marka yeşili **glassmorphism** (yarı saydam yeşil + blur + cam parlaması), logo beyaz, hafif büyüme (`scale-[1.06]`). DİKKAT: `Marquee` döngü kopyasına `clone` prop'u ile `tabIndex={-1}` kartlar verilir — `inert` kopya hover/tıklamayı öldürür (bazı logolar çalışmıyordu).
- Neden Range Media: 3 **film şeridi kart** ("Range Media 01A" kod etiketi YOK; hafif açılı, hepsi EŞİT yükseklik: grid `items-stretch` + kart `h-full flex-col`).
- Yorumlar: solda büyük portre, sağda **konuşma balonu** (beyaz, ince çerçeve, portreye bakan kuyruk, sağ üstte yeşil tırnak rozeti, altta kısa yeşil çizgi; alıntı ≤1.375rem; isim/şirket YOK — portrede yazıyor) + altında 6 küçük fotoğraf + oklar (autoplay yok).
- RNG Sport: **tam genişlik koyu bölüm, video arka planda** (soldan karartma + ızgara dokusu). Üst/alt kenar **clip-path ile çapraz** kesilir, video çapraz kenarlara kadar dolar; bölüm Yorumlar'ın altına `-mt` ile biner (Yorumlar divider çizmez); solda metin + buton, altta 01–04 özellik ızgarası. Instagram'dan ayrı bölüm.
- Ana sayfa zemin sırası: Hero → Hizmetler (beyaz) → Referanslar (gri) → Neden RM (beyaz) → Yorumlar (gri) → RNG Sport (koyu `#0b0c0b`, divider fill `dark`) → Instagram (beyaz) → İletişim (gri) → footer.
- Instagram: yelpaze gibi açılı dizilmiş son 5 gönderi (3:4, her biri kendi gönderisine link; mobilde yatay kaydırma).
- İletişim: solda ikonlu kanal kartları, sağda form (yeşil CTA kutusu yerine). Renkler zemine göre ters: ana sayfa (gri zemin) → kanal kartları ve form kartı beyaz, inputlar ve hizmet seçenekleri gri; /contact (beyaz zemin) → kanal kartları gri (`ContactChannels onWhite`), form kartı gri, inputlar ve hizmet seçenekleri beyaz (`ContactForm onSurface`).

**Bölüm geçişleri** — `components/ui/SectionDivider.tsx`. KURAL: **dalga** yalnızca hero altları (ana sayfa Hero + iç sayfa PageHero) · **footer üstü**: şekil yok, yuvarlak üst köşeli koyu blok (`--footer-r`; önceki bölümün altına köşe kadar biner) ve önceki bölümün altına `--tri-h` kadar biner → sivri, simetrik tepe) · **çapraz** diğer tüm ton değişimleri (`Section` → `divider={{ shape: "diagonal", to }}`, HEP AYNI YÖN: sol yukarıda, sağ aşağıda — flip kullanma). `to` her zaman altındaki bölümün tonu olmalı.

**Sayfa hero'su** — tüm iç sayfalar `components/sections/PageHero.tsx`: açık gri zemin, breadcrumb, sayfa adı, açıklama; altında dalga. Dekor yok. Hero'dan sonra içerik HER ZAMAN `<Section>` ile başlar (eşit boşluk).

**Tutarlılık kuralları (kullanıcı isteği)**
- Bölüm başlıkları her yerde aynı düzen: `SectionHeading` → solda eyebrow + başlık + (altında) açıklama; sağda sadece buton. Açıklamayı sağa koyma (kullanıcı beğenmedi). Başlık → içerik arası `mt-12 md:mt-14`. Ortalanmış başlık kullanma. (RNG Sport kendi marka bloğu olduğu için istisna.)
- Aynı içeriği birden fazla sayfaya koyma: "Neden Range Media" yalnızca ana sayfa + Hakkımızda; iç sayfaların sonuna iletişim bandı ekleme (navbar + footer yeterli).
- Hizmet detayı = sayfa hero'su + uzun açıklama + görsel/video. Referans detayı = sayfa hero'su + açıklama + videolar + görseller. Başka blok ekleme.
- Aynı etiketi hero'da ve hemen altındaki bölümde tekrarlama.

**Ana sayfa hero geçişi** — beyaza solma YOK (light modda kötü duruyordu): videonun altı hafif koyulaşır ve iç sayfalardakiyle AYNI dalga (aynı şekil/yükseklik) ile kesilir; dalga `--wave-lift` kadar yukarıda durur, altı düz zemin. `components/sections/Hero.tsx`.

**Hakkımızda** — PageHero → başlık + medya → "Hikâyemiz" klasik iki kolon (solda eyebrow + kısa başlık `about.story`, sağda `about.body` paragrafları düz gövde metni; alıntı kutusu/büyük giriş/etiket linkleri YOK — kullanıcı "abartı" buldu) → Ekibimiz → Neden RM.

**Açılış animasyonu** — `components/layout/Intro.tsx` (tinywins.com'dan uyarlandı): koyu ekranda logo belirir → doku varyasyonları (düz, noktalı, yeşil, çizgili; bu sırada logo hafif sallanır/nefes alır, her değişimde küçük 'pop') → koyu perde aşağıdan yukarı kalkarken logo navbar'daki yerine uçar → hero başlığı satır satır açılır. SADECE ana sayfada (`/`, `/en`), her tam yüklemede/yenilemede; site içi link geçişlerinde ve diğer sayfalarda yok; reduced-motion'da yok. Karar head'deki inline `introScript` ile (`<html data-intro="run|skip|done">`), 9 sn güvenlik zaman aşımı. Hero animasyonları `afterIntro` / `useIntroReady()` (`components/motion/intro.ts`) ile perdeyi bekler; Lenis açılış sürerken durur.

**3D hover (site geneli)** — kartlara `data-tilt`, butonlara `data-tilt="sm"` ver; tek dinleyici `components/motion/TiltManager.tsx`, görünüm `globals.css` → "3D TILT": fareye göre 3D eğim + hafif büyüme + altından/yanlarından marka yeşili yansıma + kartlarda cam parlaması. Kullanılan yerler: Neden RM film kartları, referans logo kartları, referans/blog kartları, video kapakları, hizmet kartları, iletişim kanal kartları, Instagram görselleri, tüm `Button`'lar ve form gönder butonu. Yeni kart/buton eklerken aynısını kullan. Kart `relative` olmalı (parlama ::after).

**3D kamera geçişleri** — `components/motion/Camera3D.tsx`: ana sayfadaki TÜM bölümler aynı hareketle girer: "rise" (Neden Range Media'daki gibi aşağıdan yatık açıyla, derinlikten gelip düzleşir; çıkarken hafifçe geriye yatar). Farklı hareketler (dolly/pan/crane/orbit…) denendi, kullanıcı beğenmedi → hepsi "rise". İçerideki kartlar `CameraLayer depth/orbit` ile farklı derinlik/açıdan gelir. Hizmetler'de sadece dış kamera (bağlantı çizgileri layout koordinatlarıyla ölçülür). Reduced-motion'da kapalı. DİKKAT: 3D döndürmeler mobilde yatay taşma yapar → `html` ve tüm bölümlerde `overflow-x: clip` var (Section bileşeni otomatik; özel `<section>` yazarken `overflow-x-clip` ekle, yoksa mobilde sayfa genişler / sağda beyaz şerit çıkar). İmleç: sistemin normal imleci (özel imleç kullanıcı isteğiyle kaldırıldı).

**Sabit iletişim butonları** — `components/layout/FloatingContact.tsx`, her sayfada sağ altta: üstte beyaz arama butonu, altta WhatsApp (yeşil, nabız halkası); masaüstünde hover'da solda etiket. Açılış animasyonu sürerken gizli; mobil menü ve lightbox üstte kalır (z-30). Bu yüzden hero video durdur butonu SOL altta — sağ alta başka sabit öğe koyma.

**Footer** — her iki temada koyu (`--footer-bg`), beyaz logo.

**Film şeritleri** — kart zemini `--paper` (light: beyaz, dark: koyu); dark temada delikler ayrı SVG (`globals.css`).

**Blog listesi** — klasik 3 kolon ızgara (öne çıkan büyük kart yok).

**Motion** — tek easing `cubic-bezier(0.22,1,0.36,1)` (`ease-brand`). `Reveal` (fade+yukarı), `TextReveal` (hero başlığı), `ImageReveal` (medya açılışı). `MotionConfig reducedMotion="user"`; marquee/scroll-cue reduced-motion'da durur.

## i18n

- TR varsayılan, prefix yok: `/about`. EN: `/en/about`. `/tr/...` → prefixsiz adrese 308.
- `proxy.ts` prefixsiz istekleri içeride `/tr/...`'ye rewrite eder. Link üretirken **her zaman** `localePath(href, locale)`.
- Client'ta `usePathname()` prefixsiz, server'da `/tr/...` dönebilir → `normalizePath()` (Navbar) / `switchLocalePath()` kullan.

## SEO / Erişilebilirlik

- Her sayfada `generateMetadata` → `buildMetadata()` (title, description, canonical, hreflang, OG). `sitemap.xml`, `robots.txt`, Organization JSON-LD.
- Skip link, görünür yeşil focus ring, tek h1/sayfa, menü Escape ile kapanır, video durdur butonu, form hata mesajları.

## SEO (yapılanlar)

- `lib/seo.ts` → `buildMetadata()`: title, description, canonical, hreflang (tr/en + **x-default**), OG (`type`/`publishedTime` blog için), `noindex` (placeholder blog yazıları).
- `app/sitemap.ts` (x-default + blog `lastModified`), `app/robots.ts`, `app/manifest.ts`.
- JSON-LD: `components/seo/JsonLd.tsx`. Layout: Organization (`@id …/#organization`, `sameAs` sadece gerçek profil linkleri) + WebSite. `PageHero` → BreadcrumbList (tüm iç sayfalar otomatik). Hizmet detay → Service. Blog yazısı → BlogPosting (placeholder değilse).
- Varsayılan paylaşım görseli `public/images/og.jpg` ve ikonlar `public/icon.png` (512), `public/apple-icon.png` (180) logodan otomatik üretildi (koyu zemin + beyaz logo) — gerçek tasarım gelince aynı adla değiştir.
- Sayfa başı tek h1 (PageHero / Hero).

## Placeholder / TODO listesi (içerik bekleyenler)

- [x] `content/contact.ts` — telefon 0539 844 45 21, WhatsApp, e-posta range.media0@gmail.com, Instagram @range.media
- [ ] Adres ve diğer sosyal medya hesapları (LinkedIn/YouTube/Vimeo — şu an listede yok)
- [ ] `content/site.ts` — gerçek domain (canonical, sitemap, JSON-LD bunu kullanır); istenirse tasarımlı `public/images/og.jpg` (1200×630) ve favicon
- [x] Posterler: hero, RNG Sport ve 3 hizmet videosunun 1. saniyesinden otomatik alındı (`public/images/hero-poster.jpg`, `rng-sport-poster.jpg`, `services/*.jpg`) — daha iyi bir kare istenirse aynı adla değiştir
- [ ] Hizmet görselleri/videoları: `public/images/services/*.jpg` (yollar `services.ts`'de)
- [ ] Referans kapakları `public/images/references/covers/<slug>.jpg`, galeriler `public/images/references/<slug>/`
- [ ] İlhan Doğan referans açıklaması
- [x] Instagram: @range.media'nın son 5 gönderisi `public/images/instagram/1..5.jpg` + linkleri `content/home.ts → instagram.posts` (2026-09-27 elle çekildi; OTOMATİK GÜNCELLENMEZ). Instagram giriş olmadan API vermiyor → otomatik için Instagram API (Business hesap + token) veya Behold/Elfsight widget gerekir. Kapak görselleri 9:16, sitede 3:4 kırpılır.
- [ ] RNG Sport logo + web sitesi URL'si (`content/home.ts` → `rngSport`)
- [ ] Hakkımızda görseli + Ekibimiz (`about.ts` → `team.members`: isim, pozisyon, fotoğraf `public/images/about/team/`)
- [ ] Blog: 4 örnek yazı `placeholder: true` — gerçeklerle değiştir
- [ ] EN çevirileri (TR'den yapıldı) gözden geçirilmeli
- [x] İletişim formu: sunucu yok — "Mail ile Gönder" (mailto, konu+mesaj hazır) ve "WhatsApp ile Gönder" (wa.me, mesaj hazır) butonları. Zorunlu: ad + mesaj; e-posta opsiyonel.

## Karar günlüğü

- 2026-09-26 v1: URL tabanlı i18n, içerik yapısı, placeholder sistemi. Koyu/minimal tasarım → kullanıcı reddetti.
- 2026-09-26 v2: "kinetik" koyu tasarım (condensed, eğik bantlar) → kullanıcı reddetti ("fazla deneysel, karanlık").
- 2026-09-26 v3: HTML maketlerle birlikte iterasyon → açık tema, klasik + premium düzen onaylandı ve uygulandı.
- 2026-09-26: referans videoları lightbox (YARL) + otomatik video kapakları; footer üçgeni simetrik.
- 2026-09-26: Hakkımızda sadeleşti: rakam kutusu ve 1-2-3 bölümleri kaldırıldı → tek uzun metin (`about.body`) + Ekibimiz (`about.team`) + Neden Range Media. Footer köşe yarıçapı `--footer-r` = clamp(32px,4.5vw,64px).
- 2026-09-26: footer üstündeki üçgen kaldırıldı → yuvarlak üst köşeli footer (kullanıcı seçimi).
- 2026-09-26: hero alt geçişi solma yerine dalga; footer üçgeni clip-path ile (tepede düz çizgi kalmıyor).
- 2026-09-26: geçiş kuralı sabitlendi (dalga=iç hero, üçgen=footer üstü, çapraz=diğer); PageHero dekoru kaldırıldı; footer koyu; film şeritleri dark uyumlu; blog klasik ızgara; "20 referans" sayacı kaldırıldı.
- 2026-09-26: tutarlılık turu — iç sayfa hero altları hep dalga; hizmet/referans detayları sadeleştirildi; tekrar eden bloklar (Neden RM, iletişim bandı, diğer yazılar, önceki/sonraki) kaldırıldı; ana sayfa başlıkları tek düzene getirildi.
- 2026-09-26: 3 geçiş şekli (dalga/çapraz/üçgen) dönüşümlü; iç sayfalarda açık zeminli PageHero (seçenek B); /services sayfası eklendi, navbar "Neler Yapıyoruz" → /services; hero alt geçişi yumuşatıldı.
- 2026-09-26: Neden RM kartları eşit boy; yorum konuşma balonu + küçük font; RNG Sport video arka planlı tam genişlik koyu bölüm (Instagram'dan ayrıldı); Hakkımızda metni Hikâyemiz düzenine alındı.
- 2026-09-26: RNG Sport üst/alt kenarı clip-path çapraz (video kenarlara dolar); yorum balonundan isim/şirket kaldırıldı, balon rozet + çizgiyle güzelleştirildi; SectionHeading açıklaması başlığın altına alındı; Hizmetler başlık-içerik boşluğu diğer bölümlerle eşitlendi; Instagram hesabı @range.media.
- 2026-09-26: Hakkımızda metni sadeleştirildi (klasik iki kolon; alıntı kutusu, büyük giriş paragrafı, hizmet etiketleri kaldırıldı).
- 2026-09-26: tutarlılık + SEO turu — `text-h4` kart başlıkları, boşluk/köşe standardı; x-default hreflang, JSON-LD (WebSite, BreadcrumbList, Service, BlogPosting), OG görseli, favicon, manifest, placeholder bloglara noindex.
- 2026-09-27: navbar desktop'ta ortalanmış logo (büyük → kaydırınca küçük), linkler solda; hero ve Neler Yapıyoruz metinleri kullanıcı metniyle değişti; Lenis yumuşak kaydırma eklendi.
- 2026-09-27: açılış animasyonu (Intro); navbar en üstte daha yüksek (büyük logo, eşit boşluk); hizmetler sırası Prodüksiyon/Sosyal Medya/AI, dikey videolar dar kart, AI yatay video arka planlı geniş kart.
- 2026-09-27: hizmet satırları kapsayıcı kenarlarına hizalandı (tutarlı sol/sağ kenar); açılış animasyonu sadece ana sayfada, her yenilemede.
- 2026-09-27: Neler Yapıyoruz ortalanmış dar blok (1040px), dikey kartlar 300px.
- 2026-09-27: Neler Yapıyoruz tekrar normal hizada; satırlar ayna simetrisi (metin videonun yanında, eşit boşluk).
- 2026-09-27: açılışta logo hareketli; hizmet dikey videolarına ses düğmesi; referans logo kartı hover'ı yeşil glassmorphism.
- 2026-09-27: referans logo şeridinde bazı kartların hover/tıklama çalışmaması düzeltildi (inert kopya → clone), hover'da hafif büyüme.
- 2026-09-27: site geneli 3D tilt hover + yeşil yansıma; özel imleç (play ikonu videolarda); açılışta hareket en baştan; film kartlarındaki kod etiketi ve hero eyebrow kaldırıldı; hero ortalandı.
- 2026-09-27: özel imleç kaldırıldı (normal imleç); Neden Range Media'ya deneme amaçlı 3D kamera geçişi (Camera3D).
- 2026-09-27: 3D kamera geçişleri tüm ana sayfa bölümlerine yayıldı (her bölüm farklı preset).
- 2026-09-27: farklı kamera hareketleri geri alındı; tüm bölümler Neden RM gibi alttan ("rise").
- 2026-09-27: hizmet kartlarındaki beyaz etiketler ("Reklam filmleri" vb.) kaldırıldı; Instagram'a son 5 gönderi eklendi.
- 2026-09-28: /contact'ta kanal kartları gri, form alanları beyaz (beyaz zeminde kaybolmasınlar).
- 2026-09-28: iç sayfalarda navbar en üstte şeffaf (hero ile aynı renk); ana sayfa formundaki hizmet seçenekleri gri.
- 2026-09-28: referans kategori alanı tamamen kaldırıldı (kart altı yazı + detay eyebrow); /references filtre butonları kaldırıldı.
- 2026-09-28: gerçek iletişim bilgileri; form gönder butonu yerine Mail / WhatsApp butonları (mesaj hazır açılır).
- 2026-09-28: hizmet videoları sıkıştırıldı (%18–22), tüm videolara poster eklendi.
- 2026-09-28: RNG Sport mobil videosu 720p'ye indirildi (10.2 → 5.2 MB).
- 2026-09-28: sağ alta sabit WhatsApp + arama butonları; hero video butonu sol alta alındı.
- 2026-09-28: mobilde referanslardan sonra sayfanın genişlemesi (3D kamera kartlarının taşması) düzeltildi — html + bölümlerde overflow-x: clip.
