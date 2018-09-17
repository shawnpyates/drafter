module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Team.associate = (models) => {
    Team.belongsTo(models.User, {
      foreignKey: 'ownerUserId',
    });
    Team.belongsTo(models.Draft, {
      foreignKey: 'draftId',
    });
    Team.hasMany(models.Player);
  };
  return Team;
};
