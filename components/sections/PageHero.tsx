import Link from "next/link";
import type { ReactNode } from "react";
import { ui } from "@/content/navigation";
import { localePath, t, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RichText } from "@/components/ui/RichText";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd, absoluteUrl } from "@/components/seo/JsonLd";

type Crumb = { label: string; href?: string };

type Props = {
  locale: Locale;
  title: string; // *kelime* → marka renginde vurgu
  eyebrow?: string;
  description?: string;
  /** Ana Sayfa otomatik eklenir; son öğe aktif sayfadır (href vermeye gerek yok) */
  crumbs: Crumb[];
  children?: ReactNode; // başlığın altına ek içerik (ör. buton)
};

/**
 * Tüm iç sayfaların ortak üst alanı: açık gri zemin, breadcrumb + sayfa adı + açıklama,
 * altında her sayfada aynı DALGA geçişi. Altındaki içerik <Section> ile başlamalı (eşit boşluk için).
 */
export function PageHero({ locale, title, eyebrow, description, crumbs, children }: Props) {
  const all: Crumb[] = [{ label: t(ui.home, locale), href: "/" }, ...crumbs];
  // Breadcrumb yapısal verisi (son öğe = mevcut sayfa, URL'siz)
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absoluteUrl(localePath(c.href, locale)) } : {}),
    })),
  };

  return (
    <header className="relative bg-surface pt-[calc(var(--nav-h-top)+3rem)] pb-[calc(3rem+clamp(32px,5vw,80px))] md:pt-[calc(var(--nav-h-top)+4.5rem)] md:pb-[calc(4.5rem+clamp(32px,5vw,80px))]">
      <JsonLd data={breadcrumbJsonLd} />
      <Container>
        <Reveal className="max-w-3xl">
          <nav aria-label="Breadcrumb">
            <ol className="text-small flex flex-wrap items-center gap-2 text-muted">
              {all.map((c, i) => {
                const last = i === all.length - 1;
                return (
                  <li key={i} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden>/</span>}
                    {last || !c.href ? (
                      <span aria-current={last ? "page" : undefined} className={last ? "font-medium text-foreground" : ""}>
                        {c.label}
                      </span>
                    ) : (
                      <Link href={localePath(c.href, locale)} className="transition-colors hover:text-brand">
                        {c.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          {eyebrow && <Eyebrow className="mt-6">{eyebrow}</Eyebrow>}
          <h1 className={`text-display text-balance ${eyebrow ? "mt-3" : "mt-5"}`}>
            <RichText text={title} />
          </h1>
          {description && <p className="text-lead mt-5 max-w-xl text-muted">{description}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </Container>

      <SectionDivider shape="wave" to="default" />
    </header>
  );
}
