'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserDraft = sequelize.define('UserDraft', {
    isAdmin: DataTypes.BOOLEAN
  })
  UserDraft.associate = models => {
    UserDraft.belongsTo(models.Draft, {
      foreignKey: 'draftId'
    })
    UserDraft.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  }
  return UserDraft;
};