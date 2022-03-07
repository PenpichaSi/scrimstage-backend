const { User, Notification, FindPlayer } = require("../models");

exports.getAll = async (req, res, next) => {
	try {
		const allPost = await FindPlayer.findAll({ where: { status: false } });
		res.status(200).json({ allPost });
	} catch (err) {
		next(err);
	}
};

exports.createPost = async (req, res, next) => {
	const { position, rank, status } = req.body;
	try {
		await FindPlayer.create({
			userId: req.user.id,
			teamId: req.user.teamId,
			position,
			rank,
			status: false,
		});

		res.status(200).json({ message: "success fully create find player post" });
	} catch (err) {
		next(err);
	}
};

exports.deletePost = async (req, res, next) => {
	const postId = req.params.postId;
	try {
		await FindPlayer.destroy({ where: { id: postId } });
	} catch (err) {
		next(err);
	}
};
