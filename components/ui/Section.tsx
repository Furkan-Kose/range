import type { ReactNode } from "react";
import { SectionDivider, type DividerShape } from "./SectionDivider";

type Props = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** default: beyaz · soft: açık gri (bölümler arası ritim için dönüşümlü kullanılır) */
  tone?: "default" | "soft";
  /** Alt kenardaki geçiş şekli ve bir sonraki bölümün tonu */
  divider?: { shape: DividerShape; to: "default" | "soft" | "dark"; flip?: boolean };
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export function Section({ children, id, className = "", tone = "default", divider, ...aria }: Props) {
  return (
    <section
      id={id}
      className={`relative py-[var(--section-y)] ${divider ? "pb-[calc(var(--section-y)+clamp(32px,5vw,80px))]" : ""} ${
        tone === "soft" ? "bg-surface" : "bg-background"
      } ${className}`}
      {...aria}
    >
      {children}
      {divider && <SectionDivider shape={divider.shape} to={divider.to} flip={divider.flip} />}
    </section>
  );
}
