module.exports = (sequelize, DataTypes) => {
	const Team = sequelize.define(
		"Team",
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true,
				},
			},
			tag: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true,
				},
			},
			teamProfileImg: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			underscored: true,
			timestamps: true,
			paranoid: true,
		}
	);

	return Team;
};
