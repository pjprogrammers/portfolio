"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const DEG2RAD = Math.PI / 180;
const FOV = 60;
const X_FILL = 0.92;
const Y_FILL = 0.9;

type PaletteEntry = { hex: string; weight: number };

const FAR_PALETTE: PaletteEntry[] = [
  { hex: "#eef1f7", weight: 80 },
  { hex: "#b9b0ee", weight: 15 },
  { hex: "#9385e8", weight: 4 },
  { hex: "#a78bfa", weight: 1 },
];

const MID_PALETTE: PaletteEntry[] = [
  { hex: "#eef1f7", weight: 62 },
  { hex: "#b9b0ee", weight: 24 },
  { hex: "#9385e8", weight: 12 },
  { hex: "#a78bfa", weight: 2 },
];

const NEAR_PALETTE: PaletteEntry[] = [
  { hex: "#eef1f7", weight: 48 },
  { hex: "#b9b0ee", weight: 28 },
  { hex: "#9385e8", weight: 17 },
  { hex: "#a78bfa", weight: 7 },
];

type LayerSpec = {
  count: number;
  depth: number;
  speedMin: number;
  speedMax: number;
  sizeMin: number;
  sizeMax: number;
  brightnessMin: number;
  brightnessMax: number;
  pointScale: number;
  palette: PaletteEntry[];
};

const LAYERS: LayerSpec[] = [
  { count: 2400, depth: 340, speedMin: 4, speedMax: 9, sizeMin: 0.6, sizeMax: 1.0, brightnessMin: 0.22, brightnessMax: 0.4, pointScale: 220, palette: FAR_PALETTE },
  { count: 1200, depth: 220, speedMin: 10, speedMax: 17, sizeMin: 0.8, sizeMax: 1.3, brightnessMin: 0.28, brightnessMax: 0.5, pointScale: 220, palette: MID_PALETTE },
  { count: 400, depth: 120, speedMin: 22, speedMax: 36, sizeMin: 1.2, sizeMax: 1.9, brightnessMin: 0.35, brightnessMax: 0.6, pointScale: 180, palette: NEAR_PALETTE },
];

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uDepth;
  uniform float uXScale;
  uniform float uYScale;
  uniform float uPointScale;
  uniform float uPixelRatio;

  attribute float aSeed;
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aBrightness;
  attribute float aSpeed;
  attribute float aStart;
  attribute float aTwinklePhase;
  attribute float aTwinkleSpeed;

  varying vec3 vColor;
  varying float vFade;
  varying float vBrightness;
  varying float vTwinklePhase;
  varying float vTwinkleSpeed;

  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  void main() {
    float travel = aStart + uTime * aSpeed;
    float z = -uDepth + mod(travel, uDepth);
    float cycle = floor(travel / uDepth);
    float r1 = hash(aSeed + cycle * 1.71);
    float r2 = hash(aSeed * 3.29 + cycle * 2.31);
    float theta = r1 * 6.28318530718;
    float radius = sqrt(r2);
    vec2 p = vec2(cos(theta) * radius * uXScale, sin(theta) * radius * uYScale);
    float fadeIn = smoothstep(0.0, 6.0, z + uDepth);
    float fadeOut = smoothstep(0.0, 12.0, -z);
    vFade = fadeIn * fadeOut;
    vColor = aColor;
    vBrightness = aBrightness;
    vTwinklePhase = aTwinklePhase;
    vTwinkleSpeed = aTwinkleSpeed;
    vec3 pos = vec3(p, z);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float dist = max(-mv.z, 0.5);
    gl_PointSize = aSize * uPointScale / dist * uPixelRatio;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform float uTime;

  varying vec3 vColor;
  varying float vFade;
  varying float vBrightness;
  varying float vTwinklePhase;
  varying float vTwinkleSpeed;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = exp(-d * d * 5.0) * vFade * vBrightness;
    alpha *= 0.85 + 0.15 * sin(uTime * vTwinkleSpeed + vTwinklePhase);
    gl_FragColor = vec4(vColor, alpha);
  }
