"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ARM = 0.46;
const MOTORS: [number, number][] = [
  [ARM, ARM],
  [-ARM, ARM],
  [ARM, -ARM],
  [-ARM, -ARM],
];

/**
 * A single quad-rotor: dark composite body, four arms with fast-spinning
 * propellers that emit a soft additive glow, plus blinking nav lights.
 */
export function Drone({ phase = 0 }: { phase?: number }) {
  const props = useRef<THREE.Group[]>([]);
  const nav = useRef<THREE.MeshBasicMaterial[]>([]);
  const body = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    for (const p of props.current) if (p) p.rotation.y += 1.2;
    // micro stabilization wobble
    if (body.current) {
      body.current.rotation.z = Math.sin(t * 1.3 + phase) * 0.04;
      body.current.rotation.x = Math.cos(t * 1.1 + phase) * 0.03;
      body.current.position.y = Math.sin(t * 1.6 + phase) * 0.05;
    }
    // nav light blink (green steady-ish, red blinking)
    const blink = 0.3 + 0.7 * Math.abs(Math.sin(t * 3 + phase));
    if (nav.current[0]) nav.current[0].opacity = blink;
    if (nav.current[1]) nav.current[1].opacity = 0.4 + 0.6 * Math.abs(Math.sin(t * 3 + phase + 1.5));
  });

  return (
    <group ref={body}>
      {/* central body */}
      <mesh castShadow>
        <boxGeometry args={[0.34, 0.12, 0.34]} />
        <meshStandardMaterial color="#0c0d10" metalness={0.85} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <boxGeometry args={[0.22, 0.08, 0.24]} />
        <meshStandardMaterial color="#15171c" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* arms + motors + props */}
      {MOTORS.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* arm */}
          <mesh position={[-x * 0.5, 0, -z * 0.5]} rotation={[0, Math.atan2(z, x), 0]}>
            <boxGeometry args={[ARM * 1.42, 0.04, 0.05]} />
            <meshStandardMaterial color="#0a0b0e" metalness={0.7} roughness={0.5} />
          </mesh>
          {/* motor hub */}
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.05, 0.06, 0.08, 12]} />
            <meshStandardMaterial color="#1b1d22" metalness={0.9} roughness={0.3} />
          </mesh>
          {/* spinning prop */}
          <group ref={(el) => { if (el) props.current[i] = el; }} position={[0, 0.07, 0]}>
            <mesh>
              <boxGeometry args={[0.46, 0.008, 0.05]} />
              <meshStandardMaterial color="#2a2d34" metalness={0.4} roughness={0.6} />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[0.46, 0.008, 0.05]} />
              <meshStandardMaterial color="#2a2d34" metalness={0.4} roughness={0.6} />
            </mesh>
          </group>
          {/* soft volumetric prop glow */}
          <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.26, 24]} />
            <meshBasicMaterial
              color="#9cc4ff"
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* nav lights */}
      <mesh position={[0, -0.02, 0.2]}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshBasicMaterial
          ref={(el) => { if (el) nav.current[0] = el; }}
          color="#54ff9a"
          transparent
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, -0.02, -0.2]}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshBasicMaterial
          ref={(el) => { if (el) nav.current[1] = el; }}
          color="#ff4d54"
          transparent
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
