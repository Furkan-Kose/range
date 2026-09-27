import { site } from "@/content/site";

/** Yapısal veri (schema.org JSON-LD) — arama motorları için. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Göreli yolu mutlak URL'ye çevirir (JSON-LD mutlak URL ister). */
export const absoluteUrl = (path: string) => (path === "/" ? site.url : `${site.url}${path}`);

/** Diğer şemalarda referans verilen kuruluş (layout'taki Organization ile aynı @id). */
export const organizationRef = { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name };
