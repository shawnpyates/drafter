'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Requests', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      teamName: {
        type: Sequelize.STRING
      },
      expiresAt: {
        type: Sequelize.DATE,
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
      requestCreatorId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
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
