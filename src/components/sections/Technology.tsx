"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { TECH_PARTS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const ExplodedDrone = dynamic(() => import("@/components/canvas/ExplodedDrone"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

export function Technology() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  return (
    <section id="technology" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          index="04"
          eyebrow="The Technology"
          title="Eight systems. One impossibly steady picture."
          intro="Pull the SkyScreen apart and every component earns its place — each tuned so the screen reads razor-sharp from the ground."
        />
      </div>

      <div className="relative mt-12 grid lg:grid-cols-2">
        {/* single responsive 3D viewer — inline on mobile, sticky on desktop */}
        <div className="relative h-[52vh] lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
          <motion.div
            onViewportEnter={() => setInView(true)}
            onViewportLeave={() => setInView(false)}
            viewport={{ margin: "-10% 0px" }}
            className="relative h-full w-full lg:h-[80vh]"
          >
            <ExplodedDrone active={active} explode={inView ? 1 : 0} />
            <div className="pointer-events-none absolute bottom-6 left-[clamp(1.25rem,5vw,5rem)] lg:bottom-10">
              <span className="font-display text-xs text-faint">
                {String(active + 1).padStart(2, "0")} / {String(TECH_PARTS.length).padStart(2, "0")}
              </span>
              <p className="font-display text-lg text-white">{TECH_PARTS[active].title}</p>
            </div>
          </motion.div>
        </div>

        {/* scrolling parts list */}
        <div className="shell lg:pr-[clamp(1.25rem,5vw,5rem)]">
          <div className="flex flex-col gap-2 py-10 lg:py-[18vh]">
            {TECH_PARTS.map((part, i) => (
              <motion.button
                key={part.id}
                data-cursor
                onViewportEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className={cn(
                  "group border-t border-line py-8 text-left transition-opacity duration-500",
                  active === i ? "opacity-100" : "opacity-40 hover:opacity-70",
                )}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-sm text-sky-glow/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl tracking-tight text-white sm:text-3xl">
                    {part.title}
                  </h3>
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    height: active === i ? "auto" : 0,
                    opacity: active === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-md pt-3 text-sm leading-relaxed text-haze/70">
                    {part.detail}
                  </p>
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
