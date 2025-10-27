// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { allWorks } from "contentlayer/generated";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const core: MetadataRoute.Sitemap = [
        {
        url: `${BASE}/`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 1
        },
        {
        url: `${BASE}/work`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8
        }
    ];

    const works: MetadataRoute.Sitemap = allWorks.map((w) => ({
        url: `${BASE}/work/${w.slug}`,
        lastModified: w.date ? new Date(w.date) : now,
        changeFrequency: "monthly",
        priority: 0.7
    }));

    return [...core, ...works];
}
