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
    Team.belongsToMany(models.User, {
      through: 'userTeam',
      foreignKey: 'teamId',
    });
    Team.belongsTo(models.Draft, {
      foreignKey: 'draftId',
    });
    Team.hasMany(models.Player, {
      foreignKey: 'teamId',
    });
  };
  return Team;
};
