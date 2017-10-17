'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserTeam = sequelize.define('UserTeam', {
    isAdmin: DataTypes.BOOLEAN
  })
  UserTeam.associate = models => {
    UserTeam.belongsTo(models.Team, {
      foreignKey: 'teamId'
    })
    UserTeam.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  }
  return UserTeam;
};