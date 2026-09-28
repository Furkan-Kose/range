"use client";

import { useEffect } from "react";

/**
 * Sitedeki tüm 3D hover kartları için tek dinleyici.
 * Bir öğeye `data-tilt` (kart) veya `data-tilt="sm"` (buton, daha az eğim) vermek yeterli:
 * fare konumuna göre --rx / --ry (eğim) ve --gx / --gy (parlama + yeşil yansıma yönü) yazılır,
 * görünüm tamamen CSS'te (globals.css → "3D TILT").
 * Sadece fare/trackpad'de çalışır; dokunmatikte ve "hareketi azalt"ta kapalı.
 */
export function TiltManager() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active: HTMLElement | null = null;
    const reset = (el: HTMLElement) => {
      el.removeAttribute("data-tilting");
      for (const p of ["--rx", "--ry", "--gx", "--gy"]) el.style.removeProperty(p);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-tilt]") ?? null;
      if (active && active !== el) reset(active);
      active = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = Math.min(0.5, Math.max(-0.5, (e.clientX - r.left) / r.width - 0.5));
      const py = Math.min(0.5, Math.max(-0.5, (e.clientY - r.top) / r.height - 0.5));
      const max = el.dataset.tilt === "sm" ? 7 : 12; // derece
      el.style.setProperty("--rx", `${(-py * 2 * max).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(px * 2 * max).toFixed(2)}deg`);
      el.style.setProperty("--gx", px.toFixed(3));
      el.style.setProperty("--gy", py.toFixed(3));
      el.setAttribute("data-tilting", "");
    };
    const onLeave = () => {
      if (active) reset(active);
      active = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
