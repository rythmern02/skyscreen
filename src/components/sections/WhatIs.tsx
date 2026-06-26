"use client";

import { useRef } from "react";
import { CAPABILITIES } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

// give the grid a deliberately uneven, cinematic rhythm
const SPANS = [
  "lg:col-span-7", "lg:col-span-5",
  "lg:col-span-4", "lg:col-span-4", "lg:col-span-4",
  "lg:col-span-5", "lg:col-span-7",
  "lg:col-span-4", "lg:col-span-4", "lg:col-span-4",
  "lg:col-span-12",
];

function Panel({ i }: { i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const cap = CAPABILITIES[i];

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Reveal
      delay={(i % 3) * 0.06}
      className={cn("group relative", SPANS[i] ?? "lg:col-span-4")}
    >
      <div
        ref={ref}
        onPointerMove={onMove}
        data-cursor
        className="glass relative h-full overflow-hidden rounded-2xl p-7 transition-transform duration-500 will-change-transform hover:-translate-y-1 sm:p-9"
      >
        {/* cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--mx) var(--my), rgba(110,168,255,0.14), transparent 60%)",
          }}
        />
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.25em] text-sky-glow/80">
              {cap.tag}
            </span>
            <span className="font-display text-xs text-faint">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-8 font-display text-2xl tracking-tight text-white sm:text-3xl">
            {cap.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-haze/70">
            {cap.blurb}
          </p>
        </div>
        <span className="pointer-events-none absolute -bottom-px left-7 right-7 h-px bg-gradient-to-r from-transparent via-sky-glow/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </Reveal>
  );
}

export function WhatIs() {
  return (
    <section id="what" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionHeader
              index="01"
              eyebrow="What is SkyScreen"
              title="One platform. The entire sky as your canvas."
              intro="SkyScreen is not a drone light show. It is a real, massive LED display flown into the air — capable of broadcasting video, advertising and live experiences to everyone below."
            />
          </div>
          <Reveal className="lg:col-span-4 lg:pb-2">
            <p className="text-sm leading-relaxed text-haze/60">
              Eleven ways to put a living image into the sky — each engineered for
              altitude, legibility and the kind of attention nothing on the ground
              can buy.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {CAPABILITIES.map((_, i) => (
            <Panel key={i} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
