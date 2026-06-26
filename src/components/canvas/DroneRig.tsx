"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Drone } from "./Drone";
import { LedScreen } from "./LedScreen";

/** A taut cable rendered as a thin cylinder oriented from a -> b. */
function Cable({ a, b }: { a: [number, number, number]; b: [number, number, number] }) {
  const { position, quaternion, length } = useMemo(() => {
    const start = new THREE.Vector3(...a);
    const end = new THREE.Vector3(...b);
    const dir = new THREE.Vector3().subVectors(end, start);
    const len = dir.length();
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize(),
    );
    return { position: mid, quaternion: q, length: len };
  }, [a, b]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[0.006, 0.006, length, 6]} />
      <meshStandardMaterial color="#070809" metalness={0.4} roughness={0.7} />
    </mesh>
  );
}

const DRONE_X = [-2.7, -1.35, 0, 1.35, 2.7];
const DRONE_Y = 2.62;
const SCREEN_TOP_Y = 1.85;

export function DroneRig() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!group.current) return;
    // slow cinematic turn of the whole display
    group.current.rotation.y = Math.sin(t * 0.16) * 0.42;
    group.current.rotation.x = Math.sin(t * 0.11) * 0.05;
    group.current.position.y = Math.sin(t * 0.5) * 0.07;
  });

  return (
    <group ref={group}>
      <LedScreen />

      {DRONE_X.map((x, i) => {
        const anchorX = Math.max(-3, Math.min(3, x));
        return (
          <group key={i}>
            <group position={[x, DRONE_Y, 0]}>
              <Drone phase={i * 1.7} />
            </group>
            <Cable a={[x, DRONE_Y - 0.05, 0]} b={[anchorX, SCREEN_TOP_Y, 0]} />
          </group>
        );
      })}

      {/* rig key + rim lights to model the drones */}
      <pointLight position={[0, 3.4, 3]} intensity={18} distance={14} color="#bcd4ff" />
      <pointLight position={[-4, 1, 4]} intensity={10} distance={16} color="#3f6bff" />
    </group>
  );
}
