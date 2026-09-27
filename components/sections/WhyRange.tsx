import { whyRange } from "@/content/home";
import { t, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FilmStripCard } from "@/components/ui/FilmStripCard";
import { Reveal } from "@/components/motion/Reveal";

// Kartların hafif açıları ve dikey kayması (örnek tasarımdaki gibi)
const tilt = ["md:rotate-[-2deg]", "md:rotate-[1.2deg] md:translate-y-5", "md:rotate-[-0.8deg]"];

/** "Neden Range Media?" — 3 film şeridi kart. */
export function WhyRange({
  locale,
  tone = "default",
  dividerTo = "soft",
}: {
  locale: Locale;
  tone?: "default" | "soft";
  /** Alttaki bölümün tonu (geçiş şekli için) */
  dividerTo?: "default" | "soft" | null;
}) {
  return (
    <Section aria-labelledby="why-title" tone={tone} divider={dividerTo ? { shape: "diagonal", to: dividerTo } : undefined}>
      <Container>
        <SectionHeading id="why-title" eyebrow={t(whyRange.eyebrow, locale)} title={t(whyRange.title, locale)} />
        <div className="mt-12 grid items-stretch gap-8 md:mt-14 md:grid-cols-3 md:gap-6 md:pb-6">
          {whyRange.items.map((item, i) => (
            <Reveal key={item.code} delay={i * 0.1} y={36} className="h-full">
              <FilmStripCard
                code={item.code}
                title={t(item.title, locale)}
                className={`h-full ${tilt[i]} transition-transform duration-500 ease-brand hover:rotate-0`}
              >
                <p>{t(item.text, locale)}</p>
              </FilmStripCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
