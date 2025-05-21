const {
  getUserAccount,
  existingFriend,
  newFriendRequest,
  getSentFriendRequests,
  getReceivedFriendRequests,
} = require("../db/queries");

const sendFriendRequest = async (req, res, next) => {
  const { userId, friendUsername } = req.body;
  const friendAccount = await getUserAccount(friendUsername);

  try {
    if (!friendAccount) {
      return res.status(404).send("User not found");
    }
    const friendId = friendAccount.id;

    if (userId == friendId) {
      return res.status(500).send("You can't add yourself as a friend");
    }

    const friendExists = await existingFriend(userId, friendId);
    if (friendExists) {
      return res.status(400).send("You are already friends or a request is pending");
    }

    const createFriendRequest = await newFriendRequest(userId, friendId);
    if (createFriendRequest) {
      return res.status(200).send("Friend request sent");
    }
  } catch (error) {
    res.status(500).send("Failed to send friend request");
  }
};

const sentFriendRequests = async (req, res) => {
  getSentFriendRequests(parseInt(req.query.userId));
};

const receivedFriendRequests = async (req, res) => {
  getReceivedFriendRequests(parseInt(req.query.userId));
};

module.exports = {
  sendFriendRequest,
  sentFriendRequests,
  receivedFriendRequests,
};
