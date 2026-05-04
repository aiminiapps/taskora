"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  RiSwordLine,
  RiTrophyLine,
  RiArrowRightLine,
  RiFlashlightLine,
  RiRobot2Line,
  RiDatabase2Line,
  RiLineChartLine,
} from "react-icons/ri";
import GradientButton from "@/components/ui/GradientButton";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// Real Crypto Logos for the infinite ticker
const cryptoLogos = [
  { name: "Bitcoin", url: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029" },
  { name: "Ethereum", url: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029" },
  { name: "BNB", url: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=029" },
  { name: "Solana", url: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=029" },
  { name: "Arbitrum", url: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=029" },
  { name: "Polygon", url: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029" },
  { name: "Chainlink", url: "https://cryptologos.cc/logos/chainlink-link-logo.svg?v=029" },
  { name: "Polkadot", url: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=029" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24 h-fit">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] shadow-[0_0_20px_rgba(247,201,75,0.05)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f7c94b] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f7c94b]"></span>
              </span>
              <span className="text-xs font-medium text-white/80 tracking-wide">
                The Ultimate AI Investment Arena
              </span>
            </div>
          </motion.div>

          {/* Headline - Simplified & Premium */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-white"
          >
            Smarter Crypto Investing with {" "}
            <span className="text-[#7c75ff]">
              AI Intelligence
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-sm sm:text-lg text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed font-light text-balance"
          >
            Submit your token. Watch three elite AI agents analyze the fundamentals, 
            debate the risks, and deliver the ultimate investment verdict.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-20"
          >
            <Link href="/arena">
              <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-semibold text-base transition-transform hover:scale-[1.02] active:scale-[0.98]">
                <RiSwordLine className="text-xl" />
                Enter the Arena
                <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 ring-offset-2 ring-offset-[#0b0c12] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>
            <Link href="/leaderboard">
              <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-white font-medium text-base hover:bg-white/[0.08] transition-colors">
                <RiTrophyLine className="text-xl text-white/50 group-hover:text-white transition-colors" />
                View Leaderboard
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Infinite Logo Ticker ── */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="max-w-7xl mx-auto px-4 overflow-hidden relative pb-10"
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080a12] to-transparent z-10 rounded-l-2xl" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080a12] to-transparent z-10 rounded-r-2xl" />
          
          <div className="flex gap-12 sm:gap-24 animate-marquee whitespace-nowrap items-center w-max">
            {[...cryptoLogos, ...cryptoLogos].map((logo, i) => (
              <div key={i} className="flex items-center mt-9 gap-3 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <img src={logo.url} alt={logo.name} className="w-8 h-8 object-contain" />
                <span className="text-sm font-semibold text-white/80">{logo.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tailwind Animation for Marquee */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}
