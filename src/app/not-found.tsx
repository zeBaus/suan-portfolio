// src/app/not-found.tsx
import Link from "next/link";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen py-16">
        <Container>
            <div className="max-w-2xl">
                <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Page not found
                </h1>
                <p className="mt-3 text-white/80">
                The page you’re looking for doesn’t exist (or it moved).
                </p>

                <div className="mt-8 flex gap-4">
                <Button asChild>
                    <Link href="/">Go home</Link>
                </Button>
                <Button asChild variant="subtle">
                    <Link href="/work">View work</Link>
                </Button>
                </div>
            </div>
        </Container>
    </main>
  );
}
