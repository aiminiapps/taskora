"use client";

import { cn } from "@/lib/utils";

export default function AgentAvatar({
  slug,
  emoji,
  color,
  size = "md",
  isWinner = false,
  className,
}) {
  const sizes = {
    sm: "w-8 h-8 text-base",
    md: "w-12 h-12 text-xl",
    lg: "w-16 h-16 text-2xl",
    xl: "w-20 h-20 text-3xl",
  };

  return (
    <div
      className={cn(
        "relative rounded-full flex items-center justify-center",
        "transition-all duration-500",
        sizes[size],
        isWinner && "animate-pulse-glow",
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${color}20, ${color}10)`,
        boxShadow: isWinner
          ? `0 0 30px ${color}40, 0 0 60px ${color}15`
          : `0 0 20px ${color}15`,
        border: `2px solid ${color}${isWinner ? "80" : "40"}`,
      }}
    >
      <span className="select-none">{emoji}</span>
      {isWinner && (
        <div
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
          style={{ background: "#f7c94b" }}
        >
          👑
        </div>
      )}
    </div>
  );
}
