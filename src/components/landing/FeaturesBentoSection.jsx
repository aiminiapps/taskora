"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  RiFundsLine, 
  RiNodeTree, 
  RiVipCrownLine,
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
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          className="text-center mb-20 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2 
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.12] mb-6 text-white"
          >
            Everything you need
            <br />
            <span className="text-gradient-brand">for your perfect state</span>
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="text-base sm:text-lg text-balance text-white/35 leading-relaxed max-w-2xl mx-auto"
          >
            Taskora combines AI-driven intelligent analysis with
            an effortless experience so you can focus on what matters.
          </motion.p>
        </motion.div>

        {/* Bento Grid — MindWaves Inspired */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          
          {/* Card 1: Interactive Canvas (span 7) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 group rounded-3xl bg-[#0C0D18]/50 border border-white/[0.05] overflow-hidden relative flex flex-col cursor-default hover:border-white/[0.1] transition-all duration-500"
          >
            {/* Hover glow */}
            <div className="absolute top-0 right-0 w-60 h-60 rounded-full blur-[100px] bg-[#8B5CF6]/0 group-hover:bg-[#8B5CF6]/10 transition-all duration-700 pointer-events-none" />
            
            <div className="p-8 pb-0 relative z-10">
              {/* Icon badge */}
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mb-5">
                <RiNodeTree className="text-[#8B5CF6] text-lg" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Interactive Canvas Analysis</h3>
              <p className="text-white/35 text-sm leading-relaxed max-w-md">
                Experience AI analyses mapped in a dynamic node tree, linking research logic directly to conclusions for ultimate clarity.
              </p>
            </div>
            
            {/* Visual Canvas Mockup */}
            <div className="mt-8 flex-1 w-full flex relative overflow-hidden items-center justify-center min-h-[280px]">
               <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #8B5CF6 1px, transparent 0)", backgroundSize: "24px 24px" }} />
               
               <div className="relative w-[560px] h-[280px] scale-[0.65] sm:scale-85 md:scale-100 origin-center pointer-events-none">
                 {/* SVG Paths */}
                 <svg className="absolute inset-0 w-full h-full" viewBox="0 0 560 280">
                    <path d="M 280 140 C 200 140, 200 70, 130 70" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.3" />
                    <path d="M 280 140 C 360 140, 360 70, 430 70" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.3" />
                    <path d="M 280 140 C 200 140, 200 210, 130 210" fill="none" stroke="#FB923C" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.3" />
                    <path d="M 280 140 C 360 140, 360 210, 430 210" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.3" />
                 </svg>

                 {/* Center Hub */}
                 <div className="absolute left-[280px] top-[140px] -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-gradient-to-br from-[#1a1530] to-[#0C0D18] border border-[#8B5CF6]/30 shadow-[0_0_30px_rgba(139,92,246,0.2)] flex items-center justify-center">
                   <Image src="/agent.png" alt="TSKR" width={80} height={80} />
                 </div>

                 {/* Research node */}
                 <div className="absolute left-[130px] top-[70px] -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0C0D18]/90 backdrop-blur-md border border-[#8B5CF6]/20 rounded-xl p-3 w-[140px] shadow-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-[0_0_6px_#8B5CF6]" />
                      <span className="text-white/60 text-[10px] font-mono uppercase tracking-wider">Research</span>
                    </div>
                    <div className="text-white/40 text-[9px] leading-relaxed">Cross-referencing tokenomics...</div>
                 </div>

                 {/* Sentiment node */}
                 <div className="absolute left-[430px] top-[70px] -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0C0D18]/90 backdrop-blur-md border border-[#22D3EE]/20 rounded-xl p-3 w-[140px] shadow-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_6px_#22D3EE]" />
                      <span className="text-white/60 text-[10px] font-mono uppercase tracking-wider">Sentiment</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      <span className="bg-[#22D3EE]/10 text-[#22D3EE] px-1.5 py-0.5 rounded text-[9px] font-medium border border-[#22D3EE]/20">BULLISH</span>
                      <span className="bg-white/5 text-white/40 px-1.5 py-0.5 rounded text-[9px]">98%</span>
                    </div>
                 </div>

                 {/* Market node */}
                 <div className="absolute left-[130px] top-[210px] -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0C0D18]/90 backdrop-blur-md border border-[#FB923C]/20 rounded-xl p-3 w-[140px] shadow-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#FB923C] shadow-[0_0_6px_#FB923C]" />
                      <span className="text-white/60 text-[10px] font-mono uppercase tracking-wider">Market</span>
                    </div>
                    <div className="flex justify-between items-end mt-1">
                      <span className="text-white/30 text-[9px]">24h Vol</span>
                      <span className="text-[#FB923C] font-mono text-[10px]">$1.2B</span>
                    </div>
                 </div>

                 {/* Risk node */}
                 <div className="absolute left-[430px] top-[210px] -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0C0D18]/90 backdrop-blur-md border border-[#22D3EE]/20 rounded-xl p-3 w-[140px] shadow-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_6px_#22D3EE]" />
                      <span className="text-white/60 text-[10px] font-mono uppercase tracking-wider">Risk</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-1">
                       <div className="bg-[#22D3EE] h-full w-[15%] rounded-full" />
                    </div>
                    <span className="text-white/40 text-[9px]">Low Contract Risk</span>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Card 2: Web3 Integration (span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 group rounded-3xl bg-[#0C0D18]/50 border border-white/[0.05] overflow-hidden relative flex flex-col cursor-default hover:border-white/[0.1] transition-all duration-500"
          >
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full blur-[80px] bg-[#FB923C]/0 group-hover:bg-[#FB923C]/10 transition-all duration-700 pointer-events-none" />
            
            <div className="p-8 pb-0 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-[#FB923C]/10 border border-[#FB923C]/20 flex items-center justify-center mb-5">
                <RiShieldCheckLine className="text-[#FB923C] text-lg" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Seamless BNB Chain Web3</h3>
              <p className="text-white/35 text-sm leading-relaxed">
                Connect instantly and securely across the BNB ecosystem. Zero friction.
              </p>
            </div>
            
            <div className="mt-8 flex-1 w-full relative flex justify-center items-center overflow-hidden min-h-[220px]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#FB923C]/5 to-transparent opacity-50" />
              
              <div className="relative w-[260px] p-5 rounded-2xl bg-[#0C0D18]/70 border border-white/[0.06] backdrop-blur-xl z-10 shadow-2xl transition-transform duration-700 group-hover:-translate-y-3">
                 <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#f3ba2f] flex justify-center items-center overflow-hidden shadow-[0_0_15px_#f3ba2f30]">
                         <img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=025" alt="BNB" className="w-5 h-5 object-contain" />
                      </div> 
                      <div>
                        <div className="text-white text-sm font-semibold">BNB Smart Chain</div>
                        <div className="text-white/30 text-xs">Connected</div>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE] animate-pulse" />
                 </div>
                 
                 <div className="w-full h-9 rounded-xl bg-white/[0.03] flex items-center px-4 mb-3 border border-white/[0.04]">
                    <div className="text-white/25 text-xs font-mono">0x4F9...e3A2</div>
                 </div>
                 <div className="h-9 w-full rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-semibold text-sm text-center flex items-center justify-center shadow-[0_8px_20px_rgba(139,92,246,0.2)]">
                    Active Session
                 </div>
              </div>

              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#8B5CF6]/10 blur-3xl rounded-full mix-blend-screen" />
            </div>
          </motion.div>

          {/* Card 3: TSKR Rewards (span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 group rounded-3xl bg-[#0C0D18]/50 border border-white/[0.05] overflow-hidden relative flex flex-col p-8 cursor-default min-h-[420px] hover:border-white/[0.1] transition-all duration-500"
          >
            <div className="relative z-20">
              <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 flex items-center justify-center mb-5">
                <RiVipCrownLine className="text-[#22D3EE] text-lg" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Earn TSKR Rewards</h3>
              <p className="text-white/35 text-sm leading-relaxed">
                Get rewarded for participation. Earn tokens for generating analyses, comparing nodes, and voting on top intel.
              </p>
            </div>
            
            {/* Orbital Rings */}
            <div className="absolute inset-0 top-36 flex items-center justify-center overflow-hidden pointer-events-none scale-85 sm:scale-100">
               <div className="absolute w-[260px] h-[260px] rounded-full border border-white/[0.03] animate-[spin_60s_linear_infinite]">
                  <div className="absolute bottom-[14.6%] left-[14.6%] -translate-x-1/2 translate-y-1/2 w-7 h-7 rounded-full border border-white/[0.08] bg-[#0C0D18] p-1.5 shadow-lg animate-[spin_60s_linear_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=025" alt="SOL" className="w-full h-full object-contain" />
                  </div>
                  <div className="absolute top-[14.6%] right-[14.6%] translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-white/[0.08] bg-[#0C0D18] p-1 shadow-lg animate-[spin_60s_linear_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=025" alt="ARB" className="w-full h-full object-contain" />
                  </div>
               </div>

               <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-[#8B5CF6]/20 animate-[spin_40s_linear_infinite_reverse]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#8B5CF6]/30 bg-[#1a1530] p-1.5 shadow-[0_0_12px_#8B5CF640] animate-[spin_40s_linear_infinite]">
                    <img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025" alt="ETH" className="w-full h-full object-contain" />
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full border border-[#FB923C]/30 bg-[#1e1810] p-1.5 shadow-[0_0_12px_#FB923C40] animate-[spin_40s_linear_infinite]">
                    <img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=025" alt="BNB" className="w-full h-full object-contain" />
                  </div>
               </div>

               <div className="absolute w-[100px] h-[100px] rounded-full border border-dotted border-[#FB923C]/30 animate-[spin_20s_ease-in-out_infinite]">
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#FB923C]/40 bg-[#1e1810] p-1 shadow-[0_0_12px_#FB923C40] animate-[spin_20s_ease-in-out_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025" alt="BTC" className="w-full h-full object-contain" />
                  </div>
               </div>
               
               {/* Center */}
               <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#0C0D18] to-[#1a1530] border border-[#8B5CF6]/20 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-transform duration-700 group-hover:scale-110">
                  <Image src="/agent.png" alt="TSKR" width={80} height={80} />
               </div>

               <div className="absolute w-48 h-48 bg-[#8B5CF6]/8 blur-3xl rounded-full" />
            </div>
          </motion.div>

          {/* Card 4: Real-Time Insights (span 7) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-7 group rounded-3xl bg-[#0C0D18]/50 border border-white/[0.05] overflow-hidden relative flex flex-col cursor-default pb-0 hover:border-white/[0.1] transition-all duration-500"
          >
            <div className="absolute top-0 left-0 w-60 h-60 rounded-full blur-[100px] bg-[#22D3EE]/0 group-hover:bg-[#22D3EE]/8 transition-all duration-700 pointer-events-none" />
            
            <div className="p-8 pb-0 relative z-20">
              <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 flex items-center justify-center mb-5">
                <RiFundsLine className="text-[#22D3EE] text-lg" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Real-Time Price & Sentiment</h3>
              <p className="text-white/35 text-sm leading-relaxed max-w-lg">
                Track live price movements blended with AI agent reasoning. Visualize both charts and the "whys" behind them.
              </p>
            </div>
            
            {/* Desktop Skeleton */}
            <div className="relative mt-8 min-h-[260px] w-full flex items-end justify-center px-4 sm:px-8 overflow-hidden">
              <div className="w-full h-[250px] relative bg-[#0A0B14]/60 backdrop-blur-2xl border-t border-x border-white/[0.06] rounded-t-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.4)] overflow-hidden">
                 
                 {/* Window Header */}
                 <div className="h-9 w-full border-b border-white/[0.04] bg-white/[0.02] flex items-center px-4 relative">
                   <div className="flex gap-2 z-10">
                     <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/70" />
                     <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/70" />
                     <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/70" />
                   </div>
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <span className="text-white/20 text-[10px] font-mono uppercase tracking-[0.2em]">Taskora_OS</span>
                   </div>
                 </div>

                 <div className="absolute inset-0 top-9 bg-[linear-gradient(rgba(139,92,246,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.015)_1px,transparent_1px)] bg-[size:32px_32px]" />

                 {/* Price Widget */}
                 <motion.div 
                   animate={{ y: [8, -4, 0], opacity: [0, 1] }}
                   transition={{ duration: 0.8, delay: 0.2 }}
                   className="absolute top-14 left-5 sm:left-8 w-44 bg-[#0C0D18]/90 backdrop-blur-xl border border-[#8B5CF6]/20 rounded-2xl p-4 shadow-[0_12px_28px_rgba(139,92,246,0.1)]"
                 >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1.5">
                        <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025" alt="BTC" className="w-4 h-4" />
                        <span className="text-white/50 text-[10px] font-mono">BTC/USD</span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_6px_#22D3EE] animate-pulse" />
                    </div>
                    <div className="text-xl text-white font-bold tracking-tight">$94,201</div>
                    <div className="text-[#22D3EE] text-xs font-medium mt-1">+2.4% (1H)</div>
                    <svg className="w-full h-7 mt-2 overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                       <path d="M 0 25 Q 15 25 25 15 T 50 10 T 75 20 T 100 5" fill="none" stroke="#22D3EE" strokeWidth="2" className="drop-shadow-[0_2px_4px_rgba(34,211,238,0.3)]" />
                    </svg>
                 </motion.div>

                 {/* Volume Notification */}
                 <motion.div 
                   animate={{ x: [15, -3, 0], opacity: [0, 1] }}
                   transition={{ duration: 0.8, delay: 0.6 }}
                   className="absolute top-20 right-4 sm:right-6 w-52 sm:w-56 bg-[#0C0D18]/90 backdrop-blur-2xl border border-white/[0.06] rounded-2xl p-3 shadow-2xl flex items-start gap-3"
                 >
                   <div className="w-7 h-7 rounded-full bg-[#8B5CF6]/15 flex items-center justify-center shrink-0 mt-0.5">
                     <RiFundsLine className="text-[#8B5CF6] text-sm" />
                   </div>
                   <div>
                     <div className="text-white text-xs font-semibold">Volume Breakout</div>
                     <div className="text-white/40 text-[10px] leading-relaxed mt-0.5">ETH 24h volume spiked 42%.</div>
                   </div>
                 </motion.div>

                 {/* Consensus */}
                 <motion.div 
                   animate={{ y: [15, -3, 0], opacity: [0, 1] }}
                   transition={{ duration: 0.8, delay: 1 }}
                   className="absolute bottom-6 right-5 sm:right-12 w-56 sm:w-64 bg-gradient-to-r from-[#8B5CF6]/10 to-[#0C0D18]/90 backdrop-blur-2xl border border-[#8B5CF6]/20 rounded-2xl p-3 shadow-lg flex items-center gap-3"
                 >
                   <div className="w-7 h-7 rounded-full bg-[#FB923C]/15 flex items-center justify-center shrink-0">
                     <RiVipCrownLine className="text-[#FB923C] text-sm" />
                   </div>
                   <div>
                     <div className="text-[#FB923C] text-[11px] font-bold uppercase tracking-wide">Consensus</div>
                     <div className="text-white/70 text-[10px] mt-0.5">All 3 agents: <span className="font-bold text-white">STRONG BUY</span></div>
                   </div>
                 </motion.div>

                 <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0C0D18] to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
