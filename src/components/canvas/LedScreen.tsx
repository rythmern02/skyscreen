"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const W = 768;
const H = 432;

const TAGLINES = [
  "ADVERTISING HAS LEFT THE GROUND",
  "THE SKY IS THE NEW BILLBOARD",
  "BROADCASTING LIVE · 4K · 500M+",
  "YOUR BRAND. AT ALTITUDE.",
];

/** Draws an animated, ad-like frame onto a 2D canvas. */
function drawAd(ctx: CanvasRenderingContext2D, t: number) {
  ctx.clearRect(0, 0, W, H);

  // base
  ctx.fillStyle = "#05060a";
  ctx.fillRect(0, 0, W, H);

  // moving radial brand glow
  const gx = W * (0.5 + 0.3 * Math.sin(t * 0.5));
  const gy = H * (0.45 + 0.2 * Math.cos(t * 0.4));
  const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, W * 0.7);
  const hue = (t * 12) % 360;
  grad.addColorStop(0, `hsla(${210 + 30 * Math.sin(t * 0.3)}, 90%, 55%, 0.55)`);
  grad.addColorStop(0.5, `hsla(${hue}, 70%, 30%, 0.18)`);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // sweeping highlight bar
  const sweep = ((t * 0.18) % 1) * (W + 300) - 150;
  const sg = ctx.createLinearGradient(sweep - 120, 0, sweep + 120, 0);
  sg.addColorStop(0, "rgba(255,255,255,0)");
  sg.addColorStop(0.5, "rgba(180,210,255,0.10)");
  sg.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sg;
  ctx.fillRect(0, 0, W, H);

  // LIVE badge
  ctx.save();
  ctx.translate(46, 46);
  const blink = 0.5 + 0.5 * Math.sin(t * 6);
  ctx.fillStyle = `rgba(255,60,60,${0.4 + 0.6 * blink})`;
  ctx.beginPath();
  ctx.arc(0, 0, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = "700 26px Inter, Arial, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText("LIVE", 20, 1);
  ctx.restore();

  // wordmark - cool gradient fill so it reads as screen content, not headline
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const wm = ctx.createLinearGradient(W / 2 - 240, 0, W / 2 + 240, 0);
  wm.addColorStop(0, "#cfe0ff");
  wm.addColorStop(0.5, "#7fb0ff");
  wm.addColorStop(1, "#9c8bff");
  ctx.fillStyle = wm;
  ctx.font = "700 86px Sora, Inter, Arial, sans-serif";
  ctx.shadowColor = "rgba(110,168,255,0.9)";
  ctx.shadowBlur = 34;
  ctx.fillText("SKYSCREEN", W / 2, H / 2 - 26);
  ctx.shadowBlur = 0;

  // cycling tagline with fade
  const period = 3.6;
  const idx = Math.floor(t / period) % TAGLINES.length;
  const phase = (t % period) / period;
  const fade = Math.min(1, Math.min(phase, 1 - phase) * 6);
  ctx.globalAlpha = fade;
  ctx.fillStyle = "rgba(184,200,230,0.92)";
  ctx.font = "500 30px Inter, Arial, sans-serif";
  ctx.fillText(TAGLINES[idx], W / 2, H / 2 + 52);
  ctx.globalAlpha = 1;

  // equalizer bars
  const bars = 48;
  const bw = W / bars;
  for (let i = 0; i < bars; i++) {
    const a = 0.5 + 0.5 * Math.sin(t * 4 + i * 0.5) * Math.cos(t * 1.3 + i);
    const bh = 6 + a * 54;
    const x = i * bw + bw * 0.2;
    ctx.fillStyle = `hsla(${205 + i * 1.5}, 90%, ${50 + a * 18}%, ${0.5 + a * 0.5})`;
    ctx.fillRect(x, H - bh - 14, bw * 0.55, bh);
  }

  // thin frame
  ctx.strokeStyle = "rgba(120,160,255,0.25)";
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, W - 16, H - 16);
}

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uMap;
  uniform float uTime;
  void main(){
    vec2 uv = vUv;
    vec3 col = texture2D(uMap, uv).rgb;

    // LED pixel grid - round emitters with dark gaps
    vec2 cells = vec2(200.0, 112.0);
    vec2 g = fract(uv * cells) - 0.5;
    float d = length(g);
    float pix = smoothstep(0.55, 0.12, d);
    col *= mix(0.32, 1.18, pix);

    // fine scanlines
    col *= 0.93 + 0.07 * sin(uv.y * cells.y * 6.2831);

    // panel vignette
    float v = smoothstep(1.25, 0.15, length((uv - 0.5) * vec2(1.5, 1.0)));
    col *= mix(0.72, 1.0, v);

    // emissive boost so bloom catches the brightest emitters
    gl_FragColor = vec4(col * 1.5, 1.0);
  }
`;

export function LedScreen() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { texture, ctx } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const c = canvas.getContext("2d")!;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return { texture: tex, ctx: c };
  }, []);

  const uniforms = useMemo(
    () => ({ uMap: { value: texture }, uTime: { value: 0 } }),
    [texture],
  );

  const last = useRef(0);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // throttle the 2D redraw to ~30fps to save CPU
    if (t - last.current > 1 / 30) {
      drawAd(ctx, t);
      texture.needsUpdate = true;
      last.current = t;
    }
    if (matRef.current) uniforms.uTime.value = t;
  });

  return (
    <group>
      {/* emissive display surface */}
      <mesh>
        <planeGeometry args={[6.4, 3.6]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          toneMapped={false}
        />
      </mesh>
      {/* dark chassis behind the panel */}
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[6.7, 3.9, 0.12]} />
        <meshStandardMaterial color="#0a0b0e" metalness={0.7} roughness={0.45} />
      </mesh>
      {/* glowing bezel frame */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[6.6, 3.8, 0.04]} />
        <meshBasicMaterial color="#2f6bff" toneMapped={false} wireframe />
      </mesh>
      {/* soft back-glow plane */}
      <mesh position={[0, 0, -0.2]}>
        <planeGeometry args={[8.4, 5.2]} />
        <meshBasicMaterial color="#1a3a8a" transparent opacity={0.16} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}
