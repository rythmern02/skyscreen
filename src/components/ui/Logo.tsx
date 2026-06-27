export function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <span className="relative flex h-6 w-6 items-center justify-center text-fg">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
          <rect x="3" y="6" width="18" height="11" rx="1.5" stroke="currentColor" strokeOpacity="0.9" strokeWidth="1.2" />
          <rect x="6" y="9" width="12" height="5" rx="0.5" fill="#2f7bff" fillOpacity="0.55" />
          <path d="M1 5l4 1M23 5l-4 1M12 17v4M8 21h8" stroke="#6ea8ff" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
        <span className="absolute inset-0 -z-10 rounded-full bg-sky-core/30 blur-md" />
      </span>
      <span className="font-display text-[15px] font-semibold tracking-tight text-fg">
        Sky<span className="text-haze">Screen</span>
      </span>
    </span>
  );
}
