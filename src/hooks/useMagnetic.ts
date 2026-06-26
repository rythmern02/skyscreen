"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Magnetic pull: the element (and an optional inner child) eases toward the
 * pointer while hovered, then springs back on leave. Uses gsap.quickTo for
 * buttery, interruptible motion.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.4) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const inner = el.querySelector<HTMLElement>("[data-magnetic-inner]");
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "expo.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "expo.out" });
    const ixTo = inner && gsap.quickTo(inner, "x", { duration: 0.7, ease: "expo.out" });
    const iyTo = inner && gsap.quickTo(inner, "y", { duration: 0.7, ease: "expo.out" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      ixTo?.(dx * strength * 0.5);
      iyTo?.(dy * strength * 0.5);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
      ixTo?.(0);
      iyTo?.(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return ref;
}
