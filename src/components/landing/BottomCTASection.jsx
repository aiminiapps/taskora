"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiArrowRightLine, RiNodeTree } from "react-icons/ri";
import Image from "next/image";

export default function BottomCTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-[40px] bg-white/[0.02] border border-white/[0.05] overflow-hidden flex flex-col lg:flex-row items-center p-8 sm:p-12 lg:p-16 gap-12 lg:gap-8">
          
          {/* Left Content (Text & Buttons) */}
          <div className="w-full lg:w-5/12 flex flex-col items-start z-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
              Enter the <br />
              <span className="text-[#7c75ff]">
                Intelligence Arena
              </span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-10 max-w-md">
              Join elite traders leveraging multi-agent AI consensus to navigate crypto markets. Compare live node-based insights, visualize risks, and execute trades with absolute confidence.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/arena">
                <button className="px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 flex items-center gap-2 group">
                  Launch Agent
                  <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="https://orkestri-ai.gitbook.io/orkestri-ai-docs" target="_blank">
                <button className="px-8 py-4 rounded-full bg-white/[0.05] border border-white/[0.1] text-white font-medium text-sm hover:bg-white/[0.1] transition-colors">
                  View Documentation
                </button>
              </Link>
            </div>
          </div>

          {/* Right Animated Visual (Tilted Canvas Mockup) */}
          <div className="w-full lg:w-7/12 relative h-[400px] lg:h-[400px] perspective-[1200px] flex items-center justify-center lg:justify-end">
            
            {/* The 3D Mockup Container */}
            <motion.div 
              className="absolute w-[700px] sm:w-[800px] h-[450px] sm:h-[450px] left-0 sm:left-10 lg:left-auto lg:-right-32 lg:-bottom-16 transform-style-3d z-10"
              initial={{ rotateY: -15, rotateX: 10, rotateZ: -2 }}
              animate={{ 
                y: [-10, 10, -10],
                rotateY: [-15, -12, -15],
                rotateX: [10, 12, 10] 
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Dashboard Window Frame */}
              <div className="w-full h-full bg-[#0b0c12]/90 backdrop-blur-3xl border border-white/[0.08] rounded-3xl shadow-[-20px_40px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden flex flex-col">
                
                {/* Window Header */}
                <div className="h-12 border-b border-white/[0.05] flex items-center px-6 gap-2 bg-white/[0.02] shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-[#f7c94b]/80 shadow-[0_0_10px_rgba(247,201,75,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-[#2dd4a0]/80 shadow-[0_0_10px_rgba(45,212,160,0.5)]" />
                  <div className="ml-4 flex gap-3">
                    <div className="w-24 h-2 bg-white/10 rounded-full" />
                    <div className="w-16 h-2 bg-white/5 rounded-full" />
                  </div>
                </div>

                {/* Canvas Workspace Body */}
                <div className="relative flex-1 w-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:24px_24px] overflow-hidden">
                  
                  {/* SVG Canvas Connections */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 450">
                    {/* Core to Research */}
                    <path d="M 400 225 C 400 120, 250 225, 250 120" fill="none" stroke="#7c75ff" strokeWidth="2" strokeDasharray="4 6" className="animate-[dash_15s_linear_infinite]" opacity="0.6" />
                    
                    {/* Core to Risk */}
                    <path d="M 400 225 C 400 350, 600 225, 600 350" fill="none" stroke="#2dd4a0" strokeWidth="2" opacity="0.3" />
                    
                    {/* Core to Sentiment */}
                    <path d="M 400 225 C 550 225, 650 120, 650 120" fill="none" stroke="#f7c94b" strokeWidth="2" strokeDasharray="4 6" className="animate-[dash_10s_linear_infinite_reverse]" opacity="0.6" />
                  </svg>

                  {/* Nodes */}
                  
                  {/* Center Core Node */}
                  <motion.div 
                    className="absolute top-[225px] left-[400px] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#1e1c2e] to-[#0b0c12] border  flex items-center justify-center z-20"
                    animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 40px rgba(124,117,255,0.4)", "0 0 60px rgba(124,117,255,0.6)", "0 0 40px rgba(124,117,255,0.4)"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Image src="/agent.png" alt="OKAI" width={100} height={100} />
                  </motion.div>

                  {/* Top Left Node: Research */}
                  <motion.div 
                    className="absolute top-[120px] left-[250px] -translate-x-1/2 -translate-y-1/2 w-48 bg-[#13141f]/90 backdrop-blur-md border border-white/[0.08] rounded-xl p-3 z-10 shadow-2xl"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-[#7c75ff] shadow-[0_0_8px_#7c75ff]" />
                      <span className="text-white/80 text-[10px] font-mono uppercase tracking-wider">Research Agent</span>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-[#7c75ff] rounded-full" />
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="w-[60%] h-full bg-[#7c75ff]/50 rounded-full" />
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="w-[40%] h-full bg-[#7c75ff]/30 rounded-full" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Bottom Right Node: Risk */}
                  <motion.div 
                    className="absolute top-[350px] left-[600px] -translate-x-1/2 -translate-y-1/2 w-44 bg-[#13141f]/90 backdrop-blur-md border border-white/[0.08] rounded-xl p-3 z-10 shadow-2xl"
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#2dd4a0] shadow-[0_0_8px_#2dd4a0]" />
                      <span className="text-white/80 text-[10px] font-mono uppercase tracking-wider">Risk Agent</span>
                    </div>
                    <div className="bg-[#2dd4a0]/10 text-[#2dd4a0] px-2 py-1.5 rounded text-[9px] font-medium border border-[#2dd4a0]/20 flex items-center justify-between">
                      <span>CONTRACT RISK</span>
                      <span className="font-bold">LOW</span>
                    </div>
                  </motion.div>

                  {/* Top Right Node: Sentiment */}
                  <motion.div 
                    className="absolute top-[120px] left-[650px] -translate-x-1/2 -translate-y-1/2 w-32 bg-[#13141f]/90 backdrop-blur-md border border-white/[0.08] rounded-xl p-4 z-10 shadow-2xl flex flex-col items-center"
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  >
                    <div className="w-12 h-12 rounded-full border-[3px] border-[#f7c94b]/30 border-t-[#f7c94b] border-r-[#f7c94b] flex items-center justify-center mb-2 rotate-45">
                      <span className="text-[#f7c94b] text-xs font-bold -rotate-45">98%</span>
                    </div>
                    <span className="text-white/80 text-[9px] font-mono tracking-widest uppercase">Bullish</span>
                  </motion.div>

                </div>
              </div>
            </motion.div>

            {/* Ambient Background Glow behind the mockup */}
            <div className="absolute inset-0 bg-[#7c75ff]/10 blur-[100px] rounded-full pointer-events-none -z-10" />
            
          </div>
        </div>
      </div>
    </section>
  );
}
