"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { createContext, useContext, useRef, type ReactNode } from "react";

/**
 * Kaydırmaya bağlı 3D "kamera" geçişi — tüm bölümler aynı hareketle ("rise": aşağıdan yatık gelip düzleşir) girer/çıkar.
 * Kullanıcı farklı hareketleri beğenmedi; yeni preset eklenebilir ama varsayılan hep "rise".
 *
 * İki ayrı ilerleme ölçülür (bölümün kendi konumuna göre):
 * - enter: bölümün üstü ekranın altına değdiğinde 0 → üstü ekranın %40'ına geldiğinde 1 (bölüm düzleşmiş, okunur)
 * - exit:  bölümün altı ekranın %25'ine geldiğinde 0 → altı ekranın üstünden çıktığında 1
 * Böylece sayfanın sonundaki kısa bölümler bile her zaman tam düzleşir.
 *
 * Her preset: giriş anındaki değer → (düz) → çıkış anındaki değer. "Hareketi azalt" açıksa hiçbiri uygulanmaz.
 */
type Axis = { from: number; to: number };
type Preset = {
  rotateX?: Axis;
  rotateY?: Axis;
  z?: Axis;
  x?: Axis;
  y?: Axis;
  scale?: Axis; // 1 = normal
  origin: string;
};

export const CAMERA_PRESETS = {
  /** Aşağıdan yatık gelip düzleşir (kamera eğilip yaklaşır) — Neden Range Media */
  rise: { rotateX: { from: 32, to: -14 }, z: { from: -320, to: -160 }, y: { from: 120, to: -60 }, origin: "50% 100%" },
} satisfies Record<string, Preset>;

export type CameraPreset = keyof typeof CAMERA_PRESETS;

type Progress = { enter: MotionValue<number>; exit: MotionValue<number> } | null;
const ProgressCtx = createContext<Progress>(null);

/** Giriş: 1−enter oranında "from"; çıkış: exit oranında "to". Ortada 0 (scale için 1). */
function useAxis(enter: MotionValue<number>, exit: MotionValue<number>, axis: Axis | undefined, rest = 0) {
  return useTransform([enter, exit], ([e, x]: number[]) => {
    if (!axis) return rest;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // girişte yumuşak yavaşlama
    return rest + (axis.from - rest) * (1 - ease(e)) + (axis.to - rest) * x * x;
  });
}

export function Camera3D({
  children,
  preset = "rise",
  className,
}: {
  children: ReactNode;
  preset?: CameraPreset;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const p: Preset = CAMERA_PRESETS[preset];
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 0.4"] });
  const { scrollYProgress: exit } = useScroll({ target: ref, offset: ["end 0.25", "end start"] });

  const rotateX = useAxis(enter, exit, p.rotateX);
  const rotateY = useAxis(enter, exit, p.rotateY);
  const z = useAxis(enter, exit, p.z);
  const x = useAxis(enter, exit, p.x);
  const y = useAxis(enter, exit, p.y);
  const scale = useAxis(enter, exit, p.scale, 1);
  const opacity = useTransform([enter, exit], ([e, xx]: number[]) => (0.15 + 0.85 * Math.min(1, e * 1.4)) * (1 - 0.6 * xx));

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={
          reduce
            ? undefined
            : { rotateX, rotateY, z, x, y, scale, opacity, transformPerspective: 1200, transformOrigin: p.origin, willChange: "transform" }
        }
      >
        <ProgressCtx.Provider value={reduce ? null : { enter, exit }}>{children}</ProgressCtx.Provider>
      </motion.div>
    </div>
  );
}

/**
 * Kamera sahnesinde ayrı bir katman: depth ne kadar derinden gelsin (1–3), orbit yandan dönüş açısı (derece)
 * → katmanlar farklı hızlarda yerine oturur, kamera geçerken paralaks/derinlik hissi oluşur.
 */
export function CameraLayer({
  children,
  depth = 1,
  orbit = 0,
  className,
}: {
  children: ReactNode;
  depth?: number;
  orbit?: number;
  className?: string;
}) {
  const ctx = useContext(ProgressCtx);
  const idle = useMotionValue(1);
  const none = useMotionValue(0);
  const enter = ctx?.enter ?? idle;
  const exit = ctx?.exit ?? none;

  const z = useAxis(enter, exit, { from: -depth * 180, to: -depth * 90 });
  const rotateY = useAxis(enter, exit, { from: orbit, to: -orbit * 0.5 });
  const y = useAxis(enter, exit, { from: depth * 40, to: -depth * 20 });

  if (!ctx) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} style={{ z, rotateY, y, transformPerspective: 1200, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
