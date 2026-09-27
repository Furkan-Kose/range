import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  reverse?: boolean;
  duration?: number; // saniye — büyüdükçe yavaşlar
  className?: string;
  /** Kenarlarda yumuşak kaybolma (ticker bantlarında kapalı) */
  fade?: boolean;
};

/**
 * Sonsuz yatay kayan şerit (saf CSS). Üzerine gelince / focus olunca durur.
 * reduced-motion'da animasyon kapanır (globals.css).
 */
export function Marquee({ children, reverse = false, duration = 60, className = "", fade = true }: Props) {
  return (
    <div
      className={`marquee group relative overflow-hidden ${className}`}
      style={
        fade
          ? {
              maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
              WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            }
          : undefined
      }
    >
      <div
        className={`marquee-track flex w-max ${reverse ? "marquee-reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden inert>
          {children}
        </div>
      </div>
    </div>
  );
}
