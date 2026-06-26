"use client";

import { useEffect, useRef, useState } from "react";
import { INDUSTRIES } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

const COUNT = INDUSTRIES.length;
const STEP = 360 / COUNT;
const FACE_W = 300;
const RADIUS = Math.round(FACE_W / 2 / Math.tan((STEP / 2) * (Math.PI / 180)));

export function Industries() {
  const stage = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const velocity = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const [front, setFront] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (!dragging.current) {
        velocity.current += (-0.12 - velocity.current) * 0.02; // ease toward gentle auto-spin
      }
      angle.current += velocity.current;
      if (stage.current) {
        stage.current.style.transform = `translateZ(-${RADIUS}px) rotateY(${angle.current}deg)`;
      }
      const idx = ((Math.round(-angle.current / STEP) % COUNT) + COUNT) % COUNT;
      setFront(idx);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    velocity.current = dx * 0.35;
    angle.current += dx * 0.35;
  };
  const onUp = () => {
    dragging.current = false;
  };

  const rotateTo = (i: number) => {
    const current = angle.current;
    const target = -i * STEP;
    // shortest path
    const diff = ((target - current + 180 + 3600) % 360) - 180;
    velocity.current = diff * 0.06;
  };

  return (
    <section id="industries" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-core/[0.08] blur-[150px]" />
      <div className="shell relative">
        <SectionHeader
          index="06"
          eyebrow="Industries"
          title="Built for everyone who needs the world to look up."
          align="center"
        />

        <div
          className="relative mt-20 flex h-[360px] items-center justify-center [perspective:1200px] select-none"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          data-cursor="lg"
          data-cursor-label="Drag"
        >
          <div
            ref={stage}
            className="relative h-[200px] w-[300px] [transform-style:preserve-3d]"
            style={{ transform: `translateZ(-${RADIUS}px)` }}
          >
            {INDUSTRIES.map((ind, i) => {
              const isFront = i === front;
              return (
                <div
                  key={ind.id}
                  className="absolute left-0 top-0 flex h-[200px] w-[300px] flex-col justify-end rounded-2xl border p-7 transition-[opacity,border-color,background] duration-500"
                  style={{
                    transform: `rotateY(${i * STEP}deg) translateZ(${RADIUS}px)`,
                    borderColor: isFront ? "rgba(110,168,255,0.5)" : "rgba(255,255,255,0.08)",
                    background: isFront
                      ? "linear-gradient(160deg, rgba(47,123,255,0.16), rgba(255,255,255,0.02))"
                      : "rgba(9,9,9,0.6)",
                    opacity: isFront ? 1 : 0.5,
                    backdropFilter: "blur(12px)",
                    boxShadow: isFront ? "0 30px 80px -30px rgba(47,123,255,0.6)" : "none",
                  }}
                >
                  <span className="font-display text-xs text-sky-glow/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-2xl tracking-tight text-white">{ind.name}</h3>
                  <p className="mt-2 text-sm text-haze/70">{ind.line}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* dots */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {INDUSTRIES.map((ind, i) => (
            <button
              key={ind.id}
              data-cursor
              onClick={() => rotateTo(i)}
              aria-label={ind.name}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === front ? 28 : 8,
                background: i === front ? "#6ea8ff" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
