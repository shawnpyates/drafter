module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
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
    Player.belongsTo(models.User, {
      foreignKey: 'creatorUserId',
      allowNull: false,
    });
    Player.belongsTo(models.Team, {
      foreignKey: 'teamId',
    });
  };
  return Player;
};
