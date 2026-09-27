import type { Metadata } from "next";
import { references, referencesSection } from "@/content/references";
import { services } from "@/content/services";
import { t, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { ReferencesGrid } from "@/components/sections/ReferencesGrid";
import { ReferencePreview } from "@/components/sections/References";

export async function generateMetadata({ params }: PageProps<"/[locale]/references">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return buildMetadata({
    locale,
    path: "/references",
    title: t(referencesSection.pageTitle, locale),
    description: t(referencesSection.pageDescription, locale),
  });
}

export default async function ReferencesPage({ params }: PageProps<"/[locale]/references">) {
  const locale = (await params).locale as Locale;
  // Sadece en az bir referansı olan hizmetler filtrede görünür
  const filters = [
    { value: "all", label: t(referencesSection.filterAll, locale) },
    ...services
      .filter((s) => references.some((r) => r.services.includes(s.slug)))
      .map((s) => ({ value: s.slug, label: t(s.title, locale) })),
  ];

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: t(referencesSection.pageTitle, locale) }]}
        title={t(referencesSection.pageTitle, locale)}
        description={t(referencesSection.pageDescription, locale)}
      />
      <Section>
        <Container>
          <ReferencesGrid
            locale={locale}
            filters={filters}
            filterLabel={t(referencesSection.servicesLabel, locale)}
            items={references.map((r) => ({
              slug: r.slug,
              name: r.name,
              category: t(r.category, locale),
              services: r.services,
              preview: <ReferencePreview reference={r} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />,
            }))}
          />
        </Container>
      </Section>
    </>
  );
}
