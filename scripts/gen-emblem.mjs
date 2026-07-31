import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const out = (p) => join(root, 'src', 'app', p)
const previews = join(process.env.TEMP || '/tmp', 'opencode', 'emblem-preview')
mkdirSync(previews, { recursive: true })

const C = 32
const RT = 29
const RV = 9
const RH = 5.8
const V = RV / Math.sqrt(2)
const H = RH / Math.sqrt(2)

const r = (k, x, y) => {
  const dx = x - C
  const dy = y - C
  const s = k % 4
  if (s === 0) return [x, y]
  if (s === 1) return [C - dy, C + dx]
  if (s === 2) return [C - dx, C - dy]
  return [C + dy, C - dx]
}

const num = (n) => {
  const f = Number(n.toFixed(3))
  return Object.is(f, -0) ? '0' : String(f)
}
const pts = (...p) => p.map(([x, y]) => `${num(x)} ${num(y)}`).join(' ')

const petal = {
  VNW: [C - V, C - V],
  VNE: [C + V, C - V],
  T: [C, C - RT],
  P45: [C + H, C - H],
  Pm45: [C - H, C - H],
  c1L: [22.5, 15.5],
  c2L: [27.5, 6.5],
  c1R: [36.5, 6.5],
  c2R: [41.5, 15.5],
  l1: [38.6, 23.8],
  l2: [37.4, 26.0],
  l3: [26.6, 26.0],
  l4: [25.4, 23.8],
  ridgeA: [C, 13],
  ridgeB: [C, 24.5],
}

function petalPath(k) {
  const P = petal
  return [
    `M ${pts(r(k, ...P.VNW))}`,
    `C ${pts(r(k, ...P.c1L))} ${pts(r(k, ...P.c2L))} ${pts(r(k, ...P.T))}`,
    `C ${pts(r(k, ...P.c1R))} ${pts(r(k, ...P.c2R))} ${pts(r(k, ...P.VNE))}`,
    `C ${pts(r(k, ...P.l1))} ${pts(r(k, ...P.l2))} ${pts(r(k, ...P.P45))}`,
    `A ${RH} ${RH} 0 0 0 ${pts(r(k, ...P.Pm45))}`,
    `C ${pts(r(k, ...P.l3))} ${pts(r(k, ...P.l4))} ${pts(r(k, ...P.VNW))} Z`,
  ].join(' ')
}

const petals = [0, 1, 2, 3]
  .map((k) => `    <path d="${petalPath(k)}"/>`)
  .join('\n')

const edgeRight = [0, 1, 2, 3]
  .map(
    (k) =>
      `    <path d="M ${pts(r(k, ...petal.T))} C ${pts(r(k, ...petal.c1R))} ${pts(r(k, ...petal.c2R))} ${pts(r(k, ...petal.VNE))}" stroke="#d8b4fe" stroke-opacity="0.5" stroke-width="1.2" stroke-linecap="round" fill="none"/>`,
  )
  .join('\n')

const edgeLeft = [0, 1, 2, 3]
  .map(
    (k) =>
      `    <path d="M ${pts(r(k, ...petal.VNW))} C ${pts(r(k, ...petal.c1L))} ${pts(r(k, ...petal.c2L))} ${pts(r(k, ...petal.T))}" stroke="#6d28d9" stroke-opacity="0.45" stroke-width="1.2" stroke-linecap="round" fill="none"/>`,
  )
  .join('\n')

const ridge = [0, 1, 2, 3]
  .map(
    (k) =>
      `    <path d="M ${pts(r(k, ...petal.ridgeA))} L ${pts(r(k, ...petal.ridgeB))}" stroke="url(#gRidge)" stroke-width="0.9" stroke-linecap="round" fill="none"/>`,
  )
  .join('\n')

function emblemBody() {
  return `<g transform="rotate(45 ${C} ${C})" fill="url(#gBody)">
${petals}
  <g fill="url(#gGlare)">
${petals}
  </g>
${edgeRight}
${edgeLeft}
${ridge}
  <circle cx="${C}" cy="${C}" r="6.15" fill="none" stroke="url(#gBezel)" stroke-width="1.05"/>
</g>`
}

