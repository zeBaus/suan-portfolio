// src/lib/seo.ts
import type { Metadata } from "next";

export const SITE_NAME = "Rico Suan";
export const DEFAULT_TITLE = "Rico Suan — Adaptive Full-Stack Portfolio";
export const DEFAULT_DESCRIPTION =
  "Clean, fast, outcome-driven portfolio highlighting adaptability and full-stack delivery.";

function resolveBaseUrl(): URL {
  const fromPublic = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  if (fromPublic) return new URL(fromPublic);

  // Vercel provides VERCEL_URL without protocol
  if (process.env.VERCEL_URL) return new URL(`https://${process.env.VERCEL_URL}`);

  return new URL("http://localhost:3000");
}

export function buildTitle(title?: string) {
  if (!title) return DEFAULT_TITLE;
  return `${title} | ${SITE_NAME}`;
}

export function baseMetadata(partial: Partial<Metadata> = {}): Metadata {
  const title = typeof partial.title === "string" ? partial.title : DEFAULT_TITLE;
  const description = partial.description ?? DEFAULT_DESCRIPTION;

  const metadataBase = partial.metadataBase ?? resolveBaseUrl();
  const url = metadataBase.toString();

  const defaultOgImages = [
    { url: "/og.png", width: 1200, height: 630, alt: DEFAULT_TITLE },
  ];

  const partialOpenGraph = partial.openGraph ?? {};
  const partialTwitter = partial.twitter ?? {};

  return {
    title,
    description,
    metadataBase,

    // Icons (served from /public)
    icons:
      partial.icons ??
      ({
        icon: [
          { url: "/icon.png", sizes: "32x32", type: "image/png" },
          { url: "/icon.png", sizes: "192x192", type: "image/png" },
        ],
        shortcut: ["/favicon.ico"],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
      } as any),

    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: partialOpenGraph.images ?? defaultOgImages,
      ...partialOpenGraph,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: (partialTwitter as any).images ?? ["/og.png"],
      ...partialTwitter,
    },

    ...partial,
  };
}
