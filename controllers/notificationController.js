const { User, Team, Notification, FindTeam, FindPlayer } = require("../models");
const { Op } = require("sequelize");

exports.getAllNotification = async (req, res, next) => {
	const id = req.user.id;
	try {
		const allNotification = await Notification.findAll({
			where: {
				[Op.and]: [{ requestToId: id }, { status: "PENDING" }],
			},
		});
		if (req.user.teamId) {
			for (let i = 0; i < allNotification.length; i++) {
				const post = await FindTeam.findOne({
					where: { userId: allNotification[i].requestFromId },
				});
				const include = {notification: allNotification[i].dataValues,...post.dataValues};
				// console.log(allNotification[i]);
				allNotification.splice(i, 1, include);
			}
		} else {
			for (let i = 0; i < allNotification.length; i++) {
				const post = await FindTeam.findOne({
					where: { userId: allNotification[i].requestToId },
					raw: true,
					nest: true,
					
				});
				const include = {notification: allNotification[i],...post};
				// console.log(include);
				allNotification.splice(i, 1, include);
			}
		}

		res.status(200).json({ allNotification });
	} catch (err) {
		next(err);
	}
};

exports.invitePlayerRequest = async (req, res, next) => {
	const { userId } = req.params;
	console.log(userId);
	try {
		const invitedUser = await User.findOne({ where: { id: userId } });
		if (invitedUser.teamId) {
			res.status(400).json({ message: "this user already has a team" });
		}
		const existedRequest = await Notification.findOne({
			where: { requestToId: userId, status: "PENDING" },
		});
		if (existedRequest)
			return res
				.status(400)
				.json({ message: "your request has already been sent" });

		await Notification.create({
			requestFromId: req.user.id,
			requestToId: userId,
			type: "INVITE_PLAYER_REQUEST",
			status: "PENDING",
		});

		res.status(200).json({ message: "sent the invite successfully" });
	} catch (err) {
		next(err);
	}
};

exports.acceptInviteRequest = async (req, res, next) => {
	const { notificationId, findPlayerId } = req.params;
	try {
		const notification = await Notification.findOne({
			where: { id: notificationId },
			include: [
				{
					model: User,
					attributes: { exclude: ["password", "email", "birthDate", "gender"] },
					as: "FromId",
				},
				{
					model: User,
					attributes: { exclude: ["password", "email", "birthDate", "gender"] },
					as: "ToId",
				},
			],
		});

		if (notification.ToId.teamId !== null) {
			res.status(400).json({
				message: "must leave the current team before joining the new One",
			});
		}

		await FindPlayer.update({ status: true }, { where: { id: findPlayerId } });

		await Notification.update(
			{ status: "ACCEPTED" },
			{ where: { id: notificationId } }
		);
		await User.update(
			{ teamId: notification.FromId.teamId },
			{ where: { id: req.user.id } }
		);
		res.status(200).json("you have joined the team");
	} catch (err) {
		next(err);
	}
};

exports.rejectInviteRequest = async (req, res, next) => {
	const id = req.params.requestId;
	try {
		await Notification.destroy({ where: { id } });
		res.json({ message: "successfully reject the team invite" });
	} catch (err) {
		next(err);
	}
};

exports.joiningTeamRequest = async (req, res, next) => {
	try {
		const teamId = req.params.teamId;
		const team = await Team.findOne({
			where: { id: teamId },
			include: [
				{
					model: User,
					attributes: { exclude: ["password", "email"] },
				},
			],
		});

		if (req.user.teamId) {
			res.status(400).json({
				message: "cannot send request since you are already have a team",
			});
		}
		await Notification.create({
			status: "PENDING",
			type: "JOINING_TEAM_REQUEST",
			requestToId: team.Users[0].id,
			requestFromId: req.user.id,
		});
		res.status(200).json({ message: "sent request to team successfully" });
	} catch (err) {
		next(err);
	}
};

exports.acceptJoiningTeamRequest = async (req, res, next) => {
	const { notificationId, findTeamId } = req.params;

	try {
		const notification = await Notification.findOne({
			where: { id: notificationId },
			include: [
				{
					model: User,
					attributes: { exclude: ["password", "email"] },
					as: "ToId",
				},
				{
					model: User,
					attributes: { exclude: ["password", "email"] },
					as: "FromId",
				},
			],
		});

		if (notification.FromId.teamId !== null) {
			res.status(400).json({
				message: "this user already has a team, cannot accept request",
			});
		}

		await FindTeam.update({ status: true }, { where: { id: findTeamId } });

		await Notification.update(
			{ status: "ACCEPTED" },
			{ where: { id: notificationId } }
		);

		await User.update(
			{ teamId: notification.ToId.teamId },
			{ where: { id: notification.FromId.id } }
		);
		res.status(200).json({ message: "you have accept joining request" });
	} catch (err) {
		next(err);
	}
};

exports.rejectJoiningTeamRequest = async (req, res, next) => {
	const id = req.params.requestId;
	try {
		await Notification.destroy({ where: { id } });
		res.status(200).json({ message: "reject the request successfully" });
	} catch (err) {
		next(err);
	}
};
