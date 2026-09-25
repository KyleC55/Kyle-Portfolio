import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { TbBroadcast } from "react-icons/tb";
import * as THREE from "three";

import { COUNTRY_CENTROIDS } from "@/data/countryCentroids";
import { ui } from "@/theme/ui";

const GLOBE_RADIUS = 2;

// Fresnel atmosphere glow — brightest at the planet's edge, fading inward.
const ATMOS_VERT = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const ATMOS_FRAG = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.5);
    gl_FragColor = vec4(0.32, 0.58, 1.0, 1.0) * intensity;
  }
`;

/** Soft, drifting cloud cover painted procedurally (no texture file needed). */
function createCloudTexture() {
  const w = 2048;
  const h = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "lighter";

  // Layered soft white blobs at a few scales -> puffy, uneven cloud bands.
  const layers = [
    { count: 90, min: 40, max: 120, alpha: 0.05 },
    { count: 140, min: 20, max: 70, alpha: 0.06 },
    { count: 220, min: 8, max: 34, alpha: 0.07 },
  ];
  for (const L of layers) {
    for (let i = 0; i < L.count; i++) {
      const x = Math.random() * w;
      // bias clouds toward mid-latitudes, thin near the poles
      const y = h * (0.12 + Math.random() * 0.76);
      const r = L.min + Math.random() * (L.max - L.min);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(255,255,255,${L.alpha})`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  return tex;
}


/** Convert lat/lng (degrees) to a point on a sphere of the given radius. */
function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** ISO-2 code -> flag emoji via regional indicator symbols. */
function codeToFlag(code) {
  if (!/^[A-Z]{2}$/.test(code)) return "🏳️";
  return code.replace(/./g, (c) =>
    String.fromCodePoint(127397 + c.charCodeAt(0))
  );
}

const REGION_NAMES =
  typeof Intl !== "undefined" && Intl.DisplayNames
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

function countryName(code) {
  try {
    return REGION_NAMES?.of(code) || code;
  } catch {
    return code;
  }
}

/* ---------- hooks ---------- */

/** True once the element has scrolled near the viewport (stays true after). */
function useInView(margin = "200px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, margin]);

  return [ref, inView];
}

