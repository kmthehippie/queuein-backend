const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = prisma;
