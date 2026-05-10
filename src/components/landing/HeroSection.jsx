"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  RiSwordLine,
  RiArrowRightLine,
  RiSparklingLine,
} from "react-icons/ri";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-44 sm:pb-32  flex items-center">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-6xl md:text-[4.5rem] font-bold tracking-tight leading-[1.08] mb-7 text-white"
          >
            Smarter{" "}
            <RiSparklingLine className="inline-block text-[#8B5CF6] align-middle mx-1" />
            {" "}Crypto Investing.
            <br />
            <span className="text-gradient-brand">
              AI Intelligence.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-base sm:text-lg text-white/40 max-w-2xl mx-auto mb-14 leading-relaxed font-light text-balance"
          >
            Submit your token. Watch three elite AI agents analyze the fundamentals, 
            debate the risks, and deliver the ultimate investment verdict.
          </motion.p>

          {/* CTA Buttons — MindWaves style */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <Link href="/arena">
              <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-semibold text-base transition-all duration-300 hover:shadow-[0_8px_40px_rgba(139,92,246,0.35)] hover:scale-[1.02] active:scale-[0.98]">
                <RiSwordLine className="text-lg" />
                Enter the Arena
                <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="#features">
              <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-medium text-base hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300">
                Explore
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
