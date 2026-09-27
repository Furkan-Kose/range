import Image from "next/image";
import { mediaExists } from "@/lib/media";
import { BackgroundVideo } from "./BackgroundVideo";

type Props = {
  src?: string; // görsel yolu
  video?: string; // opsiyonel mp4 — varsa görsel poster olur
  alt: string;
  sizes: string; // next/image sizes, ör. "(min-width: 1024px) 50vw, 100vw"
  className?: string; // kapsayıcı (boyut/oran burada verilir, ör. "aspect-[4/5]")
  imgClassName?: string;
  priority?: boolean;
};

/**
 * Tüm fotoğraf/video alanlarının ortak bileşeni. Kapsayıcıyı doldurur (fill).
 * Dosya public/ altında yoksa, yolu gösteren açık bir placeholder render eder —
 * dosyayı o yola eklediğinde otomatik görünür.
 */
export function Media({ src, video, alt, sizes, className = "", imgClassName = "", priority }: Props) {
  const hasImage = mediaExists(src);
  const hasVideo = mediaExists(video);

  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      {hasVideo ? (
        <BackgroundVideo src={video!} poster={hasImage ? src : undefined} label={alt} className="absolute inset-0 h-full w-full object-cover" />
      ) : hasImage ? (
        <Image src={src!} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imgClassName}`} />
      ) : (
        <MediaPlaceholder path={src || video} />
      )}
    </div>
  );
}

export function MediaPlaceholder({ path }: { path?: string }) {
  return (
    <div
      role="img"
      aria-label="Medya eklenecek"
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center"
      style={{ background: "linear-gradient(150deg, #1d2a26, #0f1513)" }}
    >
      <span className="text-label text-white/45">Görsel / video eklenecek</span>
      {path && <span className="text-[0.6875rem] break-all text-white/30">{path}</span>}
    </div>
  );
}
