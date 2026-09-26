import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
export default function robots(): MetadataRoute.Robots {
  // Crawlers must be able to read noindex on pending institutional pages.
  // Indexing and sitemap inclusion are controlled independently.
  return siteConfig.url
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteConfig.url}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
