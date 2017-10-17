'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    registeredAsPlayer: DataTypes.BOOLEAN,
    position: DataTypes.STRING
  })
  User.associate = models => {
    User.belongsTo(models.Team, {
      foreignKey: 'teamId'
    })
    User.belongsTo(models.Draft, {
      foreignKey: 'draftId'
    })
  }
  return User;
};


// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const Todo = sequelize.define('Todo', {
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   })

//   Todo.associate = models => {
//     Todo.hasMany(models.TodoItem, {
//       foreignKey: 'todoId',
//       as: 'todoItems'
//     })
//   }

//   return Todo
// }