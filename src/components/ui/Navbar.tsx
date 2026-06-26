"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV_LINKS } from "@/lib/data";
import { MagneticButton } from "./MagneticButton";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o?: object) => void } }).__lenis;
    lenis?.scrollTo(href, { offset: 0, duration: 1.4 });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div
          className={cn(
            "shell flex items-center justify-between rounded-none",
          )}
        >
          <a
            href="#top"
            data-cursor
            onClick={(e) => {
              e.preventDefault();
              go("#top");
            }}
            className="relative z-10"
          >
            <Logo />
          </a>

          <nav
            className={cn(
              "hidden items-center gap-1 rounded-full border px-2 py-2 transition-all duration-500 lg:flex",
              scrolled
                ? "border-line bg-black/40 backdrop-blur-xl"
                : "border-transparent bg-transparent",
            )}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                className="relative rounded-full px-4 py-2 text-sm text-haze/70 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <MagneticButton href="#contact" variant="primary" className="px-6 py-3 text-[13px]">
              Book a Demo
            </MagneticButton>
          </div>

          {/* Mobile trigger */}
          <button
            data-cursor
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-line bg-black/40 backdrop-blur-xl lg:hidden"
          >
            <span
              className={cn(
                "h-px w-4 bg-white transition-all duration-300",
                open && "translate-y-[3px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-4 bg-white transition-all duration-300",
                open && "-translate-y-[3px] -rotate-45",
              )}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-void/95 px-8 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  data-cursor
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl tracking-tight text-white/90"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-10">
              <MagneticButton href="#contact" onClick={() => setOpen(false)}>
                Book a Demo
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
