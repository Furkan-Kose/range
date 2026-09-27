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
- Başka kütüphane yok: ikonlar inline SVG, i18n/tema/marquee/slider el yazımı.

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
- **Yeni referans:** `references.ts` dizisine obje ekle + logoyu `public/images/references/logos/<slug>.webp` olarak koy (beyaz/transparan). Sayfa, sitemap, kayan logo şeridi ve filtreler otomatik oluşur.
- **Yeni hizmet:** `lib/types.ts` → `ServiceSlug`'a slug ekle, `services.ts`'e obje ekle. Ana sayfadaki görsel üstü etiket = `methods[0]`.
- **Yeni blog yazısı:** `blog.ts`'e obje ekle (en yeni tarih = öne çıkan). `placeholder: true` olanlar sitemap'e girmez, "Örnek içerik" etiketi gösterir.
- **Bölüm sırası:** `app/[locale]/page.tsx`.

## Medya

- Yollar content dosyalarında açıkça yazılı. **Dosya yoksa "Görsel / video eklenecek + yol" placeholder'ı görünür**; dosyayı o yola koyunca kendiliğinden gelir (production'da yeniden build).
- `Media`: `src` (görsel) + opsiyonel `video` (mp4). Video varsa görsel poster olur. **Poster yoksa video oynayana kadar alan boş görünür → her video için poster eklemek önerilir.**
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
- Hero: video navbar dahil tüm alanı kaplar; üst/sol hafif karartma; **alt kenar kısa ve yumuşak beyaz geçiş** (uzun geçiş gri bant yapıyordu); ortada "Keşfet" işareti. Navbar hero'dayken şeffaf + beyaz, kaydırınca açık zemin.
- Hizmetler: görsel/metin dönüşümlü satırlar; görsel köşeleri **çapraz hatla** bağlı (kaydırdıkça yeşillenir, `ServicesList`). Numaralar (01–03) kontur, üzerine gelince yeşille dolar (`.num-fill`). Madde listesi YOK, görsel etrafında çerçeve YOK.
- Referanslar: iki sıra ters yönde **kayan logo kartları** (hover'da durur).
- Neden Range Media: 3 **film şeridi kart** (hafif açılı, hepsi EŞİT yükseklik: grid `items-stretch` + kart `h-full flex-col`).
- Yorumlar: solda büyük portre, sağda **konuşma balonu** (beyaz, ince çerçeve, portreye bakan kuyruk, sağ üstte yeşil tırnak rozeti, altta kısa yeşil çizgi; alıntı ≤1.375rem; isim/şirket YOK — portrede yazıyor) + altında 6 küçük fotoğraf + oklar (autoplay yok).
- RNG Sport: **tam genişlik koyu bölüm, video arka planda** (soldan karartma + ızgara dokusu). Üst/alt kenar **clip-path ile çapraz** kesilir, video çapraz kenarlara kadar dolar; bölüm Yorumlar'ın altına `-mt` ile biner (Yorumlar divider çizmez); solda metin + buton, altta 01–04 özellik ızgarası. Instagram'dan ayrı bölüm.
- Ana sayfa zemin sırası: Hero → Hizmetler (beyaz) → Referanslar (gri) → Neden RM (beyaz) → Yorumlar (gri) → RNG Sport (koyu `#0b0c0b`, divider fill `dark`) → Instagram (beyaz) → İletişim (gri) → footer.
- Instagram: yelpaze gibi açılı dizilmiş 5 görsel (mobilde yatay kaydırma).
- İletişim: solda ikonlu kanal kartları, sağda form (yeşil CTA kutusu yerine).

**Bölüm geçişleri** — `components/ui/SectionDivider.tsx`. KURAL: **dalga** yalnızca hero altları (ana sayfa Hero + iç sayfa PageHero) · **footer üstü**: şekil yok, yuvarlak üst köşeli koyu blok (`--footer-r`; önceki bölümün altına köşe kadar biner) ve önceki bölümün altına `--tri-h` kadar biner → sivri, simetrik tepe) · **çapraz** diğer tüm ton değişimleri (`Section` → `divider={{ shape: "diagonal", to }}`, HEP AYNI YÖN: sol yukarıda, sağ aşağıda — flip kullanma). `to` her zaman altındaki bölümün tonu olmalı.

