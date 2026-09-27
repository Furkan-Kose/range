import { instagram } from "@/content/home";
import { contact } from "@/content/contact";
import { t, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";

// Yelpaze dizilimi: her görselin açısı ve dikey kayması (desktop)
const fan = [
  "rotate-[-6deg] translate-y-5",
  "rotate-[-2deg] z-[1]",
  "rotate-[2deg] -translate-y-2.5 z-[2]",
  "rotate-[-1deg] translate-y-2 z-[1]",
  "rotate-[5deg] translate-y-6",
];

/** Instagram — hafif açılı, üst üste binen görseller. Mobilde yatay kaydırmalı şerit. */
export function Instagram({ locale }: { locale: Locale }) {
  const images = instagram.images.slice(0, fan.length);

  return (
    <Section aria-labelledby="instagram-title" className="overflow-hidden" divider={{ shape: "diagonal", to: "soft" }}>
      <Container>
        <SectionHeading
          id="instagram-title"
          eyebrow={`${t(instagram.eyebrow, locale)} · ${contact.instagram.handle}`}
          title={t(instagram.title, locale)}
          action={
            <Button href={contact.instagram.url} variant="outline">
              {t(instagram.cta, locale)}
            </Button>
          }
        />
      </Container>

      {/* Desktop: yelpaze */}
      <Reveal className="mt-14 hidden justify-center md:flex">
        {images.map((src, i) => (
          <a
            key={src}
            href={contact.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${i + 1}`}
            className={`relative -mx-3.5 block w-[200px] transition-transform duration-500 ease-brand hover:z-10 hover:-translate-y-3 hover:rotate-0 lg:w-[230px] ${fan[i]}`}
          >
            <Media
              src={src}
              alt={`Instagram ${i + 1}`}
              sizes="230px"
              className="aspect-[4/5] rounded-[20px] border-[6px] border-background shadow-[var(--shadow)]"
            />
          </a>
        ))}
      </Reveal>

      {/* Mobil: yatay kaydırma */}
      <div className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-4 md:hidden">
        {instagram.images.map((src, i) => (
          <Media key={src} src={src} alt={`Instagram ${i + 1}`} sizes="60vw" className="aspect-[4/5] w-[60vw] shrink-0 snap-center rounded-[20px]" />
        ))}
      </div>
    </Section>
  );
}
