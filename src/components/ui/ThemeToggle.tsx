"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [light, setLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      data-cursor
      aria-label={`Switch to ${light ? "dark" : "light"} mode`}
      onClick={toggle}
      className={cn(
        "relative flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/[0.03] text-fg transition-colors hover:border-line-strong",
        className,
      )}
    >
      <span className="relative h-[18px] w-[18px]">
        {/* sun / moon crossfade */}
        <svg
          viewBox="0 0 24 24"
          className="absolute inset-0 h-full w-full transition-all duration-500"
          style={{
            opacity: mounted && light ? 1 : 0,
            transform: `rotate(${mounted && light ? 0 : -90}deg) scale(${mounted && light ? 1 : 0.6})`,
          }}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="absolute inset-0 h-full w-full transition-all duration-500"
          style={{
            opacity: mounted && !light ? 1 : 0,
            transform: `rotate(${mounted && !light ? 0 : 90}deg) scale(${mounted && !light ? 1 : 0.6})`,
          }}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 14.5A8 8 0 1 1 9.5 4a6.2 6.2 0 0 0 10.5 10.5z" />
        </svg>
      </span>
    </button>
  );
}
