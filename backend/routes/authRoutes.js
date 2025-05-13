const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

router.post("/createAccount", controller.createAccount);
router.post("/login", controller.login);
router.get("/auth/me", verifyToken, controller.getUser);

module.exports = router;
