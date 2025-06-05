const { getUserAccount, createMessage, getMessageHistory } = require("../db/queries");

const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverName, content } = req.body;
    const receiverUser = await getUserAccount(receiverName);
    const receiverId = parseInt(receiverUser.id);
    await createMessage(senderId, receiverId, content);
    return res.status(200).send("OK");
  } catch {
    return res.status(500).send("Failed to send message");
  }
};

const getMessages = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { friendUsername } = req.query;
    console.log(req.query.userId);
    if (parseInt(userId) !== parseInt(req.query.userId)) {
      return res.status(403).send("Forbidden: Cannot access another user's messages.");
    }
    const userIdInt = parseInt(userId);

    const friendUser = await getUserAccount(friendUsername);
    const friendId = parseInt(friendUser.id);

    const data = await getMessageHistory(userIdInt, friendId);

    const io = req.app.get("io");

    // Notify the *sender* that their messages have been read
    io.to(`user_${userId}`).emit("refreshFriendsList");

    return res.status(200).send(data);
  } catch (err) {
    console.error("getMessages error:", err);
    return res.status(500).send("failed to fetch message history");
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
