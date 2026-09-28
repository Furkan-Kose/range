import type { Metadata } from "next";
import Link from "next/link";
import { blogSection, getSortedPosts } from "@/content/blog";
import { ui } from "@/content/navigation";
import { formatDate, localePath, t, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";

export async function generateMetadata({ params }: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return buildMetadata({
    locale,
    path: "/blog",
    title: t(blogSection.eyebrow, locale),
    description: t(blogSection.description, locale),
  });
}

/** Blog listesi: klasik 3 kolonlu kart ızgarası (en yeni yazı ilk sırada). */
export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const locale = (await params).locale as Locale;
  const posts = getSortedPosts();

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: t(blogSection.eyebrow, locale) }]}
        title={t(blogSection.eyebrow, locale)}
        description={t(blogSection.description, locale)}
      />
      <Section>
        <Container>
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={(i % 3) * 0.05}>
                  <Link href={localePath(`/blog/${post.slug}`, locale)} className="group block">
                    <div data-tilt className="relative overflow-hidden rounded-[20px]">
                      <Media
                        src={post.cover}
                        alt={t(post.title, locale)}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="aspect-[4/3] transition-transform duration-[1.2s] ease-brand group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="text-small mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                      <span className="font-semibold text-brand">{t(post.category, locale)}</span>
                      <span aria-hidden>·</span>
                      <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                      {post.placeholder && (
                        <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-xs">
                          {t(blogSection.placeholderBadge, locale)}
                        </span>
                      )}
                    </p>
                    <h2 className="text-h4 mt-3 transition-colors group-hover:text-brand">{t(post.title, locale)}</h2>
                    <p className="text-small mt-2 text-muted">{t(post.excerpt, locale)}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                      {t(ui.readMore, locale)} <span aria-hidden>→</span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
