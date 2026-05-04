import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const agent = await prisma.agent.findUnique({
      where: { slug },
      include: { stats: true },
    });

    if (!agent) {
      return Response.json({ error: "Agent not found" }, { status: 404 });
    }

    // Get recent winning responses
    const recentWins = await prisma.agentResponse.findMany({
      where: { agentSlug: slug, isWinner: true },
      include: {
        analysis: {
          select: {
            id: true,
            token: true,
            question: true,
            category: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return Response.json({
      ...agent,
      stats: agent.stats
        ? {
            ...agent.stats,
            totalResponseMs: Number(agent.stats.totalResponseMs),
          }
        : null,
      recentWins,
    });
  } catch (error) {
    console.error("Agent fetch error:", error);
    return Response.json(
      { error: "Failed to fetch agent" },
      { status: 500 }
    );
  }
}
