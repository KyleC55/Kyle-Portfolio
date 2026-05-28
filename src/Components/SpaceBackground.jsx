import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function MoonScene() {
  const moonRef = useRef();
  const { camera } = useThree();
  const elapsed = useRef(0);

  useFrame((state, delta) => {
    elapsed.current += delta;

    // Camera slowly orbits the moon
    const speed  = 0.07;
    const radius = 6;
    const base = {
      x: Math.sin(elapsed.current * speed) * radius,
      z: Math.cos(elapsed.current * speed) * radius,
      y: Math.sin(elapsed.current * speed * 0.4) * 1.5,
    };

    // Add subtle mouse parallax on top
    const mx = state.pointer.x * 0.4;
    const my = state.pointer.y * 0.4;

    camera.position.set(base.x + mx, base.y + my, base.z);
    camera.lookAt(0, 0, 0);

    // Moon self-rotates slowly
    if (moonRef.current) {
      moonRef.current.rotation.y += delta * 0.04;
      moonRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <>
      {/* Moon */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial
          color="#8b8fa8"
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Subtle atmosphere rim */}
      <mesh>
        <sphereGeometry args={[2.45, 32, 32]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Key light — creates the lit/shadow split */}
      <directionalLight position={[8, 5, 4]} intensity={2.5} color="#e8eeff" />
      {/* Fill light — very dim, keeps dark side not pitch black */}
      <ambientLight intensity={0.05} />
      {/* Purple rim from behind */}
      <pointLight position={[-6, -3, -6]} color="#a855f7" intensity={0.5} distance={18} />

      {/* Star field */}
      <Stars
        radius={120}
        depth={60}
        count={5000}
        factor={3.5}
        saturation={0.1}
        fade
        speed={0.4}
      />
    </>
  );
}

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
        <MoonScene />
      </Canvas>
    </div>
  );
}
