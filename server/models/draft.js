module.exports = (sequelize, DataTypes) => {
  const Draft = sequelize.define('Draft', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeScheduled: DataTypes.DATE,
  });
  Draft.associate = (models) => {
    Draft.belongsTo(models.User, {
      foreignKey: 'ownerUserId',
    });
    Draft.belongsToMany(models.User, {
      through: 'userDraft',
      foreignKey: 'draftId',
    });
    Draft.hasMany(models.Team, {
      foreignKey: 'draftId',
    });
    Draft.hasMany(models.Player, {
      foreignKey: 'draftId',
    });
  };
  return Draft;
};
