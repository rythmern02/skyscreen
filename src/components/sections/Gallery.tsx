"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { GALLERY, type GalleryItem } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Gallery() {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <section className="relative py-28 sm:py-36">
      <div className="shell">
        <SectionHeader
          index="08"
          eyebrow="The Medium"
          title="The display, the rig, and the moments it's for."
          intro="Illustrative imagery of the technology and the contexts SkyScreen is built to light up."
        />

        <div className="mt-16 [column-fill:_balance] gap-5 sm:columns-2 lg:columns-3">
          {GALLERY.map((tile, i) => (
            <motion.button
              key={tile.id}
              layoutId={`tile-${tile.id}`}
              data-cursor="lg"
              data-cursor-label="Open"
              onClick={() => setActive(tile)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-line"
              style={{ height: tile.h }}
            >
              <div className="relative h-full w-full">
                <Image
                  src={tile.img}
                  alt={`${tile.caption} — ${tile.place}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover brightness-[0.72] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] group-hover:brightness-90"
                />
                <div
                  className="absolute inset-0 mix-blend-soft-light opacity-0 transition-opacity duration-500 group-hover:opacity-70"
                  style={{ background: `linear-gradient(160deg, ${tile.accent}, transparent 65%)` }}
                />
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between bg-gradient-to-t from-black/85 to-transparent p-5">
                  <div className="translate-y-1 opacity-80 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-display text-lg text-white">{tile.caption}</p>
                    <p className="text-xs text-haze/60">{tile.place}</p>
                  </div>
                  <span className="text-xs uppercase tracking-widest" style={{ color: tile.accent }}>↗</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            data-cursor
            data-cursor-label="Close"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-void/85 p-6 backdrop-blur-xl"
          >
            <motion.div
              layoutId={`tile-${active.id}`}
              className="relative aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-3xl border border-line-strong"
            >
              <Image
                src={active.img}
                alt={`${active.caption} — ${active.place}`}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-8">
                <p className="font-display text-3xl text-white">{active.caption}</p>
                <p className="mt-1 text-sm text-haze/60">{active.place}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
