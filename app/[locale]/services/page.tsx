import type { Metadata } from "next";
import { servicesSection } from "@/content/services";
import { t, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Services } from "@/components/sections/Services";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return buildMetadata({
    locale,
    path: "/services",
    title: t(servicesSection.pageTitle, locale),
    description: t(servicesSection.pageDescription, locale),
  });
}

/** /services — tüm hizmetler (ana sayfadaki hizmet satırlarıyla aynı) */
export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const locale = (await params).locale as Locale;
  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: t(servicesSection.pageTitle, locale) }]}
        title={t(servicesSection.pageTitle, locale)}
        description={t(servicesSection.pageDescription, locale)}
      />
      <Services locale={locale} heading={false} divider={false} />
    </>
  );
}
