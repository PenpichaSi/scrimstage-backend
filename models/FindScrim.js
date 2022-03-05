module.exports = (sequelize, DataTypes) => {
	const FindScrim = sequelize.define(
		"FindScrim",
		{
			duration: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			status: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			firstMap: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			secondMap: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			thirdMap: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			forthMap: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			fifthMap: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			timestamps: true,
			underscored: true,
			paranoid: true,
		}
	);

	FindScrim.associate = (models) => {
		FindScrim.belongsTo(models.User, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		FindScrim.belongsTo(models.Team, {
			as: "TeamHome",
			foreignKey: {
				name: "teamHomeId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		FindScrim.belongsTo(models.Team, {
			as: "TeamAway",
			foreignKey: {
				name: "teamHomeId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return FindScrim;
};
