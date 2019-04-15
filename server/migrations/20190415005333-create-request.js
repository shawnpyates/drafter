'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      requestType: {
        type: Sequelize.STRING
      },
      initiatorType: {
        type: Sequelize.ENUM('draft', 'team'),
      },
      playerId: {
        type: Sequelize.INTEGER,
      },
      draftId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Drafts',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      teamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Requests');
  }
};
