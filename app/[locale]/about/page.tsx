import type { Metadata } from "next";
import { about } from "@/content/about";
import { t, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import { Media } from "@/components/ui/Media";
import { RichText } from "@/components/ui/RichText";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { WhyRange } from "@/components/sections/WhyRange";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return buildMetadata({
    locale,
    path: "/about",
    title: t(about.seo.title, locale),
    description: t(about.seo.description, locale),
    image: about.hero.media.image,
  });
}

/** Hakkımızda: sayfa hero'su → giriş (başlık + medya + tek uzun metin) → Ekibimiz → Neden Range Media. */
export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = (await params).locale as Locale;

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: t(about.hero.eyebrow, locale) }]}
        title={t(about.hero.eyebrow, locale)}
        description={t(about.hero.lead, locale)}
      />

      {/* GİRİŞ + UZUN METİN */}
      <Section divider={{ shape: "diagonal", to: "soft" }}>
        <Container>
          <Reveal>
            <h2 className="text-h2 max-w-2xl">
              <RichText text={t(about.hero.title, locale)} />
            </h2>
          </Reveal>
          <ImageReveal className="mt-8 overflow-hidden rounded-[20px] md:mt-10">
            <Media
              src={about.hero.media.image}
              video={about.hero.media.video}
              alt={t(about.hero.eyebrow, locale)}
              sizes="100vw"
              className="aspect-[4/3] md:aspect-[21/9]"
              priority
            />
          </ImageReveal>
          {/* HİKÂYEMİZ — klasik iki kolon: solda başlık, sağda metin */}
          <div className="mt-14 grid gap-8 md:mt-20 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            <Reveal>
              <Eyebrow>{t(about.story.eyebrow, locale)}</Eyebrow>
              <h3 className="text-h3 mt-3 max-w-sm">{t(about.story.title, locale)}</h3>
            </Reveal>
            <Reveal delay={0.08} className="space-y-5">
              {about.body.map((p, i) => (
                <p key={i} className="text-body text-muted">
                  {t(p, locale)}
                </p>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* EKİBİMİZ */}
      <Section tone="soft" aria-labelledby="team-title" divider={{ shape: "diagonal", to: "default" }}>
        <Container>
          <SectionHeading id="team-title" eyebrow={t(about.team.eyebrow, locale)} title={t(about.team.title, locale)} />
          <ul className="mt-12 grid grid-cols-2 gap-5 md:mt-14 lg:grid-cols-4">
            {about.team.members.map((m, i) => (
              <li key={i}>
                <Reveal delay={i * 0.05}>
                  <Media src={m.photo} alt={m.name} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/5] rounded-[20px]" />
                  <p className="text-h4 mt-4">{m.name}</p>
                  <p className="text-small text-muted">{t(m.role, locale)}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <WhyRange locale={locale} dividerTo={null} />
    </>
  );
}
