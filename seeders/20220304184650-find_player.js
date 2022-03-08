"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return await queryInterface.bulkInsert("find_players", [
			{
				id: 1,
				user_id: 6,
				team_id: 3,
				rank: "GOLD",
				position: "SENTINEL",
				status: false,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 2,
				user_id: 1,
				team_id: 1,
				rank: "DIAMOND",
				position: "DUELIST",
				status: false,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 3,
				user_id: 10,
				team_id: 5,
				rank: "GOLD",
				position: "CONTROLLER",
				status: false,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 4,
				user_id: 1,
				team_id: 1,
				rank: "PLATINUM",
				position: "SENTINEL",
				status: false,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 5,
				user_id: 12,
				team_id: 2,
				rank: "GOLD",
				position: "INITIATOR",
				status: false,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 6,
				user_id: 15,
				team_id: 4,
				rank: "SIVER",
				position: "CONTROLLER",
				status: false,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return await queryInterface.bulkDelete("find_players", null, {});
	},
};
