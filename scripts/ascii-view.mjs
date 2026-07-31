import sharp from "sharp";

const file = process.argv[2];
const img = sharp(file);
const meta = await img.metadata();
const { data, info } = await img.removeAlpha().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height, C = info.channels;
console.log("dims:", W + "x" + H);

const COLS = Number(process.argv[3] ?? 96), ROWS = Math.round((H / W) * COLS * 0.5);
const chars = " .:-=+*#%@";
const grid = [];
for (let r = 0; r < ROWS; r++) {
  let line = "";
  for (let c = 0; c < COLS; c++) {
    const x = Math.floor((c + 0.5) * (W / COLS));
    const y = Math.floor((r + 0.5) * (H / ROWS));
    const i = (y * W + x) * C;
    const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    line += chars[Math.min(chars.length - 1, Math.floor((lum / 255) * chars.length))];
  }
  grid.push(line);
}
console.log(grid.join("\n"));
