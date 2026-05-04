"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function ScoreBar({
  value = 0,
  max = 100,
  color = "#7c75ff",
  height = "h-2",
  showLabel = false,
  label,
  className,
  animated = true,
}) {
  const barRef = useRef(null);
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    if (animated && barRef.current) {
      barRef.current.style.width = "0%";
      requestAnimationFrame(() => {
        if (barRef.current) {
          barRef.current.style.width = `${percentage}%`;
        }
      });
    }
  }, [percentage, animated]);

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-mono text-muted-foreground">
            {label}
          </span>
          <span className="text-xs font-mono" style={{ color }}>
            {value.toFixed?.(1) ?? value}
            {max === 100 ? "%" : ` / ${max}`}
          </span>
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full overflow-hidden bg-white/[0.06]",
          height
        )}
      >
        <div
          ref={barRef}
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animated ? "0%" : `${percentage}%`,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            boxShadow: `0 0 12px ${color}40`,
          }}
        />
      </div>
    </div>
  );
}
