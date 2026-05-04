import { awardOKAI } from "@/lib/rewards";

export async function POST(request) {
  try {
    const body = await request.json();
    const { coinA, coinB, walletAddress } = body;

    if (!coinA || !coinB) {
      return Response.json(
        { error: "Both coins are required" },
        { status: 400 }
      );
    }

    // Build comparison context
    const fmt = (n) =>
      n != null
        ? n >= 1e9
          ? `$${(n / 1e9).toFixed(2)}B`
          : n >= 1e6
            ? `$${(n / 1e6).toFixed(2)}M`
            : `$${n?.toLocaleString?.() ?? "N/A"}`
        : "N/A";

    const context = `
[COIN A — ${coinA.name} (${coinA.symbol})]
Price: $${coinA.price?.toLocaleString() ?? "N/A"}
Market Cap: ${fmt(coinA.marketCap)}
24h Volume: ${fmt(coinA.volume)}
24h Change: ${coinA.change24h?.toFixed(2) ?? "N/A"}%
7d Change: ${coinA.change7d?.toFixed(2) ?? "N/A"}%
30d Change: ${coinA.change30d?.toFixed(2) ?? "N/A"}%
Rank: #${coinA.rank ?? "N/A"}
ATH: $${coinA.ath?.toLocaleString() ?? "N/A"} (${coinA.athChange?.toFixed(1) ?? "N/A"}% from ATH)
Circulating Supply: ${coinA.circulatingSupply?.toLocaleString() ?? "N/A"}
Max Supply: ${coinA.maxSupply?.toLocaleString() ?? "N/A"}

[COIN B — ${coinB.name} (${coinB.symbol})]
Price: $${coinB.price?.toLocaleString() ?? "N/A"}
Market Cap: ${fmt(coinB.marketCap)}
24h Volume: ${fmt(coinB.volume)}
24h Change: ${coinB.change24h?.toFixed(2) ?? "N/A"}%
7d Change: ${coinB.change7d?.toFixed(2) ?? "N/A"}%
30d Change: ${coinB.change30d?.toFixed(2) ?? "N/A"}%
Rank: #${coinB.rank ?? "N/A"}
ATH: $${coinB.ath?.toLocaleString() ?? "N/A"} (${coinB.athChange?.toFixed(1) ?? "N/A"}% from ATH)
Circulating Supply: ${coinB.circulatingSupply?.toLocaleString() ?? "N/A"}
Max Supply: ${coinB.maxSupply?.toLocaleString() ?? "N/A"}
`;

    const systemPrompt = `You are an elite crypto investment analyst. The user is comparing two tokens side-by-side. Provide a thorough, insightful comparison analysis.

Your analysis must include:
1. **Executive Summary** — Quick verdict on which shows stronger fundamentals right now
2. **Price & Momentum** — Compare price performance across timeframes (24h, 7d, 30d)
3. **Market Position** — Market cap dominance, volume-to-cap ratio, liquidity assessment
4. **Supply Dynamics** — Inflation risk, max supply cap, circulating vs total analysis
5. **Strength Assessment** — Which has stronger momentum, better value, or lower risk
6. **Verdict** — Clear recommendation on which is the better investment opportunity right now and why

Format rules:
- Use ## headers for each section
- Use bullet points and bold text for emphasis
- Be specific with numbers — reference the data provided
- Be opinionated — investors need clear direction, not fence-sitting
- Keep it concise but data-rich
- End with a clear one-line verdict`;

    const llmRes = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://orkestri.ai",
          "X-Title": "Orkestri AI Compare",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-70b-instruct",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Compare these two tokens:\n${context}\n\nProvide your multi-perspective comparison analysis.`,
            },
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      }
    );

    if (!llmRes.ok) {
      const errText = await llmRes.text();
      throw new Error(`OpenRouter error: ${llmRes.status} — ${errText}`);
    }

    const llmData = await llmRes.json();
    const analysisContent =
      llmData.choices?.[0]?.message?.content ||
      "Comparison analysis could not be generated.";

    // Award OKAI for compare
    let reward = null;
    if (walletAddress) {
      reward = await awardOKAI(walletAddress, "compare");
    }

    return Response.json({
      analysis: analysisContent,
      reward,
    });
  } catch (error) {
    console.error("Compare analysis error:", error);
    return Response.json(
      { error: "Failed to generate comparison analysis" },
      { status: 500 }
    );
  }
}
