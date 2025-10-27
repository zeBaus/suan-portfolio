// src/components/header.tsx
import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-[var(--bg)]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
            <Link href="/" className="font-semibold tracking-tight">
            Jose Rico Suan
            </Link>

            <nav className="flex items-center gap-6 text-sm">
            <Link href="/work" className="opacity-80 hover:opacity-100">
                Work
            </Link>
            <Link href="/#about" className="opacity-80 hover:opacity-100">
                About
            </Link>
            <Link href="/#contact" className="opacity-80 hover:opacity-100">
                Contact
            </Link>
            </nav>
        </div>
        </header>
    );
}
