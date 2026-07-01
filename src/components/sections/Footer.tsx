"use client";

import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-12">
      <div className="shell flex flex-col items-center justify-between gap-8 pb-8 md:flex-row md:gap-0">
        <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-haze/40">
          <span>© {new Date().getFullYear()} SkyScreen</span>
          <span>·</span>
          <span>All Rights Reserved</span>
        </div>

        <div className="flex flex-wrap justify-center gap-3 text-[10px] uppercase tracking-[0.15em] text-haze/60">
          <a 
            href="mailto:rajeevkalra1000@gmail.com" 
            data-cursor 
            className="rounded-full border border-white/10 px-6 py-2.5 transition-colors hover:bg-white hover:text-black"
          >
            rajeevkalra1000@gmail.com
          </a>
          <a 
            href="tel:6261076025" 
            data-cursor 
            className="rounded-full border border-white/10 px-6 py-2.5 transition-colors hover:bg-white hover:text-black"
          >
            6261076025
          </a>
          <a 
            href="https://instagram.com/sky_screen_26" 
            target="_blank" 
            rel="noreferrer" 
            data-cursor 
            className="rounded-full border border-white/10 px-6 py-2.5 transition-colors hover:bg-white hover:text-black"
          >
            @sky_screen_26
          </a>
        </div>
      </div>

      {/* giant wordmark - scalable SVG to guarantee full width */}
      <div className="relative w-full select-none overflow-hidden border-t border-line pt-6">
        <svg viewBox="0 0 1000 200" className="h-auto w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#050505" stopOpacity="1" />
            </linearGradient>
          </defs>
          <text 
            x="50%" 
            y="70%" 
            dominantBaseline="middle"
            textAnchor="middle" 
            fill="url(#skyGradient)" 
            className="font-sans font-thin" 
            fontSize="180" 
            letterSpacing="-3"
          >
            SKYSCREEN
          </text>
        </svg>
      </div>
    </footer>
  );
}
