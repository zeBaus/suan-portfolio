// src/app/(work)/work/[slug]/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";
import { allWorks, type Work } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer2/hooks";
import Container from "@/components/container";
import React from "react";

// High-contrast MDX components
const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-8 text-2xl font-semibold tracking-tight text-white" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-6 text-xl font-semibold tracking-tight text-white" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-4 leading-relaxed text-white/80" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-4 list-disc pl-6 text-white/80" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-4 list-decimal pl-6 text-white/80" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mt-1" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="underline underline-offset-4 text-white hover:opacity-90" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 border-l-4 border-white/25 pl-4 italic text-white/80"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded bg-white/10 px-1 py-0.5 text-white" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mt-4 overflow-x-auto rounded-xl border border-white/20 bg-black/40 p-4 text-sm text-white"
      {...props}
    />
  )
} as const;

type Params = { slug: string };

export function generateStaticParams(): Array<{ slug: string }> {
  return (allWorks as Work[]).map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const work = (allWorks as Work[]).find((w) => w.slug === params.slug);
  if (!work) return {};

  const title = `${work.title} — Work`;
  const description = work.summary ?? "Case study";
  const url = `https://example.com/work/${work.slug}`; // swap to prod URL after deploy

  return {
    title,
    description,
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description }
  };
}

export default function WorkPage({ params }: { params: Params }) {
  const work = (allWorks as Work[]).find((w) => w.slug === params.slug);
  if (!work) notFound();

  const MDXContent = useMDXComponent(work.body.code);

  return (
    <main className="min-h-screen py-16">
      <Container>
        <header className="max-w-3xl">
          <a
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            ← Back to Work
          </a>

          <Card className="mt-4">
            <CardHeader>
              <p className="text-sm uppercase tracking-wide text-white/60">Case Study</p>
              <CardTitle className="text-3xl md:text-4xl">{work.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-white/80">{work.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {work.tags?.map((t) => (
                  <Badge key={t} variant="subtle">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </header>
        <article className="prose mt-10 max-w-3xl prose-invert">
          {/* prose-invert ensures default prose colors are light in dark backgrounds */}
          <MDXContent components={components as any} />
        </article>
      </Container>
    </main>
  );
}
