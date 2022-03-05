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

	FindPlayer.associate = (models) => {
		FindPlayer.belongsTo(models.User, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		FindPlayer.belongsTo(models.Team, {
			foreignKey: {
				name: "teamId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return FindPlayer;
};
