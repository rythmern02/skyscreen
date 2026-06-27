"use client";

import { STATS, WHY_POINTS } from "@/lib/data";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Stats() {
  return (
    <section id="why" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-36">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-sky-core/10 blur-[140px]" />

      <div className="shell relative">
        <SectionHeader
          index="05"
          eyebrow="Why SkyScreen"
          title="Engineered to dominate the sky."
          align="center"
          intro="Every figure below is a capability the platform is built to deliver — the case for putting your message in the air."
        />

        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal
              key={i}
              delay={(i % 3) * 0.08}
              className="group relative bg-ink/80 p-8 transition-colors duration-500 hover:bg-coal sm:p-10"
            >
              <div className="flex items-baseline font-display text-5xl tracking-tight text-fg sm:text-6xl">
                {s.prefix ? <span>{s.prefix}</span> : null}
                <CountUp value={s.value} decimals={s.decimals ?? 0} />
                <span className="text-sky-glow">{s.suffix}</span>
              </div>
              <p className="mt-4 text-sm text-haze/60">{s.label}</p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-sky-glow/60 transition-all duration-700 group-hover:w-full" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {WHY_POINTS.map((p) => (
            <span key={p} className="flex items-center gap-2 text-sm text-haze/70">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              {p}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
