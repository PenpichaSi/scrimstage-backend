const ValorantAPI = require("unofficial-valorant-api");
const { GameAccount, User } = require("../models");
const { mapList } = require("../Services/GameAccountSerializer");

const getAllData = async (req, res, next) => {
	const id = req.user.id;
	try {
		const valorantStat = await GameAccount.findOne({
			where: { userId: id },
			include: [
				{
					model: User,
					attributes: { exclude: ["password", "email", "birthDate", "gender"] },
				},
			],
		});
		if (!valorantStat) {
			return res.status(200).json({ valorantStat: null });
		}
		res.status(200).json({ valorantStat });
		console.log(valorantStat);
	} catch (err) {
		next(err);
	}
};

const getUserProfilebyId = async (req, res, next) => {
	const id = req.params.userId;
	try {
		const valorantStat = await User.findOne({
			where: { id: id },
			attributes: { exclude: ["password", "email", "birthDate", "gender"] },
			// include: [
			// 	{
			// 		model: User,
			// 		attributes: { exclude: ["password", "email", "birthDate", "gender"] },
			// 	},
			// ],
		});

		if (!valorantStat) {
			return res.status(200).json({ valorantStat: null });
		}
		res.status(200).json({ valorantStat });
	} catch (err) {
		next(err);
	}
};

const initValorantConnection = async (req, res, next) => {
	const { name, tag } = req.body;
	try {
		const isLinked = await GameAccount.findOne({
			where: { userId: req.user.id },
		});

		console.log(isLinked);
		if (isLinked) {
			return res
				.status(400)
				.json({ message: "the account has already linked with riot" });
		}
		const resAccount = await ValorantAPI.getAccount(name.toUpperCase(), tag);
		const resRank = await ValorantAPI.getMMRHistoryByPUUID(
			"ap",
			resAccount.data.puuid
		);
		const account = await GameAccount.create({
			userId: req.user.id,
			username: name,
			tag: tag,
			puuid: resAccount.data.puuid,
			rank: resRank.data[0].currenttierpatched.split(" ")[0].toUpperCase(),
			region: "ap",
		});
		const stats = await fetchStats(req.user.id, "ap", resAccount.data.puuid);

		const userStats = {
			...account,
			...stats,
		};

		res.status(200).json({ userStats });
	} catch (err) {
		next(err);
	}
};

const updateStats = async (req, res, next) => {
	const userId = req.user.id;
	try {
		const account = await GameAccount.findOne({ where: { userId: userId } });
		await fetchStats(userId, account.region, account.puuid);
		res.status(200).json({ account });
	} catch (err) {
		next(err);
	}
};

const fetchStats = async (userId, region, puuid) => {
	const allKda = [];
	let totalKills = 0;
	let totalDeath = 0;
	let totalAssists = 0;
	let totalScores = 0;
	let totalShots = 0;
	let totalHeadShots = 0;
	let totalBodyShots = 0;
	let totalLegShots = 0;
	let totalGame = 0;
	let wonGame = 0;
	let totalMoneySpent = 0;
	let totalDamageMade = 0;

	for (let i = 0; i < mapList.length; i++) {
		const resStats = await ValorantAPI.getMatchesByPUUID(
			region,
			puuid,
			20,
			"competitive",
			mapList[i]
		);

		resStats.data.forEach((element) => {
			// find index from all player in each game
			const index = element.players.all_players.findIndex(
				(el) => el.puuid === puuid
			);

			totalMoneySpent +=
				element.players.all_players[index].economy.spent.overall;
			totalDamageMade += element.players.all_players[index].damage_made;
			totalKills += element.players.all_players[index].stats.kills;
			totalDeath += element.players.all_players[index].stats.deaths;
			totalAssists += element.players.all_players[index].stats.assists;
			totalScores += element.players.all_players[index].stats.score;
			totalShots +=
				element.players.all_players[index].stats.bodyshots +
				element.players.all_players[index].stats.headshots +
				element.players.all_players[index].stats.legshots;
			totalHeadShots += element.players.all_players[index].stats.headshots;
			totalBodyShots += element.players.all_players[index].stats.bodyshots;
			totalLegShots += element.players.all_players[index].stats.legshots;
			totalGame += 1;
			const kda =
				(totalKills +=
					element.players.all_players[index].stats.kills +
					element.players.all_players[index].stats.deaths) /
				element.players.all_players[index].stats.deaths;
			allKda.push(kda);
			const users_team = element.players.all_players[index].team.toLowerCase();
			const teamWon = element.teams[users_team].has_won;
			if (teamWon === true) {
				wonGame += 1;
			}
		});
	}

	const kdaCalculation = () => {
		let res = 0;
		for (let i = 0; i < allKda.length; i++) {
			res += allKda[i];
		}
		res = res / allKda.length;
		return res;
	};

	const avg_kda = kdaCalculation();

	const avg_headshot = totalHeadShots / totalShots;
	const avg_bodyshot = totalBodyShots / totalShots;
	const win_rate = wonGame / totalGame;
	const avg_score = totalScores / totalGame;

	const statsObj = {
		winRate: win_rate,
		avgScore: avg_score,
		avgHeadshot: avg_headshot,
		avgBodyshot: avg_bodyshot,
		avgKda: avg_kda,
	};
	await GameAccount.update(statsObj, { where: { userId: userId } });

	return statsObj;
};

module.exports = {
	fetchStats,
	initValorantConnection,
	updateStats,
	getAllData,
	getUserProfilebyId,
};
