"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		queryInterface.bulkInsert("find_teams", [
			{
				id: 1,
				user_id: 2,
				position: "SENTINEL",
				rank: "GOLD",
				status: false,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 2,
				user_id: 3,
				position: "DUELIST",
				rank: "SILVER",
				status: false,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 3,
				user_id: 4,
				position: "CONTROLLER",
				rank: "BRONZE",
				status: false,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 4,
				user_id: 5,
				position: "CONTROLLER",
				rank: "GOLD",
				status: false,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 5,
				user_id: 25,
				position: "SENTINEL",
				rank: "GOLD",
				status: false,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 6,
				user_id: 26,
				position: "INITIATOR",
				rank: "GOLD",
				status: false,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 7,
				user_id: 27,
				position: "CONTROLLER",
				rank: "DIAMOND",
				status: false,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 8,
				user_id: 28,
				position: "DUELIST",
				rank: "SILVER",
				status: false,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 9,
				user_id: 29,
				position: "DUELIST",
				rank: "GOLD",
				status: false,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 10,
				user_id: 30,
				position: "CONTROLLER",
				rank: "PLATINUM",
				status: false,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
