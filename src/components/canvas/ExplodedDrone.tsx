"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { isWebGLAvailable } from "@/lib/webgl";

type PartProps = {
  dir: [number, number, number];
  active: boolean;
  spread: number;
  children: React.ReactNode;
};

const SPREAD = 1.0;

function Part({ dir, active, spread, children }: PartProps) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!ref.current) return;
    target.current.set(
      dir[0] * spread * SPREAD,
      dir[1] * spread * SPREAD,
      dir[2] * spread * SPREAD,
    );
    ref.current.position.lerp(target.current, 0.08);
    const s = active ? 1.18 : 1;
    ref.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
  });

  return <group ref={ref}>{children}</group>;
}

function mat(active: boolean, color: string, accent = "#6ea8ff") {
  return (
    <meshStandardMaterial
      color={color}
      metalness={0.8}
      roughness={0.35}
      emissive={active ? accent : "#000000"}
      emissiveIntensity={active ? 1.6 : 0}
      toneMapped={false}
    />
  );
}

function Rig({ active, explode }: { active: number; explode: number }) {
  const group = useRef<THREE.Group>(null);
  const spread = useRef(0);

  useFrame((state, dt) => {
    spread.current += (explode - spread.current) * 0.06;
    if (group.current) {
      group.current.rotation.y += dt * 0.25;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.12;
    }
  });

  const s = spread.current;

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={group} scale={1.15}>
        {/* 0 frame */}
        <Part dir={[0, 0, 0]} active={active === 0} spread={s}>
          <mesh>
            <boxGeometry args={[1.5, 0.18, 1.5]} />
            {mat(active === 0, "#101216")}
          </mesh>
          {([[1, 1], [-1, 1], [1, -1], [-1, -1]] as const).map(([x, z], i) => (
            <mesh key={i} position={[x * 0.6, 0, z * 0.6]} rotation={[0, Math.atan2(z, x), 0]}>
              <boxGeometry args={[0.9, 0.07, 0.09]} />
              {mat(active === 0, "#0a0b0e")}
            </mesh>
          ))}
        </Part>

        {/* 1 motors */}
        <Part dir={[0, 1.4, 0]} active={active === 1} spread={s}>
          {([[1, 1], [-1, 1], [1, -1], [-1, -1]] as const).map(([x, z], i) => (
            <mesh key={i} position={[x * 0.78, 0, z * 0.78]}>
              <cylinderGeometry args={[0.13, 0.15, 0.22, 16]} />
              {mat(active === 1, "#1b1d22", "#58e0c0")}
            </mesh>
          ))}
        </Part>

        {/* 2 battery */}
        <Part dir={[0, -1.5, 0]} active={active === 2} spread={s}>
          <mesh>
            <boxGeometry args={[0.9, 0.32, 0.5]} />
            {mat(active === 2, "#15171c", "#ff9d4d")}
          </mesh>
        </Part>

        {/* 3 led mesh */}
        <Part dir={[0, 0, 1.7]} active={active === 3} spread={s}>
          <mesh>
            <boxGeometry args={[1.4, 0.8, 0.06]} />
            <meshStandardMaterial
              color="#0a1430"
              emissive="#2f7bff"
              emissiveIntensity={active === 3 ? 2.4 : 1.1}
              toneMapped={false}
            />
          </mesh>
        </Part>

        {/* 4 gps */}
        <Part dir={[0.6, 1.1, -1.2]} active={active === 4} spread={s}>
          <mesh>
            <sphereGeometry args={[0.18, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            {mat(active === 4, "#202329", "#6ea8ff")}
          </mesh>
        </Part>

        {/* 5 flight controller */}
        <Part dir={[1.6, 0.2, 0]} active={active === 5} spread={s}>
          <mesh>
            <boxGeometry args={[0.42, 0.12, 0.42]} />
            {mat(active === 5, "#0d2a1f", "#58e0c0")}
          </mesh>
        </Part>

        {/* 6 wireless streaming antenna */}
        <Part dir={[-1.6, 0.5, 0.3]} active={active === 6} spread={s}>
          <mesh rotation={[0, 0, Math.PI / 7]}>
            <cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />
            {mat(active === 6, "#15171c", "#6ea8ff")}
          </mesh>
          <mesh position={[0.08, 0.4, 0]}>
            <sphereGeometry args={[0.05, 10, 10]} />
            <meshBasicMaterial color="#6ea8ff" toneMapped={false} />
          </mesh>
        </Part>

        {/* 7 stabilization gimbal */}
        <Part dir={[0, -0.6, 1.4]} active={active === 7} spread={s}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.36, 0.04, 12, 32]} />
            {mat(active === 7, "#1b1d22", "#b07bff")}
          </mesh>
        </Part>
      </group>
    </Float>
  );
}

export default function ExplodedDrone({ active, explode }: { active: number; explode: number }) {
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => setSupported(isWebGLAvailable()), []);

  if (supported === false) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative h-40 w-40">
          <div className="absolute inset-6 rounded-xl border border-sky-glow/40 bg-gradient-to-br from-sky-core/40 to-transparent shadow-[0_0_80px_8px_rgba(47,123,255,0.4)]" />
        </div>
      </div>
    );
  }
  if (supported === null) return <div className="h-full w-full" />;

  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      camera={{ position: [3.4, 1.6, 4.6], fov: 40 }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={1.1} color="#cfe0ff" />
      <pointLight position={[-4, -2, 3]} intensity={20} distance={16} color="#2f7bff" />
      <Rig active={active} explode={explode} />
      <EffectComposer enableNormalPass={false}>
        <Bloom intensity={0.9} luminanceThreshold={0.3} mipmapBlur radius={0.7} />
      </EffectComposer>
    </Canvas>
  );
}
