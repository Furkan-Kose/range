import type { ReactNode } from "react";

type Props = {
  code?: string; // "01A" → "RANGE MEDİA 01A"
  title: string;
  children?: ReactNode;
  className?: string;
  as?: "h3" | "h2";
};

/** Film şeridi kartı: üst/alt perforasyonlu siyah bant + kart zemini (--paper, temaya göre). */
export function FilmStripCard({ code, title, children, className = "", as: Tag = "h3" }: Props) {
  return (
    <article data-tilt className={`relative flex flex-col overflow-hidden rounded-lg bg-[var(--paper)] text-[var(--paper-foreground)] shadow-[var(--shadow)] ${className}`}>
      <div className="film-perf" aria-hidden />
      {/* Boşluklar satır aralığı payıyla birlikte gözle eşit; eşit yükseklikte fazla alan üst-alta eşit dağılır (justify-center) */}
      <div className="flex flex-1 flex-col justify-center px-6 pt-7 pb-6 md:px-8 md:pt-10 md:pb-9">
        {code && <p className="font-mono text-[0.8125rem] tracking-[0.2em] text-brand uppercase">Range Media {code}</p>}
        <Tag className={`text-h3 ${code ? "mt-3.5" : ""}`}>
          {title}
        </Tag>
        {children && <div className="text-body mt-2.5 text-[var(--paper-muted)] md:mt-3.5">{children}</div>}
      </div>
      <div className="film-perf" aria-hidden />
    </article>
  );
}
