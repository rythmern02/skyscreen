"use client";

import { NAV_LINKS } from "@/lib/data";
import { Logo } from "@/components/ui/Logo";
import { AnimatedText } from "@/components/ui/Reveal";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "X", href: "https://x.com" },
];

export function Footer() {
  const go = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    (window as unknown as { __lenis?: { scrollTo: (t: string) => void } }).__lenis?.scrollTo(href);
  };

  return (
    <footer className="relative overflow-hidden border-t border-line pt-24">
      <div className="shell">
        <div className="flex flex-col gap-12 pb-16 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-6 text-pretty text-sm leading-relaxed text-haze/60">
              Pioneering the future of aerial advertising — a massive flying LED
              screen that turns the open sky into a living canvas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <nav className="flex flex-col gap-3">
              <span className="eyebrow mb-1">Explore</span>
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  data-cursor
                  onClick={(e) => go(e, l.href)}
                  className="text-sm text-haze/70 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <nav className="flex flex-col gap-3">
              <span className="eyebrow mb-1">Social</span>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="text-sm text-haze/70 transition-colors hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </nav>
            <nav className="flex flex-col gap-3">
              <span className="eyebrow mb-1">Contact</span>
              <a href="mailto:fly@skyscreen.aero" data-cursor className="text-sm text-haze/70 transition-colors hover:text-white">
                fly@skyscreen.aero
              </a>
              <a href="tel:+10000000000" data-cursor className="text-sm text-haze/70 transition-colors hover:text-white">
                +1 (000) 000-0000
              </a>
              <span className="text-sm text-haze/40">Operating worldwide</span>
            </nav>
          </div>
        </div>

        {/* giant wordmark */}
        <div className="relative select-none border-t border-line py-10">
          <h2 className="display-xl whitespace-nowrap text-center text-white/[0.04]">
            <AnimatedText text="SKYSCREEN" stagger={0.02} />
          </h2>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-8 text-xs text-mute sm:flex-row">
          <p>© {new Date().getFullYear()} SkyScreen. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" data-cursor className="transition-colors hover:text-white">Privacy</a>
            <a href="#" data-cursor className="transition-colors hover:text-white">Terms</a>
            <a href="#" data-cursor className="transition-colors hover:text-white">Safety</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
