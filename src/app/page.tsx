// src/app/page.tsx
import Link from "next/link";
import Container from "@/components/container";
import FeaturedWorkGrid from "@/components/featured-work-grid";
import { allWorks } from "contentlayer/generated";
import { Button } from "@/components/ui/button";
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

function featuredWorks() {
  return [...allWorks]
    .filter((w) => Boolean(w.featured))
    .sort((a, b) => coerceOrder((a as any).order) - coerceOrder((b as any).order))
    .slice(0, 3);
}

export default function HomePage() {
  const featured = featuredWorks();

  return (
    <main className="min-h-screen py-16">
      <Container>
        {/* HERO */}
        <section className="max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/70 dark:border-white/15 dark:bg-white/5 dark:text-white/80">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            Outcome-first • Tool-agnostic • Quick learner
          </div>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-black dark:text-white md:text-6xl">
            I build and improve real systems—fast.
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-black/70 dark:text-white/80">
            Adaptive full-stack engineer focused on shipping value in existing codebases:
            understand the product, map the code paths, then deliver safe bug fixes,
            features, and automation that compound over time.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/work">View Work</Link>
            </Button>
            <Button asChild variant="subtle">
              <Link href="/about">About Me</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {[".NET / ASP.NET", "Angular", "Laravel", "React", "SQL Server", "Docker", "Azure DevOps", "Selenium / Playwright"].map(
              (t) => (
                <Badge key={t} variant="subtle">
                  {t}
                </Badge>
              )
            )}
          </div>
        </section>

        {/* PROOF TILES */}
        <section className="mt-14 grid gap-6 max-w-5xl md:grid-cols-3">
          {[
            {
              title: "Ramp-up speed",
              desc: "I start by learning product flows + KB, then trace the codebase to find leverage points."
            },
            {
              title: "Delivery mindset",
              desc: "Small, safe changes that ship: targeted bug fixes, incremental features, clear tradeoffs."
            },
            {
              title: "Quality & automation",
              desc: "Pragmatic checks, evidence, and repeatable runs (automation where it actually helps)."
            }
          ].map((x) => (
            <Card key={x.title}>
              <CardHeader>
                <CardTitle>{x.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-black/70 dark:text-white/80">{x.desc}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* FEATURED WORK */}
        <FeaturedWorkGrid items={featured as any} />

        {/* ABOUT TEASER */}
        <section className="mt-20 max-w-5xl">
          <Card>
            <CardHeader>
              <CardTitle>About me (short version)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-black/70 dark:text-white/80">
                I enjoy joining teams with real constraints—legacy code, deadlines, production quirks—
                and improving things without breaking velocity.
              </p>

              <ul className="mt-4 space-y-2 text-sm text-black/70 dark:text-white/80">
                <li>• Understand product + knowledge base first, then verify in code.</li>
                <li>• Ship small, safe changes with clear evidence and rollback options.</li>
                <li>• Modernize tooling when it helps (not when it slows delivery).</li>
              </ul>

              <div className="mt-6">
                <Button asChild variant="subtle">
                  <Link href="/about">Read more</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
