"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  RiFundsLine, 
  RiNodeTree, 
  RiSearchLine,
  RiCpuLine,
  RiShieldCheckLine,
} from "react-icons/ri";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FeaturesBentoSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#07080F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2 
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.12] mb-6 text-white"
          >
            Everything you need
            <br />
            <span className="">for your perfect state</span>
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="text-base sm:text-lg text-balance text-white/35 leading-relaxed max-w-2xl mx-auto font-light"
          >
            Taskora combines AI-driven intelligent analysis with
            an effortless experience so you can focus on what matters.
          </motion.p>
        </motion.div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          
          {/* Left Column (2 Stacked Cards) */}
          <div className="flex flex-col gap-5 lg:gap-6">
            
            {/* Left Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-[#11121A] rounded-2xl p-8 flex-1 border border-white/[0.03] hover:border-white/[0.1] transition-all duration-500 group relative overflow-hidden flex flex-col justify-center min-h-[220px]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#fc7b43]/0 group-hover:bg-[#fc7b43]/10 blur-[50px] rounded-full transition-all duration-700 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-[#fc7b43]/10 border border-[#fc7b43]/20 flex items-center justify-center mb-5 shadow-[0_0_15px_rgba(252,123,67,0.1)]">
                  <RiNodeTree className="text-[#fc7b43] text-lg" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2 tracking-tight">Interactive Canvas</h3>
                <p className="text-white/40 text-[13px] sm:text-sm leading-relaxed font-light">
                  Experience AI analyses mapped in a dynamic node tree, linking research logic directly to conclusions for ultimate clarity.
                </p>
              </div>
            </motion.div>

            {/* Left Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-[#11121A] rounded-2xl p-8 flex-1 border border-white/[0.03] hover:border-white/[0.1] transition-all duration-500 group relative overflow-hidden flex flex-col justify-center min-h-[220px]"
            >
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#fc7b43]/0 group-hover:bg-[#fc7b43]/10 blur-[50px] rounded-full transition-all duration-700 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-[#fc7b43]/10 border border-[#fc7b43]/20 flex items-center justify-center mb-5 shadow-[0_0_15px_rgba(252,123,67,0.1)]">
                  <RiShieldCheckLine className="text-[#fc7b43] text-lg" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2 tracking-tight">Seamless Web3 Integration</h3>
                <p className="text-white/40 text-[13px] sm:text-sm leading-relaxed font-light">
                  Connect instantly and securely across the BNB ecosystem. Zero friction, total control over your digital assets.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Center Column (Tall Card with Agent Image & Floating Badges) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-[#11121A] rounded-2xl border border-white/[0.03] relative overflow-hidden min-h-[450px] lg:min-h-full group hover:border-white/[0.1] transition-all duration-500 flex flex-col"
          >
            {/* Background glow matching the vibe in the image */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#fc7b43]/10 to-[#11121A] opacity-60 pointer-events-none" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#fc7b43]/20 blur-[80px] rounded-full pointer-events-none" />
            
            {/* Tiled Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Center Image */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-[-40px]">
              <Image src="/agent.png" alt="TSKR Agent" width={220} height={220} className="object-contain drop-shadow-[0_0_40px_rgba(252,123,67,0.25)] transition-transform duration-700 group-hover:scale-105" />
            </div>

            {/* Floating Badges */}
            <div className="absolute top-[20%] left-4 sm:left-8 bg-gradient-to-r from-[#fc7b43]/20 to-[#fc7b43]/5 backdrop-blur-md border border-[#fc7b43]/20 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-[float_4s_ease-in-out_infinite]">
               <span className="text-white/90 text-[11px] font-medium tracking-wide">Fundamentals</span>
               <div className="w-5 h-5 rounded-full bg-[#fc7b43] flex items-center justify-center">
                 <RiSearchLine className="text-[#11121A] text-[10px]" />
               </div>
            </div>

            <div className="absolute top-[45%] right-4 sm:right-8 bg-gradient-to-l from-[#fc7b43]/20 to-[#fc7b43]/5 backdrop-blur-md border border-[#fc7b43]/20 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-[float_5s_ease-in-out_infinite_1s]">
               <div className="w-5 h-5 rounded-full bg-[#fc7b43] flex items-center justify-center">
                 <RiCpuLine className="text-[#11121A] text-[10px]" />
               </div>
               <span className="text-white/90 text-[11px] font-medium tracking-wide">Sentiment</span>
            </div>

            <div className="absolute bottom-[35%] left-6 sm:left-10 bg-gradient-to-r from-[#fc7b43]/20 to-[#fc7b43]/5 backdrop-blur-md border border-[#fc7b43]/20 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-[float_4.5s_ease-in-out_infinite_2s]">
               <span className="text-white/90 text-[11px] font-medium tracking-wide">Risk Eval</span>
               <div className="w-5 h-5 rounded-full bg-[#fc7b43] flex items-center justify-center">
                 <RiShieldCheckLine className="text-[#11121A] text-[10px]" />
               </div>
            </div>
            
            <div className="absolute bottom-8 left-0 w-full px-8 text-center z-20">
               <h3 className="text-white font-medium mb-2 text-xl tracking-tight">Taskora Core Engine</h3>
               <p className="text-white/40 text-sm leading-relaxed max-w-[250px] mx-auto font-light">
                 AI multi-agent intelligence aligned perfectly with your portfolio goals.
               </p>
            </div>
          </motion.div>

          {/* Right Column (Tall Card with OS Skeleton at top, text at bottom) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-[#11121A] rounded-2xl border border-white/[0.03] overflow-hidden relative group hover:border-white/[0.1] transition-all duration-500 flex flex-col justify-between min-h-[450px]"
          >
            {/* Top Visual - OS Skeleton */}
            <div className="relative flex-1 w-full flex items-start justify-center p-6 sm:p-8 overflow-hidden pointer-events-none">
              
              <div className="absolute top-0 right-0 w-60 h-60 bg-[#fc7b43]/0 group-hover:bg-[#fc7b43]/10 blur-[80px] rounded-full transition-all duration-700" />
              
              <div className="relative w-full h-[220px] bg-[#0A0B14]/80 backdrop-blur-2xl border border-white/[0.06] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden mt-4 transition-transform duration-700 group-hover:-translate-y-2">
                 
                 {/* Window Header */}
                 <div className="h-8 w-full border-b border-white/[0.04] bg-white/[0.02] flex items-center px-3 relative">
                   <div className="flex gap-1.5 z-10">
                     <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
                     <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
                     <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
                   </div>
                 </div>

                 <div className="absolute inset-0 top-8 bg-[linear-gradient(rgba(252,123,67,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(252,123,67,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />

                 {/* Price Widget */}
                 <div className="absolute top-12 left-4 w-40 bg-[#0C0D18]/95 backdrop-blur-xl border border-[#fc7b43]/20 rounded-xl p-3 shadow-xl">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-1.5">
                        <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025" alt="BTC" className="w-4 h-4" />
                        <span className="text-white/50 text-[10px] font-mono">BTC/USD</span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#fc7b43] animate-pulse shadow-[0_0_8px_#fc7b43]" />
                    </div>
                    <div className="text-xl text-white font-bold tracking-tight">$94,201</div>
                    <div className="text-[#fc7b43] text-[10px] font-medium mt-0.5">+2.4% (1H)</div>
                 </div>

                 {/* Volume Notification */}
                 <div className="absolute bottom-6 right-4 w-48 bg-[#0C0D18]/95 backdrop-blur-2xl border border-white/[0.06] rounded-xl p-3 shadow-2xl flex items-start gap-2.5">
                   <div className="w-7 h-7 rounded-full bg-[#fc7b43]/15 flex items-center justify-center shrink-0">
                     <RiFundsLine className="text-[#fc7b43] text-[11px]" />
                   </div>
                   <div>
                     <div className="text-white text-[11px] font-semibold">Volume Breakout</div>
                     <div className="text-white/40 text-[10px] mt-0.5 leading-tight">ETH 24h volume spiked 42%.</div>
                   </div>
                 </div>
              </div>
            </div>

            {/* Bottom Text Content */}
            <div className="p-8 pt-0 relative z-20">
               <div className="w-10 h-10 rounded-lg bg-[#fc7b43]/10 border border-[#fc7b43]/20 flex items-center justify-center mb-5 shadow-[0_0_15px_rgba(252,123,67,0.1)]">
                 <RiFundsLine className="text-[#fc7b43] text-lg" />
               </div>
               <h3 className="text-white font-medium text-lg mb-2 tracking-tight">Real-Time Insights</h3>
               <p className="text-white/40 text-[13px] sm:text-sm leading-relaxed font-light">
                 Track live price movements blended with sentient agent reasoning. Make hyper-informed moves instantly.
               </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

