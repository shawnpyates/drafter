module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Team.associate = (models) => {
    Team.belongsTo(models.Draft, {
      foreignKey: 'draftId',
    });
    Team.belongsToMany(models.User, {
      through: 'userTeam',
      foreignKey: 'teamId',
    });
  };
  return Team;
};
