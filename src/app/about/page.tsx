// src/app/about/page.tsx
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <main className="min-h-screen py-16">
      <Container>
        <header className="max-w-5xl">
          <p className="text-sm uppercase tracking-wide text-white/60">About</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Jose Rico Suan
          </h1>
          <p className="mt-3 text-white/80">
            Adaptive full-stack engineer focused on shipping outcomes. I ramp fast by
            learning the product and codebase, then deliver safe improvements—bug fixes,
            features, and automation—without slowing teams down.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/work">View Work</Link>
            </Button>
            <Button asChild variant="subtle">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </header>

        <section className="mt-12 grid max-w-5xl gap-6 md:grid-cols-[260px_1fr]">
          {/* Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                {/* Photo: place your file at /public/profile.jpg */}
                <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/20 bg-white/5">
                  <Image
                    src="/profile.jpg"
                    alt="Jose Rico Suan"
                    fill
                    sizes="64px"
                    className="object-cover"
                    priority
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">Cebu, PH</p>
                  <p className="text-xs text-white/60">Open to remote roles</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="subtle">Full-stack</Badge>
                <Badge variant="subtle">Automation</Badge>
                <Badge variant="subtle">API / SQL</Badge>
                <Badge variant="subtle">DevOps-ish</Badge>
              </div>

              <p className="mt-4 text-xs text-white/60">
                .
              </p>
            </CardContent>
          </Card>

          {/* Narrative */}
          <Card>
            <CardHeader>
              <CardTitle>How I operate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <p className="text-sm text-white/80">
                    I like joining real systems—where the codebase already exists, users
                    already have expectations, and delivery still matters.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">Ramp-up → Ship loop</h3>
                  <ul className="mt-2 space-y-2 text-sm text-white/80">
                    <li>
                      <span className="font-medium text-white/90">Understand:</span>{" "}
                      product flows, knowledge base, and key code paths.
                    </li>
                    <li>
                      <span className="font-medium text-white/90">Stabilize:</span>{" "}
                      fix high-signal bugs and reduce friction points.
                    </li>
                    <li>
                      <span className="font-medium text-white/90">Improve:</span>{" "}
                      add small features and automation that compound over time.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">What you can expect</h3>
                  <ul className="mt-2 space-y-2 text-sm text-white/80">
                    <li>Clear communication and scoped changes.</li>
                    <li>Tool-agnostic delivery (choose what fits the constraint).</li>
                    <li>Pragmatic quality: evidence, logs, and repeatable checks.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">Primary tools I touch</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="subtle">.NET / ASP.NET</Badge>
                    <Badge variant="subtle">Angular</Badge>
                    <Badge variant="subtle">Laravel</Badge>
                    <Badge variant="subtle">React</Badge>
                    <Badge variant="subtle">SQL Server</Badge>
                    <Badge variant="subtle">Docker</Badge>
                    <Badge variant="subtle">Azure DevOps</Badge>
                    <Badge variant="subtle">Selenium / Playwright</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-12 max-w-5xl">
          <Card>
            <CardHeader>
              <CardTitle>Next improvements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Replace placeholder avatar with a real photo (done—add the file).</li>
                <li>Add a short timeline section (roles + milestones).</li>
                <li>Keep animations subtle and performance-friendly.</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
