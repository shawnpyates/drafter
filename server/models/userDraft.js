module.exports = (sequelize, DataTypes) => {
  const UserDraft = sequelize.define('UserDraft', {
    isOwner: DataTypes.BOOLEAN,
    isAdmin: DataTypes.BOOLEAN,
    hasCreatePermissions: DataTypes.BOOLEAN,
  });
  UserDraft.associate = (models) => {
    UserDraft.belongsTo(models.Draft, {
      foreignKey: 'draftId',
    });
    UserDraft.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return UserDraft;
};
