"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Kullanıcı işletim sisteminde "hareketi azalt" seçtiyse tüm transform animasyonları kapanır. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
