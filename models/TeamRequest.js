module.exports = (sequelize, DataTypes) => {
	const TeamRequest = sequelize.define(
		"TeamRequest",
		{
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{
			timestamps: true,
			underscored: true,
		}
	);

	TeamRequest.associate = (models) => {
		TeamRequest.belongsTo(models.User, {
			as: "TeamRequestFrom",
			foreignKey: {
				name: "requestedFromId",
				allowNull: false,
			},
		}),
			TeamRequest.belongsTo(models.User, {
				as: "TeamRequestTo",
				foreignKey: {
					name: "requestToId",
					allowNull: false,
				},
			});
	};

	return TeamRequest;
};
