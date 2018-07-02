module.exports = (sequelize, DataTypes) => {
  const DraftTeam = sequelize.define('DraftTeam');
  DraftTeam.associate = (models) => {
    DraftTeam.belongsTo(models.Draft, {
      foreignKey: 'draftId',
    });
    DraftTeam.belongsTo(models.Team, {
      foreignKey: 'teamId',
    });
  };
  return DraftTeam;
};
