module.exports = (sequelize, DataTypes) => {
	const GameAccount = sequelize.define(
		"GameAccount",
		{
			username: {
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
			puuid: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			rank: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			region: {
				type: DataTypes.STRING,
				defaultValue: "ap",
			},
			winRate: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			avgBodyshot: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			avgKda: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			avgScore: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			avgHeadshot: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
		},
		{
			timestamps: true,
			underscored: true,
		}
	);

	GameAccount.associate = (models) => {
		GameAccount.belongsTo(models.User, {
			foreignKey: {
				name: "userId",
				allowNull: true,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return GameAccount;
};
