module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    expiresAt: DataTypes.DATE,
  });
  Session.associate = (models) => {
    Session.belongsTo(models.User, {
      foreignKey: 'userId',
      allowNull: false,
    });
  };
  return Session;
};
