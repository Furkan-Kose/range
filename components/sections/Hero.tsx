import { hero } from "@/content/home";
import { ui } from "@/content/navigation";
import { localePath, t, type Locale } from "@/lib/i18n";
import { existing } from "@/lib/media";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";

/**
 * Hero: video navbar dahil tüm alanı kaplar. Solda başlık (video üstünde, beyaz),
 * altta sayfa zeminine yumuşak geçiş.
 */
export function Hero({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[640px] flex-col overflow-hidden [--wave-lift:clamp(20px,3vw,48px)] md:min-h-[720px] lg:h-[min(100svh,960px)]">
      <BackgroundVideo
        src={hero.video}
        poster={existing(hero.poster)}
        eager
        controls
        controlPosition="left-[var(--gutter)] bottom-[calc(var(--wave-lift)+clamp(32px,5vw,80px)+0.75rem)]"
        controlLabels={{ play: t(ui.playVideo, locale), pause: t(ui.pauseVideo, locale) }}
        label={t(hero.videoLabel, locale)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Okunabilirlik: üstten (navbar) hafif karartma + ortadaki metin için merkezden yayılan karartma */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(0 0 0 / 0.45) 0%, rgb(0 0 0 / 0) 24%), radial-gradient(ellipse 70% 60% at 50% 50%, rgb(0 0 0 / 0.5) 0%, rgb(0 0 0 / 0.2) 70%, rgb(0 0 0 / 0.1) 100%)",
        }}
      />
      {/* Alt kenar: videonun altı hafif koyulaşır ve iç sayfa hero'larıyla aynı dalga ile kesilir (solma yok) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
      <SectionDivider shape="wave" to="default" className="!bottom-[var(--wave-lift)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[calc(var(--wave-lift)+1px)] bg-background" />

      <Container className="on-dark relative z-10 flex flex-1 items-center justify-center pt-[var(--nav-h)] pb-28 text-center text-foreground">
        <div className="mx-auto max-w-3xl">
          <TextReveal id="hero-title" as="h1" immediate delay={0.25} text={t(hero.title, locale)} className="text-display" />
          <Reveal delay={0.55} afterIntro>
            <p className="text-lead mx-auto mt-6 max-w-xl text-white/85">{t(hero.description, locale)}</p>
            {/* Mobilde iki buton eşit genişlikte yan yana (simetrik), sm+ içerik genişliğinde ortalı */}
            <div className="mx-auto mt-9 grid max-w-sm grid-cols-2 gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center">
              <Button href={localePath("/references", locale)} className="justify-center whitespace-nowrap max-sm:!px-3 max-sm:[&>[aria-hidden]]:hidden">
                {t(ui.viewProjects, locale)}
              </Button>
              <Button
                href={localePath("/contact", locale)}
                variant="ghost"
                icon={false}
                className="justify-center whitespace-nowrap max-sm:!px-3"
              >
                {t(ui.contactCta, locale)}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

    </section>
  );
}
