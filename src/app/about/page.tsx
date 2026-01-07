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
import { ArrowUpRight, Bot, Briefcase, Cloud, GraduationCap, Wrench, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ExperienceItem = {
  label?: string; // optional (non-date) badge
  org: string;
  role: string;
  icon: LucideIcon;
  tags: string[];
  bullets: string[];
};

const experience: ExperienceItem[] = [
  {
    label: "Current focus",
    org: "N-Compass TV",
    role: "Full-stack • QA Automation • R&D (LLMs)",
    icon: Bot,
    tags: [".NET / ASP.NET", "Angular", "SQL Server", "Selenium (Python)", "Azure DevOps", "JWT"],
    bullets: [
      "Led Selenium automation to speed up regression cycles and reduce production bugs.",
      "Built internal tooling/scripts for monitoring, troubleshooting, and reporting to improve visibility.",
      "Shipped full-stack features (Angular + .NET) and improved data models/queries in SQL Server.",
      "Transitioned into LLM R&D: evaluate and integrate LLM platforms for internal workflows.",
    ],
  },
  {
    org: "Wind’s Gate Phils",
    role: "Full-stack (crypto platforms)",
    icon: Wrench,
    tags: ["Laravel", "React", "Docker", "Linux (Ubuntu)", "Kotlin", "SQL"],
    bullets: [
      "Worked on existing crypto platforms: backend features in Laravel and frontend integrations in React.",
      "Shipped in a containerized Linux environment (Docker) with fast iteration and debugging.",
      "Supported DB operations with SQL and gained exposure to mobile-integrated components (Kotlin).",
    ],
  },
  {
    org: "Ramon Aboitiz Foundation Inc. (RAFI)",
    role: "Laravel Integrations • DevOps (Microsoft ecosystem)",
    icon: Cloud,
    tags: ["Laravel", "Dynamics 365", "IIS", "Azure App Services", "Azure Key Vault", "Azure DevOps"],
    bullets: [
      "Integrated Laravel systems with Microsoft Dynamics 365 for data sync and process automation.",
      "Supported stable deployments via IIS and improved release consistency with Azure DevOps pipelines.",
      "Worked with App Services + Key Vault to support secure, maintainable deployments.",
    ],
  },
  {
    org: "Gemango Software Services",
    role: "Software Engineer",
    icon: Briefcase,
    tags: ["Production delivery", "Debugging", "Agile teamwork"],
    bullets: [
      "Built and maintained production-grade solutions with a strong focus on stability and releases.",
      "Worked closely with dev/QA/PM to ship reliable increments and troubleshoot complex issues.",
    ],
  },
  {
    org: "Hatchit Solutions",
    role: "Software Engineer (features + testing)",
    icon: Briefcase,
    tags: ["Feature delivery", "Client collaboration", "Maintainable code"],
    bullets: [
      "Delivered features under deadlines while keeping code clean, debuggable, and maintainable.",
      "Joined client discussions to clarify requirements and demonstrate progress.",
    ],
  },
  {
    org: "University of San Carlos",
    role: "B.S. Computer Science (foundations + applied delivery)",
    icon: GraduationCap,
    tags: ["Systems thinking", "Web apps", "APIs", "Databases"],
    bullets: [
      "Built breadth across frontend, backend, and databases—comfortable switching tools as constraints change.",
    ],
  },
];

function ExperienceCard({ item }: { item: ExperienceItem }) {
  const Icon = item.icon;

  return (
    <Card className="h-full">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-black dark:text-white">
            <Icon className="h-4 w-4 text-sky-400" />
            {item.org}
          </div>

          {item.label ? <Badge variant="subtle">{item.label}</Badge> : null}
        </div>

        <p className="text-sm text-black/60 dark:text-white/60">{item.role}</p>
      </CardHeader>

      <CardContent>
        <ul className="space-y-2 text-sm text-black/70 dark:text-white/80">
          {item.bullets.map((b) => (
            <li key={b}>• {b}</li>
          ))}
        </ul>

        {item.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((t) => (
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

export default function AboutPage() {
  return (
    <main className="min-h-screen py-16">
      <Container>
        <header className="max-w-5xl">
          <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/60">About</p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black dark:text-white md:text-4xl">
            Jose Rico Suan
          </h1>

          <p className="mt-3 max-w-3xl text-black/70 dark:text-white/80">
            AI-powered full-stack engineer focused on shipping outcomes in real systems: ramp fast by
            learning product flows + code paths, then deliver safe bug fixes, incremental features,
            automation, and reliability upgrades.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              ".NET / ASP.NET",
              "Angular",
              "SQL Server",
              "Selenium (Python)",
              "Azure & AWS",
              "LLM integrations",
            ].map((t) => (
              <Badge key={t} variant="subtle">
                {t}
              </Badge>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/work">
                View Work <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="subtle">
              <Link href="/contact">Contact</Link>
            </Button>

            <Button asChild variant="ghost">
              <a href="/resume.pdf" target="_blank" rel="noreferrer">
                Resume <FileText className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </header>

        <section className="mt-12 grid max-w-5xl gap-6 md:grid-cols-[360px_1fr]">
          {/* Profile */}
          <Card className="cursor-default">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <CardTitle>Profile</CardTitle>

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
                        <h3 className="text-sm font-semibold text-black dark:text-white">Hobbies</h3>
                        <p className="mt-1 text-sm text-black/70 dark:text-white/80">
                          Gym/fitness, tinkering with side projects, and learning new tools fast when there’s
                          a real problem to solve.
                        </p>
                      </section>

                      <section>
                        <h3 className="text-sm font-semibold text-black dark:text-white">Work style</h3>
                        <ul className="mt-2 space-y-2 text-sm text-black/70 dark:text-white/80">
                          <li>• I ask clarifying questions early, then move quickly.</li>
                          <li>• I prefer scoped PRs with clear evidence and rollback options.</li>
                          <li>• I like fixing root causes, not just symptoms.</li>
                        </ul>
                      </section>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <Badge variant="subtle">Outcome-first</Badge>
                      <Badge variant="subtle">Remote-ready</Badge>
                      <Badge variant="subtle">Fast learner</Badge>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>

            <CardContent>
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
                <Badge variant="subtle">Test automation</Badge>
                <Badge variant="subtle">API / SQL</Badge>
                <Badge variant="subtle">Cloud / CI-CD</Badge>
                <Badge variant="subtle">LLM workflows</Badge>
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
                  I like joining real systems—where the codebase already exists, users already have
                  expectations, and delivery still matters. I’m comfortable owning work end-to-end:
                  requirements → implementation → testing → deployment → basic monitoring.
                </p>

                <div>
                  <h3 className="text-sm font-semibold text-black dark:text-white">Ramp-up → Ship loop</h3>
                  <ul className="mt-2 space-y-2 text-sm text-black/70 dark:text-white/80">
                    <li>
                      <span className="font-medium text-black dark:text-white">Understand:</span>{" "}
                      product flows, knowledge base, and key code paths.
                    </li>
                    <li>
                      <span className="font-medium text-black dark:text-white">Stabilize:</span>{" "}
                      fix high-signal issues and reduce friction points.
                    </li>
                    <li>
                      <span className="font-medium text-black dark:text-white">Improve:</span>{" "}
                      add small features + automation that compounds over time.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-black dark:text-white">Primary tools I touch</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="subtle">.NET / ASP.NET</Badge>
                    <Badge variant="subtle">Angular</Badge>
                    <Badge variant="subtle">Laravel</Badge>
                    <Badge variant="subtle">React</Badge>
                    <Badge variant="subtle">SQL Server</Badge>
                    <Badge variant="subtle">Docker</Badge>
                    <Badge variant="subtle">Azure DevOps</Badge>
                    <Badge variant="subtle">Azure App Services</Badge>
                    <Badge variant="subtle">Azure Key Vault</Badge>
                    <Badge variant="subtle">AWS (S3/Lambda/API GW)</Badge>
                    <Badge variant="subtle">JWT Auth</Badge>
                    <Badge variant="subtle">Selenium (Python)</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Selected Experience (no dates, no timeline visuals) */}
        <section className="mt-12 max-w-5xl">
          <Card>
            <CardHeader>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <CardTitle>Selected experience</CardTitle>
                  <p className="mt-2 text-sm text-black/70 dark:text-white/80">
                    Roles and outcomes—focused on what I shipped and how I operate.
                  </p>
                </div>

                <div className="hidden sm:flex gap-2">
                  <Button asChild variant="subtle" className="h-9">
                    <Link href="/work">See case studies</Link>
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {experience.map((item) => (
                  <ExperienceCard key={`${item.org}-${item.role}`} item={item} />
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 sm:hidden">
                <Button asChild variant="subtle">
                  <Link href="/work">See case studies</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
