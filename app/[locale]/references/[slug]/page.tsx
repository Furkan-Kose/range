import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getReference, references, referencesSection } from "@/content/references";
import { ui } from "@/content/navigation";
import { locales, t, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Media } from "@/components/ui/Media";
import { VideoGallery } from "@/components/ui/VideoGallery";
import { getVideoInfo } from "@/lib/video";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) => references.map((r) => ({ locale, slug: r.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/references/[slug]">): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const ref = getReference(slug);
  if (!ref) return {};
  const desc = ref.shortDescription ?? ref.description;
  return buildMetadata({
    locale,
    path: `/references/${slug}`,
    title: ref.name,
    description: desc ? t(desc, locale).slice(0, 160) : `${ref.name} — ${t(ref.category, locale)}`,
    image: ref.coverImage,
  });
}

/** Referans detay: sayfa hero'su + açıklama + videolar + görseller. */
export default async function ReferencePage({ params }: PageProps<"/[locale]/references/[slug]">) {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const ref = getReference(slug);
  if (!ref) notFound();

  const videos = ref.videos ?? [];
  // Videoların kendi kapak görselleri + en-boy oranları build sırasında çekilir
  const videoInfos = await Promise.all(videos.map(async (url, i) => ({ ...(await getVideoInfo(url)), title: `${ref.name} — ${i + 1}` })));
  const gallery = ref.gallery ?? [];

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: t(referencesSection.pageTitle, locale), href: "/references" }, { label: ref.name }]}
        eyebrow={t(ref.category, locale)}
        title={ref.name}
      />

      {/* AÇIKLAMA */}
      <Section>
        <Container>
          <Reveal className="max-w-3xl">
            <h2 className="text-h2">{t(referencesSection.aboutProject, locale)}</h2>
            <p className="text-body mt-6 text-muted">
              {ref.description ? (
                t(ref.description, locale)
              ) : (
                // TODO: content/references.ts → description
                <span className="text-muted">{t(referencesSection.descriptionMissing, locale)}</span>
              )}
            </p>
          </Reveal>

          {/* VİDEOLAR */}
          {videos.length > 0 && (
            <div className="mt-[var(--section-y)]">
              <h2 className="text-h2">{t(referencesSection.videosLabel, locale)}</h2>
              <div className="mt-8 md:mt-10">
                <VideoGallery
                  videos={videoInfos}
                  logo={ref.logo}
                  labels={{
                    play: t(ui.playVideo, locale),
                    close: t(ui.close, locale),
                    previous: t(ui.previous, locale),
                    next: t(ui.next, locale),
                  }}
                />
              </div>
            </div>
          )}

          {/* GÖRSELLER */}
          {gallery.length > 0 && (
            <div className="mt-[var(--section-y)]">
              <h2 className="text-h2">{t(referencesSection.galleryLabel, locale)}</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
                {gallery.map((src, i) => (
                  <ImageReveal key={src} delay={(i % 3) * 0.06} className="overflow-hidden rounded-[20px]">
                    <Media src={src} alt={`${ref.name} ${i + 1}`} sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-[4/3]" />
                  </ImageReveal>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