function defs() {
  return `  <defs>
    <radialGradient id="gAura" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#8b5cf6" stop-opacity="0"/>
      <stop offset="0.4" stop-color="#8b5cf6" stop-opacity="0.05"/>
      <stop offset="0.72" stop-color="#8b5cf6" stop-opacity="0.26"/>
      <stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gBody" gradientUnits="userSpaceOnUse" x1="10" y1="6" x2="54" y2="58">
      <stop offset="0" stop-color="#e9d5ff"/>
      <stop offset="0.16" stop-color="#8b5cf6"/>
      <stop offset="0.38" stop-color="#4c1d95"/>
      <stop offset="0.58" stop-color="#241744"/>
      <stop offset="0.78" stop-color="#100b1e"/>
      <stop offset="1" stop-color="#0d0a18"/>
    </linearGradient>
    <linearGradient id="gGlare" gradientUnits="userSpaceOnUse" x1="32" y1="2" x2="32" y2="62">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="0.45" stop-color="#ffffff" stop-opacity="0.06"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="gRidge" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e9d5ff" stop-opacity="0.95"/>
      <stop offset="0.65" stop-color="#c4b5fd" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="gBezel" gradientUnits="userSpaceOnUse" x1="26" y1="26" x2="38" y2="38">
      <stop offset="0" stop-color="#d8b4fe"/>
      <stop offset="0.45" stop-color="#8b5cf6"/>
      <stop offset="1" stop-color="#4c1d95"/>
    </linearGradient>
  </defs>`
}

function emblemSvg(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
${defs()}
  <circle cx="32" cy="32" r="31" fill="url(#gAura)"/>
${emblemBody()}
</svg>
`
}

const iconSvg = emblemSvg(64)
writeFileSync(out('icon.svg'), iconSvg, 'utf8')
console.log('wrote src/app/icon.svg')

const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="ogBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b0a12"/>
      <stop offset="1" stop-color="#170f2b"/>
    </linearGradient>
    <radialGradient id="ogGlow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#8b5cf6" stop-opacity="0.22"/>
      <stop offset="0.55" stop-color="#8b5cf6" stop-opacity="0.08"/>
      <stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#ogBg)"/>
  <circle cx="600" cy="315" r="330" fill="url(#ogGlow)"/>
  <g transform="translate(600 315) scale(5.9) translate(-32 -32)">
    <circle cx="32" cy="32" r="31" fill="url(#gAura)"/>
${emblemBody()}
  </g>
</svg>
`

const ogSvgFull = ogSvg.replace(
  '</defs>',
  defs().replace(/^\s*<defs>\s*/, '').replace(/\s*<\/defs>\s*$/, '') + '</defs>',
)
writeFileSync(join(previews, 'og.svg'), ogSvgFull, 'utf8')
console.log('wrote preview og.svg')

const sharp = (await import('sharp')).default

async function render(svgStr, size) {
  return sharp(Buffer.from(svgStr)).resize(size, size).png().toBuffer()
}

for (const s of [512, 128, 64, 32, 16]) {
  const buf = await render(iconSvg, s)
  writeFileSync(join(previews, `preview-${s}.png`), buf)
  console.log(`wrote preview-${s}.png`)
}

const appleBuf = await render(iconSvg, 180)
writeFileSync(out('apple-icon.png'), appleBuf)
console.log('wrote src/app/apple-icon.png')

// OG images now come from src/app/opengraph-image.tsx + twitter-image.tsx (next/og) — the
// legacy emblem-only render is kept as a preview for reference.
const ogBuf = await sharp(Buffer.from(ogSvgFull)).resize(1200, 630).png().toBuffer()
writeFileSync(join(previews, 'og-emblem-only.png'), ogBuf)
console.log('wrote preview og-emblem-only.png')

const sizes = [16, 32, 64]
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
writeFileSync(out('favicon.ico'), ico)
console.log(`wrote src/app/favicon.ico (${ico.length} bytes, sizes ${sizes.join('/')})`)
