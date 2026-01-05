// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import { baseMetadata } from "@/lib/seo";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = baseMetadata({
  title: "Rico Suan — Adaptive Full-Stack Portfolio",
  description:
    "Clean, fast, outcome-driven portfolio highlighting adaptability and full-stack delivery."
});

export const viewport: Viewport = {
  themeColor: "#0ea5e9"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen antialiased">
        <Header />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
