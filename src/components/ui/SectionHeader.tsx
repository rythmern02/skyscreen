"use client";

import { Reveal, AnimatedText } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeader({
  index,
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal className="flex items-center gap-3">
        {index ? (
          <span className="font-display text-xs text-faint">{index}</span>
        ) : null}
        <span className="h-px w-8 bg-line-strong" />
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <h2
        className={cn(
          "display-lg max-w-4xl text-balance text-fg",
          align === "center" && "mx-auto",
        )}
      >
        <AnimatedText text={title} />
      </h2>
      {intro ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-xl text-pretty text-base leading-relaxed text-haze/80",
              align === "center" && "mx-auto",
            )}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
