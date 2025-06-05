const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const controller = require("../controllers/messageController");

router.post("/message/send", verifyToken, controller.sendMessage);
router.get("/message/history", verifyToken, controller.getMessages);

module.exports = router;
