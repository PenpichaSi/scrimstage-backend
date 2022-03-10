const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authenticator");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/me", authenticate, userController.getMe);
router.get(
	"/getUserProfile/:userId",
	authenticate,
	userController.getUserProfileById
);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.patch(
	"/profile",
	authenticate,
	upload.single("img_url"),
	userController.updateUserProfileImg
);
router.patch("/edit/username", authenticate, userController.editUsername);
router.patch("/edit/email", authenticate, userController.editEmail);
router.patch("edit/password", authenticate, userController.editPassword);
router.get("/getProfile/:userId", authenticate, userController.getProfileById);

module.exports = router;
