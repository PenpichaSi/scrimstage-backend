"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("find_teams", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
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
			position: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			rank: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			status: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
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
		await queryInterface.dropTable("find_teams");
	},
};
