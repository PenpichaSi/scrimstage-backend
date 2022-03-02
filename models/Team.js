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

	Team.associate = (models) => {
		Team.belongsTo(models.User, {
			as: "TeamOwner",
			foreignKey: {
				name: "teamOwnerId",
				allowNull: true,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return Team;
};
