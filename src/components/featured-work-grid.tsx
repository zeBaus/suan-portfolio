// src/components/featured-work-grid.tsx
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FeaturedWork = {
  _id: string;
  slug: string;
  title: string;
  summary?: string | null;
  tags?: string[] | null;
};

function clampTags(tags?: string[] | null, max = 6) {
  if (!tags?.length) return { shown: [], more: 0 };
  const shown = tags.slice(0, max);
  const more = Math.max(0, tags.length - shown.length);
  return { shown, more };
}

const cardHover = "transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.03]";
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";
const linkHover = `underline-offset-4 transition-colors hover:underline ${focusRing}`;

export default function FeaturedWorkGrid({ items }: { items: FeaturedWork[] }) {
  const top = items[0];
  const rest = items.slice(1, 3);

  if (!top) return null;

  const topTags = clampTags(top.tags, 8);

  return (
    <section className="mt-20 max-w-5xl">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white">
            Featured work
          </h2>
          <p className="mt-2 text-black/70 dark:text-white/80">
            Curated case studies that show outcomes, reliability, and how I think.
          </p>
        </div>

        <Button asChild variant="subtle">
          <Link href="/work" className={focusRing}>
            See all
          </Link>
        </Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Large feature */}
        <Card className={`group md:col-span-2 ${cardHover}`}>
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <Badge variant="subtle">Featured</Badge>
            </div>

            <CardTitle className="text-xl md:text-2xl">
              <Link
                href={`/work/${top.slug}`}
                className={`${linkHover} font-semibold tracking-tight text-black dark:text-white group-hover:underline`}
              >
                {top.title}
              </Link>
            </CardTitle>
          </CardHeader>

          <CardContent>
            {top.summary ? (
              <p className="text-sm text-black/70 dark:text-white/80 md:text-base">
                {top.summary}
              </p>
            ) : null}

            {topTags.shown.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {topTags.shown.map((t) => (
                  <Badge key={t} variant="subtle">
                    {t}
                  </Badge>
                ))}
                {topTags.more ? <Badge variant="subtle">+{topTags.more}</Badge> : null}
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`/work/${top.slug}`} className={focusRing}>
                  Read case study
                </Link>
              </Button>

              <Button asChild variant="ghost">
                <Link href="/work" className={focusRing}>
                  Browse all
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Smaller features */}
        <div className="grid gap-4">
          {rest.map((w) => {
            const tags = clampTags(w.tags, 4);

            return (
              <Card key={w._id} className={`group ${cardHover}`}>
                <CardHeader className="space-y-2">
                  <CardTitle className="text-base">
                    <Link
                      href={`/work/${w.slug}`}
                      className={`${linkHover} font-semibold tracking-tight text-black dark:text-white group-hover:underline`}
                    >
                      {w.title}
                    </Link>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  {w.summary ? (
                    <p className="text-sm text-black/70 dark:text-white/80">{w.summary}</p>
                  ) : null}

                  {tags.shown.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tags.shown.map((t) => (
                        <Badge key={t} variant="subtle">
                          {t}
                        </Badge>
                      ))}
                      {tags.more ? <Badge variant="subtle">+{tags.more}</Badge> : null}
                    </div>
                  ) : null}

                  <div className="mt-4">
                    <Button asChild variant="subtle" size="sm">
                      <Link href={`/work/${w.slug}`} className={focusRing}>
                        Open
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {!rest.length ? (
            <Card className={cardHover}>
              <CardHeader>
                <CardTitle className="text-base">Add more featured items</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-black/70 dark:text-white/80">
                  Mark more MDX case studies with{" "}
                  <code className="rounded bg-black/[0.06] px-1 py-0.5 dark:bg-white/10">
                    featured: true
                  </code>
                </p>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </section>
  );
}
