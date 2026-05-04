"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiSendPlaneLine,
  RiCoinLine,
  RiQuestionLine,
  RiGlobalLine,
  RiFileTextLine,
  RiSearchLine,
  RiMicroscopeLine,
  RiLineChartLine,
  RiShieldKeyholeLine,
  RiSparklingLine
} from "react-icons/ri";
import AppShell from "@/components/layout/AppShell";
import { useAppKitAccount } from "@reown/appkit/react";
import { AGENTS, CATEGORIES, LANGUAGES, STYLES } from "@/lib/agents";
import useAnalysisStore from "@/stores/useAnalysisStore";

const AGENT_ICONS = {
  research: <RiMicroscopeLine className="w-5 h-5 text-[#7c75ff]" />,
  market: <RiLineChartLine className="w-5 h-5 text-[#f7c94b]" />,
  risk: <RiShieldKeyholeLine className="w-5 h-5 text-[#2dd4a0]" />
};

const QUESTION_PROMPTS = [
  "What is the short-term market outlook and the key support/resistance levels?",
  "Analyze the tokenomics: are there any red flags or vesting unlocks coming up?",
  "Evaluate the long-term fundamental viability and competitive positioning.",
  "Track recent whale movements and analyze the on-chain liquidity depth."
];

// Reusable Luxury Container
const LuxuryContainer = ({ children, className = "" }) => (
  <div 
    className={`rounded p-[1px] relative bg-[#7c75ff]/20 ${className}`}
  >
    <div className="bg-[#0b0c10]/90 w-full h-full p-6 relative z-10 pl-8">
      {/* Left decorative pattern bar */}
      <div 
        className="absolute left-0 top-0 w-6 h-full border-r border-[var(--pattern-fg)] pointer-events-none"
        style={{
          "--pattern-fg": "rgba(124, 117, 255, 0.2)",
          backgroundImage: "repeating-linear-gradient(315deg, var(--pattern-fg) 0, var(--pattern-fg) 1px, transparent 0, transparent 50%)",
          backgroundSize: "10px 10px"
        }}
      />
      <div 
        className="absolute right-0 top-0 w-6 h-full border-l border-[var(--pattern-fg)] pointer-events-none"
        style={{
          "--pattern-fg": "rgba(124, 117, 255, 0.2)",
          backgroundImage: "repeating-linear-gradient(315deg, var(--pattern-fg) 0, var(--pattern-fg) 1px, transparent 0, transparent 50%)",
          backgroundSize: "10px 10px"
        }}
      />
      <div className="px-2">
        {children}
      </div>
    </div>
  </div>
);

