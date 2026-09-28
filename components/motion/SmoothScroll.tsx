"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Yumuşak kaydırma (Lenis) — sadece fare tekerleği/trackpad; dokunmatikte tarayıcının kendi kaydırması.
 * "Hareketi azalt" seçiliyse devre dışı. Lightbox ve açılır menüler içinde kendi kaydırmaları çalışır.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: { offset: 0 },
      stopInertiaOnNavigate: true,
      prevent: (node) => !!node.closest(".yarl__root, [data-lenis-prevent], #mobile-menu"),
    });
    // Açılış animasyonu sürerken kaydırma kapalı
    const onIntroEnd = () => lenis.start();
    if (document.documentElement.dataset.intro === "run") {
      lenis.stop();
      window.addEventListener("intro:end", onIntroEnd, { once: true });
    }
    return () => {
      window.removeEventListener("intro:end", onIntroEnd);
      lenis.destroy();
    };
  }, []);

  return null;
}
