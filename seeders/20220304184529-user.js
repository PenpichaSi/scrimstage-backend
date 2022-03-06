"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("users", [
			{
				id: 1,
				username: "oakley",
				email: "oakley@gmail.com",
				password: await bcrypt.hash("1234", 10),
				gender: "MALE",
				team_id: 1,
				birth_date: new Date(),
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 2,
				username: "Ching",
				email: "ching@gmail.com",
				password: await bcrypt.hash("1234", 10),
				gender: "FEMALE",
				birth_date: new Date(),
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 3,
				username: "wanchai",
				email: "wanchai@gmail.com",
				password: await bcrypt.hash("1234", 10),
				gender: "MALE",
				birth_date: new Date(),
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 4,
				username: "premmimi",
				email: "premmimi@gmail.com",
				password: await bcrypt.hash("1234", 10),
				gender: "MALE",
				birth_date: new Date(),
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 5,
				username: "ormzaap",
				email: "ormzaap@gmail.com",
				password: await bcrypt.hash("1234", 10),
				gender: "FEMALE",
				birth_date: new Date(),
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("users", null, {});
	},
};
