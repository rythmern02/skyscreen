export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const clamp = (v: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const mapRange = (
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin);

/** Frame-rate independent damping factor for lerp inside useFrame. */
export const damp = (lambda: number, dt: number) => 1 - Math.exp(-lambda * dt);
