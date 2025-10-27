// src/app/(work)/work/page.tsx
import Link from "next/link";
import { allWorks } from "contentlayer/generated";

function sortWorks() {
    return [...allWorks].sort((a, b) => {
        // Primary: explicit order (lower first). Secondary: date (newest first). Tertiary: title.
        const ao = a.order ?? Number.POSITIVE_INFINITY;
        const bo = b.order ?? Number.POSITIVE_INFINITY;
        if (ao !== bo) return ao - bo;

        const ad = a.date ? new Date(a.date).getTime() : 0;
        const bd = b.date ? new Date(b.date).getTime() : 0;
        if (ad !== bd) return bd - ad;

        return a.title.localeCompare(b.title);
    });
}

export default function WorkIndexPage() {
    const works = sortWorks();

    return (
        <main className="min-h-screen px-6 py-16 md:px-10 lg:px-16">
        <header className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Work</h1>
            <p className="mt-3 text-black/70">
            Outcome-first case studies authored in MDX. Tool-agnostic delivery, fast ramp-up,
            and pragmatic engineering across stacks.
            </p>
        </header>

        <section className="mt-10 grid gap-4">
            {works.length === 0 ? (
            <p className="text-black/60">No case studies yet. Check back soon.</p>
            ) : (
            works.map((w) => (
                <article key={w._id} className="rounded-2xl border p-5">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-semibold">
                    <Link
                        href={`/work/${w.slug}`}
                        className="underline-offset-4 hover:underline"
                    >
                        {w.title}
                    </Link>
                    </h3>
                    {w.date ? (
                    <time
                        dateTime={w.date}
                        className="shrink-0 text-xs text-black/60"
                        title={new Date(w.date).toISOString()}
                    >
                        {new Date(w.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "2-digit"
                        })}
                    </time>
                    ) : null}
                </div>
                {w.summary ? (
                    <p className="mt-2 text-sm text-black/70">{w.summary}</p>
                ) : null}
                {w.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                    {w.tags.map((t) => (
                        <span
                        key={t}
                        className="rounded-full border px-3 py-1 text-xs text-black/80"
                        >
                        {t}
                        </span>
                    ))}
                    </div>
                ) : null}
                </article>
            ))
            )}
        </section>
        </main>
    );
}
