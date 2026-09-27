import fs from "node:fs";
import path from "node:path";

/**
 * public/ altındaki bir dosyanın var olup olmadığını kontrol eder (sadece server'da).
 * Böylece content dosyasına yolu yazılmış ama henüz eklenmemiş medya için
 * otomatik olarak placeholder gösterilir. Dosyayı eklediğinde kendiliğinden görünür.
 */
export function mediaExists(src?: string | null): src is string {
  if (!src) return false;
  if (/^https?:\/\//.test(src)) return true;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", decodeURI(src)));
  } catch {
    return false;
  }
}

/** Dosya varsa yolu, yoksa undefined döner. */
export const existing = (src?: string | null) => (mediaExists(src) ? src : undefined);
