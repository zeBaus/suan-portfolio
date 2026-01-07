// src/components/footer.tsx
import Link from "next/link";
import Container from "@/components/container";
import { externalLinkClass, linkStyles, cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-black/10 py-10 dark:border-white/10">
      <Container className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-black/60 dark:text-white/60">
          © {new Date().getFullYear()} Jose Rico Suan. All rights reserved.
        </p>

        <nav className="flex flex-wrap items-center gap-6">
          <Link href="/work" className={cn(linkStyles.nav, linkStyles.base, linkStyles.inactive)}>
            Work
          </Link>
          <Link href="/about" className={cn(linkStyles.nav, linkStyles.base, linkStyles.inactive)}>
            About
          </Link>
          <Link href="/contact" className={cn(linkStyles.nav, linkStyles.base, linkStyles.inactive)}>
            Contact
          </Link>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className={externalLinkClass()}>
            Resume
          </a>
        </nav>
      </Container>
    </footer>
  );
}
