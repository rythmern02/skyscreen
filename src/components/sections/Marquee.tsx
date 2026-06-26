"use client";

const WORDS = [
  "Concerts",
  "Brand Launches",
  "Sports",
  "Weddings",
  "Political Campaigns",
  "Festivals",
  "Live Events",
  "Government",
  "Real Estate",
];

export function Marquee() {
  return (
    <section className="relative border-y border-line bg-ink/60 py-7">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-void to-transparent" />
      <div className="flex overflow-hidden">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1}
            className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center gap-10 pr-10"
          >
            {WORDS.map((w) => (
              <span key={w} className="flex items-center gap-10">
                <span className="font-display text-2xl tracking-tight text-haze/40 sm:text-3xl">
                  {w}
                </span>
                <span className="text-sky-glow/60">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
}
