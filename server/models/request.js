module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    requestType: DataTypes.STRING,
    initiatorType: DataTypes.ENUM('draft', 'team'),
    playerId: DataTypes.INTEGER,
  });
  Request.associate = (models) => {
    Request.belongsTo(models.Draft, {
      foreignKey: 'draftId',
      allowNull: false,
    });
    Request.belongsTo(models.User, {
      foreignKey: 'userId',
      allowNull: false,
    });
  };
  return Request;
};
