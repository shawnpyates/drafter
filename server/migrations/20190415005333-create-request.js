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
        type: Sequelize.UUID,
        references: {
          model: 'Drafts',
          key: 'uuid'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      teamId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Teams',
          key: 'uuid'
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
