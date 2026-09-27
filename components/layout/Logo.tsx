import Image from "next/image";
import { site } from "@/content/site";

type Props = {
  className?: string;
  priority?: boolean;
  /** "auto": temaya göre (light → koyu harfli, dark → beyaz harfli). "white": her zaman beyaz harfli (video üstü). */
  variant?: "auto" | "white";
};

export function Logo({ className = "h-10 w-auto", priority = false, variant = "auto" }: Props) {
  const { onDark, onLight, width, height } = site.logo;
  if (variant === "white") {
    return <Image src={onDark} alt={site.name} width={width} height={height} priority={priority} className={className} />;
  }
  return (
    <>
      <Image src={onLight} alt={site.name} width={width} height={height} priority={priority} className={`${className} dark:hidden`} />
      <Image src={onDark} alt={site.name} width={width} height={height} priority={priority} className={`${className} hidden dark:block`} />
    </>
  );
}
