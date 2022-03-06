module.exports = (sequelize, DataTypes) => {
	const Notification = sequelize.define(
		"Notification",
		{
			status: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "PENDING",
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			underscored: true,
			paranoid: true,
		}
	);

	Notification.associate = (models) => {
		Notification.belongsTo(models.User, {
			as: "FromId",
			foreignKey: {
				name: "requestFromId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		Notification.belongsTo(models.User, {
			as: "ToId",
			foreignKey: {
				name: "requestToId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return Notification;
};
