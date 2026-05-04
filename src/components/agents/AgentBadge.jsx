"use client";

import { cn } from "@/lib/utils";

export default function AgentBadge({ type, color, size = "sm" }) {
  const sizes = {
    sm: "px-2.5 py-0.5 text-[11px]",
    md: "px-3 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "rounded-full font-mono font-medium tracking-wide",
        sizes[size]
      )}
      style={{
        background: `${color}15`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      {type}
    </span>
  );
}
