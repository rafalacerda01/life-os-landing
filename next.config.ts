import type { NextConfig } from "next";

// Test-only build isolation. The default preview/build never uses a test origin.
const testBuild = process.env.LIFE_OS_BROWSER_TEST;
const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(testBuild === "prepublication" ? { distDir: ".next-test-prepublication" } : {}),
  ...(testBuild === "public-origin" ? { distDir: ".next-test-public" } : {}),
};
export default nextConfig;