`;

type Layer = {
  geometry: THREE.BufferGeometry;
  material: THREE.ShaderMaterial;
  depth: number;
  pointScale: number;
};

function buildLayer(spec: LayerSpec): Layer {
  const entries = spec.palette.map((p) => ({ color: new THREE.Color(p.hex), weight: p.weight }));
  const totalWeight = entries.reduce((acc, e) => acc + e.weight, 0);

  const position = new Float32Array(spec.count * 3);
  const aSeed = new Float32Array(spec.count);
  const aSize = new Float32Array(spec.count);
  const aColor = new Float32Array(spec.count * 3);
  const aBrightness = new Float32Array(spec.count);
  const aSpeed = new Float32Array(spec.count);
  const aStart = new Float32Array(spec.count);
  const aTwinklePhase = new Float32Array(spec.count);
  const aTwinkleSpeed = new Float32Array(spec.count);

  for (let i = 0; i < spec.count; i++) {
    aSeed[i] = Math.random() * 1000;
    aSize[i] = spec.sizeMin + Math.random() * (spec.sizeMax - spec.sizeMin);
    let roll = Math.random() * totalWeight;
    let color = entries[0].color;
    for (const e of entries) {
      if (roll < e.weight) {
        color = e.color;
        break;
      }
      roll -= e.weight;
    }
    aColor[i * 3] = color.r;
    aColor[i * 3 + 1] = color.g;
    aColor[i * 3 + 2] = color.b;
    aBrightness[i] = spec.brightnessMin + Math.random() * (spec.brightnessMax - spec.brightnessMin);
    aSpeed[i] = spec.speedMin + Math.random() * (spec.speedMax - spec.speedMin);
    aStart[i] = Math.random() * spec.depth;
    aTwinklePhase[i] = Math.random() * Math.PI * 2;
    aTwinkleSpeed[i] = 0.15 + Math.random() * 0.45;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(position, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(aColor, 3));
  geometry.setAttribute("aBrightness", new THREE.BufferAttribute(aBrightness, 1));
  geometry.setAttribute("aSpeed", new THREE.BufferAttribute(aSpeed, 1));
  geometry.setAttribute("aStart", new THREE.BufferAttribute(aStart, 1));
  geometry.setAttribute("aTwinklePhase", new THREE.BufferAttribute(aTwinklePhase, 1));
  geometry.setAttribute("aTwinkleSpeed", new THREE.BufferAttribute(aTwinkleSpeed, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uDepth: { value: spec.depth },
      uXScale: { value: 1 },
      uYScale: { value: 1 },
      uPointScale: { value: spec.pointScale },
      uPixelRatio: { value: 1 },
    },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
  });

  return { geometry, material, depth: spec.depth, pointScale: spec.pointScale };
}

function StarScene({ reduced }: { reduced: boolean }) {
  const { size, gl } = useThree();
  const time = useRef(0);

  const layers = useMemo(() => LAYERS.map(buildLayer), []);

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const half = Math.tan((FOV / 2) * DEG2RAD);
    const pr = gl.getPixelRatio();
    for (const layer of layers) {
      layer.material.uniforms.uXScale.value = half * layer.depth * aspect * X_FILL;
      layer.material.uniforms.uYScale.value = half * layer.depth * Y_FILL;
      layer.material.uniforms.uPixelRatio.value = pr;
    }
  }, [size.width, size.height, gl, layers]);

  useEffect(() => {
    return () => {
      for (const layer of layers) {
        layer.geometry.dispose();
        layer.material.dispose();
      }
    };
  }, [layers]);

  useFrame((_, delta) => {
    if (reduced) return;
    time.current += Math.min(delta, 0.1);
    const pr = gl.getPixelRatio();
    for (const layer of layers) {
      layer.material.uniforms.uTime.value = time.current;
      layer.material.uniforms.uPixelRatio.value = pr;
    }
  });

  return (
    <>
      {layers.map((layer) => (
        <points key={layer.depth} geometry={layer.geometry} material={layer.material} frustumCulled={false} />
      ))}
    </>
  );
}

export default function Starfield({ reduced = false }: { reduced?: boolean }) {
  const motionPreference = useReducedMotion();
  const isReduced = reduced || motionPreference === true;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        flat
        frameloop={isReduced ? "demand" : "always"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 0], fov: FOV, near: 0.1, far: 400 }}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      >
        <StarScene reduced={isReduced} />
      </Canvas>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 42% at 50% 0%, rgba(143,124,240,0.045) 0%, transparent 70%), radial-gradient(120% 95% at 50% 50%, transparent 52%, rgba(9,11,16,0.55) 100%)",
        }}
      />
    </div>
  );
}
