"use client";

import { cn } from "@/lib/utils";

export default function GradientButton({
  children,
  className,
  variant = "primary",
  size = "md",
  disabled,
  ...props
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-[#7c75ff] to-[#4a9eff] text-white hover:opacity-90 shadow-lg shadow-[#7c75ff]/20",
    gold: "bg-gradient-to-r from-[#f7c94b] to-[#ffad3b] text-[#080a12] hover:opacity-90 shadow-lg shadow-[#f7c94b]/20",
    outline:
      "bg-transparent border border-white/10 text-white hover:border-white/20 hover:bg-white/[0.04]",
    ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/[0.04]",
    danger:
      "bg-gradient-to-r from-[#ff6b5b] to-[#ff4444] text-white hover:opacity-90 shadow-lg shadow-[#ff6b5b]/20",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-sm rounded-xl",
    lg: "px-8 py-4 text-base rounded-xl",
    xl: "px-10 py-5 text-lg rounded-2xl",
  };

  return (
    <button
      className={cn(
        "font-semibold transition-all duration-300 cursor-pointer",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:opacity-40",
        "active:scale-[0.97]",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
