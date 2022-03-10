const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { User, Team, Notification } = require("../models");

exports.getTeam = async (req, res, next) => {
	try {
		const team = await Team.findOne({ where: { id: req.user.teamId } });
		// console.log(team.id);
		const teamMembers = await User.findAll({
			where: { teamId: team.id },
			attributes: {
				exclude: ["password", "email", "gender", "birthDate"],
			},
		});
		res.status(200).json({ teamData: { team, teamMembers } });
	} catch (err) {
		next(err);
	}
};
exports.getTeamProfileById = async (req, res, next) => {
	const id = req.params.teamId;
	try {
		const team = await Team.findOne({ where: { id } });
		const teamMembers = await User.findAll({
			where: { teamId: id },
			attributes: {
				exclude: ["password", "email", "gender", "birthDate"],
			},
		});
		res.status(200).json({ teamData: { team, teamMembers } });
	} catch (err) {
		next(err);
	}
};

exports.createTeam = async (req, res, next) => {
	const user = req.user;
	const { teamName, teamTag } = req.body;
	try {
		if (user.teamId) {
			res.status(400).json({
				message:
					"you already have a team please leave team before create the new One",
			});
		}
		const isTeamNameExisted = await Team.findOne({
			where: { title: teamName },
		});
		const isTeamTagExisted = await Team.findOne({ where: { tag: teamTag } });
		if (isTeamNameExisted || isTeamTagExisted) {
			isTeamNameExisted
				? res.status(400).json({ message: "this team name is already exist" })
				: res.status(400).json({ message: "this team tag is already exist" });
		}
		await Team.create({
			title: teamName.toUpperCase(),
			tag: teamTag.toUpperCase(),
			teamOwnerId: req.user.id,
		});
		const team = await Team.findOne({ where: { teamOwnerId: req.user.id } });
		await User.update({ teamId: team.id }, { where: { id: req.user.id } });
		res.status(200).json({ message: "Your team is created successfully" });
	} catch (err) {
		next(err);
	}
};

exports.uploadTeamProfileImage = (req, res, next) => {
	cloudinary.uploader.upload(req.file.path, async (err, result) => {
		if (err) return next(err);
		const team = await Team.findOne({ where: { id: req.user.teamId } });
		if (!team) {
			res.status(400).json({ message: "this team id is not exist" });
		}
		if (team.team_profile_img) {
			const splited = team.imgUrl.split("/");
			cloudinary.uploader.destroy(splited[splited.length - 1].split(".")[0]);
		}

		await Team.update(
			{ teamProfileImg: result.secure_url },
			{ where: { id: req.user.teamId } }
		);
		fs.unlinkSync(req.file.path);
		res.json({ message: "your team profile pic is uploaded successfully" });
	});
};

exports.leaveTeam = async (req, res, next) => {
	const id = req.user.id;
	try {
		const team = await Team.findOne({ where: { id: req.user.teamId } });
		if (!team) {
			res.status(400).json({ message: "you already dont have a team" });
		}
		// console.log(team.teamOwnerId);
		// console.log(req.user.id);
		if (team.teamOwnerId !== req.user.id) {
			await User.update({ teamId: null }, { where: { id } });
			res.json({ message: "leave team successfully" });
		}
		await Team.destroy({ where: { id: req.user.teamId } });
		await User.update({ teamId: null }, { where: { id } });
		res.json({ message: "leave and delete team successfully" });
	} catch (err) {
		next(err);
	}
};
