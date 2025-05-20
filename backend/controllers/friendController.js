const { getUserAccount } = require("../db/queries");

const sendFriendRequest = async (req, res, next) => {
  const { userId, friendUsername } = req.body;
  const { id: friendUsernameId } = await getUserAccount(friendUsername);
  if (userId == friendUsernameId) {
    return res.status(500).send("You can't add yourself as a friend");
  }
};

module.exports = {
  sendFriendRequest,
};
