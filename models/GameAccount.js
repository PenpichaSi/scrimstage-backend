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
			uuid: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{
			timestamps: true,
			underscored: true,
			paranoid: true,
		}
	);

	GameAccount.associate = (models) => {
		GameAccount.belongsTo(models.User, {
			foreignKey: {
				name: "GameAccountId",
				allowNull: true,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return GameAccount;
};
