module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: DataTypes.STRING,
    position: DataTypes.STRING,
  });
  Player.associate = (models) => {
    Player.belongsTo(models.Draft, {
      foreignKey: 'draftId',
      allowNull: false,
    });
    Player.belongsTo(models.Team, {
      foreignKey: 'teamId',
    });
  };
  return Player;
};
