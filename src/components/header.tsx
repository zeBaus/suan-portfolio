// src/components/header.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun, Monitor } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

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
      href={href as any}
      onClick={onClick}
      className={cn(
        "text-sm transition-colors underline-offset-4",
        isActive
          ? "text-black dark:text-white underline"
          : "text-black/70 hover:text-black dark:text-white/75 dark:hover:text-white"
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

  React.useEffect(() => setMounted(true), []);

  // Close menu on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function cycleTheme() {
    const next = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
    setTheme(next);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[var(--bg)]/70 backdrop-blur dark:border-white/10">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="font-semibold tracking-tight text-black dark:text-white">
          Jose Rico Suan
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink href="/work">Work</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>

          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-xl border transition",
              "border-black/10 bg-black/[0.03] text-black/80 hover:bg-black/[0.06]",
              "dark:border-white/15 dark:bg-white/5 dark:text-white/85 dark:hover:bg-white/10"
            )}
            aria-label="Toggle theme"
            onClick={cycleTheme}
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

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-xl border transition",
              "border-black/10 bg-black/[0.03] text-black/80 hover:bg-black/[0.06]",
              "dark:border-white/15 dark:bg-white/5 dark:text-white/85 dark:hover:bg-white/10"
            )}
            aria-label="Toggle theme"
            onClick={cycleTheme}
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
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-xl border transition",
              "border-black/10 bg-black/[0.03] text-black/80 hover:bg-black/[0.06]",
              "dark:border-white/15 dark:bg-white/5 dark:text-white/85 dark:hover:bg-white/10"
            )}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {/* Mobile panel */}
      {open ? (
        <div className="border-t border-black/10 bg-[var(--bg)]/85 backdrop-blur dark:border-white/10 md:hidden">
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
