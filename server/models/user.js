'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    registeredAsPlayer: DataTypes.BOOLEAN,
    position: DataTypes.STRING,
    teams: DataTypes.ARRAY(DataTypes.STRING),
    drafts: DataTypes.ARRAY(DataTypes.STRING)
  })
  User.associate = models => {
    User.belongsToMany(models.Team, {
      through: 'userTeam', 
      foreignKey: 'userId'
    })
    User.belongsToMany(models.Draft, {
      through: 'userDraft', 
      foreignKey: 'userId'
    })
  }
  return User;
};