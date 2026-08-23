import "dotenv/config";

import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "test2",
      password: "1234",
      age: 20,
      city: "pune",
      todos: {
        create: [
          {
            title: "go to gym",
            description: "go to gym and do 10 pushups",
            done: false,
          },
          {
            title: "learn Prisma",
            description: "complete Prisma assignment",
            done: false,
          },
        ],
      },
    },
  });

  console.log(user);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });