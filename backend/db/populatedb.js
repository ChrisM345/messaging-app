const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning database...");

  await prisma.message.deleteMany({});
  await prisma.friend.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Database cleaned.");

  // Create 'chris' first
  const chrisPassword = await bcrypt.hash("chris", 10);
  const chris = await prisma.user.create({
    data: {
      username: "chris",
      password: chrisPassword,
    },
  });

  console.log("Created user: chris");

  // Create 50 test users and add them as friends with chris
  for (let i = 1; i <= 50; i++) {
    const username = `user${i}`;
    const hashedPassword = await bcrypt.hash(username, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // Make them friends with Chris (status: accepted)
    await prisma.friend.create({
      data: {
        senderId: chris.id,
        receiverId: user.id,
        status: "accepted",
      },
    });

    console.log(`Created and friended: ${username}`);
  }

  console.log("All users and friendships created.");
}

main()
  .catch((e) => {
    console.error("Error populating DB:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
