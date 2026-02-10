import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "LinkedIn Text Formatter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          background: "linear-gradient(135deg, #0a66c2 0%, #004182 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo / icon area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 24,
            background: "rgba(255,255,255,0.15)",
            marginBottom: 32,
            fontSize: 64,
          }}
        >
          <span
            style={{
              color: "white",
              fontWeight: 800,
              fontSize: 64,
              lineHeight: 1,
            }}
          >
            Li
          </span>
        </div>

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
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Format your posts with{" "}
          <span style={{ fontWeight: 700, color: "white" }}>bold</span>,{" "}
          <span style={{ fontStyle: "italic", color: "white" }}>italic</span>,{" "}
          <span
            style={{ textDecoration: "line-through", color: "white" }}
          >
            strikethrough
          </span>{" "}
          and more — for free.
        </div>

        {/* Bottom accent */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 40,
          }}
        >
          <div
            style={{
              padding: "10px 24px",
              borderRadius: 20,
              background: "white",
              color: "#0a66c2",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            B
          </div>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.2)",
              color: "white",
              fontSize: 18,
              fontStyle: "italic",
              fontWeight: 600,
            }}
          >
            I
          </div>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.2)",
              color: "white",
              fontSize: 18,
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            U
          </div>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.2)",
              color: "white",
              fontSize: 18,
              fontWeight: 600,
              textDecoration: "line-through",
            }}
          >
            S
          </div>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.2)",
              color: "white",
              fontSize: 18,
            }}
          >
            😀
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
