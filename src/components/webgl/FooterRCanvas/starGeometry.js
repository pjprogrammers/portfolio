// starGeometry.js
// ─────────────────────────────────────────────────────────────
// Chispa de 4 pétalos (sparkle) trazada 1-a-1 desde src/app/icon.svg.
// 160 verts / 144 tris (4 pétalos × 20 puntos × frente/atrás).
//
// El icono es una chispa de 4 pétalos rotada 45°: cada pétalo es un bezier
// cúbico con dos esquinas base (radio 9 en el viewBox 64), una punta
// (radio 29) y un borde interior cóncavo que abraza el círculo central de
// radio 5.8. El pétalo superior del SVG (path) se muestra aquí tal cual:
//   M 25.636 25.636 C 22.5 15.5 27.5 6.5 32 3 C 36.5 6.5 41.5 15.5 38.364
//   25.636 C 38.6 23.8 37.4 26 36.101 27.899 A 5.8 5.8 0 0 0 27.899 27.899
//   C 26.6 26 25.4 23.8 25.636 25.636 Z
// Los otros 3 pétalos son rotaciones de 90° de este path alrededor del centro.
//
// Aquí se reescala para que el bounding box (±2.55) coincida con el de la estrella
// anterior (ver PARTICLE_SHAPE_SCALE en footerRConfig.js), se aplica la rotación de
// 45° del grupo del icono (puntas en 45/135/225/315) y se deja el núcleo hueco del
// círculo central como en el icono.
//
// Extents: X/Y[-2.55, 2.55] Z[-0.37, 0.37]
// ─────────────────────────────────────────────────────────────

// Puntas en las diagonales → radio de punta 2.55·√2 ≈ 3.606 para que el bounding
// box (±2.55) coincida con el footprint de la estrella anterior (PARTICLE_SHAPE_SCALE).
const TIP_RADIUS = 2.55 * Math.SQRT2;
const ICON_TIP_RADIUS = 29;
const ICON_SCALE = TIP_RADIUS / ICON_TIP_RADIUS;
const Z_FRONT = 0.37;
const Z_BACK = -0.37;
const EDGE_SAMPLES = 4;
const INNER_CURVE_SAMPLES = 2;
const ARC_RADIUS = 5.8;
const COS45 = Math.SQRT1_2;
const SIN45 = Math.SQRT1_2;

function cubicPoint(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y, t) {
  const it = 1 - t;
  const a = it * it * it;
  const b = 3 * it * it * t;
  const c = 3 * it * t * t;
  const d = t * t * t;
  return {
    x: a * p0x + b * p1x + c * p2x + d * p3x,
    y: a * p0y + b * p1y + c * p2y + d * p3y,
  };
}

// Pétalo superior de icon.svg en coordenadas del grupo (y abajo, viewBox 64).
// Contorno en orden: base-izquierda → borde izquierdo → punta → borde derecho →
// base-derecha → curva interior → arco del círculo central → curva interior.
function buildPetalPolygon() {
  const pts = [];
  const push = (x, y) => pts.push({ x, y });

  push(25.636, 25.636);

  for (let k = 1; k <= EDGE_SAMPLES; k++) {
    const t = k / (EDGE_SAMPLES + 1);
    const p = cubicPoint(25.636, 25.636, 22.5, 15.5, 27.5, 6.5, 32, 3, t);
    push(p.x, p.y);
  }

  push(32, 3);

  for (let k = 1; k <= EDGE_SAMPLES; k++) {
    const t = k / (EDGE_SAMPLES + 1);
    const p = cubicPoint(32, 3, 36.5, 6.5, 41.5, 15.5, 38.364, 25.636, t);
    push(p.x, p.y);
  }

  push(38.364, 25.636);

  for (let k = 1; k <= INNER_CURVE_SAMPLES; k++) {
    const t = k / (INNER_CURVE_SAMPLES + 1);
    const p = cubicPoint(38.364, 25.636, 38.6, 23.8, 37.4, 26, 36.101, 27.899, t);
    push(p.x, p.y);
  }

  // Arco del círculo central: solo ángulos interiores. Los extremos 45°/135° ya los
  // aportan los endpoints exactos de los beziers interiores (36.101,27.899) y
  // (27.899,27.899), que son justo las uniones del path del icono.
  for (const deg of [60, 75, 90, 105, 120]) {
    const a = (deg * Math.PI) / 180;
    push(32 + ARC_RADIUS * Math.cos(a), 32 - ARC_RADIUS * Math.sin(a));
  }

  for (let k = 1; k <= INNER_CURVE_SAMPLES; k++) {
    const t = k / (INNER_CURVE_SAMPLES + 1);
    const p = cubicPoint(27.899, 27.899, 26.6, 26, 25.4, 23.8, 25.636, 25.636, t);
    push(p.x, p.y);
  }

  // Los extremos del bezier interior coinciden con los extremos del arco y con el
  // punto base inicial (cierre del contorno): eliminar duplicados consecutivos para
  // no crear aristas de longitud 0 que rompen el ear-clipping.
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const q = pts[(i + 1) % pts.length];
    if (Math.abs(p.x - q.x) > 1e-9 || Math.abs(p.y - q.y) > 1e-9) out.push(p);
  }
  return out;
}

