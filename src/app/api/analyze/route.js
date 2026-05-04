import { prisma } from "@/lib/prisma";
import { AGENTS } from "@/lib/agents";
import { awardOKAI } from "@/lib/rewards";

export async function POST(request) {
  try {
    const body = await request.json();
    const { token, contractAddress, question, category, language, style, walletAddress } = body;

    if (!token || !question) {
      return Response.json(
        { error: "Token name and question are required" },
        { status: 400 }
      );
    }

    // Create analysis record
    const analysis = await prisma.analysis.create({
      data: {
        token,
        contractAddress: contractAddress || null,
        question,
        category: category || "Investment Analysis",
        language: language || "English",
        style: style || "Detailed Report",
        walletAddress: walletAddress || null,
      },
    });

    // Fetch crypto data from CoinGecko if available
    let cryptoContext = "";
    try {
      const cgRes = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(token)}`,
        {
          headers: {
            Accept: "application/json",
            ...(process.env.COINGECKO_API_KEY && {
              "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
            }),
          },
        }
      );
      if (cgRes.ok) {
        const cgData = await cgRes.json();
        const coin = cgData.coins?.[0];
        if (coin) {
          // Fetch detailed market data
          const detailRes = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&community_data=false&developer_data=false`,
            {
              headers: {
                Accept: "application/json",
                ...(process.env.COINGECKO_API_KEY && {
                  "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
                }),
              },
            }
          );
          if (detailRes.ok) {
            const detail = await detailRes.json();
            const md = detail.market_data;
            if (md) {
              cryptoContext = `
[MARKET DATA CONTEXT]
Token: ${detail.name} (${detail.symbol?.toUpperCase()})
Current Price: $${md.current_price?.usd?.toLocaleString() ?? "N/A"}
Market Cap: $${md.market_cap?.usd?.toLocaleString() ?? "N/A"}
Market Cap Rank: #${detail.market_cap_rank ?? "N/A"}
24h Volume: $${md.total_volume?.usd?.toLocaleString() ?? "N/A"}
24h Change: ${md.price_change_percentage_24h?.toFixed(2) ?? "N/A"}%
7d Change: ${md.price_change_percentage_7d?.toFixed(2) ?? "N/A"}%
30d Change: ${md.price_change_percentage_30d?.toFixed(2) ?? "N/A"}%
ATH: $${md.ath?.usd?.toLocaleString() ?? "N/A"} (${md.ath_change_percentage?.usd?.toFixed(1) ?? "N/A"}% from ATH)
Circulating Supply: ${md.circulating_supply?.toLocaleString() ?? "N/A"}
Total Supply: ${md.total_supply?.toLocaleString() ?? "N/A"}
Max Supply: ${md.max_supply?.toLocaleString() ?? "N/A"}
`;
            }
          }
        }
      }
    } catch (e) {
      // CoinGecko fetch failed, continue without context
      console.warn("CoinGecko fetch failed:", e.message);
    }

    // Generate responses from all 3 agents in parallel
    const agentPromises = AGENTS.map(async (agent) => {
      const startTime = Date.now();

      const userPrompt = `${cryptoContext}

[USER QUERY]
Project/Token: ${token}
${contractAddress ? `Contract: ${contractAddress}` : ""}
Question: ${question}
Category: ${category || "Investment Analysis"}
Language: ${language || "English"}
Detail Level: ${style || "Detailed Report"}

Please provide your ${agent.type.toLowerCase()} analysis.`;

      try {
        const llmRes = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
              "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://orkestri.ai",
              "X-Title": "Orkestri AI",
            },
            body: JSON.stringify({
              model: "meta-llama/llama-3.3-70b-instruct",
              messages: [
                { role: "system", content: agent.systemPrompt },
                { role: "user", content: userPrompt },
              ],
              max_tokens: style === "Short Summary" ? 800 : 2000,
              temperature: 0.7,
            }),
          }
        );

        if (!llmRes.ok) {
          const errText = await llmRes.text();
          throw new Error(`OpenRouter error: ${llmRes.status} - ${errText}`);
        }

        const llmData = await llmRes.json();
        const content =
          llmData.choices?.[0]?.message?.content ||
          "Analysis could not be generated.";
        const responseMs = Date.now() - startTime;

        // Save response to DB
        await prisma.agentResponse.create({
          data: {
            analysisId: analysis.id,
            agentSlug: agent.slug,
            content,
            responseMs,
          },
        });

        return { slug: agent.slug, content, responseMs, success: true };
      } catch (err) {
        const responseMs = Date.now() - startTime;
        const fallbackContent = `## ⚠️ Analysis Unavailable\n\nThe ${agent.name} was unable to complete the analysis at this time.\n\n**Error:** ${err.message}\n\nPlease try again later.`;

        await prisma.agentResponse.create({
          data: {
            analysisId: analysis.id,
            agentSlug: agent.slug,
            content: fallbackContent,
            responseMs,
          },
        });

        return {
          slug: agent.slug,
          content: fallbackContent,
          responseMs,
          success: false,
        };
      }
    });

    await Promise.all(agentPromises);

    // Award OKAI for analysis
    let reward = null;
    if (walletAddress) {
      reward = await awardOKAI(walletAddress, "analysis", analysis.id);
    }

    return Response.json({
      analysisId: analysis.id,
      message: "Analysis complete",
      reward,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return Response.json(
      { error: "Failed to process analysis request" },
      { status: 500 }
    );
  }
}
