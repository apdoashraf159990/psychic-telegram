const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding ROOH SQLite database directly...");

  const hash = await bcrypt.hash("RoohOwner#2026!", 10);
  await prisma.user.upsert({
    where: { username: "abdo_admin" },
    update: {},
    create: {
      username: "abdo_admin",
      email: "owner@rooh-beauty.eg",
      passwordHash: hash,
      name: "عبد الرحمن المدير",
      role: "OWNER",
      isActive: true,
    },
  });

  console.log("Owner created/verified: abdo_admin");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

