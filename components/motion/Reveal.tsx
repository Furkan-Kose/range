"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useIntroReady } from "./intro";

// Sitenin tek motion dili: aynı easing, benzer süreler.
export const EASE = [0.22, 1, 0.36, 1] as const;
export const DURATION = 0.8;

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** true: görünür alana girmeyi değil, açılış animasyonunun bitmesini bekler (hero) */
  afterIntro?: boolean;
};

/** Görünür alana girince yumuşak fade + yukarı kayma. */
export function Reveal({ children, className, delay = 0, y = 24, afterIntro = false }: Props) {
  const introReady = useIntroReady();
  const trigger = afterIntro
    ? { animate: introReady ? { opacity: 1, y: 0 } : undefined }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...trigger}
      transition={{ duration: DURATION, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
