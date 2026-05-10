"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  RiArrowRightLine, 
  RiMicroscopeLine, 
  RiLineChartLine, 
  RiShieldCheckLine 
} from "react-icons/ri";
import { AGENTS } from "@/lib/agents";

const getAgentIcon = (slug) => {
  if (slug === 'research') return RiMicroscopeLine;
  if (slug === 'market') return RiLineChartLine;
  if (slug === 'risk') return RiShieldCheckLine;
  return RiMicroscopeLine;
};

const agentColors = {
  research: "#8B5CF6",
  market: "#FB923C",
  risk: "#22D3EE",
};

export default function MeetAgentsSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              The Intelligence Behind<br />Every Decision
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right"
          >
            <p className="text-white/35 text-sm leading-relaxed mb-6">
              Three specialized autonomous agents working in tandem — fundamental research, technical analysis, and security risk assessment.
            </p>
            <Link 
              href="/arena" 
              className="flex items-center gap-2 text-[#A78BFA] font-medium hover:text-[#8B5CF6] transition-colors group text-sm uppercase tracking-widest"
            >
              Meet The Agents
              <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {AGENTS.map((agent, i) => {
            const Icon = getAgentIcon(agent.slug);
            const color = agentColors[agent.slug] || agent.avatarColor;
            
            return (
              <motion.div
                key={agent.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Link href={`/agents/${agent.slug}`} className="block h-full">
                  <div className="relative h-[400px] rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden group bg-[#0C0D18]/60 border border-white/[0.05] hover:border-white/[0.1] hover:shadow-2xl hover:-translate-y-2">
                    {/* Dot Grid */}
                    <div className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-700" 
                         style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />

                    {/* Concentric Rings */}
                    <div className="absolute top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white/[0.02] group-hover:border-white/[0.05] transition-colors duration-500 pointer-events-none" />
                    <div className="absolute top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-white/[0.01] group-hover:border-white/[0.03] transition-colors duration-500 pointer-events-none" />

                    {/* Aura Gradient */}
                    <div className="absolute top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 pointer-events-none">
                      <div className="absolute inset-0 blur-[50px] scale-[2.5] transition-opacity duration-700 opacity-20 group-hover:opacity-70"
                           style={{ backgroundColor: color }} />
                    </div>

                    {/* Glass Icon Box */}
                    <div className="absolute top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center border bg-[#0C0D18]/60 backdrop-blur-xl transition-all duration-500 group-hover:scale-110"
                           style={{ 
                             borderColor: `${color}30`,
                             boxShadow: `inset 0 0 24px ${color}10, 0 8px 32px ${color}20`
                           }}>
                         <Icon className="text-[36px] transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_12px_currentColor]" style={{ color }} />
                      </div>
                    </div>

                    {/* Bottom Content Card */}
                    <div className="absolute bottom-3 left-3 right-3 bg-[#0C0D18]/80 backdrop-blur-2xl border border-white/[0.05] rounded-2xl p-5 z-30 transition-transform duration-500 group-hover:-translate-y-1 shadow-[0_12px_32px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center text-center">
                      <h3 className="text-base font-semibold mb-2 tracking-tight" style={{ color }}>
                        {agent.name}
                      </h3>
                      <p className="text-white/35 text-[13px] leading-relaxed">
                        {agent.specialty}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
