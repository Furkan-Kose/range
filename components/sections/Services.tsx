import { services, servicesSection } from "@/content/services";
import { t, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Media } from "@/components/ui/Media";
import { ServicesList } from "./ServicesList";

/** "Neler Yapıyoruz" — görsel/metin dönüşümlü satırlar, satırlar çapraz bir hatla bağlanır. */
export function Services({ locale, heading = true, divider = true }: { locale: Locale; heading?: boolean; divider?: boolean }) {
  const items = services.map((s) => ({
    slug: s.slug,
    number: s.number,
    title: t(s.title, locale),
    description: t(s.shortDescription, locale),
    caption: s.methods[0] ? t(s.methods[0], locale) : "",
    media: (
      <Media
        src={s.media.image}
        video={s.media.video}
        alt={t(s.title, locale)}
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="h-full w-full"
      />
    ),
  }));

  return (
    <Section id="services" aria-labelledby={heading ? "services-title" : undefined} className={heading ? "!pt-10 md:!pt-14" : ""} divider={divider ? { shape: "diagonal", to: "soft" } : undefined}>
      <Container>
        {heading && (
          <SectionHeading
            id="services-title"
            eyebrow={t(servicesSection.eyebrow, locale)}
            title={t(servicesSection.title, locale)}
            description={t(servicesSection.description, locale)}
          />
        )}
        <ServicesList items={items} locale={locale} spaced={heading} />
      </Container>
    </Section>
  );
}
