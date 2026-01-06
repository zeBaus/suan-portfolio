// src/components/footer.tsx
import Link from "next/link";
import Container from "@/components/container";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-black/10 py-10 dark:border-white/10">
      <Container className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-black/60 dark:text-white/60">
          © {new Date().getFullYear()} Jose Rico Suan. All rights reserved.
        </p>

        <nav className="flex flex-wrap items-center gap-6 text-sm">
          <Link href="/work" className="text-black/70 hover:text-black dark:text-white/75 dark:hover:text-white">
            Work
          </Link>
          <Link href="/#about" className="text-black/70 hover:text-black dark:text-white/75 dark:hover:text-white">
            About
          </Link>
          <Link href="/contact" className="text-black/70 hover:text-black dark:text-white/75 dark:hover:text-white">
            Contact
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
