module.exports = (sequelize, DataTypes) => {
	const Friend = sequelize.define(
		"Friend",
		{
			status: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			timestamps: true,
			underscored: true,
		}
	);

	Friend.associate = (models) => {
		Friend.belongsTo(models.User, {
			as: "RequestTo",
			foreignKey: {
				name: "requestToId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		Friend.belongsTo(models.User, {
			as: "RequestFrom",
			foreignKey: {
				name: "requestFromId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return Friend;
};
