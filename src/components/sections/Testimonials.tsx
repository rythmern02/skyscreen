"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { TESTIMONIALS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

function TiltCard({ index }: { index: number }) {
  const t = TESTIMONIALS[index];
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px);
    my.set(py);
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      data-cursor
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="group glass relative overflow-hidden rounded-3xl p-8 will-change-transform sm:p-10"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(440px circle at var(--mx) var(--my), rgba(110,168,255,0.16), transparent 55%)",
        }}
      />
      <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
        <span className="font-display text-5xl leading-none text-sky-glow/40">&ldquo;</span>
        <p className="mt-2 text-pretty text-lg leading-relaxed text-white/90 sm:text-xl">
          {t.quote}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/5 font-display text-sm text-white">
            {t.name.charAt(0)}
          </span>
          <div>
            <p className="text-sm font-medium text-white">{t.name}</p>
            <p className="text-xs text-mute">{t.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="shell">
        <SectionHeader
          index="09"
          eyebrow="Signals"
          title="The first to look up rarely look back."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((_, i) => (
            <Reveal key={i} delay={(i % 2) * 0.08}>
              <TiltCard index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
