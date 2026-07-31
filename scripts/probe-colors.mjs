import sharp from 'sharp'
import { readFileSync } from 'node:fs'
const data = await sharp(Buffer.from(readFileSync('src/app/icon.svg')))
  .resize(512, 512)
  .raw()
  .toBuffer()
const px = (x, y) => {
  const i = (Math.round(y * 8) * 512 + Math.round(x * 8)) * 4
  return [data[i], data[i + 1], data[i + 2]]
}
console.log('diagonal NE line from center:')
for (let r = 6; r <= 28; r += 2) {
  const x = 32 + r * Math.cos(-Math.PI / 4)
  const y = 32 + r * Math.sin(-Math.PI / 4)
  console.log(`  r=${r}`, px(x, y).join(','))
}
console.log('vertical top line x=32 (inside blade):')
for (let y = 22; y >= 13; y--) console.log(`  y=${y}`, px(32, y).join(','))
console.log('blade bodies off-axis:', px(38, 20).join(','), px(26, 20).join(','), px(38, 28).join(','), px(26, 44).join(','))
