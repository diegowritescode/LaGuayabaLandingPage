import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = "La Guayaba Restaurante - Bar · Comida típica colombiana en Medellín";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #4a2d27 0%, #6e4b3b 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Marca */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 132,
              height: 132,
              borderRadius: "50%",
              background: "#e79a9c",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 86,
                height: 92,
                borderRadius: "48% 48% 50% 50%",
                background: "#fdf9f5",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 30,
                letterSpacing: 10,
                color: "#f3c7c7",
                fontWeight: 600,
              }}
            >
              RESTAURANTE · BAR
            </span>
          </div>
        </div>

        {/* Título */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 118, color: "#fdf9f5", fontWeight: 700, lineHeight: 1 }}>
            La Guayaba
          </span>
          <span style={{ fontSize: 40, color: "#f7f0e9", marginTop: 24, maxWidth: 900 }}>
            Comida típica colombiana en Medellín
          </span>
        </div>

        {/* Pie */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 30, color: "#e79a9c", fontWeight: 600 }}>
            {siteConfig.tagline}
          </span>
          <span style={{ fontSize: 28, color: "#f7f0e9" }}>
            Avenida Guayabal
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
