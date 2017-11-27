'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    registeredAsPlayer: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    position: DataTypes.STRING,
    teams: DataTypes.ARRAY(DataTypes.STRING),
    drafts: DataTypes.ARRAY(DataTypes.STRING)
  })
  User.associate = models => {
    User.belongsToMany(models.Team, {
      through: 'userTeam', 
      foreignKey: 'userId'
    })
    User.belongsToMany(models.Draft, {
      through: 'userDraft', 
      foreignKey: 'userId'
    })
  }
  return User;
};