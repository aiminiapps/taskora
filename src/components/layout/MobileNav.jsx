"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppKitAccount } from "@reown/appkit/react";
import {
  RiSwordLine,
  RiTrophyLine,
  RiHome4Line,
  RiUser3Line,
  RiArrowLeftRightLine,
} from "react-icons/ri";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const pathname = usePathname();
  const { isConnected } = useAppKitAccount();

  const navItems = [
    { href: "/", label: "Home", icon: RiHome4Line },
    { href: "/arena", label: "Arena", icon: RiSwordLine },
    { href: "/compare", label: "Compare", icon: RiArrowLeftRightLine },
    { href: "/leaderboard", label: "Board", icon: RiTrophyLine },
    { href: "/profile", label: "Profile", icon: RiUser3Line },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-strong border-t border-white/[0.06]">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href ||
                pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px] relative",
                isActive
                  ? "text-[#7c75ff]"
                  : "text-white/40 hover:text-white/60"
              )}
            >
              <item.icon className="text-xl" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute -top-0.5 w-8 h-0.5 rounded-full bg-[#7c75ff]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
