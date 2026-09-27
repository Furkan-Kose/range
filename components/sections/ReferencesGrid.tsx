"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { localePath, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";

type Item = { slug: string; name: string; category: string; services: string[]; preview: ReactNode };
type Filter = { value: string; label: string };

/** /references — hizmete göre filtre + 3 kolonlu proje kartları. */
export function ReferencesGrid({
  items,
  filters,
  locale,
  filterLabel,
}: {
  items: Item[];
  filters: Filter[];
  locale: Locale;
  filterLabel: string;
}) {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? items : items.filter((i) => i.services.includes(filter));

  return (
    <>
      <div role="group" aria-label={filterLabel} className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-brand aria-pressed:border-brand aria-pressed:bg-brand aria-pressed:text-brand-foreground"
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, i) => (
          <li key={item.slug}>
            <Reveal delay={(i % 3) * 0.05}>
              <Link href={localePath(`/references/${item.slug}`, locale)} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                  <div className="absolute inset-0 transition-transform duration-[1.2s] ease-brand group-hover:scale-[1.05]">
                    {item.preview}
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-h4 transition-colors group-hover:text-brand">{item.name}</h2>
                    <p className="text-small mt-1 text-muted">{item.category}</p>
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
