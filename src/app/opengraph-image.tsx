import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: siteConfig.themeColor,
        padding: 80,
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 44, fontWeight: 800 }}>
        FIT<span style={{ opacity: 0.7 }}>.AI</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 72,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: -2,
        }}
      >
        {siteConfig.shortDescription}
      </div>
      <div style={{ display: "flex", fontSize: 30, opacity: 0.8 }}>
        Treinos personalizados com inteligência artificial
      </div>
    </div>,
    size,
  );
}
