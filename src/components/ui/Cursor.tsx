"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Bespoke cursor: a soft outer ring that trails with easing and a precise
 * inner dot that tracks 1:1. Reacts to [data-cursor] targets - growing into a
 * focus ring and optionally surfacing a label from data-cursor-label.
 * Disabled entirely on touch / coarse pointers.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const state = useRef({ x: 0, y: 0, rx: 0, ry: 0, scale: 1, down: false });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const s = state.current;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      s.x = e.clientX;
      s.y = e.clientY;
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      const wants = !!target;
      s.scale = wants ? (target?.dataset.cursor === "lg" ? 3.4 : 2.4) : 1;
      setLabel(target?.dataset.cursorLabel ?? "");
    };
    const onDown = () => (s.down = true);
    const onUp = () => (s.down = false);

    const tick = () => {
      s.rx += (s.x - s.rx) * 0.16;
      s.ry += (s.y - s.ry) * 0.16;
      const press = s.down ? 0.82 : 1;
      if (ring.current) {
        ring.current.style.transform = `translate(${s.rx}px, ${s.ry}px) translate(-50%, -50%) scale(${s.scale * press})`;
      }
      if (dot.current) {
        dot.current.style.transform = `translate(${s.x}px, ${s.y}px) translate(-50%, -50%) scale(${s.down ? 0.6 : 1})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      <div
        ref={ring}
        className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 backdrop-invert-0 transition-[width,height] duration-300 will-change-transform"
        style={{ mixBlendMode: "difference" }}
      >
        {label ? (
          <span className="select-none text-[8px] font-medium uppercase tracking-[0.2em] text-white">
            {label}
          </span>
        ) : null}
      </div>
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white will-change-transform"
        style={{ mixBlendMode: "difference" }}
      />
    </div>
  );
}