function useVisitorStats() {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    let cancelled = false;

    // Count this visit at most once per browser session.
    try {
      if (!sessionStorage.getItem("vm_tracked")) {
        sessionStorage.setItem("vm_tracked", "1");
        fetch("/api/track", { method: "POST" }).catch(() => {});
      }
    } catch {
      /* sessionStorage may be unavailable (privacy mode) — ignore */
    }

    fetch("/api/stats")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled) setCounts(data?.counts || {});
      })
      .catch(() => {
        // API not reachable (e.g. plain `vite dev`, before deploy) — show empty.
        if (!cancelled) setCounts({});
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return counts;
}

/* ---------- 3D pieces ---------- */

function Marker({ position, scale, phase }) {
  const haloRef = useRef();

  useFrame((state) => {
    if (!haloRef.current) return;
    // Gentle out-of-phase pulse so the busiest spots feel "alive".
    const t = state.clock.elapsedTime * 2 + phase;
    const pulse = 1 + Math.sin(t) * 0.18;
    haloRef.current.scale.setScalar(scale * 2.2 * pulse);
    haloRef.current.material.opacity = 0.18 + (Math.sin(t) + 1) * 0.08;
  });

  return (
    <group position={position}>
      {/* bright core */}
      <mesh scale={scale}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial color="#93c5fd" toneMapped={false} />
      </mesh>
      {/* soft, pulsing halo */}
      <mesh ref={haloRef} scale={scale * 2.2}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial
          color="#0B5ED7"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Globe({ counts }) {
  const groupRef = useRef();
  const cloudRef = useRef();
  const colorMap = useLoader(THREE.TextureLoader, "/textures/earth-blue-marble.jpg");
  const cloudMap = useMemo(() => createCloudTexture(), []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08;
    // Clouds drift a touch faster than the surface for parallax.
    if (cloudRef.current) cloudRef.current.rotation.y += delta * 0.012;
  });

  const markers = useMemo(() => {
    const entries = Object.entries(counts).filter(
      ([code]) => COUNTRY_CENTROIDS[code]
    );
    const max = Math.max(1, ...entries.map(([, n]) => n));
    return entries.map(([code, n], i) => {
      const [lat, lng] = COUNTRY_CENTROIDS[code];
      const pos = latLngToVector3(lat, lng, GLOBE_RADIUS * 1.01);
      // Perceptual (sqrt) scaling between a min and max dot size.
      const scale = 0.6 + 1.6 * Math.sqrt(n / max);
      return { code, pos, scale, phase: i * 1.7 };
    });
  }, [counts]);

  return (
    <>
      {/* Atmospheric glow — a slightly larger shell, brightest at the limb. */}
      <mesh scale={1.16}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <shaderMaterial
          vertexShader={ATMOS_VERT}
          fragmentShader={ATMOS_FRAG}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
        />
      </mesh>

      <group ref={groupRef}>
        {/* textured earth — faint emissive keeps the night side readable */}
        <mesh>
          <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
          <meshStandardMaterial
            map={colorMap}
            emissiveMap={colorMap}
            emissive="#4a6fbf"
            emissiveIntensity={0.07}
            roughness={0.85}
            metalness={0.05}
          />
        </mesh>

        {/* drifting cloud layer */}
        <mesh ref={cloudRef} scale={1.012}>
          <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
          <meshStandardMaterial
            map={cloudMap}
            transparent
            opacity={0.9}
            depthWrite={false}
            roughness={1}
            metalness={0}
          />
        </mesh>

        {markers.map((m) => (
          <Marker key={m.code} position={m.pos} scale={m.scale} phase={m.phase} />
        ))}
      </group>
    </>
  );
}

/* ---------- visitor feed ---------- */

function VisitorFeed({ counts }) {
  const { total, regions, rows } = useMemo(() => {
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const sum = entries.reduce((acc, [, n]) => acc + n, 0);
    return { total: sum, regions: entries.length, rows: entries };
  }, [counts]);

  return (
    <div className="w-full h-full flex flex-col rounded-2xl overflow-hidden bg-[#0a0a0c] border border-blue-400/30 shadow-[0_0_32px_rgba(11,94,215,0.14),0_0_48px_rgba(59,130,246,0.12),inset_0_1px_0_rgba(11,94,215,0.08)] font-secondary">
      {/* header */}
      <div className="px-5 pt-5 pb-3 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TbBroadcast className="text-blue-300 text-xl [filter:drop-shadow(0_0_6px_rgba(11,94,215,0.6))]" />
            <span className="text-xl tracking-[0.25em] text-blue-300 [text-shadow:_0_0_12px_rgba(11,94,215,0.5)]">
              VISITOR FEED
            </span>
          </div>
          <span className="text-lg text-gray-500 tracking-wider">
            {regions} {regions === 1 ? "region" : "regions"}
          </span>
        </div>
      </div>

      {/* column labels */}
      <div className="flex items-center px-5 py-2.5 text-sm tracking-[0.15em] text-gray-500 border-b border-white/5">
        <span className="flex-1">COUNTRY</span>
        <span className="w-20 text-right">TOTAL</span>
      </div>

      {/* rows */}
      {rows.length === 0 ? (
        <div className="flex-1 flex items-center justify-center px-5 py-10 text-center">
          <p className="text-gray-500 text-lg tracking-wide">
            No visits recorded yet —<br />you could be the first.
          </p>
        </div>
      ) : (
        <ul className="flex-1 overflow-y-auto divide-y divide-white/[0.06]">
          {rows.map(([code, n]) => (
            <li
              key={code}
              className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-blue-400/[0.04]"
            >
              <span className="text-xl leading-none w-7 shrink-0">
                {codeToFlag(code)}
              </span>
              <span className="flex-1 min-w-0 truncate text-lg text-gray-100 tracking-wide">
                {countryName(code)}
              </span>
              <span className="w-20 text-right text-lg tabular-nums text-blue-200 [text-shadow:_0_0_8px_rgba(11,94,215,0.35)]">
                {n.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* all-time total */}
      <div className="px-5 py-4 border-t border-white/10 bg-black/30">
        <div className="text-sm tracking-[0.2em] text-indigo-400/80">
          ALL TIME
        </div>
        <div className="mt-0.5 flex items-baseline gap-2">
          <span className="text-4xl leading-none text-indigo-300 [text-shadow:_0_0_16px_rgba(129,140,248,0.55)] tabular-nums">
            {total.toLocaleString()}
          </span>
          <span className="text-lg text-gray-500 tracking-wide">visits</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- section ---------- */

export default function VisitorGlobe() {
  const counts = useVisitorStats();
  const [panelRef, inView] = useInView();

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 text-white">
      <h2 className={ui.sectionHeading}>Website Visitors</h2>
      <p className={ui.sectionIntro}>
        A live look at where visitors around the world are exploring this site.
      </p>

      <div className="mt-10 grid md:grid-cols-[1.4fr_1fr] gap-8 items-stretch">
        <div
          ref={panelRef}
          className="relative h-[420px] md:h-[560px] w-full rounded-2xl overflow-hidden bg-[#0a0a0c] border border-blue-400/30 shadow-[0_0_32px_rgba(11,94,215,0.14),0_0_48px_rgba(59,130,246,0.12),inset_0_1px_0_rgba(11,94,215,0.08)]"
        >
          {/* Mount the WebGL globe only once scrolled near view — keeps the
              texture + GPU work off the initial page load. */}
          {inView && (
            <Canvas
              dpr={[1, 2]}
              camera={{ position: [0, 0, 5.2], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
            >
              {/* Sun — strong key light gives a real day/night terminator */}
              <directionalLight position={[5, 3, 5]} intensity={2.4} color="#fff6e8" />
              {/* Low ambient so the night side reads without washing out shading */}
              <ambientLight intensity={0.14} />
              {/* Cool rim from behind for a subtle atmospheric edge */}
              <pointLight position={[-6, -2, -4]} color="#3b82f6" intensity={0.6} distance={22} />
              {/* Stars for deep-space context */}
              <Stars radius={90} depth={50} count={2500} factor={3} saturation={0} fade speed={0.3} />
              {/* Render the globe right away; markers appear once stats arrive. */}
              <Suspense fallback={null}>
                <Globe counts={counts || {}} />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.5}
              />
            </Canvas>
          )}

          {/* Loading spinner until the globe is mounted and stats resolve. */}
          {(!inView || counts === null) && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex items-center gap-3 rounded-full bg-black/40 px-4 py-2 backdrop-blur-sm">
                <span className="h-3 w-3 rounded-full border-2 border-blue-400/40 border-t-blue-300 animate-spin" />
                <span className="text-sm text-gray-300">Loading visitor map…</span>
              </div>
            </div>
          )}
        </div>

        <div className="h-[420px] md:h-[560px]">
          {counts ? (
            <VisitorFeed counts={counts} />
          ) : (
            <div className="w-full h-full flex items-center justify-center rounded-2xl bg-[#0a0a0c] border border-blue-400/30 font-secondary text-gray-500 text-lg tracking-wide">
              Gathering visitor data…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
