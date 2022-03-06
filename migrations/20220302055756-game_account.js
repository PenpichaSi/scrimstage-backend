"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("game_accounts", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			tag: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			puuid: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			rank: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			region: {
				type: Sequelize.STRING,
				defaultValue: "ap",
			},
			win_rate: {
				type: Sequelize.FLOAT,
			},
			avg_combat_score: {
				type: Sequelize.FLOAT,
			},
			avg_kda: {
				type: Sequelize.FLOAT,
			},
			avg_econ_score: {
				type: Sequelize.FLOAT,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
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
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("game_accounts");
	},
};
