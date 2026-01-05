// src/app/contact/page.tsx
import Link from "next/link";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <main className="min-h-screen py-16">
    <Container>
        <header className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Contact
          </h1>
          <p className="mt-3 text-white/80">
            Let’s talk about your project, migration, or QA strategy.
          </p>
        </header>

        <section className="mt-10 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Quickest way to reach me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/80">
                For now, email is best while we wire up the form endpoint.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a href="mailto:hello@example.com">Email me</a>
                </Button>

                <Button asChild variant="subtle">
                  <Link href="/work">View work</Link>
                </Button>
              </div>

              <p className="mt-6 text-xs text-white/60">
                (We’ll replace this with a Formspree/Resend form next.)
              </p>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
