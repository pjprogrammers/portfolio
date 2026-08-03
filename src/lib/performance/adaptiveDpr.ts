/** DPR efectivo actual del canvas WebGL principal (null = sin degradar aún). */
let effectiveDpr: number | null = null;

export function setEffectiveDpr(dpr: number) {
  effectiveDpr = dpr;
}

export function getEffectiveDpr() {
  return effectiveDpr;
}
