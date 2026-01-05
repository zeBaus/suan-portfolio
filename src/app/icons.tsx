// src/app/icon.tsx
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const accent = "#0ea5e9";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0b",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: accent,
            boxShadow: `0 0 12px ${accent}`,
          }}
        />
      </div>
    ),
    size
  );
}
