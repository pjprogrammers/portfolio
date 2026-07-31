"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float aSize;
  attribute float aRand;
  varying float vFade;
  void main() {
    vec3 p = position;
    float t = uTime * 0.15;
    p.x += sin(t + aRand * 6.28318) * 0.55;
    p.y += cos(t * 1.3 + aRand * 6.28318) * 0.55;
    vec2 d = p.xy - uMouse;
    float dist = length(d);
    float force = smoothstep(3.0, 0.0, dist) * 1.6;
    p.xy += normalize(d + 1e-4) * force;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * (16.0 / -mv.z);
    vFade = smoothstep(26.0, 0.0, dist + 0.4) * (0.55 + 0.45 * sin(aRand * 6.28318 + uTime * 0.6));
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vFade;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.02, d) * vFade;
    vec3 col = mix(uColorA, uColorB, uv.y + 0.5);
    gl_FragColor = vec4(col, alpha);
  }
`;

function ParticleScene({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef(new THREE.Vector2(9999, 9999));

  const geometry = useMemo(() => {
    const count = 12000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const rands = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 44;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
      sizes[i] = 0.6 + Math.random() * 1.8;
      rands[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aRand", new THREE.BufferAttribute(rands, 1));
    return geo;
  }, []);

  const shader = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uColorA: { value: new THREE.Color("#2563eb") },
          uColorB: { value: new THREE.Color("#93c5fd") },
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      shader.dispose();
    };
  }, [geometry, shader]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      mouse.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * 22;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1) * 13;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  useFrame((state, delta) => {
    if (!shader.uniforms) return;
    shader.uniforms.uTime.value += delta;
    const u = shader.uniforms.uMouse.value as THREE.Vector2;
    u.x += (mouse.current.x - u.x) * 0.04;
    u.y += (mouse.current.y - u.y) * 0.04;

    if (group.current && !reduced) {
      const nx = mouse.current.x / 22;
      const ny = mouse.current.y / 13;
      group.current.rotation.y += (nx * 0.06 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (-ny * 0.04 - group.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <points geometry={geometry} material={shader} />
    </group>
  );
}

export default function ParticleField({ reduced = false }: { reduced?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: "radial-gradient(100% 70% at 50% 0%, rgba(30,58,138,0.28) 0%, transparent 65%)" }}
    >
      <Canvas
        frameloop={reduced ? "never" : "always"}
        camera={{ position: [0, 0, 16], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <ParticleScene reduced={reduced} />
      </Canvas>
    </div>
  );
}
