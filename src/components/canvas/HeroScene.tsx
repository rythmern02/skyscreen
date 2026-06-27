"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { SkyBackdrop } from "./SkyBackdrop";
import { DroneRig } from "./DroneRig";
import { SceneFallback } from "./SceneFallback";
import { isWebGLAvailable } from "@/lib/webgl";
import { clamp, lerp } from "@/lib/utils";

function CameraRig({ flyGroup }: { flyGroup: React.RefObject<THREE.Group | null> }) {
  const { camera, pointer } = useThree();
  const px = useRef(0);
  const py = useRef(0);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = typeof window !== "undefined"
      ? clamp(window.scrollY / window.innerHeight)
      : 0;

    // smooth pointer parallax
    px.current = lerp(px.current, pointer.x, 0.05);
    py.current = lerp(py.current, pointer.y, 0.05);

    // slow orbital sway + occasional push-in as the scene scrolls away
    const angle = Math.sin(t * 0.05) * 0.34 + px.current * 0.25;
    const radius = 11.5 - p * 3.2 + Math.sin(t * 0.13) * 0.5;

    const tx = Math.sin(angle) * radius;
    const tz = Math.cos(angle) * radius;
    // sit the camera higher and aim downward so the screen rides the upper
    // frame, leaving the lower-left clear for the headline
    const ty = 1.5 + py.current * 0.5 + p * 1.8;

    camera.position.x = lerp(camera.position.x, tx, 0.05);
    camera.position.y = lerp(camera.position.y, ty, 0.05);
    camera.position.z = lerp(camera.position.z, tz, 0.05);
    camera.lookAt(0, -0.85 + p * 0.5, 0);

    // the rig "flies upward" and fades as we scroll past the hero
    if (flyGroup.current) {
      flyGroup.current.position.y = 0.6 + p * 4.5;
      const s = 1 - p * 0.15;
      flyGroup.current.scale.setScalar(s);
    }
  });

  return null;
}

function Scene({ quality }: { quality: "high" | "low" }) {
  const flyGroup = useRef<THREE.Group>(null);

  return (
    <>
      <fog attach="fog" args={["#05060a", 14, 34]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 8, 5]} intensity={0.4} color="#9db4e8" />

      <SkyBackdrop />
      <group ref={flyGroup}>
        <DroneRig />
      </group>

      <CameraRig flyGroup={flyGroup} />

      <EffectComposer enableNormalPass={false} multisampling={quality === "high" ? 4 : 0}>
        <Bloom
          intensity={quality === "high" ? 1.15 : 0.7}
          luminanceThreshold={0.18}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.8}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0006, 0.0006)}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette eskil={false} offset={0.28} darkness={0.85} />
      </EffectComposer>
    </>
  );
}

export default function HeroScene() {
  const [quality, setQuality] = useState<"high" | "low">("high");
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(isWebGLAvailable());
    const small = window.matchMedia("(max-width: 820px)").matches;
    const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;
    if (small || lowCores) {
      setQuality("low");
      setDpr([1, 1.4]);
    }
  }, []);

  if (supported === false) return <SceneFallback />;
  if (supported === null) return <div className="absolute inset-0 bg-void" />;

  return (
    <Canvas
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: false,
        stencil: false,
      }}
      dpr={dpr}
      camera={{ position: [0, 0.6, 11.5], fov: 42, near: 0.1, far: 100 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <Scene quality={quality} />
    </Canvas>
  );
}
