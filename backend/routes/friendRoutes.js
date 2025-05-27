const express = require("express");
const router = express.Router();

const controller = require("../controllers/friendController");

router.post("/sendFriendRequest", controller.sendFriendRequest);
router.get("/friendRequests/received", controller.receivedFriendRequests);
router.get("/friendRequests/sent", controller.sentFriendRequests);
router.post("/friendRequests/respond", controller.handleFriendResponse);

module.exports = router;
