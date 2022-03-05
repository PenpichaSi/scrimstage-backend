"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("friends", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			status: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
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
			},
			request_from_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: {
						tableName: "users",
					},
					key: "id",
				},
			},
			request_to_id: {
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
		await queryInterface.dropTable("friends");
	},
};
