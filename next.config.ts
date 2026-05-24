import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  allowedDevOrigins: ["192.168.1.3"],

  images: {
    unoptimized: true,

    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;