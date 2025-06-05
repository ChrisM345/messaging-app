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

async function acceptFriendRequest(requestId, userId) {
  // Fetch the friend request
  const request = await prisma.friend.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    throw new Error("Friend request not found.");
  }

  // ✅ Only the receiver can accept
  if (request.receiverId !== userId) {
    throw new Error("Unauthorized: You are not allowed to accept this request.");
  }

  // Update the status to accepted
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
  // Mark individual messages as read
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

  // Find the friend record (in either direction)
  const friend = await prisma.friend.findFirst({
    where: {
      OR: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId },
      ],
    },
  });

  if (friend) {
    const unreadField = friend.senderId === userId ? "senderUnread" : "receiverUnread";

    // Set the correct unread flag to false
    await prisma.friend.update({
      where: { id: friend.id },
      data: {
        [unreadField]: false,
      },
    });
  }

  // Fetch full message history
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
  const friend = await prisma.friend.findFirst({
    where: {
      OR: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
  });

  if (!friend) return null;

  const unreadField = friend.senderId === receiverId ? "senderUnread" : "receiverUnread";

  const updateLastMessage = await prisma.friend.update({
    where: { id: friend.id },
    data: {
      lastMessageAt: new Date(),
      [unreadField]: true,
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
