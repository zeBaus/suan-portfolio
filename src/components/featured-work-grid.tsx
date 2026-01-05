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

export default function FeaturedWorkGrid({
  items,
}: {
  items: FeaturedWork[];
}) {
  const top = items[0];
  const rest = items.slice(1, 3);

  if (!top) return null;

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
          <Link href="/work">See all</Link>
        </Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Large feature */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">
              <Link
                href={`/work/${top.slug}`}
                className="underline-offset-4 hover:underline"
              >
                {top.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {top.summary ? (
              <p className="text-sm text-black/70 dark:text-white/80 md:text-base">{top.summary}</p>
            ) : null}

            {top.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {top.tags.slice(0, 8).map((t) => (
                  <Badge key={t} variant="subtle">
                    {t}
                  </Badge>
                ))}
              </div>
            ) : null}

            <div className="mt-6">
              <Button asChild>
                <Link href={`/work/${top.slug}`}>Read case study</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Smaller features */}
        <div className="grid gap-4">
          {rest.map((w) => (
            <Card key={w._id}>
              <CardHeader>
                <CardTitle className="text-base">
                  <Link
                    href={`/work/${w.slug}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {w.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {w.summary ? (
                  <p className="text-sm text-black/70 dark:text-white/80">{w.summary}</p>
                ) : null}

                {w.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {w.tags.slice(0, 4).map((t) => (
                      <Badge key={t} variant="subtle">
                        {t}
                      </Badge>
                    ))}
                  </div>
                ) : null}

                <div className="mt-4">
                  <Button asChild variant="subtle" size="sm">
                    <Link href={`/work/${w.slug}`}>Open</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {!rest.length ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add more featured items</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-black/70 dark:text-white/80">
                  Mark more MDX case studies with{" "}
                  <code className="rounded bg-black/[0.06] px-1 py-0.5 dark:bg-white/10">featured: true</code>
                </p>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </section>
  );
}
