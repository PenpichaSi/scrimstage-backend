"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
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
				allowNull: false,
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

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("friends");
	},
};
