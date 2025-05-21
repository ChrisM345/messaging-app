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

async function existingFriend(senderId, receiverId) {
  const friend = await prisma.friend.findFirst({
    where: {
      OR: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
  });
  return friend;
}

async function newFriendRequest(senderId, receiverId) {
  const newFriend = await prisma.friend.create({
    data: {
      senderId,
      receiverId,
    },
  });
  return newFriend;
}

async function getReceivedFriendRequests(userId) {
  const receivedFriendRequests = await prisma.friend.findMany({
    where: {
      receiverId: userId,
    },
  });
  return receivedFriendRequests;
}

async function getSentFriendRequests(userId) {
  const sentFriendRequests = await prisma.friend.findMany({
    where: {
      senderId: userId,
    },
  });
  return sentFriendRequests;
}

module.exports = {
  createUserAccount,
  getUserAccount,
  existingFriend,
  newFriendRequest,
  getReceivedFriendRequests,
  getSentFriendRequests,
};
