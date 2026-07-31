import type { CSSProperties } from "react";

type EmblemProps = {
  uid: string;
  size: number;
  style?: CSSProperties;
};

export function Emblem({ uid, size, style }: EmblemProps) {
  const ref = (id: string) => `url(#${uid}-${id})`;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={style} aria-hidden>
      <defs>
        <radialGradient id={`${uid}-aura`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0" />
          <stop offset="0.4" stopColor="#8b5cf6" stopOpacity="0.05" />
          <stop offset="0.72" stopColor="#8b5cf6" stopOpacity="0.26" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9d5ff" />
          <stop offset="0.16" stopColor="#8b5cf6" />
          <stop offset="0.38" stopColor="#4c1d95" />
          <stop offset="0.58" stopColor="#241744" />
          <stop offset="0.78" stopColor="#100b1e" />
          <stop offset="1" stopColor="#0d0a18" />
        </linearGradient>
        <linearGradient id={`${uid}-glare`} x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-ridge`} x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#e9d5ff" stopOpacity="0.95" />
          <stop offset="0.65" stopColor="#c4b5fd" stopOpacity="0.45" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${uid}-bezel`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#d8b4fe" />
          <stop offset="0.45" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#4c1d95" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="31" fill={ref("aura")} />
      <g transform="rotate(45 32 32)" fill={ref("body")}>
        <path d="M 25.636 25.636 C 22.5 15.5 27.5 6.5 32 3 C 36.5 6.5 41.5 15.5 38.364 25.636 C 38.6 23.8 37.4 26 36.101 27.899 A 5.8 5.8 0 0 0 27.899 27.899 C 26.6 26 25.4 23.8 25.636 25.636 Z" />
        <path d="M 38.364 25.636 C 48.5 22.5 57.5 27.5 61 32 C 57.5 36.5 48.5 41.5 38.364 38.364 C 40.2 38.6 38 37.4 36.101 36.101 A 5.8 5.8 0 0 0 36.101 27.899 C 38 26.6 40.2 25.4 38.364 25.636 Z" />
        <path d="M 38.364 38.364 C 41.5 48.5 36.5 57.5 32 61 C 27.5 57.5 22.5 48.5 25.636 38.364 C 25.4 40.2 26.6 38 27.899 36.101 A 5.8 5.8 0 0 0 36.101 36.101 C 37.4 38 38.6 40.2 38.364 38.364 Z" />
        <path d="M 25.636 38.364 C 15.5 41.5 6.5 36.5 3 32 C 6.5 27.5 15.5 22.5 25.636 25.636 C 23.8 25.4 26 26.6 27.899 27.899 A 5.8 5.8 0 0 0 27.899 36.101 C 26 37.4 23.8 38.6 25.636 38.364 Z" />
        <g fill={ref("glare")}>
          <path d="M 25.636 25.636 C 22.5 15.5 27.5 6.5 32 3 C 36.5 6.5 41.5 15.5 38.364 25.636 C 38.6 23.8 37.4 26 36.101 27.899 A 5.8 5.8 0 0 0 27.899 27.899 C 26.6 26 25.4 23.8 25.636 25.636 Z" />
          <path d="M 38.364 25.636 C 48.5 22.5 57.5 27.5 61 32 C 57.5 36.5 48.5 41.5 38.364 38.364 C 40.2 38.6 38 37.4 36.101 36.101 A 5.8 5.8 0 0 0 36.101 27.899 C 38 26.6 40.2 25.4 38.364 25.636 Z" />
          <path d="M 38.364 38.364 C 41.5 48.5 36.5 57.5 32 61 C 27.5 57.5 22.5 48.5 25.636 38.364 C 25.4 40.2 26.6 38 27.899 36.101 A 5.8 5.8 0 0 0 36.101 36.101 C 37.4 38 38.6 40.2 38.364 38.364 Z" />
          <path d="M 25.636 38.364 C 15.5 41.5 6.5 36.5 3 32 C 6.5 27.5 15.5 22.5 25.636 25.636 C 23.8 25.4 26 26.6 27.899 27.899 A 5.8 5.8 0 0 0 27.899 36.101 C 26 37.4 23.8 38.6 25.636 38.364 Z" />
        </g>
        <path d="M 32 3 C 36.5 6.5 41.5 15.5 38.364 25.636" stroke="#d8b4fe" strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M 61 32 C 57.5 36.5 48.5 41.5 38.364 38.364" stroke="#d8b4fe" strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M 32 61 C 27.5 57.5 22.5 48.5 25.636 38.364" stroke="#d8b4fe" strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M 3 32 C 6.5 27.5 15.5 22.5 25.636 25.636" stroke="#d8b4fe" strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M 25.636 25.636 C 22.5 15.5 27.5 6.5 32 3" stroke="#6d28d9" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M 38.364 25.636 C 48.5 22.5 57.5 27.5 61 32" stroke="#6d28d9" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M 38.364 38.364 C 41.5 48.5 36.5 57.5 32 61" stroke="#6d28d9" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M 25.636 38.364 C 15.5 41.5 6.5 36.5 3 32" stroke="#6d28d9" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M 32 13 L 32 24.5" stroke={ref("ridge")} strokeWidth="0.9" strokeLinecap="round" fill="none" />
        <path d="M 51 32 L 39.5 32" stroke={ref("ridge")} strokeWidth="0.9" strokeLinecap="round" fill="none" />
        <path d="M 32 51 L 32 39.5" stroke={ref("ridge")} strokeWidth="0.9" strokeLinecap="round" fill="none" />
        <path d="M 13 32 L 24.5 32" stroke={ref("ridge")} strokeWidth="0.9" strokeLinecap="round" fill="none" />
        <circle cx="32" cy="32" r="6.15" fill="none" stroke={ref("bezel")} strokeWidth="1.05" />
      </g>
    </svg>
  );
}
