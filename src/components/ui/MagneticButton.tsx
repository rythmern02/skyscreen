"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  strength?: number;
  type?: "button" | "submit";
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  strength = 0.4,
  type = "button",
}: Props) {
  const ref = useMagnetic<HTMLAnchorElement & HTMLButtonElement>(strength);

  const base =
    "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors will-change-transform select-none";
  const styles: Record<Variant, string> = {
    primary: "bg-fg text-void",
    ghost:
      "border border-line-strong bg-white/[0.02] text-fg/85 hover:text-fg",
  };

  const inner = (
    <>
      {variant === "primary" && (
        <span className="absolute inset-0 -z-0 translate-y-full bg-sky-core transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
      )}
      <span
        data-magnetic-inner
        className={cn(
          "relative z-10 inline-flex items-center gap-2.5 will-change-transform",
          variant === "primary" && "group-hover:text-white transition-colors duration-300",
        )}
      >
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        data-cursor
        onClick={onClick}
        className={cn(base, styles[variant], className)}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      data-cursor
      onClick={onClick}
      className={cn(base, styles[variant], className)}
    >
      {inner}
    </button>
  );
}
