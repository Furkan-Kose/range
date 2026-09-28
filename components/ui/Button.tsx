import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  /** primary: yeşil · outline: çerçeveli · light: beyaz (koyu zemin/video üstü) · ghost: yarı saydam (video üstü) */
  variant?: "primary" | "outline" | "light" | "ghost";
  size?: "md" | "sm";
  className?: string;
  icon?: boolean;
  "aria-label"?: string;
};

const variants = {
  primary: "border-brand bg-brand text-brand-foreground hover:brightness-110",
  outline: "border-foreground/20 bg-background text-foreground hover:border-brand hover:text-brand",
  light: "border-white bg-white text-[#101110] hover:bg-white/90",
  ghost: "border-white/45 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
};
const sizes = {
  md: "px-6 py-3.5 text-[0.9375rem]",
  sm: "px-5 py-2.5 text-[0.9375rem]",
};

/** Link tabanlı buton. Harici linkler (http) yeni sekmede, tel:/mailto: native açılır. */
export function Button({ href, children, variant = "primary", size = "md", className = "", icon = true, ...rest }: Props) {
  const external = /^https?:/.test(href);
  const native = /^(tel:|mailto:)/.test(href);
  const cls = `group inline-flex items-center gap-2 rounded-lg border font-semibold leading-none transition-[color,background-color,border-color,filter] duration-300 ${sizes[size]} ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span aria-hidden className="transition-transform duration-300 ease-brand group-hover:translate-x-0.5">
          →
        </span>
      )}
    </>
  );

  if (external || native) {
    return (
      <a href={href} data-tilt="sm" className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} data-tilt="sm" className={cls} {...rest}>
      {content}
    </Link>
  );
}
