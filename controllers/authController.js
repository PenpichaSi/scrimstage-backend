const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.register = async (req, res, next) => {
	try {
		const { username, email, password, confirmPassword, gender, birthDate } =
			req.body;

		if (password != confirmPassword) {
			return res
				.status(400)
				.json({ message: " password and confirm password are not matching" });
		}

		const isEmail = emailFormat.test(email);
		if (isEmail) {
			const existUser = await User.findOne({
				where: {
					email: email,
				},
			});

			if (existUser) {
				return res
					.status(400)
					.json({ message: "this email or email is already in used" });
			}
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		await User.create({
			username: username,
			birthDate: birthDate,
			email: email,
			gender: gender,
			password: hashedPassword,
		});
		res.status(201).json({ message: "user is created" });
	} catch (err) {
		next(err);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { emailInput, password } = req.body;
		const isEmail = emailFormat.test(emailInput);
		let user;
		if (isEmail) {
			user = await User.findOne({ where: { email: emailInput } });
		}

		if (!user) {
			return res.status(400).json({ message: "invalid email or password" });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ message: "invalid email or password" });
		}

		const payload = {
			id: user.id,
		};

		const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
			expiresIn: 60 * 60 * 24 * 30,
		});
		console.log(user);
		const { id, username, imgUrl, email, createdAt } = user;

		res.status(200).json({
			token,
			user: {
				id,
				username,
				imgUrl,
				email,
				createdAt,
			},
		});
	} catch (err) {
		next(err);
	}
};
