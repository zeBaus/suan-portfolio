// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
    return (
        <main className="min-h-screen px-6 py-16 md:px-10 lg:px-16">
        {/* Hero */}
        <section className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Adaptable full-stack engineer. Fast learner. Outcome-first.
            </h1>
            <p className="mt-4 text-lg text-black/70">
            I build clean, fast products across web stacks—shifting tools as needed.
            From .NET/Angular and Laravel/React to automation and DevOps, I ramp quickly,
            ship reliably, and keep the focus on results over buzzwords.
            </p>
            <div className="mt-8 flex gap-4">
            <Link
                href="/work"
                className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-black/5"
            >
                View Work
            </Link>
            <Link
                href="#contact"
                className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-black/5"
            >
                Get in Touch
            </Link>
            </div>
        </section>

        {/* Highlights */}
        <section className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
            {
                title: "Quick-learning & Adaptability",
                desc: "Comfortable moving between .NET/ASP.NET, Angular, Laravel, React, and Kotlin/Android when needed."
            },
            {
                title: "Full-stack + DevOps",
                desc: "API design and SQL Server expertise, Dockerized deployments, Azure DevOps CI/CD, secure JWT auth."
            },
            {
                title: "Quality & Automation",
                desc: "Pragmatic testing and scripting (incl. Selenium), observability-minded workflows, reliable releases."
            }
            ].map((item) => (
            <article key={item.title} className="rounded-2xl border p-5">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-black/70">{item.desc}</p>
            </article>
            ))}
        </section>
        </main>
    );
}
