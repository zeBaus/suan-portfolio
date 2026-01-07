// src/app/(work)/work/page.tsx
import Link from "next/link";
import Container from "@/components/container";
import { allWorks } from "contentlayer/generated";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Star } from "lucide-react";

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

function formatDate(date?: string) {
  if (!date) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(d);
}

function TagsRow({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;

  const shown = tags.slice(0, 4);
  const remaining = tags.length - shown.length;

  return (
    <div className="flex flex-wrap gap-2">
      {shown.map((t) => (
        <Badge key={t} variant="subtle">
          {t}
        </Badge>
      ))}
      {remaining > 0 ? (
        <Badge variant="subtle">+{remaining}</Badge>
      ) : null}
    </div>
  );
}

function WorkCard({
  w,
  variant = "default",
}: {
  w: (typeof allWorks)[number];
  variant?: "featured" | "default";
}) {
  const meta = formatDate(w.date);

  return (
    <Card
      className={[
        "group transition-colors",
        "border-black/10 dark:border-white/15",
        "hover:border-black/20 dark:hover:border-white/25",
        "hover:bg-black/[0.02] dark:hover:bg-white/[0.03]",
      ].join(" ")}
    >
      <div className={variant === "featured" ? "p-5" : "p-4"}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {variant === "featured" ? (
              <div className="mb-2 inline-flex items-center gap-2 text-xs text-black/50 dark:text-white/60">
                <Star className="h-3.5 w-3.5 text-sky-400" />
                Featured
                {meta ? (
                  <>
                    <span className="text-black/30 dark:text-white/30">•</span>
                    <span>{meta}</span>
                  </>
                ) : null}
              </div>
            ) : meta ? (
              <div className="mb-2 text-xs text-black/50 dark:text-white/60">{meta}</div>
            ) : null}

            <CardTitle className={variant === "featured" ? "text-xl" : "text-base"}>
              <Link
                href={`/work/${w.slug}`}
                className="underline-offset-4 hover:underline"
              >
                {w.title}
              </Link>
            </CardTitle>
          </div>

          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-black/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black/60 dark:text-white/40 dark:group-hover:text-white/70" />
        </div>

        <CardContent className="p-0">
          {w.summary ? (
            <p
              className={[
                "mt-3 leading-relaxed text-black/70 dark:text-white/80",
                variant === "featured" ? "text-sm" : "text-sm",
              ].join(" ")}
            >
              {w.summary}
            </p>
          ) : null}

          {w.tags?.length ? (
            <div className={variant === "featured" ? "mt-4" : "mt-3"}>
              <TagsRow tags={w.tags} />
            </div>
          ) : null}
        </CardContent>
      </div>
    </Card>
  );
}

export default function WorkIndexPage() {
  const featured = sortWorks(allWorks.filter((w) => Boolean(w.featured)));
  const rest = sortWorks(allWorks.filter((w) => !w.featured));

  const hasAny = featured.length + rest.length > 0;

  return (
    <main className="min-h-screen py-16">
      <Container>
        <header className="max-w-5xl">
          <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/60">
            Work
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black dark:text-white md:text-4xl">
            Case studies & shipped projects
          </h1>
          <p className="mt-3 max-w-3xl text-black/70 dark:text-white/80">
            Outcome-first writeups authored in MDX. Tool-agnostic delivery, fast ramp-up,
            and pragmatic engineering across stacks.
          </p>
        </header>

        <section className="mt-10 max-w-5xl space-y-12">
          {featured.length ? (
            <div>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-black/50 dark:text-white/60">
                    Featured ({featured.length})
                  </h2>
                  <p className="mt-2 text-sm text-black/70 dark:text-white/80">
                    A few high-signal projects that best represent how I work.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {featured.map((w) => (
                  <WorkCard key={w._id} w={w} variant="featured" />
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-black/50 dark:text-white/60">
                  All projects ({rest.length})
                </h2>
                <p className="mt-2 text-sm text-black/70 dark:text-white/80">
                  More case studies and shipped work—optimized for quick scanning.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {!hasAny ? (
                <p className="text-black/60 dark:text-white/70">
                  No case studies yet. Check back soon.
                </p>
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
