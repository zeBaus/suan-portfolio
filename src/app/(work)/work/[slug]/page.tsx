// src/app/(work)/work/[slug]/page.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";
import { allWorks, type Work } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer2/hooks";
import Container from "@/components/container";
import React from "react";
import CopyButton from "@/components/copy-button";

// Theme-aware MDX components (editorial + readable in light/dark)
const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight text-black dark:text-white"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 scroll-mt-24 text-xl font-semibold tracking-tight text-black dark:text-white"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-4 leading-relaxed text-black/70 dark:text-white/80" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-4 list-disc space-y-1 pl-6 text-black/70 dark:text-white/80" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-4 list-decimal space-y-1 pl-6 text-black/70 dark:text-white/80" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="underline underline-offset-4 text-black hover:opacity-90 dark:text-white"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 border-l-4 border-black/15 pl-4 italic text-black/70 dark:border-white/20 dark:text-white/80"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-black/[0.06] px-1 py-0.5 font-mono text-[0.95em] text-black dark:bg-white/10 dark:text-white"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
    const raw =
      typeof props.children === "string"
        ? props.children
        : // common MDX shape: <pre><code>...</code></pre>
          (React.isValidElement(props.children) &&
            typeof (props.children as any).props?.children === "string" &&
            (props.children as any).props.children) ||
          "";

    return (
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-end">
          {raw ? <CopyButton value={raw} /> : null}
        </div>

        <pre
          className="overflow-x-auto rounded-2xl border border-black/10 bg-black/[0.03] p-4 text-sm text-black dark:border-white/15 dark:bg-black/40 dark:text-white"
          {...props}
        />
      </div>
    );
  },
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
    twitter: { card: "summary_large_image", title, description },
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
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black dark:text-white/70 dark:hover:text-white"
          >
            ← Back to Work
          </Link>

          <Card className="mt-4">
            <CardHeader>
              <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/60">
                Case Study
              </p>
              <CardTitle className="text-3xl md:text-4xl">{work.title}</CardTitle>
            </CardHeader>

            <CardContent>
              {work.summary ? (
                <p className="text-black/70 dark:text-white/80">{work.summary}</p>
              ) : null}

              {work.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {work.tags.map((t) => (
                    <Badge key={t} variant="subtle">
                      {t}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </header>

        <article className="mt-10 max-w-3xl">
          <MDXContent components={components as any} />
        </article>
      </Container>
    </main>
  );
}
