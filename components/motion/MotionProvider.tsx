"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { SmoothScroll } from "./SmoothScroll";
import { TiltManager } from "./TiltManager";

/** Kullanıcı işletim sisteminde "hareketi azalt" seçtiyse tüm transform animasyonları kapanır. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <TiltManager />
      {children}
    </MotionConfig>
  );
}
