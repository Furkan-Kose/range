"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { mainNav, ui } from "@/content/navigation";
import { contact, whatsappHref } from "@/content/contact";
import { localePath, t, toInternalPath, type Locale } from "@/lib/i18n";
import { Phone, WhatsApp } from "@/components/ui/icons";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";

/** Server'da "/tr/about", client'ta "/hakkimizda" gelebilir → ikisini de iç yola ("/about") indirger. */
export const normalizePath = toInternalPath;

type Props = { locale: Locale; logo: ReactNode; logoWhite: ReactNode };

/**
 * En üstteyken şeffaf: ana sayfada video üzerinde beyaz yazılı, iç sayfalarda hero ile aynı zeminde koyu yazılı
 * (ayrı bir beyaz şerit görünmesin). Kaydırınca (veya menü açıkken) açık zemin + blur + alt çizgi.
 * Desktop (xl+): linkler solda, logo ortada (en üstte büyük, kaydırınca küçülür), sağ taraf aksiyonlar.
 * Mobil/tablet (<xl): logo solda, sağda hamburger menü.
 */
export function Navbar({ locale, logo, logoWhite }: Props) {
  const pathname = normalizePath(usePathname());
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const atTop = !scrolled && !open;
  const overHero = pathname === "/" && atTop;
  const isActive = (href: string) => !href.includes("#") && href !== "/" && pathname.startsWith(href);

  const iconBtn = `size-9 place-items-center rounded-lg transition-colors ${
    overHero ? "text-white/85 hover:text-white" : "text-muted hover:text-brand"
  }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-500 ease-brand ${
          overHero
            ? "on-dark border-transparent bg-transparent text-white"
            : atTop
              ? "border-transparent bg-transparent text-foreground"
              : "border-border bg-background/90 text-foreground backdrop-blur-md"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-[var(--gutter)] transition-[height] duration-500 ease-brand ${
            scrolled ? "h-[var(--nav-h)]" : "h-[var(--nav-h-top)]"
          }`}
        >
          <Link
            href={localePath("/", locale)}
            aria-label="Range Media"
            data-nav-logo
            className={`relative z-10 shrink-0 origin-center transition-[transform,opacity] duration-500 ease-brand xl:order-2 ${
              scrolled ? "xl:scale-[0.6875]" : "xl:scale-100"
            }`}
          >
            <span className={overHero ? "hidden" : "block"}>{logo}</span>
            <span className={overHero ? "block" : "hidden"}>{logoWhite}</span>
          </Link>

          <nav aria-label={t(ui.menu, locale)} className="hidden xl:order-1 xl:block xl:flex-1">
            <ul className="flex items-center gap-7">
              {mainNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={localePath(item.href, locale)}
                      aria-current={active ? "page" : undefined}
                      className={`relative py-2 text-[0.9375rem] font-medium transition-colors ${
                        overHero
                          ? "text-white/85 hover:text-white"
                          : active
                            ? "text-brand"
                            : "text-foreground/80 hover:text-foreground"
                      }`}
                    >
                      {t(item.label, locale)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1 md:gap-2 xl:order-3 xl:flex-1 xl:justify-end">
            <a href={contact.phone.href} aria-label={t(ui.call, locale)} className={`${iconBtn} hidden sm:grid`}>
              <Phone width={18} height={18} />
            </a>
            <a
              href={whatsappHref(t(contact.whatsapp.message, locale))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(ui.whatsapp, locale)}
              className={`${iconBtn} hidden sm:grid`}
            >
              <WhatsApp width={18} height={18} />
            </a>
            <LocaleSwitcher locale={locale} label={t(ui.language, locale)} className="mx-1 hidden sm:flex" />
            <ThemeToggle labels={{ toLight: t(ui.themeToLight, locale), toDark: t(ui.themeToDark, locale) }} />
            <span className="ml-2 hidden md:block">
              <Button href={localePath("/contact", locale)} size="sm" icon={false}>
                {t(ui.contactCta, locale)}
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative ml-1 grid size-10 place-items-center xl:hidden"
            >
              <span className="sr-only">{t(open ? ui.close : ui.menu, locale)}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-500 ease-brand ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 rounded-full bg-current transition-all duration-500 ease-brand ${
                    open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} locale={locale} />
    </>
  );
}
