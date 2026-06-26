"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { NOISE } from "@/lib/glsl";

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
  uniform float uTime;
  uniform vec2 uMouse;
  ${NOISE}

  void main(){
    vec2 uv = vUv;
    // gentle parallax from pointer
    uv += uMouse * 0.012;

    // ---- vertical gradient: deep void -> faint blue horizon ----
    vec3 top = vec3(0.012, 0.014, 0.022);
    vec3 mid = vec3(0.02, 0.03, 0.05);
    vec3 horizon = vec3(0.05, 0.08, 0.14);
    vec3 col = mix(top, mid, smoothstep(1.0, 0.35, uv.y));
    col = mix(col, horizon, smoothstep(0.42, 0.0, uv.y));

    // ---- drifting cloud banks ----
    vec2 cp = uv * vec2(3.2, 2.0);
    cp.x += uTime * 0.012;
    float clouds = fbm(cp + fbm(cp * 0.6 + uTime * 0.02));
    clouds = smoothstep(0.45, 1.05, clouds);
    // clouds sit lower in the sky and catch a cool underlight
    float band = smoothstep(0.95, 0.15, uv.y);
    vec3 cloudCol = mix(vec3(0.06, 0.08, 0.12), vec3(0.16, 0.22, 0.34), uv.y);
    col = mix(col, cloudCol, clouds * band * 0.55);

    // ---- distant moon glow upper-right ----
    float moon = smoothstep(0.34, 0.0, distance(uv, vec2(0.78, 0.82)));
    col += vec3(0.10, 0.13, 0.2) * moon * 0.5;

    // ---- stars (only where clouds are thin) ----
    vec2 sp = uv * vec2(420.0, 260.0);
    float star = hash21(floor(sp));
    float tw = 0.5 + 0.5 * sin(uTime * 2.0 + star * 90.0);
    float starMask = step(0.992, star) * (1.0 - clouds) * smoothstep(0.1, 0.6, uv.y);
    col += vec3(0.8, 0.86, 1.0) * starMask * tw;

    // ---- horizon city glow + far lights ----
    float cityBand = smoothstep(0.14, 0.0, uv.y);
    col += mix(vec3(0.18, 0.12, 0.08), vec3(0.1, 0.14, 0.22), uv.x) * cityBand * 0.6;
    // scattered far city lights
    vec2 lp = vec2(uv.x * 180.0, uv.y * 60.0);
    float lights = hash21(floor(lp));
    float lightMask = step(0.975, lights) * smoothstep(0.13, 0.0, uv.y);
    float flick = 0.7 + 0.3 * sin(uTime * 6.0 + lights * 120.0);
    col += vec3(1.0, 0.7, 0.4) * lightMask * flick * 0.9;

    // subtle atmospheric vignette
    float vig = smoothstep(1.25, 0.25, length((uv - 0.5) * vec2(1.1, 1.3)));
    col *= mix(0.55, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function SkyBackdrop() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useFrame((state, dt) => {
    if (!matRef.current) return;
    uniforms.uTime.value += dt;
    uniforms.uMouse.value.x += (state.pointer.x - uniforms.uMouse.value.x) * 0.04;
    uniforms.uMouse.value.y += (state.pointer.y - uniforms.uMouse.value.y) * 0.04;
  });

  return (
    <mesh position={[0, 0, -42]} scale={[180, 110, 1]} renderOrder={-1}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
      />
    </mesh>
  );
}
