// src/components/header.tsx
"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import * as React from "react";
import Container from "@/components/container";
import { cn } from "@/lib/utils";

type AppRoute = "/" | "/work" | "/about" | "/contact";

function NavLink({
  href,
  children,
  onClick,
}: {
  href: AppRoute;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-sm transition-colors",
        isActive ? "text-white" : "text-white/75 hover:text-white"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
    setMounted(true);
    }, []);

    // Close menu on route change
    React.useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--bg)]/70 backdrop-blur">
        <Container className="flex items-center justify-between py-4">
            <Link href="/" className="font-semibold tracking-tight text-white">
            Jose Rico Suan
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-6 md:flex">
            <NavLink href="/work">Work</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/85 hover:bg-white/10"
                aria-label="Toggle theme"
                onClick={() => {
                    // cycle: dark -> light -> system -> dark
                    const next = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
                    setTheme(next);
                }}
                >
                {!mounted ? null : theme === "dark" ? (
                    <Moon size={18} />
                ) : theme === "light" ? (
                    <Sun size={18} />
                ) : (
                    <Monitor size={18} />
                )}
            </button>

            </nav>
            {/* Mobile menu button */}
            <button
                type="button"
                className="mr-2 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/85 hover:bg-white/10 md:hidden"
                aria-label="Toggle theme"
                onClick={() => {
                    const next = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
                    setTheme(next);
                }}
                >
                {!mounted ? null : theme === "dark" ? (
                    <Moon size={18} />
                ) : theme === "light" ? (
                    <Sun size={18} />
                ) : (
                    <Monitor size={18} />
                )}
            </button>

            <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/85 hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            >
            {open ? <X size={18} /> : <Menu size={18} />}
            </button>
        </Container>

        {/* Mobile panel */}
        {open ? (
            <div className="border-t border-white/10 bg-[var(--bg)]/85 backdrop-blur md:hidden animate-in fade-in slide-in-from-top-1">
            <Container className="flex flex-col gap-4 py-4">
                <NavLink href="/work" onClick={() => setOpen(false)}>
                Work
                </NavLink>
                <NavLink href="/about" onClick={() => setOpen(false)}>
                About
                </NavLink>
                <NavLink href="/contact" onClick={() => setOpen(false)}>
                Contact
                </NavLink>
            </Container>
            </div>
        ) : null}
        </header>
    );
}
