module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true,
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			imgUrl: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			birthDate: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			gender: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			underscored: true,
			timestamps: true,
		}
	);

	User.associate = (models) => {
		User.hasOne(models.Team, {
			as: "TeamOwner",
			foreignKey: {
				name: "teamOwnerId",
				allowNull: true,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		User.belongsTo(models.Team, {
			foreignKey: {
				name: "teamId",
				allowNull: true,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		User.hasOne(models.GameAccount, {
			foreignKey: {
				name: "GameAccountId",
				allowNull: true,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		User.hasMany(models.Friend, {
			as: "RequestTo",
			foreignKey: {
				name: "requestToId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		User.hasMany(models.Friend, {
			as: "RequestFrom",
			foreignKey: {
				name: "requestFromId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		User.hasOne(models.FindTeam, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		User.hasMany(models.FindPlayer, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		User.hasMany(models.FindScrim, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		User.hasMany(models.TeamRequest, {
			as: "TeamRequestFrom",
			foreignKey: {
				name: "requestedFromId",
				allowNull: false,
			},
		});

		User.hasMany(models.TeamRequest, {
			as: "TeamRequestTo",
			foreignKey: {
				name: "requestToId",
				allowNull: false,
			},
		});

		User.hasMany(models.Notification, {
			as: "FromId",
			foreignKey: {
				name: "requestFromId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});

		User.hasMany(models.Notification, {
			as: "ToId",
			foreignKey: {
				name: "requestToId",
				allowNull: false,
			},
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		});
	};

	return User;
};
