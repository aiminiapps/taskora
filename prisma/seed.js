// Orkestri AI — Database Seed Script
// Seeds the 3 built-in agents with initial stats

import { PrismaClient } from "@prisma/client";
import { AGENTS } from "../src/lib/agents.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Orkestri AI database...");

  for (const agent of AGENTS) {
    const existing = await prisma.agent.findUnique({
      where: { slug: agent.slug },
    });

    if (existing) {
      console.log(`  ↳ Agent "${agent.name}" already exists, updating...`);
      await prisma.agent.update({
        where: { slug: agent.slug },
        data: {
          name: agent.name,
          type: agent.type,
          specialty: agent.specialty,
          systemPrompt: agent.systemPrompt,
          avatarColor: agent.avatarColor,
          emoji: agent.emoji,
        },
      });
    } else {
      console.log(`  ↳ Creating agent "${agent.name}"...`);
      await prisma.agent.create({
        data: {
          slug: agent.slug,
          name: agent.name,
          type: agent.type,
          specialty: agent.specialty,
          systemPrompt: agent.systemPrompt,
          avatarColor: agent.avatarColor,
          emoji: agent.emoji,
          stats: {
            create: {
              totalAnalyses: 0,
              totalWins: 0,
              winRate: 0,
              avgScore: 0,
              totalScore: 0,
              avgResponseMs: 0,
              totalResponseMs: BigInt(0),
            },
          },
        },
      });
    }
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
