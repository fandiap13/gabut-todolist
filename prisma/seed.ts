// import { prisma } from "@/lib/prisma";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Penting" },
  { name: "Gak Penting" },
  { name: "Penting Bingits" },
];

const main = async () => {
  console.log("Seeding categories...");
  for (const category of categories) {
    await prisma.category.create({ data: category });
  }
  console.log("Seeding completed.");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
