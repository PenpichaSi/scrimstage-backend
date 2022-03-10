const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.getMe = async (req, res, next) => {
	const { id, username, imgUrl, createdAt, teamId } = req.user;

	res.status(200).json({ user: { id, username, imgUrl, createdAt,teamId } });
};

exports.getUserProfileById = async (req, res, next) => {
	const id = req.params.userId;
	try {
		const user = await User.findOne({ where: { id } });
		res.status(200).json({ user });
	} catch (err) {
		next(err);
	}
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

exports.getProfileById = async (req, res, next) => {
	const id = req.params.userId;
	try {
		const user = await User.findOne({
			where: { id },
			attributes: { exclude: ["password", "email", "gender", "birth_date"] },
		});

		res.status(200).json({ user });
	} catch (err) {
		next(err);
	}
};

exports.editEmail = async (req, res, next) => {
	const id = req.user.id;
	const { email } = req.body;
	try {
		const isEmail = emailFormat.test(email);
		if (isEmail) {
			const existEmail = await User.findOne({ where: { email: email } });
			if (existEmail)
				return res
					.status(400)
					.json({ message: "this email is already in used" });
		}

		await User.update(
			{
				email: email,
			},
			{ where: { id } }
		);
		res.status(200).json({ message: "email is updated" });
	} catch (err) {
		next(err);
	}
};

exports.editUsername = async (req, res, next) => {
	const id = req.user.id;
	const { username } = req.body;
	try {
		const exisUser = await User.findOne({ where: { username } });
		if (exisUser) {
			return res.status(400).json({ message: "this email is already in used" });
		}
		await User.update({ email: email }, { where: { id } });
		res.status(200).json("successfully update the username");
	} catch (error) {
		next(err);
	}
};

exports.editPassword = async (req, res, next) => {
	const id = req.user.id;
	const { oldPassword, newPassword, repeatNewPassword } = req.body;
	try {
		const user = await User.findOne({ where: { id } });
		const isOldPasswordMatch = await bcrypt.compare(oldPassword, user.password);
		if (!isOldPasswordMatch) {
			return res.status(400).json({ message: "old password is wrongg" });
		}

		if (newPassword !== repeatNewPassword) {
			return res.status(400).json({ message: "new password are not match" });
		}

		const hashedPassword = bcrypt.hash(newPassword, 10);
		await User.update(
			{
				password: hashedPassword,
			},
			{ where: { id } }
		);
		res.status(200).json("successfully updated password");
	} catch (err) {
		next(err);
	}
};
