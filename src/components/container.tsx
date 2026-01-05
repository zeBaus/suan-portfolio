
// src/components/container.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("max-w-[1440px] mx-auto px-8", className)}>
      {children}
    </div>
  );
}
