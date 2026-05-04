import { prisma } from "@/lib/prisma";
import { awardOKAI } from "@/lib/rewards";

export async function POST(request) {
  try {
    const body = await request.json();
    const { analysisId, winnerAgentSlug, walletAddress } = body;

    if (!analysisId || !winnerAgentSlug) {
      return Response.json(
        { error: "analysisId and winnerAgentSlug are required" },
        { status: 400 }
      );
    }

    // Check if already voted
    const existingWinner = await prisma.agentResponse.findFirst({
      where: { analysisId, isWinner: true },
    });

    if (existingWinner) {
      return Response.json(
        { error: "A winner has already been selected for this analysis" },
        { status: 400 }
      );
    }

    // Mark the winner
    await prisma.agentResponse.updateMany({
      where: { analysisId, agentSlug: winnerAgentSlug },
      data: { isWinner: true },
    });

    // Get all responses for this analysis to update stats
    const responses = await prisma.agentResponse.findMany({
      where: { analysisId },
    });

    // Update stats for each agent
    for (const response of responses) {
      const isWinner = response.agentSlug === winnerAgentSlug;

      // Get or create agent stats
      let stats = await prisma.agentStats.findFirst({
        where: { agent: { slug: response.agentSlug } },
      });

      if (!stats) {
        const agent = await prisma.agent.findUnique({
          where: { slug: response.agentSlug },
        });
        if (!agent) continue;
        stats = await prisma.agentStats.create({
          data: {
            agentId: agent.id,
            totalAnalyses: 0,
            totalWins: 0,
            winRate: 0,
            avgScore: 0,
            totalScore: 0,
            avgResponseMs: 0,
            totalResponseMs: BigInt(0),
          },
        });
      }

      const newTotalAnalyses = stats.totalAnalyses + 1;
      const newTotalWins = isWinner ? stats.totalWins + 1 : stats.totalWins;
      const newWinRate =
        newTotalAnalyses > 0 ? (newTotalWins / newTotalAnalyses) * 100 : 0;
      const newTotalScore = isWinner
        ? stats.totalScore + 10
        : stats.totalScore + 1;
      const newAvgScore =
        newTotalAnalyses > 0 ? newTotalScore / newTotalAnalyses : 0;
      const newTotalResponseMs =
        BigInt(stats.totalResponseMs) + BigInt(response.responseMs);
      const newAvgResponseMs =
        newTotalAnalyses > 0
          ? Number(newTotalResponseMs) / newTotalAnalyses
          : 0;

      await prisma.agentStats.update({
        where: { id: stats.id },
        data: {
          totalAnalyses: newTotalAnalyses,
          totalWins: newTotalWins,
          winRate: newWinRate,
          totalScore: newTotalScore,
          avgScore: newAvgScore,
          totalResponseMs: newTotalResponseMs,
          avgResponseMs: newAvgResponseMs,
        },
      });
    }

    // Award OKAI for voting
    let reward = null;
    if (walletAddress) {
      reward = await awardOKAI(walletAddress, "vote", analysisId);
    }

    return Response.json({ success: true, winner: winnerAgentSlug, reward });
  } catch (error) {
    console.error("Vote error:", error);
    return Response.json({ error: "Failed to save vote" }, { status: 500 });
  }
}
