module.exports = (sequelize, DataTypes) => {
	const FindTeam = sequelize.define(
		"FindTeam",
		{
			position: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			rank: {
				type: DataType.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: false,
			},
		},
		{
			timestamps: true,
			paranoid: true,
			underscored: true,
		}
	);

	return FindTeam;
};
