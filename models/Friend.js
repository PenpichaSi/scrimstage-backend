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
			paranoid: true,
		}
	);

	return Friend;
};
