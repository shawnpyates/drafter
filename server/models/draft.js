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
    Draft.belongsToMany(models.User, {
      through: 'userDraft',
      foreignKey: 'draftId'
    })
    Draft.hasMany(models.Team, {
      foreignKey: 'draftId',
      as: 'teams'
    })
  }
  return Draft;
};