

import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/ziad/"],
    },

    sitemap: "https://gsm-eg.com/sitemap.xml",
  };
}