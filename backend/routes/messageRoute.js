const express = require("express");
const router = express.Router();

const controller = require("../controllers/messageController");

router.post("/message/send", controller.sendMessage);
router.get("/message/history", controller.getMessages);

module.exports = router;
