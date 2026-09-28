"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { VolumeOff, VolumeOn } from "@/components/ui/icons";
import { ui } from "@/content/navigation";
import { localePath, t, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";

type Item = {
  slug: string;
  number: string;
  title: string;
  description: string;
  /** true: yatay video → video arka planlı geniş kart; false: dikey video → dar dikey kart */
  wide: boolean;
  media: ReactNode;
};

type Segment = { x1: number; y1: number; x2: number; y2: number; len: number };

/**
 * Kartın içindeki videonun sesini açıp kapatır. Aynı anda tek video sesli çalar
 * (birini açınca sayfadaki diğer videolar susar). Durum video'nun kendi "volumechange" olayından okunur.
 */
function SoundToggle({ cardRef, labels }: { cardRef: RefObject<HTMLDivElement | null>; labels: { on: string; off: string } }) {
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    const video = cardRef.current?.querySelector("video");
    if (!video) return;
    const sync = () => setMuted(video.muted);
    video.addEventListener("volumechange", sync);
    return () => video.removeEventListener("volumechange", sync);
  }, [cardRef]);

  const toggle = () => {
    const video = cardRef.current?.querySelector("video");
    if (!video) return;
    if (video.muted) {
      document.querySelectorAll("video").forEach((v) => {
        if (v !== video) v.muted = true;
      });
      video.muted = false;
      video.play().catch(() => {});
    } else {
      video.muted = true;
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={!muted}
      aria-label={muted ? labels.on : labels.off}
      className="absolute top-4 right-4 z-20 grid size-10 place-items-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm transition-colors hover:border-brand hover:bg-brand"
    >
      {muted ? <VolumeOff width={18} height={18} /> : <VolumeOn width={18} height={18} />}
    </button>
  );
}

/** Dikey video kartı: video + tıklanınca detaya giden görünmez link + ses düğmesi (link dışında). Üstünde etiket yok. */
function VerticalCard({ href, media, labels }: { href: string; media: ReactNode; labels: { on: string; off: string } }) {
  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={cardRef} className="relative aspect-[4/5] overflow-hidden rounded-[20px] lg:aspect-[9/16]">
      <div className="absolute inset-0 transition-transform duration-[1.2s] ease-brand group-hover:scale-[1.04]">{media}</div>
      <Link href={href} tabIndex={-1} aria-hidden className="absolute inset-0 z-10" />
      <SoundToggle cardRef={cardRef} labels={labels} />
    </div>
  );
}

