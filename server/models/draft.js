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
    Draft.belongsToMany(models.Team, {
      through: 'draftTeam',
      foreignKey: 'draftId',
    });
  };
  return Draft;
};
