import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const agents = await prisma.agent.findMany({
      include: { stats: true },
      orderBy: { createdAt: "asc" },
    });

    // Serialize BigInt fields
    const serialized = agents.map((a) => ({
      ...a,
      stats: a.stats
        ? {
            ...a.stats,
            totalResponseMs: Number(a.stats.totalResponseMs),
          }
        : null,
    }));

    return Response.json(serialized);
  } catch (error) {
    console.error("Agents fetch error:", error);
    return Response.json(
      { error: "Failed to fetch agents" },
      { status: 500 }
    );
  }
}
