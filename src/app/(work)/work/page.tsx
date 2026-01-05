// src/app/(work)/work/page.tsx
import Link from "next/link";
import Container from "@/components/container";
import { allWorks } from "contentlayer/generated";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function coerceOrder(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v.trim());
    if (Number.isFinite(n)) return n;
  }
  return Number.POSITIVE_INFINITY;
}

function sortWorks(list: typeof allWorks) {
  return [...list].sort((a, b) => {
    const ao = coerceOrder((a as any).order);
    const bo = coerceOrder((b as any).order);
    if (ao !== bo) return ao - bo;

    const ad = a.date ? new Date(a.date).getTime() : 0;
    const bd = b.date ? new Date(b.date).getTime() : 0;
    if (ad !== bd) return bd - ad;

    return a.title.localeCompare(b.title);
  });
}

function WorkCard({ w }: { w: (typeof allWorks)[number] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>
            <Link href={`/work/${w.slug}`} className="underline-offset-4 hover:underline">
              {w.title}
            </Link>
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        {w.summary ? (
          <p className="mt-2 text-sm text-black/70 dark:text-white/80">{w.summary}</p>
        ) : null}

        {w.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {w.tags.map((t) => (
              <Badge key={t} variant="subtle">
                {t}
              </Badge>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default function WorkIndexPage() {
  const featured = sortWorks(allWorks.filter((w) => Boolean(w.featured)));
  const rest = sortWorks(allWorks.filter((w) => !w.featured));

  return (
    <main className="min-h-screen py-16">
      <Container>
        <header className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white md:text-4xl">
            Work
          </h1>
          <p className="mt-3 text-black/70 dark:text-white/80">
            Outcome-first case studies authored in MDX. Tool-agnostic delivery, fast ramp-up,
            and pragmatic engineering across stacks.
          </p>
        </header>

        <section className="mt-10 grid gap-10">
          {featured.length ? (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/70">
                Featured
              </h2>
              <div className="mt-4 grid gap-4">
                {featured.map((w) => (
                  <WorkCard key={w._id} w={w} />
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/70">
              All projects
            </h2>

            <div className="mt-4 grid gap-4">
              {rest.length === 0 && featured.length === 0 ? (
                <p className="text-black/60 dark:text-white/70">No case studies yet. Check back soon.</p>
              ) : (
                rest.map((w) => <WorkCard key={w._id} w={w} />)
              )}
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
