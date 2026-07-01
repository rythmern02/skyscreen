"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { SHOWCASE, type ShowcaseItem } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

function Slide({ item, priority }: { item: ShowcaseItem; priority?: boolean }) {
  return (
    <article
      data-cursor="lg"
      data-cursor-label="View"
      className="group relative flex h-full w-[82vw] shrink-0 overflow-hidden rounded-3xl border border-line sm:w-[64vw] lg:w-[46vw]"
    >
      {/* real photography */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={item.img}
          alt={`${item.category} - ${item.title}`}
          fill
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 64vw, 46vw"
          priority={priority}
          className="object-cover brightness-[0.62] saturate-[1.05] transition-transform duration-[1.3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        {/* accent wash + readability gradient */}
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-60"
          style={{ background: `linear-gradient(140deg, ${item.accent}, transparent 60%)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />
      </div>

      {/* content */}
      <div className="relative z-10 mt-auto w-full p-7 sm:p-9">
        <div className="flex items-center gap-3">
          <span className="font-display text-xs text-white/50">{item.index}</span>
          <span className="text-[11px] uppercase tracking-[0.25em]" style={{ color: item.accent }}>
            {item.category}
          </span>
        </div>
        <h3 className="mt-3 max-w-md font-display text-2xl tracking-tight text-white sm:text-3xl">
          {item.title}
        </h3>
        <div className="mt-5 flex items-end justify-between gap-6">
          <p className="max-w-xs text-sm leading-relaxed text-haze/80">{item.line}</p>
          <div className="shrink-0 text-right">
            <div className="font-display text-2xl text-white sm:text-3xl">{item.spec}</div>
            <div className="text-[11px] uppercase tracking-wider text-mute">{item.specLabel}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Showcase() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 64));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section id="showcase" className="relative scroll-mt-24">
      <div ref={targetRef} style={{ height: `${Math.max(220, distance / 6 + 130)}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="shell shrink-0 pb-10 pt-24">
            <SectionHeader
              index="02"
              eyebrow="Use Cases"
              title="Built for your biggest moment."
              intro="We're a new kind of medium - here's what SkyScreen is engineered to do for brands, artists and events."
            />
          </div>
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-[58vh] min-h-[360px] items-stretch gap-6 px-[clamp(1.25rem,5vw,5rem)] will-change-transform"
          >
            {SHOWCASE.map((item, i) => (
              <Slide key={item.id} item={item} priority={i === 0} />
            ))}
            {/* closing card */}
            <div className="flex h-full w-[60vw] shrink-0 items-center justify-center rounded-3xl border border-dashed border-line sm:w-[40vw] lg:w-[28vw]">
              <div className="text-center">
                <p className="font-display text-2xl text-fg">Your campaign</p>
                <p className="mt-2 text-sm text-mute">could be the first we fly.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
