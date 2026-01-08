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

    // Deterministic fallback: title (case-insensitive-ish, numeric-friendly)
    const t = a.title.localeCompare(b.title, "en", { sensitivity: "base", numeric: true });
    if (t !== 0) return t;

    // Extra tie-breakers to guarantee stable order across builds
    const s = a.slug.localeCompare(b.slug, "en", { sensitivity: "base", numeric: true });
    if (s !== 0) return s;

    return a._id.localeCompare(b._id);
  });
}


function clampTags(tags?: string[], max = 4) {
  if (!tags?.length) return { shown: [], more: 0 };
  const shown = tags.slice(0, max);
  const more = Math.max(0, tags.length - shown.length);
  return { shown, more };
}

const cardHover =
  "transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.03]";

const linkHover =
  "underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

function FeaturedCard({ w }: { w: (typeof allWorks)[number] }) {
  const { shown, more } = clampTags(w.tags, 6);

  return (
    <Card className={`group ${cardHover}`}>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/60">
            Featured
          </p>
        </div>

        <CardTitle className="text-xl">
          <Link
            href={`/work/${w.slug}`}
            className={`font-semibold tracking-tight text-black dark:text-white ${linkHover} group-hover:underline`}
          >
            {w.title}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {w.summary ? (
          <p className="text-sm leading-relaxed text-black/70 dark:text-white/80">
            {w.summary}
          </p>
        ) : null}

        {shown.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {shown.map((t) => (
              <Badge key={t} variant="subtle">
                {t}
              </Badge>
            ))}
            {more ? <Badge variant="subtle">+{more}</Badge> : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function RowCard({ w }: { w: (typeof allWorks)[number] }) {
  const { shown, more } = clampTags(w.tags, 4);

  return (
    <Card className={`group ${cardHover}`}>
      <CardContent className="pt-6">
        <div className="min-w-0">
          <Link
            href={`/work/${w.slug}`}
            className={`block min-w-0 text-base font-semibold tracking-tight text-black dark:text-white ${linkHover} group-hover:underline`}
          >
            {w.title}
          </Link>

          {w.summary ? (
            <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/80">
              {w.summary}
            </p>
          ) : null}
        </div>

        {shown.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {shown.map((t) => (
              <Badge key={t} variant="subtle">
                {t}
              </Badge>
            ))}
            {more ? <Badge variant="subtle">+{more}</Badge> : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default function WorkIndexPage() {
  const featured = sortWorks(allWorks.filter((w) => Boolean(w.featured)));
  const rest = sortWorks(allWorks.filter((w) => !w.featured));

  const hasAnything = featured.length > 0 || rest.length > 0;

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
            Outcome-first case studies written in MDX—showing how I ramp into real systems, trace the
            code paths, and ship safe improvements across stacks.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="subtle">Tool-agnostic</Badge>
            <Badge variant="subtle">Fast ramp-up</Badge>
            <Badge variant="subtle">Bug fixes → features → automation</Badge>
          </div>
        </header>

        <section className="mt-10 max-w-5xl space-y-12">
          {featured.length ? (
            <div>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-black/50 dark:text-white/60">
                    Featured
                  </h2>
                  <p className="mt-2 text-sm text-black/70 dark:text-white/80">
                    Deeper case studies that best represent my delivery style and outcomes.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className={`text-sm font-medium text-black/70 dark:text-white/75 ${linkHover}`}
                >
                  Discuss a role →{" "}
                </Link>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {featured.map((w) => (
                  <FeaturedCard key={w._id} w={w} />
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-black/50 dark:text-white/60">
                All projects
              </h2>
              <p className="mt-2 text-sm text-black/70 dark:text-white/80">
                The full set—smaller builds, experiments, and additional shipped work.
              </p>
            </div>

            <div className="mt-4 grid gap-3">
              {!hasAnything ? (
                <p className="text-black/60 dark:text-white/70">
                  No case studies yet. Check back soon.
                </p>
              ) : (
                rest.map((w) => <RowCard key={w._id} w={w} />)
              )}
            </div>
          </div>

          {/* Bottom CTA */}
          <Card>
            <CardContent className="py-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-medium text-black dark:text-white">
                    Want a quick fit check?
                  </p>
                  <p className="mt-1 text-sm text-black/70 dark:text-white/80">
                    I’m happy to start with a small scoped task: understand → propose → ship a safe PR.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-black/[0.03] px-4 py-2 text-sm font-medium text-black/80 transition hover:bg-black/[0.06] dark:border-white/15 dark:bg-white/5 dark:text-white/85 dark:hover:bg-white/10"
                  >
                    Contact
                  </Link>

                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-black/70 transition hover:bg-black/[0.04] dark:text-white/75 dark:hover:bg-white/10"
                  >
                    Resume
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
