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
      status: "pending",
    },
    include: {
      sender: true,
      receiver: true,
    },
  });
  return receivedFriendRequests;
}

async function getSentFriendRequests(userId) {
  const sentFriendRequests = await prisma.friend.findMany({
    where: {
      senderId: userId,
      status: "pending",
    },
    include: {
      sender: true,
      receiver: true,
    },
  });
  return sentFriendRequests;
}

async function acceptFriendRequest(requestId) {
  const acceptRequest = await prisma.friend.update({
    where: {
      id: requestId,
    },
    data: {
      status: "accepted",
    },
  });
  return acceptRequest;
}

async function declineFriendRequest(requestId) {
  const declineRequest = await prisma.friend.delete({
    where: {
      id: requestId,
    },
  });
  return declineRequest;
}

async function getFriends(userId) {
  const friends = await prisma.friend.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
      status: "accepted",
    },
    orderBy: {
      lastMessageAt: "desc",
    },
    include: {
      sender: true,
      receiver: true,
    },
  });

  return friends;
}

async function createMessage(senderId, receiverId, content) {
  const message = await prisma.message.create({
    data: {
      senderId,
      receiverId,
      content,
    },
    include: {
      sender: true,
      receiver: true,
    },
  });
  return message;
}

async function getMessageHistory(userId, friendId) {
  await prisma.message.updateMany({
    where: {
      senderId: friendId,
      receiverId: userId,
      read: false,
    },
    data: {
      read: true,
    },
  });

  const messageHistory = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId },
      ],
    },
    include: {
      sender: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return messageHistory;
}

async function updateLastMessageAt(senderId, receiverId) {
  const updateLastMessage = await prisma.friend.updateMany({
    where: {
      OR: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
    data: {
      lastMessageAt: new Date(),
    },
  });
  return updateLastMessage;
}

module.exports = {
  createUserAccount,
  getUserAccount,
  existingFriend,
  newFriendRequest,
  getReceivedFriendRequests,
  getSentFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  getFriends,
  createMessage,
  getMessageHistory,
  updateLastMessageAt,
};
