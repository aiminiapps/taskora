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
      className="rounded-2xl overflow-hidden bg-[#fc7b43]/10 border border-[#fc7b43]/20 flex-shrink-0"
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
    analysis: <RiSwordLine className="text-[#fc7b43]" />,
    vote: <RiCheckboxCircleLine className="text-[#22D3EE]" />,
    compare: <RiArrowLeftRightLine className="text-[#2dd4a0]" />,
  };
  const labels = {
    analysis: "Analysis Reward",
    vote: "Vote Reward",
    compare: "Compare Reward",
  };

  return (
    <div className="flex items-center gap-4 py-3">
      <div className="w-8 h-8 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-sm">
        {icons[log.action] || <RiCoinLine />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-white/80">
          {labels[log.action] || log.action}
        </p>
        <p className="text-[10px] text-white/30 font-mono mt-0.5">
          {new Date(log.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <span className="text-[13px] font-bold font-mono text-[#2dd4a0]">
        +{log.amount} TSKR
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
    if (!amt || amt < 10) return setWithdrawError("Minimum withdrawal is 10 TSKR");
    if (amt > (rewards?.balance || 0)) return setWithdrawError("Insufficient balance");

    setWithdrawing(true);
    setWithdrawError("");
    setWithdrawResult(null);

    try {
      if (!walletProvider) throw new Error("Wallet provider not ready. Please reconnect.");
      
      const nonce = crypto.randomUUID();
      const expiry = Math.floor(Date.now() / 1000) + 300; // 5 min
      const message = `Taskora Intelligence Withdrawal\nAmount: ${amt} TSKR\nWallet: ${address}\nNonce: ${nonce}\nExpiry: ${expiry}`;

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
            <div className="w-24 h-24 rounded-3xl bg-[#fc7b43]/10 border border-[#fc7b43]/20 flex items-center justify-center mx-auto mb-8 shadow-xl">
              <RiWallet3Line className="text-4xl text-[#fc7b43]" />
            </div>
            <h1 className="text-3xl font-bold mb-4 tracking-tight">Connect Your Wallet</h1>
            <p className="text-white/40 text-base leading-relaxed mb-10 max-w-sm mx-auto font-light">
              Link your BNB wallet to start earning TSKR tokens, track your
              analysis history, and build your on-chain reputation.
            </p>
            <button
              onClick={() => open()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#fc7b43] text-white font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-lg"
            >
              <RiWallet3Line className="text-lg" />
              Connect Wallet
            </button>

            {/* Reward rate cards */}
            <div className="grid grid-cols-3 gap-4 mt-16">
              {[
                { action: "Analysis", amount: 30, icon: RiSwordLine, color: "#fc7b43" },
                { action: "Compare", amount: 20, icon: RiArrowLeftRightLine, color: "#22D3EE" },
                { action: "Vote", amount: 10, icon: RiCheckboxCircleLine, color: "#2dd4a0" },
              ].map((r) => (
                <div
                  key={r.action}
                  className="rounded-2xl bg-[#11121A] border border-white/[0.03] p-5 shadow-lg"
                >
                  <r.icon className="text-xl mb-3 mx-auto" style={{ color: r.color }} />
                  <p className="text-[15px] font-bold font-mono">{r.amount}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.15em] mt-1 font-medium">
                    TSKR / {r.action}
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
            className="rounded-[32px] bg-[#11121A] border border-white/[0.03] overflow-hidden mb-6 relative group shadow-2xl"
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
                <SeedAvatar address={address} size={80} />

                <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
                  <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                    <span className="text-xl font-bold font-mono tracking-tight text-white">
                      {truncatedAddress}
                    </span>
                    <button
                      onClick={copyAddress}
                      className="text-white/30 hover:text-[#fc7b43] transition-colors cursor-pointer"
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
                      className="text-white/30 hover:text-[#fc7b43] transition-colors"
                    >
                      <RiExternalLinkLine />
                    </a>
                  </div>
                  <p className="text-[11px] text-white/30 font-mono uppercase tracking-[0.2em] font-medium">
                    BNB Smart Chain
                  </p>
                </div>

                <button
                  onClick={() => open({ view: "Account" })}
                  className="px-5 py-2.5 rounded-xl text-[13px] font-medium text-white/60 bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                >
                  <RiLogoutBoxLine />
                  Manage
                </button>
              </div>
            </div>
          </motion.div>

          {/* ─── TSKR Balance Card ─── */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="rounded-[32px] bg-[#11121A] border border-[#fc7b43]/30 overflow-hidden mb-6 relative group shadow-2xl"
          >
            {/* Cinematic Noise & Glow Effects */}
            <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-700 pointer-events-none" 
                 style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
            <div className="absolute top-[50%] left-[85%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none">
               <div className="absolute inset-0 blur-[80px] scale-[1.5] transition-opacity duration-700 opacity-20 group-hover:opacity-40 bg-[#fc7b43]" />
            </div>
            <svg className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none mix-blend-overlay z-10">
              <rect width="100%" height="100%" filter="url(#cinematicNoiseProfile)" />
            </svg>

            <div className="p-6 sm:p-8 relative z-20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-[11px] text-[#fc7b43]/60 uppercase tracking-[0.2em] font-semibold mb-2">
                    TSKR Balance
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
                      {rewards?.balance?.toLocaleString() || "0"}
                    </span>
                    <span className="text-sm sm:text-base text-[#fc7b43] font-bold">TSKR</span>
                  </div>
                </div>
                <button
                  onClick={() => { setShowWithdraw(true); setWithdrawResult(null); setWithdrawError(""); }}
                  disabled={(rewards?.balance || 0) < 10}
                  className="px-6 py-3 rounded-xl bg-[#fc7b43]/10 border border-[#fc7b43]/20 text-[#fc7b43] text-[13px] font-bold hover:bg-[#fc7b43]/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <RiSendPlaneLine className="text-lg" /> Withdraw
                </button>
              </div>

              {/* Earnings breakdown */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Analyses", count: rewards?.analysisCount || 0, icon: RiSwordLine, color: "#fc7b43" },
                  { label: "Compares", count: rewards?.compareCount || 0, icon: RiArrowLeftRightLine, color: "#22D3EE" },
                  { label: "Votes", count: rewards?.voteCount || 0, icon: RiCheckboxCircleLine, color: "#2dd4a0" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-[#0A0B14] border border-white/[0.03] p-4 sm:p-5 shadow-inner">
                    <stat.icon className="text-lg mb-2" style={{ color: stat.color }} />
                    <p className="text-xl font-bold font-mono text-white">{stat.count}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.15em] font-medium mt-1">{stat.label}</p>
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
                className="fixed inset-0 z-50 flex items-center justify-center bg-[#07080F]/80 backdrop-blur-md p-4"
                onClick={() => !withdrawing && setShowWithdraw(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="bg-[#11121A] border border-white/[0.05] rounded-[24px] shadow-2xl w-full max-w-md overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-white/[0.04] bg-[#0A0B14]">
                    <div>
                      <h3 className="text-lg font-bold text-white">Withdraw TSKR</h3>
                      <p className="text-[12px] text-white/40 mt-1">Send tokens directly to your wallet</p>
                    </div>
                    <button onClick={() => !withdrawing && setShowWithdraw(false)} className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] transition-colors cursor-pointer">
                      <RiCloseLine className="text-white/60 text-lg" />
                    </button>
                  </div>

                  {/* Success State */}
                  {withdrawResult ? (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-[#2dd4a0]/10 border border-[#2dd4a0]/20 flex items-center justify-center mx-auto mb-5">
                        <RiCheckLine className="text-3xl text-[#2dd4a0]" />
                      </div>
                      <p className="text-white font-bold text-xl mb-2">Withdrawal {withdrawResult.status === "pending" ? "Submitted" : "Confirmed"}</p>
                      <p className="text-white/50 text-sm mb-6">{withdrawResult.amount} TSKR sent to your wallet</p>
                      <a
                        href={withdrawResult.explorer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-sm font-medium text-white/70 hover:text-white transition-colors"
                      >
                        View on BscScan <RiExternalLinkLine />
                      </a>
                      <button
                        onClick={() => { setShowWithdraw(false); setWithdrawResult(null); }}
                        className="block w-full mt-6 py-3 rounded-xl bg-[#0A0B14] border border-white/[0.03] text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
                      >
                        Close Window
                      </button>
                    </div>
                  ) : (
                    /* Form */
                    <div className="p-6 space-y-5">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-[13px] font-semibold text-white/70">Amount</label>
                          <button
                            onClick={() => setWithdrawAmount(String(rewards?.balance || 0))}
                            className="text-[11px] text-[#fc7b43] font-bold hover:underline cursor-pointer"
                          >
                            MAX: {rewards?.balance || 0} TSKR
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
                            className="w-full px-5 py-4 bg-[#0A0B14] border border-white/[0.05] rounded-xl text-[15px] text-white font-mono placeholder:text-white/20 outline-none focus:border-[#fc7b43]/50 focus:ring-1 focus:ring-[#fc7b43]/50 transition-all"
                            disabled={withdrawing}
                          />
                          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[13px] text-white/30 font-bold">TSKR</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 rounded-xl bg-[#fc7b43]/5 border border-[#fc7b43]/10">
                        <RiShieldCheckLine className="text-[#fc7b43] text-lg shrink-0 mt-0.5" />
                        <p className="text-[12px] text-white/50 leading-relaxed font-light">
                          You will sign a message to verify ownership. TSKR tokens are sent as BEP-20 on BSC Mainnet directly to your connected wallet.
                        </p>
                      </div>

                      {withdrawError && (
                        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20">
                          <p className="text-[13px] text-red-400 font-medium text-center">{withdrawError}</p>
                        </div>
                      )}

                      <motion.button
                        onClick={handleWithdraw}
                        disabled={withdrawing || !withdrawAmount || parseFloat(withdrawAmount) < 10}
                        whileHover={withdrawing || !withdrawAmount || parseFloat(withdrawAmount) < 10 ? {} : { scale: 1.02 }}
                        whileTap={withdrawing || !withdrawAmount || parseFloat(withdrawAmount) < 10 ? {} : { scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className={`w-full relative rounded-xl overflow-hidden group ${withdrawing || !withdrawAmount || parseFloat(withdrawAmount) < 10 ? "opacity-50 cursor-not-allowed" : "hover:shadow-[0_0_35px_-5px_rgba(252,123,67,0.4)] cursor-pointer"}`}
                      >
                        <div 
                          className="w-full h-full rounded-xl py-4 flex items-center justify-center font-bold text-[15px] text-white tracking-wide transition-all duration-500 relative z-10 bg-[#fc7b43]"
                        >
                          {/* Inner subtle glow/shadow for depth */}
                          <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-4px_10px_rgba(0,0,0,0.15)] pointer-events-none" />

                          {/* Sweeping light effect on hover */}
                          <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1000ms] ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none" />

                          <div className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2">
                            {withdrawing ? (
                              <><RiLoader4Line className="animate-spin text-xl" /> Processing...</>
                            ) : (
                              <><RiSendPlaneLine className="text-xl" /> Withdraw TSKR</>
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
            <div className="flex items-center gap-1.5 mb-6 bg-[#11121A] rounded-xl p-1.5 border border-white/[0.03] shadow-lg">
              {[
                { key: "activity", label: "History", icon: RiHistoryLine },
                { key: "rewards", label: "Rewards Log", icon: RiSparklingLine },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? "bg-white/[0.04] text-white shadow-sm"
                      : "text-white/30 hover:text-white/60 hover:bg-white/[0.02]"
                  }`}
                >
                  <tab.icon className="text-lg" />
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
                    <div className="rounded-2xl bg-[#11121A] border border-white/[0.03] p-16 text-center shadow-lg">
                      <div className="w-8 h-8 border-2 border-white/10 border-t-[#fc7b43] rounded-full animate-spin mx-auto" />
                    </div>
                  ) : analyses.length === 0 ? (
                    <div className="rounded-2xl bg-[#11121A] border border-white/[0.03] p-16 text-center shadow-lg">
                      <RiSwordLine className="text-4xl text-[#fc7b43]/20 mx-auto mb-4" />
                      <p className="text-white/40 text-[15px] mb-6 font-light">
                        No analyses yet
                      </p>
                      <Link
                        href="/arena"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fc7b43]/10 border border-[#fc7b43]/20 text-[#fc7b43] text-sm font-bold hover:bg-[#fc7b43]/20 transition-all shadow-md"
                      >
                        Start First Analysis
                        <RiArrowRightLine />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {analyses.map((analysis, i) => (
                        <motion.div
                          key={analysis.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Link href={`/arena/${analysis.id}`}>
                            <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#11121A] border border-white/[0.03] hover:border-white/[0.08] hover:bg-[#0A0B14] transition-all cursor-pointer group shadow-sm">
                              <div className="w-12 h-12 rounded-xl bg-[#fc7b43]/5 border border-[#fc7b43]/10 flex items-center justify-center shrink-0">
                                <RiCoinLine className="text-[#fc7b43] text-lg" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-base font-bold text-white tracking-tight truncate">
                                  {analysis.token}
                                </p>
                                <p className="text-[12px] text-white/40 truncate font-light mt-0.5">
                                  {analysis.question}
                                </p>
                              </div>
                              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2dd4a0]/10 border border-[#2dd4a0]/20 text-[11px] font-bold font-mono text-[#2dd4a0]">
                                +30 TSKR
                              </div>
                              <div className="w-8 h-8 rounded-full bg-white/[0.02] flex items-center justify-center shrink-0 group-hover:bg-white/[0.05] transition-colors ml-2">
                                <RiArrowRightLine className="text-white/30 group-hover:text-white/80 transition-colors" />
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                      {analyses.length > 0 && (
                        <Link
                          href="/history"
                          className="flex items-center justify-center gap-2 py-4 mt-2 text-[13px] font-medium text-white/40 hover:text-[#fc7b43] transition-colors"
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
                  <div className="rounded-2xl bg-[#11121A] border border-white/[0.03] overflow-hidden shadow-lg">
                    {rewards?.recentLogs?.length > 0 ? (
                      <div className="divide-y divide-white/[0.03] px-5">
                        {rewards.recentLogs.map((log) => (
                          <RewardLogItem key={log.id} log={log} />
                        ))}
                      </div>
                    ) : (
                      <div className="p-16 text-center">
                        <RiSparklingLine className="text-4xl text-[#fc7b43]/20 mx-auto mb-4" />
                        <p className="text-white/40 text-[15px] font-medium">
                          No rewards earned yet
                        </p>
                        <p className="text-[12px] text-white/30 mt-2 font-light">
                          Run an analysis to earn your first TSKR tokens
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
