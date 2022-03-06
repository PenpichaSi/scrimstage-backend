const express = require("express");
const authenticate = require("../middlewares/authenticator");
const notificationController = require("../controllers/notificationController");

const router = express.Router();
router.post(
	"/team/invite/:userId",
	authenticate,
	notificationController.invitePlayerRequest
);

module.exports = router;
