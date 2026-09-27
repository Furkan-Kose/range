"use client";

import { Moon, Sun } from "@/components/ui/icons";

type Props = { labels: { toLight: string; toDark: string }; className?: string };

/** Dark/Light geçişi. Seçim localStorage'da saklanır (layout'taki inline script okur). */
export function ThemeToggle({ labels, className = "" }: Props) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`grid size-9 place-items-center rounded-full text-muted transition-colors hover:text-brand ${className}`}
    >
      {/* İkon ve etiket CSS ile temaya göre değişir (hydration uyumlu) */}
      <Sun width={18} height={18} className="light:hidden" />
      <Moon width={18} height={18} className="hidden light:block" />
      <span className="sr-only light:hidden">{labels.toLight}</span>
      <span className="sr-only hidden light:inline">{labels.toDark}</span>
    </button>
  );
}
