import Link from "next/link";
import type { ReactNode } from "react";
import { localePath, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";

type Item = { slug: string; name: string; preview: ReactNode };

/** /references — 3 kolonlu proje kartları (filtre yok). */
export function ReferencesGrid({ items, locale }: { items: Item[]; locale: Locale }) {
  return (
    <>
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.slug}>
            <Reveal delay={(i % 3) * 0.05}>
              <Link href={localePath(`/references/${item.slug}`, locale)} className="group block">
                <div data-tilt className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                  <div className="absolute inset-0 transition-transform duration-[1.2s] ease-brand group-hover:scale-[1.05]">
                    {item.preview}
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-h4 transition-colors group-hover:text-brand">{item.name}</h2>
                  </div>
                  <span aria-hidden className="mt-1 text-brand transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </>
  );
}
