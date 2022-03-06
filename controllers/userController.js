const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { User } = require("../models");

exports.getMe = (req, res, next) => {
	const { id, username, img_url } = req.body;

	res.status(200).json({ user: { id, username, img_url } });
};

exports.updateUserProfileImg = (req, res, next) => {
	cloudinary.uploader.upload(req.file.path, async (err, result) => {
		if (err) return next(err);
		const user = await User.findOne({ where: { id: req.user.id } });

		if (!user) {
			res.status(400).json({ message: "user not found" });
		}

		if (user.img_url) {
			const splited = user.imgUrl.split("/");
			cloudinary.uploader.destroy(splited[splited.length - 1].split(".")[0]);
		}
		await User.update(
			{ imgUrl: result.secure_url },
			{ where: { id: req.user.id } }
		);
		fs.unlinkSync(req.file.path);
		res.json({ message: "up loaded profile picture successfully" });
	});
};
