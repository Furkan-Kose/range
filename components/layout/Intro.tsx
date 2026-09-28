"use client";

import Image from "next/image";
import { useAnimate } from "motion/react";
import { useEffect, useState, type CSSProperties } from "react";
import { site } from "@/content/site";
import { EASE } from "@/components/motion/Reveal";

/**
 * Açılış animasyonu (tinywins.com'dan uyarlandı):
 * koyu ekranın ortasında logo belirir → birkaç doku/renk varyasyonu arasında hızla değişir →
 * koyu perde aşağıdan yukarı kalkarken logo navbar'daki yerine uçar → hero başlığı satır satır açılır.
 * Sadece ana sayfada, her tam yüklemede/yenilemede oynar (site içi link geçişlerinde değil); "hareketi azalt" açıksa hiç oynamaz.
 * Başlatma kararı head'deki inline script'te (layout.tsx) → ilk boyamada perde hazır, içerik görünmez.
 */

type Kind = "logo" | "solid" | "dots" | "brand" | "lines";
const SEQUENCE: Kind[] = ["logo", "solid", "dots", "brand", "lines", "solid", "logo"];
const STEP_MS = 170;
const CURTAIN = [0.76, 0, 0.24, 1] as const;

const fills: Record<Exclude<Kind, "logo">, string> = {
  solid: "#ffffff",
  brand: "#16a382",
  dots: "radial-gradient(circle, #ffffff 0 40%, transparent 45%) 0 0 / 7px 7px",
  lines: "repeating-linear-gradient(-45deg, #ffffff 0 2px, transparent 2px 6px)",
};

function Layer({ kind, visible }: { kind: Kind; visible: boolean }) {
  const cls = `absolute inset-0 ${visible ? "opacity-100" : "opacity-0"}`;
  if (kind === "logo") {
    return <Image src={site.logo.onDark} alt="" fill sizes="300px" priority className={`${cls} object-contain`} />;
  }
  const mask = `url(${site.logo.onDark}) center / contain no-repeat`;
  const style: CSSProperties = { background: fills[kind], WebkitMask: mask, mask };
  return <div className={cls} style={style} />;
}

export function Intro() {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro !== "run") return;
    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    (async () => {
      window.scrollTo(0, 0);
      // Logo belirirken hareket ve doku değişimi AYNI ANDA başlar (önce durağan logo yok)
      const cycle = (0.3 + (SEQUENCE.length * STEP_MS + 380) / 1000);
      animate(".intro-logo", { opacity: [0, 1], scale: [0.9, 1], filter: ["blur(12px)", "blur(0px)"] }, { duration: 0.5, ease: EASE });
      animate(
        ".intro-logo-inner",
        { rotate: [-8, 5, -4, 3, -2, 0], scale: [0.85, 1.08, 0.96, 1.05, 0.98, 1], y: [10, -6, 3, -4, 0, 0] },
        { duration: cycle, ease: "easeInOut" },
      );
      await sleep(120);
      for (let i = 1; i < SEQUENCE.length; i++) {
        await sleep(STEP_MS);
        if (cancelled) return;
        setStep(i);
        // her doku değişiminde küçük bir "pop"
        animate(".intro-pop", { scale: [1.08, 1] }, { duration: 0.16, ease: "easeOut" });
      }
      await sleep(380);
      if (cancelled || !scope.current) return;

      // Perde kalkıyor: hero animasyonları başlasın, tıklamalar serbest
      scope.current.style.pointerEvents = "none";
      html.dataset.introReveal = "1";
      window.dispatchEvent(new Event("intro:reveal"));

      const logoEl = scope.current.querySelector(".intro-logo")!;
      const from = logoEl.getBoundingClientRect();
      const to = document.querySelector("[data-nav-logo]")?.getBoundingClientRect();
      const moves = [animate(".intro-panel", { clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"] }, { duration: 1.05, ease: CURTAIN })];
      if (to && to.width > 0) {
        moves.push(
          animate(
            ".intro-logo",
            {
              x: to.left + to.width / 2 - (from.left + from.width / 2),
              y: to.top + to.height / 2 - (from.top + from.height / 2),
              scale: to.width / from.width,
            },
            { duration: 1.05, ease: CURTAIN },
          ),
        );
      } else {
        moves.push(animate(".intro-logo", { opacity: 0 }, { duration: 0.5 }));
      }
      await Promise.all(moves);
      if (cancelled) return;

      // Navbar logosu yerine geçer (çapraz geçiş), sonra açılış biter
      html.dataset.introLand = "1";
      await animate(".intro-logo", { opacity: 0 }, { duration: 0.35 });
      html.dataset.intro = "done";
      window.dispatchEvent(new Event("intro:end"));
    })();

    return () => {
      cancelled = true;
    };
  }, [animate, scope]);

  return (
    <div ref={scope} aria-hidden className="intro-overlay fixed inset-0 z-[200] items-center justify-center">
      <div className="intro-panel absolute inset-0 bg-[#0b0c0b]" />
      <div className="intro-logo relative aspect-[1228/710] w-[min(56vw,280px)] opacity-0">
        <div className="intro-logo-inner absolute inset-0">
          <div className="intro-pop absolute inset-0">
            {SEQUENCE.map((kind, i) => (
              <Layer key={i} kind={kind} visible={i === step} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
