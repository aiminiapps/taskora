"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  RiSearchEyeLine,
  RiCpuLine,
  RiShieldCheckLine,
  RiArrowUpLine,
  RiArrowDownLine,
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
    title: "Deep Protocol Research",
    desc: "Cut through distractions by generating tailored fundamental analysis that helps you stay concentrated on real utility and tokenomics.",
    icon: RiSearchEyeLine,
  },
  {
    title: "Real-Time Sentiment",
    desc: "Create clarity with AI-driven sentiment analysis, tracking market harmonies and social momentum to help you understand the narrative.",
    icon: RiCpuLine,
  },
  {
    title: "Better Risk Assessment",
    desc: "Guide your portfolio into safer states with personalized risk models that help you identify red flags faster and invest deeper.",
    icon: RiShieldCheckLine,
  },
];

export default function HowItWorksSection() {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false")
      .then((res) => res.json())
      .then((data) => setMarketData(data))
      .catch((err) => console.error("Error fetching market data:", err));
  }, []);

  // Format currency dynamically based on value
  const formatPrice = (price) => {
    if (price < 1) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4, maximumFractionDigits: 6 }).format(price);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
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
            The market is noisy.<br/>
            Taskora brings balance
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="text-sm sm:text-base text-white/40 leading-relaxed max-w-2xl mx-auto font-light"
          >
            Hype, FUD, rug-pulls noise affects everything. AI-driven analysis transforms 
            complex data into intelligent, reliable insights aligned with your goals.
          </motion.p>
        </motion.div>

        {/* 3 Feature Cards — Left Aligned, MindWaves Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#11121A] rounded-3xl p-6 sm:p-8 flex flex-col items-start border border-white/[0.03] hover:bg-[#15161E] transition-colors duration-300"
            >
              {/* Icon Container (Orange vibe) */}
              <div className="w-10 h-10 rounded-[10px] bg-gradient-to-b from-[#fc7b43]/20 to-[#fc7b43]/5 border border-[#fc7b43]/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(252,123,67,0.1)]">
                <step.icon className="text-[#fc7b43] text-xl" />
              </div>
              
              <h3 className="text-white font-medium text-lg mb-2 sm:mb-3 tracking-tight">{step.title}</h3>
              <p className="text-white/40 text-[13px] sm:text-sm leading-relaxed font-light">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Big Card - Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#11121A] rounded-3xl border border-white/[0.03] overflow-hidden relative min-h-[400px] flex flex-col"
        >
          {/* Ambient background inside the big card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none"
               style={{ background: "radial-gradient(circle at center, #fc7b43 0%, transparent 70%)" }} />
               
          <div className="p-8 sm:p-12 relative z-10 flex-1 flex flex-col items-center justify-center">
            
            <div className="text-center mb-10">
              <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">Live Market Heatmap</h3>
              <p className="text-white/40 text-sm font-light">Real-time performance of the top crypto assets</p>
            </div>

            {/* Heatmap Grid */}
            {marketData.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 w-full">
                {marketData.map((coin) => {
                  const isPositive = coin.price_change_percentage_24h >= 0;
                  return (
                    <motion.div 
                      key={coin.id}
                      whileHover={{ scale: 1.02 }}
                      className={`relative overflow-hidden rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${
                        isPositive 
                          ? 'bg-green-500/10 border-green-500/10 hover:border-green-500/30' 
                          : 'bg-red-500/10 border-red-500/10 hover:border-red-500/30'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-5">
                        <img src={coin.image} alt={coin.symbol} className="w-8 h-8 rounded-full" />
                        <span className={`text-[11px] sm:text-xs font-semibold flex items-center px-1.5 py-0.5 rounded-md ${
                          isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {isPositive ? <RiArrowUpLine className="mr-0.5" /> : <RiArrowDownLine className="mr-0.5" />}
                          {Math.abs(coin.price_change_percentage_24h).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-sm sm:text-base tracking-tight truncate">{coin.name}</span>
                        <span className="text-white/50 text-[11px] sm:text-xs mt-1 font-mono tracking-wider">{formatPrice(coin.current_price)}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center flex-1 w-full min-h-[200px]">
                <div className="w-8 h-8 border-2 border-[#fc7b43]/30 border-t-[#fc7b43] rounded-full animate-spin" />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
