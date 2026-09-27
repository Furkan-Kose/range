/**
 * Video yardımcıları (Vimeo / YouTube / mp4).
 * - toEmbed: oynatıcı iframe adresi (lightbox içinde, otomatik oynatma ile)
 * - getVideoInfo: build sırasında videonun kendi kapak görselini ve en-boy oranını çeker
 */

export type VideoInfo = {
  url: string;
  thumb?: string; // kapak görseli (yoksa logo gösterilir)
  width: number; // en-boy oranı için
  height: number;
};

const vimeoId = (url: string) => url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];
const youtubeId = (url: string) => url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)?.[1];

export const isVideoFile = (url: string) => /\.(mp4|webm)$/i.test(url);

export function toEmbed(url: string): string | null {
  const v = vimeoId(url);
  if (v) return `https://player.vimeo.com/video/${v}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`;
  const y = youtubeId(url);
  if (y) return `https://www.youtube-nocookie.com/embed/${y}?autoplay=1&rel=0`;
  return null;
}

/** Sunucuda (build sırasında) çalışır; hata olursa kapaksız 16:9 döner. */
export async function getVideoInfo(url: string): Promise<VideoInfo> {
  const fallback: VideoInfo = { url, width: 16, height: 9 };
  try {
    const v = vimeoId(url);
    if (v) {
      const res = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${v}`)}&width=1280`, {
        headers: { "User-Agent": "Mozilla/5.0 (RangeMedia site build)" },
        cache: "force-cache",
      });
      if (!res.ok) return fallback;
      const data = (await res.json()) as { thumbnail_url?: string; width?: number; height?: number };
      return { url, thumb: data.thumbnail_url, width: data.width || 16, height: data.height || 9 };
    }
    const y = youtubeId(url);
    if (y) {
      const shorts = /shorts\//.test(url);
      return { url, thumb: `https://i.ytimg.com/vi/${y}/hqdefault.jpg`, width: shorts ? 9 : 16, height: shorts ? 16 : 9 };
    }
  } catch {
    // ağ yoksa kapaksız devam
  }
  return fallback;
}
