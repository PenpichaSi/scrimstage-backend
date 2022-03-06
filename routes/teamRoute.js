const express = require("express");
const teamController = require("../controllers/teamController");
const authenticate = require("../middlewares/authenticator");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/getTeam", authenticate, teamController.getTeam);
router.post("/create", authenticate, teamController.createTeam);
router.patch(
	"/uploadTeamimage",
	authenticate,
	upload.single("team_profile"),
	teamController.uploadTeamProfileImage
);
router.delete("/leave", authenticate, teamController.leaveTeam);

module.exports = router;
