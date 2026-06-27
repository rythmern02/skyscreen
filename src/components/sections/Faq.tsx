"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FAQS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-28 sm:py-36">
      <div className="shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeader index="10" eyebrow="FAQ" title="Questions, answered." />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-haze/60">
                Still curious? Our flight team answers anything within a day.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="border-t border-line">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={i} delay={(i % 4) * 0.04}>
                  <div className="border-b border-line">
                    <button
                      data-cursor
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-xl tracking-tight text-fg/90 transition-colors group-hover:text-fg sm:text-2xl">
                        {item.q}
                      </span>
                      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line">
                        <span className="absolute h-3 w-px bg-fg/70 transition-transform duration-300" style={{ transform: isOpen ? "rotate(90deg)" : "none" }} />
                        <span className="h-px w-3 bg-fg/70" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-8 text-sm leading-relaxed text-haze/70">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
