"use client";

import { motion } from "framer-motion";
import {
  RiSearchLine,
  RiScales3Line,
  RiTrophyLine,
  RiCoinLine,
  RiWallet3Line,
  RiBankCardLine,
} from "react-icons/ri";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── MICRO DETAIL COMPONENTS ──

import {
  RiFileTextLine,
  RiScanLine,
  RiRadarLine,
  RiBarChartBoxLine,
  RiPulseLine,
  RiStockLine
} from "react-icons/ri";

const DynamicGridBackground = ({ color, icons, rotation, index }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-[0.85] transition-opacity duration-1000 flex items-center justify-center z-0">
      <div className={`grid grid-cols-4 gap-3 sm:gap-4 w-[160%] ${rotation} scale-110 opacity-70`}>
        {Array.from({ length: 20 }).map((_, i) => {
          const Icon = icons[i % icons.length];
          const hasIcon = (i + index) % 3 === 0;
          const floatDelay = (i % 5) * 0.4;
          return (
            <motion.div 
              key={i} 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }}
              className="aspect-square rounded-2xl border border-white/[0.04] bg-[#0b0c12]/20 flex items-center justify-center transition-all duration-700 group-hover:border-white/[0.08] group-hover:bg-[#0b0c12]/40"
              style={{ boxShadow: `inset 0 0 20px rgba(255,255,255,0.01)` }}
            >
              {hasIcon && <Icon className="text-[28px] opacity-30 group-hover:opacity-60 transition-opacity duration-700 drop-shadow-[0_0_10px_currentColor]" style={{ color }} />}
            </motion.div>
          );
        })}
      </div>
      {/* Intense Core Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[80px]" style={{ backgroundColor: `${color}30` }} />
    </div>
  );
};

const steps = [
  {
    prefix: "01",
    title: "Submit Target Token",
    desc: "Enter any crypto project or token you want deeply investigated.",
    icon: RiSearchLine,
    color: "#7c75ff",
    bgAccent: "from-[#7c75ff]/20 to-transparent",
    glowColor: "rgba(124, 117, 255, 0.4)",
    icons: [RiSearchLine, RiFileTextLine, RiScanLine, RiRadarLine],
    rotation: "-rotate-12",
  },
  {
    prefix: "02",
    title: "Multi-Agent Analysis",
    desc: "Three specialized AI agents instantly cross-examine the fundamentals.",
    icon: RiScales3Line,
    color: "#f7c94b",
    bgAccent: "from-[#f7c94b]/20 to-transparent",
    glowColor: "rgba(247, 201, 75, 0.4)",
    icons: [RiScales3Line, RiBarChartBoxLine, RiPulseLine, RiStockLine],
    rotation: "rotate-6",
  },
  {
    prefix: "03",
    title: "Real-Time Verdict",
    desc: "Compare insights side-by-side and execute trades with absolute confidence.",
    icon: RiTrophyLine,
    color: "#2dd4a0",
    bgAccent: "from-[#2dd4a0]/20 to-transparent",
    glowColor: "rgba(45, 212, 160, 0.4)",
    icons: [RiTrophyLine, RiCoinLine, RiWallet3Line, RiBankCardLine],
    rotation: "rotate-12",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block matching the provided layout */}
        <motion.div
          className="text-center mb-20 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2 
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-6 text-white"
          >
            Unlock the Full Potential of <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-[#7c75ff]">
              Your Crypto Experience
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="text-lg text-white/40 leading-relaxed max-w-2xl mx-auto"
          >
            Explore our platform's core mechanics that make crypto investing secure, 
            accessible, and highly perceptive.
          </motion.p>
        </motion.div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group h-[450px] relative rounded-3xl border border-white/[0.05] bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden flex flex-col p-4 sm:p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c12]/50 to-[#0b0c12] pointer-events-none z-0" />
              
              {/* Dynamic Micro-Detail Background Component */}
              <DynamicGridBackground color={step.color} icons={step.icons} rotation={step.rotation} index={i} />

              {/* Cinematic Film Grain Overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.25] group-hover:opacity-[0.35] pointer-events-none mix-blend-overlay z-10 transition-opacity duration-700">
                <filter id={`cinematicNoise-${i}`}>
                  <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter={`url(#cinematicNoise-${i})`} />
              </svg>

              {/* Centered Floating Glowing Icon */}
              <div className="flex-1 flex items-center justify-center relative">
                <motion.div 
                  className="relative w-24 h-24 rounded-[2rem] flex items-center justify-center z-10 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}40, ${step.color}05)`,
                    border: `1px solid ${step.color}50`,
                    boxShadow: `0 20px 40px -10px ${step.glowColor}, inset 0 2px 20px -5px ${step.color}90`
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                >
                  <step.icon className="text-4xl drop-shadow-md" style={{ color: step.color }} />
                  {/* Internal glossy highlight */}
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-40 mix-blend-overlay pointer-events-none" />
                </motion.div>
              </div>

              {/* Bottom Info Card matching the frosted pill overlay style */}
              <div className="relative z-20 mt-auto bg-[#0b0c12]/60 border border-white/[0.08] rounded-2xl p-6 backdrop-blur-2xl shadow-2xl transition-all duration-500 group-hover:bg-[#0b0c12]/80 group-hover:border-white/[0.15] group-hover:-translate-y-2">
                <div className="absolute top-0 left-6 w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <h3 className="text-xl font-bold text-white mb-2 text-center group-hover:text-white transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-center text-white/40 leading-relaxed font-light group-hover:text-white/60 transition-colors duration-300">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
        @keyframes float {
          0% { transform: rotateX(60deg) rotateZ(45deg) translateY(0px); }
          50% { transform: rotateX(60deg) rotateZ(45deg) translateY(-20px); }
          100% { transform: rotateX(60deg) rotateZ(45deg) translateY(0px); }
        }
      `}</style>
    </section>
  );
}
