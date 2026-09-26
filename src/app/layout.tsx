import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MotionController } from "@/components/ui/motion-controller";
import { siteConfig } from "@/lib/site-config";

const manrope = localFont({ src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2", display: "swap", variable: "--font-manrope", weight: "200 800" });

export const metadata: Metadata = {
  ...(siteConfig.url ? { metadataBase: new URL(siteConfig.url) } : {}),
  title: { default: "Life OS — Organize sua vida em um só lugar", template: "%s | Life OS" },
  description: siteConfig.description,
  applicationName: "Life OS",
  ...(siteConfig.url ? { alternates: { canonical: "/" } } : {}),
  openGraph: { title: "Life OS — Organize sua vida em um só lugar", description: siteConfig.description, locale: "pt_BR", type: "website", siteName: "Life OS", ...(siteConfig.url ? { url: siteConfig.url, images: [{ url: `${siteConfig.url}/social-image`, width: 1200, height: 630, alt: "Life OS — Organize sua vida em um só lugar" }] } : {}) },
  twitter: { card: siteConfig.url ? "summary_large_image" : "summary", title: "Life OS — Organize sua vida em um só lugar", description: siteConfig.description, ...(siteConfig.url ? { images: [`${siteConfig.url}/social-image`] } : {}) },
  robots: { index: Boolean(siteConfig.url), follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#070B14", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={manrope.variable}><body><a href="#main-content" className="skip-link">Pular para o conteúdo</a><Header /><main id="main-content" tabIndex={-1}>{children}</main><Footer /><MotionController /></body></html>;
}
