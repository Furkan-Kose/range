import Image from "next/image";
import { rngSport } from "@/content/home";
import { ui } from "@/content/navigation";
import { t, type Locale } from "@/lib/i18n";
import { existing, mediaExists } from "@/lib/media";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { Reveal } from "@/components/motion/Reveal";

/**
 * RNG Sport — tam genişlik koyu bölüm, video arka planda.
 * Üstünde soldan karartma + ızgara dokusu; solda metin, altta 01–04 özellikler.
 * Her iki temada da koyu (#0b0c0b). Üst ve alt kenar clip-path ile çapraz kesilir (sol yukarıda,
 * sağ aşağıda — sitedeki diğer çaprazlarla aynı yön), böylece video çapraz kenarlara kadar dolar.
 * Üstteki Yorumlar bölümünün altına CUT kadar biner (Yorumlar kendi divider'ını çizmez).
 */
const CUT = "clamp(32px,5vw,80px)"; // SectionDivider yüksekliğiyle aynı

export function RngSport({ locale }: { locale: Locale }) {
  return (
    <section
      aria-labelledby="rng-title"
      className="on-dark relative z-[1] -mt-[clamp(32px,5vw,80px)] overflow-hidden bg-[#0b0c0b] pt-[calc(var(--section-y)+clamp(32px,5vw,80px))] pb-[calc(var(--section-y)+clamp(32px,5vw,80px))] text-foreground"
      style={{ clipPath: `polygon(0 0, 100% ${CUT}, 100% 100%, 0 calc(100% - ${CUT}))` }}
    >
      {/* Arka plan video */}
      <BackgroundVideo
        src={rngSport.video.desktop}
        mobileSrc={rngSport.video.mobile}
        poster={existing(rngSport.video.poster)}
        controls
        controlPosition="right-[var(--gutter)] top-[calc(var(--section-y)*0.6+clamp(32px,5vw,80px))]"
        controlLabels={{ play: t(ui.playVideo, locale), pause: t(ui.pauseVideo, locale) }}
        label={rngSport.name}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgb(11 12 11 / 0.92) 0%, rgb(11 12 11 / 0.7) 45%, rgb(11 12 11 / 0.35) 100%), linear-gradient(0deg, rgb(11 12 11 / 0.85) 0%, rgb(11 12 11 / 0) 45%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <Container className="relative z-[2]">
        <Reveal className="max-w-xl py-6 md:py-12">
          <Eyebrow className="!text-[#2fd3a5]">{t(rngSport.eyebrow, locale)}</Eyebrow>
          <div className="mt-4">
            {mediaExists(rngSport.logo) ? (
              <Image src={rngSport.logo} alt={rngSport.name} width={200} height={60} className="h-10 w-auto" />
            ) : (
              // TODO: RNG Sport logosu eklenince content/home.ts → rngSport.logo
              <p className="font-display text-[1.75rem] font-bold tracking-tight">
                RNG <span className="text-[#2fd3a5]">SPORT</span>
              </p>
            )}
          </div>
          <h2 id="rng-title" className="text-h2 mt-4">
            {t(rngSport.title, locale)}
          </h2>
          <p className="text-body mt-4 text-white/80">{t(rngSport.description, locale)}</p>
          <Button href={rngSport.url} className="mt-8">
            {t(rngSport.cta, locale)}
          </Button>
        </Reveal>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-white/10 bg-white/10 backdrop-blur-sm sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {rngSport.features.map((f, i) => (
            <li key={i} className="bg-[#0b0c0b]/70 p-6">
              <Reveal delay={i * 0.06}>
                <span className="text-small font-semibold text-[#2fd3a5]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-h4 mt-2">{t(f.title, locale)}</h3>
                <p className="text-small mt-2 text-white/70">{t(f.text, locale)}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>

    </section>
  );
}
