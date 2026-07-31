import { ImageResponse } from "next/og";
import { OG_FONTS, OgCard } from "./og/presenter";

export const runtime = "nodejs";
export const alt = "Jashan Singla — Security Research & AI Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<OgCard />, {
    ...size,
    fonts: OG_FONTS,
  });
}
