import sharp from 'sharp'
import { readFileSync } from 'node:fs'

let ok = true
const check = (label, cond, detail = '') => {
  ok &&= cond
  console.log(`${cond ? 'OK  ' : 'FAIL'} ${label}${detail ? ` (${detail})` : ''}`)
}

// ---- 1. favicon.ico: exactly 16/32/48 ----
const ico = readFileSync('src/app/favicon.ico')
const n = ico.readUInt16LE(4)
const sizes = Array.from({ length: n }, (_, i) => ico.readUInt8(6 + 16 * i))
check('favicon.ico has 3 entries [16,32,48]', n === 3 && sizes.join(',') === '16,32,48', `got [${sizes.join(',')}]`)

// ---- 2. icon.svg square + readable ----
const svgMeta = await sharp(Buffer.from(readFileSync('src/app/icon.svg'))).metadata()
check('icon.svg is square', svgMeta.width === svgMeta.height, `${svgMeta.width}x${svgMeta.height}`)

// ---- 3. icon.png 192x192 ----
const pngMeta = await sharp('src/app/icon.png').metadata()
check('icon.png is 192x192', pngMeta.width === 192 && pngMeta.height === 192, `${pngMeta.width}x${pngMeta.height}`)

// ---- 4. apple-icon.png 180x180 ----
const appleMeta = await sharp('src/app/apple-icon.png').metadata()
check('apple-icon.png is 180x180', appleMeta.width === 180 && appleMeta.height === 180, `${appleMeta.width}x${appleMeta.height}`)

// ---- 5. emblem renders: violet blades, dark center hole, transparent corners ----
const SCALE = 8 // 64 viewBox -> 512px
const { data } = await sharp(Buffer.from(readFileSync('src/app/icon.svg')))
  .resize(SCALE * 64, SCALE * 64)
  .raw()
  .toBuffer({ resolveWithObject: true })

function sample(vx, vy) {
  const x = Math.round(vx * SCALE)
  const y = Math.round(vy * SCALE)
  const i = (y * SCALE * 64 + x) * 4
  return [data[i], data[i + 1], data[i + 2], data[i + 3]]
}

const isViolet = ([r, g, b]) => b > r && b > g && b > 60
const isDark = ([r, g, b]) => r < 60 && g < 60 && b < 60
const isClear = ([, , , a]) => a < 8

check('center hole is dark', isDark(sample(32, 32)), sample(32, 32).join(','))
check('top blade is violet', isViolet(sample(32, 10)), sample(32, 10).join(','))
check('left blade is violet', isViolet(sample(10, 32)), sample(10, 32).join(','))
check('corner is transparent', isClear(sample(2, 2)), sample(2, 2).join(','))

console.log(ok ? 'ALL CHECKS PASSED' : 'CHECKS FAILED')
process.exit(ok ? 0 : 1)
