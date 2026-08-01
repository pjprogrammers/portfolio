import { writeFileSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const appDir = join(root, 'src', 'app')

// Source of truth is the existing emblem icon.svg (4-blade emblem, 64x64 viewBox).
const iconSvg = readFileSync(join(appDir, 'icon.svg'), 'utf8')

const sharp = (await import('sharp')).default

async function render(size) {
  return sharp(Buffer.from(iconSvg)).resize(size, size).png().toBuffer()
}

// ---- desktop PNG favicon (Next.js serves /icon.png as a declared link) ----
const iconPng = await render(192)
writeFileSync(join(appDir, 'icon.png'), iconPng)
console.log(`wrote src/app/icon.png (${iconPng.length} bytes)`)

// ---- assemble favicon.ico from 16/32/48 PNGs ----
const sizes = [16, 32, 48]
const pngs = []
for (const s of sizes) pngs.push({ size: s, png: await render(s) })

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
writeFileSync(join(appDir, 'favicon.ico'), ico)
console.log(`wrote src/app/favicon.ico (${ico.length} bytes)`)

// ---- verify what we wrote ----
const b = readFileSync(join(appDir, 'favicon.ico'))
const cnt = b.readUInt16LE(4)
console.log(`favicon.ico sizes: ${Array.from({ length: cnt }, (_, i) => b.readUInt8(6 + 16 * i) + 'x' + b.readUInt8(6 + 16 * i + 1)).join(', ')}`)
