"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("TeamRequests", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			request_from_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				reference: {
					model: {
						tableName: "users",
					},
					key: "id",
				},
			},
			request_to_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				reference: {
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
		});
	},

	down: async (queryInterface, Sequelize) => {
		return await queryInterface.dropTable("TeamRequests");
	},
};
