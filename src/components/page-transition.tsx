// src/components/page-transition.tsx
"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Re-mount on route change so the CSS animation replays
  return (
    <div key={pathname} className="page-fade-in">
      {children}
    </div>
  );
}
