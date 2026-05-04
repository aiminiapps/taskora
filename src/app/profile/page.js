"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppKit, useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { createWalletClient, custom } from "viem";
import { bsc } from "viem/chains";
import {
  RiWallet3Line,
  RiHistoryLine,
  RiArrowRightLine,
  RiLogoutBoxLine,
  RiFileCopyLine,
  RiCheckLine,
  RiExternalLinkLine,
  RiCoinLine,
  RiSwordLine,
  RiCheckboxCircleLine,
  RiArrowLeftRightLine,
  RiSparklingLine,
  RiSendPlaneLine,
  RiLoader4Line,
  RiShieldCheckLine,
  RiCloseLine,
} from "react-icons/ri";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

/* ─── Seed-Based Avatar Generator ─── */
function SeedAvatar({ address, size = 80 }) {
  const seed = address || "default";
  
  // Using the Micah collection from DiceBear for a beautiful, premium, realistic human character
  const avatarUrl = `https://api.dicebear.com/9.x/micah/svg?seed=${seed}&backgroundColor=transparent`;

  return (
    <div 
      className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#7c75ff]/20 to-[#4a9eff]/10 border border-[#7c75ff]/20 flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <img
        src={avatarUrl}
        alt="Avatar"
        width={size}
        height={size}
        className="w-full h-full object-cover scale-[1.1] translate-y-1"
      />
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

/* ─── Reward Log Item ─── */
function RewardLogItem({ log }) {
  const icons = {
    analysis: <RiSwordLine className="text-[#7c75ff]" />,
    vote: <RiCheckboxCircleLine className="text-[#4a9eff]" />,
    compare: <RiArrowLeftRightLine className="text-[#2dd4a0]" />,
  };
  const labels = {
    analysis: "Analysis Reward",
    vote: "Vote Reward",
    compare: "Compare Reward",
  };

  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-xs">
        {icons[log.action] || <RiCoinLine />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-white/70">
          {labels[log.action] || log.action}
        </p>
        <p className="text-[10px] text-white/20 font-mono">
          {new Date(log.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <span className="text-xs font-bold font-mono text-[#2dd4a0]">
        +{log.amount} OKAI
      </span>
    </div>
  );
}

export default function ProfilePage() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const [rewards, setRewards] = useState(null);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("activity");

  // Withdraw state
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawResult, setWithdrawResult] = useState(null);
  const [withdrawError, setWithdrawError] = useState("");

  const refreshRewards = useCallback(() => {
    if (!address) return;
    fetch(`/api/rewards?wallet=${encodeURIComponent(address)}`)
      .then((r) => r.json())
      .then((data) => setRewards(data))
      .catch(console.error);
  }, [address]);

  const handleWithdraw = async () => {
    const amt = parseFloat(withdrawAmount);
    if (!amt || amt < 10) return setWithdrawError("Minimum withdrawal is 10 OKAI");
    if (amt > (rewards?.balance || 0)) return setWithdrawError("Insufficient balance");

    setWithdrawing(true);
    setWithdrawError("");
    setWithdrawResult(null);

    try {
      if (!walletProvider) throw new Error("Wallet provider not ready. Please reconnect.");
      
      const nonce = crypto.randomUUID();
      const expiry = Math.floor(Date.now() / 1000) + 300; // 5 min
      const message = `Orkestri AI Withdrawal\nAmount: ${amt} OKAI\nWallet: ${address}\nNonce: ${nonce}\nExpiry: ${expiry}`;

      const walletClient = createWalletClient({
        chain: bsc,
        transport: custom(walletProvider),
      });

      const signature = await walletClient.signMessage({
        account: address,
        message,
      });

      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, message, signature, nonce, expiry: String(expiry), amount: String(amt) }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Withdrawal failed");

      setWithdrawResult(data);
      setWithdrawAmount("");
      refreshRewards();
    } catch (err) {
      setWithdrawError(err?.shortMessage || err?.message || "Withdrawal failed");
    } finally {
      setWithdrawing(false);
    }
  };

  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      setLoading(true);
      refreshRewards();

      fetch(`/api/history?wallet=${encodeURIComponent(address)}&limit=8`)
        .then((r) => r.json())
        .then((data) => setAnalyses(data.analyses || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [address, isConnected, refreshRewards]);

  // Not connected state
  if (!isConnected) {
    return (
      <AppShell>
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-[#7c75ff]/10 border border-[#7c75ff]/20 flex items-center justify-center mx-auto mb-6">
              <RiWallet3Line className="text-3xl text-[#7c75ff]" />
            </div>
            <h1 className="text-2xl font-bold mb-3 tracking-tight">Connect Your Wallet</h1>
            <p className="text-white/35 text-sm leading-relaxed mb-8 max-w-sm mx-auto font-light">
              Link your BNB wallet to start earning OKAI tokens, track your
              analysis history, and build your on-chain reputation.
            </p>
            <button
              onClick={() => open()}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#7c75ff] to-[#5b54e5] text-white font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              <RiWallet3Line />
              Connect Wallet
            </button>

            {/* Reward rate cards */}
            <div className="grid grid-cols-3 gap-3 mt-12">
              {[
                { action: "Analysis", amount: 30, icon: RiSwordLine, color: "#7c75ff" },
                { action: "Compare", amount: 20, icon: RiArrowLeftRightLine, color: "#2dd4a0" },
                { action: "Vote", amount: 10, icon: RiCheckboxCircleLine, color: "#4a9eff" },
              ].map((r) => (
                <div
                  key={r.action}
                  className="rounded-xl bg-[#0b0c12] border border-white/[0.06] p-4"
                >
                  <r.icon className="text-lg mb-2 mx-auto" style={{ color: r.color }} />
                  <p className="text-sm font-bold font-mono">{r.amount}</p>
                  <p className="text-[9px] text-white/25 uppercase tracking-widest mt-0.5">
                    OKAI / {r.action}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* ─── Profile Header Card ─── */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="rounded-[32px] bg-[#0b0c12] border border-white/[0.06] overflow-hidden mb-6 relative group"
          >
            {/* Cinematic Background */}
            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none" 
                 style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
            <svg className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none mix-blend-overlay z-10 transition-opacity duration-700">
              <filter id="cinematicNoiseProfile">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#cinematicNoiseProfile)" />
            </svg>

            <div className="p-6 sm:p-8 relative z-20">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Seed Avatar */}
                <SeedAvatar address={address} size={72} />

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                    <span className="text-lg font-bold font-mono tracking-tight">
                      {truncatedAddress}
                    </span>
                    <button
                      onClick={copyAddress}
                      className="text-white/25 hover:text-white/50 transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <RiCheckLine className="text-[#2dd4a0]" />
                      ) : (
                        <RiFileCopyLine />
                      )}
                    </button>
                    <a
                      href={`https://bscscan.com/address/${address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/25 hover:text-white/50 transition-colors"
                    >
                      <RiExternalLinkLine />
                    </a>
                  </div>
                  <p className="text-[10px] text-white/20 font-mono uppercase tracking-[0.2em]">
                    BNB Smart Chain
                  </p>
                </div>

                <button
                  onClick={() => open({ view: "Account" })}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-white/40 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RiLogoutBoxLine />
                  Manage
                </button>
              </div>
            </div>
          </motion.div>

          {/* ─── OKAI Balance Card ─── */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="rounded-[32px] bg-[#0b0c12] border border-[#7c75ff]/20 overflow-hidden mb-6 relative group"
          >
            {/* Cinematic Noise & Glow Effects */}
            <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-700 pointer-events-none" 
                 style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
            <div className="absolute top-[50%] left-[85%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none">
               <div className="absolute inset-0 blur-[80px] scale-[1.5] transition-opacity duration-700 opacity-20 group-hover:opacity-40 bg-[#7c75ff]" />
            </div>
            <svg className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none mix-blend-overlay z-10">
              <rect width="100%" height="100%" filter="url(#cinematicNoiseProfile)" />
            </svg>

            <div className="p-6 sm:p-8 relative z-20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-semibold mb-1">
                    OKAI Balance
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold font-mono text-[#7c75ff]">
                      {rewards?.balance?.toLocaleString() || "0"}
                    </span>
                    <span className="text-sm text-[#7c75ff]/50 font-bold">OKAI</span>
                  </div>
                </div>
                <button
                  onClick={() => { setShowWithdraw(true); setWithdrawResult(null); setWithdrawError(""); }}
                  disabled={(rewards?.balance || 0) < 10}
                  className="px-5 py-2.5 rounded-xl bg-[#2dd4a0]/10 border border-[#2dd4a0]/25 text-[#2dd4a0] text-xs font-semibold hover:bg-[#2dd4a0]/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                >
                  <RiSendPlaneLine /> Withdraw
                </button>
              </div>

              {/* Earnings breakdown */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Analyses", count: rewards?.analysisCount || 0, icon: RiSwordLine, color: "#7c75ff" },
                  { label: "Compares", count: rewards?.compareCount || 0, icon: RiArrowLeftRightLine, color: "#2dd4a0" },
                  { label: "Votes", count: rewards?.voteCount || 0, icon: RiCheckboxCircleLine, color: "#4a9eff" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3.5">
                    <stat.icon className="text-sm mb-2" style={{ color: stat.color }} />
                    <p className="text-lg font-bold font-mono">{stat.count}</p>
                    <p className="text-[9px] text-white/25 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── Withdraw Modal ─── */}
          <AnimatePresence>
            {showWithdraw && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                onClick={() => !withdrawing && setShowWithdraw(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="bg-[#0b0c12] border border-white/[0.08] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-5 border-b border-white/[0.05]">
                    <div>
                      <h3 className="text-base font-bold text-white">Withdraw OKAI</h3>
                      <p className="text-[11px] text-white/30 mt-0.5">Send tokens directly to your wallet</p>
                    </div>
                    <button onClick={() => !withdrawing && setShowWithdraw(false)} className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer">
                      <RiCloseLine className="text-white/40" />
                    </button>
                  </div>

                  {/* Success State */}
                  {withdrawResult ? (
                    <div className="p-6 text-center">
                      <div className="w-14 h-14 rounded-full bg-[#2dd4a0]/10 border border-[#2dd4a0]/20 flex items-center justify-center mx-auto mb-4">
                        <RiCheckLine className="text-2xl text-[#2dd4a0]" />
                      </div>
                      <p className="text-white font-bold text-lg mb-1">Withdrawal {withdrawResult.status === "pending" ? "Submitted" : "Confirmed"}</p>
                      <p className="text-white/40 text-sm mb-4">{withdrawResult.amount} OKAI sent to your wallet</p>
                      <a
                        href={withdrawResult.explorer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs text-white/60 hover:text-white/80 transition-colors"
                      >
                        View on BscScan <RiExternalLinkLine />
                      </a>
                      <button
                        onClick={() => { setShowWithdraw(false); setWithdrawResult(null); }}
                        className="block w-full mt-4 py-2.5 text-xs text-white/30 hover:text-white/50 transition-colors cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    /* Form */
                    <div className="p-5 space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-semibold text-white/60">Amount</label>
                          <button
                            onClick={() => setWithdrawAmount(String(rewards?.balance || 0))}
                            className="text-[10px] text-[#2dd4a0] font-semibold hover:underline cursor-pointer"
                          >
                            MAX: {rewards?.balance || 0} OKAI
                          </button>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            min="10"
                            max={rewards?.balance || 0}
                            value={withdrawAmount}
                            onChange={(e) => { setWithdrawAmount(e.target.value); setWithdrawError(""); }}
                            placeholder="Enter amount (min 10)"
                            className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white font-mono placeholder:text-white/20 outline-none focus:border-[#7c75ff]/40 transition-colors"
                            disabled={withdrawing}
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/25 font-bold">OKAI</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <RiShieldCheckLine className="text-[#2dd4a0] text-sm mt-0.5 shrink-0" />
                        <p className="text-[11px] text-white/30 leading-relaxed">
                          You will sign a message to verify ownership. OKAI tokens are sent as BEP-20 on BSC Mainnet directly to your connected wallet.
                        </p>
                      </div>

                      {withdrawError && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                          <p className="text-xs text-red-400 font-medium">{withdrawError}</p>
                        </div>
                      )}

                      <motion.button
                        onClick={handleWithdraw}
                        disabled={withdrawing || !withdrawAmount || parseFloat(withdrawAmount) < 10}
                        whileHover={withdrawing || !withdrawAmount || parseFloat(withdrawAmount) < 10 ? {} : { scale: 1.02 }}
                        whileTap={withdrawing || !withdrawAmount || parseFloat(withdrawAmount) < 10 ? {} : { scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className={`w-full relative rounded-xl overflow-hidden group ${withdrawing || !withdrawAmount || parseFloat(withdrawAmount) < 10 ? "opacity-50 cursor-not-allowed" : "hover:shadow-[0_0_35px_-5px_rgba(124,117,255,0.6)] cursor-pointer"}`}
                      >
                        <div 
                          className="w-full h-full rounded-xl py-3 flex items-center justify-center font-bold text-sm text-white tracking-wide transition-all duration-500 relative z-10"
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

                          <div className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2">
                            {withdrawing ? (
                              <><RiLoader4Line className="animate-spin text-lg" /> Signing & Sending...</>
                            ) : (
                              <><RiSendPlaneLine className="text-lg" /> Withdraw OKAI</>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── Tabs ─── */}
          <motion.div variants={fadeUp} custom={2}>
            <div className="flex items-center gap-1 mb-4 bg-[#0b0c12] rounded-xl p-1 border border-white/[0.06]">
              {[
                { key: "activity", label: "History", icon: RiHistoryLine },
                { key: "rewards", label: "Rewards Log", icon: RiSparklingLine },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? "bg-white/[0.06] text-white"
                      : "text-white/30 hover:text-white/50"
                  }`}
                >
                  <tab.icon />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Activity tab */}
            <AnimatePresence mode="wait">
              {activeTab === "activity" && (
                <motion.div
                  key="activity"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  {loading ? (
                    <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.06] p-12 text-center">
                      <div className="w-5 h-5 border-2 border-white/10 border-t-white/40 rounded-full animate-spin mx-auto" />
                    </div>
                  ) : analyses.length === 0 ? (
                    <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.06] p-12 text-center">
                      <RiSwordLine className="text-2xl text-white/10 mx-auto mb-3" />
                      <p className="text-white/25 text-sm mb-4">
                        No analyses yet
                      </p>
                      <Link
                        href="/arena"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7c75ff]/10 border border-[#7c75ff]/20 text-[#7c75ff] text-sm font-medium hover:bg-[#7c75ff]/15 transition-colors"
                      >
                        Start First Analysis
                        <RiArrowRightLine />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {analyses.map((analysis, i) => (
                        <motion.div
                          key={analysis.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Link href={`/arena/${analysis.id}`}>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0b0c12] border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer group">
                              <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center shrink-0">
                                <RiCoinLine className="text-[#2dd4a0] text-sm" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {analysis.token}
                                </p>
                                <p className="text-[11px] text-white/20 truncate">
                                  {analysis.question}
                                </p>
                              </div>
                              <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-[#2dd4a0]/50">
                                +30 OKAI
                              </div>
                              <RiArrowRightLine className="text-white/10 group-hover:text-white/25 transition-colors shrink-0" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                      {analyses.length > 0 && (
                        <Link
                          href="/history"
                          className="flex items-center justify-center gap-1.5 py-3 text-xs text-white/25 hover:text-white/40 transition-colors"
                        >
                          View All History <RiArrowRightLine />
                        </Link>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Rewards Log tab */}
              {activeTab === "rewards" && (
                <motion.div
                  key="rewards"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.06] overflow-hidden">
                    {rewards?.recentLogs?.length > 0 ? (
                      <div className="divide-y divide-white/[0.03] px-4">
                        {rewards.recentLogs.map((log) => (
                          <RewardLogItem key={log.id} log={log} />
                        ))}
                      </div>
                    ) : (
                      <div className="p-12 text-center">
                        <RiSparklingLine className="text-2xl text-white/10 mx-auto mb-3" />
                        <p className="text-white/25 text-sm">
                          No rewards earned yet
                        </p>
                        <p className="text-[11px] text-white/15 mt-1">
                          Run an analysis to earn your first OKAI
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </AppShell>
  );
}
