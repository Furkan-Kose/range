"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox, { type GenericSlide, type RenderSlideProps } from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import { isVideoFile, toEmbed, type VideoInfo } from "@/lib/video";
import { Play } from "./icons";

// Vimeo / YouTube için özel slide tipi
declare module "yet-another-react-lightbox" {
  interface EmbedSlide extends GenericSlide {
    type: "embed";
    src: string;
    title: string;
    width: number;
    height: number;
  }
  interface SlideTypes {
    embed: EmbedSlide;
  }
}

type Props = {
  videos: (VideoInfo & { title: string })[];
  logo: string; // kapak yoksa gösterilir
  labels: { play: string; close: string; previous: string; next: string };
};

/** Video kapak kartları ızgarası; tıklanan video lightbox içinde açılır (Esc / oklar / kaydırma). */
export function VideoGallery({ videos, logo, labels }: Props) {
  const [index, setIndex] = useState(-1);

  const slides = videos.map((v) =>
    isVideoFile(v.url)
      ? { type: "video" as const, width: v.width, height: v.height, sources: [{ src: v.url, type: "video/mp4" }], autoPlay: true }
      : { type: "embed" as const, src: toEmbed(v.url) ?? v.url, title: v.title, width: v.width, height: v.height },
  );

  const renderSlide = ({ slide, offset }: RenderSlideProps) => {
    if (slide.type !== "embed") return undefined;
    // Oranı koruyarak ekrana sığdır (dikey Reels videoları da doğru görünür)
    const ratio = slide.width / slide.height;
    return (
      <div
        style={{ aspectRatio: `${slide.width} / ${slide.height}`, width: `min(92vw, calc(84vh * ${ratio}))` }}
        className="overflow-hidden rounded-xl bg-black"
      >
        {/* Sadece aktif slide yüklenir; kapanınca/geçince video durur */}
        {offset === 0 && (
          <iframe
            src={slide.src}
            title={slide.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        )}
      </div>
    );
  };

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v, i) => (
          <li key={v.url}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${labels.play}: ${v.title}`}
              className="group relative block aspect-video w-full overflow-hidden rounded-[20px] border border-border bg-surface-2"
            >
              {v.thumb ? (
                <Image
                  src={v.thumb}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-brand group-hover:scale-[1.05]"
                />
              ) : (
                <span className="absolute inset-0 grid place-items-center">
                  <span className="relative h-1/3 w-1/2">
                    <Image src={logo} alt="" fill sizes="200px" className="logo-mono object-contain opacity-25" />
                  </span>
                </span>
              )}
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-full bg-brand text-brand-foreground transition-transform duration-500 ease-brand group-hover:scale-110">
                  <Play width={16} height={16} />
                </span>
                <span className="text-label text-white">{labels.play}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        open={index >= 0}
        index={Math.max(index, 0)}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Video]}
        render={{
          slide: renderSlide,
          ...(slides.length <= 1 ? { buttonPrev: () => null, buttonNext: () => null } : {}),
        }}
        carousel={{ finite: slides.length <= 1 }}
        controller={{ closeOnBackdropClick: true }}
        labels={{ Close: labels.close, Previous: labels.previous, Next: labels.next }}
        styles={{ container: { backgroundColor: "rgb(0 0 0 / 0.92)" } }}
      />
    </>
  );
}
