import type { Metadata } from "next";
import { siteConfig } from "./site-config";

export function pageMetadata(title: string, description: string, path: string, pending = false): Metadata {
  const url = siteConfig.url ? new URL(path, siteConfig.url).toString() : undefined;
  return {
    title, description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: { title: `${title} | Life OS`, description, locale: "pt_BR", type: "website", siteName: "Life OS", ...(url ? { url, images: [{ url: `${siteConfig.url}/social-image`, width: 1200, height: 630, alt: "Life OS — Organize sua vida em um só lugar" }] } : {}) },
    twitter: { card: siteConfig.url ? "summary_large_image" : "summary", title: `${title} | Life OS`, description, ...(siteConfig.url ? { images: [`${siteConfig.url}/social-image`] } : {}) },
    ...((pending || !siteConfig.url) ? { robots: { index: false, follow: true } } : {}),
  };
}
