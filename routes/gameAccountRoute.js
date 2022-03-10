const express = require("express");
const authenticate = require("../middlewares/authenticator");
const gameAccountController = require("../controllers/gameAccountController");

const router = express.Router();

router.get("/", authenticate, gameAccountController.getAllData);
router.get("/:userId", authenticate, gameAccountController.getUserProfilebyId);
router.post(
	"/connect",
	authenticate,
	gameAccountController.initValorantConnection
);

router.patch("/update-stats", authenticate, gameAccountController.updateStats);

module.exports = router;
