"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiArrowRightLine } from "react-icons/ri";

export default function BottomCTASection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[32px] bg-[#0C0D18]/60 border border-white/[0.06] overflow-hidden p-12 sm:p-16 lg:p-20 text-center"
        >
          {/* Decorative ambient blurs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#8B5CF6]/8 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#22D3EE]/6 blur-[80px] rounded-full pointer-events-none" />

          {/* Subtle dot grid */}
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #8B5CF6 1px, transparent 0)", backgroundSize: "32px 32px" }} 
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-[1.15] tracking-tight">
              Ready to enter
              <br />
              <span className="text-gradient-brand">the intelligence arena?</span>
            </h2>
            <p className="text-white/35 text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              Join smart traders leveraging multi-agent AI consensus to navigate crypto markets with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/arena">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-semibold text-sm hover:shadow-[0_8px_40px_rgba(139,92,246,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 group">
                  Get Started
                  <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="https://orkestri-ai.gitbook.io/orkestri-ai-docs" target="_blank">
                <button className="px-8 py-4 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/70 font-medium text-sm hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300">
                  View Documentation
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
