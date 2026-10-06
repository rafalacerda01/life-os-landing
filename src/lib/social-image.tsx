import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

const size = { width: 1200, height: 630 };

export default async function OpenGraphImage() {
  const mark = await readFile(path.join(process.cwd(), "public/branding/life-os-mark.png"));
  const markUrl = "data:image/png;base64," + mark.toString("base64");
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 80px", background: "#070B14", color: "#f7f8fc" }}>
      <div style={{ display: "flex", alignItems: "center", fontSize: 30, marginBottom: 38 }}>
        {/* ImageResponse renders its own image; next/image needs a browser. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markUrl} alt="" width={84} height={84} style={{ marginRight: 18 }} />
        Life OS
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 78, fontWeight: 700, letterSpacing: "-3px", lineHeight: 1.14 }}><span>Organize sua vida.</span><span style={{ color: "#c791ff" }}>Em um só lugar.</span></div>
      <div style={{ fontSize: 23, color: "#a9b2c6", marginTop: 32, display: "flex" }}>Rotina, cuidado e objetivos. Offline-first, com inteligência opcional.</div>
    </div>, size,
  );
}
