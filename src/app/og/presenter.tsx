import { readFileSync } from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import { Emblem } from "./emblem";

const FONT_DIR = path.join(process.cwd(), "src", "app", "og", "fonts");

export const OG_FONTS = [400, 500, 600, 700].map((weight) => {
  const buf = readFileSync(path.join(FONT_DIR, `SpaceGrotesk-${weight}.ttf`));
  return {
    name: "Space Grotesk",
    weight: weight as 400 | 500 | 600 | 700,
    style: "normal" as const,
    data: buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer,
  };
});

const FONT = `"Space Grotesk", "Segoe UI", system-ui, sans-serif`;

export function OgCard() {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        fontFamily: FONT,
        background: "#04050a",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            "radial-gradient(circle at 12% -10%, rgba(139,92,246,0.34), rgba(139,92,246,0) 60%)",
            "radial-gradient(circle at 104% 118%, rgba(216,180,254,0.22), rgba(216,180,254,0) 58%)",
            "radial-gradient(circle at 88% -12%, rgba(109,40,217,0.28), rgba(109,40,217,0) 55%)",
            "linear-gradient(180deg, #06070e 0%, #04050a 60%, #0a0714 100%)",
          ].join(", "),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 60,
          top: -130,
          width: 380,
          height: 380,
          borderRadius: 999,
          backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.32), rgba(139,92,246,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 50,
          top: 190,
          width: 320,
          height: 320,
          borderRadius: 999,
          backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.24), rgba(124,58,237,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 430,
          bottom: -130,
          width: 280,
          height: 280,
          borderRadius: 999,
          backgroundImage: "radial-gradient(circle, rgba(216,180,254,0.16), rgba(216,180,254,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 528,
          width: 150,
          height: 46,
          transform: "rotate(-16deg)",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.10)",
          backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02))",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 150,
          top: 70,
          width: 120,
          height: 40,
          transform: "rotate(24deg)",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.08)",
          backgroundImage: "linear-gradient(90deg, rgba(216,180,254,0.10), rgba(139,92,246,0.04))",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 968,
          top: 560,
          width: 96,
          height: 34,
          transform: "rotate(-30deg)",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.09)",
          backgroundImage: "linear-gradient(90deg, rgba(139,92,246,0.12), rgba(255,255,255,0.02))",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: -60,
          top: 50,
          width: 430,
          height: 530,
          opacity: 0.11,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Emblem uid="wm" size={430} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 96,
          top: 76,
          width: 1008,
          height: 478,
          borderRadius: 32,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.16)",
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.085), rgba(255,255,255,0.022) 55%, rgba(255,255,255,0.04))",
          boxShadow: "0 48px 96px rgba(2,3,8,0.62), inset 0 1px 0 rgba(255,255,255,0.22)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            height: 120,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -140,
            left: -170,
            width: 400,
            height: 760,
            transform: "rotate(22deg)",
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.05) 46%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.05) 54%, rgba(255,255,255,0))",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 52, padding: "0 64px" }}>
          <div
            style={{
              position: "relative",
              width: 122,
              height: 122,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.30)",
              backgroundImage:
                "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.24), rgba(255,255,255,0.06) 46%, rgba(0,0,0,0.16) 100%)",
              boxShadow: "0 26px 52px rgba(2,3,8,0.55), inset 0 1px 0 rgba(255,255,255,0.42)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 10,
                top: 6,
                width: 70,
                height: 42,
                transform: "rotate(-24deg)",
                borderRadius: 999,
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.34), rgba(255,255,255,0) 70%)",
              }}
            />
            <Emblem uid="med" size={92} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                backgroundImage:
                  "linear-gradient(150deg, rgba(255,255,255,0.16), rgba(255,255,255,0) 42%)",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "rgba(216,180,254,0.92)",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  backgroundImage: "linear-gradient(135deg, #d8b4fe, #8b5cf6)",
                }}
              />
              Portfolio
            </div>
            <div
              style={{
                marginTop: 16,
                fontSize: 64,
                lineHeight: 1.02,
                fontWeight: 700,
                letterSpacing: -1.3,
                backgroundImage: "linear-gradient(180deg, #ffffff 30%, #e9e4ff 78%, #c4b5fd 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Jashan Singla
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 27,
                fontWeight: 400,
                color: "#b8aee0",
                letterSpacing: -0.3,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 1,
                  backgroundImage: "linear-gradient(90deg, rgba(139,92,246,0.9), rgba(216,180,254,0.15))",
                }}
              />
              Security Research &amp; AI Systems
            </div>
            <div style={{ marginTop: 30, display: "flex", gap: 12 }}>
              {["Penetration Testing", "Digital Forensics", "OSINT & Agentic AI"].map((label) => (
                <div
                  key={label}
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "rgba(233,228,255,0.9)",
                    padding: "9px 18px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.16)",
                    backgroundImage:
                      "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16)",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
