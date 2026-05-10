"use client";

import { motion } from "framer-motion";
import {
  RiSearchLine,
  RiScales3Line,
  RiTrophyLine,
  RiFlashlightLine,
  RiShieldCheckLine,
  RiBrainLine,
} from "react-icons/ri";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const steps = [
  {
    prefix: "01",
    title: "Submit Target Token",
    desc: "Enter any crypto project or token you want deeply investigated by our AI agents.",
    icon: RiSearchLine,
    color: "#8B5CF6",
    glowColor: "rgba(139, 92, 246, 0.15)",
  },
  {
    prefix: "02",
    title: "Multi-Agent Analysis",
    desc: "Three specialized AI agents instantly cross-examine the fundamentals, risks, and momentum.",
    icon: RiBrainLine,
    color: "#FB923C",
    glowColor: "rgba(251, 146, 60, 0.15)",
  },
  {
    prefix: "03",
    title: "Real-Time Verdict",
    desc: "Compare insights side-by-side and execute trades with absolute confidence.",
    icon: RiShieldCheckLine,
    color: "#22D3EE",
    glowColor: "rgba(34, 211, 238, 0.15)",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="features" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Badge + Header */}
        <motion.div
          className="text-center mb-20 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#8B5CF6]/[0.08] border border-[#8B5CF6]/15 text-[#A78BFA] text-xs font-semibold tracking-wider uppercase">
              Solutions
            </span>
          </motion.div>
          <motion.h2 
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.12] mb-6 text-white"
          >
            The market is noisy.
            <br />
            <span className="text-gradient-brand">Taskora brings clarity.</span>
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="text-base sm:text-lg text-white/35 leading-relaxed max-w-2xl mx-auto"
          >
            Hype, FUD, rug-pulls — noise affects everything. AI-driven analysis transforms 
            complex data into intelligent, reliable insights aligned with your goals.
          </motion.p>
        </motion.div>

        {/* 3 Feature Cards — MindWaves style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl bg-[#0C0D18]/60 border border-white/[0.05] overflow-hidden p-8 sm:p-10 flex flex-col items-center text-center hover:border-white/[0.1] transition-all duration-500 hover:-translate-y-1"
            >
              {/* Ambient glow on hover */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: step.color + "20" }}
              />

              {/* Icon */}
              <div 
                className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${step.color}18, ${step.color}08)`,
                  border: `1px solid ${step.color}30`,
                  boxShadow: `0 8px 32px ${step.glowColor}`
                }}
              >
                <step.icon className="text-3xl" style={{ color: step.color }} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-white/35 leading-relaxed font-light max-w-[280px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
