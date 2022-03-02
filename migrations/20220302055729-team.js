"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("teams", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			tag: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			team_profile_img: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			deleted_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
      team_owner_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:{
            tableName:'users'
          },
          key='id'
        }
      }
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("teams");
	},
};
