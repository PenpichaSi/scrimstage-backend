const express = require("express");
const findPlayerController = require("../controllers/findPlayerController");
const authenticate = require("../middlewares/authenticator");

const router = express.Router();

router.get("/getAll", authenticate, findPlayerController.getAllPost);
router.post("/create", authenticate, findPlayerController.createPost);
router.delete("/delete/:postId", authenticate, findTeamController.deletePost);

module.exports = router;
