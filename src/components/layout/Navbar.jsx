"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiSwordLine,
  RiTrophyLine,
  RiUser3Line,
  RiWallet3Line,
  RiArrowLeftRightLine,
  RiMenu4Line,
  RiCloseLine,
  RiHome4Line,
} from "react-icons/ri";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home", icon: RiHome4Line },
  { href: "/arena", label: "Arena", icon: RiSwordLine },
  { href: "/compare", label: "Compare", icon: RiArrowLeftRightLine },
  { href: "/leaderboard", label: "Board", icon: RiTrophyLine },
];

export default function Navbar() {
  const pathname = usePathname();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] pt-4 px-4 pointer-events-none">
        <motion.div
          className={cn(
            "max-w-5xl mx-auto rounded-2xl flex flex-col pointer-events-auto transition-all duration-500",
            isScrolled || mobileMenuOpen
              ? "bg-[#0A0B14]/85 backdrop-blur-2xl border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-transparent border border-transparent"
          )}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between h-14 px-4 sm:px-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
             <Image src="/logo.png" alt="Taskora Logo" width={140} height={50} />
            </Link>

            {/* Desktop Nav — Centered Pill */}
            <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 bg-white/[0.03] border border-white/[0.05] rounded-xl p-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href ||
                      pathname?.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative group px-3.5 py-2 rounded-lg"
                  >
                    <span
                      className={cn(
                        "relative z-10 flex items-center gap-1.5 text-sm font-medium transition-colors duration-300",
                        isActive
                          ? "text-white"
                          : "text-white/45 group-hover:text-white/80"
                      )}
                    >
                      <link.icon className={cn("text-[15px]", isActive ? "text-[#8B5CF6]" : "")} />
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-lg -z-0"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {isConnected && (
                <Link
                  href="/profile"
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white/45 hover:text-white hover:bg-white/[0.05] transition-all"
                >
                  <RiUser3Line />
                  Profile
                </Link>
              )}
              
              <button
                onClick={() => open()}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer",
                  isConnected
                    ? "bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#A78BFA] hover:bg-[#8B5CF6]/15 hover:border-[#8B5CF6]/30"
                    : "bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white hover:opacity-90 shadow-lg shadow-[#8B5CF6]/20"
                )}
              >
                <RiWallet3Line className="text-base" />
                <span className="font-mono text-xs sm:text-sm">
                  {isConnected ? truncatedAddress : "Connect"}
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                {mobileMenuOpen ? (
                  <RiCloseLine className="text-xl" />
                ) : (
                  <RiMenu4Line className="text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Fullscreen Menu Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden overflow-hidden border-t border-white/[0.05] bg-[#0A0B14]/95 backdrop-blur-2xl rounded-b-2xl"
              >
                <div className="flex flex-col p-4 gap-2">
                  {[...navLinks, { href: "/profile", label: "Profile", icon: RiUser3Line }].map((link, i) => {
                    if (link.href === "/profile" && !isConnected) return null;
                    
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname === link.href ||
                          pathname?.startsWith(link.href + "/");

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-xl text-lg font-medium transition-colors",
                            isActive
                              ? "bg-[#8B5CF6]/10 text-white border border-[#8B5CF6]/15"
                              : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                          )}
                        >
                          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", isActive ? "bg-[#8B5CF6]/20 text-[#A78BFA]" : "bg-white/[0.04]")}>
                             <link.icon className="text-xl" />
                          </div>
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>
      
      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </>
  );
}
