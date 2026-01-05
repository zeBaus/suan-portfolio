// src/lib/seo.ts
import type { Metadata } from "next";

export const SITE_NAME = "Rico Suan";
export const DEFAULT_TITLE = "Rico Suan — Adaptive Full-Stack Portfolio";
export const DEFAULT_DESCRIPTION =
  "Clean, fast, outcome-driven portfolio highlighting adaptability and full-stack delivery.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://example.com";

export function buildTitle(title?: string) {
  if (!title) return DEFAULT_TITLE;
  return `${title} | ${SITE_NAME}`;
}

export function baseMetadata(partial?: Partial<Metadata>): Metadata {
  const title =
    typeof partial?.title === "string" ? partial.title : DEFAULT_TITLE;

  return {
    title,
    description: partial?.description || DEFAULT_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description: partial?.description || DEFAULT_DESCRIPTION,
      url: SITE_URL,
      images: partial?.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: partial?.description || DEFAULT_DESCRIPTION,
      images: (partial?.twitter as any)?.images,
    },
    ...partial,
  };
}
