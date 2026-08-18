import type { NextConfig } from "next";

// Static export → deploys to Cloudflare Pages as static assets (no SSR needed
// for a marketing landing page). Switch to the OpenNext Cloudflare adapter if
// the site later needs server rendering.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
