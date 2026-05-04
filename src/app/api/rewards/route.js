import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet");

    if (!wallet) {
      return Response.json({ error: "Wallet address required" }, { status: 400 });
    }

    // Get or create reward record
    const reward = await prisma.userReward.upsert({
      where: { walletAddress: wallet },
      create: { walletAddress: wallet },
      update: {},
    });

    // Get recent reward logs
    const recentLogs = await prisma.rewardLog.findMany({
      where: { walletAddress: wallet },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return Response.json({
      balance: reward.okaiBalance,
      totalEarned: reward.totalEarned,
      analysisCount: reward.analysisCount,
      voteCount: reward.voteCount,
      compareCount: reward.compareCount,
      recentLogs,
    });
  } catch (error) {
    console.error("Rewards fetch error:", error);
    return Response.json({ error: "Failed to fetch rewards" }, { status: 500 });
  }
}
