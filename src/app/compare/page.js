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

  const sideColor = side === "a" ? "#7c75ff" : "#f7c94b";

  return (
    <div ref={ref} className="relative">
      <label
        className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-2 block"
        style={{ color: `${sideColor}80` }}
      >
        {label}
      </label>
      {selectedCoin ? (
        <div
          className="flex items-center gap-3 p-3.5 rounded-xl border bg-[#0b0c12]"
          style={{ borderColor: `${sideColor}25` }}
        >
          {selectedCoin.image && (
            <img src={selectedCoin.image} alt="" className="w-7 h-7 rounded-full" />
          )}
          <div className="flex-1">
            <p className="text-sm font-semibold">{selectedCoin.name}</p>
            <p className="text-[10px] font-mono text-white/30">
              {selectedCoin.symbol}
              {selectedCoin.rank ? ` · #${selectedCoin.rank}` : ""}
            </p>
          </div>
          <button
            onClick={() => onSelect(null)}
            className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white/60 cursor-pointer transition-colors"
          >
            <RiCloseLine className="text-xs" />
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search token..."
            value={query}
            onChange={(e) => search(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white placeholder-white/20 focus:outline-none text-sm transition-all"
            onFocus={() => setShow(true)}
          />
          <AnimatePresence>
            {show && (results.length > 0 || searching) && (
              <motion.ul
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute z-50 w-full mt-1 bg-[#0d0f1a] border border-white/10 rounded-xl overflow-hidden py-1"
              >
                {searching ? (
                  <li className="px-4 py-3 text-xs text-white/30 text-center animate-pulse">
                    Searching...
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
                      className="px-4 py-2.5 hover:bg-white/[0.04] cursor-pointer flex items-center gap-3 transition-colors"
                    >
                      <img src={coin.thumb} alt="" className="w-5 h-5 rounded-full" />
                      <span className="text-sm text-white/80">{coin.name}</span>
                      <span className="text-[10px] font-mono text-white/30 uppercase">
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
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center gap-2 text-xs font-mono">
        {coinA.image && <img src={coinA.image} alt="" className="w-4 h-4 rounded-full" />}
        <span className="text-[#7c75ff] font-bold">{winsA}</span>
      </div>
      <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden flex">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pctA}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#7c75ff] to-[#7c75ff]/60 rounded-l-full"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pctB}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="h-full bg-gradient-to-l from-[#f7c94b] to-[#f7c94b]/60 rounded-r-full"
        />
      </div>
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-[#f7c94b] font-bold">{winsB}</span>
        {coinB.image && <img src={coinB.image} alt="" className="w-4 h-4 rounded-full" />}
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">
            Compare <span className="text-gradient">Tokens</span>
          </h1>
          <p className="text-white/30 text-sm font-light">
            Side-by-side market data and AI-powered investment comparison
          </p>
        </motion.div>

        {/* Coin selectors */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
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
              className="space-y-6"
            >
              {/* Score Bar */}
              <ScoreBar coinA={coinA} coinB={coinB} />

              {/* Comparison Table */}
              <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.06] overflow-hidden">
                {/* Header row */}
                <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-white/[0.06]">
                  <div className="flex-1 flex items-center gap-2 justify-end">
                    {coinA.image && (
                      <img src={coinA.image} alt="" className="w-6 h-6 rounded-full" />
                    )}
                    <span className="text-sm font-bold">{coinA.symbol}</span>
                  </div>
                  <div className="w-28 sm:w-36 text-center shrink-0">
                    <RiArrowLeftRightLine className="text-white/15 mx-auto text-lg" />
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    {coinB.image && (
                      <img src={coinB.image} alt="" className="w-6 h-6 rounded-full" />
                    )}
                    <span className="text-sm font-bold">{coinB.symbol}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="px-4 sm:px-5 py-2">
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
              <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.06] overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c75ff]/15 to-[#4a9eff]/10 border border-[#7c75ff]/25 flex items-center justify-center">
                    <RiRobot2Line className="text-sm text-[#7c75ff]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold">AI Comparison Analysis</h3>
                    <p className="text-[9px] text-white/25 font-mono uppercase tracking-[0.15em]">
                      {coinA.symbol} vs {coinB.symbol}
                    </p>
                  </div>
                  {reward && (
                    <span className="text-[10px] font-bold font-mono text-[#f7c94b] bg-[#f7c94b]/10 px-2.5 py-1 rounded-md border border-[#f7c94b]/20">
                      +{reward.earned} OKAI
                    </span>
                  )}
                </div>

                <div className="p-5">
                  {aiLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-4">
                      <div className="relative">
                        <div className="w-10 h-10 border-2 border-[#7c75ff]/20 border-t-[#7c75ff] rounded-full animate-spin" />
                        <div className="absolute inset-0 w-10 h-10 border-2 border-transparent border-b-[#f7c94b]/30 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                      </div>
                      <p className="text-[11px] text-white/25 font-mono uppercase tracking-[0.2em]">
                        Analyzing {coinA.symbol} vs {coinB.symbol}...
                      </p>
                    </div>
                  ) : aiAnalysis ? (
                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                      <MarkdownRenderer content={aiAnalysis} />
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <RiSparklingLine className="text-2xl text-white/10 mx-auto mb-3" />
                      <p className="text-sm text-white/25">
                        AI analysis will appear here
                      </p>
                    </div>
                  )}
                </div>

                {/* Retry button */}
                {aiAnalysis && !aiLoading && (
                  <div className="px-5 pb-5">
                    <button
                      onClick={runAICompare}
                      className="w-full py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] font-medium text-white/30 hover:text-white/50 hover:bg-white/[0.04] transition-all cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider"
                    >
                      <RiSparklingLine className="text-[#7c75ff]" />
                      Re-analyze
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
            className="text-center py-16"
          >
            <RiArrowLeftRightLine className="text-3xl text-white/10 mx-auto mb-3" />
            <p className="text-sm text-white/20">
              Select two tokens above to compare
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
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
      `}</style>
    </AppShell>
  );
}
