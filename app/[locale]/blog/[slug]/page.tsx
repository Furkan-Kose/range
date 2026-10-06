import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, blogSection, getPost } from "@/content/blog";
import { formatDate, localePath, locales, t, type Locale } from "@/lib/i18n";
import { mediaExists } from "@/lib/media";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Media } from "@/components/ui/Media";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd, absoluteUrl, organizationRef } from "@/components/seo/JsonLd";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) => blogPosts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title: t(post.title, locale),
    description: t(post.excerpt, locale),
    image: post.cover,
    type: "article",
    publishedTime: post.date,
    noindex: post.placeholder,
  });
}

export default async function BlogPostPage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      {!post.placeholder && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: t(post.title, locale),
            description: t(post.excerpt, locale),
            datePublished: post.date,
            inLanguage: locale,
            image: absoluteUrl(mediaExists(post.cover) ? post.cover : site.ogImage),
            mainEntityOfPage: absoluteUrl(localePath(`/blog/${post.slug}`, locale)),
            author: organizationRef,
            publisher: organizationRef,
          }}
        />
      )}
      <PageHero
        locale={locale}
        crumbs={[{ label: t(blogSection.eyebrow, locale), href: "/blog" }, { label: t(post.title, locale) }]}
        eyebrow={`${t(post.category, locale)} · ${formatDate(post.date, locale)}`}
        title={t(post.title, locale)}
        description={t(post.excerpt, locale)}
      />
      <Section>
        <article>
        <Container>
          <ImageReveal className="overflow-hidden rounded-[20px]">
            <Media src={post.cover} alt={t(post.title, locale)} sizes="100vw" className="aspect-[21/9]" priority />
          </ImageReveal>
          <div className="mx-auto max-w-2xl pt-12 md:pt-16">
            {post.body.map((block, i) => {
              switch (block.type) {
                case "h2":
                  return (
                    <h2 key={i} className="text-h2 mt-12 mb-5">
                      {t(block.text, locale)}
                    </h2>
                  );
                case "quote":
                  return (
                    <blockquote key={i} className="text-quote my-10 border-l-2 border-brand pl-6">
                      {t(block.text, locale)}
                    </blockquote>
                  );
                case "image":
                  return (
                    <figure key={i} className="my-10">
                      <Media src={block.src} alt={t(block.alt, locale)} sizes="(min-width: 768px) 672px, 100vw" className="aspect-[16/10] rounded-[20px]" />
                      {block.caption && <figcaption className="text-small mt-3 text-muted">{t(block.caption, locale)}</figcaption>}
                    </figure>
                  );
                default:
                  return (
                    <p key={i} className="text-body mt-5 text-foreground/85">
                      {t(block.text, locale)}
                    </p>
                  );
              }
            })}
          </div>
        </Container>
        </article>
      </Section>
    </>
  );
}
