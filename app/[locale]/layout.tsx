import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Inter_Tight } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/layout/Logo";
import { site } from "@/content/site";
import { contact } from "@/content/contact";
import { ui } from "@/content/navigation";
import { isLocale, locales, t } from "@/lib/i18n";
import { JsonLd } from "@/components/seo/JsonLd";
import "../globals.css";

// Gövde metni
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});
// Başlıklar
const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(site.url),
    title: { default: site.seo.title[locale], template: `%s — ${site.name}` },
    description: site.seo.description[locale],
    icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0f0e" },
  ],
};

// Tema, sayfa boyanmadan önce ayarlanır (flash olmaz). Varsayılan: light.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // sameAs: sadece gerçek profil linkleri (TODO olan "https://instagram.com/" gibi kök adresler hariç)
  const sameAs = contact.socials.map((s) => s.href).filter((href) => new URL(href).pathname.length > 1);
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}${site.logo.onDark}`,
    image: `${site.url}${site.ogImage}`,
    description: site.seo.description[locale],
    ...(sameAs.length ? { sameAs } : {}),
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: locale,
    publisher: { "@id": `${site.url}/#organization` },
  };

  return (
    <html
      lang={locale}
      data-theme="light"
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={orgJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-foreground"
        >
          {t(ui.skipToContent, locale)}
        </a>
        <MotionProvider>
          <Navbar
            locale={locale}
            logo={<Logo className="h-10 w-auto xl:h-11" priority />}
            logoWhite={<Logo variant="white" className="h-10 w-auto xl:h-11" priority />}
          />
          <main id="main">{children}</main>
          <Footer locale={locale} />
        </MotionProvider>
      </body>
    </html>
  );
}
