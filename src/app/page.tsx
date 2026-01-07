// src/app/page.tsx
import Link from "next/link";
import Container from "@/components/container";
import FeaturedWorkGrid from "@/components/featured-work-grid";
import { allWorks } from "contentlayer/generated";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, ShieldCheck, Wrench } from "lucide-react";

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
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-10">
            {/* Left */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/70 dark:border-white/15 dark:bg-white/5 dark:text-white/80">
                <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                Outcome-first • Tool-agnostic • Quick learner
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-black dark:text-white md:text-6xl">
                  I ship improvements in real codebases—fast.
                </h1>

                <p className="max-w-3xl text-lg leading-relaxed text-black/70 dark:text-white/80 md:text-xl">
                  Full-stack engineer focused on delivery: understand the product and code paths,
                  then implement safe bug fixes, incremental features, and automation that compounds.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/work">
                    View Work <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild variant="subtle">
                  <Link href="/contact">Contact</Link>
                </Button>

                <Button asChild variant="ghost">
                  <Link href="/about">About</Link>
                </Button>
              </div>

              <div className="pt-2">
                <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/60">
                  Comfortable shipping across
                </p>
                <div className="mt-3 flex max-w-4xl flex-wrap gap-2">
                  {[
                    ".NET / ASP.NET",
                    "Angular",
                    "Laravel",
                    "React",
                    "SQL Server",
                    "Docker",
                    "Azure DevOps",
                    "Selenium / Playwright",
                  ].map((t) => (
                    <Badge key={t} variant="subtle">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="md:pt-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">My default approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 text-sm text-black/70 dark:text-white/80">
                    <li className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-xs font-semibold text-black/70 dark:border-white/15 dark:bg-white/5 dark:text-white/80">
                        1
                      </span>
                      <span>
                        Map product flows + KB, then trace the codebase to the real leverage points.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-xs font-semibold text-black/70 dark:border-white/15 dark:bg-white/5 dark:text-white/80">
                        2
                      </span>
                      <span>
                        Ship small, safe changes with evidence, clear tradeoffs, and rollback options.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-xs font-semibold text-black/70 dark:border-white/15 dark:bg-white/5 dark:text-white/80">
                        3
                      </span>
                      <span>
                        Add automation where it removes toil—repeatable runs, checks, and guardrails.
                      </span>
                    </li>
                  </ol>

                  <div className="mt-5 border-t border-black/10 pt-4 text-xs text-black/50 dark:border-white/15 dark:text-white/60">
                    Prefer outcomes over buzzwords. Case studies show the details.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* PROOF TILES */}
        <section className="mt-16 max-w-5xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/60">
                How I deliver
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black dark:text-white">
                High-signal work, shipped safely
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Ramp-up speed",
                desc: "Learn the product first, then confirm assumptions in code. I look for the shortest path to impact.",
              },
              {
                icon: ShieldCheck,
                title: "Reliability",
                desc: "Targeted fixes and incremental features with careful scoping, test strategy, and clear fallback plans.",
              },
              {
                icon: Wrench,
                title: "Pragmatic automation",
                desc: "Automate repetitive steps and add guardrails where they actually prevent regressions and rework.",
              },
            ].map((x) => {
              const Icon = x.icon;
              return (
                <Card key={x.title}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-sky-400" />
                      <CardTitle>{x.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-black/70 dark:text-white/80">
                      {x.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* FEATURED WORK */}
        <FeaturedWorkGrid items={featured as any} />

        {/* CTA */}
        <section className="mt-20 max-w-5xl">
          <Card>
            <CardHeader>
              <CardTitle>Let’s build something reliable</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-black/70 dark:text-white/80">
                  If you need someone who can ramp up quickly, navigate a messy codebase,
                  and ship improvements without drama—let’s talk.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/contact">
                      Contact <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="subtle">
                    <Link href="/work">Browse case studies</Link>
                  </Button>
                  <Button asChild variant="ghost">
                    <Link href="/about">More context</Link>
                  </Button>
                </div>

                <p className="text-xs text-black/50 dark:text-white/60">
                  Prefer to start with evidence? Open a case study and skim the approach + outcomes.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
