import { hero } from "@/content/home";
import { ui } from "@/content/navigation";
import { localePath, t, type Locale } from "@/lib/i18n";
import { existing } from "@/lib/media";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";

/**
 * Hero: video navbar dahil tüm alanı kaplar. Solda başlık (video üstünde, beyaz),
 * altta sayfa zeminine yumuşak geçiş, ortada "Keşfet" işareti.
 */
export function Hero({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[640px] flex-col overflow-hidden [--wave-lift:clamp(20px,3vw,48px)] md:min-h-[720px] lg:h-[min(100svh,960px)]">
      <BackgroundVideo
        src={hero.video}
        poster={existing(hero.poster)}
        eager
        controls
        controlPosition="right-[var(--gutter)] bottom-[calc(var(--wave-lift)+clamp(32px,5vw,80px)+0.75rem)]"
        controlLabels={{ play: t(ui.playVideo, locale), pause: t(ui.pauseVideo, locale) }}
        label={t(hero.videoLabel, locale)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Okunabilirlik: üstten (navbar) ve soldan (başlık) hafif karartma */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(0 0 0 / 0.45) 0%, rgb(0 0 0 / 0) 24%), linear-gradient(90deg, rgb(0 0 0 / 0.6) 0%, rgb(0 0 0 / 0.18) 50%, rgb(0 0 0 / 0) 78%)",
        }}
      />
      {/* Alt kenar: videonun altı hafif koyulaşır ve iç sayfa hero'larıyla aynı dalga ile kesilir (solma yok) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
      <SectionDivider shape="wave" to="default" className="!bottom-[var(--wave-lift)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[calc(var(--wave-lift)+1px)] bg-background" />

      <Container className="on-dark relative z-10 flex flex-1 items-center pt-[var(--nav-h)] pb-28 text-foreground">
        <div className="max-w-2xl">
          <Reveal delay={0.15}>
            <Eyebrow className="!text-[#8fe6cc]">{t(hero.eyebrow, locale)}</Eyebrow>
          </Reveal>
          <TextReveal id="hero-title" as="h1" immediate delay={0.25} text={t(hero.title, locale)} className="text-display mt-5" />
          <Reveal delay={0.55}>
            <p className="text-body mt-6 max-w-md text-[1.125rem] text-white/85">{t(hero.description, locale)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={localePath("/references", locale)}>{t(ui.viewProjects, locale)}</Button>
              <Button href={localePath("/contact", locale)} variant="ghost" icon={false}>
                {t(ui.contactCta, locale)}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Keşfet işareti */}
      <a
        href="#services"
        className="text-label absolute bottom-[calc(var(--wave-lift)+clamp(32px,5vw,80px)+0.5rem)] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 !tracking-[0.14em] text-white/80 transition-colors hover:text-white"
      >
        {t(ui.explore, locale)}
        <span aria-hidden className="scroll-cue block h-10 w-px bg-brand" />
      </a>
    </section>
  );
}
