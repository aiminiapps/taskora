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

export default function MeetAgentsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Row (Image Layout Style) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
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
            <p className="text-white/40 text-base leading-relaxed mb-6">
              Three specialized autonomous agents working in tandem to deliver comprehensive fundamental research, technical market analysis, and security risk assessment.
            </p>
            <Link 
              href="/arena" 
              className="flex items-center gap-2 text-white font-medium hover:text-[#7c75ff] transition-colors group text-sm uppercase tracking-widest"
            >
              Meet The Agents
              <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AGENTS.map((agent, i) => {
            const Icon = getAgentIcon(agent.slug);
            
            return (
              <motion.div
                key={agent.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Link href={`/agents/${agent.slug}`} className="block h-full">
                  <div className="relative h-[420px] rounded-[32px] transition-all duration-500 cursor-pointer overflow-hidden group bg-[#0b0c12] border border-white/[0.05] hover:border-white/[0.1] hover:shadow-2xl hover:-translate-y-2">
                    {/* Faint Dot Grid */}
                    <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-700" 
                         style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />

                    {/* Concentric Rings Pattern (Centered top) */}
                    <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-white/[0.02] group-hover:border-white/[0.06] transition-colors duration-500 pointer-events-none" />
                    <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-white/[0.01] group-hover:border-white/[0.03] transition-colors duration-500 pointer-events-none" />

                    {/* Floating Structural Background Boxes (Faint) */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700">
                       <div className="absolute top-10 left-4 w-20 h-20 rounded-[20px] border-2 border-white rotate-12" />
                       <div className="absolute top-8 right-6 w-16 h-16 rounded-2xl border-2 border-white -rotate-12" />
                       <div className="absolute top-48 left-12 w-24 h-24 rounded-3xl border-2 border-white rotate-45" />
                       <div className="absolute top-40 right-10 w-20 h-20 rounded-[20px] border-2 border-white -rotate-[24deg]" />
                    </div>

                    {/* Base Intense Aura Gradient */}
                    <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 pointer-events-none">
                      <div className="absolute inset-0 blur-[60px] scale-[2.5] transition-opacity duration-700 opacity-30 group-hover:opacity-[0.85]"
                           style={{ backgroundColor: agent.avatarColor }} />
                    </div>

                    {/* Cinematic IMAX Film Grain (Overlays the glowing aura) */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.15] group-hover:opacity-[0.25] pointer-events-none mix-blend-overlay z-10 transition-opacity duration-700">
                      <filter id={`cinematicNoise-${agent.slug}`}>
                        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                      </filter>
                      <rect width="100%" height="100%" filter={`url(#cinematicNoise-${agent.slug})`} />
                    </svg>

                    {/* Glass Icon Box */}
                    <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="relative w-24 h-24 rounded-3xl flex items-center justify-center border bg-[#0b0c12]/60 backdrop-blur-xl transition-all duration-500 group-hover:scale-105"
                           style={{ 
                             borderColor: `${agent.avatarColor}40`,
                             boxShadow: `inset 0 0 30px ${agent.avatarColor}10, 0 10px 40px ${agent.avatarColor}30`
                           }}>
                         <Icon className="text-[40px] transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_currentColor]" style={{ color: agent.avatarColor }} />
                      </div>
                    </div>

                    {/* Raised Bottom Content Card */}
                    <div className="absolute bottom-3 left-3 right-3 bg-[#13141f]/90 backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-6 z-30 transition-transform duration-500 group-hover:-translate-y-1 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center text-center">
                      <h3 className={`text-lg font-semibold  mb-2.5 tracking-tight text-[${agent.avatarColor}] bg-clip-text transition-colors duration-300`}>
                        {agent.name}
                      </h3>
                      <p className="text-white/40 text-[13px]">
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
