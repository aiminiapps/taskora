"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

export default function AboutSection() {
  return (
    <section className="py-28 sm:py-36 relative overflow-hidden">
      {/* Ambient subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {/* Decorative floating elements */}
          <motion.div 
            variants={fadeUp} 
            custom={0}
            className="flex items-center justify-center gap-6 mb-10"
          >
            {/* Left avatar cluster */}
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6]/30 to-[#8B5CF6]/10 border-2 border-[#07080F] flex items-center justify-center">
                <span className="text-sm">🔬</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FB923C]/30 to-[#FB923C]/10 border-2 border-[#07080F] flex items-center justify-center">
                <span className="text-sm">📈</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22D3EE]/30 to-[#22D3EE]/10 border-2 border-[#07080F] flex items-center justify-center">
                <span className="text-sm">🛡️</span>
              </div>
            </div>
            
            {/* Decorative line */}
            <div className="w-12 h-px bg-gradient-to-r from-[#8B5CF6]/30 to-transparent hidden sm:block" />
          </motion.div>

          {/* Main Quote-Style Headline */}
          <motion.p 
            variants={fadeUp} 
            custom={1}
            className="text-xl sm:text-2xl md:text-3xl text-white/70 leading-relaxed sm:leading-relaxed font-light max-w-3xl mx-auto text-balance"
          >
            From <span className="text-white font-medium">fundamental research</span> to{" "}
            <span className="text-white font-medium">real-time verdicts</span> —
            <br className="hidden sm:block" />
            Taskora adapts to your tokens, giving your portfolio{" "}
            <span className="text-gradient-brand font-semibold">exactly what it needs</span>, 
            when it needs it.
          </motion.p>

          {/* Floating decoration */}
          <motion.div 
            variants={fadeUp} 
            custom={2}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
