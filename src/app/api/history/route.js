import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    if (!wallet) {
      return Response.json(
        { error: "Wallet address required" },
        { status: 400 }
      );
    }

    const [analyses, total] = await Promise.all([
      prisma.analysis.findMany({
        where: { walletAddress: wallet },
        include: {
          responses: {
            select: {
              agentSlug: true,
              isWinner: true,
              responseMs: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.analysis.count({ where: { walletAddress: wallet } }),
    ]);

    return Response.json({
      analyses,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("History fetch error:", error);
    return Response.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}
