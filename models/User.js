module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true,
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			profileImg: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			birthDate: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
		},
		{
			underscored: true,
			timestamps: true,
			paranoid: true,
		}
	);

	return User;
};
