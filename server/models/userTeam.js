module.exports = (sequelize, DataTypes) => {
  const UserTeam = sequelize.define('UserTeam', {
    isOwner: DataTypes.BOOLEAN,
    isAdmin: DataTypes.BOOLEAN,
  });
  UserTeam.associate = (models) => {
    UserTeam.belongsTo(models.Team, {
      foreignKey: 'teamId',
    });
    UserTeam.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return UserTeam;
};
