"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const TEXT =
  "For a century, advertising has been bolted to walls, roads and rooftops. SkyScreen lifts it off the ground entirely — a living screen that flies, broadcasts and turns the open night into the most unforgettable stage on Earth.";

function Word({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = TEXT.split(" ");

  return (
    <section className="relative py-28 sm:py-40">
      <div className="shell">
        <p ref={ref} className="mx-auto max-w-5xl text-center font-display text-3xl leading-[1.2] tracking-tight text-fg sm:text-5xl sm:leading-[1.18]">
          {words.map((w, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} range={[start, end]} progress={scrollYProgress}>
                {w}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}
