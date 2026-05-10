"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiArrowRightLine } from "react-icons/ri";

export default function BottomCTASection() {
  return (
    <section className="py-16 relative overflow-hidden bg-[#07080F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2rem] bg-[#11121A] border border-white/[0.03] overflow-hidden p-16 sm:p-24 text-center"
        >
          {/* Massive top-edge radial glow matching the reference image */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] sm:h-[500px] bg-[radial-gradient(ellipse_at_top,#fc7b43_0%,transparent_60%)] opacity-20 pointer-events-none" />

          {/* Subtle noise/dot overlay to keep it premium */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} 
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium text-white mb-6 leading-[1.1] tracking-tight">
              Ready to enter
              <br />
              the intelligence arena?
            </h2>
            <p className="text-white/40 text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto font-light">
              Join smart traders leveraging multi-agent AI consensus to navigate crypto markets with absolute confidence.
            </p>
            
            <div className="flex justify-center">
              <Link href="/arena">
                <button className="relative group inline-flex p-[3px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                  {/* Spinning Multi-Color Gradient Border on Hover */}
                  <span className="absolute inset-[-1000%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fc7b43_0%,#f7c94b_20%,#2dd4a0_40%,#3b82f6_60%,#8B5CF6_80%,#fc7b43_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Default subtle inner border for non-hover state */}
                  <span className="absolute inset-0 rounded-xl border border-white/20 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />

                  {/* Button Inner Body (Orange) */}
                  <span className="relative flex items-center gap-2 px-8 py-4 bg-[#fc7b43] text-white font-semibold text-[15px] rounded-xl z-10">
                    Get Started
                    <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

