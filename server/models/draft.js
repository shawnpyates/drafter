'use strict';
module.exports = (sequelize, DataTypes) => {
  const Draft = sequelize.define('Draft', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timeScheduled: DataTypes.DATE
  })

  Draft.associate = models => {
    Draft.hasMany(models.User, {
      foreignKey: 'draftId',
      as: 'users'
    })
    Draft.hasMany(models.Team, {
      foreignKey: 'draftId',
      as: 'teams'
    })
  }
  return Draft;
};