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

/** Logo kartı: açık zeminde gri logo; üzerine gelince kart koyulaşır, logo beyaz görünür. */
export function LogoCard({ reference, locale, className = "" }: { reference: Reference; locale: Locale; className?: string }) {
  return (
    <Link
      href={localePath(`/references/${reference.slug}`, locale)}
      aria-label={reference.name}
      className={`group/logo relative grid h-[110px] w-[230px] shrink-0 place-items-center rounded-[20px] border border-border bg-background transition-colors duration-300 hover:border-[#101110] hover:bg-[#101110] ${className}`}
    >
      <span className="relative h-12 w-[58%]">
        <Image
          src={reference.logo}
          alt=""
          fill
          sizes="140px"
          className="logo-mono object-contain opacity-65 transition-[filter,opacity] duration-300 group-hover/logo:opacity-100 group-hover/logo:[filter:none]"
        />
      </span>
    </Link>
  );
}

/** Referans önizlemesi: kapak görseli varsa o, yoksa logonun koyu zemin üzerindeki hali. */
export function ReferencePreview({ reference, sizes = "400px" }: { reference: Reference; sizes?: string }) {
  if (mediaExists(reference.coverImage)) {
    return <Image src={reference.coverImage!} alt="" fill sizes={sizes} className="object-cover" />;
  }
  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{ background: "radial-gradient(120% 90% at 30% 20%, #23302b, #0d110f)" }}
    >
      <div className="relative h-1/3 w-1/2">
        <Image src={reference.logo} alt="" fill sizes="220px" className="object-contain" />
      </div>
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
      <Container>
        <SectionHeading
          id="references-title"
          eyebrow={t(referencesSection.eyebrow, locale)}
          title={t(referencesSection.title, locale)}
          action={
            <Button href={localePath("/references", locale)} variant="outline">
              {t(ui.allReferences, locale)}
            </Button>
          }
        />
      </Container>

      <Reveal className="mt-12 space-y-4 md:mt-14">
        <Marquee duration={60}>
          {rowA.map((r) => (
            <LogoCard key={r.slug} reference={r} locale={locale} className="mr-4" />
          ))}
        </Marquee>
        <Marquee duration={70} reverse>
          {rowB.map((r) => (
            <LogoCard key={r.slug} reference={r} locale={locale} className="mr-4" />
          ))}
        </Marquee>
      </Reveal>
    </Section>
  );
}
