// src/app/contact/page.tsx
import Link from "next/link";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, FileText, Mail, Phone } from "lucide-react";

function InfoRow({
  icon: Icon,
  label,
  value,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-black/[0.02] p-3 dark:border-white/15 dark:bg-white/[0.03]">
      <div className="flex min-w-0 items-center gap-3">
        <Icon className="h-4 w-4 text-sky-400" />
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-wide text-black/50 dark:text-white/60">
            {label}
          </div>
          <div className="truncate font-medium text-black dark:text-white">{value}</div>
        </div>
      </div>

      <div className="shrink-0">{action}</div>
    </div>
  );
}

export default function ContactPage() {
  const email = "jrmsuan2000@gmail.com";
  const phoneDisplay = "+63 995 631 8622";
  const phoneTel = "+639956318622";

  const emailHref = `mailto:${email}?subject=${encodeURIComponent(
    "Portfolio inquiry"
  )}&body=${encodeURIComponent("Hi Rico,\n\nContext:\nStack:\nWhat success looks like:\n\n—")}`;

  return (
    <main className="min-h-screen py-16">
      <Container>
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/60">
            Contact
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black dark:text-white md:text-4xl">
            Let’s talk
          </h1>

          <p className="mt-3 max-w-2xl text-black/70 dark:text-white/80">
            If you need someone who can ramp up fast, navigate a real codebase, and ship safe
            improvements—bug fixes, features, automation, and reliability upgrades—reach out.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Badge variant="subtle">Open to remote roles</Badge>
            <Badge variant="subtle">Cebu, PH (UTC+8)</Badge>
            <Badge variant="subtle">Outcome-first delivery</Badge>
          </div>
        </header>

        <section className="mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
          {/* Primary contact */}
          <Card>
            <CardHeader>
              <CardTitle>Quickest way to reach me</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm leading-relaxed text-black/70 dark:text-white/80">
                Email is best. If you prefer a quick call, my PH number is below.
              </p>

              <div className="mt-5 space-y-3 text-sm">
                <InfoRow
                  icon={Mail}
                  label="Email"
                  value={email}
                  action={
                    <Button asChild variant="subtle" className="h-9">
                      <a href={emailHref}>Email</a>
                    </Button>
                  }
                />

                <InfoRow
                  icon={Phone}
                  label="Phone"
                  value={phoneDisplay}
                  action={
                    <Button asChild variant="ghost" className="h-9">
                      <a href={`tel:${phoneTel}`}>Call</a>
                    </Button>
                  }
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/work">
                    View Work <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild variant="subtle">
                  <a href="/resume.pdf" target="_blank" rel="noreferrer">
                    Resume <FileText className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <p className="mt-4 text-xs text-black/50 dark:text-white/60">
                Tip: a short “context + constraint + success criteria” email gets the fastest, most useful reply.
              </p>
            </CardContent>
          </Card>

          {/* What to include */}
          <Card>
            <CardHeader>
              <CardTitle>What to send</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm leading-relaxed text-black/70 dark:text-white/80">
                To make the first reply fast and useful, include:
              </p>

              <ul className="mt-4 space-y-2 text-sm text-black/70 dark:text-white/80">
                <li>• What you’re building / maintaining (product + constraints)</li>
                <li>• Stack + repo context (if shareable)</li>
                <li>• Target schedule + what “success” looks like</li>
                <li>• Biggest pain: bugs, velocity, QA, CI/CD, legacy cleanup</li>
              </ul>

              <div className="mt-5 rounded-2xl border border-black/10 bg-black/[0.02] p-4 text-sm text-black/70 dark:border-white/15 dark:bg-white/[0.03] dark:text-white/80">
                I’m comfortable starting with a small scoped task to prove fit:
                identify the code paths → propose approach → ship a safe PR.
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild variant="ghost">
                  <Link href="/about">More about how I work</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
