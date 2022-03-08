"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("notifications", [
			{
				id: 1,
				request_from_id: 1,
				request_to_id: 2,
				status: "PENDING",
				type: "INVITE_PLAYER_REQUEST",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 2,
				request_from_id: 26,
				request_to_id: 1,
				status: "PENDING",
				type: "JOINING_TEAM_REQUEST",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("notifications", null, {});
	},
};
