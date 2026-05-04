"use client";

import { cn } from "@/lib/utils";

export default function GlassCard({
  children,
  className,
  variant = "default",
  hover = true,
  glow,
  ...props
}) {
  return (
    <div
      className={cn(
        "glass-card p-6",
        variant === "strong" && "glass-strong",
        variant === "subtle" && "glass-subtle",
        hover && "transition-all duration-300 hover:border-white/[0.14]",
        glow === "research" && "glow-research",
        glow === "market" && "glow-market",
        glow === "risk" && "glow-risk",
        glow === "winner" && "glow-winner",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
