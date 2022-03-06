const { User, Team, Notification } = require("../models");

exports.invitePlayerRequest = async (req, res, next) => {
	const { userId } = req.params;
	try {
		const invitedUser = await User.findOne({ where: { id: userId } });
		if (invitedUser.team_id) {
			res.status(400).json({ message: "this user already has a team" });
		}
		const existedRequest = await Notification.findOne({
			where: { requestToId: userId },
		});
		if (existedRequest)
			return res
				.status(400)
				.json({ message: "your request has already been sent" });

		await Notification.create({
			requestFromId: req.user.id,
			requestToId: userId,
			type: "INVITE_PLAYER_REQUEST",
			status: "UNREAD",
		});

		res.status(200).json({ message: "sent the invite successfully" });
	} catch (err) {
		next(err);
	}
};
