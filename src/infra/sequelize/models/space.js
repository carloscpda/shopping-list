module.exports = function (sequelize, DataTypes) {
  const Space = sequelize.define(
    'space',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      owner_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'space',
      indexes: [],
    },
  );

  Space.associate = (models) => {
    Space.belongsToMany(models.User, { through: models.SpaceUser });
  };

  return Space;
};
