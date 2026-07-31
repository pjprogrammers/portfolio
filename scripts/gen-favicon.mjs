import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const C = 48 // viewBox center
const R = 27 // ring radius
const D = 11 // center offset of each ring from viewBox center
const SW = 8.5 // strand stroke width
const GAP_HALF_DEG = 24 // half-arc of the under-strand gap (degrees)

const deg = (a) => (a * Math.PI) / 180
const norm360 = (a) => ((a % 360) + 360) % 360

// Ring centers (SVG, y-down). A=top, B=bottom-left, C=bottom-right.
const centers = {
  A: [C, C - D],
  B: [C - D * Math.cos(deg(30)), C + D * Math.sin(deg(30))],
  C: [C + D * Math.cos(deg(30)), C + D * Math.sin(deg(30))],
}

function circleCircle(x1, y1, r1, x2, y2, r2) {
  const dx = x2 - x1
  const dy = y2 - y1
  const d = Math.hypot(dx, dy)
  if (d > r1 + r2 || d < Math.abs(r1 - r2)) throw new Error('no intersection')
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d)
  const h2 = r1 * r1 - a * a
  const h = Math.sqrt(Math.max(0, h2))
  const mx = x1 + (dx * a) / d
  const my = y1 + (dy * a) / d
  const px = (-dy * h) / d
  const py = (dx * h) / d
  return [
    [mx + px, my + py],
    [mx - px, my - py],
  ]
}

// Interlace: A over B, B over C, C over A.
// The UNDER ring gets a gap at each of the two crossings with its OVER ring.
const over = { A: 'B', B: 'C', C: 'A' } // ring -> ring it passes OVER
const under = { A: 'C', B: 'A', C: 'B' } // ring -> ring it passes UNDER

function ringAngles(ring) {
  const pts = circleCircle(...centers[ring], R, ...centers[under[ring]], R)
  const [cx, cy] = centers[ring]
  return pts.map(([px, py]) => norm360(Math.atan2(py - cy, px - cx) / deg(1)))
}

// Build the dasharray for one ring in pathLength=100 units.
// Returns null when the ring has no gaps (passes over both other rings... never happens).
function dashFor(ring, rotDeg) {
  const L = 2 * Math.PI * R // actual path length (librsvg ignores pathLength, so use px units)
  const len = (deg) => (deg / 360) * L
  const gaps = ringAngles(ring) // angles on THIS ring where it goes UNDER
  const half = GAP_HALF_DEG
  const rel = gaps
    .map((a) => norm360(a - rotDeg)) // degrees along the ring from its rotated start
    .sort((a, b) => a - b)
  if (rel.length === 0) return null
  for (const f of rel) {
    if (f - half < 1 || f + half > 359) {
      throw new Error(`gap too close to path start for ring ${ring} (rot ${rotDeg})`)
    }
  }
  if (rel[1] - rel[0] <= 2 * half) {
    throw new Error(`gaps overlap for ring ${ring}`)
  }
  const [r1, r2] = rel
  const segs = [
    len(r1 - half),
    len(2 * half),
    len(r2 - half) - len(r1 + half),
    len(2 * half),
    L - len(r2 + half),
  ]
  segs.forEach((s) => {
    if (s < 0) throw new Error(`negative dash segment for ring ${ring}`)
  })
  return segs.map((s) => s.toFixed(2)).join(' ')
}

// Rotation for each ring so its gaps never land on the path start (angle 0 point).
const rotations = { A: 200, B: 120, C: 0 }

const rings = {
  A: { color: 'teal', rot: rotations.A, dash: dashFor('A', rotations.A) },
  B: { color: 'amber', rot: rotations.B, dash: dashFor('B', rotations.B) },
  C: { color: 'violet', rot: rotations.C, dash: dashFor('C', rotations.C) },
}

console.log('ring A dash:', rings.A.dash)
console.log('ring C dash:', rings.C.dash)
console.log('ring B dash:', rings.B.dash, '(full)')

function svg(size) {
  const [cxA, cyA] = centers.A
  const [cxB, cyB] = centers.B
  const [cxC, cyC] = centers.C
  const circles = ['B', 'C', 'A']
    .map((name) => {
      const r = rings[name]
      const [cx, cy] = centers[name]
      const rotAttr = r.rot ? ` transform="rotate(${r.rot} ${cx} ${cy})"` : ''
      const dashAttr = r.dash ? ` stroke-dasharray="${r.dash}"` : ''
      return `    <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke-width="${SW}" stroke="url(#g${name})"${dashAttr}${rotAttr}/>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 96 96">
  <defs>
    <linearGradient id="gChip" x1="0" y1="0" x2="0" y2="96" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#0a0e15"/>
      <stop offset="1" stop-color="#12161f"/>
    </linearGradient>
    <radialGradient id="gVignette" cx="0.5" cy="0.42" r="0.9">
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.28"/>
    </radialGradient>
    <linearGradient id="gA" x1="10" y1="22" x2="86" y2="74" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#74f2e2"/>
      <stop offset="0.55" stop-color="#3ec9b9"/>
      <stop offset="1" stop-color="#0e7f73"/>
    </linearGradient>
    <linearGradient id="gB" x1="16" y1="82" x2="80" y2="16" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f4bd88"/>
      <stop offset="0.55" stop-color="#dd8a4c"/>
      <stop offset="1" stop-color="#a55220"/>
    </linearGradient>
    <linearGradient id="gC" x1="84" y1="30" x2="12" y2="66" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#a396f7"/>
      <stop offset="0.55" stop-color="#7d6ae6"/>
      <stop offset="1" stop-color="#4b38b4"/>
    </linearGradient>
  </defs>
  <rect x="3" y="3" width="90" height="90" rx="21" fill="url(#gChip)"/>
  <rect x="3" y="3" width="90" height="90" rx="21" fill="url(#gVignette)"/>
  <rect x="3" y="3" width="90" height="90" rx="21" fill="none" stroke="rgba(237,239,243,0.14)" stroke-width="1.4"/>
  <g>
${circles}
  </g>
</svg>
`
}

// ---- emit icon.svg ----
const iconSvg = svg(96)
writeFileSync(join(root, 'src', 'app', 'icon.svg'), iconSvg, 'utf8')
console.log('wrote src/app/icon.svg')

// ---- rasterize + assemble favicon.ico ----
const sharp = (await import('sharp')).default

async function render(svgStr, size) {
  return sharp(Buffer.from(svgStr)).resize(size, size).png().toBuffer()
}

const sizes = [16, 32, 48]
const pngs = []
for (const s of sizes) pngs.push({ size: s, png: await render(iconSvg, s) })

const n = pngs.length
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(n, 4)

let offset = 6 + 16 * n
const entries = []
for (const { size, png } of pngs) {
  const e = Buffer.alloc(16)
  e.writeUInt8(size >= 256 ? 0 : size, 0)
  e.writeUInt8(size >= 256 ? 0 : size, 1)
  e.writeUInt8(0, 2)
  e.writeUInt8(0, 3)
  e.writeUInt16LE(1, 4)
  e.writeUInt16LE(32, 6)
  e.writeUInt32LE(png.length, 8)
  e.writeUInt32LE(offset, 12)
  entries.push(e)
  offset += png.length
}

const ico = Buffer.concat([header, ...entries, ...pngs.map((p) => p.png)])
writeFileSync(join(root, 'src', 'app', 'favicon.ico'), ico)
console.log(`wrote src/app/favicon.ico (${ico.length} bytes)`)
