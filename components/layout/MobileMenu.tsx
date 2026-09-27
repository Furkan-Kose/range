"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useEffectEvent } from "react";
import { mainNav, ui } from "@/content/navigation";
import { contact, whatsappHref } from "@/content/contact";
import { localePath, t, type Locale } from "@/lib/i18n";
import { EASE } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { LocaleSwitcher } from "./LocaleSwitcher";

type Props = { open: boolean; onClose: () => void; locale: Locale };

export function MobileMenu({ open, onClose, locale }: Props) {
  const close = useEffectEvent(onClose);

  // Scroll kilidi + Escape ile kapatma
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col bg-background pt-[calc(var(--nav-h)+1rem)] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <nav aria-label={t(ui.menu, locale)} className="flex-1 overflow-y-auto px-[var(--gutter)]">
            <ul>
              {mainNav.map((item, i) => (
                <motion.li
                  key={item.href}
                  className="border-b border-border"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.04 }}
                >
                  <Link
                    href={localePath(item.href, locale)}
                    onClick={onClose}
                    className="flex items-center justify-between py-5 font-display text-[1.75rem] font-semibold tracking-tight"
                  >
                    {t(item.label, locale)}
                    <span aria-hidden className="text-brand">
                      →
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-5 border-t border-border px-[var(--gutter)] py-6">
            <Button href={localePath("/contact", locale)} icon={false} className="justify-center">
              {t(ui.contactCta, locale)}
            </Button>
            <div className="text-small flex flex-wrap items-center justify-between gap-3 text-muted">
              <a href={contact.phone.href} className="hover:text-brand">
                {contact.phone.display}
              </a>
              <a
                href={whatsappHref(t(contact.whatsapp.message, locale))}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand"
              >
                WhatsApp
              </a>
              <LocaleSwitcher locale={locale} label={t(ui.language, locale)} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
