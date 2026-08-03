"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { registerR3FAdvance } from "@/lib/ticker/r3fAdvance";

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vNoise;

  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main(){
    vNormal = normalize(normalMatrix * normal);
    vec3 pos = position;
    float freq = 1.5;
    float amp = 0.32;
    vec2 mouseInfluence = uMouse * 0.55;
    float n = snoise(vec3(pos.x * freq + mouseInfluence.x, pos.y * freq + mouseInfluence.y, pos.z * freq + uTime * 0.26));
    vNoise = n;
    pos += normal * n * amp;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vNoise;

  void main(){
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.1);
    float hueShift = vNoise * 0.7 + fresnel * 1.3 + uTime * 0.05;
    vec3 colorA = vec3(0.098, 0.906, 0.847);
    vec3 colorB = vec3(0.909, 0.651, 0.447);
    vec3 colorC = vec3(0.42, 0.36, 0.9);
    vec3 grad = mix(colorA, colorB, 0.5 + 0.5 * sin(hueShift));
    grad = mix(grad, colorC, 0.5 + 0.5 * sin(hueShift * 1.7 + 2.0));
    vec3 base = vec3(0.02, 0.03, 0.05);
    vec3 color = mix(base, grad, fresnel * 1.35 + 0.14);
    color += fresnel * 0.22;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function Blob({
  reduced,
  visible,
  scale,
  containerRef,
}: {
  reduced: boolean;
  visible: boolean;
  scale: number;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameSkip = useRef(0);

  useEffect(() => {
    sectionRef.current = containerRef.current?.closest("section") ?? null;
    if (reduced) return;
    const onMove = (clientX: number, clientY: number) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      target.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      target.current.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
    };
    const onPointer = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [reduced, containerRef]);

  useFrame((state) => {
    if (mesh.current) mesh.current.visible = visible;
    if (!visible) return;

    if (reduced) {
      frameSkip.current++;
      if (frameSkip.current % 4 !== 0) return;
    }
    const t = state.clock.getElapsedTime();
    current.current.x += (target.current.x - current.current.x) * 0.04;
    current.current.y += (target.current.y - current.current.y) * 0.04;

    const mat = mesh.current?.material as THREE.ShaderMaterial | undefined;
    if (mat) {
      mat.uniforms.uTime.value = t;
      (mat.uniforms.uMouse.value as THREE.Vector2).set(current.current.x, current.current.y);
    }

    if (mesh.current) {
      mesh.current.rotation.y = t * 0.12 + current.current.x * 0.3;
      mesh.current.rotation.x = current.current.y * 0.2;
    }
  });

  return (
    <group scale={scale}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.55, 5]} />
        <shaderMaterial uniforms={uniforms} vertexShader={VERTEX_SHADER} fragmentShader={FRAGMENT_SHADER} />
      </mesh>
    </group>
  );
}

type Tier = "desktop" | "tablet" | "mobile";

const TIER_CONFIG = {
  desktop: 0.6,
  tablet: 0.7,
  mobile: 0.45,
} as const;

function tierFor(width: number, height: number): Tier {
  const tabletMode = width <= 900 || (width <= 1024 && height > width);
  if (!tabletMode) return "desktop";
  return width <= 600 ? "mobile" : "tablet";
}

export default function HeroBlob({ reduced = false }: { reduced?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [tier, setTier] = useState<Tier>(() =>
    typeof window === "undefined" ? "desktop" : tierFor(window.innerWidth, window.innerHeight)
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => registerR3FAdvance(), []);

  useEffect(() => {
    const update = () => setTier(tierFor(window.innerWidth, window.innerHeight));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 right-0 z-0 h-full w-[56%] opacity-95 max-[900px]:inset-x-0 max-[900px]:w-full max-[900px]:opacity-55 tablet-portrait:inset-x-0 tablet-portrait:w-full tablet-portrait:opacity-55"
    >
      <Canvas
        frameloop="never"
        flat
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.4], fov: 42, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: false }}
      >
        <Blob reduced={reduced} visible={visible} containerRef={containerRef} scale={TIER_CONFIG[tier]} />
      </Canvas>
    </div>
  );
}
