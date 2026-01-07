// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classNames safely.
 * (Standard shadcn/ui utility)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Consistent link styling used across the site (Header/Footer/inline links).
 * Keep these centralized so hover/underline behavior stays identical.
 */
export const linkStyles = {
  base: "underline-offset-4 transition-colors",
  nav: "text-sm",
  inactive:
    "text-black/70 hover:text-black hover:underline dark:text-white/75 dark:hover:text-white",
  active: "text-black dark:text-white underline",
  external:
    "text-black/70 hover:text-black hover:underline dark:text-white/75 dark:hover:text-white",
} as const;

/**
 * For nav links where you want an active state.
 */
export function navLinkClass(isActive: boolean, className?: string) {
  return cn(
    linkStyles.nav,
    linkStyles.base,
    isActive ? linkStyles.active : linkStyles.inactive,
    className
  );
}

/**
 * For simple external links (e.g., resume.pdf) that should match nav styling.
 */
export function externalLinkClass(className?: string) {
  return cn(linkStyles.nav, linkStyles.base, linkStyles.external, className);
}
