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
			{
				id: 2,
				title: "XERXIA",
				tag: "XIA",
				created_at: new Date(),
				updated_at: new Date(),
				team_owner_id: 12,
			},
			{
				id: 3,
				title: "Sentinels",
				tag: "SEN",
				created_at: new Date(),
				updated_at: new Date(),
				team_owner_id: 1,
			},
			{
				id: 4,
				title: "FULL SENSE",
				tag: "FS",
				created_at: new Date(),
				updated_at: new Date(),
				team_owner_id: 16,
			},
			{
				id: 5,
				title: "GAMBITS",
				tag: "GMB",
				created_at: new Date(),
				updated_at: new Date(),
				team_owner_id: 11,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return await queryInterface.bulkDelete("teams", null, {});
	},
};
