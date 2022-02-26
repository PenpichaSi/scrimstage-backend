module.exports = (sequelize, DataTypes) => {
	const FindPlayer = sequelize.define(
		"FindPlayer",
		{
			position: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			rank: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			status: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			timestamps: true,
			paranoid: true,
			underscored: true,
		}
	);

	return FindPlayer;
};
