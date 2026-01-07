// src/app/not-found.tsx
import Link from "next/link";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="min-h-screen py-16">
      <Container>
        <div className="max-w-2xl">
          <Card>
            <CardHeader className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/60">
                404
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white md:text-4xl">
                Page not found
              </h1>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-black/70 dark:text-white/80">
                The page you’re looking for doesn’t exist (or it moved).
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/">Go home</Link>
                </Button>

                <Button asChild variant="subtle">
                  <Link href="/work">View work</Link>
                </Button>

                <Button asChild variant="ghost">
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>

              <p className="text-xs text-black/50 dark:text-white/60">
                If you followed a link from a case study, the slug may have changed.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
}
