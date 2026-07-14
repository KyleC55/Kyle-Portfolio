import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { COUNTRY_CENTROIDS } from "@/data/countryCentroids";
import { ui } from "@/theme/ui";

const GLOBE_RADIUS = 2;


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

/* ---------- data hook ---------- */

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
        <meshBasicMaterial color="#a5f3fc" toneMapped={false} />
      </mesh>
      {/* soft, pulsing halo */}
      <mesh ref={haloRef} scale={scale * 2.2}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial
          color="#22d3ee"
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
  const [colorMap, bumpMap] = useLoader(THREE.TextureLoader, [
    "/textures/earth-blue-marble.jpg",
    "/textures/earth-topology.png",
  ]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08;
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
    <group ref={groupRef}>
      {/* textured earth */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 96, 96]} />
        <meshStandardMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.04}
          emissiveMap={colorMap}
          emissive="#88aaff"
          emissiveIntensity={0.18}
          roughness={0.75}
          metalness={0.1}
        />
      </mesh>

      {markers.map((m) => (
        <Marker key={m.code} position={m.pos} scale={m.scale} phase={m.phase} />
      ))}
    </group>
  );
}

/* ---------- legend ---------- */

function Legend({ counts }) {
  const { total, top } = useMemo(() => {
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const sum = entries.reduce((acc, [, n]) => acc + n, 0);
    return { total: sum, top: entries.slice(0, 5) };
  }, [counts]);

  const max = top[0]?.[1] || 1;

  if (total === 0) {
    return (
      <p className="text-gray-400 text-sm">
        No visits recorded yet — check back once the site is live.
      </p>
    );
  }

  return (
    <div className="w-full">
      <div className="flex gap-8 mb-5">
        <div>
          <div className="text-3xl font-bold text-cyan-300 [text-shadow:_0_0_14px_rgba(34,211,238,0.5)]">
            {total.toLocaleString()}
          </div>
          <div className="text-xs uppercase tracking-wider text-gray-400">
            Total visits
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-purple-300 [text-shadow:_0_0_14px_rgba(168,85,247,0.5)]">
            {Object.keys(counts).length}
          </div>
          <div className="text-xs uppercase tracking-wider text-gray-400">
            Countries
          </div>
        </div>
      </div>

      <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">
        Top locations
      </div>
      <ul className="space-y-2">
        {top.map(([code, n]) => (
          <li key={code} className="flex items-center gap-3">
            <span className="text-lg leading-none w-6">{codeToFlag(code)}</span>
            <span className="w-32 truncate text-sm text-gray-200">
              {countryName(code)}
            </span>
            <span className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
                style={{ width: `${Math.max(6, (n / max) * 100)}%` }}
              />
            </span>
            <span className="w-10 text-right text-sm tabular-nums text-gray-300">
              {n.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- section ---------- */

export default function VisitorGlobe() {
  const counts = useVisitorStats();

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 text-white">
      <h2 className={ui.sectionHeading}>Website Visitors</h2>
      <p className={ui.sectionIntro}>
        A live look at where visitors around the world are exploring this site.
      </p>

      <div className="mt-10 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
        <div className="relative h-[420px] md:h-[560px] w-full rounded-2xl overflow-hidden bg-[#0a0a0c] border border-cyan-400/30 shadow-[0_0_32px_rgba(34,211,238,0.14),0_0_48px_rgba(56,189,248,0.12),inset_0_1px_0_rgba(34,211,238,0.08)]">
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 5.2], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 3, 5]} intensity={1.6} color="#e8eeff" />
            <pointLight position={[-6, -2, -4]} color="#a855f7" intensity={0.7} distance={20} />
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

          {/* Loading overlay — fades out once stats resolve. */}
          {counts === null && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex items-center gap-3 rounded-full bg-black/40 px-4 py-2 backdrop-blur-sm">
                <span className="h-3 w-3 rounded-full border-2 border-cyan-400/40 border-t-cyan-300 animate-spin" />
                <span className="text-sm text-gray-300">Loading visitor map…</span>
              </div>
            </div>
          )}
        </div>

        <div className="min-h-[200px] flex items-center">
          {counts ? (
            <Legend counts={counts} />
          ) : (
            <p className="text-gray-400 text-sm">Gathering visitor data…</p>
          )}
        </div>
      </div>
    </div>
  );
}
