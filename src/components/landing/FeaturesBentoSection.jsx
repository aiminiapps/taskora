"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  RiFundsLine, 
  RiExchangeLine, 
  RiNodeTree, 
  RiVipCrownLine,
  RiCoinsLine,
  RiSearchLine
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
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
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
            Powerful Architecture That Makes <br className="hidden sm:block" />
            <span className="text-[#7c75ff]">
              Crypto Investing Decisive
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="text-lg text-white/40 leading-relaxed max-w-2xl mx-auto"
          >
            Whether you're comparing agents or managing rewards, our platform equips 
            you with everything needed to cut through market noise fast, secure, and intuitive.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Card 1: Interactive Canvas (span 7) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 group rounded-3xl bg-white/[0.02] border border-white/[0.05] overflow-hidden relative flex flex-col cursor-default"
          >
            <div className="p-8 pb-0">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Investigate via Interactive Canvas</h3>
              <p className="text-white/40 text-base leading-relaxed max-w-md">
                Don't just read plain text. Experience AI analyses mapped out in a dynamic node tree, linking research logic directly to conclusions for ultimate clarity.
              </p>
            </div>
            
            {/* Visual Canvas Mockup - Fixed Coordinate Grid */}
            <div className="mt-12 flex-1 w-full flex relative overflow-hidden items-center justify-center min-h-[300px]">
               {/* Subtle Dot Matrix Background */}
               <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)", backgroundSize: "20px 20px" }} />
               
               {/* Unified 600x300 Coordinate Space for Perfect Alignment */}
               <div className="relative w-[600px] h-[300px] scale-75 sm:scale-90 md:scale-100 origin-center pointer-events-none">
                 
                 {/* SVG Connecting Paths */}
                 <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 300">
                    {/* Center to Top-Left */}
                    <path d="M 300 150 C 210 150, 210 80, 140 80" fill="none" stroke="#7c75ff" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[dash_10s_linear_infinite]" opacity="0.4" />
                    
                    {/* Center to Top-Right */}
                    <path d="M 300 150 C 390 150, 390 80, 460 80" fill="none" stroke="#2dd4a0" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[dash_12s_linear_infinite_reverse]" opacity="0.4" />
                    
                    {/* Center to Bottom-Left */}
                    <path d="M 300 150 C 210 150, 210 220, 140 220" fill="none" stroke="#f7c94b" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[dash_8s_linear_infinite_reverse]" opacity="0.4" />
                    
                    {/* Center to Bottom-Right */}
                    <path d="M 300 150 C 390 150, 390 220, 460 220" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[dash_10s_linear_infinite]" opacity="0.4" />
                 </svg>

                 {/* Nodes Overlay */}
                 
                 {/* Center Hub */}
                 <div className="absolute left-[300px] top-[150px] -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-gradient-to-br from-[#1e1c2e] to-[#0b0c12] border border-[#7c75ff]/40 shadow-[0_0_30px_#7c75ff30] flex items-center justify-center animate-[float_4s_ease-in-out_infinite]">
                   <Image src="/agent.png" alt="OKAI" width={100} height={100} />
                 </div>

                 {/* Top-Left Content Card: Research */}
                 <div className="absolute left-[140px] top-[80px] -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0b0c12]/90 backdrop-blur-md border border-white/[0.08] rounded-xl p-3 w-[150px] shadow-xl shadow-black/50 animate-[float_5s_ease-in-out_infinite_1s]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#7c75ff] shadow-[0_0_8px_#7c75ff]" />
                      <span className="text-white/80 text-[10px] font-mono uppercase tracking-wider">Research</span>
                    </div>
                    <div className="text-white/60 text-[9px] leading-relaxed">Cross-referencing whitepaper topology and tokenomics...</div>
                 </div>

                 {/* Top-Right Content Card: Sentiment */}
                 <div className="absolute left-[460px] top-[80px] -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0b0c12]/90 backdrop-blur-md border border-white/[0.08] rounded-xl p-3 w-[150px] shadow-xl shadow-black/50 animate-[float_4.5s_ease-in-out_infinite_2s]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#2dd4a0] shadow-[0_0_8px_#2dd4a0]" />
                      <span className="text-white/80 text-[10px] font-mono uppercase tracking-wider">Sentiment</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      <span className="bg-[#2dd4a0]/10 text-[#2dd4a0] px-1.5 py-0.5 rounded text-[9px] font-medium border border-[#2dd4a0]/20">BULLISH</span>
                      <span className="bg-white/5 text-white/50 px-1.5 py-0.5 rounded text-[9px]">98%</span>
                    </div>
                 </div>

                 {/* Bottom-Left Content Card: Market Data */}
                 <div className="absolute left-[140px] top-[220px] -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0b0c12]/90 backdrop-blur-md border border-white/[0.08] rounded-xl p-3 w-[150px] shadow-xl shadow-black/50 animate-[float_5s_ease-in-out_infinite_1.5s]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#f7c94b] shadow-[0_0_8px_#f7c94b]" />
                      <span className="text-white/80 text-[10px] font-mono uppercase tracking-wider">Market</span>
                    </div>
                    <div className="flex justify-between items-end mt-1">
                      <span className="text-white/40 text-[9px]">24h Volume</span>
                      <span className="text-[#f7c94b] font-mono text-[10px]">$1.2B</span>
                    </div>
                 </div>

                 {/* Bottom-Right Content Card: Risk Eval */}
                 <div className="absolute left-[460px] top-[220px] -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0b0c12]/90 backdrop-blur-md border border-white/[0.08] rounded-xl p-3 w-[150px] shadow-xl shadow-black/50 animate-[float_4s_ease-in-out_infinite_0.5s]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444]" />
                      <span className="text-white/80 text-[10px] font-mono uppercase tracking-wider">Risk Eval</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-1">
                       <div className="bg-[#ef4444] h-full w-[15%]" />
                    </div>
                    <span className="text-white/50 text-[9px]">Low Contract Risk</span>
                 </div>

               </div>
            </div>
          </motion.div>

          {/* Card 2: Multi-Chain (span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 group rounded-3xl bg-white/[0.02] border border-white/[0.05] overflow-hidden relative flex flex-col cursor-default"
          >
            <div className="p-8 pb-0">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Seamless Seamless BNB Chain Web3</h3>
              <p className="text-white/40 text-base leading-relaxed">
                Connect instantly and securely across the BNB ecosystem. Zero friction.
              </p>
            </div>
            
            {/* Visual Wallet Mockup */}
            <div className="mt-12 flex-1 w-full relative flex justify-center items-center overflow-hidden min-h-[250px]">
              {/* Background gradient flare */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#f3ba2f]/10 to-transparent opacity-50" />
              
              <div className="relative w-[280px] p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl z-10 shadow-2xl transition-transform duration-700 group-hover:-translate-y-4">
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f3ba2f] flex justify-center items-center overflow-hidden shadow-[0_0_20px_#f3ba2f50]">
                         <img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=025" alt="BNB" className="w-6 h-6 object-contain" />
                      </div> 
                      <div>
                        <div className="text-white text-sm font-semibold">BNB Smart Chain</div>
                        <div className="text-white/40 text-xs">Connected</div>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#2dd4a0] shadow-[0_0_10px_#2dd4a0] animate-pulse" />
                 </div>
                 
                 <div className="w-full h-10 rounded-xl bg-gradient-to-r from-white/[0.05] to-white/[0.02] flex items-center px-4 mb-3 border border-white/[0.05]">
                    <div className="text-white/30 text-xs">Address: 0x4F9...e3A2</div>
                 </div>
                 <div className="h-10 w-full rounded-xl bg-gradient-to-r from-[#f7c94b] to-[#f3ba2f] text-black font-semibold text-sm text-center flex items-center justify-center cursor-pointer shadow-[0_10px_20px_rgba(247,201,75,0.2)]">
                    Active Session
                 </div>
              </div>

              {/* Floating blur shapes to add depth */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#f7c94b]/20 blur-3xl rounded-full mix-blend-screen" />
            </div>
          </motion.div>

          {/* Card 3: OKAI Rewards (span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 group rounded-3xl bg-white/[0.02] border border-white/[0.05] overflow-hidden relative flex flex-col p-8 cursor-default min-h-[450px]"
          >
            <div className="relative z-20">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Earn OKAI Rewards Automatically</h3>
              <p className="text-white/40 text-base leading-relaxed">
                Get rewarded for participation. Earn 30 OKAI for generating analyses, 20 for comparing nodes, and 10 for voting on top intel.
              </p>
            </div>
            
            {/* Visual Orbital Rings */}
            <div className="absolute inset-0 top-32 flex items-center justify-center overflow-hidden pointer-events-none scale-90 sm:scale-100">
               {/* Ring 1: Outer (300px) */}
               <div className="absolute w-[300px] h-[300px] rounded-full border border-white/[0.03] animate-[spin_60s_linear_infinite]">
                  {/* SOL - Bottom Left */}
                  <div className="absolute bottom-[14.6%] left-[14.6%] -translate-x-1/2 translate-y-1/2 w-7 h-7 rounded-full border border-white/[0.1] bg-[#0b0c12] p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-[spin_60s_linear_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=025" alt="SOL" className="w-full h-full object-contain" />
                  </div>
                  {/* MATIC - Bottom Right */}
                  <div className="absolute bottom-[14.6%] right-[14.6%] translate-x-1/2 translate-y-1/2 w-7 h-7 rounded-full border border-white/[0.1] bg-[#0b0c12] p-1 shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-[spin_60s_linear_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/polygon-matic-logo.svg?v=025" alt="MATIC" className="w-full h-full object-contain" />
                  </div>
                  {/* ARB - Top Right */}
                  <div className="absolute top-[14.6%] right-[14.6%] translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-white/[0.1] bg-[#0b0c12] p-1 shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-[spin_60s_linear_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=025" alt="ARB" className="w-full h-full object-contain" />
                  </div>
                  {/* AVAX - Top Left */}
                  <div className="absolute top-[14.6%] left-[14.6%] -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-white/[0.1] bg-[#0b0c12] p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-[spin_60s_linear_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=025" alt="AVAX" className="w-full h-full object-contain" />
                  </div>
               </div>

               {/* Ring 2: Middle (210px) */}
               <div className="absolute w-[210px] h-[210px] rounded-full border border-dashed border-[#7c75ff]/30 animate-[spin_40s_linear_infinite_reverse]">
                  {/* ETH - Top */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#7c75ff]/50 bg-[#1e1c2e] p-1.5 shadow-[0_0_15px_#7c75ff40] animate-[spin_40s_linear_infinite]">
                    <img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025" alt="ETH" className="w-full h-full object-contain" />
                  </div>
                  {/* BNB - Bottom */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full border border-[#f3ba2f]/50 bg-[#2a2414] p-1.5 shadow-[0_0_15px_#f3ba2f40] animate-[spin_40s_linear_infinite]">
                    <img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=025" alt="BNB" className="w-full h-full object-contain" />
                  </div>
               </div>

               {/* Ring 3: Inner (120px) */}
               <div className="absolute w-[120px] h-[120px] rounded-full border border-dotted border-[#f7c94b]/40 animate-[spin_20s_ease-in-out_infinite]">
                  {/* BTC - Right */}
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#f7c94b]/50 bg-[#2a2414] p-1 shadow-[0_0_15px_#f7c94b40] animate-[spin_20s_ease-in-out_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025" alt="BTC" className="w-full h-full object-contain" />
                  </div>
               </div>
               
               {/* Center Main Core */}
               <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#0b0c12] to-[#1a1b26] border flex items-center justify-center shadow-[0_0_30px_#f7c94b30] transition-transform duration-700 group-hover:scale-110">
                  <div className="flex flex-col items-center">
                    <Image src="/agent.png" alt="OKAI" width={100} height={100} />
                  </div>
               </div>

               {/* Soft central glow */}
               <div className="absolute w-64 h-64 bg-[#7c75ff]/10 blur-3xl rounded-full" />
            </div>
          </motion.div>

          {/* Card 4: Real-Time Insights (span 7) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-7 group rounded-3xl bg-white/[0.02] border border-white/[0.05] overflow-hidden relative flex flex-col cursor-default pb-0"
          >
            <div className="p-8 pb-0 relative z-20">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Real-Time Price & Sentiment Insights</h3>
              <p className="text-white/40 text-base leading-relaxed max-w-lg">
                Track live price movements blended with sentient agent reasoning. Make hyper-informed moves by visualizing both the charts and the "whys" behind them.
              </p>
            </div>
            
            {/* Card 4: Desktop OS Skeleton with Live Notifications */}
            <div className="relative mt-8 min-h-[300px] w-full flex items-end justify-center px-4 sm:px-8 overflow-hidden">
              {/* Desktop Window Frame */}
              <div className="w-full h-[280px] relative bg-[#0b0c12]/60 backdrop-blur-2xl border-t border-x border-white/[0.08] rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
                 
                 {/* Mac-style Window Header */}
                 <div className="h-10 w-full border-b border-white/[0.05] bg-white/[0.02] flex items-center px-4 relative">
                   <div className="flex gap-2 z-10">
                     <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 shadow-[0_0_5px_#ef444450]" />
                     <div className="w-2.5 h-2.5 rounded-full bg-[#f7c94b]/80 shadow-[0_0_5px_#f7c94b50]" />
                     <div className="w-2.5 h-2.5 rounded-full bg-[#2dd4a0]/80 shadow-[0_0_5px_#2dd4a050]" />
                   </div>
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <span className="text-white/30 text-[10px] font-mono uppercase tracking-[0.2em]">Orkestri_OS</span>
                   </div>
                 </div>

                 {/* Window Body (Desktop Grid) */}
                 <div className="absolute inset-0 top-10 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />

                 {/* Floating Element 1: Live Price Widget */}
                 <motion.div 
                   animate={{ y: [10, -5, 0], opacity: [0, 1] }}
                   transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                   className="absolute top-16 left-6 sm:left-10 w-48 bg-gradient-to-br from-[#1e1c2e]/90 to-[#0b0c12]/90 backdrop-blur-xl border border-[#7c75ff]/30 rounded-2xl p-4 shadow-[0_15px_30px_rgba(124,117,255,0.15)] group-hover:scale-[1.02] transition-transform duration-500"
                 >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1.5">
                        <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025" alt="BTC" className="w-4 h-4" />
                        <span className="text-white/60 text-[10px] font-mono">BTC/USD</span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2dd4a0] shadow-[0_0_8px_#2dd4a0] animate-pulse" />
                    </div>
                    <div className="text-2xl text-white font-bold tracking-tight">$94,201.00</div>
                    <div className="text-[#2dd4a0] text-xs font-medium mt-1">+2.4% (1H)</div>
                    
                    {/* Mini SVG Sparkline */}
                    <svg className="w-full h-8 mt-3 overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                       <path d="M 0 25 Q 15 25 25 15 T 50 10 T 75 20 T 100 5" fill="none" stroke="#2dd4a0" strokeWidth="2.5" className="drop-shadow-[0_2px_4px_rgba(45,212,160,0.4)]" />
                    </svg>
                 </motion.div>

                 {/* Floating Element 2: Volume Notification */}
                 <motion.div 
                   animate={{ x: [20, -5, 0], opacity: [0, 1] }}
                   transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                   className="absolute top-24 right-4 sm:right-8 w-56 sm:w-64 bg-[#0b0c12]/90 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-3 shadow-2xl flex items-start gap-3 group-hover:-translate-y-1 transition-transform duration-500"
                 >
                   <div className="w-8 h-8 rounded-full bg-[#7c75ff]/20 flex items-center justify-center shrink-0 mt-0.5">
                     <RiFundsLine className="text-[#7c75ff]" />
                   </div>
                   <div>
                     <div className="text-white text-xs font-semibold">Volume Breakout</div>
                     <div className="text-white/50 text-[10px] leading-relaxed mt-0.5">Ethereum 24h volume spiked 42%. Rally confirmation pending.</div>
                   </div>
                 </motion.div>

                 {/* Floating Element 3: Agent Consensus Notification */}
                 <motion.div 
                   animate={{ y: [20, -5, 0], opacity: [0, 1] }}
                   transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                   className="absolute bottom-8 right-6 sm:right-16 w-60 sm:w-72 bg-gradient-to-r from-[#2a2414]/90 to-[#0b0c12]/90 backdrop-blur-2xl border border-[#f7c94b]/40 rounded-2xl p-3 shadow-[0_10px_40px_rgba(247,201,75,0.15)] flex items-center gap-3 group-hover:-translate-y-2 transition-transform duration-500"
                 >
                   <div className="w-8 h-8 rounded-full bg-[#f7c94b]/20 flex items-center justify-center shrink-0">
                     <RiVipCrownLine className="text-[#f7c94b]" />
                   </div>
                   <div>
                     <div className="text-[#f7c94b] text-[11px] font-bold uppercase tracking-wide">Consensus Reached</div>
                     <div className="text-white/80 text-[10px] mt-0.5">All 3 agents align on <span className="font-bold text-white">STRONG BUY</span>.</div>
                   </div>
                 </motion.div>

                 {/* Base Fade for depth */}
                 <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0b0c12] to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
