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

// Saturn's real proportions (planet radius = 1 Saturn-radius, "Rs").
const PLANET_R = 3.2;
const RING_INNER = PLANET_R * 1.235; // inner edge of the C ring
const RING_OUTER = PLANET_R * 2.27; // outer edge of the A ring

/** Linear interpolate between color stops sampled by latitude t (0..1). */
function sampleStops(stops, t) {
  for (let i = 0; i < stops.length - 1; i++) {
    const [t0, c0] = stops[i];
    const [t1, c1] = stops[i + 1];
    if (t >= t0 && t <= t1) {
      const f = (t - t0) / (t1 - t0);
      return [
        c0[0] + (c1[0] - c0[0]) * f,
        c0[1] + (c1[1] - c0[1]) * f,
        c0[2] + (c1[2] - c0[2]) * f,
      ];
    }
  }
  return stops[stops.length - 1][1];
}

// Saturn — smooth cream/gold latitude zones and belts with pole darkening.
function createPlanetTexture() {
  const w = 2048;
  const h = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  // Warm Saturnian palette keyed by latitude (top pole -> bottom pole).
  const stops = [
    [0.0, [176, 152, 116]],
    [0.12, [206, 184, 142]],
    [0.22, [232, 216, 178]],
    [0.32, [204, 178, 132]],
    [0.42, [234, 219, 182]],
    [0.5, [224, 206, 166]],
    [0.58, [210, 186, 142]],
    [0.68, [233, 218, 180]],
    [0.78, [202, 176, 132]],
    [0.88, [208, 186, 146]],
    [1.0, [172, 148, 114]],
  ];

  for (let y = 0; y < h; y++) {
    const t = y / h;
    const base = sampleStops(stops, t);
    // Fine banding — layered sine ripples across latitude.
    const band =
      1 +
      0.05 * Math.sin(t * 150) +
      0.03 * Math.sin(t * 320 + 1.3) +
      0.04 * Math.sin(t * 64 + 0.7);
    // Darken toward the poles.
    const pole = 1 - 0.24 * Math.pow(Math.abs(t - 0.5) * 2, 3);
    const k = band * pole;
    const r = Math.max(0, Math.min(255, base[0] * k)) | 0;
    const g = Math.max(0, Math.min(255, base[1] * k)) | 0;
    const b = Math.max(0, Math.min(255, base[2] * k)) | 0;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, y, w, 1);
  }

  // Very soft turbulence streaks so bands aren't perfectly flat.
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const len = 40 + Math.random() * 240;
    const light = Math.random() > 0.5;
    const a = 0.02 + Math.random() * 0.035;
    ctx.fillStyle = light ? `rgba(255,246,224,${a})` : `rgba(120,96,64,${a})`;
    ctx.fillRect(x, y, len, 1 + Math.random() * 1.5);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  return tex;
}

