"use client";

import { cn } from "@/lib/utils";

export default function LoadingSpinner({ color = "#7c75ff", size = "md", className }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={cn("relative", sizes[size], className)}
      role="status"
      aria-label="Loading"
    >
      <svg
        className="animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeOpacity="0.2"
          strokeWidth="3"
        />
        <path
          d="M12 2C6.48 2 2 6.48 2 12"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
