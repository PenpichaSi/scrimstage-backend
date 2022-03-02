"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
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

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("game_accounts");
	},
};
