"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HeroScene = dynamic(() => import("@/components/canvas/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-void" />,
});

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="force-dark relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-void"
    >
      {/* 3D stage */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* readability scrims */}
      <div className="scrim-top pointer-events-none absolute inset-x-0 top-0 h-40" />
      <div className="scrim-bottom pointer-events-none absolute inset-x-0 bottom-0 h-[70vh]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_15%_85%,rgba(5,5,5,0.78),transparent_60%)]" />

      {/* copy */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end pb-[8vh] sm:pb-[10vh]">
        <div className="shell">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="eyebrow mb-6 flex items-center gap-3"
          >
            <span className="inline-block h-1.5 w-1.5 animate-[pulse-soft_2s_ease-in-out_infinite] rounded-full bg-signal" />
            Drone Flying LED Screen Advertising
          </motion.p>

          <h1 className="display-xl max-w-[14ch] text-balance text-white">
            <Line text="Advertising" delay={0.4} />
            <Line text="Has Left" delay={0.55} />
            <Line text="The Ground." delay={0.7} accent />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease }}
            className="mt-7 max-w-md text-pretty text-base leading-relaxed text-haze/80 sm:text-lg"
          >
            Transform the sky into the world&apos;s most unforgettable billboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease }}
            className="pointer-events-auto mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#contact" variant="primary">
              Book Now
              <Arrow />
            </MagneticButton>
            <MagneticButton href="#showcase" variant="ghost">
              <PlayDot />
              See How It Works
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-mute">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line-strong">
          <span className="absolute inset-x-0 top-0 h-3 animate-[float-y_1.8s_ease-in-out_infinite] bg-white" />
        </span>
      </motion.div>
    </section>
  );
}

function Line({ text, delay, accent }: { text: string; delay: number; accent?: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease }}
        className={`inline-block ${accent ? "text-shimmer" : ""}`}
      >
        {text}
      </motion.span>
    </span>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayDot() {
  return (
    <span className="relative flex h-5 w-5 items-center justify-center rounded-full border border-white/30">
      <span className="ml-[1px] h-0 w-0 border-y-[3px] border-l-[5px] border-y-transparent border-l-white" />
    </span>
  );
}
