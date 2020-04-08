module.exports = function (sequelize, DataTypes) {
  const SpaceUser = sequelize.define(
    'space_user',
    {},
    {
      timestamps: true,
      underscored: true,
      tableName: 'space_user',
    },
  );

  return SpaceUser;
};
