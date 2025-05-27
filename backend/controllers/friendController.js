const {
  getUserAccount,
  existingFriend,
  newFriendRequest,
  getSentFriendRequests,
  getReceivedFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
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
  try {
    const data = await getSentFriendRequests(parseInt(req.query.userId));
    return res.status(200).json(data);
  } catch {
    return res.status(500).send("Failed to fetch sent friend requests.");
  }
};

const receivedFriendRequests = async (req, res) => {
  try {
    const data = await getReceivedFriendRequests(parseInt(req.query.userId));
    return res.status(200).json(data);
  } catch {
    return res.status(500).send("Failed to fetch received friend requests");
  }
};

const handleFriendResponse = async (req, res) => {
  try {
    const { requestId, action } = req.body;
    if (action == "accepted") {
      await acceptFriendRequest(requestId);
    } else {
      await declineFriendRequest(requestId);
    }
    return res.status(200).send("OK");
  } catch {
    return res.status(500).send("Failed to update friend request");
  }
};

module.exports = {
  sendFriendRequest,
  sentFriendRequests,
  receivedFriendRequests,
  handleFriendResponse,
};