function polygonSignedArea(pts) {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    s += a.x * b.y - b.x * a.y;
  }
  return s / 2;
}

function pointStrictlyInside(px, py, ax, ay, bx, by, cx, cy) {
  const d1 = (px - bx) * (ay - by) - (ax - bx) * (py - by);
  const d2 = (px - cx) * (by - cy) - (bx - cx) * (py - cy);
  const d3 = (px - ax) * (cy - ay) - (cx - ax) * (py - ay);
  return (d1 > 0 && d2 > 0 && d3 > 0) || (d1 < 0 && d2 < 0 && d3 < 0);
}

// Ear-clipping para un polígono simple; devuelve índices en tercias (a,b,c).
function triangulate(pts) {
  const V = pts.map((_, i) => i);
  if (polygonSignedArea(pts) < 0) V.reverse();

  const out = [];
  let guard = 0;

  while (V.length > 3) {
    if (++guard > pts.length * pts.length) return null;

    let ear = -1;
    for (let i = 0; i < V.length; i++) {
      const a = V[i];
      const b = V[(i + 1) % V.length];
      const c = V[(i + 2) % V.length];
      const cross =
        (pts[b].x - pts[a].x) * (pts[c].y - pts[a].y) -
        (pts[b].y - pts[a].y) * (pts[c].x - pts[a].x);

      if (cross <= 1e-9) continue;

      let blocked = false;
      for (const q of V) {
        if (q === a || q === b || q === c) continue;
        if (
          pointStrictlyInside(
            pts[q].x,
            pts[q].y,
            pts[a].x,
            pts[a].y,
            pts[b].x,
            pts[b].y,
            pts[c].x,
            pts[c].y,
          )
        ) {
          blocked = true;
          break;
        }
      }

      if (!blocked) {
        ear = i;
        break;
      }
    }

    if (ear < 0) return null;

    const i = ear;
    const a = V[i];
    const b = V[(i + 1) % V.length];
    const c = V[(i + 2) % V.length];
    out.push(a, b, c);
    V.splice((i + 1) % V.length, 1);
  }

  out.push(V[0], V[1], V[2]);
  return out;
}

// Rotación de 90° CW (coordenadas SVG, y abajo) alrededor del centro (32,32).
// Es la transformación exacta entre los 4 paths del icono.
function rotateScreenCW90(p) {
  return { x: 64 - p.y, y: p.x };
}

function buildSparkleGeometry() {
  const petal = buildPetalPolygon();
  const petalTris = triangulate(petal);

  if (!petalTris) {
    throw new Error("starGeometry: fallo de triangulación del pétalo");
  }

  const positions = [];
  const indices = [];

  for (let k = 0; k < 4; k++) {
    const base = positions.length / 3;
    const frontBase = base;
    const backBase = base + petal.length;

    for (let f = 0; f < 2; f++) {
      const z = f === 0 ? Z_FRONT : Z_BACK;
      for (const p of petal) {
        let q = p;
        for (let r = 0; r < k; r++) q = rotateScreenCW90(q);
        const rx = q.x - 32;
        const ry = q.y - 32;
        const x = (rx * COS45 - ry * SIN45) * ICON_SCALE;
        const y = (rx * SIN45 + ry * COS45) * ICON_SCALE;
        positions.push(x, y, z);
      }
    }

    for (let i = 0; i < petalTris.length; i += 3) {
      const a = petalTris[i];
      const b = petalTris[i + 1];
      const c = petalTris[i + 2];
      indices.push(frontBase + a, frontBase + b, frontBase + c);
      indices.push(backBase + c, backBase + b, backBase + a);
    }
  }

  return {
    positions: new Float32Array(positions),
    indices: new Uint16Array(indices),
  };
}

const sparkle = buildSparkleGeometry();

export const STAR_POSITIONS = sparkle.positions;
export const STAR_INDICES = sparkle.indices;
