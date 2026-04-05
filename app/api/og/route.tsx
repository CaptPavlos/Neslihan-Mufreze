import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Neslihan Müfreze";
  const subtitle =
    searchParams.get("subtitle") ??
    "Offshore DPO & Author";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #070d1a 0%, #0f1d36 50%, #162a4a 100%)",
          fontFamily: "serif",
          padding: "60px 80px",
        }}
      >
        {/* Gold accent line */}
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "#c9a84c",
            marginBottom: "40px",
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#f0f4f7",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "#c9a84c",
            marginTop: "24px",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          {subtitle}
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "2px",
              background: "#c9a84c",
            }}
          />
          <div
            style={{
              fontSize: 18,
              color: "#7c98b6",
              letterSpacing: "0.1em",
            }}
          >
            neslihanmufreze.com
          </div>
          <div
            style={{
              width: "40px",
              height: "2px",
              background: "#c9a84c",
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
