"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("teams", [
			{
				id: 1,
				title: "High Elo Entry",
				tag: "HEE",
				created_at: new Date(),
				updated_at: new Date(),
				team_owner_id: 1,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return await queryInterface.bulkDelete("teams", null, {});
	},
};
