const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const agents = await prisma.agent.findMany()
  console.log('Agents in DB:', agents.map(a => a.slug))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
