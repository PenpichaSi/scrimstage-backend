"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("find_players", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			rank: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			position: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			status: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: {
						tableName: "users",
					},
					key: "id",
				},
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			deleted_at: {
				type: Sequelize.DATE,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("find_players");
	},
};
