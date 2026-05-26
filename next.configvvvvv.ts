import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/v",

  assetPrefix: "/v/",

  trailingSlash: true,

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