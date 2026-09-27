import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { RichText } from "./RichText";

type Props = {
  eyebrow?: string;
  title: string; // *kelime* → marka renginde vurgu
  description?: string;
  action?: ReactNode;
  as?: "h1" | "h2";
  align?: "split" | "center";
  id?: string;
  className?: string;
};

/**
 * Bölüm başlığı. "split": solda eyebrow + başlık + (altında) açıklama, sağda aksiyon butonu.
 * "center": ortalanmış.
 */
export function SectionHeading({ eyebrow, title, description, action, as: Tag = "h2", align = "split", id, className = "" }: Props) {
  const size = Tag === "h1" ? "text-h1" : "text-h2";

  if (align === "center") {
    return (
      <Reveal className={`mx-auto max-w-3xl text-center ${className}`}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Tag id={id} className={`${size} mt-3 text-balance`}>
          <RichText text={title} />
        </Tag>
        {description && <p className="text-body mx-auto mt-4 max-w-xl text-muted">{description}</p>}
        {action && <div className="mt-8">{action}</div>}
      </Reveal>
    );
  }

  return (
    <Reveal className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10 ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Tag id={id} className={`${size} mt-3 text-balance`}>
          <RichText text={title} />
        </Tag>
        {description && <p className="text-body mt-4 max-w-xl text-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-label text-brand ${className}`}>{children}</p>;
}