const LuxuryButton = ({ children, disabled, type = "button", className = "" }) => (
  <motion.button
    type={type}
    disabled={disabled}
    whileHover={disabled ? {} : { scale: 1.02 }}
    whileTap={disabled ? {} : { scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 15 }}
    className={`w-full relative rounded-xl overflow-hidden group ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-[0_0_35px_-5px_rgba(124,117,255,0.6)]"} ${className}`}
  >
    <div 
      className="w-full h-full rounded-xl py-4 flex items-center justify-center font-bold text-white tracking-wide transition-all duration-500 relative z-10"
      style={{
        background: 'linear-gradient(135deg, #8a84ff 0%, #7c75ff 50%, #5b54e5 100%)'
      }}
    >
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Inner subtle glow/shadow for 3D depth */}
      <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-4px_10px_rgba(0,0,0,0.15)] pointer-events-none" />

      {/* Sweeping light effect on hover */}
      <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1000ms] ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none" />

      <div className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]">
        {children}
      </div>
    </div>
  </motion.button>
);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export default function ArenaPage() {
  const router = useRouter();
  const { input, setInput, resetAnalysis } = useAnalysisStore();
  const { address } = useAppKitAccount();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // CoinGecko State
  const [searchQuery, setSearchQuery] = useState(input.token || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    // Click outside to close dropdown
    const handleClickOutside = (e) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchCoinGecko = useCallback((query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    setIsSearching(true);
    fetch(`https://api.coingecko.com/api/v3/search?query=${query}`)
      .then(res => res.json())
      .then(data => {
        setSuggestions(data.coins?.slice(0, 5) || []);
      })
      .catch(err => {
        console.error("CoinGecko search failed:", err);
      })
      .finally(() => setIsSearching(false));
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setInput("token", val);
    setSearchQuery(val);
    setShowSuggestions(true);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchCoinGecko(val);
    }, 400);
  };

  const handleSelectToken = async (coin) => {
    setInput("token", coin.name);
    setSearchQuery(coin.name);
    setShowSuggestions(false);
    
    // Attempt to fetch contract address
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`);
      const data = await res.json();
      const platforms = data.platforms || {};
      
      const contract = Object.values(platforms).find(val => val && typeof val === 'string' && val.trim().length > 0) || '';
      setInput("contractAddress", contract);
    } catch (e) {
      console.error("Failed to fetch contract address:", e);
    }
  };

  const handlePromptClick = (prompt) => {
    setInput("question", prompt);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.token.trim() || !input.question.trim()) return;

    setIsSubmitting(true);
    setError(null);
    resetAnalysis();

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, walletAddress: address || null }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }

      const data = await res.json();
      router.push(`/arena/${data.analysisId}`);
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} custom={0} className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Analysis <span className="text-[#7c75ff]">Arena</span>
            </h1>
            <p className="text-white/50 max-w-2xl text-balance mx-auto text-sm md:text-base font-light">
              Submit your crypto question and let three elite AI agents compete to deliver pixel-perfect analytics and insights.
            </p>
          </motion.div>

          {/* Agent cards built with luxurious inline design */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          >
            {AGENTS.map((agent) => (
              <div 
                key={agent.slug}
                className="flex items-center gap-4 p-4 rounded-xl relative group transition-all"
                style={{
                  background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.015), rgba(255,255,255,0.015) 8px, transparent 8px, transparent 16px)',
                  border: `1px solid ${agent.avatarColor}30`,
                  backgroundColor: '#0a0b12'
                }}
              >
                <div 
                  className="w-[42px] h-[42px] rounded-full flex items-center justify-center relative shadow-none"
                  style={{
                    background: `linear-gradient(135deg, ${agent.avatarColor}20, ${agent.avatarColor}05)`,
                    border: `1px solid ${agent.avatarColor}40`
                  }}
                >
                  {AGENT_ICONS[agent.slug]}
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-white/90">{agent.name}</p>
                  <p className="text-xs text-white/40 font-mono tracking-tight uppercase">
                    {agent.type}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Input Form Wrapp*/}
          <motion.div variants={fadeUp} custom={2}>
            <form onSubmit={handleSubmit}>
              <LuxuryContainer className="space-y-8">
                
                {/* Search Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative" ref={autocompleteRef}>
                  {/* Token Name with Autocomplete */}
                  <div className="relative">
                    <label className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-2.5">
                      <RiCoinLine className="text-[#f7c94b]" />
                      Token / Project Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bitcoin, Solana..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white placeholder-white/20 focus:outline-none focus:border-[#7c75ff]/80 transition-all text-sm shadow-none"
                      required
                    />

                    {/* Suggestions Dropdown */}
                    <AnimatePresence>
                      {showSuggestions && (suggestions.length > 0 || isSearching) && (
                        <motion.ul 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute z-50 w-full mt-2 bg-[#0d0f1a] border border-white/10 rounded-xl overflow-hidden backdrop-blur-2xl py-1 shadow-none"
                        >
                          {isSearching ? (
                            <li className="px-5 py-4 text-xs text-white/30 text-center animate-pulse">Searching CoinGecko...</li>
                          ) : (
                            suggestions.map((coin) => (
                              <li 
                                key={coin.id} 
                                onClick={() => handleSelectToken(coin)}
                                className="px-5 py-3 hover:bg-white/[0.04] cursor-pointer flex items-center gap-4 transition-colors border-b border-white/[0.02] last:border-0"
                              >
                                <img src={coin.thumb} alt={coin.name} className="w-5 h-5 rounded-full object-cover" />
                                <span className="text-white/90 text-sm font-medium">{coin.name}</span>
                                <span className="text-white/30 text-xs font-mono uppercase">{coin.symbol}</span>
                              </li>
                            ))
                          )}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Contract Address */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-2.5">
                      <RiSearchLine className="text-[#4a9eff]" />
                      Contract Address (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="0x... (Auto-fills if available)"
                      value={input.contractAddress}
                      onChange={(e) => setInput("contractAddress", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white placeholder-white/20 focus:outline-none focus:border-[#7c75ff]/80 transition-all text-sm font-mono shadow-none"
                    />
                  </div>
                </div>

                {/* Question Text Area */}
                <div className="mt-4">
                  <label className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-2.5">
                    <RiQuestionLine className="text-[#7c75ff]" />
                    Analysis Question / Request *
                  </label>
                  <textarea
                    placeholder="Provide a detailed scenario or click a suggestion below..."
                    value={input.question}
                    onChange={(e) => setInput("question", e.target.value)}
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white placeholder-white/20 focus:outline-none focus:border-[#7c75ff]/80 transition-all text-sm resize-none shadow-none leading-relaxed"
                    required
                  />

                  {/* Question Suggestions */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-[11px] text-white/30 font-medium uppercase tracking-wider flex items-center gap-1 mt-0.5">
                      <RiSparklingLine /> Let's try:
                    </span>
                    {QUESTION_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handlePromptClick(prompt)}
                        className="text-[11px] bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] hover:border-white/20 text-white/60 hover:text-white/90 px-2.5 py-1 rounded-md transition-colors text-left max-w-[200px] sm:max-w-xs truncate shadow-none"
                        title={prompt}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Options Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
                  {[
                    { label: "Category", icon: RiFileTextLine, color: "#2dd4a0", key: "category", options: CATEGORIES },
                    { label: "Language", icon: RiGlobalLine, color: "#4a9eff", key: "language", options: LANGUAGES },
                    { label: "Style", icon: RiFileTextLine, color: "#ff6b5b", key: "style", options: STYLES },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="flex items-center gap-2 text-[13px] font-semibold text-white/70 mb-2">
                        <field.icon style={{ color: field.color }} />
                        {field.label}
                      </label>
                      <select
                        value={input[field.key]}
                        onChange={(e) => setInput(field.key, e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-white/90 focus:outline-none focus:border-[#7c75ff]/80 transition-all text-[13px] appearance-none cursor-pointer shadow-none"
                      >
                        {field.options.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0b0c10] text-white/90">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                {/* Error Block */}
                {error && (
                  <div className="px-5 py-4 rounded-xl bg-[#ff6b5b]/5 border border-[#ff6b5b]/20 text-[#ff6b5b]/90 text-sm shadow-none">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2 mt-6">
                  <LuxuryButton
                    type="submit"
                    disabled={isSubmitting || !input.token.trim() || !input.question.trim()}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white/90 rounded-full animate-spin shadow-none" />
                          <span className="tracking-wide">Orchestrating Intel...</span>
                        </>
                      ) : (
                        <>
                          <RiSendPlaneLine className="text-xl" />
                          <span className="tracking-wide uppercase text-sm font-bold">Commence Analysis</span>
                        </>
                      )}
                    </span>
                  </LuxuryButton>
                </div>
                
              </LuxuryContainer>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </AppShell>
  );
}
