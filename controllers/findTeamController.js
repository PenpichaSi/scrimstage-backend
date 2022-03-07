const { User, FindTeam } = require("../models");

exports.getAllPost = async (req, res, next) => {
	try {
		const allPost = await FindTeam.findAll({ where: { status: false } });
		res.status(200).json({ allPost });
	} catch (err) {
		next(err);
	}
};

exports.createPost = async (req, res, next) => {
	const { position, rank, status } = req.body;
	try {
		await FindTeam.create({
			userId: req.user.id,
			position,
			rank,
			status: false,
		});

		res.status(200).json({ message: "successfully create post in Find Team" });
	} catch (err) {
		next(err);
	}
};

exports.deletePost = async (req, res, next) => {
	const postId = req.params.postId;
	try {
		await FindTeam.destroy({ where: { id: postId } });
		res.json({ message: "successfully delete find Team Post" });
	} catch (err) {
		next(err);
	}
};
