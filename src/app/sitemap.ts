import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
export default function sitemap(): MetadataRoute.Sitemap {
  // Pending institutional documents are intentionally not indexed.
  return siteConfig.url ? [{ url: siteConfig.url, changeFrequency: "monthly", priority: 1 }] : [];
}
