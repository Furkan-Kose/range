/**
 * Bölüm geçiş şekli — bir bölümün ALT kenarına konur ve bir sonraki bölümün rengiyle doldurulur.
 *
 * SİTE KURALI (tutarlılık için değiştirme):
 *   - wave      → yalnızca iç sayfa hero'larının altında (PageHero)
 *   - diagonal  → diğer tüm bölüm geçişlerinde (ton değişen bölümler arasında)
 */
export type DividerShape = "wave" | "diagonal";

const paths: Record<DividerShape, string> = {
  wave: "M0,44 C240,92 480,92 720,52 C960,12 1200,6 1440,40 L1440,80 L0,80 Z",
  diagonal: "M0,0 L1440,80 L0,80 Z", // tek yön: sol yukarıda, sağ aşağıda
};

const fills = {
  default: "var(--background)", // beyaz bölüm
  soft: "var(--surface)", // açık gri bölüm
  dark: "#0b0c0b", // RNG Sport (her iki temada koyu)
};

type Props = {
  shape: DividerShape;
  /** Bir sonraki bölümün tonu */
  to: keyof typeof fills;
  /** Yatay çevir — çapraz geçişlerde KULLANMA (sitede tüm çaprazlar tek yönlü) */
  flip?: boolean;
  className?: string;
};

export function SectionDivider({ shape, to, flip = false, className = "" }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 -bottom-px z-[1] block h-[clamp(32px,5vw,80px)] w-full ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d={paths[shape]} fill={fills[to]} />
    </svg>
  );
}