// Saturn's rings — physically-structured C / B / A rings with the Cassini
// Division and Encke Gap, at real radii. RingGeometry maps UVs across a
// square, so concentric circles paint as rings.
function createRingTexture() {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const c = size / 2;

  // Ring opacity/brightness profile as a function of distance in Rs.
  const profile = (rs) => {
    if (rs < 1.235 || rs > 2.27) return { a: 0, tint: 0 };
    // C ring — faint, translucent
    if (rs < 1.525) return { a: 0.22 + 0.1 * Math.sin(rs * 90), tint: -18 };
    // B ring — brightest, densest, with fine ringlets
    if (rs < 1.95) return { a: 0.85 + 0.1 * Math.sin(rs * 160), tint: 12 };
    // Cassini Division — near-empty gap
    if (rs < 2.025) return { a: 0.05, tint: -30 };
    // A ring — medium brightness
    if (rs < 2.27) {
      // Encke Gap
      if (rs > 2.208 && rs < 2.222) return { a: 0.04, tint: -30 };
      return { a: 0.5 + 0.08 * Math.sin(rs * 200), tint: -4 };
    }
    return { a: 0, tint: 0 };
  };

  for (let r = 0; r <= c; r++) {
    const m = (r / c) * RING_OUTER; // model-space radius
    const rs = m / PLANET_R; // in Saturn radii
    const p = profile(rs);
    if (p.a <= 0) continue;
    const alpha = Math.max(0, Math.min(0.98, p.a)) * (0.85 + Math.random() * 0.15);
    const base = 206 + p.tint + Math.floor((Math.random() - 0.5) * 16);
    const rr = Math.max(0, Math.min(255, base + 6));
    const gg = Math.max(0, Math.min(255, base - 4));
    const bb = Math.max(0, Math.min(255, base - 26));
    ctx.strokeStyle = `rgba(${rr},${gg},${bb},${alpha})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(c, c, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  return tex;
}

function MoonScene() {
  const planetRef = useRef();
  const moonRef = useRef();
  const orbitRef = useRef();
  const sunRef = useRef();
  const { camera } = useThree();
  const elapsed = useRef(0);

  const { colorTex, bumpTex } = useMemo(() => createMoonTextures(), []);
  const planetTex = useMemo(() => createPlanetTexture(), []);
  const ringTex = useMemo(() => createRingTexture(), []);

  useFrame((state, delta) => {
    elapsed.current += delta;

    // Camera slowly orbits the whole system, framing the planet
    const speed = 0.05;
    const radius = 13;
    const mx = state.pointer.x * 0.7;
    const my = state.pointer.y * 0.7;
    camera.position.set(
      Math.sin(elapsed.current * speed) * radius + mx,
      2.6 + my,
      Math.cos(elapsed.current * speed) * radius
    );
    camera.lookAt(0, 0, 0);

    // Keep the sun on the viewer's side (up and to the right of the camera)
    // so the hemisphere we see stays lit, while the limb still falls into a
    // soft terminator — bright, but still a real 3D shaded look.
    if (sunRef.current) {
      sunRef.current.position.set(
        camera.position.x + 7,
        camera.position.y + 9,
        camera.position.z + 6
      );
    }

    // Planet spins on its axis
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.03;
    // Moon revolves around the planet
    if (orbitRef.current) orbitRef.current.rotation.y += delta * 0.28;
    // Moon self-rotates, revealing craters
    if (moonRef.current) moonRef.current.rotation.y += delta * 0.06;
  });

  return (
    <>
      {/* Pure black space */}
      <color attach="background" args={["#000000"]} />

      {/* Saturn system, leaned to its ~26.7° axial tilt. Planet, rings and
          moon all share the equatorial plane. */}
      <group rotation={[0.12, 0, 0.466]}>
        {/* Planet */}
        <mesh ref={planetRef}>
          <sphereGeometry args={[PLANET_R, 128, 128]} />
          <meshStandardMaterial map={planetTex} roughness={1} metalness={0} />
        </mesh>

        {/* Rings, flat in the equatorial plane */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[RING_INNER, RING_OUTER, 220]} />
          <meshBasicMaterial
            map={ringTex}
            transparent
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* Moon revolving in the ring plane, outside the rings */}
        <group ref={orbitRef}>
          <group position={[9, 0, 0]}>
            <mesh ref={moonRef}>
              <sphereGeometry args={[0.8, 128, 128]} />
              <meshStandardMaterial
                map={colorTex}
                bumpMap={bumpTex}
                bumpScale={0.6}
                roughness={1}
                metalness={0}
              />
            </mesh>
          </group>
        </group>
      </group>

      {/* Sun key light — repositioned each frame to the viewer's side so the
          face we see stays lit while the limb keeps a soft terminator */}
      <directionalLight ref={sunRef} position={[10, 9, 6]} intensity={3.2} color="#fff4e2" />
      {/* Soft fill so shadow sides read as dim, not pure black */}
      <ambientLight intensity={0.3} />
      {/* Cool sky / warm bounce fill for gentle, natural shaping */}
      <hemisphereLight args={["#8899bb", "#2a2418", 0.35]} />

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
      <Canvas camera={{ position: [0, 2.6, 13], fov: 55 }}>
        <MoonScene />
      </Canvas>
    </div>
  );
}
