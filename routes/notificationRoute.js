const express = require("express");
const authenticate = require("../middlewares/authenticator");
const notificationController = require("../controllers/notificationController");

const router = express.Router();

// team invite player
router.post(
	"/invite/byTeam/:userId",
	authenticate,
	notificationController.invitePlayerRequest
);
router.patch(
	"/accept/byTeam/:notificationId",
	authenticate,
	notificationController.acceptInviteRequest
);
router.delete(
	"/reject/byTeam/:requestId",
	authenticate,
	notificationController.rejectInviteRequest
);

// player request to join team
router.post(
	"/request/byPlayer/:teamId",
	authenticate,
	notificationController.joiningTeamRequest
);
router.patch(
	"/accept/byPlayer/:notificationId",
	authenticate,
	notificationController.acceptJoiningTeamRequest
);

router.delete(
	"/reject/byPlayer/requestId",
	authenticate,
	notificationController.rejectJoiningTeamRequest
);

module.exports = router;
