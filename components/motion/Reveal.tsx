"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// Sitenin tek motion dili: aynı easing, benzer süreler.
export const EASE = [0.22, 1, 0.36, 1] as const;
export const DURATION = 0.8;

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Görünür alana girince yumuşak fade + yukarı kayma. */
export function Reveal({ children, className, delay = 0, y = 24 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: DURATION, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
