const express = require("express");
const findTeamController = require("../controllers/findTeamController");
const authenticate = require("../middlewares/authenticator");

const router = express.Router();

router.get("/getAll", authenticate, findTeamController.getAllPost);
router.post("/create", authenticate, findTeamController.createPost);
router.delete("/delete/:postId", authenticate, findTeamController.deletePost);
module.exports = router;
