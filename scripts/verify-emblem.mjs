import sharp from 'sharp'
import { readFileSync } from 'node:fs'

const C = 32
const S = 8 // render scale
const SCALE = 512
const { data } = await sharp(Buffer.from(readFileSync('src/app/icon.svg')))
  .resize(SCALE, SCALE)
  .raw()
  .toBuffer({ resolveWithObject: true })

function px(x, y) {
  const i = (Math.round(y * S) * SCALE + Math.round(x * S)) * 4
  return [data[i], data[i + 1], data[i + 2], data[i + 3]]
}
const lum = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b
const fmt = (p) => `rgba(${p.join(',')})`

let ok = true
const check = (label, cond, detail) => {
  ok &&= cond
  console.log(`${cond ? 'PASS' : 'FAIL'} ${label}${detail ? `  [${detail}]` : ''}`)
}

// 1. Four tips (radius 24 along diagonals after 45° rotation) -> opaque, violet cast.
const tips = [
  [48.97, 15.03],
  [15.03, 15.03],
  [15.03, 48.97],
  [48.97, 48.97],
]
tips.forEach(([x, y], i) => {
  const p = px(x, y)
  const violetish = p[2] > p[0] && p[2] > 30 && p[3] > 150
  check(`tip ${i + 1} @(${x},${y}) opaque violet`, violetish, fmt(p))
})

// 2. Hollow center + interior -> transparent.
check('hole center @(32,32) transparent', px(32, 32)[3] < 45, fmt(px(32, 32)))
check('hole interior @(32,29) transparent', px(32, 29)[3] < 45, fmt(px(32, 29)))

// 3. Arc sweep direction: the top of the hole must stay open.
//    If sweep were wrong the petal would cover (32,25) (inside r<5.8).
check('arc top @(32,25) open', px(32, 25)[3] < 60, fmt(px(32, 25)))

// 4. Notches: just beyond the valleys (radius 14.5 on the axes) -> transparent.
const valleys = [
  [46.5, 32],
  [17.5, 32],
  [32, 46.5],
  [32, 17.5],
]
valleys.forEach(([x, y], i) => {
  check(`notch ${i + 1} @(${x},${y}) open`, px(x, y)[3] < 80, fmt(px(x, y)))
})

// 5. Clear background just beyond the notches (radius 16 on the axes).
const gaps = [
  [48, 32],
  [16, 32],
  [32, 48],
  [32, 16],
]
gaps.forEach(([x, y], i) => {
  check(`gap ${i + 1} @(${x},${y}) transparent bg`, px(x, y)[3] < 40, fmt(px(x, y)))
})

// 6. Petal material near the top axis (just off the shared boundary).
check('petal material @(33,23)', px(33, 23)[3] > 150, fmt(px(33, 23)))

// 7. Opaque bounding box + centroid -> diamond silhouette centered.
let minX = 99, minY = 99, maxX = -1, maxY = -1
let sumX = 0, sumY = 0, nOpaque = 0, nDark = 0, nLavender = 0, nViolet = 0
for (let y = 0; y < 64; y++) {
  for (let x = 0; x < 64; x++) {
    const p = px(x, y)
    if (p[3] > 128) {
      minX = Math.min(minX, x)
      minY = Math.min(minY, y)
      maxX = Math.max(maxX, x)
      maxY = Math.max(maxY, y)
      sumX += x
      sumY += y
      nOpaque++
      if (p[0] < 40 && p[1] < 40 && p[2] < 70) nDark++
      else if (p[0] > 120 && p[2] > 170 && p[1] > p[0] * 0.4) nLavender++
      else if (p[2] > 80 && p[2] > p[0]) nViolet++
    }
  }
}
const cx = sumX / nOpaque
const cy = sumY / nOpaque
console.log(`bbox x:${minX}..${maxX} y:${minY}..${maxY}  centroid (${cx.toFixed(1)},${cy.toFixed(1)})  opaque px:${nOpaque}`)
console.log(`color mix -> dark:${nDark} lavender:${nLavender} violet:${nViolet} (of ${nOpaque})`)
check('silhouette diamond ~13.6..50.4', minX > 10 && maxX < 54 && minY > 10 && maxY < 54, `${minX}..${maxX} ${minY}..${maxY}`)
check('centroid at center', Math.abs(cx - 32) < 2 && Math.abs(cy - 32) < 2, `${cx.toFixed(1)},${cy.toFixed(1)}`)
check('has dark obsidian pixels', nDark > 20, String(nDark))
check('has lavender highlights', nLavender > 20, String(nLavender))
check('has violet body', nViolet > 20, String(nViolet))

// 8. 16px silhouette: tip visible, hole open, contrast present.
const s16 = 16
const d16 = await sharp(Buffer.from(readFileSync('src/app/icon.svg')))
  .resize(s16, s16)
  .raw()
  .toBuffer({ resolveWithObject: true })
const p16 = (x, y) => {
  const i = (Math.round(y) * s16 + Math.round(x)) * 4
  return [d16.data[i], d16.data[i + 1], d16.data[i + 2], d16.data[i + 3]]
}
const tip16 = p16(12.24, 3.76) // radius 24 diagonal tip at 16px
check('16px tip opaque', tip16[3] > 100, fmt(tip16))
check('16px hole open', p16(8, 8)[3] < 110, fmt(p16(8, 8)))

// 9. ASCII silhouette maps for 16px and 32px (visual readout without an image viewer).
function asciiMap(buf, w, alpha) {
  let out = ''
  for (let y = 0; y < w; y++) {
    let row = ''
    for (let x = 0; x < w; x++) {
      const a = buf[(y * w + x) * 4 + 3]
      row += a > alpha ? '#' : a > alpha * 0.5 ? '+' : '.'
    }
    out += row + '\n'
  }
  return out
}
const map16 = await sharp(Buffer.from(readFileSync('src/app/icon.svg')))
  .resize(16, 16)
  .raw()
  .toBuffer()
console.log('--- 16px silhouette (alpha>90) ---')
console.log(asciiMap(map16, 16, 90))
const map32 = await sharp(Buffer.from(readFileSync('src/app/icon.svg')))
  .resize(32, 32)
  .raw()
  .toBuffer()
console.log('--- 32px silhouette (alpha>90) ---')
console.log(asciiMap(map32, 32, 90))

console.log(ok ? 'ALL CHECKS PASSED' : 'CHECKS FAILED')
process.exit(ok ? 0 : 1)
