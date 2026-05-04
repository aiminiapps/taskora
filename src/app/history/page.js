"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  RiHistoryLine,
  RiArrowRightLine,
  RiTrophyLine,
  RiCalendarLine,
  RiSearchLine,
  RiWallet3Line,
} from "react-icons/ri";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import GlassCard from "@/components/ui/GlassCard";
import AgentAvatar from "@/components/agents/AgentAvatar";
import GradientButton from "@/components/ui/GradientButton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { AGENT_MAP } from "@/lib/agents";

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [searched, setSearched] = useState(false);
  const [pagination, setPagination] = useState(null);

  const fetchHistory = async (wallet, page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/history?wallet=${encodeURIComponent(wallet)}&page=${page}`
      );
      if (res.ok) {
        const data = await res.json();
        setAnalyses(data.analyses);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error("History fetch failed:", err);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (walletAddress.trim()) {
      fetchHistory(walletAddress.trim());
    }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Analysis <span className="text-gradient">History</span>
          </h1>
          <p className="text-white/40">
            View your past crypto analysis sessions and selected winners.
          </p>
        </motion.div>

        {/* Wallet Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <form onSubmit={handleSearch}>
            <GlassCard className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4">
              <div className="flex items-center gap-2 flex-1">
                <RiWallet3Line className="text-[#4a9eff] shrink-0" />
                <input
                  type="text"
                  placeholder="Enter wallet address (0x...)"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-white/20 font-mono"
                />
              </div>
              <GradientButton type="submit" size="sm" disabled={!walletAddress.trim()}>
                <span className="flex items-center gap-2">
                  <RiSearchLine />
                  Search
                </span>
              </GradientButton>
            </GlassCard>
          </form>
        </motion.div>

        {/* History List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : searched && analyses.length === 0 ? (
          <GlassCard className="text-center py-16">
            <RiHistoryLine className="text-4xl text-white/20 mx-auto mb-4" />
            <p className="text-white/40 mb-2">No analyses found</p>
            <p className="text-white/20 text-sm">
              This wallet has no analysis history yet.
            </p>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            {analyses.map((analysis, i) => {
              const winnerResponse = analysis.responses?.find(
                (r) => r.isWinner
              );
              const winnerAgent = winnerResponse
                ? AGENT_MAP[winnerResponse.agentSlug]
                : null;

              return (
                <motion.div
                  key={analysis.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/arena/${analysis.id}`}>
                    <GlassCard className="flex items-center gap-4 p-4 cursor-pointer group">
                      {/* Token icon */}
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-lg shrink-0">
                        🪙
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-sm font-semibold">
                            {analysis.token}
                          </h3>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-white/30 font-mono">
                            {analysis.category}
                          </span>
                        </div>
                        <p className="text-xs text-white/30 truncate">
                          {analysis.question}
                        </p>
                      </div>

                      {/* Winner */}
                      {winnerAgent && (
                        <div className="hidden sm:flex items-center gap-2">
                          <AgentAvatar
                            slug={winnerAgent.slug}
                            emoji={winnerAgent.emoji}
                            color={winnerAgent.avatarColor}
                            size="sm"
                          />
                          <div className="text-right">
                            <p className="text-[11px] font-medium">
                              {winnerAgent.name}
                            </p>
                            <p className="text-[10px] text-[#f7c94b] flex items-center gap-0.5">
                              <RiTrophyLine />
                              Winner
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Date */}
                      <div className="flex items-center gap-1 text-[11px] font-mono text-white/20">
                        <RiCalendarLine />
                        {new Date(analysis.createdAt).toLocaleDateString()}
                      </div>

                      <RiArrowRightLine className="text-white/20 group-hover:text-white/40 transition-colors" />
                    </GlassCard>
                  </Link>
                </motion.div>
              );
            })}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-4">
                {Array.from({ length: pagination.totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => fetchHistory(walletAddress, i + 1)}
                    className={`w-8 h-8 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      pagination.page === i + 1
                        ? "bg-[#7c75ff] text-white"
                        : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
