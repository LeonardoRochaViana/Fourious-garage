import { ImageResponse } from "next/og";
import { furiousLogo } from "@/data/furiousLogo";

export const runtime = "edge";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#050505", border: "14px solid #dc2626" }}>
        <img src={furiousLogo} alt="" width="484" height="484" style={{ objectFit: "cover" }} />
      </div>
    ),
    size
  );
}
