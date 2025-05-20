const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getUserAccount(username) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user;
}

async function createUserAccount(username, password) {
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
}

module.exports = {
  createUserAccount,
  getUserAccount,
};
