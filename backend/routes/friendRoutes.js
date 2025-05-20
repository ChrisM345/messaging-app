const express = require("express");
const router = express.Router();

const controller = require("../controllers/friendController");

router.post("/sendFriendRequest", controller.sendFriendRequest);

module.exports = router;
