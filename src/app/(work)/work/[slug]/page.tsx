// src/app/(work)/work/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allWorks, type Work } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer2/hooks";
import React from "react";

// Minimal MDX components mapping (expand later for code blocks, callouts, etc.)
const components = {
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="mt-8 text-2xl font-semibold tracking-tight" {...props} />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="mt-4 leading-relaxed text-black/80" {...props} />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a className="underline underline-offset-4 hover:opacity-90" {...props} />
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
        <main className="min-h-screen px-6 py-16 md:px-10 lg:px-16">
        <header className="max-w-3xl">
            <p className="text-sm uppercase tracking-wide text-black/60">Case Study</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            {work.title}
            </h1>
            <p className="mt-3 text-black/70">{work.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
            {work.tags?.map((t) => (
                <span key={t} className="rounded-full border px-3 py-1 text-xs text-black/80">
                {t}
                </span>
            ))}
            </div>
        </header>

        <article className="prose mt-10 max-w-3xl prose-p:leading-relaxed">
            <MDXContent components={components as any} />
        </article>
        </main>
    );
}
