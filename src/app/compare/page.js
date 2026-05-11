"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppKitAccount } from "@reown/appkit/react";
import {
  RiArrowLeftRightLine,
  RiCoinLine,
  RiBarChartBoxLine,
  RiPieChartLine,
  RiExchangeDollarLine,
  RiTrophyLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiSparklingLine,
  RiRobot2Line,
  RiCloseLine,
} from "react-icons/ri";
import AppShell from "@/components/layout/AppShell";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";

/* ─── Coin Search Hook ─── */
function useCoinSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [show, setShow] = useState(false);
  const timer = useRef(null);

  const search = useCallback((q) => {
    setQuery(q);
    setShow(true);
    if (timer.current) clearTimeout(timer.current);
    if (!q.trim()) {
      setResults([]);
      return;
    }
    timer.current = setTimeout(() => {
      setSearching(true);
      fetch(`https://api.coingecko.com/api/v3/search?query=${q}`)
        .then((r) => r.json())
        .then((d) => setResults(d.coins?.slice(0, 5) || []))
        .catch(() => {})
        .finally(() => setSearching(false));
    }, 400);
  }, []);

  return { query, search, results, searching, show, setShow };
}

/* ─── Coin Search Input ─── */
function CoinSearchInput({ label, side, onSelect, selectedCoin }) {
  const { query, search, results, searching, show, setShow } = useCoinSearch();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShow(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setShow]);

  const sideColor = side === "a" ? "#fc7b43" : "#22D3EE";

  return (
    <div ref={ref} className="relative">
      <label
        className="text-[11px] uppercase tracking-[0.15em] font-medium mb-3 block"
        style={{ color: `${sideColor}` }}
      >
        {label}
      </label>
      {selectedCoin ? (
        <div
          className="flex items-center gap-4 p-4 rounded-2xl border bg-[#11121A] shadow-lg transition-all"
          style={{ borderColor: `${sideColor}30` }}
        >
          {selectedCoin.image && (
            <img src={selectedCoin.image} alt="" className="w-8 h-8 rounded-full" />
          )}
          <div className="flex-1">
            <p className="text-[15px] font-medium text-white tracking-tight">{selectedCoin.name}</p>
            <p className="text-[11px] font-mono text-white/40 mt-0.5">
              {selectedCoin.symbol}
              {selectedCoin.rank ? ` · #${selectedCoin.rank}` : ""}
            </p>
          </div>
          <button
            onClick={() => onSelect(null)}
            className="w-8 h-8 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.1] cursor-pointer transition-all"
          >
            <RiCloseLine className="text-base" />
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search token..."
            value={query}
            onChange={(e) => search(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl bg-[#11121A] border border-white/[0.03] text-white placeholder-white/30 focus:outline-none focus:border-[#fc7b43]/50 focus:ring-1 focus:ring-[#fc7b43]/50 text-sm transition-all shadow-lg"
            onFocus={() => setShow(true)}
          />
          <AnimatePresence>
            {show && (results.length > 0 || searching) && (
              <motion.ul
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute z-50 w-full mt-2 bg-[#0A0B14] border border-white/[0.04] rounded-2xl overflow-hidden py-2 shadow-2xl"
              >
                {searching ? (
                  <li className="px-5 py-4 text-[13px] text-white/40 text-center animate-pulse font-light">
                    Searching Data...
                  </li>
                ) : (
                  results.map((coin) => (
                    <li
                      key={coin.id}
                      onClick={async () => {
                        setShow(false);
                        try {
                          const res = await fetch(
                            `https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
                          );
                          const data = await res.json();
                          const md = data.market_data;
                          onSelect({
                            id: coin.id,
                            name: data.name,
                            symbol: data.symbol?.toUpperCase(),
                            image: data.image?.small,
                            price: md?.current_price?.usd,
                            change24h: md?.price_change_percentage_24h,
                            change7d: md?.price_change_percentage_7d,
                            change30d: md?.price_change_percentage_30d,
                            marketCap: md?.market_cap?.usd,
                            volume: md?.total_volume?.usd,
                            rank: data.market_cap_rank,
                            ath: md?.ath?.usd,
                            athChange: md?.ath_change_percentage?.usd,
                            circulatingSupply: md?.circulating_supply,
                            totalSupply: md?.total_supply,
                            maxSupply: md?.max_supply,
                          });
                        } catch {
                          onSelect({
                            id: coin.id,
                            name: coin.name,
                            symbol: coin.symbol?.toUpperCase(),
                            image: coin.thumb,
                          });
                        }
                      }}
                      className="px-5 py-3 hover:bg-white/[0.03] cursor-pointer flex items-center gap-4 transition-colors"
                    >
                      <img src={coin.thumb} alt="" className="w-6 h-6 rounded-full" />
                      <span className="text-[14px] text-white/90 font-medium">{coin.name}</span>
                      <span className="text-[11px] font-mono text-[#fc7b43] uppercase">
                        {coin.symbol}
                      </span>
                    </li>
                  ))
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

/* ─── Comparison Metric Row ─── */
function CompareMetric({ label, valueA, valueB, format = "default", icon: Icon }) {
  const fmt = (v) => {
    if (v == null) return "—";
    if (format === "currency")
      return v >= 1e9
        ? `$${(v / 1e9).toFixed(2)}B`
        : v >= 1e6
          ? `$${(v / 1e6).toFixed(2)}M`
          : `$${v.toLocaleString()}`;
    if (format === "percent") return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
    if (format === "supply")
      return v >= 1e9
        ? `${(v / 1e9).toFixed(2)}B`
        : v >= 1e6
          ? `${(v / 1e6).toFixed(2)}M`
          : v?.toLocaleString?.() ?? "—";
    if (format === "price")
      return `$${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
    return v?.toString?.() ?? "—";
  };

  const colorA =
    format === "percent" && valueA != null
      ? valueA >= 0 ? "text-[#2dd4a0]" : "text-[#ff6b5b]"
      : "";
  const colorB =
    format === "percent" && valueB != null
      ? valueB >= 0 ? "text-[#2dd4a0]" : "text-[#ff6b5b]"
      : "";

  // Winner highlight logic
  const numA = typeof valueA === "number" ? valueA : null;
  const numB = typeof valueB === "number" ? valueB : null;
  const winA = numA != null && numB != null ? numA > numB : false;
  const winB = numA != null && numB != null ? numB > numA : false;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/[0.03] last:border-0">
      <div className="flex-1 text-right">
        <p className={`text-sm font-mono ${colorA} ${winA ? "font-bold" : "text-white/60"}`}>
          {fmt(valueA)}
        </p>
      </div>
      <div className="w-28 sm:w-36 text-center shrink-0">
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/30 uppercase tracking-wider font-medium">
          {Icon && <Icon className="text-xs" />}
          {label}
        </div>
      </div>
      <div className="flex-1 text-left">
        <p className={`text-sm font-mono ${colorB} ${winB ? "font-bold" : "text-white/60"}`}>
          {fmt(valueB)}
        </p>
      </div>
    </div>
  );
}

/* ─── Score Bar (visual winner indicator) ─── */
function ScoreBar({ coinA, coinB }) {
  // Count wins per metric
  const metrics = [
    { a: coinA?.price, b: coinB?.price },
    { a: coinA?.change24h, b: coinB?.change24h },
    { a: coinA?.change7d, b: coinB?.change7d },
    { a: coinA?.change30d, b: coinB?.change30d },
    { a: coinA?.marketCap, b: coinB?.marketCap },
    { a: coinA?.volume, b: coinB?.volume },
  ];

  let winsA = 0, winsB = 0;
  metrics.forEach(({ a, b }) => {
    if (a != null && b != null) {
      if (a > b) winsA++;
      else if (b > a) winsB++;
    }
  });

  const total = winsA + winsB || 1;
  const pctA = Math.round((winsA / total) * 100);
  const pctB = 100 - pctA;

  return (
    <div className="flex items-center gap-4 mb-8 mt-4">
      <div className="flex items-center gap-2 text-sm font-mono">
        {coinA.image && <img src={coinA.image} alt="" className="w-6 h-6 rounded-full border border-[#fc7b43]/30" />}
        <span className="text-[#fc7b43] font-bold ml-1">{winsA}</span>
      </div>
      <div className="flex-1 h-3 bg-[#11121A] border border-white/[0.03] rounded-full overflow-hidden flex shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pctA}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#fc7b43] to-[#fc7b43]/70 rounded-l-full"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pctB}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="h-full bg-gradient-to-l from-[#22D3EE] to-[#22D3EE]/70 rounded-r-full"
        />
      </div>
      <div className="flex items-center gap-2 text-sm font-mono">
        <span className="text-[#22D3EE] font-bold mr-1">{winsB}</span>
        {coinB.image && <img src={coinB.image} alt="" className="w-6 h-6 rounded-full border border-[#22D3EE]/30" />}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function ComparePage() {
  const { address } = useAppKitAccount();
  const [coinA, setCoinA] = useState(null);
  const [coinB, setCoinB] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [reward, setReward] = useState(null);

  const bothSelected = coinA && coinB;

  // Fetch AI comparison when both coins selected
  const runAICompare = async () => {
    if (!coinA || !coinB) return;
    setAiLoading(true);
    setAiAnalysis(null);
    setReward(null);

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coinA,
          coinB,
          walletAddress: address || null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiAnalysis(data.analysis);
        if (data.reward) setReward(data.reward);
      }
    } catch (err) {
      console.error("AI compare failed:", err);
    } finally {
      setAiLoading(false);
    }
  };

  // Auto-run AI when both coins selected
  useEffect(() => {
    if (bothSelected) {
      runAICompare();
    } else {
      setAiAnalysis(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinA?.id, coinB?.id]);

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Compare <span className="text-[#fc7b43]">Tokens</span>
          </h1>
          <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Side-by-side market data and AI-powered investment comparison powered by Taskora Intelligence.
          </p>
        </motion.div>

        {/* Coin selectors */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10"
        >
          <CoinSearchInput label="Token A" side="a" onSelect={setCoinA} selectedCoin={coinA} />
          <CoinSearchInput label="Token B" side="b" onSelect={setCoinB} selectedCoin={coinB} />
        </motion.div>

        <AnimatePresence>
          {bothSelected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-8"
            >
              {/* Score Bar */}
              <ScoreBar coinA={coinA} coinB={coinB} />

              {/* Comparison Table */}
              <div className="rounded-2xl bg-[#11121A] border border-white/[0.03] overflow-hidden shadow-2xl">
                {/* Header row */}
                <div className="flex items-center gap-3 p-5 sm:p-6 border-b border-white/[0.04] bg-[#0A0B14]">
                  <div className="flex-1 flex items-center gap-3 justify-end">
                    {coinA.image && (
                      <img src={coinA.image} alt="" className="w-8 h-8 rounded-full" />
                    )}
                    <span className="text-base font-bold text-white">{coinA.symbol}</span>
                  </div>
                  <div className="w-28 sm:w-36 text-center shrink-0">
                    <RiArrowLeftRightLine className="text-white/20 mx-auto text-2xl" />
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    {coinB.image && (
                      <img src={coinB.image} alt="" className="w-8 h-8 rounded-full" />
                    )}
                    <span className="text-base font-bold text-white">{coinB.symbol}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="px-5 sm:px-6 py-3">
                  <CompareMetric label="Rank" valueA={coinA.rank ? `#${coinA.rank}` : null} valueB={coinB.rank ? `#${coinB.rank}` : null} icon={RiTrophyLine} />
                  <CompareMetric label="Price" valueA={coinA.price} valueB={coinB.price} format="price" icon={RiCoinLine} />
                  <CompareMetric label="24h" valueA={coinA.change24h} valueB={coinB.change24h} format="percent" icon={RiExchangeDollarLine} />
                  <CompareMetric label="7d" valueA={coinA.change7d} valueB={coinB.change7d} format="percent" />
                  <CompareMetric label="30d" valueA={coinA.change30d} valueB={coinB.change30d} format="percent" />
                  <CompareMetric label="Market Cap" valueA={coinA.marketCap} valueB={coinB.marketCap} format="currency" icon={RiPieChartLine} />
                  <CompareMetric label="24h Volume" valueA={coinA.volume} valueB={coinB.volume} format="currency" icon={RiBarChartBoxLine} />
                  <CompareMetric label="ATH" valueA={coinA.ath} valueB={coinB.ath} format="price" icon={RiTrophyLine} />
                  <CompareMetric label="From ATH" valueA={coinA.athChange} valueB={coinB.athChange} format="percent" />
                  <CompareMetric label="Circulating" valueA={coinA.circulatingSupply} valueB={coinB.circulatingSupply} format="supply" />
                  <CompareMetric label="Max Supply" valueA={coinA.maxSupply} valueB={coinB.maxSupply} format="supply" />
                </div>
              </div>

              {/* AI Analysis Panel */}
              <div className="rounded-2xl bg-[#11121A] border border-white/[0.03] overflow-hidden shadow-2xl mt-8">
                <div className="flex items-center gap-4 px-6 py-5 border-b border-white/[0.04] bg-[#0A0B14]">
                  <div className="w-10 h-10 rounded-xl bg-[#fc7b43]/10 border border-[#fc7b43]/20 flex items-center justify-center">
                    <RiRobot2Line className="text-lg text-[#fc7b43]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-white">AI Comparison Analysis</h3>
                    <p className="text-[10px] text-[#fc7b43] font-mono uppercase tracking-[0.15em] mt-0.5">
                      {coinA.symbol} vs {coinB.symbol}
                    </p>
                  </div>
                  {reward && (
                    <span className="text-[11px] font-bold font-mono text-[#fc7b43] bg-[#fc7b43]/10 px-3 py-1.5 rounded-lg border border-[#fc7b43]/20">
                      +{reward.earned} TSKR
                    </span>
                  )}
                </div>

                <div className="p-6">
                  {aiLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-5">
                      <div className="relative">
                        <div className="w-12 h-12 border-2 border-[#fc7b43]/20 border-t-[#fc7b43] rounded-full animate-spin" />
                        <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-b-[#22D3EE]/30 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                      </div>
                      <p className="text-[12px] text-[#fc7b43]/60 font-mono uppercase tracking-[0.2em]">
                        Analyzing {coinA.symbol} vs {coinB.symbol}...
                      </p>
                    </div>
                  ) : aiAnalysis ? (
                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar pr-2 font-light text-[14px] leading-relaxed text-white/70 premium-markdown">
                      <MarkdownRenderer content={aiAnalysis} />
                    </div>
                  ) : (
                    <div className="py-16 text-center">
                      <RiSparklingLine className="text-3xl text-white/10 mx-auto mb-4" />
                      <p className="text-sm text-white/30 font-light">
                        AI analysis will appear here
                      </p>
                    </div>
                  )}
                </div>

                {/* Retry button */}
                {aiAnalysis && !aiLoading && (
                  <div className="px-6 pb-6">
                    <button
                      onClick={runAICompare}
                      className="w-full py-3.5 rounded-xl bg-[#0A0B14] border border-white/[0.04] text-[12px] font-medium text-white/40 hover:text-white hover:bg-[#fc7b43]/10 hover:border-[#fc7b43]/30 transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                      <RiSparklingLine className="text-[#fc7b43] text-lg" />
                      Re-analyze with Taskora
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!bothSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-24"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#11121A] border border-white/[0.03] flex items-center justify-center mx-auto mb-5 shadow-lg">
              <RiArrowLeftRightLine className="text-3xl text-[#fc7b43]/40" />
            </div>
            <p className="text-base text-white/30 font-light">
              Select two tokens above to initiate comparison
            </p>
          </motion.div>
        )}
      </div>

      {/* Custom scrollbar style */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(252, 123, 67, 0.3);
        }
        .premium-markdown .prose strong {
          color: #fff;
          font-weight: 500;
          background: rgba(252, 123, 67, 0.1);
          padding: 1px 5px;
          border-radius: 4px;
        }
        .premium-markdown .prose ul > li::marker {
          color: #fc7b43;
        }
      `}</style>
    </AppShell>
  );
}
