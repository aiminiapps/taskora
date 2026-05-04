import { prisma } from "@/lib/prisma";

// OKAI reward amounts
export const REWARDS = {
  ANALYSIS: 30,
  VOTE: 10,
  COMPARE: 20,
};

/**
 * Award OKAI tokens to a wallet address
 * @param {string} walletAddress
 * @param {"analysis"|"vote"|"compare"} action
 * @param {string|null} referenceId
 * @returns {Promise<{balance: number, earned: number}>}
 */
export async function awardOKAI(walletAddress, action, referenceId = null) {
  if (!walletAddress) return null;

  const amount = REWARDS[action.toUpperCase()] || 0;
  if (amount === 0) return null;

  // Upsert user reward record
  const reward = await prisma.userReward.upsert({
    where: { walletAddress },
    create: {
      walletAddress,
      okaiBalance: amount,
      totalEarned: amount,
      analysisCount: action === "analysis" ? 1 : 0,
      voteCount: action === "vote" ? 1 : 0,
      compareCount: action === "compare" ? 1 : 0,
    },
    update: {
      okaiBalance: { increment: amount },
      totalEarned: { increment: amount },
      ...(action === "analysis" && { analysisCount: { increment: 1 } }),
      ...(action === "vote" && { voteCount: { increment: 1 } }),
      ...(action === "compare" && { compareCount: { increment: 1 } }),
    },
  });

  // Log the reward
  await prisma.rewardLog.create({
    data: {
      walletAddress,
      action,
      amount,
      referenceId,
    },
  });

  return { balance: reward.okaiBalance, earned: amount };
}
