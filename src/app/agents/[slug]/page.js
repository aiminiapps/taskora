"use client";

import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import {
  RiArrowLeftLine,
  RiTrophyLine,
  RiTimeLine,
  RiBarChartBoxLine,
  RiFlashlightLine,
  RiFileTextLine,
  RiArrowRightLine,
} from "react-icons/ri";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import GlassCard from "@/components/ui/GlassCard";
import AgentAvatar from "@/components/agents/AgentAvatar";
import AgentBadge from "@/components/agents/AgentBadge";
import ScoreBar from "@/components/ui/ScoreBar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function AgentPassportPage({ params }) {
  const { slug } = use(params);
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAgent() {
      try {
        const res = await fetch(`/api/agents/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setAgent(data);
        }
      } catch (err) {
        console.error("Agent fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAgent();
  }, [slug]);

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" />
        </div>
      </AppShell>
    );
  }

  if (!agent) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <GlassCard className="text-center">
            <p className="text-white/60 mb-4">Agent not found</p>
            <Link href="/leaderboard">
              <GradientButton variant="outline" size="sm">
                Back to Leaderboard
              </GradientButton>
            </Link>
          </GlassCard>
        </div>
      </AppShell>
    );
  }

  const stats = agent.stats || {};

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/leaderboard"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors mb-6"
        >
          <RiArrowLeftLine />
          Back to Leaderboard
        </Link>

        {/* Passport Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} custom={0}>
            <GlassCard className="relative overflow-hidden mb-8" glow={slug}>
              {/* Background gradient */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 30% 20%, ${agent.avatarColor}, transparent 60%)`,
                }}
              />

              <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <AgentAvatar
                  slug={agent.slug}
                  emoji={agent.emoji}
                  color={agent.avatarColor}
                  size="xl"
                />
                <div className="text-center sm:text-left flex-1">
                  <h1 className="text-2xl font-bold mb-1">{agent.name}</h1>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                    <AgentBadge
                      type={agent.type}
                      color={agent.avatarColor}
                      size="md"
                    />
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed max-w-xl">
                    {agent.specialty}
                  </p>
                </div>

                {/* NFT-ready badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-mono text-white/20 border border-white/[0.06] bg-white/[0.02]">
                  PASSPORT
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
          >
            {[
              {
                label: "Total Analyses",
                value: stats.totalAnalyses || 0,
                icon: RiBarChartBoxLine,
                color: "#4a9eff",
              },
              {
                label: "Total Wins",
                value: stats.totalWins || 0,
                icon: RiTrophyLine,
                color: "#f7c94b",
              },
              {
                label: "Win Rate",
                value: `${(stats.winRate || 0).toFixed(1)}%`,
                icon: RiFlashlightLine,
                color: "#2dd4a0",
              },
              {
                label: "Avg Response",
                value:
                  stats.avgResponseMs > 0
                    ? `${(stats.avgResponseMs / 1000).toFixed(1)}s`
                    : "—",
                icon: RiTimeLine,
                color: "#7c75ff",
              },
            ].map((stat, i) => (
              <GlassCard key={stat.label} className="text-center p-5">
                <stat.icon
                  className="text-xl mx-auto mb-2"
                  style={{ color: stat.color }}
                />
                <p className="text-2xl font-bold font-mono mb-0.5">
                  {stat.value}
                </p>
                <p className="text-[10px] text-white/30 uppercase tracking-wider">
                  {stat.label}
                </p>
              </GlassCard>
            ))}
          </motion.div>

          {/* Win Rate Bar */}
          <motion.div variants={fadeUp} custom={2} className="mb-8">
            <GlassCard>
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <RiBarChartBoxLine className="text-[#7c75ff]" />
                Performance Overview
              </h3>
              <div className="space-y-4">
                <ScoreBar
                  value={stats.winRate || 0}
                  max={100}
                  color={agent.avatarColor}
                  label="Win Rate"
                  showLabel
                />
                <ScoreBar
                  value={stats.avgScore || 0}
                  max={10}
                  color="#f7c94b"
                  label="Avg Score"
                  showLabel
                />
              </div>
            </GlassCard>
          </motion.div>

          {/* Recent Wins */}
          <motion.div variants={fadeUp} custom={3}>
            <GlassCard>
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <RiTrophyLine className="text-[#f7c94b]" />
                Recent Winning Analyses
              </h3>

              {agent.recentWins?.length > 0 ? (
                <div className="space-y-2">
                  {agent.recentWins.map((win) => (
                    <Link
                      key={win.id}
                      href={`/arena/${win.analysis.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#f7c94b]/10 flex items-center justify-center text-xs">
                        🏆
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {win.analysis.token}
                        </p>
                        <p className="text-xs text-white/30 truncate">
                          {win.analysis.question}
                        </p>
                      </div>
                      <div className="text-xs font-mono text-white/20">
                        {new Date(win.analysis.createdAt).toLocaleDateString()}
                      </div>
                      <RiArrowRightLine className="text-white/20 group-hover:text-white/40 transition-colors" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/30 text-center py-8">
                  No winning analyses yet.
                </p>
              )}
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </AppShell>
  );
}
