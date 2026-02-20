import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const alt = "LinkedIn Text Formatter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const iconPath = path.join(process.cwd(), "public", "web-app-manifest-512x512.png");
  const iconBuffer = fs.readFileSync(iconPath);
  const iconBase64 = `data:image/png;base64,${iconBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Icon */}
        <img
          src={iconBase64}
          width={160}
          height={160}
          style={{ marginBottom: 40 }}
          alt="LinkedIn Text Formatter Icon"
        />

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.2,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          LinkedIn Text Formatter
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Format your posts with bold, italic, strikethrough and more — for
          free.
        </div>
      </div>
    ),
    { ...size }
  );
}
