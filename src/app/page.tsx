// src/app/page.tsx
import Link from "next/link";
import Container from "@/components/container";
import FeaturedWorkGrid from "@/components/featured-work-grid";
import { allWorks } from "contentlayer/generated";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, ShieldCheck, Wrench, ArrowUpRight } from "lucide-react";

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

const cardHover = "transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.03]";
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

export default function HomePage() {
  const featured = featuredWorks();

  return (
    <main className="min-h-screen py-16">
      <Container>
        {/* HERO */}
        <section className="max-w-5xl">
          <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-10">
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
                  I ramp by learning product flows, verifying assumptions in code, then shipping safe fixes,
                  incremental features, and automation that reduces toil.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/work" className={focusRing}>
                    View Work <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild variant="subtle">
                  <Link href="/contact" className={focusRing}>
                    Contact
                  </Link>
                </Button>

                <Button asChild variant="ghost">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className={focusRing}
                  >
                    Resume <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="pt-2">
                <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/60">
                  Primary stack (shipped)
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

                <p className="mt-3 text-sm text-black/60 dark:text-white/60">
                  Toolbox includes additional tech I’ve used in smaller builds, automation, or experiments.{" "}
                  <Link href="/about#toolbox" className="underline-offset-4 hover:underline">
                    See full toolbox →
                  </Link>
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="md:pt-1">
              <Card className={cardHover}>
                <CardHeader className="space-y-3">
                  <CardTitle className="text-base">What I’m best used for</CardTitle>
                  <p className="text-sm text-black/70 dark:text-white/80">
                    The situations where I tend to create the most leverage quickly.
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    {[
                      {
                        k: "Ramp-up & navigation",
                        v: "Trace flows → identify code paths → ship the first safe PR quickly.",
                      },
                      {
                        k: "Stabilization",
                        v: "High-signal bug fixes, regression prevention, and friction removal.",
                      },
                      {
                        k: "Automation & guardrails",
                        v: "Repeatable runs, checks, and CI-friendly workflows that reduce rework.",
                      },
                    ].map((x) => (
                      <div
                        key={x.k}
                        className={[
                          "rounded-2xl border border-black/10 bg-black/[0.02] p-3 transition-colors",
                          "dark:border-white/15 dark:bg-white/[0.03]",
                          "hover:bg-black/[0.03] dark:hover:bg-white/[0.05]",
                        ].join(" ")}
                      >
                        <p className="text-sm font-medium text-black dark:text-white">{x.k}</p>
                        <p className="mt-1 text-sm text-black/70 dark:text-white/80">{x.v}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-black/10 pt-4 text-xs text-black/50 dark:border-white/15 dark:text-white/60">
                    Prefer outcomes over buzzwords. The case studies show the tradeoffs and proof.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* PROOF / CAPABILITIES */}
        <section className="mt-16 max-w-5xl">
          <div>
            <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/60">
              How I deliver
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black dark:text-white">
              High-signal work, shipped safely
            </h2>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Fast ramp-up",
                desc: "Learn the domain, map the flows, then confirm assumptions in code before committing to solutions.",
              },
              {
                icon: ShieldCheck,
                title: "Reliable delivery",
                desc: "Scoped changes, clear evidence, and fallback plans—so improvements don’t become regressions.",
              },
              {
                icon: Wrench,
                title: "Automation that matters",
                desc: "Automate repetitive work and add guardrails where they prevent regressions and rework.",
              },
            ].map((x) => {
              const Icon = x.icon;
              return (
                <Card key={x.title} className={cardHover}>
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
          <Card className={cardHover}>
            <CardHeader>
              <CardTitle>Want a quick fit check?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-black/70 dark:text-white/80">
                  I’m happy to start with a small scoped task: understand the system → propose an approach
                  → ship a safe PR with evidence.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/contact" className={focusRing}>
                      Contact <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button asChild variant="subtle">
                    <Link href="/work" className={focusRing}>
                      Browse case studies
                    </Link>
                  </Button>

                  <Button asChild variant="ghost">
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className={focusRing}
                    >
                      Resume <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <p className="text-xs text-black/50 dark:text-white/60">
                  If you’re hiring for a role with legacy constraints, delivery pressure, and real users,
                  that’s my comfort zone.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
