module.exports = (sequelize, DataTypes) => {
	const Team = sequelize.define(
		"Team",
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			tag: {
				type: DataTypes.STRING,
				allowNull: false,
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
		}
	);

	Team.associate = (models) => {
		Team.hasMany(models.FindPlayer, {
			foreignKey: {
				name: "teamId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		Team.hasMany(models.User, {
			foreignKey: {
				name: "teamId",
				allowNull: true,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		Team.hasMany(models.FindScrim, {
			as: "TeamHome",
			foreignKey: {
				name: "teamHomeId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
		Team.hasMany(models.FindScrim, {
			as: "TeamAway",
			foreignKey: {
				name: "teamHomeId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

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
