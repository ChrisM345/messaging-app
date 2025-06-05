const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const controller = require("../controllers/friendController");

router.post("/sendFriendRequest", verifyToken, controller.sendFriendRequest);
router.get("/friendRequests/received", verifyToken, controller.receivedFriendRequests);
router.get("/friendRequests/sent", verifyToken, controller.sentFriendRequests);
router.post("/friendRequests/respond", verifyToken, controller.handleFriendResponse);
router.get("/friends", verifyToken, controller.handleGetFriends);

module.exports = router;
