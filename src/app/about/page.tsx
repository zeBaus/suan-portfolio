// src/app/about/page.tsx
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AboutPage() {
  return (
    <main className="min-h-screen py-16">
      <Container>
        <header className="max-w-5xl">
          <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/60">
            About
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black dark:text-white md:text-4xl">
            Jose Rico Suan
          </h1>
          <p className="mt-3 max-w-3xl text-black/70 dark:text-white/80">
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

        <section className="mt-12 grid max-w-5xl gap-6 md:grid-cols-[360px_1fr]">
          {/* Profile */}
          <Card className="cursor-default">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <CardTitle>Profile</CardTitle>

                {/* “More” modal */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="h-9 px-3">
                      More
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>More about me</DialogTitle>
                      <DialogDescription>
                        A bit of personality outside the code — optional, but human.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="mt-5 grid gap-5">
                      <section>
                        <h3 className="text-sm font-semibold text-black dark:text-white">
                          Hobbies
                        </h3>
                        <p className="mt-1 text-sm text-black/70 dark:text-white/80">
                          Gym/fitness, tinkering with side projects, and learning new tools fast
                          when there’s a real problem to solve.
                        </p>
                      </section>

                      <section>
                        <h3 className="text-sm font-semibold text-black dark:text-white">
                          Music
                        </h3>
                        <p className="mt-1 text-sm text-black/70 dark:text-white/80">
                          Mostly focus/lo-fi while coding; I switch to upbeat playlists when shipping.
                        </p>
                      </section>

                      <section>
                        <h3 className="text-sm font-semibold text-black dark:text-white">
                          Work style
                        </h3>
                        <ul className="mt-2 space-y-2 text-sm text-black/70 dark:text-white/80">
                          <li>• I ask clarifying questions early, then move quickly.</li>
                          <li>• I prefer scoped PRs with clear evidence and rollback options.</li>
                          <li>• I like fixing root causes, not just symptoms.</li>
                        </ul>
                      </section>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <Badge variant="subtle">Curious</Badge>
                      <Badge variant="subtle">Outcome-first</Badge>
                      <Badge variant="subtle">Team-friendly</Badge>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>

            <CardContent>
              {/* Photo dialog (large preview) */}
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="group relative w-full overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03] text-left transition hover:opacity-95 dark:border-white/15 dark:bg-white/5"
                    aria-label="Open profile photo"
                  >
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src="/profile.jpg"
                        alt="Jose Rico Suan"
                        fill
                        sizes="(max-width: 768px) 92vw, 360px"
                        className="object-cover transition duration-300 group-hover:scale-[1.02]"
                        priority
                      />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-sm font-semibold text-white">Jose Rico Suan</p>
                      <p className="text-xs text-white/80">Cebu, PH • Open to remote roles</p>
                    </div>
                  </button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Jose Rico Suan</DialogTitle>
                    <DialogDescription>Cebu, PH • Open to remote roles</DialogDescription>
                  </DialogHeader>

                  <div className="mt-5">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03] dark:border-white/15 dark:bg-white/5">
                      <Image
                        src="/profile.jpg"
                        alt="Jose Rico Suan"
                        fill
                        sizes="(max-width: 768px) 92vw, 640px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="mt-4">
                <p className="text-sm font-medium text-black dark:text-white">Cebu, PH</p>
                <p className="text-xs text-black/60 dark:text-white/60">Open to remote roles</p>
              </div>


              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="subtle">Full-stack</Badge>
                <Badge variant="subtle">Automation</Badge>
                <Badge variant="subtle">API / SQL</Badge>
                <Badge variant="subtle">DevOps-ish</Badge>
              </div>

              <p className="mt-4 text-xs text-black/60 dark:text-white/60">
               <span className="font-medium">Click photo to enlarge.</span>
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
                <p className="text-sm leading-relaxed text-black/70 dark:text-white/80">
                  I like joining real systems—where the codebase already exists, users
                  already have expectations, and delivery still matters.
                </p>

                <div>
                  <h3 className="text-sm font-semibold text-black dark:text-white">
                    Ramp-up → Ship loop
                  </h3>
                  <ul className="mt-2 space-y-2 text-sm text-black/70 dark:text-white/80">
                    <li>
                      <span className="font-medium text-black dark:text-white">Understand:</span>{" "}
                      product flows, knowledge base, and key code paths.
                    </li>
                    <li>
                      <span className="font-medium text-black dark:text-white">Stabilize:</span>{" "}
                      fix high-signal bugs and reduce friction points.
                    </li>
                    <li>
                      <span className="font-medium text-black dark:text-white">Improve:</span>{" "}
                      add small features and automation that compound over time.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-black dark:text-white">
                    What you can expect
                  </h3>
                  <ul className="mt-2 space-y-2 text-sm text-black/70 dark:text-white/80">
                    <li>Clear communication and scoped changes.</li>
                    <li>Tool-agnostic delivery (choose what fits the constraint).</li>
                    <li>Pragmatic quality: evidence, logs, and repeatable checks.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-black dark:text-white">
                    Primary tools I touch
                  </h3>
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
              <ul className="space-y-2 text-sm text-black/70 dark:text-white/80">
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
