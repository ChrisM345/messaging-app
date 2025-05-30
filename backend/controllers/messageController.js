const { getUserAccount, createMessage } = require("../db/queries");

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

module.exports = {
  sendMessage,
};
