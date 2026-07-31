import sharp from 'sharp'
import { readFileSync } from 'node:fs'

const C = 48, R = 27, D = 11, SW = 8.5
const deg = (a) => (a * Math.PI) / 180
const norm360 = (a) => ((a % 360) + 360) % 360
const centers = {
  A: [C, C - D],
  B: [C - D * Math.cos(deg(30)), C + D * Math.sin(deg(30))],
  C: [C + D * Math.cos(deg(30)), C + D * Math.sin(deg(30))],
}
function circleCircle(x1, y1, r1, x2, y2, r2) {
  const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy)
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d)
  const h = Math.sqrt(Math.max(0, r1 * r1 - a * a))
  const mx = x1 + (dx * a) / d, my = y1 + (dy * a) / d
  const px = (-dy * h) / d, py = (dx * h) / d
  return [[mx + px, my + py], [mx - px, my - py]]
}
const pair = {
  AB: circleCircle(...centers.A, R, ...centers.B, R),
  BC: circleCircle(...centers.B, R, ...centers.C, R),
  CA: circleCircle(...centers.C, R, ...centers.A, R),
}
// Over rings at each crossing pair (paint order B < C < A):
const ringColor = { A: 'teal', B: 'amber', C: 'violet' }
const overColor = { AB: 'teal', BC: 'amber', CA: 'violet' }
const underRing = { AB: 'B', BC: 'C', CA: 'A' }
const overRing = { AB: 'A', BC: 'B', CA: 'C' }

function classify(r, g, b) {
  if (r < 60 && g < 60 && b < 60) return 'dark-bg'
  if (g > r && g > b) return 'teal'
  if (r > g && g > b) return 'amber'
  if (b > r && b > g) return 'violet'
  return '??'
}

// tangent direction of ring X at point P (SVG coords, clockwise path)
function tangent(ring, [px, py]) {
  const [cx, cy] = centers[ring]
  const dx = px - cx, dy = py - cy
  const n = Math.hypot(dx, dy)
  return [-dy / n, dx / n] // perpendicular, clockwise
}

const scale = 8
const SCALE = 768
const { data } = await sharp(Buffer.from(readFileSync('src/app/icon.svg')))
  .resize(SCALE, SCALE)
  .raw()
  .toBuffer({ resolveWithObject: true })

function sample(x, y) {
  const px = Math.round(x * scale)
  const py = Math.round(y * scale)
  const i = (py * SCALE + px) * 4
  return [data[i], data[i + 1], data[i + 2]]
}

let ok = true
for (const [pairName, pts] of Object.entries(pair)) {
  for (const pt of pts) {
    const [px, py] = pt
    const c = classify(...sample(px, py))
    const expected = overColor[pairName]
    const centerOK = c === expected
    ok &&= centerOK
    console.log(`${pairName}@(${px.toFixed(1)},${py.toFixed(1)}) center=${c} expect=${expected} ${centerOK ? 'OK' : 'FAIL'}`)

    // gap probe: walk along the UNDER ring tangent away from the crossing.
    // Just outside the over-strand but inside the under-strand's gap -> dark bg.
    // Beyond the gap edge the under strand resumes.
    const t = tangent(underRing[pairName], pt)
    const overW = SW / Math.sin(deg(45.3)) // over-strand footprint along under tangent
    const probes = [
      [Math.round((overW / 2 + 3) * 10) / 10, 'dark-bg', 'gap'],
      [Math.round((overW / 2 + 7) * 10) / 10, ringColor[underRing[pairName]], 'resumed'],
    ]
    for (const [off, expect, label] of probes) {
      const got = classify(...sample(px + t[0] * off, py + t[1] * off))
      const okP = got === expect
      ok &&= okP
      console.log(`   ${label}@${off}px -> ${got} ${okP ? 'OK' : 'FAIL'}`)
    }
  }
}
console.log(ok ? 'ALL CHECKS PASSED' : 'CHECKS FAILED')
process.exit(ok ? 0 : 1)
