"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "./icons";

type Props = {
  src: string;
  /** Mobil için farklı (dikey/hafif) video — 767px altında kullanılır */
  mobileSrc?: string;
  poster?: string;
  className?: string;
  label?: string;
  /** Hero gibi ilk ekrandaki videolar için true (preload="metadata"). Diğerleri "none". */
  eager?: boolean;
  /** Sağ altta oynat/durdur butonu göster (otomatik oynayan uzun videolar için erişilebilirlik) */
  controls?: boolean;
  controlLabels?: { play: string; pause: string };
  /** Oynat/durdur butonunun konumu (Tailwind sınıfları) */
  controlPosition?: string;
};

/**
 * Sessiz, döngülü arka plan videosu.
 * - Sadece görünür alandayken oynar (performans)
 * - prefers-reduced-motion açıksa otomatik oynamaz
 */
export function BackgroundVideo({
  src,
  mobileSrc,
  poster,
  className = "",
  label,
  eager = false,
  controls = false,
  controlLabels = { play: "Play", pause: "Pause" },
  controlPosition = "right-4 bottom-4",
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const userPaused = useRef(false);

  // Görünürlükte oynat / dışarıda durdur (reduced-motion açıksa otomatik oynamaz)
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      userPaused.current = true;
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={ref}
        className={className}
        poster={poster}
        muted
        loop
        playsInline
        preload={eager ? "metadata" : "none"}
        aria-label={label}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      >
        {/* Tarayıcı ilk eşleşen kaynağı seçer: mobilde mobileSrc, diğerlerinde src */}
        {mobileSrc && <source src={mobileSrc} media="(max-width: 767px)" type="video/mp4" />}
        <source src={src} type="video/mp4" />
      </video>
      {controls && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? controlLabels.play : controlLabels.pause}
          className={`absolute ${controlPosition} z-10 grid size-10 place-items-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition-colors hover:border-brand hover:text-brand`}
        >
          {paused ? <Play width={14} height={14} /> : <Pause width={14} height={14} />}
        </button>
      )}
    </>
  );
}
