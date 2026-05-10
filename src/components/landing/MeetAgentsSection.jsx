"use client";

import Link from "next/link";
import Image from "next/image";
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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function MeetAgentsSection() {
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
            className="text-3xl sm:text-4xl lg:text-[2.5rem] font-medium tracking-tight leading-[1.2] mb-4 text-white"
          >
            Meet your intelligence team
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="text-sm sm:text-base text-white/40 leading-relaxed max-w-2xl mx-auto font-light"
          >
            Three specialized autonomous agents working in tandem — fundamental research, technical analysis, and security risk assessment.
          </motion.p>
        </motion.div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {AGENTS.map((agent, i) => {
            const Icon = getAgentIcon(agent.slug);
            
            return (
              <motion.div
                key={agent.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="h-full"
              >
                <Link href={`/agents/${agent.slug}`} className="block h-full">
                  <div className="bg-[#11121A] rounded-[2rem] p-6 sm:p-8 flex flex-col h-full border border-white/[0.03] hover:border-white/[0.1] hover:bg-[#15161E] transition-all duration-300 group">
                    
                    {/* Visual Container */}
                    <div className="relative w-full h-[220px] mb-8 bg-[#0C0D18] rounded-[1.5rem] border border-white/[0.03] flex items-center justify-center overflow-hidden">
                      {/* Subtle Background Pattern */}
                      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500" 
                           style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "20px 20px" }} />
                      
                      {/* Agent Avatar */}
                      <Image 
                        src="/agent.png" 
                        alt={agent.name} 
                        width={110} 
                        height={110} 
                        className="object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                      />
                      
                      {/* Top Right Icon Badge */}
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-[10px] bg-[#fc7b43]/10 border border-[#fc7b43]/20 flex items-center justify-center shadow-[0_0_15px_rgba(252,123,67,0.1)]">
                        <Icon className="text-[#fc7b43] text-[13px]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-white font-medium text-xl tracking-tight">
                          {agent.name}
                        </h3>
                        <span className="text-[#fc7b43] text-[9px] font-mono uppercase tracking-wider bg-[#fc7b43]/10 px-2 py-0.5 rounded border border-[#fc7b43]/20">
                          Active
                        </span>
                      </div>
                      
                      <p className="text-white/40 text-[13px] sm:text-sm leading-relaxed font-light mb-6 flex-1">
                        {agent.specialty}
                      </p>

                      <div className="flex items-center gap-2 text-white/50 text-sm group-hover:text-[#fc7b43] transition-colors mt-auto font-medium">
                        View Intel
                        <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
                      </div>
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
