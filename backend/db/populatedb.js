const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning database...");

  await prisma.friend.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Database cleaned.");

  // Create test users
  const users = [
    { username: "test", password: "test" },
    { username: "chris", password: "chris" },
    { username: "tom", password: "tom" },
  ];

  console.log("Creating users...");

  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await prisma.user.create({
      data: {
        username: userData.username,
        password: hashedPassword,
      },
    });
  }

  console.log("Users created.");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
