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

const cardHover = "transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.03]";
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

function getCodeStringFromPreChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children;

  // common MDX shape: <pre><code>...</code></pre>
  if (React.isValidElement(children)) {
    const inner = (children as any).props?.children;
    if (typeof inner === "string") return inner;
  }

  return "";
}

function getLanguageFromPreChildren(children: React.ReactNode): string | null {
  if (!React.isValidElement(children)) return null;

  const className: string = (children as any).props?.className ?? "";
  const m = className.match(/language-([a-z0-9-]+)/i);
  return m?.[1]?.toLowerCase() ?? null;
}

// Theme-aware MDX components (editorial + readable in light/dark)
const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight text-black first:mt-0 dark:text-white"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-10 scroll-mt-24 text-xl font-semibold tracking-tight text-black first:mt-0 dark:text-white"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="mt-8 scroll-mt-24 text-base font-semibold tracking-tight text-black first:mt-0 dark:text-white"
      {...props}
    />
  ),

  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-4 leading-relaxed text-black/70 first:mt-0 dark:text-white/80" {...props} />
  ),

  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-black dark:text-white" {...props} />
  ),

  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-black/70 dark:text-white/80" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-black/70 dark:text-white/80" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="leading-relaxed" {...props} />,

  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className={[
        "font-medium text-black underline underline-offset-4 transition-colors",
        "hover:opacity-90 dark:text-white",
        focusRing,
        (props as any).className ?? "",
      ].join(" ")}
    />
  ),

  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 rounded-2xl border border-black/10 bg-black/[0.02] p-4 text-black/70 dark:border-white/15 dark:bg-white/[0.03] dark:text-white/80"
      {...props}
    />
  ),

  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-10 border-black/10 dark:border-white/15" {...props} />
  ),

  // Inline code vs code-block code:
  // - Inline code gets pill styling
  // - Block code (usually has language-*) stays clean (no bg/padding)
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const className = (props as any).className ?? "";
    const isBlockCode = typeof className === "string" && /language-/.test(className);

    if (isBlockCode) {
      return <code {...props} className={`font-mono text-[0.95em] ${className}`.trim()} />;
    }

    return (
      <code
        {...props}
        className={`rounded bg-black/[0.06] px-1 py-0.5 font-mono text-[0.95em] text-black dark:bg-white/10 dark:text-white ${className}`.trim()}
      />
    );
  },

  pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
    const raw = getCodeStringFromPreChildren(props.children);
    const lang = getLanguageFromPreChildren(props.children);

    return (
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {lang ? (
              <span className="rounded-full border border-black/10 bg-black/[0.03] px-2 py-0.5 text-[11px] font-medium text-black/60 dark:border-white/15 dark:bg-white/5 dark:text-white/70">
                {lang}
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-2">{raw ? <CopyButton value={raw} /> : null}</div>
        </div>

        <pre
          {...props}
          className={[
            "overflow-x-auto rounded-2xl border border-black/10 bg-black/[0.03] p-4 text-sm leading-relaxed text-black",
            "dark:border-white/15 dark:bg-black/40 dark:text-white",
            // preserve any incoming className
            (props as any).className ?? "",
          ].join(" ")}
        />
      </div>
    );
  },

  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10 dark:border-white/15">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-black/[0.03] dark:bg-white/[0.04]" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-b border-black/10 px-3 py-2 text-left font-semibold text-black dark:border-white/15 dark:text-white"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border-b border-black/10 px-3 py-2 align-top text-black/70 dark:border-white/15 dark:text-white/80"
      {...props}
    />
  ),

  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // keep as <img> for MDX simplicity; Next/Image can be introduced later if you prefer
    <img
      {...props}
      className={[
        "mt-6 w-full rounded-2xl border border-black/10 bg-black/[0.02]",
        "dark:border-white/15 dark:bg-white/[0.03]",
        props.className ?? "",
      ].join(" ")}
      alt={props.alt ?? ""}
    />
  ),
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

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      // resolved against metadataBase from src/app/layout.tsx
      url: `/work/${work.slug}`,
      type: "article",
    },
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
            className={[
              "inline-flex items-center gap-2 text-sm text-black/60 transition-colors hover:text-black",
              "dark:text-white/70 dark:hover:text-white",
              focusRing,
            ].join(" ")}
          >
            ← Back to Work
          </Link>

          <Card className={`mt-4 ${cardHover}`}>
            <CardHeader>
              <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/60">
                Case Study
              </p>
              <CardTitle className="text-3xl md:text-4xl">{work.title}</CardTitle>
            </CardHeader>

            <CardContent>
              {work.summary ? (
                <p className="leading-relaxed text-black/70 dark:text-white/80">{work.summary}</p>
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

        <article className="prose-neutral mt-10 max-w-3xl">
          <div className="space-y-6">
            <MDXContent components={components as any} />
          </div>
        </article>
      </Container>
    </main>
  );
}
