import Image from "next/image";

/** Cinematic photographic night sky shown when WebGL is unavailable. */
export function SceneFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-void">
      <Image
        src="/images/skyscreen_festival_1782918623917.jpg"
        alt="A live event lit by giant screens at night"
        fill
        priority
        sizes="100vw"
        className="object-cover brightness-[0.45] saturate-[1.1]"
      />
      {/* depth + brand wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_15%,rgba(20,32,64,0.5),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/60" />
      {/* the flying screen */}
      <div className="absolute left-1/2 top-[32%] h-28 w-52 -translate-x-1/2 -translate-y-1/2 rounded-md border border-sky-glow/50 bg-gradient-to-br from-sky-glow/80 to-sky-core/30 shadow-[0_0_120px_12px_rgba(47,123,255,0.5)]" />
    </div>
  );
}
