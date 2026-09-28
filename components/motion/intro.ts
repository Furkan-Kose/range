"use client";

import { useSyncExternalStore } from "react";

/**
 * Açılış animasyonu durumu (components/layout/Intro.tsx).
 * <html data-intro="run|skip|done"> — head'deki inline script oturumun ilk açılışında "run" yapar.
 * "intro:reveal" → perde kalkmaya başladı (hero animasyonları başlayabilir)
 * "intro:end"    → açılış tamamen bitti (kaydırma serbest)
 */
const subscribe = (cb: () => void) => {
  window.addEventListener("intro:reveal", cb);
  return () => window.removeEventListener("intro:reveal", cb);
};
const getSnapshot = () => {
  const d = document.documentElement.dataset;
  return d.intro !== "run" || d.introReveal === "1";
};

/** Hero gibi ilk ekran animasyonları için: açılış perdesi kalkınca true. */
export const useIntroReady = () => useSyncExternalStore(subscribe, getSnapshot, () => false);
