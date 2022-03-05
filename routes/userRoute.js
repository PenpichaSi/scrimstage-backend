const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authenticator");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/me", authenticate, userController.getMe);
router.post("/register", authController.register);
router.post("login", authController.login);
router.patch(
	"/user-profile-image",
	authenticate,
	upload.single("userProfileImg"),
	userController.updateUserProfileImg
);

module.exports = router;
