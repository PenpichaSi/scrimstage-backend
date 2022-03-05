"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("users", [
			{
				id: 0,
				username: "oakley",
				email: "oakley@gmail.com",
				password: await bcrypt.hash("1234", 10),
				gender: "MALE",
				birth_date: new Date(),
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 1,
				username: "Ching",
				email: "ching@gmail.com",
				password: await bcrypt.hash("1234", 10),
				gender: "FEMALE",
				birth_date: new Date(),
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 2,
				username: "wanchai",
				email: "wanchai@gmail.com",
				password: await bcrypt.hash("1234", 10),
				gender: "MALE",
				birth_date: new Date(),
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 3,
				username: "premmimi",
				email: "premmimi@gmail.com",
				password: await bcrypt.hash("1234", 10),
				gender: "MALE",
				birth_date: new Date(),
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 4,
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

	async down(queryInterface, Sequelize) {},
};
