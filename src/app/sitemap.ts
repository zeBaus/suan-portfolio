// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { allWorks } from "contentlayer/generated";

function getBaseUrl(): string {
  const fromPublic = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  if (fromPublic) return fromPublic;

  // Vercel provides VERCEL_URL without protocol
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = getBaseUrl();
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/work`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const works: MetadataRoute.Sitemap = allWorks.map((w) => ({
    url: `${BASE}/work/${w.slug}`,
    // Avoid implying timelines—treat as regularly maintained.
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...core, ...works];
}
