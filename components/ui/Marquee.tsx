"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** true: soldan sağa akar (ikinci şerit ters yönde) */
  reverse?: boolean;
  /** Akış hızı (piksel/saniye) — mobil (<768px) */
  speed?: number;
  /** Masaüstü (≥768px) hızı; verilmezse `speed` */
  desktopSpeed?: number;
  className?: string;
  /** Kenarlarda yumuşak kaybolma */
  fade?: boolean;
  /**
   * Döngü için ikinci kopya. Tıklanabilir öğeler (link) varsa buraya tabIndex={-1} verilmiş kopyayı geçir:
   * kopya fareyle/dokunmayla etkileşimli kalır ama ekran okuyucu/klavyeden gizlenir.
   * Verilmezse children kopyalanır ve tamamen etkileşimsiz (inert) olur — sadece dekoratif şeritler için.
   */
  clone?: ReactNode;
};

/**
 * Sonsuz yatay kayan şerit (JS, requestAnimationFrame).
 * - Sabit hızla akar; masaüstünde üzerine gelince / klavye odağında yavaşça durur.
 * - Fareyle tutup sürüklenebilir, mobilde parmakla kaydırılabilir; bırakınca momentumla devam edip
 *   kendi hızına döner. Dikey sayfa kaydırması etkilenmez (touch-action: pan-y).
 * - Sürükleme sonrası tıklama bastırılır (kaydırırken yanlışlıkla linke gidilmez); kısa dokunuş linki açar.
 * - "Hareketi azalt" açıksa kendiliğinden akmaz, elle kaydırılabilir. Ekran dışındayken durur.
 */
export function Marquee({ children, clone, reverse = false, speed = 55, desktopSpeed, className = "", fade = true }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  // Döngü kopyası sayısı: tek kopya ekrandan dar kalırsa (az öğe / geniş ekran) boşluk olmasın diye artar
  const [copies, setCopies] = useState(1);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const copy = copyRef.current;
    if (!wrap || !track || !copy) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)");
    const calcBase = () => (reverse ? 1 : -1) * (reduce ? 0 : desktop.matches ? (desktopSpeed ?? speed) : speed); // px/s, negatif = sola
    let base = calcBase();
    const onBreakpoint = () => (base = calcBase());
    desktop.addEventListener("change", onBreakpoint);
    let width = copy.offsetWidth; // tek kopyanın genişliği → döngü uzunluğu
    let x = reverse ? -width : 0;
    let v = base; // anlık hız
    let paused = false;
    let visible = true;
    let last = performance.now();
    let raf = 0;

    // Sürükleme durumu
    let pointerId: number | null = null;
    let startX = 0;
    let lastX = 0;
    let lastT = 0;
    let dragging = false;
    let moved = false;

    const wrapX = () => {
      if (width <= 0) return;
      while (x <= -width) x += width;
      while (x > 0) x -= width;
    };
    const render = () => {
      track.style.transform = `translate3d(${x}px,0,0)`;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!dragging) {
        const target = paused ? 0 : base;
        v += (target - v) * Math.min(1, dt * 2.5); // momentum yavaşça kendi hızına döner
        x += v * dt;
        wrapX();
        render();
      }
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(wrap);

    const ro = new ResizeObserver(() => {
      width = copy.offsetWidth;
      // ekranı her an doldurmak için gereken kopya sayısı (+1 kayma payı)
      if (width > 0) setCopies(Math.max(1, Math.ceil(wrap.offsetWidth / width)));
      wrapX();
      render();
    });
    ro.observe(copy);
    ro.observe(wrap);

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      pointerId = e.pointerId;
      startX = lastX = e.clientX;
      lastT = performance.now();
      moved = false;
      dragging = false;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      const dx = e.clientX - lastX;
      if (!dragging && Math.abs(e.clientX - startX) > 6) {
        dragging = moved = true;
        track.setPointerCapture(e.pointerId);
        wrap.classList.add("is-dragging");
      }
      if (!dragging) return;
      const now = performance.now();
      const dtm = Math.max(1, now - lastT);
      x += dx;
      wrapX();
      render();
      v = (dx / dtm) * 1000 * 0.9; // bırakınca bu hızla devam eder
      lastX = e.clientX;
      lastT = now;
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      pointerId = null;
      if (dragging) {
        dragging = false;
        wrap.classList.remove("is-dragging");
        if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
        last = performance.now();
      }
    };
    // Sürüklemeden sonraki tıklamayı yut (link açılmasın)
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") paused = true;
    };
    const onLeave = () => {
      paused = false;
    };
    const onFocusIn = () => (paused = true);
    const onFocusOut = () => (paused = false);
    const noDrag = (e: DragEvent) => e.preventDefault();

    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onUp);
    track.addEventListener("click", onClick, true);
    track.addEventListener("dragstart", noDrag);
    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("focusin", onFocusIn);
    wrap.addEventListener("focusout", onFocusOut);

    return () => {
      desktop.removeEventListener("change", onBreakpoint);
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onUp);
      track.removeEventListener("click", onClick, true);
      track.removeEventListener("dragstart", noDrag);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("focusin", onFocusIn);
      wrap.removeEventListener("focusout", onFocusOut);
    };
  }, [reverse, speed, desktopSpeed]);

  return (
    <div
      ref={wrapRef}
      className={`marquee group relative overflow-hidden ${className}`}
      style={
        fade
          ? {
              maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
              WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            }
          : undefined
      }
    >
      <div ref={trackRef} className="marquee-track flex w-max touch-pan-y select-none will-change-transform">
        <div ref={copyRef} className="flex shrink-0 items-center">
          {children}
        </div>
        {Array.from({ length: copies }, (_, i) =>
          clone ? (
            <div key={i} className="flex shrink-0 items-center" aria-hidden>
              {clone}
            </div>
          ) : (
            <div key={i} className="flex shrink-0 items-center" aria-hidden inert>
              {children}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
