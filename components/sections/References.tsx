import Image from "next/image";
import Link from "next/link";
import { references, referencesSection } from "@/content/references";
import { ui } from "@/content/navigation";
import { localePath, t, type Locale } from "@/lib/i18n";
import { mediaExists } from "@/lib/media";
import type { Reference } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Camera3D, CameraLayer } from "@/components/motion/Camera3D";

/** Logo kartı: açık zeminde gri logo; üzerine gelince marka yeşili cam (glassmorphism) kart, logo beyaz görünür. */
export function LogoCard({
  reference,
  locale,
  className = "",
  tabIndex,
}: {
  reference: Reference;
  locale: Locale;
  className?: string;
  /** Marquee döngü kopyasında -1 (klavyeden gizli, fareyle tıklanabilir) */
  tabIndex?: number;
}) {
  return (
    <Link
      href={localePath(`/references/${reference.slug}`, locale)}
      aria-label={reference.name}
      tabIndex={tabIndex}
      data-tilt
      className={`group/logo relative grid h-20 w-40 shrink-0 md:h-[110px] md:w-[230px] place-items-center overflow-hidden rounded-[20px] border border-border bg-background transition-[background-color,border-color] duration-300 hover:z-10 hover:border-white/40 hover:bg-brand/75 hover:backdrop-blur-xl ${className}`}
    >
      {mediaExists(reference.logo) ? (
        <span className="relative h-9 w-[58%] md:h-12">
          <Image
            src={reference.logo}
            alt=""
            fill
            sizes="140px"
            className="logo-mono object-contain opacity-65 transition-[filter,opacity] duration-300 group-hover/logo:opacity-100 group-hover/logo:[filter:none]"
          />
        </span>
      ) : (
        // Logo dosyası yoksa marka adı (logo eklenince otomatik değişir)
        <span className="text-h4 px-3 text-center text-foreground/55 transition-colors duration-300 group-hover/logo:text-white">
          {reference.name}
        </span>
      )}
    </Link>
  );
}

/** Referans önizlemesi: kapak görseli varsa o, yoksa logonun koyu zemin üzerindeki hali. */
export function ReferencePreview({
  reference,
  sizes = "400px",
}: {
  reference: Reference;
  sizes?: string;
}) {
  if (mediaExists(reference.coverImage)) {
    return (
      <Image
        src={reference.coverImage!}
        alt=""
        fill
        sizes={sizes}
        className="object-cover"
      />
    );
  }
  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{
        background: "radial-gradient(120% 90% at 30% 20%, #23302b, #0d110f)",
      }}
    >
      {mediaExists(reference.logo) ? (
        <div className="relative h-1/3 w-1/2">
          <Image
            src={reference.logo}
            alt=""
            fill
            sizes="220px"
            className="object-contain"
          />
        </div>
      ) : (
        <span className="text-h3 px-6 text-center text-white">{reference.name}</span>
      )}
    </div>
  );
}

export function References({ locale }: { locale: Locale }) {
  const half = Math.ceil(references.length / 2);
  const rowA = references.slice(0, half);
  const rowB = references.slice(half);

  return (
    <Section
      id="references"
      tone="soft"
      aria-labelledby="references-title"
      className="overflow-hidden"
      divider={{ shape: "diagonal", to: "default" }}
    >
      <Camera3D>
        <Container>
          <SectionHeading
            id="references-title"
            eyebrow={t(referencesSection.eyebrow, locale)}
            title={t(referencesSection.title, locale)}
            action={
              <Button
                href={localePath("/references", locale)}
                variant="outline"
              >
                {t(ui.allReferences, locale)}
              </Button>
            }
          />
        </Container>

        {/* py-8: hover'da büyüyen kart ve gölgesi şeridin kenarında kesilmesin (-my ile toplam boşluk aynı kalır) */}
        <Reveal className="mt-4 -mb-8 md:mt-6">
          {[
            // hız: piksel/saniye — mobil / masaüstü (iki şerit hafif farklı hızda, ters yönde)
            { items: rowA, speed: 56, desktopSpeed: 74, reverse: false },
            { items: rowB, speed: 48, desktopSpeed: 64, reverse: true },
          ].map((row, i) => (
            <CameraLayer
              key={i}
              depth={1 + i}
              className={i > 0 ? "-mt-12" : ""}
            >
              <Marquee
                speed={row.speed}
                desktopSpeed={row.desktopSpeed}
                reverse={row.reverse}
                className="py-8"
                clone={row.items.map((r) => (
                  <LogoCard
                    key={r.slug}
                    reference={r}
                    locale={locale}
                    className="mr-3 md:mr-4"
                    tabIndex={-1}
                  />
                ))}
              >
                {row.items.map((r) => (
                  <LogoCard
                    key={r.slug}
                    reference={r}
                    locale={locale}
                    className="mr-3 md:mr-4"
                  />
                ))}
              </Marquee>
            </CameraLayer>
          ))}
        </Reveal>
      </Camera3D>
    </Section>
  );
}
