"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, switchLocalePath, type Locale } from "@/lib/i18n";

/** TR / EN geçişi — aynı sayfanın diğer dildeki adresine gider. */
export function LocaleSwitcher({ locale, label, className = "" }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={`text-label flex items-center gap-1 ${className}`}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-border" aria-hidden>/</span>}
          <Link
            href={switchLocalePath(pathname, l)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            className={`px-0.5 transition-colors ${l === locale ? "text-foreground" : "text-muted hover:text-brand"}`}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </nav>
  );
}
