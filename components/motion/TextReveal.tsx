"use client";

import { motion } from "motion/react";
import { renderAccents } from "@/components/ui/RichText";
import { EASE } from "./Reveal";

type Props = {
  text: string; // *vurgu* ve \n destekler
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
  delay?: number;
  /** true: sayfa açılışında hemen oynar (hero). false: görünür alana girince. */
  immediate?: boolean;
};

/** Başlıkları satır satır maske içinden yukarı kaydırarak gösterir. */
export function TextReveal({ text, as = "h2", className, id, delay = 0, immediate = false }: Props) {
  const Tag = motion[as];
  const lines = text.split("\n");
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag id={id} className={className} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.09 }}
          >
            {renderAccents(line)}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
