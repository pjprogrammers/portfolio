"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import { setEffectiveDpr } from "./adaptiveDpr";

/** Notches de resolución permitidos. El canvas baja desde su cap inicial (min(DPR nativo, perfil)). */
export const ADAPTIVE_DPR_STEPS = [2, 1.75, 1.5, 1.25, 1];

/** EMA del frame time: por encima de esto = renderer lento (<53 fps) → degradar. */
const SLOW_EMA_MS = 19;
/** Frames por encima de SLOW_EMA antes de degradar una muesca (~2s). */
const SLOW_FRAMES = 120;
/** EMA por debajo de esto = renderer rápido (>59 fps) → candidato a restaurar. */
const FAST_EMA_MS = 17;
/** Frames por debajo de FAST_EMA antes de restaurar una muesca (~10s). */
const FAST_FRAMES = 600;
/** Separación mínima entre dos cambios de resolución. */
const MIN_CHANGE_GAP_MS = 3000;
/** Cooldown antes de restaurar resolución tras una degradación. */
const RESTORE_COOLDOWN_MS = 180000;
/** Suavizado del EMA (τ ≈ 40 frames ≈ 0.7s). */
const EMA_ALPHA = 1 / 40;

function stepIndexAtOrBelow(dpr: number) {
  for (let i = 0; i < ADAPTIVE_DPR_STEPS.length; i++) {
    if (ADAPTIVE_DPR_STEPS[i] <= dpr + 1e-6) return i;
  }
  return ADAPTIVE_DPR_STEPS.length - 1;
}

/**
 * Degrada la resolución del canvas cuando el renderer no alcanza ~53 fps
 * sostenidos (EMA del frame time) y la restaura cuando mantiene ~59+ fps
 * durante un rato. Colocar DENTRO del <Canvas>. Nunca sube por encima de `capDpr`.
 */
export function useAdaptiveDpr(capDpr: number) {
  const setDpr = useThree((state) => state.setDpr);
  const startIdx = stepIndexAtOrBelow(capDpr);
  const current = useRef(ADAPTIVE_DPR_STEPS[startIdx]);
  const ema = useRef<number | null>(null);
  const slowFrames = useRef(0);
  const fastFrames = useRef(0);
  const lastChangeMs = useRef(0);

  useEffect(() => {
    current.current = ADAPTIVE_DPR_STEPS[startIdx];
    ema.current = null;
    slowFrames.current = 0;
    fastFrames.current = 0;
    setEffectiveDpr(current.current);
  }, [startIdx, setDpr]);

  useFrame((_, delta) => {
    const deltaMs = delta * 1000;
    const nowMs = performance.now();
    ema.current = ema.current === null ? deltaMs : ema.current + EMA_ALPHA * (deltaMs - ema.current);
    const emaMs = ema.current;

    if (emaMs > SLOW_EMA_MS) {
      slowFrames.current += 1;
      fastFrames.current = 0;
      if (
        slowFrames.current >= SLOW_FRAMES &&
        nowMs - lastChangeMs.current > MIN_CHANGE_GAP_MS
      ) {
        const idx = stepIndexAtOrBelow(current.current);
        const next = ADAPTIVE_DPR_STEPS[idx + 1] ?? 1;
        if (next < current.current) {
          current.current = next;
          setDpr(next);
          setEffectiveDpr(next);
          slowFrames.current = 0;
          lastChangeMs.current = nowMs;
        }
      }
      return;
    }

    if (emaMs < FAST_EMA_MS && current.current < ADAPTIVE_DPR_STEPS[startIdx]) {
      fastFrames.current += 1;
      slowFrames.current = 0;
      if (
        fastFrames.current >= FAST_FRAMES &&
        nowMs - lastChangeMs.current > RESTORE_COOLDOWN_MS
      ) {
        const idx = stepIndexAtOrBelow(current.current);
        const next = ADAPTIVE_DPR_STEPS[idx - 1];
        if (next && next > current.current && next <= ADAPTIVE_DPR_STEPS[startIdx]) {
          current.current = next;
          setDpr(next);
          setEffectiveDpr(next);
          fastFrames.current = 0;
          lastChangeMs.current = nowMs;
        }
      }
      return;
    }

    slowFrames.current = 0;
    fastFrames.current = 0;
  });
}
