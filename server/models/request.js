module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    teamName: DataTypes.STRING,
    expiresAt: DataTypes.DATE,
  });
  Request.associate = (models) => {
    Request.belongsTo(models.Draft, {
      foreignKey: 'draftId',
      allowNull: false,
    });
    Request.belongsTo(models.User, {
      foreignKey: 'requestCreatorId',
      allowNull: false,
    });
  };
  return Request;
};
