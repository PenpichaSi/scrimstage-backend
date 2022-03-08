"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.addColumn("users", "team_id", {
			type: Sequelize.INTEGER,
			allowNull: true,
			refereces: {
				model: {
					tableName: "teams",
				},
				key: "id",
			},
		});
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.removeColumn("users", "teamId", {});
	},
};
