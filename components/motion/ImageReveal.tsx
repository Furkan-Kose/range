"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "./Reveal";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
  /** Açılış yönü: alttan yukarı (varsayılan) veya soldan sağa */
  from?: "bottom" | "left";
};

/** Görsel/videoyu clip-path perde efektiyle açar, içerik hafifçe ölçeklenir. */
export function ImageReveal({ children, className, delay = 0, immediate = false, from = "bottom" }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const hidden = from === "left" ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)";
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <motion.div
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: { clipPath: hidden }, show: { clipPath: "inset(0% 0% 0% 0%)" } }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <motion.div
        className="h-full w-full"
        variants={{ hidden: { scale: 1.12 }, show: { scale: 1 } }}
        transition={{ duration: 1.4, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
