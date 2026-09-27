import type { Metadata } from "next";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { References } from "@/components/sections/References";
import { WhyRange } from "@/components/sections/WhyRange";
import { Testimonials } from "@/components/sections/Testimonials";
import { RngSport } from "@/components/sections/RngSport";
import { Instagram } from "@/components/sections/Instagram";
import { ContactSection } from "@/components/sections/ContactCta";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return buildMetadata({ locale, path: "/", description: site.seo.description[locale] });
}

// Bölüm sırasını değiştirmek için aşağıdaki sırayı değiştirmen yeterli.
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  return (
    <>
      <Hero locale={locale} />
      <Services locale={locale} />
      <References locale={locale} />
      <WhyRange locale={locale} />
      <Testimonials locale={locale} />
      <RngSport locale={locale} />
      <Instagram locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}
