"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ui } from "@/content/navigation";
import { localePath, t, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";

type Item = {
  slug: string;
  number: string;
  title: string;
  description: string;
  caption: string;
  media: ReactNode;
};

type Segment = { x1: number; y1: number; x2: number; y2: number; len: number };

/**
 * Hizmet satırları: görsel ve metin dönüşümlü. Desktop'ta görseller köşeden köşeye
 * çapraz bir hatla bağlanır; hat sayfa kaydırıldıkça yeşille dolar.
 * Numara normalde kontur, satırın üzerine gelince yeşille dolar (.num-fill, globals.css).
 */
export function ServicesList({ items, locale, spaced = true }: { items: Item[]; locale: Locale; spaced?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mediaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [progress, setProgress] = useState<number[]>([]);

  // Çapraz hat noktalarını hesapla (görsel köşeleri)
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      if (window.innerWidth < 1024) {
        setSegments([]);
        return;
      }
      const r = wrap.getBoundingClientRect();
      const boxes = mediaRefs.current.map((m) => m?.getBoundingClientRect());
      const segs: Segment[] = [];
      for (let i = 0; i < boxes.length - 1; i++) {
        const a = boxes[i];
        const b = boxes[i + 1];
        if (!a || !b) continue;
        // Çift satırda görsel solda → sağ-alt köşeden; tek satırda sağda → sol-alt köşeden çık
        const x1 = (i % 2 === 0 ? a.right : a.left) - r.left;
        const y1 = a.bottom - r.top;
        const x2 = ((i + 1) % 2 === 1 ? b.left : b.right) - r.left;
        const y2 = b.top - r.top;
        segs.push({ x1, y1, x2, y2, len: Math.hypot(x2 - x1, y2 - y1) });
      }
      setSegments(segs);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items.length]);

  // Kaydırdıkça her parçanın dolma oranı
  useEffect(() => {
    if (!segments.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const wrap = wrapRef.current;
      if (!wrap) return;
      if (reduce) {
        setProgress(segments.map(() => 1));
        return;
      }
      const top = wrap.getBoundingClientRect().top;
      const line = window.innerHeight * 0.65; // ekranın bu hizasına gelen kısım yeşillenir
      setProgress(segments.map((s) => Math.min(1, Math.max(0, (line - (top + s.y1)) / (s.y2 - s.y1)))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [segments]);

  return (
    <div ref={wrapRef} className={`relative ${spaced ? "mt-12 md:mt-14" : ""}`}>
      {/* Çapraz bağlantı hattı (sadece desktop) */}
      {segments.length > 0 && (
        <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block">
          {segments.map((s, i) => {
            const p = progress[i] ?? 0;
            return (
              <g key={i}>
                <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="var(--border)" strokeWidth={2} strokeDasharray="6 8" />
                <line
                  x1={s.x1}
                  y1={s.y1}
                  x2={s.x2}
                  y2={s.y2}
                  stroke="var(--brand)"
                  strokeWidth={2}
                  strokeDasharray={s.len}
                  strokeDashoffset={s.len * (1 - p)}
                />
                {[
                  [s.x1, s.y1, p > 0],
                  [s.x2, s.y2, p >= 1],
                ].map(([x, y, on], j) => (
                  <circle
                    key={j}
                    cx={x as number}
                    cy={y as number}
                    r={7}
                    fill={on ? "var(--brand)" : "var(--surface-2)"}
                    stroke="var(--background)"
                    strokeWidth={6}
                    paintOrder="stroke"
                    style={{ transition: "fill .3s" }}
                  />
                ))}
              </g>
            );
          })}
        </svg>
      )}

      <ol className="relative">
        {items.map((item, i) => {
          const reversed = i % 2 === 1;
          const href = localePath(`/services/${item.slug}`, locale);
          return (
            <li key={item.slug} className="group grid items-center gap-8 py-10 first:pt-0 lg:grid-cols-2 lg:gap-28 lg:py-16 lg:first:pt-0">
              <div ref={(el) => void (mediaRefs.current[i] = el)} className={`relative z-[1] ${reversed ? "lg:order-2" : ""}`}>
                <ImageReveal className="overflow-hidden rounded-[20px]">
                  <Link href={href} tabIndex={-1} aria-hidden className="relative block aspect-[16/11] overflow-hidden rounded-[20px]">
                    <div className="absolute inset-0 transition-transform duration-[1.2s] ease-brand group-hover:scale-[1.04]">
                      {item.media}
                    </div>
                    {item.caption && (
                      <span className="text-small absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-[10px] bg-white/95 px-3.5 py-2 font-medium text-[#101110]">
                        <span aria-hidden className="size-2 rounded-full bg-brand" />
                        {item.caption}
                      </span>
                    )}
                  </Link>
                </ImageReveal>
              </div>

              <Reveal className={reversed ? "lg:order-1" : ""}>
                <span aria-hidden className="num-fill text-[4.5rem] md:text-[6rem]">
                  {item.number}
                </span>
                <h3 className="text-h2 mt-3">
                  <Link href={href} className="transition-colors hover:text-brand">
                    {item.title}
                  </Link>
                </h3>
                <p className="text-body mt-4 max-w-md text-muted">{item.description}</p>
                <Link
                  href={href}
                  className="mt-7 inline-flex items-center gap-2 rounded-lg border border-foreground/20 px-5 py-3 text-[0.9375rem] font-semibold transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground"
                >
                  {t(ui.discover, locale)} <span aria-hidden>→</span>
                  <span className="sr-only">: {item.title}</span>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
