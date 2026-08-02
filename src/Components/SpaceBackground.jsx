import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

// Procedurally paint a realistic lunar surface onto canvases:
// - a color map (albedo): neutral highlands, dark maria, craters, ejecta rays
// - a bump map: craters, rims, and central peaks get real relief under the light
function createMoonTextures() {
  const size = 2048;

  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = colorCanvas.height = size;
  const c = colorCanvas.getContext("2d");

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = bumpCanvas.height = size;
  const b = bumpCanvas.getContext("2d");

  // Base regolith (neutral light gray) / flat bump level (mid-gray = no height)
  c.fillStyle = "#a8a8a4";
  c.fillRect(0, 0, size, size);
  b.fillStyle = "#808080";
  b.fillRect(0, 0, size, size);

  // Large-scale brightness variation (highlands lighter, lowlands darker)
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 120 + Math.random() * 380;
    const g = c.createRadialGradient(x, y, 0, x, y, r);
    const lighten = Math.random() > 0.5;
    const a = 0.04 + Math.random() * 0.06;
    g.addColorStop(0, lighten ? `rgba(200,200,196,${a})` : `rgba(96,96,104,${a})`);
    g.addColorStop(1, "rgba(128,128,128,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, size, size);
  }

  // Dark "maria" — the large basalt plains, distinctly darker gray
  for (let i = 0; i < 14; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 140 + Math.random() * 260;
    const g = c.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(78,78,86,0.5)");
    g.addColorStop(0.7, "rgba(78,78,86,0.32)");
    g.addColorStop(1, "rgba(78,78,86,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, size, size);
  }

  // Fine speckle noise for surface texture
  for (let i = 0; i < 26000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const s = 110 + Math.random() * 110;
    c.fillStyle = `rgba(${s},${s},${s - 4},0.045)`;
    c.fillRect(x, y, 1.5, 1.5);
  }

  // Craters — lots of small, a few large (r^2 distribution favors small)
  const craterCount = 520;
  for (let i = 0; i < craterCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 4 + Math.random() * Math.random() * 90;
    const big = r > 46;

    // Bright ejecta ray system around the largest fresh craters (Tycho-like)
    if (r > 62 && Math.random() > 0.4) {
      const rays = 18 + Math.floor(Math.random() * 20);
      for (let k = 0; k < rays; k++) {
        const ang = Math.random() * Math.PI * 2;
        const len = r * (2.5 + Math.random() * 4);
        const grad = c.createLinearGradient(
          x, y,
          x + Math.cos(ang) * len, y + Math.sin(ang) * len
        );
        grad.addColorStop(0, "rgba(220,220,216,0.14)");
        grad.addColorStop(1, "rgba(220,220,216,0)");
        c.strokeStyle = grad;
        c.lineWidth = 1 + Math.random() * 2.5;
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
        c.stroke();
      }
    }

    // Color: dark floor, bright raised rim
    const cg = c.createRadialGradient(x, y, 0, x, y, r);
    cg.addColorStop(0, "rgba(58,58,66,0.4)");
    cg.addColorStop(0.66, "rgba(86,86,96,0.18)");
    cg.addColorStop(0.85, "rgba(214,214,208,0.3)");
    cg.addColorStop(1, "rgba(214,214,208,0)");
    c.fillStyle = cg;
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fill();

    // Bump: deep floor (dark = low), raised rim (light = high)
    const bg = b.createRadialGradient(x, y, 0, x, y, r);
    bg.addColorStop(0, "rgba(24,24,24,0.94)");
    bg.addColorStop(0.72, "rgba(92,92,92,0.55)");
    bg.addColorStop(0.88, "rgba(240,240,240,0.92)");
    bg.addColorStop(1, "rgba(128,128,128,0)");
    b.fillStyle = bg;
    b.beginPath();
    b.arc(x, y, r, 0, Math.PI * 2);
    b.fill();

    // Central peak in large craters (raised bump + subtle highlight)
    if (big) {
      const pr = r * 0.16;
      const pb = b.createRadialGradient(x, y, 0, x, y, pr);
      pb.addColorStop(0, "rgba(232,232,232,0.85)");
      pb.addColorStop(1, "rgba(128,128,128,0)");
      b.fillStyle = pb;
      b.beginPath();
      b.arc(x, y, pr, 0, Math.PI * 2);
      b.fill();
    }
  }

  const colorTex = new THREE.CanvasTexture(colorCanvas);
  const bumpTex = new THREE.CanvasTexture(bumpCanvas);
  colorTex.anisotropy = 8;
  return { colorTex, bumpTex };
}

function MoonScene() {
  const moonRef = useRef();
  const { camera } = useThree();
  const elapsed = useRef(0);

  const { colorTex, bumpTex } = useMemo(() => createMoonTextures(), []);

  useFrame((state, delta) => {
    elapsed.current += delta;

    // Camera slowly orbits the moon
    const speed = 0.07;
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

    // Moon self-rotates slowly, revealing craters
    if (moonRef.current) {
      moonRef.current.rotation.y += delta * 0.04;
      moonRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <>
      {/* Pure black space */}
      <color attach="background" args={["#000000"]} />

      {/* Moon */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[2.2, 160, 160]} />
        <meshStandardMaterial
          map={colorTex}
          bumpMap={bumpTex}
          bumpScale={1.8}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Sun key light — creates the lit side / terminator / dark side */}
      <directionalLight position={[8, 5, 4]} intensity={2.6} color="#fffaf0" />
      {/* Very dim fill so the dark side isn't pitch black */}
      <ambientLight intensity={0.04} />

      {/* Dense far starfield */}
      <Stars
        radius={140}
        depth={70}
        count={7000}
        factor={3.5}
        saturation={0}
        fade
        speed={0.3}
      />
      {/* Sparse, brighter near stars for depth */}
      <Stars
        radius={80}
        depth={40}
        count={1000}
        factor={6}
        saturation={0}
        fade
        speed={0.5}
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
