module.exports = function (sequelize, DataTypes) {
  const Space = sequelize.define(
    'space',
    {
      space_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      space_name: {
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
