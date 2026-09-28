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
      <div className="flex-1 px-8 pt-9 pb-10">
        {code && <p className="font-mono text-[0.8125rem] tracking-[0.2em] text-brand uppercase">Range Media {code}</p>}
        <Tag className="text-h3 mt-3.5">
          {title}
        </Tag>
        {children && <div className="text-body mt-3.5 text-[var(--paper-muted)]">{children}</div>}
      </div>
      <div className="film-perf" aria-hidden />
    </article>
  );
}
