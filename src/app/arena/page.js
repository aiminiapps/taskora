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

// Incorporating the new palette for the agent icons
const AGENT_ICONS = {
  research: <RiMicroscopeLine className="w-6 h-6 text-[#8B5CF6]" />, // Deep Purple
  market: <RiLineChartLine className="w-6 h-6 text-[#FB923C]" />,    // Orange
  risk: <RiShieldKeyholeLine className="w-6 h-6 text-[#22D3EE]" />   // Cyan
};

const QUESTION_PROMPTS = [
  "What is the short-term market outlook and the key support/resistance levels?",
  "Analyze the tokenomics: are there any red flags or vesting unlocks coming up?",
  "Evaluate the long-term fundamental viability and competitive positioning.",
  "Track recent whale movements and analyze the on-chain liquidity depth."
];

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: "easeOut" },
  }),
};

export default function TaskoraAnalysisPage() {
  const router = useRouter();
  const { input, setInput, resetAnalysis } = useAnalysisStore();
  const { address } = useAppKitAccount();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // CoinGecko State - Logic remains completely untouched
  const [searchQuery, setSearchQuery] = useState(input.token || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-gray-100">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} custom={0} className="mb-12 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              <span className="text-[#8B5CF6] ">
                Taskora
              </span> Analysis
            </h1>
            <p className="text-gray-400 max-w-2xl text-base md:text-lg leading-relaxed">
              Submit your request and let our specialized agents deliver accurate, data-driven insights tailored to your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Agent Information Cards */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="lg:col-span-4 flex flex-col gap-4"
            >
              <h3 className="text-sm font-semibold text-[#A78BFA] uppercase tracking-wider mb-2">Available Agents</h3>
              {AGENTS.map((agent) => (
                <div 
                  key={agent.slug}
                  className="flex items-center gap-4 p-5 rounded-xl border border-gray-800 bg-[#121214] hover:border-[#8B5CF6]/50 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-900 border border-gray-800 shadow-sm">
                    {AGENT_ICONS[agent.slug]}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-100">{agent.name}</p>
                    <p className="text-xs text-gray-500 tracking-wide uppercase mt-0.5">
                      {agent.type}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Right Column: Input Form */}
            <motion.div variants={fadeUp} custom={2} className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="bg-[#121214] border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl">
                  
                {/* Search Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative" ref={autocompleteRef}>
                  {/* Token Name with Autocomplete */}
                  <div className="relative">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                      <RiCoinLine className="text-[#FB923C] text-lg" />
                      Token / Project Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bitcoin, Solana..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all text-sm"
                      required
                    />

                    {/* Suggestions Dropdown */}
                    <AnimatePresence>
                      {showSuggestions && (suggestions.length > 0 || isSearching) && (
                        <motion.ul 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute z-50 w-full mt-2 bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-2xl"
                        >
                          {isSearching ? (
                            <li className="px-4 py-4 text-xs text-[#A78BFA] text-center animate-pulse">Searching Data...</li>
                          ) : (
                            suggestions.map((coin) => (
                              <li 
                                key={coin.id} 
                                onClick={() => handleSelectToken(coin)}
                                className="px-4 py-3 hover:bg-gray-800 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-800 last:border-0"
                              >
                                <img src={coin.thumb} alt={coin.name} className="w-6 h-6 rounded-full object-cover" />
                                <span className="text-gray-200 text-sm font-medium">{coin.name}</span>
                                <span className="text-[#A78BFA] text-xs uppercase">{coin.symbol}</span>
                              </li>
                            ))
                          )}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Contract Address */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                      <RiSearchLine className="text-[#22D3EE] text-lg" />
                      Contract Address
                    </label>
                    <input
                      type="text"
                      placeholder="0x... (Optional)"
                      value={input.contractAddress}
                      onChange={(e) => setInput("contractAddress", e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Question Text Area */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                    <RiQuestionLine className="text-[#8B5CF6] text-lg" />
                    Analysis Request *
                  </label>
                  <textarea
                    placeholder="Describe exactly what you want our agents to analyze..."
                    value={input.question}
                    onChange={(e) => setInput("question", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-4 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all text-sm resize-y leading-relaxed"
                    required
                  />

                  {/* Question Suggestions */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs text-[#A78BFA] font-semibold flex items-center gap-1 mt-1">
                      <RiSparklingLine /> Quick Prompts:
                    </span>
                    {QUESTION_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handlePromptClick(prompt)}
                        className="text-xs bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-gray-200 px-3 py-1.5 rounded-full transition-colors text-left max-w-[200px] sm:max-w-xs truncate"
                        title={prompt}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Options Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-gray-800/50">
                  {[
                    { label: "Category", icon: RiFileTextLine, key: "category", options: CATEGORIES, color: "text-[#FB923C]" },
                    { label: "Language", icon: RiGlobalLine, key: "language", options: LANGUAGES, color: "text-[#22D3EE]" },
                    { label: "Style", icon: RiFileTextLine, key: "style", options: STYLES, color: "text-[#A78BFA]" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-2">
                        <field.icon className={field.color} />
                        {field.label}
                      </label>
                      <select
                        value={input[field.key]}
                        onChange={(e) => setInput(field.key, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-gray-200 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all text-sm appearance-none cursor-pointer"
                      >
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                {/* Error Block */}
                {error && (
                  <div className="px-4 py-3 rounded-xl bg-[#FB923C]/10 border border-[#FB923C]/30 text-[#FB923C] text-sm font-medium">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || !input.token.trim() || !input.question.trim()}
                    className="w-full bg-gradient-to-r from-[#FB923C] to-[#FB923C] text-white font-semibold py-4 rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5CF6] focus:ring-offset-[#121214] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg "
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="tracking-wide">Processing Analysis...</span>
                      </>
                    ) : (
                      <>
                        <RiSendPlaneLine className="text-xl" />
                        <span className="tracking-wide text-base">Submit Request</span>
                      </>
                    )}
                  </button>
                </div>
                
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AppShell>
  );
}