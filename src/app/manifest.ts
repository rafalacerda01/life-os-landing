import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Life OS", short_name: "Life OS", description: siteConfig.description,
    start_url: "/", display: "browser", background_color: "#070B14", theme_color: "#070B14", lang: "pt-BR",
    icons: [
      { src: "/branding/life-os-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/branding/life-os-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
