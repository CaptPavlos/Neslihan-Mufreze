import type { MetadataRoute } from "next";

const BASE_URL = "https://www.neslihanmufreze.com";

const PAGES = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
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

  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of PAGES) {
    const trUrl = `${BASE_URL}${path}`;
    const enUrl = `${BASE_URL}/en${path}`;
    const languages = {
      tr: trUrl,
      en: enUrl,
      "x-default": trUrl,
    };

    entries.push({
      url: trUrl,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages },
    });
    entries.push({
      url: enUrl,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages },
    });
  }

  return entries;
}