/**
 * Hizmet satırları.
 * - Dikey videolu hizmet: dar dikey (9:16) kart + metin, satırlar dönüşümlü (sol/sağ).
 * - Yatay videolu hizmet: tam genişlik kart, video arka planda, metin üstünde.
 * Desktop'ta kartlar köşeden köşeye çapraz bir hatla bağlanır; hat sayfa kaydırıldıkça yeşille dolar.
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
      // Layout koordinatları (offset zinciri) → 3D kamera dönüşümleri ölçümü bozmaz
      const abs = (el: HTMLElement) => {
        let left = 0;
        let top = 0;
        for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) {
          left += n.offsetLeft;
          top += n.offsetTop;
        }
        return { left, top };
      };
      const r = abs(wrap);
      const boxes = mediaRefs.current.map((m) => {
        if (!m) return undefined;
        const o = abs(m);
        return { left: o.left, top: o.top, right: o.left + m.offsetWidth, bottom: o.top + m.offsetHeight };
      });
      const segs: Segment[] = [];
      for (let i = 0; i < boxes.length - 1; i++) {
        const a = boxes[i];
        const b = boxes[i + 1];
        if (!a || !b) continue;
        // Çift satırda görsel solda → sağ-alt köşeden; tek satırda sağda → sol-alt köşeden çık
        const aOnLeft = i % 2 === 0;
        const x1 = (aOnLeft ? a.right : a.left) - r.left;
        const y1 = a.bottom - r.top;
        // Hedef: bir sonraki kartın üst köşesi. Geniş kartta zikzak devam etsin diye ters taraftaki köşe.
        const x2 = (items[i + 1]?.wide ? (aOnLeft ? b.right : b.left) : aOnLeft ? b.left : b.right) - r.left;
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
  }, [items]);

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
          const setRef = (el: HTMLDivElement | null) => void (mediaRefs.current[i] = el);
          const number = (
            <span aria-hidden className="num-fill text-[4.5rem] md:text-[6rem]">
              {item.number}
            </span>
          );
          const cta = (
            <Link
              href={href}
              className="mt-7 inline-flex items-center gap-2 rounded-lg border border-foreground/20 px-5 py-3 text-[0.9375rem] font-semibold transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground"
            >
              {t(ui.discover, locale)} <span aria-hidden>→</span>
              <span className="sr-only">: {item.title}</span>
            </Link>
          );

          // YATAY VİDEO: tam genişlik kart, video arka planda, metin üstünde
          if (item.wide) {
            return (
              <li key={item.slug} className="group py-10 first:pt-0 lg:py-16 lg:first:pt-0">
                <div ref={setRef} data-tilt="sm" className="relative z-[1] rounded-[20px]">
                  <ImageReveal className="overflow-hidden rounded-[20px]">
                    <div className="on-dark relative flex min-h-[560px] flex-col justify-end overflow-hidden rounded-[20px] text-foreground md:min-h-0 md:aspect-[16/8] md:justify-center">
                      <div className="absolute inset-0 transition-transform duration-[1.2s] ease-brand group-hover:scale-[1.03]">
                        {/* Videodaki gömülü siyah şeritleri (letterbox) kırpmak için büyütülür */}
                        <div className="absolute inset-0 scale-[1.36] md:scale-[1.22]">{item.media}</div>
                      </div>
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgb(0_0_0/0.8)_0%,rgb(0_0_0/0.35)_55%,rgb(0_0_0/0.1)_100%)] md:bg-[linear-gradient(90deg,rgb(0_0_0/0.78)_0%,rgb(0_0_0/0.45)_45%,rgb(0_0_0/0.05)_80%)]"
                      />
                      <Reveal className="relative z-10 max-w-lg p-7 md:p-14 lg:p-16">
                        {number}
                        <h3 className="text-h2 mt-3">
                          <Link href={href} className="transition-colors hover:text-brand">
                            {item.title}
                          </Link>
                        </h3>
                        <p className="text-body mt-4 text-white/80">{item.description}</p>
                        {cta}
                      </Reveal>
                    </div>
                  </ImageReveal>
                </div>
              </li>
            );
          }

          // DİKEY VİDEO: 360px dikey kart + metin (sol/sağ dönüşümlü).
          // Hizalama kuralı: video kapsayıcının kenarına yaslı → tüm satırların sol/sağ kenarları aynı çizgide.
          // Mobilde tam genişlik (4:5), masaüstünde 9:16.
          return (
            <li
              key={item.slug}
              className={`group grid items-center gap-8 py-10 first:pt-0 lg:gap-28 lg:py-16 lg:first:pt-0 ${
                reversed ? "lg:grid-cols-[1fr_360px]" : "lg:grid-cols-[360px_1fr]"
              }`}
            >
              <div ref={setRef} data-tilt className={`relative z-[1] w-full rounded-[20px] ${reversed ? "lg:order-2" : ""}`}>
                <ImageReveal className="overflow-hidden rounded-[20px]">
                  <VerticalCard
                    href={href}
                    media={item.media}
                    labels={{ on: t(ui.soundOn, locale), off: t(ui.soundOff, locale) }}
                  />
                </ImageReveal>
              </div>

              {/* Metin HER satırda videosunun hemen yanında (aynı boşluk, aynı genişlik) → 2. satır 1. satırın ayna görüntüsü */}
              <Reveal className={`w-full lg:max-w-[448px] ${reversed ? "lg:order-1 lg:justify-self-end" : ""}`}>
                {number}
                <h3 className="text-h2 mt-3">
                  <Link href={href} className="transition-colors hover:text-brand">
                    {item.title}
                  </Link>
                </h3>
                <p className="text-body mt-4 text-muted">{item.description}</p>
                {cta}
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
