import { Fragment } from "react";

/**
 * Content dosyalarındaki basit işaretlemeyi render eder:
 *   *kelime* → italik serif vurgu
 *   \n       → satır sonu (RichText) / ayrı satır (TextReveal)
 */
export function renderAccents(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className="accent">
        {part.slice(1, -1)}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export function RichText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {renderAccents(line)}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}

/** Meta/alt metinlerde kullanmak için işaretlemeyi temizler. */
export const plainText = (text: string) => text.replace(/\*/g, "").replace(/\n/g, " ");
