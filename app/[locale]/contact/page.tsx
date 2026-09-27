import type { Metadata } from "next";
import { contact } from "@/content/contact";
import { t, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { plainText } from "@/components/ui/RichText";
import { ContactSection } from "@/components/sections/ContactCta";
import { PageHero } from "@/components/sections/PageHero";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return buildMetadata({
    locale,
    path: "/contact",
    title: t(contact.page.eyebrow, locale),
    description: `${plainText(t(contact.page.title, locale))} ${t(contact.page.description, locale)}`,
  });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: t(contact.page.eyebrow, locale) }]}
        title={t(contact.page.eyebrow, locale)}
        description={t(contact.page.description, locale)}
      />
      <ContactSection locale={locale} tone="default" />
    </>
  );
}
