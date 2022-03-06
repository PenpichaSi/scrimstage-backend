"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return await queryInterface.createTable("notifications", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				unique: true,
				autoIncrement: true,
				primaryKey: true,
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
			status: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: "PENDING",
			},
			type: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
			},
			updated_at: {
				type: Sequelize.DATE,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		return await queryInterface.dropTable("notfications");
	},
};
