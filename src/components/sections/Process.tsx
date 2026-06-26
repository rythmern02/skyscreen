"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PROCESS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="shell">
        <SectionHeader
          index="07"
          eyebrow="The Process"
          title="From first call to the moment it lifts."
          intro="A single, choreographed pipeline. We carry the complexity — aviation, design and deployment — so you only carry the idea."
        />

        <div ref={ref} className="relative mt-20">
          {/* track */}
          <div className="absolute left-[19px] top-2 h-full w-px bg-line md:left-1/2 md:-translate-x-1/2" />
          {/* glowing fill */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[19px] top-2 h-full w-px origin-top bg-gradient-to-b from-sky-glow via-sky-core to-signal shadow-[0_0_18px_2px_rgba(110,168,255,0.6)] md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-10 md:space-y-2">
            {PROCESS.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <motion.div
                  key={step.no}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "relative grid items-center gap-x-8 pl-14 md:grid-cols-2 md:pl-0",
                    "md:gap-x-20",
                  )}
                >
                  {/* node */}
                  <span className="absolute left-[11px] top-1.5 z-10 flex h-4 w-4 -translate-x-0 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                    <span className="h-2 w-2 rounded-full bg-sky-glow shadow-[0_0_14px_3px_rgba(110,168,255,0.7)]" />
                    <span className="absolute h-4 w-4 animate-[pulse-soft_2.4s_ease-in-out_infinite] rounded-full border border-sky-glow/40" />
                  </span>

                  <div
                    className={cn(
                      "py-6 md:py-10",
                      right ? "md:order-2 md:pl-4" : "md:text-right md:pr-4",
                    )}
                  >
                    <span className="font-display text-sm text-sky-glow/70">{step.no}</span>
                    <h3 className="mt-1 font-display text-2xl tracking-tight text-white sm:text-3xl">
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 max-w-sm text-sm leading-relaxed text-haze/65",
                        !right && "md:ml-auto",
                      )}
                    >
                      {step.detail}
                    </p>
                  </div>
                  <div className="hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
