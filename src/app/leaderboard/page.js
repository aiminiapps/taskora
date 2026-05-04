"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  RiTrophyLine,
  RiSortDesc,
  RiMicroscopeLine,
  RiLineChartLine,
  RiShieldCheckLine,
  RiBrainLine
} from "react-icons/ri";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { AGENT_MAP } from "@/lib/agents";

const rankColors = {
  1: "#f7c94b",
  2: "#c0c0c0",
  3: "#cd7f32",
};

const sortOptions = [
  { key: "wins", label: "Total Wins" },
  { key: "winRate", label: "Win Rate" },
  { key: "score", label: "Avg Score" },
  { key: "speed", label: "Fastest" },
];

const getAgentIcon = (slug) => {
  if (slug === 'research') return RiMicroscopeLine;
  if (slug === 'market') return RiLineChartLine;
  if (slug === 'risk') return RiShieldCheckLine;
  return RiBrainLine;
};

export default function LeaderboardPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("wins");

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch(`/api/leaderboard?sort=${sortBy}`);
        if (res.ok) {
          const data = await res.json();
          setAgents(data);
        }
      } catch (err) {
        console.error("Leaderboard fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, [sortBy]);

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#f7c94b]/5 blur-[120px] pointer-events-none rounded-full" />

        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-16 text-center z-10"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
            Agent <span className="text-[#7c75ff]">Leaderboard</span>
          </h1>
          <p className="text-white/40 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Track the performance of our autonomous agents across thousands of market analyses. Ranked strictly by precision, win rate, and consensus accuracy.
          </p>
        </motion.div>

        {/* Sort Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-4 hide-scrollbar relative z-10"
        >
          <div className="flex bg-[#0b0c12]/80 backdrop-blur-xl border border-white/[0.05] p-1.5 rounded-2xl shadow-xl">
            {sortOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSortBy(opt.key)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer tracking-wide ${
                  sortBy === opt.key
                    ? "bg-white/[0.08] text-white shadow-md border border-white/[0.05]"
                    : "text-white/40 hover:text-white/80 hover:bg-white/[0.02] border border-transparent"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Rankings */}
        <div className="relative z-10">
          {loading ? (
            <div className="flex justify-center py-24">
              <LoadingSpinner size="lg" />
            </div>
          ) : agents.length === 0 ? (
            <div className="bg-[#0b0c12] border border-white/[0.05] rounded-[32px] text-center py-24 shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mx-auto mb-6">
                <RiTrophyLine className="text-3xl text-white/20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Rankings Yet</h3>
              <p className="text-white/40 text-sm max-w-sm mx-auto">
                No analyses completed yet. Rankings will appear after the first multi-agent consensus vote.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {agents.map((agent, i) => {
                const agentData = AGENT_MAP[agent.slug];
                const rankColor = rankColors[agent.rank];
                const AgentIcon = getAgentIcon(agent.slug);

                return (
                  <motion.div
                    key={agent.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    layout
                  >
                    <Link href={`/agents/${agent.slug}`} className="block group">
                      <div className="relative overflow-hidden bg-[#0b0c12] border border-white/[0.05] rounded-[28px] p-5 sm:p-6 transition-all duration-500 hover:border-white/[0.1] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1">
                        
                        {/* Subtle Ambient Hover Glow */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                          style={{ background: `radial-gradient(circle at 80% 50%, ${agent.avatarColor}10 0%, transparent 50%)` }} 
                        />
                        
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                          
                          {/* Left: Rank & Agent ID */}
                          <div className="flex items-center gap-5 md:w-1/3">
                            {/* Rank Badge */}
                            <div className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 border transition-colors duration-500 bg-[#0b0c12]"
                                 style={{ 
                                   borderColor: rankColor ? `${rankColor}40` : "rgba(255,255,255,0.08)",
                                   color: rankColor || "rgba(255,255,255,0.4)",
                                   boxShadow: rankColor ? `inset 0 0 20px ${rankColor}15` : "none"
                                 }}>
                               <span className="text-xl font-bold font-mono">{agent.rank}</span>
                            </div>

                            {/* Agent Icon + Name */}
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                               <div className="w-12 h-12 rounded-xl border flex items-center justify-center bg-white/[0.02] shrink-0 transition-transform duration-500 group-hover:scale-110"
                                    style={{ borderColor: `${agent.avatarColor}30`, color: agent.avatarColor, boxShadow: `inset 0 0 15px ${agent.avatarColor}10` }}>
                                  <AgentIcon className="text-xl drop-shadow-[0_0_8px_currentColor]" />
                               </div>
                               <div className="min-w-0">
                                  <h3 className={`font-semibold text-lg tracking-tight mb-0.5 text-[${agent.avatarColor}] transition-colors duration-300 truncate`}>
                                    {agent.name}
                                  </h3>
                                  <div className="flex items-center gap-2">
                                     <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_5px_currentColor]" style={{ backgroundColor: agent.avatarColor, color: agent.avatarColor }} />
                                     <span className="text-white/40 text-[10px] font-mono">{agentData?.type || agent.type}</span>
                                  </div>
                               </div>
                            </div>
                          </div>

                          {/* Right: Stats Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 items-center gap-6 sm:gap-8 md:flex-1 pt-4 border-t border-white/[0.05] md:pt-0 md:border-t-0 pl-2 md:pl-0">
                             {/* Stat 1: Wins */}
                             <div className="flex flex-col md:items-end">
                                <span className="text-2xl font-bold font-mono text-white transition-colors duration-300"
                                      style={{ color: agent.rank === 1 ? rankColor : "white" }}>
                                  {agent.totalWins}
                                </span>
                                <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium mt-1">Total Wins</span>
                             </div>
                             
                             {/* Stat 2: Win Rate */}
                             <div className="flex flex-col md:items-end">
                                <span className="text-2xl font-bold font-mono text-white">
                                  {agent.winRate.toFixed(1)}<span className="text-sm text-white/40 ml-0.5">%</span>
                                </span>
                                <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium mt-1">Win Rate</span>
                             </div>
                             
                             {/* Stat 3: Avg Score */}
                             <div className="flex flex-col md:items-end">
                                <span className="text-2xl font-bold font-mono text-white">
                                  {agent.avgScore.toFixed(1)}
                                </span>
                                <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium mt-1">Avg Score</span>
                             </div>
                             
                             {/* Stat 4: Speed */}
                             <div className="flex flex-col md:items-end">
                                <span className="text-2xl font-bold font-mono text-white">
                                  {agent.avgResponseMs > 0 ? (agent.avgResponseMs / 1000).toFixed(1) : "—"}
                                  {agent.avgResponseMs > 0 && <span className="text-sm text-white/40 ml-0.5">s</span>}
                                </span>
                                <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium mt-1">Speed</span>
                             </div>
                          </div>

                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
