// src/app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jose Rico Suan — Adaptive Full-Stack Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const accent = "#0ea5e9";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 72,
          boxSizing: "border-box",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background:
            "radial-gradient(900px 500px at 20% 20%, rgba(14,165,233,0.25) 0%, rgba(14,165,233,0.08) 35%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #0b0b0b 0%, #0f0f0f 100%)",
          color: "white",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 820 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: 0.9 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: accent,
                boxShadow: `0 0 24px ${accent}`,
              }}
            />
            <div style={{ fontSize: 24, letterSpacing: -0.2 }}>Jose Rico Suan</div>
          </div>

          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }}>
            Adaptive full-stack engineer.
          </div>

          <div style={{ fontSize: 28, lineHeight: 1.3, color: "rgba(255,255,255,0.82)" }}>
            Tool-agnostic • Quick learner • Outcome-first delivery
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
            {[".NET / ASP.NET", "Angular", "Laravel", "React", "Automation", "CI/CD"].map((t) => (
              <div
                key={t}
                style={{
                  fontSize: 18,
                  padding: "10px 14px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(0,0,0,0.25)",
                  color: "rgba(255,255,255,0.86)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: 28,
            border: "1px solid rgba(255,255,255,0.15)",
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(14,165,233,0.28) 0%, rgba(14,165,233,0.08) 55%, rgba(255,255,255,0.02) 100%)",
            boxShadow: "0 14px 60px rgba(0,0,0,0.45)",
          }}
        />
      </div>
    ),
    size
  );
}
