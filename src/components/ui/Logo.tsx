export function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[4px] bg-black">
        <img src="/images/skyscreen_logo_1782918613387.jpg" alt="SkyScreen Logo" className="h-full w-full object-cover mix-blend-screen" />
      </span>
      <span className="font-display text-[15px] font-semibold tracking-tight text-fg">
        Sky<span className="text-haze">Screen</span>
      </span>
    </span>
  );
}
