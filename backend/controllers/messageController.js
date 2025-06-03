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
    const { userId, friendUsername } = req.query;
    const friendUser = await getUserAccount(friendUsername);
    const friendId = parseInt(friendUser.id);
    const data = await getMessageHistory(parseInt(userId), friendId);
    return res.status(200).send(data);
  } catch {
    return res.status(500).send("failed to fetch message history");
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
