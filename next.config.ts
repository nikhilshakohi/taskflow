import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false, // ⛔ Disable the loading indicator
  },
};

export default nextConfig;
