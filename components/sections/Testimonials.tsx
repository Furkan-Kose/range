"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { testimonials, testimonialsSection } from "@/content/testimonials";
import { ui } from "@/content/navigation";
import { t, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { EASE } from "@/components/motion/Reveal";

/** Yorumlar: solda büyük portre, sağda alıntı + tüm kişilerin küçük fotoğrafları. Autoplay yok. */
export function Testimonials({ locale }: { locale: Locale }) {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);
  const item = testimonials[index];

  return (
    <section aria-labelledby="testimonials-title" aria-roledescription="carousel" className="relative bg-surface pt-[var(--section-y)] pb-[calc(var(--section-y)+clamp(32px,5vw,80px))]">
      <Container>
        <SectionHeading id="testimonials-title" eyebrow={t(testimonialsSection.eyebrow, locale)} title={t(testimonialsSection.title, locale)} />
        <div className="mt-12 grid items-center gap-10 md:mt-14 md:grid-cols-[minmax(0,340px)_1fr] md:gap-14 lg:grid-cols-[400px_1fr] lg:gap-20">
          {/* Portre */}
          <div className="relative mx-auto aspect-[2/3] w-full max-w-[340px] overflow-hidden rounded-[20px] bg-surface-2 shadow-[var(--shadow)] md:max-w-none">
            <AnimatePresence initial={false}>
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <Image
                  src={item.photo}
                  alt={`${item.name}, ${item.company}`}
                  fill
                  sizes="(min-width: 1024px) 400px, 340px"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Alıntı */}
          <div>
            {/* Konuşma balonu — kuyruğu portreye bakar (mobilde yukarı, desktop'ta sola) */}
            <div
              className="relative min-h-[12rem] rounded-[28px] border border-border/70 bg-background px-7 pt-9 pb-8 shadow-[0_24px_60px_-28px_rgb(0_0_0/0.22)] before:absolute before:-top-[11px] before:left-12 before:size-5 before:rotate-45 before:rounded-tl-[4px] md:before:rounded-tl-none md:before:rounded-bl-[4px] before:border-t before:border-l before:border-border/70 before:bg-background md:px-10 md:pt-11 md:pb-10 md:before:top-16 md:before:-left-[11px] md:before:border-t-0 md:before:border-b"
              aria-live="polite"
            >
              {/* Tırnak rozeti */}
              <span
                aria-hidden
                className="absolute -top-5 right-8 grid size-11 place-items-center rounded-full bg-brand text-white shadow-[0_8px_20px_-6px_var(--brand)] md:right-10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 21v-7.5C3 8.4 5.6 5 10.5 3.5l.9 1.9C8.7 6.5 7.4 8.5 7.2 11H11v10H3Zm10 0v-7.5c0-5.1 2.6-8.5 7.5-10l.9 1.9c-2.7 1.1-4 3.1-4.2 5.6H21v10h-8Z" />
                </svg>
              </span>
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="font-display text-[1.125rem] leading-[1.6] tracking-[-0.01em] md:text-[1.25rem] lg:text-[1.375rem]"
                >
                  {t(item.quote, locale)}
                </motion.blockquote>
              </AnimatePresence>
              {/* Alt vurgu çizgisi */}
              <span aria-hidden className="mt-7 block h-[3px] w-12 rounded-full bg-brand" />
            </div>

            {/* Küçük fotoğraflar */}
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {testimonials.map((p, i) => (
                <li key={p.name}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`${p.name} — ${p.company}`}
                    aria-current={i === index}
                    className={`relative block size-14 overflow-hidden rounded-xl transition-[opacity,filter] duration-300 md:size-16 ${
                      i === index ? "opacity-100 outline-2 outline-offset-3 outline-brand" : "opacity-45 grayscale hover:opacity-80"
                    }`}
                  >
                    <Image src={p.photo} alt="" fill sizes="64px" className="object-cover object-top" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t(ui.previous, locale)}
                className="grid size-12 place-items-center rounded-xl border border-border bg-background transition-colors hover:border-brand hover:text-brand"
              >
                <ArrowLeft width={18} height={18} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t(ui.next, locale)}
                className="grid size-12 place-items-center rounded-xl border border-border bg-background transition-colors hover:border-brand hover:text-brand"
              >
                <ArrowRight width={18} height={18} />
              </button>
              <span className="text-small ml-2 text-muted">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </Container>
      {/* Alt geçiş yok: RNG Sport bölümü buraya çapraz kesilmiş olarak biner */}
    </section>
  );
}
