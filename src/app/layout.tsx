// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ThemeProvider from "@/components/theme-provider";
import PageTransition from "@/components/page-transition";
import { baseMetadata } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

function getMetadataBase(): URL {
  const fromPublic = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  if (fromPublic) return new URL(fromPublic);

  // Vercel provides VERCEL_URL without protocol
  if (process.env.VERCEL_URL) return new URL(`https://${process.env.VERCEL_URL}`);

  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  ...baseMetadata({
    title: "Rico Suan — Adaptive Full-Stack Portfolio",
    description:
      "Clean, fast, outcome-driven portfolio highlighting adaptability and full-stack delivery.",
  }),
  metadataBase: getMetadataBase(),
};

export const viewport: Viewport = {
  themeColor: "#0ea5e9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <Header />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
