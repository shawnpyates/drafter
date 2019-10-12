module.exports = (sequelize, DataTypes) => {
  const Draft = sequelize.define('Draft', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['unscheduled', 'scheduled', 'open', 'closed'],
      allowNull: false,
    },
    currentlySelectingTeamId: {
      type: DataTypes.UUID,
      references: {
        model: 'Teams',
        key: 'uuid',
      },
    },
    timeScheduled: DataTypes.DATE,
    selectingTeamChangeTime: DataTypes.DATE,
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