**Sayfa hero'su** — tüm iç sayfalar `components/sections/PageHero.tsx`: açık gri zemin, breadcrumb, sayfa adı, açıklama; altında dalga. Dekor yok. Hero'dan sonra içerik HER ZAMAN `<Section>` ile başlar (eşit boşluk).

**Tutarlılık kuralları (kullanıcı isteği)**
- Bölüm başlıkları her yerde aynı düzen: `SectionHeading` → solda eyebrow + başlık + (altında) açıklama; sağda sadece buton. Açıklamayı sağa koyma (kullanıcı beğenmedi). Başlık → içerik arası `mt-12 md:mt-14`. Ortalanmış başlık kullanma. (RNG Sport kendi marka bloğu olduğu için istisna.)
- Aynı içeriği birden fazla sayfaya koyma: "Neden Range Media" yalnızca ana sayfa + Hakkımızda; iç sayfaların sonuna iletişim bandı ekleme (navbar + footer yeterli).
- Hizmet detayı = sayfa hero'su + uzun açıklama + görsel/video. Referans detayı = sayfa hero'su + açıklama + videolar + görseller. Başka blok ekleme.
- Aynı etiketi hero'da ve hemen altındaki bölümde tekrarlama.

**Ana sayfa hero geçişi** — beyaza solma YOK (light modda kötü duruyordu): videonun altı hafif koyulaşır ve iç sayfalardakiyle AYNI dalga (aynı şekil/yükseklik) ile kesilir; dalga `--wave-lift` kadar yukarıda durur, altı düz zemin. `components/sections/Hero.tsx`.

**Hakkımızda** — PageHero → başlık + medya → "Hikâyemiz" klasik iki kolon (solda eyebrow + kısa başlık `about.story`, sağda `about.body` paragrafları düz gövde metni; alıntı kutusu/büyük giriş/etiket linkleri YOK — kullanıcı "abartı" buldu) → Ekibimiz → Neden RM.

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

- [ ] `content/contact.ts` — telefon, WhatsApp, e-posta, adres, Instagram/sosyal linkler
- [ ] `content/site.ts` — gerçek domain (canonical, sitemap, JSON-LD bunu kullanır); istenirse tasarımlı `public/images/og.jpg` (1200×630) ve favicon
- [ ] Posterler: `public/images/hero-poster.jpg`, RNG Sport poster
- [ ] Hizmet görselleri/videoları: `public/images/services/*.jpg` (yollar `services.ts`'de)
- [ ] Referans kapakları `public/images/references/covers/<slug>.jpg`, galeriler `public/images/references/<slug>/`
- [ ] İlhan Doğan referans açıklaması
- [ ] Instagram görselleri `public/images/instagram/1..7.jpg` (4:5). Hesap: @range.media. Instagram giriş yapılmadan veri vermiyor (401 require_login) → otomatik çekme için Instagram API (Business/Creator hesap + token) veya Behold/Elfsight gibi bir widget servisi gerekir.
- [ ] RNG Sport logo + web sitesi URL'si (`content/home.ts` → `rngSport`)
- [ ] Hakkımızda görseli + Ekibimiz (`about.ts` → `team.members`: isim, pozisyon, fotoğraf `public/images/about/team/`)
- [ ] Blog: 4 örnek yazı `placeholder: true` — gerçeklerle değiştir
- [ ] EN çevirileri (TR'den yapıldı) gözden geçirilmeli
- [ ] İletişim formu backend'i: `components/sections/ContactForm.tsx` → `submitForm()`

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
