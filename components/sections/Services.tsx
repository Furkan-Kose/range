import { services, servicesSection } from "@/content/services";
import { t, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Media } from "@/components/ui/Media";
import { ServicesList } from "./ServicesList";
import { Camera3D } from "@/components/motion/Camera3D";

/**
 * "Neler Yapıyoruz" — dikey videolu hizmetler görsel/metin dönüşümlü satırlar (dar dikey kart),
 * yatay videolu hizmet ise video arka planlı geniş kart. Kartlar köşeden köşeye çapraz hatla bağlanır.
 */
export function Services({
  locale,
  heading = true,
  divider = true,
}: {
  locale: Locale;
  heading?: boolean;
  divider?: boolean;
}) {
  const items = services.map((s) => {
    const wide = s.media.orientation !== "vertical";
    return {
      slug: s.slug,
      number: s.number,
      title: t(s.title, locale),
      description: t(s.shortDescription, locale),
      wide,
      media: (
        <Media
          src={s.media.image}
          video={s.media.video}
          alt={t(s.title, locale)}
          sizes={
            wide
              ? "(min-width: 1320px) 1256px, 100vw"
              : "(min-width: 1024px) 360px, 90vw"
          }
          className="h-full w-full"
        />
      ),
    };
  });

  return (
    <Section
      id="services"
      aria-labelledby={heading ? "services-title" : undefined}
      className={heading ? "!pt-10 md:!pt-14" : ""}
      divider={divider ? { shape: "diagonal", to: "soft" } : undefined}
    >
      <Container>
        {heading && (
          <SectionHeading
            id="services-title"
            eyebrow={t(servicesSection.eyebrow, locale)}
            title={t(servicesSection.title, locale)}
            description={t(servicesSection.description, locale)}
          />
        )}
        <Camera3D>
          <ServicesList items={items} locale={locale} spaced={heading} />
        </Camera3D>
      </Container>
    </Section>
  );
}
