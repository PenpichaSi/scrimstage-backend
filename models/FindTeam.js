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
				type: DataTypes.STRING,
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

			underscored: true,
		}
	);

	FindTeam.associate = (models) => {
		FindTeam.belongsTo(models.User, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return FindTeam;
};
