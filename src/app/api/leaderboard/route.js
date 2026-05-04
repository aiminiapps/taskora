import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get("sort") || "wins";
    const period = searchParams.get("period") || "all";

    // Get all agents with stats
    const agents = await prisma.agent.findMany({
      include: { stats: true },
    });

    // Map and sort
    let ranked = agents.map((agent) => ({
      slug: agent.slug,
      name: agent.name,
      type: agent.type,
      emoji: agent.emoji,
      avatarColor: agent.avatarColor,
      totalAnalyses: agent.stats?.totalAnalyses || 0,
      totalWins: agent.stats?.totalWins || 0,
      winRate: agent.stats?.winRate || 0,
      avgScore: agent.stats?.avgScore || 0,
      avgResponseMs: agent.stats?.avgResponseMs || 0,
    }));

    // Sort based on criteria
    switch (sort) {
      case "wins":
        ranked.sort((a, b) => b.totalWins - a.totalWins);
        break;
      case "winRate":
        ranked.sort((a, b) => b.winRate - a.winRate);
        break;
      case "score":
        ranked.sort((a, b) => b.avgScore - a.avgScore);
        break;
      case "speed":
        ranked.sort((a, b) => a.avgResponseMs - b.avgResponseMs);
        break;
      default:
        ranked.sort((a, b) => b.totalWins - a.totalWins);
    }

    // Add rank
    ranked = ranked.map((agent, i) => ({ ...agent, rank: i + 1 }));

    return Response.json(ranked);
  } catch (error) {
    console.error("Leaderboard fetch error:", error);
    return Response.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
