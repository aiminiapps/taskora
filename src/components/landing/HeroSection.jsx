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
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-44 sm:pb-32 h-fit flex items-center">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <motion.div
          className="text-center max-w-[56rem] mx-auto"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-[2.75rem] sm:text-6xl md:text-[5.5rem] font-medium tracking-tight leading-[1.1] mb-8 text-white"
          >
            Smarter
            <span className="inline-flex items-center justify-center w-14 h-14 sm:w-[76px] sm:h-[76px] rounded-[20px] sm:rounded-[28px] bg-gradient-to-b from-[#1C1E2A] to-[#0A0B14] border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_12px_40px_rgba(0,0,0,0.6)] mx-3 sm:mx-5 align-middle -translate-y-1 sm:-translate-y-2 transition-transform duration-500 hover:scale-[1.05]">
              <RiSparklingLine className="text-[1.75rem] sm:text-[44px] text-[#fc7b43]" />
            </span>
            Crypto Investing
            <br />
            AI Intelligence.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-[1.05rem] sm:text-xl text-white/50 max-w-3xl mx-auto mb-14 leading-relaxed font-light text-balance"
          >
            Submit your token. Watch three elite AI agents analyze the fundamentals, 
            debate the risks, and deliver the ultimate investment verdict.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link href="/arena" className="w-full sm:w-auto">
              <button className="group relative inline-flex items-center justify-center p-[2px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto ">
                {/* Moving Gradient Border */}
                <span className="absolute inset-0 bg-[linear-gradient(90deg,#fc7b43,#ffb088,#fc7b43,#ffb088)] bg-[length:300%_100%] animate-[shimmer_3s_linear_infinite] group-hover:animate-[shimmer_1.5s_linear_infinite]" />
                
                {/* Inner Content */}
                <span className="relative flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-xl bg-gradient-to-b from-[#1C1E2A] to-[#0A0B14] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-white font-medium text-[1.05rem] sm:text-lg w-full h-full transition-all duration-300 group-hover:from-[#252838] group-hover:to-[#10121C]">
                  <RiSwordLine className="text-xl sm:text-[1.35rem] text-[#fc7b43] drop-shadow-[0_0_8px_rgba(252,123,67,0.6)]" />
                  <span className="tracking-wide">Enter the Arena</span>
                  <RiArrowRightLine className="text-xl sm:text-[1.35rem] text-white/40 group-hover:text-[#fc7b43] group-hover:translate-x-1 transition-all" />
                </span>
              </button>
            </Link>
            
            <Link href="#features" className="w-full sm:w-auto">
              <button className="group relative inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 rounded-xl bg-[#E8EAF0] text-[#07080F] font-medium text-[1.05rem] sm:text-lg transition-all duration-300 shadow-[inset_0_-3px_10px_rgba(0,0,0,0.06),0_4px_20px_rgba(255,255,255,0.03)] hover:bg-white hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto">
                Explore
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
