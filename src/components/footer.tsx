// src/components/footer.tsx
import Link from "next/link";
import Container from "@/components/container";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/15 px-6 py-10 md:px-10 lg:px-16">
      <Container className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} Jose Rico Suan. All rights reserved.
        </p>

        <nav className="flex flex-wrap items-center gap-6 text-sm">
          <Link href="/work" className="text-white/75 hover:text-white">
            Work
          </Link>
          <Link href="/#about" className="text-white/75 hover:text-white">
            About
          </Link>
          <Link href="/contact" className="text-white/75 hover:text-white">
            Contact
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
