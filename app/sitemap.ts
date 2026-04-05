import type { MetadataRoute } from "next";

const BASE_URL = "https://www.neslihanmufreze.com";

const PAGES = [
  { path: "", priority: 1, changeFrequency: "monthly" as const },
  {
    path: "/books/kaptanliga-giden-yol",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/books/offshore-life",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        tr: `${BASE_URL}${path}`,
        en: `${BASE_URL}/en${path}`,
      },
    },
  }));
}
