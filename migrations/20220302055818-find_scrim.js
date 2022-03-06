"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("find_scrims", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			duration: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			status: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			first_map: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			second_map: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			third_map: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			forth_map: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			fifth_map: {
				type: Sequelize.STRING,
				allowNull: true,
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
			team_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: {
						tableName: "teams",
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
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("find_scrims");
	},
};
