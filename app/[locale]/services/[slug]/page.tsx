import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services, servicesSection } from "@/content/services";
import { localePath, locales, t, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Media } from "@/components/ui/Media";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd, absoluteUrl, organizationRef } from "@/components/seo/JsonLd";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    locale,
    path: `/services/${slug}`,
    title: t(service.title, locale),
    description: t(service.shortDescription, locale),
    image: service.media.image,
  });
}

/** Hizmet detay: sayfa hero'su + uzun açıklama (solda) ve görsel/video (sağda). */
export default async function ServicePage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const service = getService(slug);
  if (!service) notFound();
  const vertical = service.media.orientation === "vertical";

  const title = t(service.title, locale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: title,
          serviceType: title,
          description: t(service.shortDescription, locale),
          url: absoluteUrl(localePath(`/services/${slug}`, locale)),
          provider: organizationRef,
        }}
      />
      <PageHero
        locale={locale}
        crumbs={[{ label: t(servicesSection.pageTitle, locale), href: "/services" }, { label: title }]}
        title={title}
        description={t(service.shortDescription, locale)}
      />

      <Section>
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h2 className="text-h2">{t(service.headline, locale)}</h2>
              <div className="mt-6 space-y-5">
                {service.body.map((p, i) => (
                  <p key={i} className="text-body text-muted">
                    {t(p, locale)}
                  </p>
                ))}
              </div>
            </Reveal>
            <ImageReveal
              className={`overflow-hidden rounded-[20px] lg:sticky lg:top-28 ${vertical ? "mx-auto w-full max-w-[380px]" : ""}`}
            >
              <Media
                src={service.media.image}
                video={service.media.video}
                alt={title}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={vertical ? "aspect-[9/16]" : "aspect-video"}
                priority
              />
            </ImageReveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
