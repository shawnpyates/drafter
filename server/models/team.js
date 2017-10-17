'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  Team.associate = models => {
    Team.belongsTo(models.Draft, {
      foreignKey: 'draftId'
    })
    Team.hasMany(models.User, {
      foreignKey: 'teamId',
      as: 'teams'
    })
  }
  return Team;
};