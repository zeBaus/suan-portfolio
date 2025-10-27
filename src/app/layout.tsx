// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/header";

// Fonts (Geist/Inter + JetBrains Mono). We’ll swap to Geist later if you prefer.
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

// Basic SEO metadata. We'll refine with lib/seo.ts later.
export const metadata: Metadata = {
    title: {
        default: "Jose Rico Suan — Adaptive Full-Stack Portfolio",
        template: "%s | Jose Rico Suan",
    },
    description:
        "Clean, fast, outcome-driven portfolio highlighting adaptability and full-stack delivery.",
    // Temporary base; we’ll switch to the production URL after deploy.
    metadataBase: new URL("https://example.com"),
    icons: { icon: [{ url: "/favicon.ico", rel: "icon" }] },
    openGraph: {
        type: "website",
        title: "Jose Rico Suan — Adaptive Full-Stack Portfolio",
        description:
        "Outcome-driven case studies, tool-agnostic delivery, and a quick-learning mindset.",
        url: "https://example.com",
        siteName: "Jose Rico Suan",
    },
    twitter: {
        card: "summary_large_image",
        title: "Jose Rico Suan — Adaptive Full-Stack Portfolio",
        description:
        "Outcome-driven case studies, tool-agnostic delivery, and a quick-learning mindset.",
    },
};

export const viewport: Viewport = {
  themeColor: "#0ea5e9", // neutral palette + azure accent (can adjust later)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${inter.variable} ${mono.variable}`}>
        <body className="min-h-screen antialiased">
            <Header />
            {children}
        </body>
        </html>
    );
}
