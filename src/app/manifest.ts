import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return { name: "Life OS", short_name: "Life OS", description: "Organize sua vida em um só lugar.", start_url: "/", display: "browser", background_color: "#070B14", theme_color: "#070B14", lang: "pt-BR", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }] };
}
