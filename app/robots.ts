import type { MetadataRoute } from "next";

const BASE_URL = "https://neslihanmufreze.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/books/*/success"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
