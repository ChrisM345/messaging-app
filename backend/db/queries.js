const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function doesUserExist(username) {
  const user = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });
  return user;
}

async function createUserAccount(username, password) {
  const user = await prisma.users.create({
    data: {
      username: username,
      password: password,
    },
  });
}

module.exports = {
  doesUserExist,
  createUserAccount,
};
