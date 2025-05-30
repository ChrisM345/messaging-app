const express = require("express");
const router = express.Router();

const controller = require("../controllers/messageController");

router.post("/message/send", controller.sendMessage);

module.exports = router;
