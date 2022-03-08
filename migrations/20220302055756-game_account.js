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
				allowNull: true,
			},
			avg_score: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			avg_Kda: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			avg_bodyshot: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			avg_headshot: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("game_accounts");
	},
};
