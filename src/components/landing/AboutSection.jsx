"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  RiArrowUpLine,
  RiArrowDownLine,
} from "react-icons/ri";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const COIN_IMAGES = {
  bitcoin: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  ethereum: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  solana: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
  binancecoin: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png"
};

export default function AboutSection() {
  const [cryptoData, setCryptoData] = useState({
    bitcoin: { usd: 64230.50, usd_24h_change: 2.45 },
    ethereum: { usd: 3450.20, usd_24h_change: 1.2 },
    solana: { usd: 145.80, usd_24h_change: 5.6 },
    binancecoin: { usd: 590.10, usd_24h_change: -0.4 },
  });

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.bitcoin) setCryptoData(data);
      })
      .catch((err) => console.error("Error fetching crypto data:", err));
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  const renderBadge = (coinId) => {
    const data = cryptoData[coinId];
    const isPositive = data.usd_24h_change >= 0;
    return (
      <>
        <span className="text-white font-medium text-xs sm:text-sm">{formatPrice(data.usd)}</span>
        <span className={`text-[10px] sm:text-xs font-medium flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <RiArrowUpLine /> : <RiArrowDownLine />}
          {Math.abs(data.usd_24h_change).toFixed(2)}%
        </span>
      </>
    );
  };

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden flex flex-col items-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {/* Main Quote-Style Headline */}
          <motion.p 
            variants={fadeUp} 
            custom={1}
            className="text-[1.35rem] sm:text-2xl md:text-[2rem] text-white/60 leading-relaxed sm:leading-[1.6] font-light max-w-4xl mx-auto text-balance z-10 relative"
          >
            From <span className="text-white font-medium">fundamental research</span> to{" "}
            <span className="text-white font-medium">real-time verdicts</span> 
            <br className="hidden md:block" />
            Taskora adapts to your tokens, giving your portfolio{" "}
            <span className="text-[#fc7b43] font-medium drop-shadow-[0_0_15px_rgba(252,123,67,0.4)]">exactly what it needs</span>, 
            when it needs it.
          </motion.p>

          {/* Orbital Layout Area */}
          <motion.div 
            variants={fadeUp}
            custom={2}
            className="relative w-full h-[450px] sm:h-[550px] mt-16 sm:mt-24 flex items-center justify-center"
          >
            {/* Background Orbits */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border border-white/10 border-dashed animate-[spin_60s_linear_infinite]" />
              <div className="absolute w-[400px] h-[400px] sm:w-[580px] sm:h-[580px] rounded-full border border-white/5 animate-[spin_90s_linear_infinite_reverse]" />
            </div>

            {/* Central Core - Bitcoin */}
            <motion.div 
              className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-white/10 shadow-2xl bg-[#0A0B14]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={COIN_IMAGES.bitcoin} alt="BTC" className="w-full h-full rounded-full object-cover" />
              
              {/* Main Price Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#13141a]/95 backdrop-blur-xl border border-white/10 flex items-center gap-2 sm:gap-3 shadow-2xl whitespace-nowrap z-30">
                <span className="text-white font-semibold text-sm sm:text-lg tracking-wide">{formatPrice(cryptoData.bitcoin.usd)}</span>
                <div className={`flex items-center px-2 py-0.5 rounded-md ${cryptoData.bitcoin.usd_24h_change >= 0 ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                  {cryptoData.bitcoin.usd_24h_change >= 0 ? <RiArrowUpLine className="text-xs sm:text-sm" /> : <RiArrowDownLine className="text-xs sm:text-sm" />}
                  <span className="text-xs sm:text-sm font-medium">{Math.abs(cryptoData.bitcoin.usd_24h_change).toFixed(2)}%</span>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="absolute -top-2 -right-2 sm:-top-1 sm:-right-2 px-4 py-1.5 rounded-full bg-[#1A1C28] text-white flex items-center gap-1.5 shadow-xl border border-white/10 z-30">
                <div className="w-1.5 h-1.5 rounded-full bg-[#fc7b43] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase">Tracking</span>
              </div>
            </motion.div>

            {/* Top Left Node - Ethereum */}
            <motion.div 
              className="absolute top-8 sm:top-12 left-6 sm:left-1/4 w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-white/10 shadow-xl bg-[#0A0B14] z-20"
              animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <img src={COIN_IMAGES.ethereum} alt="ETH" className="w-full h-full rounded-full object-cover" />
              
              {/* Price Badge */}
              <div className="absolute -bottom-3 -right-4 sm:-right-8 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#13141a]/95 backdrop-blur-xl border border-white/10 flex items-center gap-1.5 sm:gap-2 shadow-xl whitespace-nowrap z-30">
                {renderBadge('ethereum')}
              </div>
            </motion.div>

            {/* Bottom Right Node - Solana */}
            <motion.div 
              className="absolute bottom-16 sm:bottom-20 right-4 sm:right-[20%] w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-white/10 shadow-xl bg-[#0A0B14] z-20"
              animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            >
              <img src={COIN_IMAGES.solana} alt="SOL" className="w-full h-full rounded-full object-cover" />

              {/* Price Badge */}
              <div className="absolute -top-3 -left-6 sm:-left-10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#13141a]/95 backdrop-blur-xl border border-white/10 flex items-center gap-1.5 sm:gap-2 shadow-xl whitespace-nowrap z-30">
                {renderBadge('solana')}
              </div>
            </motion.div>

            {/* Bottom Left Node - BNB */}
            <motion.div 
              className="absolute bottom-4 sm:bottom-10 left-4 sm:left-[28%] w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/10 shadow-xl bg-[#0A0B14] z-20"
              animate={{ y: [0, -10, 0], x: [0, -5, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <img src={COIN_IMAGES.binancecoin} alt="BNB" className="w-full h-full rounded-full object-cover" />

              {/* Price Badge */}
              <div className="absolute -bottom-2 -left-4 sm:-left-6 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#13141a]/95 backdrop-blur-xl border border-white/10 flex items-center gap-1 sm:gap-1.5 shadow-xl whitespace-nowrap z-30">
                {renderBadge('binancecoin')}
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
