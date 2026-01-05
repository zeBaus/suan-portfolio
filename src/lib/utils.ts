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
